---
title: 'Recommended way to handle favicons'
---

With so many operating systems, browsers and ways to view and link to your site, it can be confusing to know which favicon combinations to use. Andrew Sitnik has a well written article covering a [recommended practise on modern favicons](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs). Below is the code, ready to copy-paste to best use favicons in your site.

The code to include in your `<head>`

```html
<link rel="icon" href="/favicon.ico" sizes="any"><!-- 32×32 -->
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- 180×180 -->
<link rel="manifest" href="/manifest.webmanifest">
```

The code to include in your web app manifest (`manifest.webmanifest`):

```json
{
  "icons": [
    { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```
