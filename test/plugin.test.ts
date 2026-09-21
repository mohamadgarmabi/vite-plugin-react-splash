import { describe, expect, it } from 'vitest';
import {
  injectBodySplash,
  injectCriticalCss,
  viteSplashScreen,
} from '../src/index';

const transformHtml = (
  html: string,
  options: Parameters<typeof viteSplashScreen>[0]
): string => {
  const plugin = viteSplashScreen(options);
  const transform = plugin.transformIndexHtml;

  if (typeof transform !== 'function') {
    throw new Error('Expected transformIndexHtml to be a function');
  }

  const result = transform(html, {
    path: '/index.html',
    filename: 'index.html',
    server: undefined,
    bundle: undefined,
  });

  if (typeof result !== 'string') {
    throw new Error('Expected transformIndexHtml to return a string');
  }

  return result;
};

describe('injectCriticalCss', () => {
  it('injects before closing head', () => {
    const html = injectCriticalCss(
      '<html><head><title>x</title></head><body></body></html>',
      'color:red'
    );
    expect(html).toContain(
      '<style id="vite-splash-critical">color:red</style></head>'
    );
  });

  it('creates head when html exists without head', () => {
    const html = injectCriticalCss('<html lang="en"><body></body></html>', 'a');
    expect(html).toContain('<head><style id="vite-splash-critical">a</style></head>');
  });

  it('prepends style when no html tag', () => {
    const html = injectCriticalCss('<body></body>', 'b');
    expect(html.startsWith('<style id="vite-splash-critical">b</style>')).toBe(
      true
    );
  });
});

describe('injectBodySplash', () => {
  it('injects after body open tag', () => {
    const html = injectBodySplash('<html><body class="x"></body></html>', 'SPLASH');
    expect(html).toContain('<body class="x">SPLASH');
  });

  it('prepends when body is missing', () => {
    const html = injectBodySplash('<html></html>', 'SPLASH');
    expect(html.startsWith('SPLASH')).toBe(true);
  });
});

describe('viteSplashScreen', () => {
  it('injects critical CSS into head', () => {
    const html = transformHtml(
      '<html><head><title>App</title></head><body></body></html>',
      { logo: '<svg></svg>' }
    );

    expect(html).toContain('id="vite-splash-critical"');
    expect(html.indexOf('id="vite-splash-critical"')).toBeLessThan(
      html.indexOf('</head>')
    );
    expect(html.indexOf('id="vite-splash-critical"')).toBeLessThan(
      html.indexOf('<body')
    );
  });

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

  it('adds controllable progress markup when progress is true', () => {
    const html = transformHtml('<html><body></body></html>', {
      logo: '<svg></svg>',
      progress: true,
    });

    expect(html).toContain('class="splash-progress"');
    expect(html).toContain('splash-progress-bar');
    expect(html).toContain('__viteSplashSetProgress');
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
      waitUntilReady: true,
      minDuration: 400,
      respectReducedMotion: true,
    });

    expect(html).toContain('var d=1500,o=true,s1=true');
    expect(html).toContain('"local"');
    expect(html).toContain('"/dealer"');
    expect(html).toContain('"overflow-hidden"');
    expect(html).toContain('"data-splash-active":"true"');
    expect(html).toContain('wr=true');
    expect(html).toContain('md=400');
    expect(html).toContain('rm=true');
    expect(html).toContain('__viteSplashHide');
  });

  it('exposes plugin name', () => {
    const plugin = viteSplashScreen({ logo: '<svg></svg>' });
    expect(plugin.name).toBe('vite-plugin-react-splash');
  });
});
