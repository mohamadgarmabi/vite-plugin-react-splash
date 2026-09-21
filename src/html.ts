import type { SplashScreenOptions } from './types';

const escapeHtml = (raw: string): string =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildSplashMarkup = (options: SplashScreenOptions): string => {
  const {
    logo,
    text,
    version,
    animation,
    backgroundAnimation,
    textAnimation = 'none',
    textCharDelay = 50,
    textClassName,
    svgAnimation,
    progress = false,
  } = options;

  const showProgress = progress || animation === 'progress';
  const logoAnimatedClass = svgAnimation ? ' splash-logo-animated' : '';
  const logoHtml =
    typeof logo === 'string'
      ? `<div class="splash-logo${logoAnimatedClass}">${logo}</div>`
      : `<div class="splash-logo splash-logo-light${logoAnimatedClass}">${logo.light}</div><div class="splash-logo splash-logo-dark${logoAnimatedClass}">${logo.dark}</div>`;

  const textClasses = [
    'splash-text',
    textAnimation === 'chars' ? 'splash-text-chars' : '',
    textClassName || '',
  ]
    .filter(Boolean)
    .join(' ');

  const dotsHtml =
    animation === 'dots'
      ? '<div class="splash-dots"><span></span><span></span><span></span></div>'
      : '';
  const barsHtml =
    animation === 'bars'
      ? '<div class="splash-bars"><span></span><span></span><span></span><span></span><span></span></div>'
      : '';
  const spinnerHtml =
    animation === 'spinner' ? '<div class="splash-spinner"></div>' : '';
  const progressHtml = showProgress
    ? '<div class="splash-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="splash-progress-bar" style="transform:scaleX(0)"></div></div>'
    : '';

  const bgLayerHtml =
    backgroundAnimation && backgroundAnimation !== 'none'
      ? '<div class="splash-bg-layer"></div>'
      : '';

  const textHtml = text
    ? textAnimation === 'chars'
      ? `<div class="${textClasses}">${text
          .split('')
          .map(
            (char, i) =>
              `<span class="splash-char" style="animation-delay:${i * textCharDelay}ms">${escapeHtml(char)}</span>`
          )
          .join('')}</div>`
      : `<div class="${textClasses}">${escapeHtml(text)}</div>`
    : '';

  return `
<div id="vite-splash-screen">
${bgLayerHtml}
${logoHtml}
${textHtml}
${dotsHtml}
${barsHtml}
${spinnerHtml}
${progressHtml}
${version ? `<div class="splash-version">v${version}</div>` : ''}
</div>`.replace(/>\s+</g, '><').trim();
};

export { buildSplashMarkup };
