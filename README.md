# vite-plugin-react-splash

[![npm version](https://img.shields.io/npm/v/vite-plugin-react-splash.svg)](https://www.npmjs.com/package/vite-plugin-react-splash)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-react-splash.svg)](https://www.npmjs.com/package/vite-plugin-react-splash)
[![license](https://img.shields.io/npm/l/vite-plugin-react-splash.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

**Fast Vite splash screen plugin + React hook** for React apps and PWAs — critical CSS for better **FCP/LCP**, progress API, `prefers-reduced-motion`, and `waitUntilReady`.

Inject a branded splash / boot / launch screen into `index.html` at build time, then hide it from React when your app is ready.

📦 [npm package](https://www.npmjs.com/package/vite-plugin-react-splash) · ⭐ [GitHub repo](https://github.com/mohamadgarmabi/vite-plugin-react-splash)

## Why this package?

- **Faster first paint**: critical splash CSS is injected into `<head>` for better FCP/LCP
- **Vite-native**: standard Vite plugin (`transformIndexHtml`)
- **React-friendly**: `useSplashScreen()` with `hideSplashScreen`, `setSplashTheme`, `setProgress`
- **Wait until ready**: `waitUntilReady` + `minDuration` for controlled hide
- **Accessible motion**: `respectReducedMotion` (default on) honors `prefers-reduced-motion`
- **Progress bar**: drive loading percent from React (`setProgress(0–100)`)
- **PWA-ready**: optional `onlyStandalone`
- **Theming**: light / dark / auto, plus runtime theme sync
- **Animations**: pulse, fade, spinner, dots, bars, progress, gradient-mesh, SVG sequential fill, and more

Useful when searching for: *vite splash screen*, *react loading screen*, *PWA launch screen*, *vite plugin splash*, *FCP LCP splash*, *critical CSS splash*.

## Performance

Splash styles ship as `<style id="vite-splash-critical">` in `<head>` so the splash can paint before the React bundle loads. The critical style tag is removed when the splash is torn down.

## Installation

```bash
npm install vite-plugin-react-splash
# or
pnpm add vite-plugin-react-splash
# or
yarn add vite-plugin-react-splash
```

## Quick start

### 1. Configure the Vite plugin

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSplashScreen } from 'vite-plugin-react-splash';

export default defineConfig({
  plugins: [
    react(),
    viteSplashScreen({
      logo: {
        light: `<svg ...>...</svg>`,
        dark: `<svg ...>...</svg>`,
      },
      duration: 3000,
      waitUntilReady: true,
      minDuration: 400,
      progress: true,
      respectReducedMotion: true,
      text: 'Loading My Awesome App...',
      theme: {
        light: { background: '#f0f0f0', color: '#333' },
        dark: { background: '#1a1a1a', color: '#fff' },
      },
      animation: 'pulse',
    }),
  ],
});
```

### 2. Use the React hook

```tsx
import { useEffect } from 'react';
import { useSplashScreen } from 'vite-plugin-react-splash';

function App() {
  const { hideSplashScreen, setSplashTheme, setProgress } = useSplashScreen();

  useEffect(() => {
    setSplashTheme('dark');
    setProgress(30);

    fetchData().then(() => {
      setProgress(100); // with waitUntilReady, 100 also requests hide
      hideSplashScreen();
    });
  }, []);

  return <div>My App Content</div>;
}
```

## Options

| Option | Type | Description |
| --- | --- | --- |
| `logo` | `string \| { light: string, dark: string }` | SVG string or object with light/dark versions. |
| `mode` | `'light' \| 'dark' \| 'auto'` | Theme mode. `'auto'` detects system settings (default). |
| `duration` | `number` | Auto-hide delay in ms when `waitUntilReady` is false (default `3000`). |
| `waitUntilReady` | `boolean` | If `true`, do not auto-hide; wait for `hideSplashScreen()` or `setProgress(100)`. |
| `minDuration` | `number` | Earliest hide allowed in ms since splash shown (default `0`). |
| `progress` | `boolean` | Render a controllable progress bar for `setProgress`. |
| `respectReducedMotion` | `boolean` | Honor `prefers-reduced-motion` (default `true`). |
| `text` | `string` | Text to display below the logo. |
| `textClassName` | `string` | Extra CSS class(es) for the description text. |
| `textStyle` | `object` | Custom CSS styles for the description text. |
| `textAnimation` | `'none' \| 'chars'` | Reveal description all at once or character by character. |
| `textCharDelay` | `number` | Delay in ms between each character when `textAnimation` is `'chars'`. |
| `svgAnimation` | `object` | Sequential SVG fill animation. |
| `bodyAttributes` | `Record<string, string>` | Attributes merged onto `<body>` while splash is visible. |
| `bodyClass` | `string \| string[]` | Class name(s) added to `<body>` while splash is visible. |
| `version` | `string` | Version string to display at the bottom. |
| `theme` | `object` | Light and dark mode colors. |
| `animation` | `string` | `'none'`, `'fade'`, `'pulse'`, `'slide-up'`, `'spin'`, `'bounce'`, `'shimmer'`, `'ripple'`, `'dots'`, `'bars'`, `'spinner'`, `'progress'`, `'gradient-mesh'`. |
| `meshColors` | `string[]` | Custom colors for `gradient-mesh` animation. |
| `backgroundAnimation` | `'none' \| 'pulse' \| 'breath' \| 'gradient' \| 'wave'` | Background color animation. |
| `onlyStandalone` | `boolean` | Only show in PWA standalone mode. |
| `showOnce` | `boolean` | Only show once per selected storage scope. |
| `showOnceStorage` | `'session' \| 'local'` | Storage scope for `showOnce`. |
| `showOnAppEnter` | `boolean` | Show only when entering the app from outside its scope. |
| `appScope` | `string \| string[]` | Path prefix(es) for the app, e.g. `'/dealer'`. |

## Hook API

| Method | Description |
| --- | --- |
| `hideSplashScreen()` | Request hide (respects `minDuration`). |
| `setSplashTheme(theme)` | `'light' \| 'dark' \| 'auto'`. |
| `setProgress(value)` | `0–100`. With `waitUntilReady`, `100` also requests hide. |

## Related searches

**Vite React splash screen plugin**, **PWA loading screen**, **critical CSS splash**, **FCP LCP boot screen**, **React progress splash**, **prefers-reduced-motion splash**.

## Development

```bash
pnpm test
pnpm test:coverage   # requires 100% lines/branches/functions/statements
pnpm typecheck
pnpm playground
```
