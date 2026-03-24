<script lang="ts">
  // Hero section — ANSI pixel logo + tagline zen + CTA multi-plataforma
  interface Props {
    version?: string;
    releasePageUrl?: string | null;
    // Windows
    installerUrl?: string | null;
    windowsUrl?: string | null;
    // macOS
    macosUrl?: string | null;
    macosZipUrl?: string | null;
    // Linux
    linuxUrl?: string | null;
  }

  let {
    version = 'v0.2.0',
    releasePageUrl = null,
    installerUrl = null,
    windowsUrl = null,
    macosUrl = null,
    macosZipUrl = null,
    linuxUrl = null,
  }: Props = $props();

  const githubReleasesUrl = 'https://github.com/marcelomatz/myterm/releases';

  // Plataformas que têm assets disponíveis
  const hasMacos = $derived(!!(macosUrl || macosZipUrl));
  const hasLinux = $derived(!!linuxUrl);
</script>

<header class="hero scanlines">
  <div class="hero-inner">
    <!-- Logo ANSI pixel -->
    <pre class="ansi-logo" aria-label="myTerm">
 ███╗   ███╗██╗   ██╗████████╗███████╗██████╗ ███╗   ███╗
 ████╗ ████║╚██╗ ██╔╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
 ██╔████╔██║ ╚████╔╝    ██║   █████╗  ██████╔╝██╔████╔██║
 ██║╚██╔╝██║  ╚██╔╝     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
 ██║ ╚═╝ ██║   ██║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
 ╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝</pre>

    <p class="version">{version} | Open Source</p>

    <!-- Tagline -->
    <p class="tagline">Um terminal que respeita seu tempo.</p>

    <!-- Métricas inline -->
    <div class="metrics">
      <span class="metric"
        ><span class="metric-val">15 MB</span><span class="metric-lbl"
          >binário</span
        ></span
      >
      <span class="metric-sep">·</span>
      <span class="metric"
        ><span class="metric-val">&lt; 0.3s</span><span class="metric-lbl"
          >startup</span
        ></span
      >
      <span class="metric-sep">·</span>
      <span class="metric"
        ><span class="metric-val">~ 40 MB</span><span class="metric-lbl"
          >memória</span
        ></span
      >
    </div>

    <!-- ── Downloads por plataforma ── -->
    <div class="downloads">
      <!-- Windows -->
      <div class="platform-card">
        <div class="platform-header">
          <svg width="13" height="13" viewBox="0 0 88 88" fill="currentColor" aria-hidden="true">
            <path d="M0 12.402l35.687-4.86.016 34.318-35.67.203zm35.67 33.529.028 34.344L.028 75.48.026 45.7zm4.326-38.691L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"/>
          </svg>
          <span>Windows</span>
        </div>
        <div class="platform-btns">
          <a
            href={installerUrl ?? githubReleasesUrl}
            class="btn-primary"
            target="_blank"
            rel="noopener"
          >↓ Instalador .exe</a>
          {#if windowsUrl}
          <a
            href={windowsUrl}
            class="btn-ghost-sm"
            target="_blank"
            rel="noopener"
            title="Executável portátil — não precisa instalar"
          >portátil</a>
          {/if}
        </div>
      </div>

      <!-- macOS -->
      <div class="platform-card" class:platform-soon={!hasMacos}>
        <div class="platform-header">
          <svg width="12" height="14" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4c-.5-.7-1-1.4-1.5-2.2C83.7 727.3 0 583 0 450.9c0-207.8 131.3-317.7 260.3-317.7 67.3 0 123.4 45.3 165.1 45.3 40.4 0 104.3-48.2 179.9-48.2zM546.5 58.8c26.5-34.3 44.8-82.1 44.8-129.5 0-6.3-.5-12.6-1.5-18.9-42.8 1.5-93.9 28.5-124.4 60.2-24.6 26.2-47.8 72.9-47.8 120.4 0 6.8.8 13.6 2.3 18.9 0 0 4.3.2 6 .2 38.6 0 88.7-25.8 120.6-51.3z"/>
          </svg>
          <span>macOS</span>
          {#if !hasMacos}<span class="badge-soon">em breve</span>{/if}
        </div>
        <div class="platform-btns">
          {#if hasMacos}
            <a
              href={macosUrl ?? macosZipUrl ?? githubReleasesUrl}
              class="btn-primary"
              target="_blank"
              rel="noopener"
            >↓ DMG Universal</a>
            {#if macosZipUrl}
            <a
              href={macosZipUrl}
              class="btn-ghost-sm"
              target="_blank"
              rel="noopener"
              title="App compactado em .zip"
            >.zip</a>
            {/if}
          {:else}
            <a
              href="https://github.com/marcelomatz/myterm"
              class="btn-ghost-sm"
              target="_blank"
              rel="noopener"
            >ver roadmap</a>
          {/if}
        </div>
      </div>

      <!-- Linux -->
      <div class="platform-card" class:platform-soon={!hasLinux}>
        <div class="platform-header">
          <svg width="12" height="14" viewBox="0 0 96 96" fill="currentColor" aria-hidden="true">
            <path d="M47.3 4C24.7 4 6.5 22.2 6.5 44.8c0 15.7 9 29.4 22.1 36.3L24.9 92h46.4l-3.7-10.9C80.7 74.2 89.7 60.5 89.7 44.8 89.7 22.2 71.5 4 47.3 4zm0 8c17 0 30.7 13.8 30.7 30.7s-13.7 30.7-30.7 30.7S16.5 59.7 16.5 42.7 30.2 12 47.3 12zM36 38c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm22 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
          </svg>
          <span>Linux</span>
          {#if !hasLinux}<span class="badge-soon">em breve</span>{/if}
        </div>
        <div class="platform-btns">
          {#if hasLinux}
            <a
              href={linuxUrl}
              class="btn-primary"
              target="_blank"
              rel="noopener"
            >↓ tar.gz amd64</a>
          {:else}
            <a
              href="https://github.com/marcelomatz/myterm"
              class="btn-ghost-sm"
              target="_blank"
              rel="noopener"
            >ver roadmap</a>
          {/if}
        </div>
      </div>
    </div>

    <!-- Link para todas as releases -->
    <a
      href={githubReleasesUrl}
      class="all-releases"
      target="_blank"
      rel="noopener"
    >todas as versões no GitHub →</a>

    <!-- Scroll hint -->
    <p class="scroll-hint" aria-hidden="true">scroll ↓</p>
  </div>
</header>

<style>
  .hero {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    padding: 40px 24px;
    overflow: hidden;
    position: relative;
  }

  /* radial vinheta amarela atrás do logo */
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 60% 40% at 50% 30%,
      color-mix(in srgb, var(--accent) 6%, transparent) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    max-width: 860px;
    width: 100%;
  }

  /* ── Logo ANSI ───────────────────────────────────────────────────────── */
  .ansi-logo {
    font-family: "Cascadia Code", "Fira Code", "JetBrains Mono", ui-monospace,
      monospace;
    font-size: clamp(5px, 1.1vw, 11px);
    line-height: 1.2;
    color: var(--accent);
    text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 55%, transparent);
    white-space: pre;
    letter-spacing: 0;
    user-select: none;
  }

  .version {
    font-size: 11px;
    color: var(--br-black);
    letter-spacing: 0.15em;
    text-transform: lowercase;
    margin-top: -8px;
  }

  /* ── Tagline ─────────────────────────────────────────────────────────── */
  .tagline {
    font-size: clamp(16px, 2.4vw, 22px);
    color: var(--fg);
    font-weight: 400;
    letter-spacing: 0.02em;
    opacity: 0.85;
    max-width: 480px;
  }

  /* ── Métricas ────────────────────────────────────────────────────────── */
  .metrics {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .metric-val {
    font-size: clamp(13px, 1.6vw, 16px);
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .metric-lbl {
    font-size: 10px;
    color: var(--br-black);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .metric-sep {
    color: var(--br-black);
    font-size: 18px;
    opacity: 0.4;
    align-self: flex-start;
    padding-top: 2px;
  }

  /* ── Downloads ────────────────────────────────────────────────────────── */
  .downloads {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 4px;
    width: 100%;
  }

  .platform-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 20px;
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
    background: color-mix(in srgb, var(--accent) 4%, transparent);
    min-width: 200px;
    flex: 1;
    max-width: 260px;
    transition: border-color 0.2s, background 0.2s;
  }
  .platform-card:hover {
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    background: color-mix(in srgb, var(--accent) 7%, transparent);
  }
  .platform-card.platform-soon {
    border-color: var(--dim);
    background: transparent;
    opacity: 0.6;
  }

  .platform-header {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .badge-soon {
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--br-black);
    border: 1px solid var(--dim);
    padding: 1px 6px;
    border-radius: 2px;
    margin-left: auto;
    font-weight: 400;
  }

  .platform-btns {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 18px;
    background: var(--accent);
    color: var(--bg);
    font-family: inherit;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid var(--accent);
    transition: box-shadow 0.2s, transform 0.15s;
    white-space: nowrap;
    flex: 1;
    justify-content: center;
  }
  .btn-primary:hover {
    box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 50%, transparent);
    transform: translateY(-2px);
  }

  .btn-ghost-sm {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    background: transparent;
    color: var(--accent);
    font-family: inherit;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-decoration: none;
    text-transform: uppercase;
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
    transition: border-color 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .btn-ghost-sm:hover {
    border-color: var(--accent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 20%, transparent);
  }

  .all-releases {
    font-size: 11px;
    color: var(--br-black);
    text-decoration: none;
    letter-spacing: 0.1em;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .all-releases:hover {
    opacity: 1;
    color: var(--accent);
  }

  /* ── Scroll hint ─────────────────────────────────────────────────────── */
  .scroll-hint {
    font-size: 10px;
    color: var(--br-black);
    letter-spacing: 0.15em;
    opacity: 0.45;
    margin-top: 12px;
    animation: pulse 3s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,
    100% { opacity: 0.35; }
    50% { opacity: 0.7; }
  }

  /* ── Responsivo ──────────────────────────────────────────────────────── */
  @media (max-width: 600px) {
    .downloads {
      flex-direction: column;
      align-items: stretch;
    }
    .platform-card {
      max-width: 100%;
    }
  }
</style>
