/**
 * Re-add popular pages for signed in users who're using the FandomDesktop skin
 */
mw.loader.using(["mediawiki.util"]).then(function () {
	// Don't run if you aren't signed in or if you aren't using the fandom desktop skin
	if (
		mw.config.get("wgUserName") === null ||
		document.querySelector("body").classList.contains("skin-fandomdesktop") === false
	) {
		return;
	}

	const rail = document.querySelector("#WikiaRail");
	const url = [
		"https://",
		mw.config.get("wgServerName"),
		"/wikia.php?controller=Fandom%5CFandomDesktop%5CRail%5CRailController&method=renderLazyContentsAnon&modules%5B%5D=Fandom%5CFandomDesktop%5CRail%5CPopularPagesModuleService&fdRightRail=&useskin=fandomdesktop",
	].join("");

	const addPopularPagesModule = function addPopularPagesModule() {
		fetch(url)
			.then(function (response) {
				return response.text();
			})
			.then(function (data) {
				mw.util.addCSS(
					[
						".popular-pages__item > a { display: grid; grid-template-columns: 55px 1fr; grid-column-gap: 12px; align-items: center; }",
						".popular-pages__image, .popular-pages__placeholder { background: var(--theme-border-color); border: 1px solid var(--theme-border-color); border-radius: 3px; }",
					].join("")
				);
				const popularPagesHTML = new DOMParser().parseFromString(data, "text/html");
				const module = popularPagesHTML.querySelector("#recirculation-rail");
				module.classList.add("rail-module");
				rail.appendChild(module);
			});
	};

	if (!rail.classList.contains("is-ready")) {
		const observer = new MutationObserver(function () {
			observer.disconnect();
			addPopularPagesModule();
		});
		observer.observe(rail, { attributes: true, attributeFilter: ["class"] });
	} else {
		addPopularPagesModule(rail);
	}
});