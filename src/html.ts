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
    textAnimation === 'gooey' ? 'splash-text-gooey' : '',
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

  // Gooey: letters start spread (up to ±40px) and slide together through a blur + alpha-threshold
  // filter so they melt into each other; the blur then animates to 0 for a crisp wordmark.
  const mid = text ? (text.length - 1) / 2 : 0;
  // Stagger 40ms per letter, capped at 200ms total so every letter lands before the blur resolves (~1.1s).
  const step = Math.min(40, 200 / Math.max(mid * 2, 1));
  const gooeyFilter =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="vite-splash-gooey" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="8"><animate attributeName="stdDeviation" values="8;0" begin="0.7s" dur="0.4s" fill="freeze"/></feGaussianBlur><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -8"/></filter></svg>';

  const textHtml = !text
    ? ''
    : textAnimation === 'gooey'
      ? `${gooeyFilter}<div class="${textClasses}" role="img" aria-label="${escapeHtml(text)}">${text
          .split('')
          .map(
            (char, i) =>
              `<span class="splash-gooey-char" style="--d:${150 + Math.round(i * step)}ms;--dx:${Math.round(((i - mid) / Math.max(mid, 1)) * 40)}px">${escapeHtml(char)}</span>`
          )
          .join('')}</div>`
      : textAnimation === 'chars'
        ? `<div class="${textClasses}">${text
            .split('')
            .map(
              (char, i) =>
                `<span class="splash-char" style="animation-delay:${i * textCharDelay}ms">${escapeHtml(char)}</span>`
            )
            .join('')}</div>`
        : `<div class="${textClasses}">${escapeHtml(text)}</div>`;

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
</div>`.replace(/>\s*\n\s*</g, '><').trim();
};

export { buildSplashMarkup };
