<script lang="ts">
  import { activeTheme, themeToCss } from "$lib/themes";
  import "../app.css";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  injectAnalytics({ mode: dev ? "development" : "production" });

  let { children } = $props();
  let style = $derived(themeToCss($activeTheme));
</script>

<div {style} class="theme-root">
  {@render children()}
</div>

<style>
  .theme-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    color: var(--fg);
    transition:
      background 0.35s ease,
      color 0.35s ease;
  }
</style>
