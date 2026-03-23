<script lang="ts">
  import TerminalBanner from '$lib/components/TerminalBanner.svelte';
  import TerminalMock from '$lib/components/TerminalMock.svelte';
  import ThemePicker from '$lib/components/ThemePicker.svelte';
  import PillarCard from '$lib/components/PillarCard.svelte';
  import KeyboardShortcuts from '$lib/components/KeyboardShortcuts.svelte';

  const PILLARS = [
    {
      icon: '⌨',
      title: 'Teclado primeiro',
      body: '14 atalhos cobrem tudo — abrir tabs, dividir painéis, copiar, colar, buscar, ajustar fonte. Nenhuma mão sai do teclado.',
    },
    {
      icon: '▪',
      title: 'Zero dependências',
      body: 'Um único .exe de 15 MB. Sem Node, sem Chromium, sem instalador. Baixa, executa, trabalha.',
    },
    {
      icon: '$',
      title: 'Qualquer shell',
      body: 'Detecta o shell padrão automaticamente. PowerShell, bash, zsh, cmd — todos funcionam. Troca por sessão.',
    },
  ];
</script>

<svelte:head>
  <title>myTerm — Um terminal que respeita seu tempo</title>
  <meta name="description" content="Terminal emulator para Windows. Go + Wails. Um único .exe de 15 MB, inicia em menos de 0.3s." />
</svelte:head>

<!-- ── HERO ─────────────────────────────────────────────────────────────── -->
<TerminalBanner />

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
    <div class="pillars">
      {#each PILLARS as p}
        <PillarCard icon={p.icon} title={p.title} body={p.body} />
      {/each}
    </div>

    <!-- features extras discretas -->
    <ul class="extras">
      <li><span class="bullet">·</span> Split horizontal e vertical (Ctrl+Shift+E / Ctrl+Shift+O)</li>
      <li><span class="bullet">·</span> Tabs ilimitadas por janela (Ctrl+T / Ctrl+W)</li>
      <li><span class="bullet">·</span> Copy on select opcional</li>
      <li><span class="bullet">·</span> 5 temas embutidos — troca ao vivo</li>
      <li><span class="bullet">·</span> MIT licensed — lê o código, faz fork, contribui</li>
    </ul>
  </div>
</section>

<!-- ── SHORTCUTS ─────────────────────────────────────────────────────────── -->
<section class="section" id="shortcuts">
  <div class="inner narrow">
    <h2 class="section-title">Referência de atalhos</h2>
    <p class="section-sub">Aparece na tela de boas-vindas — sempre ao alcance.</p>
    <KeyboardShortcuts />
  </div>
</section>

<!-- ── STACK ──────────────────────────────────────────────────────────────── -->
<section class="section section-ruled" id="stack">
  <div class="inner narrow stack-center">
    <h2 class="section-title">Construído com</h2>
    <div class="stack-row">
      <div class="stack-item">
        <span class="stack-name">Go 1.21+</span>
        <span class="stack-note">backend — compilado, rápido, sem GC overhead perceptível</span>
      </div>
      <div class="stack-sep">+</div>
      <div class="stack-item">
        <span class="stack-name">Wails v2</span>
        <span class="stack-note">bridge — empacota tudo num único .exe nativo</span>
      </div>
      <div class="stack-sep">+</div>
      <div class="stack-item">
        <span class="stack-name">Svelte 5</span>
        <span class="stack-note">UI — compila para JS vanilla, zero framework runtime</span>
      </div>
    </div>
  </div>
</section>

<!-- ── DOWNLOAD CTA ───────────────────────────────────────────────────────── -->
<section class="section" id="download">
  <div class="inner narrow cta-center">
    <pre class="mini-logo" aria-hidden="true">[ myTerm ]</pre>
    <p class="cta-tagline">Pronto para usar em 30 segundos.</p>
    <div class="cta-row">
      <a
        href="https://github.com/marcelomatz/myterm/releases"
        class="btn-primary"
        target="_blank"
        rel="noopener"
      >↓ Download .exe</a>
      <a
        href="https://github.com/marcelomatz/myterm"
        class="btn-ghost"
        target="_blank"
        rel="noopener"
      >Ver código →</a>
    </div>
    <p class="cta-meta">MIT · Windows · Go 1.21+ · Wails v2 · Svelte 5</p>
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
      <a href="https://github.com/marcelomatz/myterm" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <span class="footer-by">
      por <a href="https://github.com/marcelomatz" target="_blank" rel="noopener">@marcelomatz</a>
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
  .inner.narrow { max-width: 700px; }

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

  /* ── Extras list ───────────────────────────────────────────────────────── */
  .extras {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 32px;
    margin-top: 32px;
    padding: 20px;
    border: 1px solid var(--dim);
  }
  .extras li {
    font-size: 12.5px;
    color: var(--br-black);
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.02em;
  }
  .bullet {
    color: var(--accent);
    font-weight: 700;
  }

  /* ── Stack ─────────────────────────────────────────────────────────────── */
  .stack-center { text-align: center; }
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
  .cta-center { text-align: center; }
  .mini-logo {
    font-family: inherit;
    font-size: clamp(18px, 3vw, 26px);
    color: var(--accent);
    text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 40%, transparent);
    letter-spacing: 0.1em;
    margin-bottom: 12px;
  }
  .cta-tagline {
    font-size: 14px;
    color: var(--br-black);
    margin-bottom: 28px;
    letter-spacing: 0.03em;
  }
  .cta-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
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
    transition: box-shadow 0.2s, transform 0.15s;
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
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
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
    color: var(--br-black);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.15s;
  }
  .footer-nav a:hover { color: var(--accent); }
  .footer-by {
    font-size: 11px;
    color: var(--br-black);
    opacity: 0.5;
  }
  .footer-by a {
    color: inherit;
    text-decoration: none;
  }
  .footer-by a:hover { color: var(--accent); opacity: 1; }
</style>
