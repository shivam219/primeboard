# Primeboard public website

## Multi-page site

Ten pages: Home, Billboards & screens, Metro & trains, Television, OTT & streaming, Social & search, Platform, Media owners, Company, and Privacy & terms. Shared Solutions navigation is generated into each HTML page for use without JavaScript.

`python build_pages.py` regenerates the detail pages and shared navigation. It preserves the homepage body and existing legal sections. `python validate_site.py` checks all local links, anchors, unique IDs, one H1 per page and preservation of legal sections relative to HEAD. Run `node --check pages.js` as well.

Interactive examples include single/multi-channel TV selection, streaming-service selection, six digital placements (including Outlook), static/digital billboards, three transit positions, and a pause-animation control. These are fictional campaign previews, not working ad publishing tools. Publisher examples are sourced from JioStar's portfolio, Sony Pictures Networks India's overview and Zee Entertainment's corporate site. International streaming examples are subject to market eligibility; see Amazon Ads Prime Video and Netflix's advertising help pages. Generic text badges identify services and do not imply official partnerships.

Static marketing site deployed from `main` through the existing Vercel Git integration. No build command, environment secrets or application backend are required.

## Preview

Run `python -m http.server 4510 --bind 127.0.0.1` from this directory and open http://127.0.0.1:4510.

## Files

- `index.html`: public content, five channel categories, platform preview, partner enquiry, FAQ and contact links.
- `site.css`: responsive layout, scroll reveal styles, sticky campaign illustration and reduced-motion support.
- `site.js`: keyboard-accessible channel selector, mobile navigation and scroll animations.
- `primeboard-logo.png`: original supplied Primeboard logo, unchanged.
- `privacy-policy.html`: existing privacy and terms page, unchanged.

The old vendor styles/scripts are retained for historical compatibility but are not loaded by the homepage. Google Fonts is optional; local fallback fonts are declared.

## Content boundaries

This is a marketing website, not the authenticated Primeboard applications. Campaign artwork and the workspace are explicitly illustrative. TV/OTT are marked planned, and digital integrations require eligible accounts and supported access. No invented customer logos, metrics, live inventory or partnership claims are shown. Contact actions open an email draft to the existing `info@primeboards.in` address; there is no fake lead submission or login link.

## Validation

Check `node --check site.js` and `git diff --check`. Browser checks cover desktop/mobile layouts, local image loading, category selection, keyboard End navigation, mobile menu close-on-navigation and FAQ disclosure. Respect `prefers-reduced-motion` and preserve access to content when JavaScript is unavailable.
