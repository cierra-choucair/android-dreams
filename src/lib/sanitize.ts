import sanitizeHtml from "sanitize-html";

/**
 * Sanitize WordPress content HTML before rendering.
 * Allows the editorial elements WordPress produces (figures, embeds,
 * code blocks, tables) while stripping scripts, styles, and event handlers.
 */
export function sanitizeWpHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "a",
      "abbr",
      "b",
      "blockquote",
      "br",
      "caption",
      "cite",
      "code",
      "del",
      "div",
      "em",
      "figcaption",
      "figure",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "i",
      "img",
      "ins",
      "li",
      "mark",
      "ol",
      "p",
      "pre",
      "q",
      "s",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",
      "ul",
      "iframe",
      "audio",
      "video",
      "source",
    ],
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "title"],
      audio: ["controls", "src"],
      video: ["controls", "src", "width", "height", "poster"],
      source: ["src", "type"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
      blockquote: ["cite"],
      "*": ["class", "id"],
    },
    allowedIframeHostnames: [
      "www.youtube.com",
      "www.youtube-nocookie.com",
      "player.vimeo.com",
      "open.spotify.com",
    ],
    allowedSchemes: ["http", "https", "mailto"],
    // Strip WordPress inline styles entirely — the magazine styles the body.
    allowedStyles: {},
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const external =
          /^https?:\/\//.test(href) && !href.includes("androiddreams.com");
        return {
          tagName,
          attribs: external
            ? { ...attribs, rel: "noopener noreferrer", target: "_blank" }
            : attribs,
        };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy" },
      }),
    },
  });
}
