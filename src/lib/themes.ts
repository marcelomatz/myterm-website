// ─── myterm color presets ─────────────────────────────────────────────────────

export interface Theme {
  id: string;
  name: string;
  bg: string;
  fg: string;
  cursor: string;
  dim: string;
  cyan: string;
  accent: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  brRed: string;
  brGreen: string;
  brYellow: string;
  brBlue: string;
  brMagenta: string;
  brBlack: string;
}

export const THEMES: Theme[] = [
  // ── default: the real myTerm palette — preto + amarelo ──────────────────
  {
    id: 'myterm',
    name: 'myTerm',
    bg: '#0d0d0d', fg: '#f5c518', cursor: '#f5c518', dim: '#1c1c1c',
    cyan: '#f5c518', accent: '#f5c518',
    red: '#e03c3c', green: '#4ec94e', yellow: '#f5c518', blue: '#5c9dff',
    magenta: '#c44ef5', brRed: '#f57272', brGreen: '#72f572',
    brYellow: '#ffd94e', brBlue: '#72a0f5', brMagenta: '#d472f5',
    brBlack: '#444444',
  },
  {
    id: 'cyber-noir',
    name: 'Cyber Noir',
    bg: '#09090b', fg: '#a1a1aa', cursor: '#22d3ee', dim: '#27272a',
    cyan: '#06b6d4', accent: '#22d3ee',
    red: '#ef4444', green: '#10b981', yellow: '#eab308', blue: '#3b82f6',
    magenta: '#d946ef', brRed: '#f87171', brGreen: '#34d399',
    brYellow: '#facc15', brBlue: '#60a5fa', brMagenta: '#e879f9',
    brBlack: '#3f3f46',
  },
  {
    id: 'pampulha-night',
    name: 'Pampulha Night',
    bg: '#0f172a', fg: '#cbd5e1', cursor: '#fbbf24', dim: '#1e293b',
    cyan: '#06b6d4', accent: '#fbbf24',
    red: '#e11d48', green: '#059669', yellow: '#d97706', blue: '#2563eb',
    magenta: '#7c3aed', brRed: '#f43f5e', brGreen: '#10b981',
    brYellow: '#fbbf24', brBlue: '#3b82f6', brMagenta: '#8b5cf6',
    brBlack: '#475569',
  },
  {
    id: 'espresso-code',
    name: 'Espresso Code',
    bg: '#1c1917', fg: '#d6d3d1', cursor: '#d97706', dim: '#292524',
    cyan: '#0d9488', accent: '#f59e0b',
    red: '#dc2626', green: '#65a30d', yellow: '#d97706', blue: '#0284c7',
    magenta: '#9333ea', brRed: '#ef4444', brGreen: '#84cc16',
    brYellow: '#f59e0b', brBlue: '#0ea5e9', brMagenta: '#a855f7',
    brBlack: '#57534e',
  },
  {
    id: 'phosphor',
    name: 'Phosphor',
    bg: '#020b05', fg: '#4ade80', cursor: '#22c55e', dim: '#064e3b',
    cyan: '#14b8a6', accent: '#4ade80',
    red: '#b91c1c', green: '#16a34a', yellow: '#ca8a04', blue: '#1d4ed8',
    magenta: '#9d174d', brRed: '#ef4444', brGreen: '#22c55e',
    brYellow: '#eab308', brBlue: '#3b82f6', brMagenta: '#db2777',
    brBlack: '#065f46',
  },
];

// ─── Svelte stores ────────────────────────────────────────────────────────────

import { writable, derived } from 'svelte/store';

export const themeId = writable(THEMES[0].id);
export const activeTheme = derived(themeId, (id) => THEMES.find(t => t.id === id) ?? THEMES[0]);

/** Returns CSS custom-property declarations for the given theme. */
export function themeToCss(t: Theme): string {
  return [
    `--bg:${t.bg}`,
    `--fg:${t.fg}`,
    `--cursor:${t.cursor}`,
    `--dim:${t.dim}`,
    `--cyan:${t.cyan}`,
    `--accent:${t.accent}`,
    `--red:${t.red}`,
    `--green:${t.green}`,
    `--yellow:${t.yellow}`,
    `--blue:${t.blue}`,
    `--magenta:${t.magenta}`,
    `--br-red:${t.brRed}`,
    `--br-green:${t.brGreen}`,
    `--br-yellow:${t.brYellow}`,
    `--br-blue:${t.brBlue}`,
    `--br-magenta:${t.brMagenta}`,
    `--br-black:${t.brBlack}`,
  ].join(';');
}
