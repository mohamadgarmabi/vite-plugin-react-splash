import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSplashScreen } from '../src/hook';

const createSplashElement = () => {
  const splash = document.createElement('div');
  splash.id = 'vite-splash-screen';
  document.body.appendChild(splash);
  return splash;
};

describe('useSplashScreen', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds hidden class and removes splash after hideSplashScreen', () => {
    const splash = createSplashElement();
    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.hideSplashScreen();
    });

    expect(splash.classList.contains('hidden')).toBe(true);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(document.getElementById('vite-splash-screen')).toBeNull();
  });

  it('restores body state through the global restore hook', () => {
    createSplashElement();
    const restoreBody = vi.fn();
    window.__viteSplashRestoreBody = restoreBody;

    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.hideSplashScreen();
    });

    expect(restoreBody).toHaveBeenCalledTimes(1);
  });

  it('stores and applies splash theme preferences', () => {
    const splash = createSplashElement();
    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.setSplashTheme('dark');
    });

    expect(localStorage.getItem('v-splash-theme')).toBe('dark');
    expect(splash.classList.contains('theme-dark')).toBe(true);

    act(() => {
      result.current.setSplashTheme('auto');
    });

    expect(localStorage.getItem('v-splash-theme')).toBeNull();
    expect(splash.classList.contains('theme-dark')).toBe(false);
  });
});
