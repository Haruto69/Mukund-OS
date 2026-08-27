# Production assets — MV

Vector-first asset library derived from the reference board. Everything here is
**original, non-infringing SVG** (no Marvel / Sony / Spider-Man / PlayStation
marks) authored at production resolution. SVG is resolution-independent, so
these stay razor-sharp at any size — favicon through 4K hero. The brand mark is
only **MV**; no wordmark or tagline is used anywhere.

```
backgrounds/
  peter-city.jpg      Golden-hour Manhattan rooftops — Peter Hero background (supplied)
  miles-city.jpg      Rainy neon night rooftops — Miles Hero background (supplied)
transitions/
  peter-shutter.jpg   Red/blue metallic shutter artwork — Peter (supplied)
  miles-shutter.jpg   Black/graphite/red shutter artwork — Miles (supplied)
characters/
  peter-hang.png      Peter hanging cutout, transparent (from supplied source)
  miles-hang.png      Miles hanging cutout, transparent (from supplied source)
branding/
  mv-logo-icon.svg    Square app / social / hero emblem (1024×1024)
overlays/
  web-overlay.svg     Corner spider-web strands (1024², corner-anchored)
  halftone.svg        Comic halftone dot field, tileable (2048²)
  glitch-scanlines.svg Chromatic scanline + slice overlay (2048×1152)
textures/
  glass-reflection.svg Glass sheen / edge-light texture (2048×1152)
backgrounds/
  atmosphere-peter.svg Golden-hour sky gradient wash (3840×2160)
  atmosphere-miles.svg Neon-night sky gradient wash (3840×2160)
```

## In use (referenced by components/CSS)
- `backgrounds/{peter,miles}-city.jpg` → dominant Hero city background (`CityScene.jsx`)
- `transitions/{peter,miles}-shutter.jpg` → two-leaf theme shutter (`ThemeTransitionOverlay.jsx`)
- `characters/{peter,miles}-hang.png` → hanging character in `CharacterStage` (`characterManifest.js`)
- `favicon.svg` + `apple-touch-icon` + `og:image` → MV emblem (`index.html`)
- `overlays/halftone.svg` → CityScene lower-band comic treatment (`CityScene.jsx`)
- `overlays/web-overlay.svg` → Hero corner + brand stage (`HeroSection.jsx`)
- `textures/glass-reflection.svg` → Hero glass sheen accent (`HeroSection.jsx`)
- `branding/mv-logo-icon.svg` → faint Hero backdrop motif
- `backgrounds/atmosphere-{peter,miles}.svg` → kept as lightweight sky-wash fallbacks

## Character cutouts
`{peter,miles}-hang.png` were produced from the supplied source images (which had
baked-in backgrounds — checkerboard for Peter, solid navy for Miles) via an
edge-flood-fill + enclosed-pocket removal that preserves interior features (e.g.
the eye lenses). No blend-mode hacks or rectangular masks are used — the alpha is
real. Originals remain in the user's Downloads.
