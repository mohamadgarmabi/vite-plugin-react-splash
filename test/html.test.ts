import { describe, expect, it } from 'vitest';
import { buildSplashMarkup } from '../src/html';

describe('buildSplashMarkup', () => {
  it('renders a single logo string', () => {
    const html = buildSplashMarkup({ logo: '<svg id="one"></svg>' });
    expect(html).toContain('id="vite-splash-screen"');
    expect(html).toContain('<svg id="one"></svg>');
    expect(html).not.toContain('splash-logo-light');
  });

  it('renders light and dark logos with svg animation class', () => {
    const html = buildSplashMarkup({
      logo: { light: '<svg data-l="1"></svg>', dark: '<svg data-d="1"></svg>' },
      svgAnimation: { type: 'sequential-fill' },
    });
    expect(html).toContain('splash-logo-animated');
    expect(html).toContain('splash-logo-light');
    expect(html).toContain('splash-logo-dark');
  });

  it('renders plain text and version', () => {
    const html = buildSplashMarkup({
      logo: '<svg></svg>',
      text: 'Hello & <world>',
      version: '2.0.0',
      textClassName: 'extra',
    });
    expect(html).toContain('Hello &amp; &lt;world&gt;');
    expect(html).toContain('v2.0.0');
    expect(html).toContain('extra');
  });

  it('renders character-by-character text', () => {
    const html = buildSplashMarkup({
      logo: '<svg></svg>',
      text: 'ab',
      textAnimation: 'chars',
      textCharDelay: 10,
    });
    expect(html).toContain('splash-text-chars');
    expect(html).toContain('animation-delay:0ms');
    expect(html).toContain('animation-delay:10ms');
  });

  it('renders loader variants and background layer', () => {
    expect(buildSplashMarkup({ logo: '<svg></svg>', animation: 'dots' })).toContain(
      'splash-dots'
    );
    expect(buildSplashMarkup({ logo: '<svg></svg>', animation: 'bars' })).toContain(
      'splash-bars'
    );
    expect(
      buildSplashMarkup({ logo: '<svg></svg>', animation: 'spinner' })
    ).toContain('splash-spinner');
    expect(
      buildSplashMarkup({ logo: '<svg></svg>', animation: 'progress' })
    ).toContain('splash-progress');
    expect(
      buildSplashMarkup({
        logo: '<svg></svg>',
        progress: true,
        backgroundAnimation: 'pulse',
      })
    ).toContain('splash-bg-layer');
  });

  it('skips background layer when none', () => {
    const html = buildSplashMarkup({
      logo: '<svg></svg>',
      backgroundAnimation: 'none',
    });
    expect(html).not.toContain('splash-bg-layer');
  });
});
