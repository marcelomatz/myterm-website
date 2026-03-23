<script lang="ts">
  // Pilar — card minimal com ícone monospace e corpo curto
  let { icon, title, body }: { icon: string; title: string; body: string } = $props();
</script>

<article class="pillar">
  <div class="pillar-icon" aria-hidden="true">{icon}</div>
  <h3 class="pillar-title">{title}</h3>
  <p class="pillar-body">{body}</p>
</article>

<style>
  .pillar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 28px 24px;
    border: 1px solid var(--dim);
    background: color-mix(in srgb, var(--dim) 40%, var(--bg));
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .pillar:hover {
    border-color: color-mix(in srgb, var(--accent) 35%, var(--dim));
    box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 8%, transparent);
  }
  .pillar-icon {
    font-size: 20px;
    line-height: 1;
  }
  .pillar-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--fg);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .pillar-body {
    font-size: 13px;
    color: var(--br-black);
    line-height: 1.7;
  }
</style>
