<!-- Keyboard shortcuts reference with per-OS modifier key -->
<script lang="ts">
  type OS = 'windows' | 'macos' | 'linux';

  interface Props {
    /** OS selecionado inicial */
    os?: OS;
  }

  let { os = 'windows' }: Props = $props();

  // ⌘ para macOS, Ctrl para Windows e Linux
  const mod = $derived(os === 'macos' ? '⌘' : 'Ctrl');

  // Atalhos como $derived para reagir quando `mod` muda
  const shortcuts = $derived([
    { action: 'Nova aba',         keys: [[mod, 'T']] },
    { action: 'Próxima aba',      keys: [[mod, 'Tab']] },
    { action: 'Aba anterior',     keys: [[mod, 'Shift', 'Tab']] },
    { action: 'Command Palette',  keys: [[mod, 'Shift', 'P']] },
    { action: 'Split horizontal', keys: [[mod, 'Shift', 'E']] },
    { action: 'Split vertical',   keys: [[mod, 'Shift', 'O']] },
    { action: 'Fechar painel',    keys: [[mod, 'Shift', 'W']] },
    { action: 'Copiar',           keys: [[mod, 'Shift', 'C']] },
    { action: 'Colar',            keys: [[mod, 'Shift', 'V']] },
  ]);
</script>

<div class="shortcuts-wrap" role="region" aria-label="keyboard shortcuts">
  <!-- OS picker -->
  <div class="os-tabs" role="tablist" aria-label="Sistema operacional">
    {#each (['windows', 'macos', 'linux'] as OS[]) as platform}
      <button
        role="tab"
        class="os-tab os-tab--{platform}"
        class:active={os === platform}
        onclick={() => (os = platform)}
        aria-selected={os === platform}
        aria-controls="kb-table"
      >
        {#if platform === 'windows'}
          <svg width="11" height="11" viewBox="0 0 88 88" fill="currentColor" aria-hidden="true">
            <path d="M0 12.402l35.687-4.86.016 34.318-35.67.203zm35.67 33.529.028 34.344L.028 75.48.026 45.7zm4.326-38.691L87.314 0v41.527l-47.318.376zm47.329 39.26-.011 41.34-47.318-6.678-.066-34.739z"/>
          </svg>
          Windows
        {:else if platform === 'macos'}
          <svg width="10" height="11" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4c-.5-.7-1-1.4-1.5-2.2C83.7 727.3 0 583 0 450.9c0-207.8 131.3-317.7 260.3-317.7 67.3 0 123.4 45.3 165.1 45.3 40.4 0 104.3-48.2 179.9-48.2zM546.5 58.8c26.5-34.3 44.8-82.1 44.8-129.5 0-6.3-.5-12.6-1.5-18.9-42.8 1.5-93.9 28.5-124.4 60.2-24.6 26.2-47.8 72.9-47.8 120.4 0 6.8.8 13.6 2.3 18.9 0 0 4.3.2 6 .2 38.6 0 88.7-25.8 120.6-51.3z"/>
          </svg>
          macOS
        {:else}
          <svg width="10" height="11" viewBox="0 0 96 96" fill="currentColor" aria-hidden="true">
            <path d="M47.3 4C24.7 4 6.5 22.2 6.5 44.8c0 15.7 9 29.4 22.1 36.3L24.9 92h46.4l-3.7-10.9C80.7 74.2 89.7 60.5 89.7 44.8 89.7 22.2 71.5 4 47.3 4zm0 8c17 0 30.7 13.8 30.7 30.7s-13.7 30.7-30.7 30.7S16.5 59.7 16.5 42.7 30.2 12 47.3 12zM36 38c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm22 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
          </svg>
          Linux
        {/if}
      </button>
    {/each}
  </div>

  <!-- Tabela de atalhos -->
  <div class="table-wrap">
    <table class="kb-table" id="kb-table">
      <thead>
        <tr>
          <th>Ação</th>
          <th>Atalho</th>
        </tr>
      </thead>
      <tbody>
        {#each shortcuts as row}
          <tr>
            <td>{row.action}</td>
            <td>
              {#each row.keys as combo, ci}
                {#if ci > 0}<span class="key-or">ou</span>{/if}
                {#each combo as key, ki}
                  {#if ki > 0}<span class="key-plus">+</span>{/if}
                  <kbd>{key}</kbd>
                {/each}
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <p class="kb-note">
    {#if os === 'macos'}
      macOS — <kbd>⌘</kbd> = Command · atalhos em melhoria contínua
    {:else if os === 'linux'}
      Linux — <kbd>Ctrl</kbd> como modificador principal · atalhos em melhoria contínua
    {:else}
      Windows 10 / 11 · atalhos completos para teclado&#8209;primeiro
    {/if}
  </p>
</div>

<style>
  .shortcuts-wrap {
    max-width: 560px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── OS tabs ── */
  .os-tabs {
    display: flex;
    gap: 0;
    border: 1px solid var(--dim);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  .os-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    background: transparent;
    border: none;
    border-right: 1px solid var(--dim);
    color: var(--fg);
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.07em;
    cursor: pointer;
    opacity: 0.55;
    transition: background 0.15s, opacity 0.15s, color 0.15s;
  }
  .os-tab:last-child {
    border-right: none;
  }
  .os-tab:hover {
    opacity: 0.85;
    background: color-mix(in srgb, var(--dim) 40%, transparent);
  }
  .os-tab.active {
    opacity: 1;
    background: color-mix(in srgb, var(--accent) 10%, var(--bg));
    color: var(--accent);
  }
  .os-tab--windows.active { color: color-mix(in srgb, var(--accent) 90%, #88ccff); }
  .os-tab--macos.active   { color: color-mix(in srgb, var(--accent) 80%, #ccbbff); }
  .os-tab--linux.active   { color: color-mix(in srgb, var(--accent) 85%, #88ffcc); }

  /* ── Tabela ── */
  .table-wrap {
    border: 1px solid var(--dim);
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
  .kb-table {
    width: 100%;
    border-collapse: collapse;
    font-family: inherit;
    font-size: 13px;
  }
  .kb-table thead tr {
    background: var(--dim);
    color: var(--br-black);
  }
  .kb-table th {
    padding: 10px 18px;
    text-align: left;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .kb-table td {
    padding: 9px 18px;
    color: var(--fg);
    border-top: 1px solid var(--dim);
  }
  .kb-table tr:hover td {
    background: color-mix(in srgb, var(--dim) 30%, transparent);
    color: var(--accent);
    transition: background 0.15s, color 0.15s;
  }
  .kb-table td:last-child {
    text-align: right;
  }
  kbd {
    display: inline-block;
    padding: 2px 7px;
    border: 1px solid var(--br-black);
    border-radius: 4px;
    font-family: inherit;
    font-size: 11px;
    color: var(--cyan);
    background: var(--dim);
    margin: 0 1px;
  }
  .key-plus,
  .key-or {
    font-size: 10px;
    opacity: 0.5;
    margin: 0 2px;
  }

  /* ── Nota de rodapé ── */
  .kb-note {
    margin-top: 10px;
    font-size: 11px;
    color: var(--fg);
    opacity: 0.5;
    text-align: center;
    letter-spacing: 0.06em;
  }
  .kb-note kbd {
    font-size: 10px;
    padding: 1px 5px;
  }
</style>
