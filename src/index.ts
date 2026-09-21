import type { Plugin } from 'vite';
import type { SplashScreenOptions } from './types';
import { generateStyles } from './styles';
import { buildSplashMarkup } from './html';
import { createRuntimeScript } from './runtime';

const injectCriticalCss = (html: string, styles: string): string => {
  const styleTag = `<style id="vite-splash-critical">${styles}</style>`;
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${styleTag}</head>`);
  }
  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html([^>]*)>/i, `<html$1><head>${styleTag}</head>`);
  }
  return `${styleTag}${html}`;
};

const injectBodySplash = (html: string, bodyContent: string): string => {
  if (/<body([^>]*)>/i.test(html)) {
    return html.replace(/<body([^>]*)>/i, `<body$1>${bodyContent}`);
  }
  return `${bodyContent}${html}`;
};

const viteSplashScreen = (options: SplashScreenOptions): Plugin => {
  return {
    name: 'vite-plugin-react-splash',
    transformIndexHtml(html: string): string {
      const styles = generateStyles(options);
      const markup = buildSplashMarkup(options);
      const script = createRuntimeScript(options);
      const bodyContent = `${markup}${script}`.replace(/>\s+</g, '><').trim();

      const withHead = injectCriticalCss(html, styles);
      return injectBodySplash(withHead, bodyContent);
    },
  };
};

export { viteSplashScreen, injectCriticalCss, injectBodySplash };
export * from './types';
export { useSplashScreen } from './hook';
