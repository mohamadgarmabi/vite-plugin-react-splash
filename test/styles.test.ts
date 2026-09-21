import { describe, expect, it } from 'vitest';
import { generateStyles } from '../src/styles';
import type { SplashAnimation, SplashBackgroundAnimation } from '../src/types';

describe('generateStyles', () => {
  it('includes base splash screen layout styles', () => {
    const css = generateStyles({ logo: '<svg></svg>' });

    expect(css).toContain('#vite-splash-screen');
    expect(css).toContain('position: fixed');
    expect(css).toContain('.splash-logo');
  });

  it('uses light mode styles when mode is light', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      mode: 'light',
      theme: {
        light: { background: '#ffffff', color: '#111111' },
        dark: { background: '#000000', color: '#eeeeee' },
      },
    });

    expect(css).toContain('background-color: #ffffff');
    expect(css).toContain('.splash-logo-light { display: block; }');
    expect(css).not.toContain('@media (prefers-color-scheme: dark)');
  });

  it('uses dark mode styles when mode is dark', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      mode: 'dark',
      theme: {
        light: { background: '#fff', color: '#000' },
        dark: { background: '#111', color: '#eee' },
      },
    });

    expect(css).toContain('background-color: #111');
    expect(css).toContain('.splash-logo-dark { display: block; }');
  });

  it('adds spinner animation styles', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      animation: 'spinner',
    });

    expect(css).toContain('.splash-spinner');
    expect(css).toContain('@keyframes splash-spinner');
  });

  it('adds character animation styles and text inline styles', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      textAnimation: 'chars',
      textStyle: {
        fontSize: '1rem',
        marginTop: '8px',
        fontFamily: 'serif',
      },
    });

    expect(css).toContain('.splash-text-chars');
    expect(css).toContain('.splash-char');
    expect(css).toContain('font-size:1rem');
    expect(css).toContain('margin-top:8px');
    expect(css).toContain('font-family:serif');
  });

  it('ignores empty textStyle values', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      textStyle: {
        color: '',
        opacity: undefined,
      },
    });
    expect(css).not.toContain('.splash-text { color');
  });

  it('adds sequential svg fill transition styles', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      svgAnimation: {
        type: 'sequential-fill',
      },
    });

    expect(css).toContain('[data-splash-fill]');
    expect(css).toContain('transition-property: fill-opacity, stroke-opacity');
    expect(css).toContain('.splash-logo svg { width: 100%; height: 100%; }');
  });

  it('includes prefers-reduced-motion styles by default', () => {
    const css = generateStyles({ logo: '<svg></svg>' });

    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('splash-reduced-motion');
  });

  it('omits reduced-motion styles when respectReducedMotion is false', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      respectReducedMotion: false,
    });

    expect(css).not.toContain('prefers-reduced-motion: reduce');
  });

  it('adds controllable progress bar styles when progress is true', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      progress: true,
    });

    expect(css).toContain('.splash-progress');
    expect(css).toContain('transform: scaleX(0)');
  });

  it('adds indeterminate progress animation when animation is progress without progress flag', () => {
    const css = generateStyles({
      logo: '<svg></svg>',
      animation: 'progress',
    });

    expect(css).toContain('@keyframes splash-progress');
  });

  it('covers all logo animation variants', () => {
    const animations: SplashAnimation[] = [
      'fade',
      'pulse',
      'slide-up',
      'spin',
      'bounce',
      'shimmer',
      'ripple',
      'dots',
      'bars',
      'none',
    ];

    for (const animation of animations) {
      const css = generateStyles({ logo: '<svg></svg>', animation });
      expect(css).toContain('#vite-splash-screen');
    }
  });

  it('covers gradient-mesh with and without meshColors', () => {
    const withDefaults = generateStyles({
      logo: '<svg></svg>',
      animation: 'gradient-mesh',
    });
    expect(withDefaults).toContain('rotate-mesh');

    const custom = generateStyles({
      logo: '<svg></svg>',
      animation: 'gradient-mesh',
      meshColors: ['#f00', '#0f0'],
    });
    expect(custom).toContain('#f00');
    expect(custom).toContain('#0f0');
  });

  it('covers all background animations', () => {
    const backgrounds: SplashBackgroundAnimation[] = [
      'pulse',
      'breath',
      'gradient',
      'wave',
      'none',
    ];

    for (const backgroundAnimation of backgrounds) {
      const css = generateStyles({ logo: '<svg></svg>', backgroundAnimation });
      expect(css).toContain('#vite-splash-screen');
    }

    expect(
      generateStyles({ logo: '<svg></svg>', backgroundAnimation: 'pulse' })
    ).toContain('bg-pulse');
    expect(
      generateStyles({ logo: '<svg></svg>', backgroundAnimation: 'breath' })
    ).toContain('bg-breath');
    expect(
      generateStyles({ logo: '<svg></svg>', backgroundAnimation: 'gradient' })
    ).toContain('bg-gradient');
    expect(
      generateStyles({ logo: '<svg></svg>', backgroundAnimation: 'wave' })
    ).toContain('bg-wave');
  });
});
