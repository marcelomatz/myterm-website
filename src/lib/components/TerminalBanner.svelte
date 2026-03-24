<script lang="ts">
  import DownloadCard from "$lib/components/DownloadCard.svelte";

  interface Props {
    version?: string;
    releasePageUrl?: string | null;
    installerUrl?: string | null;
    installerSize?: string | null;
    windowsUrl?: string | null;
    windowsSize?: string | null;
    macosUrl?: string | null;
    macosSize?: string | null;
    macosZipUrl?: string | null;
    macosZipSize?: string | null;
    linuxUrl?: string | null;
    linuxSize?: string | null;
  }

  let {
    version = "v0.2.0",
    releasePageUrl = null,
    installerUrl = null,
    installerSize = null,
    windowsUrl = null,
    windowsSize = null,
    macosUrl = null,
    macosSize = null,
    macosZipUrl = null,
    macosZipSize = null,
    linuxUrl = null,
    linuxSize = null,
  }: Props = $props();

  const githubReleasesUrl = "https://github.com/marcelomatz/myterm/releases";
  const hasMacos = $derived(!!(macosUrl || macosZipUrl));
  const hasLinux = $derived(!!linuxUrl);
</script>

<header class="hero scanlines">
  <div class="hero-inner">
    <pre class="ansi-logo" aria-label="myTerm">
 ███╗   ███╗██╗   ██╗████████╗███████╗██████╗ ███╗   ███╗
 ████╗ ████║╚██╗ ██╔╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
 ██╔████╔██║ ╚████╔╝    ██║   █████╗  ██████╔╝██╔████╔██║
 ██║╚██╔╝██║  ╚██╔╝     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
 ██║ ╚═╝ ██║   ██║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
 ╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝</pre>

    <p class="version">{version} | Open Source</p>
    <p class="tagline">
      Pronto para usar em 30 segundos. Gratuito e open source..
    </p>

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

    <div class="downloads">
      <DownloadCard
        os="windows"
        version="10 / 11 · x64"
        primaryLabel="Instalador .exe"
        primaryHref={installerUrl ?? githubReleasesUrl}
        primarySize={installerSize}
        altLabel="Portátil .exe"
        altHref={windowsUrl}
        altSize={windowsSize}
      />
      <DownloadCard
        os="macos"
        version="11+ · Universal"
        primaryLabel={hasMacos ? "DMG Universal" : "ver roadmap"}
        primaryHref={hasMacos
          ? (macosUrl ?? macosZipUrl ?? githubReleasesUrl)
          : "https://github.com/marcelomatz/myterm"}
        primarySize={macosSize}
        altLabel="App .zip"
        altHref={hasMacos ? (macosZipUrl ?? null) : null}
        altSize={macosZipSize}
      />
      <DownloadCard
        os="linux"
        version="amd64 · tar.gz"
        primaryLabel={hasLinux ? "TAR.GZ AMD64" : "ver roadmap"}
        primaryHref={hasLinux
          ? linuxUrl!
          : "https://github.com/marcelomatz/myterm"}
        primarySize={linuxSize}
      />
    </div>

    <a
      href={githubReleasesUrl}
      class="all-releases"
      target="_blank"
      rel="noopener">todas as versões no GitHub →</a
    >
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
    max-width: 920px;
    width: 100%;
  }
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
  .tagline {
    font-size: clamp(16px, 2.4vw, 22px);
    color: var(--fg);
    font-weight: 400;
    letter-spacing: 0.02em;
    opacity: 0.85;
    max-width: 480px;
  }
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
  .downloads {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 4px;
    width: 100%;
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
  @media (max-width: 600px) {
    .downloads {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
