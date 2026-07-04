<?php
/**
 * Plugin Name: Android Dreams — Front-End Revalidation
 * Description: Pings the Next.js site to regenerate pages the moment a post is published, updated, or unpublished. Install as an mu-plugin (wp-content/mu-plugins/ad-revalidate.php).
 * Version: 1.2
 *
 * Configuration — add to wp-config.php:
 *
 *   define('AD_REVALIDATE_URL',    'https://www.androiddreamsmedia.com/api/revalidate');
 *   define('AD_REVALIDATE_SECRET', 'the-same-value-as-REVALIDATE_SECRET-on-Vercel');
 *
 * v1.2: flushes SiteGround's own cache BEFORE pinging the front end.
 * SiteGround Speed Optimizer can keep serving hours-old wp-json
 * responses after an edit, so the front end would faithfully refetch —
 * and re-cache — stale content. Purging the origin first guarantees
 * the refetch sees the new revision.
 *
 * v1.1: blocking request with a short timeout (fire-and-forget requests
 * get dropped on some shared hosts), follows www/apex redirects, and
 * logs failures to the PHP error log plus a wp_options breadcrumb you
 * can inspect at /wp-admin (Tools → Site Health → Info, or via
 * `wp option get ad_revalidate_last`).
 */

add_action('transition_post_status', function ($new_status, $old_status, $post) {
    // Only standard posts, and only when a live page is affected.
    if ($post->post_type !== 'post') {
        return;
    }
    if ($new_status !== 'publish' && $old_status !== 'publish') {
        return;
    }

    $endpoint = defined('AD_REVALIDATE_URL') ? AD_REVALIDATE_URL : '';
    $secret   = defined('AD_REVALIDATE_SECRET') ? AD_REVALIDATE_SECRET : '';
    if (!$endpoint || !$secret) {
        update_option('ad_revalidate_last', gmdate('c') . ' SKIPPED: AD_REVALIDATE_URL / AD_REVALIDATE_SECRET not defined in wp-config.php', false);
        return;
    }

    // Purge SiteGround's origin cache first so the front end's refetch
    // gets the fresh revision, not a cached wp-json response.
    if (function_exists('sg_cachepress_purge_cache')) {
        sg_cachepress_purge_cache();
    }

    $categories = array_map(
        function ($term) { return $term->slug; },
        wp_get_post_categories($post->ID, ['fields' => 'all'])
    );

    $response = wp_remote_post($endpoint, [
        'timeout'     => 5,
        'blocking'    => true, // reliable delivery; adds <1s to a save
        'redirection' => 3,    // survive www ↔ apex redirects
        'headers'     => [
            'Content-Type'        => 'application/json',
            'x-revalidate-secret' => $secret,
        ],
        'body' => wp_json_encode([
            'slug'       => $post->post_name,
            'categories' => $categories,
            'status'     => $new_status,
        ]),
    ]);

    if (is_wp_error($response)) {
        $summary = 'ERROR: ' . $response->get_error_message();
    } else {
        $code    = wp_remote_retrieve_response_code($response);
        $body    = substr((string) wp_remote_retrieve_body($response), 0, 200);
        $summary = "HTTP {$code}: {$body}";
    }

    // Breadcrumb for debugging: the result of the most recent ping.
    update_option('ad_revalidate_last', gmdate('c') . " {$post->post_name} → {$summary}", false);

    if (is_wp_error($response) || wp_remote_retrieve_response_code($response) >= 400) {
        error_log("[ad-revalidate] {$post->post_name}: {$summary}");
    }
}, 10, 3);
