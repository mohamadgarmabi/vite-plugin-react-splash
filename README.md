# vite-plugin-react-splash

[![npm version](https://img.shields.io/npm/v/vite-plugin-react-splash.svg)](https://www.npmjs.com/package/vite-plugin-react-splash)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-react-splash.svg)](https://www.npmjs.com/package/vite-plugin-react-splash)
[![license](https://img.shields.io/npm/l/vite-plugin-react-splash.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

**Vite plugin + React hook for splash screens and loading screens** in React apps and PWAs.

Inject a branded splash / boot / launch screen into `index.html` at build time, then hide it from React when your app is ready. Supports light/dark themes, animations, PWA standalone mode, and show-once behavior.

📦 [npm package](https://www.npmjs.com/package/vite-plugin-react-splash) · ⭐ [GitHub repo](https://github.com/mohamadgarmabi/vite-plugin-react-splash)

## Why this package?

- **Vite-native**: works as a standard Vite plugin (`transformIndexHtml`)
- **React-friendly**: `useSplashScreen()` to hide the splash after data loads
- **PWA-ready**: optional `onlyStandalone` for installed Progressive Web Apps
- **Theming**: light / dark / auto, plus runtime theme sync
- **Animations**: pulse, fade, spinner, dots, bars, progress, gradient-mesh, SVG sequential fill, and more
- **Smart display**: `showOnce`, `showOnAppEnter`, and `appScope` for multi-app setups

Useful when searching for: *vite splash screen*, *react loading screen*, *PWA launch screen*, *vite plugin splash*, *hide splash screen react*.

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

In your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSplashScreen } from 'vite-plugin-react-splash';

export default defineConfig({
  plugins: [
    react(),
    viteSplashScreen({
      logo: {
        light: `<svg ...>...</svg>`, // Logo for light mode
        dark: `<svg ...>...</svg>`   // Logo for dark mode
      },
      duration: 3000,
      text: 'Loading My Awesome App...',
      textClassName: 'my-splash-caption',
      textStyle: {
        fontSize: '0.95rem',
        color: '#666',
        marginTop: '12px',
      },
      svgAnimation: {
        type: 'sequential-fill',
        direction: 'ltr', // or 'rtl'
        stepDelay: 120,
        stepDuration: 350,
      },
      bodyClass: 'overflow-hidden',
      bodyAttributes: { 'data-splash-active': 'true' },
      version: '1.0.0',
      theme: {
        light: { background: '#f0f0f0', color: '#333' },
        dark: { background: '#1a1a1a', color: '#fff' }
      },
      animation: 'gradient-mesh',
      onlyStandalone: true,
      showOnce: true,
      showOnAppEnter: true,
      appScope: '/dealer'
    }),
  ],
});
```

### 2. Use the React hook (optional)

Hide the splash screen after initial data fetching, or sync theme with your app:

```tsx
import { useEffect } from 'react';
import { useSplashScreen } from 'vite-plugin-react-splash';

function App() {
  const { hideSplashScreen, setSplashTheme } = useSplashScreen();

  useEffect(() => {
    // Example: Sync with your app's theme
    const myAppTheme = 'dark'; // get from your state
    setSplashTheme(myAppTheme);

    fetchData().then(() => {
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
| `duration` | `number` | Time in ms before the splash screen automatically hides. |
| `text` | `string` | Text to display below the logo. |
| `textClassName` | `string` | Extra CSS class(es) for the description text. |
| `textStyle` | `object` | Custom CSS styles for the description text (e.g. `fontSize`, `color`, `marginTop`). |
| `textAnimation` | `'none' \| 'chars'` | Reveal description all at once or character by character. |
| `textCharDelay` | `number` | Delay in ms between each character when `textAnimation` is `'chars'`. |
| `svgAnimation` | `object` | Sequential SVG fill animation. See example above. |
| `bodyAttributes` | `Record<string, string>` | Attributes merged onto `<body>` while splash is visible; restored on hide. |
| `bodyClass` | `string \| string[]` | Class name(s) added to `<body>` while splash is visible; removed on hide. |
| `version` | `string` | Version string to display at the bottom. |
| `theme` | `object` | Light and dark mode colors. |
| `animation` | `string` | Animation style: `'none'`, `'fade'`, `'pulse'`, `'slide-up'`, `'spin'`, `'bounce'`, `'shimmer'`, `'ripple'`, `'dots'`, `'bars'`, `'spinner'`, `'progress'`, `'gradient-mesh'`. |
| `meshColors` | `string[]` | Custom colors for `gradient-mesh` animation. |
| `backgroundAnimation` | `'none' \| 'pulse' \| 'breath' \| 'gradient' \| 'wave'` | Background color animation. |
| `onlyStandalone` | `boolean` | If `true`, only shows the splash screen in PWA standalone mode. |
| `showOnce` | `boolean` | If `true`, only shows the splash screen once per selected storage scope. |
| `showOnceStorage` | `'session' \| 'local'` | Controls whether `showOnce` is remembered for the current tab session or across browser restarts. |
| `showOnAppEnter` | `boolean` | If `true`, shows splash only when entering the app from outside its scope. Reloads and in-app navigations skip it. |
| `appScope` | `string \| string[]` | Path prefix(es) that belong to the app, for example `'/dealer'`. If omitted, the first URL segment is used. |

## Related searches

This package is a good fit if you need a **Vite React splash screen plugin**, **PWA loading screen**, **launch screen for Vite**, or a **React hook to hide splash after boot**.

## License

[MIT](./LICENSE) © Mohammad Garmabi
