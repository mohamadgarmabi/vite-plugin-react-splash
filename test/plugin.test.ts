import { describe, expect, it } from 'vitest';
import { viteSplashScreen } from '../src/index';

const transformHtml = (html: string, options: Parameters<typeof viteSplashScreen>[0]) => {
  const plugin = viteSplashScreen(options);
  const transform = plugin.transformIndexHtml;

  if (typeof transform !== 'function') {
    throw new Error('Expected transformIndexHtml to be a function');
  }

  return transform(html, {
    path: '/index.html',
    filename: 'index.html',
    server: undefined,
    bundle: undefined,
  });
};

describe('viteSplashScreen', () => {
  it('injects splash markup after the body tag', () => {
    const html = transformHtml('<html><body class="app"></body></html>', {
      logo: '<svg data-testid="logo"></svg>',
      text: 'Loading',
      version: '1.0.0',
    });

    expect(html).toContain('<body class="app">');
    expect(html).toContain('id="vite-splash-screen"');
    expect(html).toContain('<svg data-testid="logo"></svg>');
    expect(html).toContain('Loading');
    expect(html).toContain('v1.0.0');
  });

  it('renders light and dark logos when logo is an object', () => {
    const html = transformHtml('<html><body></body></html>', {
      logo: {
        light: '<svg data-theme="light"></svg>',
        dark: '<svg data-theme="dark"></svg>',
      },
    });

    expect(html).toContain('splash-logo-light');
    expect(html).toContain('splash-logo-dark');
    expect(html).toContain('data-theme="light"');
    expect(html).toContain('data-theme="dark"');
  });

  it('escapes html in text content', () => {
    const html = transformHtml('<html><body></body></html>', {
      logo: '<svg></svg>',
      text: '<script>alert("x")</script>',
    });

    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
    expect(html).not.toContain('<script>alert("x")</script></div>');
  });

  it('adds loading animation markup for dots', () => {
    const html = transformHtml('<html><body></body></html>', {
      logo: '<svg></svg>',
      animation: 'dots',
    });

    expect(html).toContain('class="splash-dots"');
  });

  it('serializes runtime options into the injected script', () => {
    const html = transformHtml('<html><body></body></html>', {
      logo: '<svg></svg>',
      duration: 1500,
      onlyStandalone: true,
      showOnce: true,
      showOnceStorage: 'local',
      showOnAppEnter: true,
      appScope: '/dealer',
      bodyClass: 'overflow-hidden',
      bodyAttributes: { 'data-splash-active': 'true' },
    });

    expect(html).toContain('var d=1500,o=true,s1=true');
    expect(html).toContain('"local"');
    expect(html).toContain('"/dealer"');
    expect(html).toContain('"overflow-hidden"');
    expect(html).toContain('"data-splash-active":"true"');
  });
});
