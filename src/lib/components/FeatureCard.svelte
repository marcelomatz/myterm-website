<script lang="ts">
  interface Props {
    icon: string;
    title: string;
    body: string;
    accent?: boolean;
  }
  let { icon, title, body, accent = false }: Props = $props();
</script>

<div class="card" class:card-accent={accent}>
  <span class="icon" aria-hidden="true">{icon}</span>
  <h3 class="title">{title}</h3>
  <p class="body">{body}</p>
</div>

<style>
  .card {
    background: color-mix(in srgb, var(--dim) 40%, var(--bg));
    border: 1px solid var(--dim);
    border-radius: 10px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  .card:hover {
    border-color: var(--accent);
    box-shadow: 0 4px 24px color-mix(in srgb, var(--accent) 15%, transparent);
    transform: translateY(-3px);
  }
  .card-accent {
    border-color: color-mix(in srgb, var(--accent) 40%, var(--dim));
  }
  .icon {
    font-size: 28px;
    line-height: 1;
  }
  .title {
    font-size: 15px;
    font-weight: 600;
    color: var(--fg);
    letter-spacing: 0.02em;
  }
  .body {
    font-size: 13.5px;
    color: var(--br-black);
    line-height: 1.65;
  }
</style>
