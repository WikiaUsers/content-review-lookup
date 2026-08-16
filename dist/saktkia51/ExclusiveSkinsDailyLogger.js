// Created, and currently maintained, by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:ExclusiveSkinsDailyLogger.js
// Environment dependencies: getLocalJS(), getLocalCSS(), checkPlural(), create(), formatDate(), MediaWiki base module's mw object.
// Import dependencies: "./AllSkins.js", "./Materials.js", "./ExampleImages.js", "./CraftingReqs.js", "./main.css".

(async function() {
	"use strict";
	
	const initStartTime = performance.now();
	const srcContainer = document.getElementById('ExclusiveSkinsDailyLogger');
	const scriptName = 'Exclusive Skins Daily Logger';
	const scriptInitCondition = srcContainer && !document.getElementById('ExclusiveSkinsDailyLogger_Container');
	if (!scriptInitCondition) {
		console.log(`[${scriptName}] [LOG]: Script activation conditions not met. Exiting...`);
		return;
	};
	console.log(`[${scriptName}] [LOG]: Running script...`);
	const basePageName = "MediaWiki:ExclusiveSkinsDailyLogger.js";
	const placeholderImage = "https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/4/47/Placeholder.png/revision/latest?cb=20220315033423&format=original";
	const gameVersion = "V17.1";
	const weaponsCount = 21;
	const getJS = getLocalJS;
	const getCSS = getLocalCSS;
	
	const materials = {};
	await (async function() {
		const module = await getJS(`${basePageName}/Materials.js`);
		const files = module.files;
		const names = module.names;
		for (let m in names) {
			const obj = materials[m] = {
				name:names[m],
			};
			if (files[m] !== undefined) obj.fileSrc = files[m];
		};
	})();
	function formatMatName(id) {
		return materials[id]?.name ?? id;
	};
	
	const exampleImages = {};
	await (async function() {
		const module = await getJS(`${basePageName}/ExampleImages.js`);
		Object.assign(exampleImages, module.exampleImages);
	})();
	
	class WeaponSkin {
		constructor(mainDetails = {}, otherDetails = {}) {
			this.id = mainDetails.id;
			this.name = mainDetails.name ?? (otherDetails.unknown ? 'Unknown' : mainDetails.id);
			this.rarity = mainDetails.rarity ?? 'unknown';
			this.otherDetails = otherDetails;
		};
		formatCraftingReqs(factor, format) {
			factor ??= 1;
			format ??= {};
			format.inclX ??= true;
			format.inclIcon ??= true;
			format.inclMatName ??= true;
			format.iconPlacement ??= 'after';
			if (format.inclX) {
				format.xPlacement ??= 'after';
			};
			format.outputSeparator ??= ', ';
			
			const src = this;
			const output = [];
			const reqs = getCraftingReqs(src.id);
			for (let mat in reqs) {
				let str = (reqs[mat] * factor).toLocaleString();
				if (format.inclX) {
					str = format.xPlacement === 'before' ? `x${str}` : `${str}x`;
				};
				if (format.inclMatName) {
					str += ' ' + formatMatName(mat);
				};
				if (format.inclIcon) {
					const imageStr = `<span class='infoicon'><img class='DblClickImg' src='${materials[mat]?.fileSrc}'></img></span>`;
					str = format.iconPlacement === 'before' ? ` ${imageStr} ${str}` : ` ${str} ${imageStr}`;
				};
				output.push(str);
			};
			return output.join(format.outputSeparator);
		};
	};
	const skins = [];
	const craftingReqs = {};
	await (async function() {
		const module = await getJS(`${basePageName}/CraftingReqs.js`);
		Object.assign(craftingReqs, module.reqs);
	})();
	function getCraftingReqs(id) {
		if (craftingReqs[id] !== undefined) return craftingReqs[id];
		console.log(`[${scriptName}] [LOG]: Unavailable crafting requirements for skin ID ${id}`);
		return {};
	};
	function getExampleImage(id) {
		const elem = create('div');
		elem.setAttribute('id', 'ExampleImageContainer');
		const img = create('img', elem);
		img.classList.add('image', 'DblClickImg');
		img.setAttribute('src', exampleImages[id] ?? placeholderImage);
		const caption = create('div', elem);
		caption.classList.add('caption');
		caption.innerHTML = 'In-game appearance';
		return elem;
	};
	function formatRarityName(id) {
		const obj = {
			'entry':'Entry',
			'expert':'Expert',
			'exotic':'Exotic',
			'secret':'Secret',
			'unknown':'Unknown',
		};
		return obj[id] ?? id;
	};
	function getRarityClass(id) {
		const obj = {
			'entry':'Entry',
			'expert':'Expert',
			'exotic':'Exotic',
			'secret':'Secret',
		};
		if (obj[id] !== undefined) return 'SkinRarity_' + obj[id];
		console.log(`[${scriptName}] [LOG]: Unavailable rarity class for skin ID ${id}`);
		return '';
	};
	await (async function addSkins() {
		const module = await getJS(`${basePageName}/AllSkins.js`);
		const arr = module.skins;
		function adder(obj) {
			skins.push(new WeaponSkin(obj.mainDetails, obj.otherDetails));
		};
		for (let skin of arr) {
			adder(skin);
		};
	})();
	
	const mainContainer = create('div', srcContainer);
	mainContainer.setAttribute('id', 'ExclusiveSkinsDailyLogger_Container');
	mainContainer.classList.add('ExclusiveSkinsDailyLogger');
	const stylesheet = new CSSStyleSheet();
	document.adoptedStyleSheets.push(stylesheet);
	const cssText = await getCSS(`${basePageName}/main.css`);
	await stylesheet.replace(cssText);
	const title = create('div', mainContainer);
	title.classList.add('title');
	const body = create('div', mainContainer);
	body.classList.add('body');
	const closingNotes = create('div', mainContainer);
	closingNotes.classList.add('closingNotes');
	
	let currentSkin = {};
	function updateInternalData(specificIndex) {
		const newSkin = {};
		const d = 86400 * 1e3;
		function getDelta(extraDays = 0, useUTC = false) {
			const currTime = new Date().getTime();
			const offset = new Date(currTime + (d * extraDays)).getTimezoneOffset() * 1e3 * 60;
			const origDate = new Date(useUTC ? "2026-03-14T00:00" : "2026-03-14");
			const alteredDate = new Date(currTime - offset + (d * extraDays));
			const delta = alteredDate.getTime() - origDate.getTime();
			return delta;
		};
		const indexPicked = specificIndex ?? Math.floor(getDelta() / d) % 130 % skins.length;
		newSkin.dailyNumber = indexPicked + 1;
		newSkin.whichSkin = skins[indexPicked];
		return newSkin;
	};
	function updateTitle() {
		const s = currentSkin.whichSkin;
		const count = skins.length;
		const isUnknown = s.otherDetails.unknown;
		const nameText = !isUnknown ? s.name : `<i>${s.name}</i>`;
		const rarityText = !isUnknown ? ` (<span class='${getRarityClass(s.rarity)}'>${formatRarityName(s.rarity)}</span>)` : '';
		let str = `Today's exclusive daily skin:<br/>`
		+ `<span class='subtitle'>${nameText}${rarityText}`
		+ ` (#${currentSkin.dailyNumber.toLocaleString()}/${count.toLocaleString()})`
		+ `</span>`;
		title.innerHTML = str;
	};
	function updateBody() {
		const s = currentSkin.whichSkin;
		let str = '';
		const exampleImage = getExampleImage(s.id);
		str += exampleImage.outerHTML;
		exampleImage.remove();
		if (!s.otherDetails.unknown) {
			if (s.otherDetails.craftable) {
				str += `Crafting Requirements (single craft): ${s.formatCraftingReqs()}`;
				str += `<br/>Crafting Requirements (all weapons): ${s.formatCraftingReqs(weaponsCount)}`;
			};
		};
		body.innerHTML = str;
		
		{
			const e = body.querySelectorAll('.DblClickImg');
			const l = e.length;
			const srcOpener = (event)=>window.open(event.srcElement.src);
			for (let j = 0; j < l; j++) {
				e[j].addEventListener('dblclick', srcOpener);
			};
		};
	};
	function updateClosingNotes() {
		const count = skins.length;
		const currentDate = new Date();
		let dateFormat = mw.user.options.get('date');
		switch (dateFormat) {
			case 'dmy':
			dateFormat = 'd/M/yyyy HH:mm:ss';
			break;
			case 'mdy':
			dateFormat = 'M/d/yyyy HH:mm:ss';
			break;
			case 'ymd':
			dateFormat = 'yyyy/M/d HH:mm:ss';
			break;
			default:
			dateFormat = 'yyyy-MM-dd HH:mm:ss';
			break;
		};
		let str = "(Based on your local time zone, accounting for all " + count.toLocaleString()
		+ ` exclusive daily ${checkPlural(count, {singular:'skin', plural:'skins'})}.`
		+ ` Auto updates every 10 seconds, and the last update was at ${formatDate(currentDate, dateFormat)}.)`;
		str +=`<br/>Report tool issues or suggestions on the <a href="https://saktkia51.fandom.com/wiki/Editorial_Noticeboard">Editorial Noticeboard page</a> or contact any <a href="https://saktkia51.fandom.com/wiki/MediaWiki:ExclusiveSkinsDailyLogger.js">tool maintainer</a>.`;
		closingNotes.innerHTML = str;
	};
	
	function updateAll() {
		const newSkin = updateInternalData();
		if (newSkin.dailyNumber !== currentSkin.dailyNumber) {
			currentSkin = newSkin;
			updateTitle();
			updateBody();
		};
		updateClosingNotes();
	};
	updateAll();
	const autoUpdateInterval = setInterval(updateAll, 10e3);
	const initEndTime = performance.now();
	const initTotalTime = initEndTime - initStartTime;
	console.log(`[${scriptName}] [LOG]: Initialisation time: ${initTotalTime} ms`);
})();