import { describe, expect, it } from 'vitest';
import { generateStyles } from '../src/styles';

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
      },
    });

    expect(css).toContain('.splash-text-chars');
    expect(css).toContain('.splash-char');
    expect(css).toContain('font-size:1rem');
    expect(css).toContain('margin-top:8px');
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
  });
});
