// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:Staff.js
// Small stuff for the Wiki Staff page: https://saktkia51.fandom.com/wiki/ROBLOX_Survive_and_Kill_the_Killers_in_Area_51_Wiki:Wiki_Staff
// Environment dependencies: document, getLocalCSS(), InitLogger.

(async ()=> {
	"use strict";

	const basePageName = "MediaWiki:Staff.js";
	const scriptName = 'Staff';
	const initLogger = new InitLogger(scriptName);
	async function addStyleSheet() {
		const stylesheet = new CSSStyleSheet();
		document.adoptedStyleSheets.push(stylesheet);

		const cssText = await getLocalCSS(`${basePageName}/main.css`);
		await stylesheet.replace(cssText);
	};

	const e = document.querySelectorAll('.StaffBoxStyling img');
	const l = e.length;
	if (l > 0) await addStyleSheet();
	for (let j = 0; j < l; j++) {
		const n = e[j];
		n.classList.add('DblClickImg');
		n.addEventListener('dblclick', ()=>window.open(n.src));
	};

	initLogger.resolve();
})();