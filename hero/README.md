# Supply Chain Video Hero

A responsive supply-chain hero with four service video cards, using the supplied Inter/Outfit typography and blue/red/yellow design tokens. The navbar has been removed.

## Run
Open `index.html` in a browser, or serve this folder with a local development server.

## Add your videos
Place four optimized MP4 files in `assets/videos/` using these exact names:
- `warehousing.mp4`
- `global-freight.mp4`
- `transport.mp4`
- `distribution.mp4`

Optional poster images can go in `assets/posters/` using the names referenced in `index.html`.
If the MP4 files are missing, gradient fallback panels keep the layout visible.

## Stack
- HTML5 / CSS3 / Vanilla JavaScript
- Bootstrap 5.3 (included; layout classes are namespaced)
- GSAP 3 + ScrollTrigger
- Swiper 11 (included for future carousel use)

## Notes
- All custom CSS classes use the `scm-` prefix to reduce conflicts with existing site styles.
- Replace the sample brand name and copy with the client's actual brand content.
- Keep videos muted, compressed, short-looping, and preferably under a few MB each.
- For production, use WebM with MP4 fallback if your encoding pipeline supports it.
