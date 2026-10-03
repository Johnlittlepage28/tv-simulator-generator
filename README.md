# TV Simulator Generator

A small browser-based generator for experimenting with TV Simulator-style effect settings.

## Features

- Adjust eight TV-style parameters:
  - Detail Zoom
  - Aperture Grill
  - Interlacing
  - Line Sync
  - Vertical Sync
  - Scan Phasing
  - Phosphorescence
  - Static
- Load example settings such as **TV Look**, **Bad Sync**, and **Default**.
- Name a configuration and export its settings as JSON.
- Responsive interface for desktop and mobile browsers.
- About panel with usage notes.

## Files

Keep these files in the repository root:

```text
tv-simulator/
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html` — page structure
- `style.css` — layout and visual styling
- `script.js` — controls, example settings, About panel, and JSON export
- `README.md` — project documentation

## Run locally

1. Download or clone this repository.
2. Make sure `index.html`, `style.css`, and `script.js` are in the same folder.
3. Open `index.html` in a modern browser.

For the most reliable local testing, use a simple local web server or your editor's live-preview feature.

## Deploy with GitHub Pages

1. Push these files to the root of a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site. The published URL will appear in the Pages settings.

## Important note about VEGAS Pro

The JSON export saves the generator's parameter values for reference or reuse in this website. It is **not** a verified, directly importable VEGAS Pro preset or Windows Registry file. Genuine VEGAS preset data and testing inside the relevant VEGAS Pro version are required to confirm import compatibility.

## Disclaimer

This is an independent utility and is not affiliated with or endorsed by MAGIX or VEGAS Pro. Product names are used only to describe compatibility goals.


## VEGAS registry preset import/export

Use **Load VEGAS .reg** to load a genuine registry export containing a `DXTransform\Presets` binary value. Export preserves that original binary payload and changes the preset value name only. The eight sliders are not decoded into the binary structure, so slider changes do not modify the effect settings in the exported registry data. Back up your registry before importing any `.reg` file. Test in VEGAS Pro 18 before relying on compatibility.
