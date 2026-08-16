// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:MainPageSearch.js
// Environment dependencies: create(), getLocalJS(), getLocalCSS(), MediaWiki base module's mw object.
// Import dependencies: "./main.css".

(async function() {
	"use strict";
	
	const initStartTime = performance.now();
	const srcContainer = document.getElementById('MainPageSearch');
	const scriptName = 'Main Page Search';
	const scriptInitCondition = mw.config.get('wgIsMainPage') && srcContainer && !document.getElementById('MainPageSearch_Container');
	if (!scriptInitCondition) {
		console.log(`[${scriptName}] [LOG]: Script activation conditions not met. Exiting...`);
		return;
	};
	console.log(`[${scriptName}] [LOG]: Running script...`);
	const basePageName = "MediaWiki:MainPageSearch.js";
	
	const stylesheet = new CSSStyleSheet();
	document.adoptedStyleSheets.push(stylesheet);
	const cssText = await getLocalCSS(`${basePageName}/main.css`);
	await stylesheet.replace(cssText);
	const container = create('div', srcContainer);
	container.id = 'MainPageSearch_Container';
	const topText = create('div', container);
	topText.innerText = 'Search:';
	topText.id = 'TopText';
	
	const queryContainer = create('div', container);
	const input = create('textarea', queryContainer);
	input.id = 'QueryInput';
	input.setAttribute('placeholder', 'Enter search query...');
	
	const buttonContainer = create('div', container);
	const confirmButton = create('button', buttonContainer);
	confirmButton.id = 'ConfirmButton';
	confirmButton.innerText = 'Confirm';
	confirmButton.addEventListener('click', openSearch);
	
	function openSearch() {
		window.open(`${mw.config.get('wgServer')}/Special:Search?query=${encodeURI(input.value)}`);
	};
	const initEndTime = performance.now();
	const initTotalTime = initEndTime - initStartTime;
	console.log(`[${scriptName}] [LOG]: Initialisation time: ${initTotalTime} ms`);
})();