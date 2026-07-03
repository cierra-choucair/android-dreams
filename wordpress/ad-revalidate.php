<?php
/**
 * Plugin Name: Android Dreams — Front-End Revalidation
 * Description: Pings the Next.js site to regenerate pages the moment a post is published, updated, or unpublished. Install as an mu-plugin (wp-content/mu-plugins/ad-revalidate.php) or paste into the theme's functions.php.
 * Version: 1.0
 *
 * Configuration — add to wp-config.php:
 *
 *   define('AD_REVALIDATE_URL',    'https://www.androiddreamsmedia.com/api/revalidate');
 *   define('AD_REVALIDATE_SECRET', 'the-same-value-as-REVALIDATE_SECRET-on-Vercel');
 */

add_action('transition_post_status', function ($new_status, $old_status, $post) {
    // Only standard posts, and only when a live page is affected:
    // publishing, updating a published post, or unpublishing.
    if ($post->post_type !== 'post') {
        return;
    }
    if ($new_status !== 'publish' && $old_status !== 'publish') {
        return;
    }

    $endpoint = defined('AD_REVALIDATE_URL') ? AD_REVALIDATE_URL : '';
    $secret   = defined('AD_REVALIDATE_SECRET') ? AD_REVALIDATE_SECRET : '';
    if (!$endpoint || !$secret) {
        return;
    }

    $categories = array_map(
        function ($term) { return $term->slug; },
        wp_get_post_categories($post->ID, ['fields' => 'all'])
    );

    wp_remote_post($endpoint, [
        'timeout'  => 5,
        'blocking' => false, // fire-and-forget; never slows down the editor
        'headers'  => [
            'Content-Type'        => 'application/json',
            'x-revalidate-secret' => $secret,
        ],
        'body' => wp_json_encode([
            'slug'       => $post->post_name,
            'categories' => $categories,
            'status'     => $new_status,
        ]),
    ]);
}, 10, 3);
