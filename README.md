# TypeScript Starter for WebExtensions

A boilerplate browser extension built with **TypeScript**, **Webpack**, and **Manifest V3**, supporting both **Chrome** and **Firefox**.

## Features

- ✅ **Cross-browser support** (Chrome & Firefox)
- 🧩 **Manifest V3**: Latest standard for Chrome extensions
- ⚙️ **TypeScript**: Strongly typed for better DX
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- 🧱 **Modular Structure**: Background, content, popup, and service layers
- ⏱️ **Task Scheduler**: Built-in example service
- 🧩 **webextension-polyfill**: Unified `browser` API across all browsers
- 🧪 **Hot-reload-friendly**: Fast development loop with watch mode

## Project Structure

```
├── package.json
├── tsconfig.json
├── webpack.config.js
├── src/
│   ├── manifest.base.json
│   ├── manifest.chrome.json
│   ├── manifest.firefox.json
│   ├── html/
│   │   ├── options.html
│   │   └── popup.html
│   │   └── ... Other html
│   ├── icons/
│   │   ├── icon.png
│   │   ├── icon128.png
│   │   ├── icon16.png
│   │   └── icon48.png
│   ├── scripts/
│   │   ├── background.ts
│   │   ├── content.ts
│   │   └── popup.ts
│   │   └── ... Other scripts
│   └── services/
│       └── scheduler.ts
│       └── ... Other services
```

## Styling

This project includes **Tailwind CSS** for styling. The main stylesheet is located at `src/styles/main.css` and uses Tailwind directives. The build process automatically processes these styles and includes them in your extension.

You can use Tailwind utility classes directly in your HTML files:

```html
<div class="bg-blue-500 text-white p-4 rounded-lg">Styled with Tailwind CSS</div>
```

The Tailwind configuration can be customized in `tailwind.config.js`.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
git clone <repo-url>
cd typescript-starter-for-webextensions
npm install
```

## Development

### Chrome (watch mode)

```bash
npm run dev:chrome
```

### Firefox (watch mode)

```bash
npm run dev:firefox
```

## Production Build

### Chrome

```bash
npm run build:chrome
```

### Firefox

```bash
npm run build:firefox
```

## Load the Extension

### Chrome

1. Run the build: `npm run build:chrome`
2. Open `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked** and select the `dist/chrome/` folder

### Firefox

1. Run the build: `npm run build:firefox`
2. Open `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** and select the `manifest.json` file in the `dist/firefox/` folder

## Scripts Overview

- **background.ts**: Background service worker entry
- **content.ts**: Runs in every matching tab, uses scheduler
- **popup.ts**: UI logic for popup
- **scheduler.ts**: Reusable task scheduling utility

## Polyfill Notes

This project uses [`webextension-polyfill`](https://github.com/mozilla/webextension-polyfill) to ensure compatibility with both `chrome` and `browser` extension APIs.

Use it like:

```ts
import browser from "webextension-polyfill";

const tabs = await browser.tabs.query({ active: true });
```

## License

[MIT](./LICENSE)

---

Made with ❤️ by [A R Arif](https://ararif.me)
