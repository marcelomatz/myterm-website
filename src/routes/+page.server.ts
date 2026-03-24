import type { PageServerLoad } from './$types';

const FALLBACK_VERSION = 'v0.3.1';


const GITHUB_REPO = 'marcelomatz/myterm';
const BASE_RELEASE = `https://github.com/${GITHUB_REPO}/releases/download/${FALLBACK_VERSION}`;

// Fallbacks estáticos para a v0.2.0 — usados quando a API não responder
const FALLBACK_URLS = {
	// O asset do instalador NSIS gerado pelo Wails chama-se myterm-windows-amd64-installer.exe
	installerUrl: `${BASE_RELEASE}/myterm-windows-amd64-installer.exe`,

	windowsUrl: `${BASE_RELEASE}/myterm-windows-amd64.exe`,
	macosUrl: `${BASE_RELEASE}/myterm-macos-universal.dmg`,
	macosZipUrl: `${BASE_RELEASE}/myterm-macos-universal.zip`,
	linuxUrl: `${BASE_RELEASE}/myterm-linux-amd64.tar.gz`,
	releasePageUrl: `https://github.com/${GITHUB_REPO}/releases`
};

interface ReleaseAsset {
	name: string;
	browser_download_url: string;
	size: number; // bytes
}

interface Release {
	tag_name: string;
	html_url: string;
	assets: ReleaseAsset[];
	draft?: boolean;
	prerelease?: boolean;
}

/** Converte bytes para string legível (MB com 1 casa decimal) */
function formatSize(bytes: number | null | undefined): string | null {
	if (!bytes || bytes <= 0) return null;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extractUrls(data: Release) {
	const a = data.assets;
	const find = (pred: (n: string) => boolean) => a.find((x) => pred(x.name));

	const installerAsset =
		find((n) => n.includes('installer') && n.endsWith('.exe')) ?? null;
	const windowsAsset =
		find((n) => n.includes('windows') && n.endsWith('.exe') && !n.includes('installer')) ??
		find((n) => n.endsWith('.exe') && !n.includes('installer')) ??
		null;
	const macosAsset = find((n) => n.includes('macos') && n.endsWith('.dmg')) ?? null;
	const macosZipAsset = find((n) => n.includes('macos') && n.endsWith('.zip')) ?? null;
	const linuxAsset = find((n) => n.includes('linux') && n.endsWith('.tar.gz')) ?? null;

	return {
		version: data.tag_name ?? FALLBACK_VERSION,
		releasePageUrl: data.html_url ?? FALLBACK_URLS.releasePageUrl,

		installerUrl: installerAsset?.browser_download_url ?? FALLBACK_URLS.installerUrl,
		installerSize: formatSize(installerAsset?.size),

		windowsUrl: windowsAsset?.browser_download_url ?? FALLBACK_URLS.windowsUrl,
		windowsSize: formatSize(windowsAsset?.size),

		macosUrl: macosAsset?.browser_download_url ?? FALLBACK_URLS.macosUrl,
		macosSize: formatSize(macosAsset?.size),

		macosZipUrl: macosZipAsset?.browser_download_url ?? FALLBACK_URLS.macosZipUrl,
		macosZipSize: formatSize(macosZipAsset?.size),

		linuxUrl: linuxAsset?.browser_download_url ?? FALLBACK_URLS.linuxUrl,
		linuxSize: formatSize(linuxAsset?.size)
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
	console.warn('Usando URLs estáticas de fallback (v0.3.0)');

	return {
		version: FALLBACK_VERSION,
		...FALLBACK_URLS,
		installerSize: null,
		windowsSize: null,
		macosSize: null,
		macosZipSize: null,
		linuxSize: null
	};
};
