<script lang="ts">
  import TerminalBanner from "$lib/components/TerminalBanner.svelte";
  import TerminalMock from "$lib/components/TerminalMock.svelte";
  import ThemePicker from "$lib/components/ThemePicker.svelte";
  import PillarCard from "$lib/components/PillarCard.svelte";
  import KeyboardShortcuts from "$lib/components/KeyboardShortcuts.svelte";
  import DownloadCard from "$lib/components/DownloadCard.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  type OS = "windows" | "macos" | "linux";
  let selectedOS = $state<OS>("windows");

  function selectOS(platform: OS) {
    selectedOS = platform;
    // navega suavemente para a seção de atalhos
    setTimeout(() => {
      document
        .getElementById("shortcuts")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  const PILLARS = [
    {
      icon: "⌨",
      title: "Teclado primeiro",
      body: "8 atalhos cobrem tudo — abrir tabs, dividir painéis, copiar, colar. Nenhuma mão sai do teclado.",
    },
    {
      icon: "▪",
      title: "Zero dependências",
      body: "Um único .exe de 15 MB. Sem Node, sem Chromium, sem instalador. Baixa, executa, trabalha.",
    },
    {
      icon: "$",
      title: "Qualquer shell",
      body: "Detecta o shell padrão automaticamente. PowerShell, bash, zsh, cmd — todos funcionam. Troca por sessão.",
    },
  ];
</script>

<svelte:head>
  <title
    >myTerm — Pronto para usar em 30 segundos. Gratuito e open source.</title
  >
  <meta
    name="description"
    content="Terminal emulator open source — Windows, macOS e Linux. Go + Wails. 15 MB, inicia em menos de 0.3s."
  />
</svelte:head>

<!-- ── HERO ─────────────────────────────────────────────────────────────── -->
<TerminalBanner
  version={data.version}
  releasePageUrl={data.releasePageUrl}
  installerUrl={data.installerUrl}
  installerSize={data.installerSize}
  windowsUrl={data.windowsUrl}
  windowsSize={data.windowsSize}
  macosUrl={data.macosUrl}
  macosSize={data.macosSize}
  macosZipUrl={data.macosZipUrl}
  macosZipSize={data.macosZipSize}
  linuxUrl={data.linuxUrl}
  linuxSize={data.linuxSize}
/>

<!-- ── DEMO ──────────────────────────────────────────────────────────────── -->
<section class="section" id="demo">
  <div class="inner narrow">
    <div class="picker-row">
      <ThemePicker />
    </div>
    <TerminalMock />
  </div>
</section>

<!-- ── PILARES ───────────────────────────────────────────────────────────── -->
<section class="section section-ruled" id="features">
  <div class="inner">
    <h2 class="section-title">Features</h2>

    <!-- plataforma -->
    <div class="platform-row">
      <!-- Windows: não clicável (já é o padrão) -->
      <span class="platform-badge windows" title="Windows 10+">
        <svg
          width="13"
          height="13"
          viewBox="0 0 88 88"
          fill="currentColor"
          aria-hidden="true"
          ><path
            d="M0 12.402l35.687-4.86.016 34.318-35.67.203zm35.67 33.529.028 34.344L.028 75.48.026 45.7zm4.326-38.691L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"
          /></svg
        >
        Windows 10+
      </span>
      <!-- macOS: clicável → vai para atalhos em modo macOS -->
      <button
        class="platform-badge macos platform-badge--btn"
        title="Ver atalhos para macOS"
        onclick={() => selectOS("macos")}
        aria-label="Ver atalhos de teclado para macOS"
      >
        <svg
          width="11"
          height="13"
          viewBox="0 0 814 1000"
          fill="currentColor"
          aria-hidden="true"
          ><path
            d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4c-.5-.7-1-1.4-1.5-2.2C83.7 727.3 0 583 0 450.9c0-207.8 131.3-317.7 260.3-317.7 67.3 0 123.4 45.3 165.1 45.3 40.4 0 104.3-48.2 179.9-48.2zM546.5 58.8c26.5-34.3 44.8-82.1 44.8-129.5 0-6.3-.5-12.6-1.5-18.9-42.8 1.5-93.9 28.5-124.4 60.2-24.6 26.2-47.8 72.9-47.8 120.4 0 6.8.8 13.6 2.3 18.9 0 0 4.3.2 6 .2 38.6 0 88.7-25.8 120.6-51.3z"
          /></svg
        >
        macOS 11+
        <span class="badge-hint">ver atalhos ↓</span>
      </button>
      <!-- Linux: clicável → vai para atalhos em modo linux -->
      <button
        class="platform-badge linux platform-badge--btn"
        title="Ver atalhos para Linux"
        onclick={() => selectOS("linux")}
        aria-label="Ver atalhos de teclado para Linux"
      >
        <svg
          width="11"
          height="13"
          viewBox="0 0 96 96"
          fill="currentColor"
          aria-hidden="true"
          ><path
            d="M47.3 4C24.7 4 6.5 22.2 6.5 44.8c0 15.7 9 29.4 22.1 36.3L24.9 92h46.4l-3.7-10.9C80.7 74.2 89.7 60.5 89.7 44.8 89.7 22.2 71.5 4 47.3 4zm0 8c17 0 30.7 13.8 30.7 30.7s-13.7 30.7-30.7 30.7S16.5 59.7 16.5 42.7 30.2 12 47.3 12zM36 38c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm22 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
          /></svg
        >
        Linux amd64
        <span class="badge-hint">ver atalhos ↓</span>
      </button>
    </div>

    <div class="pillars">
      {#each PILLARS as p}
        <PillarCard icon={p.icon} title={p.title} body={p.body} />
      {/each}
    </div>
  </div>
</section>

<!-- ── SHORTCUTS ─────────────────────────────────────────────────────────── -->
<section class="section" id="shortcuts">
  <div class="inner narrow">
    <h2 class="section-title">Referência de atalhos</h2>
    <p class="section-sub">
      Aparece na tela de boas-vindas — sempre ao alcance.
    </p>
    <KeyboardShortcuts os={selectedOS} />
    <p class="shortcuts-note">
      <svg
        width="11"
        height="11"
        viewBox="0 0 88 88"
        fill="currentColor"
        aria-hidden="true"
        ><path
          d="M0 12.402l35.687-4.86.016 34.318-35.67.203zm35.67 33.529.028 34.344L.028 75.48.026 45.7zm4.326-38.691L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"
        /></svg
      >
      Atalhos para <strong>Windows</strong> · suporte macOS &amp; Linux em melhoria
      contínua
    </p>
  </div>
</section>

<!-- ── STACK ──────────────────────────────────────────────────────────────── -->
<section class="section section-ruled" id="stack">
  <div class="inner narrow stack-center">
    <h2 class="section-title">Construído com</h2>
    <div class="stack-row">
      <div class="stack-item">
        <span class="stack-name">Go 1.21+</span>
        <span class="stack-note"
          >backend — compilado, rápido, sem GC overhead perceptível</span
        >
      </div>
      <div class="stack-sep">+</div>
      <div class="stack-item">
        <span class="stack-name">Wails v2</span>
        <span class="stack-note"
          >bridge — empacota tudo num único .exe nativo</span
        >
      </div>
      <div class="stack-sep">+</div>
      <div class="stack-item">
        <span class="stack-name">Svelte 5</span>
        <span class="stack-note"
          >UI — compila para JS vanilla, zero framework runtime</span
        >
      </div>
    </div>
  </div>
</section>

<!-- ── DOWNLOAD CTA ───────────────────────────────────────────────────────── -->
<section class="section" id="download">
  <div class="inner narrow cta-center">
    <pre class="mini-logo" aria-hidden="true">[ myTerm ]</pre>
    <p class="cta-tagline">
      Pronto para usar em 30 segundos. Gratuito e open source.
    </p>

    <!-- Grade de downloads por plataforma -->
    <div class="cta-platforms">
      <DownloadCard
        os="windows"
        version="10 / 11 · x64"
        primaryLabel="Instalador .exe"
        primaryHref={data.installerUrl ?? data.releasePageUrl ?? "#"}
        primarySize={data.installerSize}
        altLabel="Portátil .exe"
        altHref={data.windowsUrl}
        altSize={data.windowsSize}
      />

      <DownloadCard
        os="macos"
        version="11+ · Universal"
        primaryLabel="DMG Universal"
        primaryHref={data.macosUrl ?? data.releasePageUrl ?? "#"}
        primarySize={data.macosSize}
        altLabel="App .zip"
        altHref={data.macosZipUrl}
        altSize={data.macosZipSize}
      />

      <DownloadCard
        os="linux"
        version="amd64 · tar.gz"
        primaryLabel="tar.gz amd64"
        primaryHref={data.linuxUrl ?? data.releasePageUrl ?? "#"}
        primarySize={data.linuxSize}
      />
    </div>

    <a
      href={data.releasePageUrl ??
        "https://github.com/marcelomatz/myterm/releases"}
      class="btn-ghost"
      target="_blank"
      rel="noopener">Ver código →</a
    >
    <p class="cta-meta">
      MIT · Windows · macOS · Linux · Go 1.21+ · Wails v2 · Svelte 5
    </p>
  </div>
</section>

<!-- ── FOOTER ─────────────────────────────────────────────────────────────── -->
<footer class="footer">
  <div class="footer-inner">
    <span class="footer-logo">myTerm</span>
    <nav class="footer-nav" aria-label="navegação do footer">
      <a href="#demo">Demo</a>
      <a href="#features">Features</a>
      <a href="#shortcuts">Atalhos</a>
      <a
        href="https://github.com/marcelomatz/myterm"
        target="_blank"
        rel="noopener">GitHub</a
      >
    </nav>
    <span class="footer-by">
      por <a
        href="https://github.com/marcelomatz"
        target="_blank"
        rel="noopener">@marcelomatz</a
      >
      · MIT · {new Date().getFullYear()}
    </span>
  </div>
</footer>

<style>
  /* ── Layout comum ──────────────────────────────────────────────────────── */
  .section {
    padding: 80px 24px;
  }
  .section-ruled {
    border-top: 1px solid var(--dim);
    border-bottom: 1px solid var(--dim);
    background: color-mix(in srgb, var(--dim) 25%, var(--bg));
  }
  .inner {
    margin: 0 auto;
    max-width: 1060px;
  }
  .inner.narrow {
    max-width: 700px;
  }

  /* ── Titulação ─────────────────────────────────────────────────────────── */
  .section-title {
    font-size: clamp(12px, 1.4vw, 14px);
    font-weight: 700;
    color: var(--br-black);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }
  .section-sub {
    font-size: 13px;
    color: var(--br-black);
    text-align: center;
    margin-bottom: 36px;
    line-height: 1.7;
  }

  /* ── Demo ──────────────────────────────────────────────────────────────── */
  .picker-row {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  /* ── Pillars ───────────────────────────────────────────────────────────── */
  .pillars {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1px;
    margin-top: 36px;
    background: var(--dim); /* gap lines via bg */
    border: 1px solid var(--dim);
  }
  /* cada card anula o bg do grid para mostrar apenas as linhas entre eles */
  .pillars :global(.pillar) {
    border: none;
  }

  /* ── Platform badge ────────────────────────────────────────────────────── */
  .platform-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 28px;
  }
  .platform-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 3px;
  }
  .platform-badge.windows {
    background: var(--accent);
    color: var(--bg);
  }
  .platform-badge.macos {
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  }
  .platform-badge.linux {
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  }
  /* badges clicáveis (macOS e Linux) */
  .platform-badge--btn {
    cursor: pointer;
    font-family: inherit;
    transition:
      background 0.15s,
      color 0.15s,
      box-shadow 0.15s;
    position: relative;
  }
  .platform-badge--btn:hover {
    background: color-mix(in srgb, var(--accent) 20%, transparent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 40%, transparent);
  }
  .platform-badge--btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .badge-hint {
    font-size: 9.5px;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .platform-badge--btn:hover .badge-hint {
    opacity: 0.7;
  }

  /* ── Shortcuts note ────────────────────────────────────────────────────── */
  .shortcuts-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
    font-size: 11.5px;
    color: var(--br-black);
    opacity: 0.65;
    letter-spacing: 0.04em;
  }
  .shortcuts-note svg {
    flex-shrink: 0;
  }

  /* ── Stack ─────────────────────────────────────────────────────────────── */
  .stack-center {
    text-align: center;
  }
  .stack-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 32px;
  }
  .stack-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 180px;
  }
  .stack-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .stack-note {
    font-size: 11.5px;
    color: var(--br-black);
    line-height: 1.55;
  }
  .stack-sep {
    font-size: 24px;
    color: var(--br-black);
    opacity: 0.3;
    align-self: center;
    margin-top: -8px;
  }

  /* ── CTA ──────────────────────────────────────────────────────────────── */
  .cta-center {
    text-align: center;
  }
  .mini-logo {
    font-family: inherit;
    font-size: clamp(18px, 3vw, 26px);
    color: var(--accent);
    text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 40%, transparent);
    letter-spacing: 0.1em;
    margin-bottom: 10px;
  }
  .cta-tagline {
    font-size: 13.5px;
    color: var(--br-black);
    margin-bottom: 28px;
    letter-spacing: 0.03em;
  }
  /* Grade de plataformas */
  .cta-platforms {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 28px;
  }

  /* Botão "Ver código" */
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
  .cta-meta {
    font-size: 11px;
    color: var(--br-black);
    letter-spacing: 0.08em;
    opacity: 0.6;
    margin-top: 10px;
  }

  /* ── Footer ────────────────────────────────────────────────────────────── */
  .footer {
    border-top: 1px solid var(--dim);
    padding: 24px;
    background: var(--bg);
  }
  .footer-inner {
    max-width: 1060px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .footer-logo {
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.06em;
    font-size: 14px;
  }
  .footer-nav {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
  }
  .footer-nav a {
    color: var(--fg);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.75;
    transition:
      color 0.15s,
      opacity 0.15s;
  }
  .footer-nav a:hover {
    color: var(--accent);
    opacity: 1;
  }
  .footer-by {
    font-size: 11px;
    color: var(--fg);
    opacity: 0.55;
  }
  .footer-by a {
    color: inherit;
    text-decoration: none;
  }
  .footer-by a:hover {
    color: var(--accent);
    opacity: 1;
  }
</style>
