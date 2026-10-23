# Responsive images demo

A small project that accompanies an article on preparing images for responsive websites.
It shows how to:

- generate several widths and formats (AVIF, WebP, JPEG) with [sharp](https://sharp.pixelplumbing.com/)
- serve them with `srcset` and `sizes`
- use `<picture>` for modern formats and art direction (a portrait crop on small screens)
- lazy-load below-the-fold images and prioritise the hero image with `fetchpriority="high"`
- reserve space with `width` and `height` to avoid layout shift

## Run it

```bash
npm install
npm run build   # creates sample originals if none exist, then generates images/dist
npm start       # serves the folder at http://localhost:3000
```

Put your own photos in `images/originals/` and run `npm run build` again.
Adjust the `widths` array and quality values in `build-images.mjs` for your own images.

## Check the result

1. Open DevTools and use device mode to resize the viewport.
2. In the Network panel, confirm which file each breakpoint downloads.
3. Run Lighthouse and look at the "Properly size images" and "Serve images in next-gen formats" audits.

## License

MIT
