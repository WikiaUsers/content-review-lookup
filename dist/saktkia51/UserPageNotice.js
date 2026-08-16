// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:UserPageNotice.js
// Environment dependencies: create().

(function() {
	"use strict";
	
	const initStartTime = performance.now();
	const scriptName = 'User Page Notice';
	const scriptInitCondition = mw.config.get('wgNamespaceNumber') === 2 && mw.config.get('wgTitle').match(/[/]/) !== null && !document.getElementById('UserPageNotice');
	if (!scriptInitCondition) {
		console.log(`[${scriptName}] [LOG]: Script activation conditions not met. Exiting...`);
		return;
	};
	console.log(`[${scriptName}] [LOG]: Running script...`);
	const mainContainer = document.querySelector('#content.page-content');
	const container = create('div');
	container.classList.add('templatedesktop', 'AlertNotice');
	container.setAttribute('id', 'UserPageNotice');
	
	const title = create('div', container);
	title.style = 'font-weight:bold;font-size:20px';
	const title_0 = create('span', title);
	const n = 'var(--saktkia51-js-userpagenotice-hazard-color)';
	title_0.style.color = n;
	title_0.innerText = '⚠';
	const title_1 = create('span', title);
	title_1.innerText = ' Unofficial Content ';
	const title_2 = create('span', title);
	title_2.style.color = n;
	title_2.innerText = '⚠';
	
	const body = create('div', container);
	const body_0 = create('span', body);
	body_0.style.fontWeight = 'bold';
	body_0.innerText = mw.config.get('wgPageName').replace(/_/g, ' ');
	const body_1 = create('span', body);
	body_1.innerText = ' is a personal user page. It is not a main wiki article, and as such, any information contained on this page is not official.';
	
	mainContainer.insertAdjacentElement('beforebegin', container);
	
	const initEndTime = performance.now();
	const initTotalTime = initEndTime - initStartTime;
	console.log(`[${scriptName}] [LOG]: Initialisation time: ${initTotalTime} ms`);
})();