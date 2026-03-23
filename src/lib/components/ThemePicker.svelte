<script lang="ts">
  // Discrete inline theme switcher
  import { THEMES, themeId } from '$lib/themes';
</script>

<div class="picker" role="group" aria-label="escolher tema">
  <span class="picker-label">tema:</span>
  {#each THEMES as t}
    <button
      class="swatch"
      class:active={$themeId === t.id}
      style="--sw-bg:{t.bg}; --sw-fg:{t.accent}"
      title={t.name}
      aria-pressed={$themeId === t.id}
      onclick={() => themeId.set(t.id)}
    >
      <span class="swatch-dot"></span>
      <span class="swatch-name">{t.name}</span>
    </button>
  {/each}
</div>

<style>
  .picker {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .picker-label {
    font-size: 10px;
    color: var(--br-black);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-right: 4px;
  }
  .swatch {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border: 1px solid transparent;
    border-radius: 2px;
    background: var(--dim);
    cursor: pointer;
    font-family: inherit;
    font-size: 10px;
    color: var(--br-black);
    letter-spacing: 0.06em;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .swatch-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--sw-fg);
    flex-shrink: 0;
  }
  .swatch-name { text-transform: uppercase; font-size: 9px; letter-spacing: 0.08em; }
  .swatch.active {
    border-color: var(--accent);
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 8%, var(--dim));
  }
  .swatch:hover:not(.active) {
    border-color: var(--br-black);
    color: var(--fg);
  }
</style>
