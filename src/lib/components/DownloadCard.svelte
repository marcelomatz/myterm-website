<script lang="ts">
  interface Props {
    os: "windows" | "macos" | "linux";
    version: string;
    primaryLabel: string;
    primaryHref: string;
    primarySize?: string | null;
    altLabel?: string;
    altHref?: string | null;
    altSize?: string | null;
  }

  let {
    os,
    version,
    primaryLabel,
    primaryHref,
    primarySize = null,
    altLabel = "",
    altHref = null,
    altSize = null,
  }: Props = $props();
</script>

<article class="card card--{os}">
  <!-- Header -->
  <header class="card-header">
    <span class="card-icon" aria-hidden="true">
      {#if os === "windows"}
        <svg width="20" height="20" viewBox="0 0 88 88" fill="currentColor">
          <path d="M0 12.402l35.687-4.86.016 34.318-35.67.203zm35.67 33.529.028 34.344L.028 75.48.026 45.7zm4.326-38.691L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"/>
        </svg>
      {:else if os === "macos"}
        <svg width="17" height="20" viewBox="0 0 814 1000" fill="currentColor">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4c-.5-.7-1-1.4-1.5-2.2C83.7 727.3 0 583 0 450.9c0-207.8 131.3-317.7 260.3-317.7 67.3 0 123.4 45.3 165.1 45.3 40.4 0 104.3-48.2 179.9-48.2zM546.5 58.8c26.5-34.3 44.8-82.1 44.8-129.5 0-6.3-.5-12.6-1.5-18.9-42.8 1.5-93.9 28.5-124.4 60.2-24.6 26.2-47.8 72.9-47.8 120.4 0 6.8.8 13.6 2.3 18.9 0 0 4.3.2 6 .2 38.6 0 88.7-25.8 120.6-51.3z"/>
        </svg>
      {:else}
        <svg width="20" height="20" viewBox="0 0 96 96" fill="currentColor">
          <path d="M47.3 4C24.7 4 6.5 22.2 6.5 44.8c0 15.7 9 29.4 22.1 36.3L24.9 92h46.4l-3.7-10.9C80.7 74.2 89.7 60.5 89.7 44.8 89.7 22.2 71.5 4 47.3 4zm0 8c17 0 30.7 13.8 30.7 30.7s-13.7 30.7-30.7 30.7S16.5 59.7 16.5 42.7 30.2 12 47.3 12zM36 38c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm22 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
        </svg>
      {/if}
    </span>

    <div class="card-meta">
      <span class="card-os">{os === "windows" ? "Windows" : os === "macos" ? "macOS" : "Linux"}</span>
      <span class="card-ver">{version}</span>
    </div>
  </header>

  <div class="card-rule" role="separator"></div>

  <!-- Footer -->
  <footer class="card-footer">
    <a href={primaryHref} class="btn-dl" target="_blank" rel="noopener">
      <span class="btn-dl-label">↓ {primaryLabel}</span>
      {#if primarySize}<span class="btn-dl-size">{primarySize}</span>{/if}
    </a>

    {#if altHref}
      <a href={altHref} class="btn-alt" target="_blank" rel="noopener">
        {altLabel}{#if altSize}<span class="btn-alt-size">{altSize}</span>{/if}
      </a>
    {/if}
  </footer>
</article>

<style>
  /* ── Card estrutura ─────────────────────────────── */
  .card {
    display: flex;
    flex-direction: column;
    min-width: 220px;
    flex: 1;
    max-width: 280px;
    border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
    background: color-mix(in srgb, var(--accent) 5%, var(--bg));
    transition: border-color 0.2s, box-shadow 0.25s, transform 0.2s;
    overflow: hidden;
  }
  .card:hover {
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: 0 8px 32px color-mix(in srgb, var(--accent) 12%, transparent);
    transform: translateY(-3px);
  }

  /* ── Header ─────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 20px 16px;
  }
  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
  }
  .card--windows .card-icon { color: color-mix(in srgb, var(--accent) 90%, #88ccff); }
  .card--macos   .card-icon { color: color-mix(in srgb, var(--accent) 80%, #ccbbff); }
  .card--linux   .card-icon { color: color-mix(in srgb, var(--accent) 85%, #88ffcc); }

  .card-meta {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .card-os {
    font-size: 15px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.04em;
    line-height: 1;
  }
  .card-ver {
    font-size: 10px;
    color: var(--fg);
    opacity: 0.5;
    letter-spacing: 0.06em;
    line-height: 1;
  }

  /* ── Divisor ─────────────────────────────────────── */
  .card-rule {
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 0%,
      color-mix(in srgb, var(--accent) 28%, transparent) 40%,
      color-mix(in srgb, var(--accent) 28%, transparent) 60%,
      transparent 100%
    );
    margin: 0 18px;
  }

  /* ── Footer ─────────────────────────────────────── */
  .card-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px 20px 20px;
  }

  /* Botão primário de download */
  .btn-dl {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 10px 14px;
    background: var(--accent);
    color: var(--bg);
    text-decoration: none;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 2px solid var(--accent);
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .btn-dl:hover {
    box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 50%, transparent);
    transform: translateY(-1px);
  }
  .btn-dl-label {
    flex: 1;
    text-align: left;
  }
  .btn-dl-size {
    font-size: 9px;
    font-weight: 600;
    opacity: 0.75;
    padding: 2px 5px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    letter-spacing: 0.03em;
    flex-shrink: 0;
  }

  /* Botão alternativo */
  .btn-alt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 7px 14px;
    background: transparent;
    color: var(--fg);
    text-decoration: none;
    font-family: inherit;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.05em;
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
    transition: border-color 0.2s, color 0.15s, opacity 0.15s;
    opacity: 0.7;
  }
  .btn-alt:hover {
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    color: var(--accent);
    opacity: 1;
  }
  .btn-alt-size {
    font-size: 9px;
    opacity: 0.6;
    font-weight: 500;
    flex-shrink: 0;
  }
</style>
