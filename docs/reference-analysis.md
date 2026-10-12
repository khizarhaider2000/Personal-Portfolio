# Reference Analysis And Implementation Plan

## Inspection Scope

Inspected `https://www.vanshikachaddha.com/` on October 12, 2026 with Playwright at `1512x824` desktop and `390x844` mobile. Also inspected the public HTML, CSS, and bundled JavaScript. Captured screenshots for hero, about, work, experiences, contact, mobile hero/about, and work hover states under `/private/tmp/reference-*.png`.

One console error appeared on the reference site: a resource returned HTTP 500. The main page still rendered. I did not observe a bespoke cursor; the implementation uses the normal pointer cursor plus the visible hover states I could verify.

## Observed Visual System

- App stack clues: Vite/React bundle, Tailwind-style utility classes, React 19, Framer Motion style APIs, Oswald from Google Fonts, Blanch font linked in HTML.
- Global look: black/white, bold compressed uppercase headings, large section titles, high contrast cards, smooth anchor scrolling.
- Navigation: fixed at top-right, uppercase white links with slash separators. It remains visible over every section and has no mobile hamburger in the observed mobile viewport.
- Hero: full viewport, centered text block, large two-line greeting, small uppercase tagline, outlined rounded rectangle CTA, five small carousel dots. Background cycles between flat colors. The attached screenshot shows pale teal; live capture showed coral at the capture moment.
- About: black full-height section with huge white `ABOUT ME` heading. Desktop uses two-column layout: left stack of white rounded cards for education, activities, email; right large light-gray tech stack panel. Mobile stacks the cards vertically.
- Work: light-gray section with subtle 20px grid canvas and floating pixel-style squares/circles/diamonds. Large black `MY WORK` heading, gray subtitle, horizontal square-card carousel. Cards are about `320-400px`, rounded `8px`, image-forward. Hover darkens the card, scales the image slightly, reveals title/description, and shows circular left/right scroll buttons over gradient side fades.
- Experience: white timeline section with oversized black heading. Desktop alternates large white job cards left/right around a central vertical black line with rounded year badges. Background has faint pastel glows and sparse gray dots/connector lines. Mobile removes the visible timeline/year badges and stacks cards.
- Contact/recommendations: dark charcoal section, large white heading, gray subtitle, red CTA button, horizontal poster-card row. Hover scales a poster upward and reveals a bottom black gradient label. There are side arrows and a dark footer with muted social links.
- Motion: sections and cards use fade-up reveals around `0.5-0.6s`, staggered by item index. Hover transitions are short (`150-300ms`). Modal overlays fade in with a slight scale/y motion. Work canvas animates continuously via `requestAnimationFrame`.

## Implementation Plan

- Build a Next.js app with React components split by section and a central data module at `src/data/portfolio.ts`.
- Recreate the observed structure: hero, about, work carousel, experience timeline, recommendation/contact carousel, footer.
- Use Framer Motion only where observed: viewport fade-up, hover/tap scaling, modal fade/scale transitions.
- Use canvas only where observed: the work grid/floating pixel background and faint experience particles.
- Avoid copying original personal content and proprietary imagery. Project and recommendation visuals are generated with CSS/pixel-style placeholders driven from data.
- Validate with local Playwright screenshots at the same desktop and mobile viewports, hover a work card, check console errors, and run `next build`.
