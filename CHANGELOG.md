# Changelog — Website myTerm

Mudanças no site de marketing do myTerm.

---

## [0.2.0] — 2026-03-23

### 🚀 Adicionado
- Grade de **3 plataformas** na seção CTA Download: Windows, macOS, Linux (com botões individuais por plataforma)
- Badges "Windows 10+" · "macOS 11+" · "Linux amd64" na seção Features (removido "em breve")
- Estilos `.platform-badge.macos`, `.platform-badge.linux`, `.cta-platforms`, `.cta-platform-card`, `.btn-ghost-sm`

### 🔧 Alterado
- `+page.server.ts`: `FALLBACK_VERSION` atualizado para `v0.2.0`; `find()` corrigido para detectar `myterm-amd64-installer.exe`
- `TerminalBanner.svelte`: prop `version` default atualizado para `v0.2.0`
- Nota de atalhos: "suporte macOS & Linux em melhoria contínua" (removido "em breve")
- Footer: "MIT · Windows · macOS · Linux · Go 1.21+ · Wails v2 · Svelte 5"

### 🗑️ Removido
- Seletores CSS orphans: `.platform-soon`, `.cta-row`, `.cta-soon`
- Botão único de download substituído pela grade de plataformas

---

## [0.1.0] — 2026-03-20

### 🚀 Adicionado
- Lançamento inicial do website usando **SvelteKit** + Vercel
- SeçõeS: Hero, Demo (TerminalBanner), Features, Atalhos, Pilares, CTA Download, Footer
- Integração com GitHub Releases API para URLs dinâmicas de download
- Fallback estático para quando a API não responde
