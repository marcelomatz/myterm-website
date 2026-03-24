import type { PageServerLoad } from './$types';

const FALLBACK_VERSION = 'v0.1.0';
const GITHUB_REPO = 'marcelomatz/myterm';
// URL direta do instalador da v0.1.0 — fallback final para quando a API não responder
const FALLBACK_INSTALLER_URL =
	'https://github.com/marcelomatz/myterm/releases/download/v0.1.0/myterm-amd64-installer.exe';

interface ReleaseAsset {
	name: string;
	browser_download_url: string;
	size: number;
}

interface Release {
	tag_name: string;
	html_url: string;
	assets: ReleaseAsset[];
	draft?: boolean;
	prerelease?: boolean;
}

function extractUrls(data: Release) {
	const installerAsset = data.assets.find((a) => a.name.includes('-installer.exe'));
	const portableAsset = data.assets.find(
		(a) => a.name.endsWith('.exe') && !a.name.includes('-installer.exe')
	);
	return {
		version: data.tag_name ?? FALLBACK_VERSION,
		releaseUrl: data.html_url ?? null,
		installerUrl: installerAsset?.browser_download_url ?? data.html_url ?? FALLBACK_INSTALLER_URL,
		portableUrl: portableAsset?.browser_download_url ?? null
	};
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache 10 minutos no edge — evita rate limit da API pública do GitHub (60 req/h por IP)
	setHeaders({ 'cache-control': 'public, max-age=600, s-maxage=600' });

	const headers = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'myterm-website'
	};

	try {
		// Tentativa 1: /releases/latest (só retorna releases não-prerelease e não-draft)
		const res = await fetch(
			`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
			{ headers }
		);

		if (res.ok) {
			const data: Release = await res.json();
			return extractUrls(data);
		}

		// Tentativa 2: /releases?per_page=10 — pega a primeira release válida da lista
		console.warn(`/releases/latest retornou ${res.status} — tentando lista de releases`);
		const listRes = await fetch(
			`https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=10`,
			{ headers }
		);

		if (listRes.ok) {
			const releases: Release[] = await listRes.json();
			const latest = releases.find((r) => !r.draft && !r.prerelease);
			if (latest) return extractUrls(latest);
			if (releases.length > 0) return extractUrls(releases[0]);
		}

		// Fallback final: versão e URL hardcoded
		console.warn('API do GitHub indisponível — usando fallback estático');
		return {
			version: FALLBACK_VERSION,
			releaseUrl: 'https://github.com/marcelomatz/myterm/releases',
			installerUrl: FALLBACK_INSTALLER_URL,
			portableUrl: null
		};
	} catch (e) {
		console.error('Erro ao buscar versão do GitHub:', e);
		return {
			version: FALLBACK_VERSION,
			releaseUrl: 'https://github.com/marcelomatz/myterm/releases',
			installerUrl: FALLBACK_INSTALLER_URL,
			portableUrl: null
		};
	}
};
