import type { PageServerLoad } from './$types';

const FALLBACK_VERSION = 'v0.2.0';
const GITHUB_REPO = 'marcelomatz/myterm';
const BASE_RELEASE = `https://github.com/${GITHUB_REPO}/releases/download/${FALLBACK_VERSION}`;

// Fallbacks estáticos para a v0.2.0 — usados quando a API não responder
const FALLBACK_URLS = {
	// O asset do instalador NSIS gerado pelo Wails chama-se myterm-amd64-installer.exe
	installerUrl: `${BASE_RELEASE}/myterm-amd64-installer.exe`,
	windowsUrl: `${BASE_RELEASE}/myterm-windows-amd64.exe`,
	macosUrl: `${BASE_RELEASE}/myterm-macos-universal.dmg`,
	macosZipUrl: `${BASE_RELEASE}/myterm-macos-universal.zip`,
	linuxUrl: `${BASE_RELEASE}/myterm-linux-amd64.tar.gz`,
	releasePageUrl: `https://github.com/${GITHUB_REPO}/releases`
};

interface ReleaseAsset {
	name: string;
	browser_download_url: string;
}

interface Release {
	tag_name: string;
	html_url: string;
	assets: ReleaseAsset[];
	draft?: boolean;
	prerelease?: boolean;
}

function extractUrls(data: Release) {
	const a = data.assets;
	const find = (pred: (n: string) => boolean) =>
		a.find((x) => pred(x.name))?.browser_download_url ?? null;

	return {
		version: data.tag_name ?? FALLBACK_VERSION,
		releasePageUrl: data.html_url ?? FALLBACK_URLS.releasePageUrl,
		// Windows — instalador pode ser myterm-amd64-installer.exe ou myterm-windows-amd64-installer.exe
		installerUrl:
			find((n) => n.includes('installer') && n.endsWith('.exe')) ??
			FALLBACK_URLS.installerUrl,
		windowsUrl:
			find((n) => n.includes('windows') && n.endsWith('.exe') && !n.includes('installer')) ??
			FALLBACK_URLS.windowsUrl,
		// macOS
		macosUrl: find((n) => n.includes('macos') && n.endsWith('.dmg')) ?? FALLBACK_URLS.macosUrl,
		macosZipUrl:
			find((n) => n.includes('macos') && n.endsWith('.zip')) ?? FALLBACK_URLS.macosZipUrl,
		// Linux
		linuxUrl: find((n) => n.includes('linux') && n.endsWith('.tar.gz')) ?? FALLBACK_URLS.linuxUrl
	};
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=600, s-maxage=600' });

	const headers = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'myterm-website'
	};

	try {
		// Tentativa 1: /releases/latest
		const res = await fetch(
			`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
			{ headers }
		);

		if (res.ok) {
			return extractUrls(await res.json());
		}

		// Tentativa 2: lista de releases
		console.warn(`/releases/latest → ${res.status}, tentando lista`);
		const listRes = await fetch(
			`https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=10`,
			{ headers }
		);

		if (listRes.ok) {
			const releases: Release[] = await listRes.json();
			const latest = releases.find((r) => !r.draft && !r.prerelease) ?? releases[0];
			if (latest) return extractUrls(latest);
		}
	} catch (e) {
		console.error('Erro ao buscar versão do GitHub:', e);
	}

	// Fallback final estático
	console.warn('Usando URLs estáticas de fallback (v0.2.0)');
	return { version: FALLBACK_VERSION, ...FALLBACK_URLS };
};
