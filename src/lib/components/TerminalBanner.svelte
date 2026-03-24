<script lang="ts">
  // Hero section — ANSI pixel logo + tagline zen + CTA
  interface Props {
    version?: string;
    releaseUrl?: string | null;
  }
  let { version = 'v0.1.0', releaseUrl = null }: Props = $props();

  const downloadHref = $derived(releaseUrl ?? 'https://github.com/marcelomatz/myterm/releases');
</script>

<header class="hero scanlines">
  <div class="hero-inner">
    <!-- Logo ANSI pixel — mesmo estilo do app -->
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

    <!-- CTAs -->
    <div class="hero-ctas">
      <a
        href={downloadHref}
        class="btn-primary"
        target="_blank"
        rel="noopener">↓ Download</a
      >
      <a
        href="https://github.com/marcelomatz/myterm"
        class="btn-ghost"
        target="_blank"
        rel="noopener">GitHub →</a
      >
    </div>

    <!-- Platform availability -->
    <div class="platform-row" aria-label="Plataformas disponíveis">
      <span class="plat plat-active" title="Disponível agora para Windows">
        <svg
          width="11"
          height="11"
          viewBox="0 0 88 88"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M0 12.402l35.687-4.86.016 34.318-35.67.203zm35.67 33.529.028 34.344L.028 75.48.026 45.7zm4.326-38.691L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"
          />
        </svg>
        Windows
      </span>
      <span class="plat-sep">·</span>
      <span class="plat plat-soon" title="Em desenvolvimento">
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" /><polyline
            points="12 6 12 12 16 14"
          />
        </svg>
        Linux &amp; macOS — em breve
      </span>
    </div>

    <!-- Hint scroll -->
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

  /* subtle radial vinheta amarela atrás do logo */
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

  /* ── CTAs ────────────────────────────────────────────────────────────── */
  .hero-ctas {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 4px;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 30px;
    background: var(--accent);
    color: var(--bg);
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid var(--accent);
    transition:
      box-shadow 0.2s,
      transform 0.15s;
  }
  .btn-primary:hover {
    box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 50%, transparent);
    transform: translateY(-2px);
  }
  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 30px;
    background: transparent;
    color: var(--accent);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    border: 2px solid color-mix(in srgb, var(--accent) 35%, transparent);
    transition:
      border-color 0.2s,
      box-shadow 0.2s,
      transform 0.15s;
  }
  .btn-ghost:hover {
    border-color: var(--accent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 20%, transparent);
    transform: translateY(-2px);
  }

  /* ── Platform availability ──────────────────────────────────────────── */
  .platform-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: -4px;
  }
  .plat {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 2px;
  }
  .plat-active {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
    font-weight: 700;
  }
  .plat-soon {
    color: var(--br-black);
    border: 1px solid var(--dim);
    opacity: 0.6;
  }
  .plat-sep {
    color: var(--br-black);
    opacity: 0.3;
    font-size: 14px;
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
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 0.7;
    }
  }
</style>
