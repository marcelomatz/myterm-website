<script lang="ts">
  // Animated terminal mock — shows tabs, prompt, and scripted commands
  import { onMount } from "svelte";

  const SCRIPT = [
    { delay: 0, line: "", type: "prompt" },
    { delay: 700, line: "ls -la ~/projects", type: "cmd" },
    { delay: 1800, line: "total 48", type: "out-dim" },
    { delay: 2000, line: "drwxr-xr-x  . projects/", type: "out-green" },
    {
      delay: 2100,
      line: "-rw-r--r--  myterm/  go-api/  svelte-app/",
      type: "out",
    },
    { delay: 2900, line: "", type: "prompt" },
    { delay: 3500, line: "cd myterm && go build -o myterm.exe .", type: "cmd" },
    { delay: 5200, line: "✓ Build complete (1.23s)", type: "out-green" },
    { delay: 6100, line: "", type: "prompt" },
    { delay: 6800, line: "./myterm.exe --version", type: "cmd" },
    { delay: 7800, line: "myTerm v0.9.1 (go1.22 / wails2)", type: "out-cyan" },
  ];

  let visibleLines: { text: string; type: string }[] = $state([]);
  let showCursor = $state(true);

  onMount(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    SCRIPT.forEach((s) => {
      const t = setTimeout(() => {
        visibleLines = [...visibleLines, { text: s.line, type: s.type }];
      }, s.delay);
      timers.push(t);
    });
    const blinkInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 550);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(blinkInterval);
    };
  });
</script>

<div class="mock-wrap">
  <!-- Window chrome -->
  <div class="titlebar">
    <div class="dots">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </div>
    <div class="tabs">
      <button class="tab active">Git Bash</button>
      <button class="tab">PowerShell</button>
      <button class="tab dim">+</button>
    </div>
    <div class="win-buttons">
      <span>─</span><span>□</span><span>✕</span>
    </div>
  </div>

  <!-- Terminal body -->
  <div class="term-body" role="region" aria-label="terminal demo">
    {#each visibleLines as line, i}
      {#if line.type === "prompt"}
        <div class="line">
          <span class="ps1">~/projects</span>
          <span class="ps-arrow"> › </span>
          {#if i === visibleLines.length - 1}
            <span class="cursor-beam" style="opacity:{showCursor ? 1 : 0}"
              >▋</span
            >
          {/if}
        </div>
      {:else if line.type === "cmd"}
        <div class="line">
          <span class="ps1">~/projects</span><span class="ps-arrow">
            ›
          </span><span class="cmd-text">{line.text}</span>
        </div>
      {:else if line.type === "out-dim"}
        <div class="line out-dim">{line.text}</div>
      {:else if line.type === "out-green"}
        <div class="line out-green">{line.text}</div>
      {:else if line.type === "out-cyan"}
        <div class="line out-cyan">{line.text}</div>
      {:else}
        <div class="line out">{line.text}</div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .mock-wrap {
    background: var(--bg);
    border: 1px solid var(--dim);
    border-radius: 10px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px var(--dim),
      0 24px 80px color-mix(in srgb, var(--accent) 12%, black);
    font-family: "Cascadia Code", "Fira Code", monospace;
    font-size: 13px;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    transition: box-shadow 0.35s ease;
  }
  .titlebar {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    background: var(--dim);
    gap: 10px;
    min-height: 36px;
  }
  .dots {
    display: flex;
    gap: 6px;
  }
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot-red {
    background: #ef4444;
  }
  .dot-yellow {
    background: #eab308;
  }
  .dot-green {
    background: #22c55e;
  }

  .tabs {
    display: flex;
    gap: 2px;
    flex: 1;
    overflow: hidden;
  }
  .tab {
    background: none;
    border: none;
    color: var(--br-black);
    font-family: inherit;
    font-size: 12px;
    padding: 4px 14px;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background 0.15s,
      color 0.15s;
    letter-spacing: 0.03em;
  }
  .tab.active {
    background: var(--bg);
    color: var(--fg);
  }
  .tab.dim {
    opacity: 0.4;
  }
  .tab:hover:not(.active) {
    background: color-mix(in srgb, var(--bg) 50%, var(--dim));
  }

  .win-buttons {
    display: flex;
    gap: 10px;
    color: var(--br-black);
    font-size: 12px;
    opacity: 0.5;
  }

  .term-body {
    padding: 16px 20px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    line-height: 1.55;
  }
  .line {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .ps1 {
    color: var(--cyan);
  }
  .ps-arrow {
    color: var(--accent);
    margin: 0 2px;
  }
  .cmd-text {
    color: var(--fg);
  }
  .cursor-beam {
    color: var(--accent);
    transition: opacity 0.05s;
  }
  .out {
    color: var(--fg);
    padding-left: 4px;
  }
  .out-dim {
    color: var(--br-black);
    padding-left: 4px;
  }
  .out-green {
    color: var(--green);
    padding-left: 4px;
  }
  .out-cyan {
    color: var(--cyan);
    padding-left: 4px;
  }

  .split-bar {
    border-top: 1px solid var(--dim);
    padding: 6px 16px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    background: color-mix(in srgb, var(--dim) 30%, var(--bg));
  }
  .split-info {
    font-size: 10.5px;
    color: var(--br-black);
    letter-spacing: 0.04em;
  }
  kbd {
    display: inline-block;
    padding: 1px 5px;
    border: 1px solid var(--br-black);
    border-radius: 3px;
    font-family: inherit;
    font-size: 10px;
    color: var(--cyan);
    background: var(--dim);
  }
</style>
