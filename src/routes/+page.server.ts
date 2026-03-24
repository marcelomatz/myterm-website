import type { PageServerLoad } from './$types';

const FALLBACK_VERSION = 'v0.1.0';
const GITHUB_REPO = 'marcelomatz/myterm';

interface ReleaseAsset {
	name: string;
	browser_download_url: string;
	size: number;
}

interface Release {
	tag_name: string;
	html_url: string;
	assets: ReleaseAsset[];
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache 10 minutos no edge — evita rate limit da API pública do GitHub (60 req/h por IP)
	setHeaders({ 'cache-control': 'public, max-age=600, s-maxage=600' });

	try {
		const res = await fetch(
			`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					'User-Agent': 'myterm-website'
				}
			}
		);

		if (!res.ok) {
			console.warn(`GitHub API returned ${res.status} — usando fallback`);
			return { version: FALLBACK_VERSION, releaseUrl: null, installerUrl: null, portableUrl: null };
		}

		const data: Release = await res.json();

		// Acha o instalador NSIS (ex: myterm-amd64-installer.exe) e o .exe portátil
		const installerAsset = data.assets.find((a) => a.name.includes('-installer.exe'));
		const portableAsset = data.assets.find(
			(a) => a.name.endsWith('.exe') && !a.name.includes('-installer.exe')
		);

		return {
			version: data.tag_name ?? FALLBACK_VERSION,
			releaseUrl: data.html_url ?? null,
			// URL direta de download — usuário clica e já baixa o arquivo
			installerUrl: installerAsset?.browser_download_url ?? data.html_url ?? null,
			portableUrl: portableAsset?.browser_download_url ?? null
		};
	} catch (e) {
		console.error('Erro ao buscar versão do GitHub:', e);
		return { version: FALLBACK_VERSION, releaseUrl: null, installerUrl: null, portableUrl: null };
	}
};

