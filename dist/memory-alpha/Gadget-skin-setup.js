'use strict';
(async () => {
	const config = mw.config.values;
	const currentPage = new mw.Title(config.wgRelevantPageName);
	const subjectPage = currentPage.getSubjectPage();
	const talkPage = currentPage.getTalkPage();
	const skinConfig = {};
	const api = new mw.Api({'parameters': {
		'action': 'query',
		'format': 'json',
		'formatversion': 2,
		'errorformat': 'plaintext',
		'uselang': config.wgUserLanguage,
	}});
	let subjectNamespace = subjectPage.getNamespaceId();
	let talkNamespace = talkPage ? talkPage.getNamespaceId() : null;
	
	if (subjectNamespace === -1){
		subjectNamespace = 'Special';
		talkNamespace = 'Special talk';
	} else if (!subjectNamespace){
		subjectNamespace = 'Main';
		talkNamespace = 'Talk';
	} else if (subjectNamespace === 4){
		subjectNamespace = 'Project';
		talkNamespace = 'Project talk';
	} else if (subjectNamespace === 6){
		subjectNamespace = 'Image';
		talkNamespace = 'Image talk';
	} else if (subjectNamespace === 112){
		subjectNamespace = 'Help';
		talkNamespace = 'Help talk';
	} else {
		subjectNamespace = config.wgFormattedNamespaces[subjectNamespace];
		talkNamespace = config.wgFormattedNamespaces[talkNamespace];
	}
	
	const nstabKey = `nstab-${subjectNamespace.toLowerCase().replaceAll(' ', '_')}`;
	const nstabKeyTalk = `nstab-${talkNamespace.toLowerCase().replaceAll(' ', '_')}`;
	await api.loadMessagesIfMissing([
		'mainpage',
		'nstab-mainpage',
		'talk',
		nstabKey,
		nstabKeyTalk,
		'sidebar',
	]);
	const mainPage = new mw.Title(mw.message('mainpage').text());
	const nstabMainpage = mw.message('nstab-mainpage');
	let nstab = subjectNamespace;
	let nstabTalk = mw.message('talk').text();
	
	if (isValid(nstabMainpage) && subjectPage.toText() === mainPage.toText()){
		nstab = nstabMainpage.text();
	} else if (isValid(mw.message(nstabKey))){
		nstab = mw.message(nstabKey).text();
	}
	
	if (isValid(mw.message(nstabKeyTalk))){
		nstabTalk = mw.message(nstabKeyTalk).text();
	}
	
	skinConfig.nstab = nstab;
	skinConfig.nstabTalk = nstabTalk;
	
	const mainMenu = {};
	let activePortlet;
	
	mw.message('sidebar').text().split(/\s*\n/).forEach(item => {
		if (/^\*\*/.test(item)){
			const linkMessages = item.replace(/^\*\*+\s*/, '').split('|');
			mainMenu[activePortlet].push(linkMessages);
		} else {
			activePortlet = item.replace(/^\*\s*/, '');
			mainMenu[activePortlet] = [];
		}
	});
	
	skinConfig.buildMainMenu = async parent => {
		for (const key of Object.keys(mainMenu)){
			$(parent).append(await buildPortlet(key));
			for (const link of mainMenu[key]){
				await addPortletLink(key, link[0], link[1], 'n');
			}
		}
	};
	
	skinConfig.buildToolbox = async (parent, label) => {
		$(parent).append(await buildPortlet('tb', label));
		await addPortletLink(
			'tb',
			`Special:WhatLinksHere/${currentPage.toText()}`,
			'whatlinkshere',
			't'
		);
		await addPortletLink(
			'tb',
			`Special:RecentChangesLinked/${currentPage.toText()}`,
			'recentchangeslinked-toolbox',
			't',
			'recentchangeslinked'
		);
		await addPortletLink(
			'tb',
			'#',
			'printableversion',
			't',
			'print'
		);
		await addPortletLink(
			'tb',
			`Special:PermanentLink/${config.wgRevisionId}`,
			'permalink',
			't'
		);
		await addPortletLink(
			'tb',
			`Special:PageInfo/${currentPage.toText()}`,
			'pageinfo-toolboxlink',
			't',
			'info'
		);
		$('#t-print > a').on('click', event => {
			event.preventDefault();
			print();
		});
		if ($('.content-review__widget').length){
			$(parent).append(await buildPortlet('js-review', 'Review status'));
			$('#p-js-review > div').html($('.content-review__widget__title').nextAll());
		}
		$('.page__right-rail').remove();
	};
	
	// skinConfig.buildLangList = async parent => {
	// 	$(parent).append(await buildPortlet('lang', 'otherlanguages'));
	// 	await addPortletLink(
	// 		'lang',
	// 		`...`,
	// 		'...',
	// 		'...',
	// 		'...'
	// 	);
	// };
	
	async function buildPortlet(key, label = key){
		await api.loadMessagesIfMissing(label);
		label = mw.message(label);
		label = isValid(label) ? label.text() : label;
		return mw.util.addPortlet(`p-${key}`, label);
	}
	
	async function addPortletLink(portletName, target, linkText, prefix, internalName = linkText){
		await api.loadMessagesIfMissing([
			target,
			linkText,
			`tooltip-${prefix}-${internalName}`,
			`accesskey-${prefix}-${internalName}`,
		]);
		
		let href = mw.message(target);
		let label = mw.message(linkText);
		let tooltip = mw.message(`tooltip-${prefix}-${internalName}`);
		let accesskey = mw.message(`accesskey-${prefix}-${internalName}`);
		
		href = isValid(href) ? href.text() : target;
		href = target === '#' ? target : mw.util.getUrl(href);
		label = isValid(label) ? label.text() : linkText;
		tooltip = isValid(tooltip) ? tooltip.text() : null;
		accesskey = isValid(accesskey) ? accesskey.text() : null;
		
		mw.util.addPortletLink(
			`p-${portletName}`,
			href,
			label,
			`${prefix}-${internalName}`,
			tooltip,
			accesskey
		);
	}
	
	mw.hook('gadget.skinSetup').fire(skinConfig);
})();

function isValid(message){
	return message.exists() && message.text();
}