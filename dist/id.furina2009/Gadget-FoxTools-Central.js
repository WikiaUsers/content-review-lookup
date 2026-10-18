/**
 * [FOXTOOLS — PATROLLERS HELPER SCRIPT]
 * 
 * •==============================================•
 * > Pencipta: Janorovic Volkov
 * > Pengembang: Janorovic Volkov
 * > Tipe: JavaScript
 * 
 * Lihat [[WP:FT]] untuk informasi selengkapnya
 * tentang skrip ini
 * edit: skrip ini dari id.wikipedia
 * •==============================================•
 */
// <nowiki>
(() => {
	const autoconfirmed = mw.config.get("wgUserGroups").includes("autoconfirmed");
	const confirmed = mw.config.get('wgUserGroups').includes("confirmed");
	const sysop = mw.config.get('wgUserGroups').includes("sysop");
	if (!autoconfirmed && !sysop && !confirmed) return;
	const FT = (window.FoxTools = {
		version: "4.1",
		modules: {},
		userConfig: {},
		ads: "[[wikipedia:WP:FT|🦊 FoxTools]]",
		initModule(name) {
			if (!FT.modules[name]) {
				importScript(`MediaWiki:Gadget-FoxTools-${name}.js`);
			}
		},
		register(name, moduleObj) {
			FT.modules[name] = moduleObj;
			console.log(`[${FT.ads}] Modul ${name} terdaftar.`);
			if (moduleObj.init) moduleObj.init();
		},
		getPref(key, fallback) {
			return (FT.userConfig[key] !== undefined ? FT.userConfig[key] : fallback);
		}
	});
	const username = mw.config.get("wgUserName");
	const prefPage = `User:${username}/Preferensi-FoxTools.json`;
	const prefURL = `/wiki/${prefPage}?action=raw&ctype=application/json`;
	async function loadPrefs() {
		try {
			const res = await fetch(prefURL);
			if (!res.ok) throw new Error("Not found");
			FT.userConfig = await res.json();
		} catch {
			console.warn(`[${FT.ads}] Preferensi tidak ditemukan, membuat baru...`);
			FT.userConfig = {
				ads: "[[wikipedia:WP:FT|🦊 FoxTools]]",
				modules: ["Report", "Protect", "KPC", "UP", "Block", "Rollback"]
			};
			await createDefaultPrefs();
		}
		FT.ads = FT.userConfig.ads || "[[Wikipedia:WP:FT|🦊 FoxTools]]";
	}
	async function createDefaultPrefs() {
		const api = new mw.Api();
		const content = JSON.stringify(FT.userConfig, null, 2);
		try {
			await api.postWithToken("csrf", {
				action: "edit",
				title: prefPage,
				text: content,
				summary: `Membuat preferensi default (${FT.ads})`,
				tags: "FoxTools",
				minor: true,
				createonly: true
			});
			console.log(`[${FT.ads}] Preferensi baru berhasil dibuat di ${prefPage}`);
		} catch (err) {
			console.error(`[${FT.ads}] Gagal membuat halaman preferensi:`, err);
		}
	}
	async function init() {
		await loadPrefs();
		for (const name of FT.userConfig.modules) {
			FT.initModule(name);
		}
		importScript('MediaWiki:Gadget-FoxTools-Preferences.js');
		console.log(`[${FT.ads}] Semua modul dimuat.`);
	}
	$(init);
})();
// </nowiki>