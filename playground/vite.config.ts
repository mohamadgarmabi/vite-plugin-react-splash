import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSplashScreen } from '../src/index';

const logoSvg = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="32" cy="32" r="24" fill="#3498db" />
  <path d="M20 34 L30 44 L46 24" stroke="#ffffff" stroke-width="4" fill="none" />
</svg>
`;

const config = defineConfig({
  plugins: [
    react(),
    viteSplashScreen({
      logo: {
        light: logoSvg,
        dark: logoSvg.replace('#3498db', '#9b59b6'),
      },
      duration: 5000,
      text: 'Splash playground',
      textAnimation: 'chars',
      textCharDelay: 40,
      version: 'playground',
      animation: 'pulse',
      backgroundAnimation: 'gradient',
      bodyClass: 'overflow-hidden',
      bodyAttributes: { 'data-splash-active': 'true' },
      svgAnimation: {
        type: 'sequential-fill',
        direction: 'ltr',
        stepDelay: 120,
        stepDuration: 350,
      },
      theme: {
        light: { background: '#f5f7fb', color: '#1f2937' },
        dark: { background: '#111827', color: '#f9fafb' },
      },
    }),
  ],
});

export default config;
