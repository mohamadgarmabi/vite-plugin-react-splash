import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clampProgress, useSplashScreen } from '../src/hook';

const createSplashElement = (withProgress = true) => {
  const splash = document.createElement('div');
  splash.id = 'vite-splash-screen';
  if (withProgress) {
    splash.innerHTML =
      '<div class="splash-progress" aria-valuenow="0"><div class="splash-progress-bar"></div></div>';
  }
  document.body.appendChild(splash);
  return splash;
};

describe('clampProgress', () => {
  it('clamps values into 0–100', () => {
    expect(clampProgress(-10)).toBe(0);
    expect(clampProgress(150)).toBe(100);
    expect(clampProgress(42)).toBe(42);
  });
});

describe('useSplashScreen', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    delete window.__viteSplashHide;
    delete window.__viteSplashSetProgress;
    delete window.__viteSplashRestoreBody;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds hidden class and removes splash after hideSplashScreen', () => {
    const splash = createSplashElement();
    const critical = document.createElement('style');
    critical.id = 'vite-splash-critical';
    document.head.appendChild(critical);

    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.hideSplashScreen();
    });

    expect(splash.classList.contains('hidden')).toBe(true);
    expect(document.getElementById('vite-splash-critical')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(document.getElementById('vite-splash-screen')).toBeNull();
  });

  it('hides safely when splash element is missing', () => {
    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.hideSplashScreen();
    });

    expect(document.getElementById('vite-splash-screen')).toBeNull();
  });

  it('delegates hide to window.__viteSplashHide when available', () => {
    createSplashElement();
    const hide = vi.fn();
    window.__viteSplashHide = hide;

    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.hideSplashScreen();
    });

    expect(hide).toHaveBeenCalledTimes(1);
  });

  it('restores body state through the global restore hook when no hide global', () => {
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
      result.current.setSplashTheme('light');
    });
    expect(splash.classList.contains('theme-light')).toBe(true);

    act(() => {
      result.current.setSplashTheme('auto');
    });

    expect(localStorage.getItem('v-splash-theme')).toBeNull();
    expect(splash.classList.contains('theme-dark')).toBe(false);
  });

  it('applies theme storage even when splash is not mounted', () => {
    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.setSplashTheme('dark');
    });

    expect(localStorage.getItem('v-splash-theme')).toBe('dark');
  });

  it('swallows localStorage errors', () => {
    const { result } = renderHook(() => useSplashScreen());
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });

    act(() => {
      result.current.setSplashTheme('dark');
    });

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('updates progress bar via setProgress', () => {
    const splash = createSplashElement();
    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.setProgress(70);
    });

    const bar = splash.querySelector('.splash-progress-bar') as HTMLElement;
    const wrap = splash.querySelector('.splash-progress');
    expect(bar.style.transform).toBe('scaleX(0.7)');
    expect(wrap?.getAttribute('aria-valuenow')).toBe('70');
  });

  it('clamps progress and no-ops without splash or bar', () => {
    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.setProgress(200);
    });

    createSplashElement(false);
    act(() => {
      result.current.setProgress(-5);
    });

    expect(document.querySelector('.splash-progress-bar')).toBeNull();
  });

  it('delegates setProgress to window.__viteSplashSetProgress when available', () => {
    createSplashElement();
    const setProgressGlobal = vi.fn();
    window.__viteSplashSetProgress = setProgressGlobal;

    const { result } = renderHook(() => useSplashScreen());

    act(() => {
      result.current.setProgress(40);
    });

    expect(setProgressGlobal).toHaveBeenCalledWith(40);
  });
});
