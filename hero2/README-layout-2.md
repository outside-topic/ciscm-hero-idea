# Supply Chain Hero — Layout 2

A second, alternative hero composition using a featured-video layout. The main video occupies the large left panel; the three other services appear as selectable video rows on the right. Selecting a service updates the main video, title, category, description, counter and progress indicator.

## Files
- `layout-2.html`
- `layout-2.css`
- `layout-2.js`

## Run
Open `layout-2.html` in a browser. Bootstrap 5.3, GSAP 3.12.5 and Google Fonts are loaded through CDNs.

## Add your videos
Place local MP4 files at:
- `assets/videos/warehousing.mp4`
- `assets/videos/global-freight.mp4`
- `assets/videos/transport.mp4`
- `assets/videos/distribution.mp4`

Optional poster images:
- `assets/posters/warehousing.jpg`
- `assets/posters/global-freight.jpg`
- `assets/posters/transport.jpg`
- `assets/posters/distribution.jpg`

Gradient fallbacks remain visible when videos are missing. All custom selectors use the `scm2-` prefix to avoid conflicts with the first layout and existing site styles. The supplied design tokens are retained in `:root`, and there is no navbar.
