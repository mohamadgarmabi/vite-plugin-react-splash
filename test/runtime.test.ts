import { describe, expect, it } from 'vitest';
import { createRuntimeScript } from '../src/runtime';

describe('createRuntimeScript', () => {
  it('applies defaults', () => {
    const script = createRuntimeScript({ logo: '<svg></svg>' });
    expect(script).toContain('var d=3000');
    expect(script).toContain('o=false');
    expect(script).toContain('s1=false');
    expect(script).toContain('"session"');
    expect(script).toContain('rm=true');
    expect(script).toContain('wr=false');
    expect(script).toContain('md=0');
    expect(script).toContain('pg=false');
    expect(script).toContain('__viteSplashHide');
    expect(script).toContain('__viteSplashSetProgress');
    expect(script).toContain('vite-splash-critical');
  });

  it('normalizes appScope and bodyClass arrays', () => {
    const script = createRuntimeScript({
      logo: '<svg></svg>',
      appScope: ['/a', '/b'],
      bodyClass: ['c1', 'c2'],
      bodyAttributes: { 'data-x': '1' },
      svgAnimation: { type: 'sequential-fill', direction: 'rtl' },
      waitUntilReady: true,
      minDuration: 250,
      progress: true,
      showOnceStorage: 'local',
    });

    expect(script).toContain('["/a","/b"]');
    expect(script).toContain('["c1","c2"]');
    expect(script).toContain('"data-x":"1"');
    expect(script).toContain('"rtl"');
    expect(script).toContain('wr=true');
    expect(script).toContain('md=250');
    expect(script).toContain('pg=true');
    expect(script).toContain('"local"');
  });

  it('normalizes single appScope and bodyClass strings', () => {
    const script = createRuntimeScript({
      logo: '<svg></svg>',
      appScope: '/dealer',
      bodyClass: 'overflow-hidden',
      animation: 'progress',
    });

    expect(script).toContain('["/dealer"]');
    expect(script).toContain('["overflow-hidden"]');
    expect(script).toContain('pg=true');
  });

  it('respects respectReducedMotion false', () => {
    const script = createRuntimeScript({
      logo: '<svg></svg>',
      respectReducedMotion: false,
    });
    expect(script).toContain('rm=false');
  });
});
