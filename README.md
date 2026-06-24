# vite-plugin-react-splash

A Vite plugin and React hook for easy splash screen management in React applications.

## Installation

```bash
npm install vite-plugin-react-splash
# or
yarn add vite-plugin-react-splash
```

## Usage

### 1. Configure the Vite Plugin

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

### 2. Use the React Hook (Optional)

If you want to manually hide the splash screen (e.g., after initial data fetching):

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
| `svgAnimation` | `object` | Sequential SVG fill animation. See example below. |
| `bodyAttributes` | `Record<string, string>` | Attributes merged onto `<body>` while splash is visible; restored on hide. |
| `bodyClass` | `string \| string[]` | Class name(s) added to `<body>` while splash is visible; removed on hide. |
| `version` | `string` | Version string to display at the bottom. |
| `theme` | `object` | Light and dark mode colors. |
| `animation` | `string` | Animation style: `'none'`, `'pulse'`, `'gradient-mesh'`. |
| `onlyStandalone` | `boolean` | If `true`, only shows the splash screen in PWA standalone mode. |
| `showOnce` | `boolean` | If `true`, only shows the splash screen once per selected storage scope. |
| `showOnceStorage` | `'session' \| 'local'` | Controls whether `showOnce` is remembered for the current tab session or across browser restarts. |
| `showOnAppEnter` | `boolean` | If `true`, shows splash only when entering the app from outside its scope. Reloads and in-app navigations skip it. |
| `appScope` | `string \| string[]` | Path prefix(es) that belong to the app, for example `'/dealer'`. If omitted, the first URL segment is used. |
