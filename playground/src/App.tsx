import { useSplashScreen } from '../../src/hook';

const App = () => {
  const { hideSplashScreen, setSplashTheme, setProgress } = useSplashScreen();

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <h1 style={styles.title}>Splash Playground</h1>
        <p style={styles.copy}>
          waitUntilReady is on — hide via button or setProgress(100). minDuration is
          400ms. Critical CSS is in head for faster FCP.
        </p>

        <div style={styles.actions}>
          <button type="button" style={styles.button} onClick={hideSplashScreen}>
            Hide splash
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => setProgress(30)}
          >
            Progress 30%
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => setProgress(70)}
          >
            Progress 70%
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => setProgress(100)}
          >
            Progress 100% (hide)
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => setSplashTheme('light')}
          >
            Theme: light
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => setSplashTheme('dark')}
          >
            Theme: dark
          </button>
          <button
            type="button"
            style={styles.button}
            onClick={() => setSplashTheme('auto')}
          >
            Theme: auto
          </button>
        </div>
      </section>
    </main>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
    fontFamily: '-apple-system, system-ui, sans-serif',
    background: '#eef2ff',
    color: '#111827',
  },
  panel: {
    width: 'min(100%, 560px)',
    padding: '24px',
    borderRadius: '16px',
    background: '#ffffff',
    boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
  },
  title: {
    margin: '0 0 12px',
    fontSize: '1.75rem',
  },
  copy: {
    margin: '0 0 20px',
    lineHeight: 1.5,
    color: '#4b5563',
  },
  actions: {
    display: 'grid',
    gap: '12px',
  },
  button: {
    padding: '12px 16px',
    border: '0',
    borderRadius: '10px',
    background: '#2563eb',
    color: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
} as const;

export default App;
