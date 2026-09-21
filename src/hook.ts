import { useCallback } from 'react';
import type { SplashThemeMode, UseSplashScreenResult } from './types';

declare global {
  interface Window {
    __viteSplashRestoreBody?: () => void;
    __viteSplashHide?: () => void;
    __viteSplashSetProgress?: (value: number) => void;
  }
}

const clampProgress = (value: number): number =>
  Math.min(100, Math.max(0, value));

const useSplashScreen = (): UseSplashScreenResult => {
  const hideSplashScreen = useCallback((): void => {
    if (window.__viteSplashHide) {
      window.__viteSplashHide();
      return;
    }

    const splash = document.getElementById('vite-splash-screen');
    if (splash) {
      splash.classList.add('hidden');
      window.__viteSplashRestoreBody?.();
      setTimeout(() => {
        splash.remove();
      }, 500);
    }

    document.getElementById('vite-splash-critical')?.remove();
  }, []);

  const setSplashTheme = useCallback((theme: SplashThemeMode): void => {
    try {
      if (theme === 'auto') {
        localStorage.removeItem('v-splash-theme');
      } else {
        localStorage.setItem('v-splash-theme', theme);
      }

      const splash = document.getElementById('vite-splash-screen');
      if (!splash) return;

      splash.classList.remove('theme-light', 'theme-dark');
      if (theme !== 'auto') {
        splash.classList.add(`theme-${theme}`);
      }
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }, []);

  const setProgress = useCallback((value: number): void => {
    if (window.__viteSplashSetProgress) {
      window.__viteSplashSetProgress(value);
      return;
    }

    const splash = document.getElementById('vite-splash-screen');
    if (!splash) return;

    const clamped = clampProgress(value);
    const bar = splash.querySelector('.splash-progress-bar');
    const wrap = splash.querySelector('.splash-progress');

    if (bar instanceof HTMLElement) {
      bar.style.transform = `scaleX(${clamped / 100})`;
    }
    if (wrap) {
      wrap.setAttribute('aria-valuenow', String(Math.round(clamped)));
    }
  }, []);

  return { hideSplashScreen, setSplashTheme, setProgress };
};

export { useSplashScreen, clampProgress };
export type { UseSplashScreenResult };
