'use strict';
(async () => {
	const skinConfig = {};
	const config = mw.config.values;
	const currentPage = new mw.Title(config.wgRelevantPageName);
	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: config.wgUserLanguage,
	}});
	const pageInfo = (await api.get({
		titles: currentPage.toText(),
		prop: ['deletedrevisions', 'info', 'langlinks', 'pageprops'],
		drvprop: '',
		drvlimit: 1,
		inprop: ['protection', 'watched'],
		intestactions: ['block', 'delete', 'move', 'protect', 'undelete'],
		llprop: ['url', 'langname', 'autonym'],
		llinlanguagecode: config.wgUserLanguage,
		lllimit: 'max',
		ppprop: 'notoc',
	})).query.pages[0];

	await api.loadMessagesIfMissing([
		'accesskey-ca-delete',
		'accesskey-ca-edit',
		'accesskey-ca-history',
		'accesskey-ca-move',
		'accesskey-ca-nstab',
		'accesskey-ca-protect',
		'accesskey-ca-talk',
		'accesskey-ca-undelete',
		'accesskey-ca-unprotect',
		'accesskey-ca-unwatch',
		'accesskey-ca-view',
		'accesskey-ca-viewsource',
		'accesskey-ca-watch',
		'accesskey-pt-createaccount',
		'accesskey-pt-login',
		'accesskey-pt-logout',
		'accesskey-pt-mycontris',
		'accesskey-pt-mytalk',
		'accesskey-pt-preferences',
		'accesskey-pt-userpage',
		'accesskey-pt-watchlist',
		'accesskey-t-blockip',
		'accesskey-t-contributions',
		'accesskey-t-info',
		'accesskey-t-log',
		'accesskey-t-permalink',
		'accesskey-t-print',
		'accesskey-t-recentchangeslinked',
		'accesskey-t-userrights',
		'accesskey-t-whatlinkshere',
		'associated-pages',
		'blockip',
		'cactions',
		'custom-license-description',
		'fd-notifications-notifications',
		'global-footer-company-overview-link-about',
		'global-footer-site-overview-link-privacy-policy',
		'global-footer-site-overview-link-terms-of-use',
		'interlanguage-link-title',
		'log',
		'mainpage',
		'mycontris',
		'mypreferences',
		'mytalk',
		'mywatchlist',
		'nstab-mainpage',
		'otherlanguages',
		'pageinfo-toolboxlink',
		'permalink',
		'personal',
		'printableversion',
		'pt-createaccount',
		'pt-login',
		'pt-userlogout',
		'recentchangeslinked-toolbox',
		'skin-action-delete',
		'skin-action-move',
		'skin-action-protect',
		'skin-action-undelete',
		'skin-action-unprotect',
		'skin-action-viewsource',
		'skin-view-create',
		'skin-view-edit',
		'skin-view-history',
		'skin-view-view',
		'talk',
		'toc',
		'tool-link-contributions',
		'tool-link-userrights-readonly',
		'toolbox',
		'tooltip-ca-delete',
		'tooltip-ca-edit',
		'tooltip-ca-history',
		'tooltip-ca-move',
		'tooltip-ca-nstab',
		'tooltip-ca-protect',
		'tooltip-ca-talk',
		'tooltip-ca-undelete',
		'tooltip-ca-unprotect',
		'tooltip-ca-unwatch',
		'tooltip-ca-view',
		'tooltip-ca-viewsource',
		'tooltip-ca-watch',
		'tooltip-pt-createaccount',
		'tooltip-pt-login',
		'tooltip-pt-logout',
		'tooltip-pt-mycontris',
		'tooltip-pt-mytalk',
		'tooltip-pt-preferences',
		'tooltip-pt-userpage',
		'tooltip-pt-watchlist',
		'tooltip-t-blockip',
		'tooltip-t-contributions',
		'tooltip-t-info',
		'tooltip-t-log',
		'tooltip-t-permalink',
		'tooltip-t-print',
		'tooltip-t-recentchangeslinked',
		'tooltip-t-userrights',
		'tooltip-t-whatlinkshere',
		'unwatch',
		'views',
		'watch',
		'whatlinkshere',
	]);

	skinConfig.mainMenu = async parent => {
		let activePortlet;
		const mainMenu = {};
		const mainMenuPortlets = [];
		const systemMessages = [];
		const sidebar = (await api.get({
			titles: 'MediaWiki:Sidebar',
			prop: 'revisions',
			rvprop: 'content',
			rvslots: 'main',
		})).query.pages[0].revisions[0].slots.main.content;
		for (const item of sidebar.split(/\s*\n/)){
			if (/^\*\*/.test(item)){
				const linkMessages = item.replace(/^\*\*+\s*/, '').split('|');
				mainMenu[activePortlet].push(linkMessages);
				systemMessages.push(
					...linkMessages,
					`accesskey-n-${linkMessages[1]}`,
					`tooltip-n-${linkMessages[1]}`,
				);
			} else {
				activePortlet = item.replace(/^\*\s*/, '');
				mainMenu[activePortlet] = [];
				systemMessages.push(activePortlet);
			}
		}
		await api.loadMessagesIfMissing(systemMessages);
		for (const key of Object.keys(mainMenu)){
			const portlet = buildPortlet(key);
			mainMenuPortlets.push(portlet);
			$(parent).append(portlet);
			for (const link of mainMenu[key]){
				addPortletLink(key, ...link, 'n');
			}
		}
		return mainMenuPortlets;
	};

	skinConfig.toolbox = parent => {
		const toolboxPortlets = [];
		const mainPortlet = buildPortlet('tb', 'toolbox');
		toolboxPortlets.push(mainPortlet);
		$(parent).append(mainPortlet);
		if (currentPage.getNamespaceId() > -1){
			addPortletLink(
				'tb',
				`Special:WhatLinksHere/${currentPage.toText()}`,
				'whatlinkshere',
				't',
			);
			addPortletLink(
				'tb',
				`Special:RecentChangesLinked/${currentPage.toText()}`,
				'recentchangeslinked-toolbox',
				't',
				'recentchangeslinked',
			);
		}
		if (config.wgRelevantUserName){
			addPortletLink(
				'tb',
				`Special:Contributions/${config.wgRelevantUserName}`,
				'tool-link-contributions',
				't',
				'contributions',
				[config.wgRelevantUserName],
			);
			addPortletLink(
				'tb',
				`Special:Log/${config.wgRelevantUserName}`,
				'log',
				't',
			);
			if (pageInfo.actions.block){
				addPortletLink(
					'tb',
					`Special:Block/${config.wgRelevantUserName}`,
					'blockip',
					't',
					undefined,
					[config.wgRelevantUserName],
				);
			}
			addPortletLink(
				'tb',
				`Special:UserRights/${config.wgRelevantUserName}`,
				'tool-link-userrights-readonly',
				't',
				'userrights',
				[config.wgRelevantUserName],
			);
		}
		const printLink = addPortletLink(
			'tb',
			'#',
			'printableversion',
			't',
			'print',
		);
		if (currentPage.getNamespaceId() > -1){
			if (config.wgRevisionId && config.wgUserId){
				addPortletLink(
					'tb',
					{oldid: config.wgRevisionId},
					'permalink',
					't',
				);
			}
			addPortletLink(
				'tb',
				{action: 'info'},
				'pageinfo-toolboxlink',
				't',
				'info',
			);
		}
		$(printLink).find('a').on('click', event => {
			event.preventDefault();
			print();
		});
		if ($('.content-review__widget').length){
			const reviewPortlet = buildPortlet('js-review', 'Review status');
			toolboxPortlets.push(reviewPortlet);
			$(parent).append(reviewPortlet);
			$(reviewPortlet).find('div').html($('.content-review__widget__title').nextAll());
		}
		$('.page__right-rail').remove();
		return toolboxPortlets;
	};

	skinConfig.langs = parent => {
		const langs = buildPortlet('lang', 'otherlanguages');
		$(parent).append(langs);

		if (!pageInfo.langlinks){
			return langs;
		}

		for (const langlink of pageInfo.langlinks){
			mw.util.addPortletLink(
				'p-lang',
				langlink.url,
				langlink.autonym,
				undefined,
				mw.message(
					'interlanguage-link-title',
					langlink.title,
					langlink.langname,
				),
			);
		}

		return langs;
	};

	skinConfig.associatedPages = async parent => {
		const subjectPage = currentPage.getSubjectPage();
		const talkPage = currentPage.getTalkPage();
		const associatedPages = buildPortlet('associated-pages');
		$(parent).append(associatedPages);

		if (!talkPage){
			return associatedPages;
		}

		let subjectNamespace = subjectPage.getNamespaceId();
		let talkNamespace = talkPage.getNamespaceId();

		if (!subjectNamespace){
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

		const accesskeyMsg = `accesskey-ca-nstab-${formatMessageKey(subjectNamespace)}`;
		const subjectMsg = `nstab-${formatMessageKey(subjectNamespace)}`;
		const talkMsg = `nstab-${formatMessageKey(talkNamespace)}`;
		const tooltipMsg = `tooltip-ca-nstab-${formatMessageKey(subjectNamespace)}`;

		await api.loadMessagesIfMissing([
			accesskeyMsg,
			subjectMsg,
			talkMsg,
			tooltipMsg,
		]);

		const mainPage = new mw.Title(mw.message('mainpage').text());
		const mainPageLabel = mw.message('nstab-mainpage');
		let subjectLabel = subjectNamespace;
		let talkLabel = mw.message('talk').text();
		let tooltip = mw.message('tooltip-ca-nstab').text();
		let accesskey = mw.message('accesskey-ca-nstab').text();

		if (isValid(mainPageLabel) && subjectPage.toText() === mainPage.toText()){
			subjectLabel = mainPageLabel.text();
		} else if (isValid(mw.message(subjectMsg))){
			subjectLabel = mw.message(subjectMsg).text();
		}

		if (isValid(mw.message(talkMsg))){
			talkLabel = mw.message(talkMsg).text();
		}

		if (isValid(mw.message(tooltipMsg))){
			tooltip = mw.message(tooltipMsg).text();
		}

		if (isValid(mw.message(accesskeyMsg))){
			accesskey = mw.message(accesskeyMsg).text();
		}

		const subjectLink = mw.util.addPortletLink(
			'p-associated-pages',
			mw.util.getUrl(subjectPage.toText()),
			subjectLabel,
			`ca-${subjectMsg}`,
			tooltip,
			accesskey,
		);
		const talkLink = mw.util.addPortletLink(
			'p-associated-pages',
			mw.util.getUrl(talkPage.toText()),
			talkLabel,
			'ca-talk',
			mw.message('tooltip-ca-talk').text(),
			mw.message('accesskey-ca-talk').text(),
		);

		if (currentPage.toText() === talkPage.toText()){
			$(talkLink).addClass('selected');
		} else {
			$(subjectLink).addClass('selected');
		}

		return associatedPages;
	};

	skinConfig.views = parent => {
		const views = buildPortlet('views');
		$(parent).append(views);
		if (currentPage.getNamespaceId() === -1){
			return views;
		}
		if (config.wgRelevantArticleId){
			const viewLink = addPortletLink(
				'views',
				currentPage.toText(),
				'skin-view-view',
				'ca',
				'view',
			);
			if (config.wgAction === 'view' && config.wgPageName === config.wgRelevantPageName){
				$(viewLink).addClass('selected');
			}
		}
		if (config.wgRelevantArticleId || config.wgRelevantPageIsProbablyEditable){
			let editMsg = 'skin-view-create';
			if (!config.wgRelevantPageIsProbablyEditable){
				editMsg = 'skin-action-viewsource';
			} else if (config.wgRelevantArticleId){
				editMsg = 'skin-view-edit';
			}
			const editLink = addPortletLink(
				'views',
				{action: 'edit'},
				editMsg,
				'ca',
				config.wgRelevantPageIsProbablyEditable ? 'edit' : 'viewsource',
			);
			if (['edit', 'submit'].includes(config.wgAction)){
				$(editLink).addClass('selected');
			}
		}
		if (config.wgRelevantArticleId){
			const historyLink = addPortletLink(
				'views',
				{action: 'history'},
				'skin-view-history',
				'ca',
				'history',
			);
			if (config.wgAction === 'history'){
				$(historyLink).addClass('selected');
			}
		}
		if (config.wgUserId){
			const watchAction = pageInfo.watched ? 'unwatch' : 'watch';
			const watchLink = addPortletLink(
				'views',
				{action: watchAction},
				watchAction,
				'ca',
			);
			const watch = require('mediawiki.page.watch.ajax');
			watch.watchstar($(watchLink).find('a'), currentPage.toText());
			if (['watch', 'unwatch'].includes(config.wgAction)){
				$(watchLink).addClass('selected');
			}
		}
		return views;
	};

	skinConfig.actions = parent => {
		const actions = buildPortlet('cactions');
		$(parent).append(actions);
		if (currentPage.getNamespaceId() === -1){
			return actions;
		}
		if (pageInfo.actions.delete && config.wgRelevantArticleId){
			const deleteLink = addPortletLink(
				'cactions',
				{action: 'delete'},
				'skin-action-delete',
				'ca',
				'delete',
			);
			if (config.wgAction === 'delete'){
				$(deleteLink).addClass('selected');
			}
		}
		if (pageInfo.actions.undelete && pageInfo.deletedrevisions && !config.wgRelevantArticleId){
			const undeleteLink = addPortletLink(
				'cactions',
				`Special:Undelete/${currentPage.toText()}`,
				'skin-action-undelete',
				'ca',
				'undelete',
			);
			if (config.wgCanonicalSpecialPageName === 'Undelete'){
				$(undeleteLink).addClass('selected');
			}
		}
		if (pageInfo.actions.move && config.wgRelevantArticleId){
			const moveLink = addPortletLink(
				'cactions',
				`Special:MovePage/${currentPage.toText()}`,
				'skin-action-move',
				'ca',
				'move',
			);
			if (config.wgCanonicalSpecialPageName === 'Movepage'){
				$(moveLink).addClass('selected');
			}
		}
		if (pageInfo.actions.protect){
			const mode = pageInfo.protection.length ? 'unprotect' : 'protect';
			const protectLink = addPortletLink(
				'cactions',
				{action: mode},
				`skin-action-${mode}`,
				'ca',
				mode,
			);
			if (['protect', 'unprotect'].includes(config.wgAction)){
				$(protectLink).addClass('selected');
			}
		}
		return actions;
	};

	skinConfig.personalTools = parent => {
		const personalTools = buildPortlet('personal');
		$(parent).append(personalTools);
		if (config.wgUserId){
			$('#pt-userpage').remove();
			mw.util.addPortletLink(
				'p-personal',
				mw.util.getUrl(`User:${config.wgUserName}`),
				config.wgUserName,
				'pt-userpage',
				mw.message('tooltip-pt-userpage').text(),
				mw.message('accesskey-pt-userpage').text(),
			);
			const notifications = addPortletLink(
				'personal',
				'#',
				'fd-notifications-notifications',
				'pt',
				'notifications',
			);
			$(notifications).html($('#global-top-navigation .notifications'));
			$('.notifications__toggle').attr(
				'title',
				mw.message('fd-notifications-notifications').text(),
			);
			addPortletLink(
				'personal',
				`User talk:${config.wgUserName}`,
				'mytalk',
				'pt',
			);
			addPortletLink(
				'personal',
				'Special:Preferences',
				'mypreferences',
				'pt',
				'preferences',
			);
			addPortletLink(
				'personal',
				'Special:Watchlist',
				'mywatchlist',
				'pt',
				'watchlist',
			);
			addPortletLink(
				'personal',
				`Special:Contributions/${config.wgUserName}`,
				'mycontris',
				'pt',
			);
			addPortletLink(
				'personal',
				'Special:UserLogout',
				'pt-userlogout',
				'pt',
				'logout',
			);
		} else {
			addPortletLink(
				'personal',
				'Special:CreateAccount',
				'pt-createaccount',
				'pt',
				'createaccount',
			);
			addPortletLink(
				'personal',
				'Special:UserLogin',
				'pt-login',
				'pt',
				'login',
			);
		}
		return personalTools;
	};

	skinConfig.toc = parent => {
		$('#toc').remove();
		const notoc = pageInfo.pageprops;
		let headings = $('#mw-content-text').find('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
		if ($('.mw-parser-output').length){
			headings = $('#mw-content-text').find('.mw-headline[id]');
		}

		if (notoc || !headings.length){
			return;
		}

		const processedHeadings = [{
			target: '#',
			text: '(Top)',
			trail: [0],
		}];
		const toc = buildPortlet('toc');

		headings.each((index, heading) => {
			const headingEntry = {};
			const objPrev = processedHeadings[processedHeadings.length - 1];

			headingEntry.target = '#' + $(heading).attr('id');
			headingEntry.text = $(heading).html().replace(
				/<(?!(?:b|bdi|i|q|s|span|sub|sup|\/)\b).+?>(.+?)<\/.+?>/gi,
				'$1',
			).replace(
				/<(b|bdi|i|q|s|span|sub|sup) .+?>(.+?)<\/\1>/gi,
				'<$1>$2</$1>',
			);
			headingEntry.level = Number($(heading).parent().prop('tagName').substring(1)) || Number($(heading).prop('tagName').substring(1));

			if (processedHeadings.length === 1){
				objPrev.level = headingEntry.level;
			}

			const levelPrev = objPrev.level;
			const trailPrev = objPrev.trail;

			if (levelPrev < headingEntry.level){
				headingEntry.trail = [...trailPrev, 1];
			} else if (levelPrev === headingEntry.level){
				headingEntry.trail = window.structuredClone(trailPrev);
				headingEntry.trail[trailPrev.length - 1]++;
			} else if (trailPrev.length === 1){
				headingEntry.trail = [trailPrev[0] + 1];
			} else {
				headingEntry.trail = window.structuredClone(trailPrev);
				headingEntry.trail.splice(headingEntry.level - 1);
				headingEntry.trail[headingEntry.trail.length - 1]++;
			}

			processedHeadings.push(headingEntry);
		});

		const sublists = [];
		const levels = [];

		processedHeadings.forEach((obj, i) => {
			const listItem = $('<li>');
			const link = $('<a>');
			const tocNumber = $('<span class="toc-numb">').html(obj.trail.join('.'));
			const tocText = $('<span>').html(obj.text);
			link.attr('href', obj.target);
			link.append(tocNumber, tocText);
			listItem.append(link);

			if (processedHeadings[i + 1] && processedHeadings[i + 1].trail.length > obj.trail.length){
				sublists[i] = $('<ul>');
				if (obj.trail.length === 1){
					const button = $('<button>', {
						'class': 'toc-sublist-toggle',
						'aria-expanded': false,
					});
					listItem.append(button);
					sublists[i].toggle();
					button.on('click', () => {
						sublists[i].toggle();
						button.attr(
							'aria-expanded',
							button.attr('aria-expanded') !== 'true',
						);
					});
				}
				listItem.append(sublists[i]);
			}

			if (obj.trail.length === 1){
				$(toc).find('div > ul').append(listItem);
			} else {
				sublists[levels[obj.trail.length - 1]].append(listItem);
			}

			levels[obj.trail.length] = i;
		});

		$(parent).append(toc);
		mw.util.showPortlet('p-toc');
		return toc;
	};

	skinConfig.footer = parent => {
		const iconClasses = [
			'cdx-button',
			'cdx-button--fake-button',
			'cdx-button--size-large',
			'cdx-button--fake-button--enabled',
		];
		const footer = $('<footer>', {id: 'footer'}).append(
			$('<div>', {
				id: 'footer-info',
				html: mw.message('custom-license-description').parse(),
			}),
			$('<ul>', {id: 'footer-places'}).append(
				$('<li>', {id: 'footer-places-terms'}).append($('<a>', {
					href: 'https://www.fandom.com/terms-of-use',
					text: mw.message('global-footer-site-overview-link-terms-of-use').text(),
				})),
				$('<li>', {id: 'footer-places-privacy'}).append($('<a>', {
					href: 'https://www.fandom.com/privacy-policy',
					text: mw.message('global-footer-site-overview-link-privacy-policy').text(),
				})),
				$('<li>', {id: 'footer-places-about'}).append($('<a>', {
					href: 'https://about.fandom.com/about',
					text: mw.message('global-footer-company-overview-link-about').text(),
				})),
			),
			$('<ul>', {id: 'footer-icons'}).append(
				$('<li>', {id: 'footer-hostedbyico'}).append($('<a>', {
					title: 'Hosting provided by Fandom',
					href: 'https://www.fandom.com',
					class: iconClasses.join(' '),
				})),
				$('<li>', {id: 'footer-poweredbyico'}).append($('<a>', {
					title: 'Powered by MediaWiki',
					href: 'https://www.mediawiki.org',
					class: iconClasses.join(' '),
				})),
			),
		);
		$(parent).append(footer);
		return footer;
	};

	skinConfig.appearance = parent => {
		// TODO
	};

	skinConfig.search = parent => {
		// TODO
	};

	function buildPortlet(key, label = key){
		$(`#p-${key}`).remove();
		label = isValid(mw.message(label)) ? mw.message(label).text() : label;
		return mw.util.addPortlet(`p-${key}`, label);
	}

	function addPortletLink(
		portletName,
		target,
		linkText,
		prefix,
		internalName = linkText,
		args = [],
	){
		$(`#${prefix}-${internalName}`).remove();
		let href = mw.message(String(target));
		let text = mw.message(linkText, ...args);
		let tooltip = mw.message(`tooltip-${prefix}-${internalName}`, ...args);
		let accesskey = mw.message(`accesskey-${prefix}-${internalName}`);

		href = isValid(href) ? href.text() : target;

		if (target === '#'){
			href = target;
		} else if (typeof target === 'object'){
			href = mw.util.getUrl(currentPage.toText(), target);
		} else {
			href = mw.util.getUrl(href);
		}

		text = isValid(text) ? text.text() : linkText;
		tooltip = isValid(tooltip) ? tooltip.text() : undefined;
		accesskey = isValid(accesskey) ? accesskey.text() : undefined;

		return mw.util.addPortletLink(
			`p-${portletName}`,
			href,
			text,
			`${prefix}-${internalName}`,
			tooltip,
			accesskey,
		);
	}

	function isValid(message){
		return Boolean(message.exists() && message.text() && message.text() !== '-');
	}

	function formatMessageKey(key){
		return key.toLowerCase().replaceAll(' ', '_');
	}

	mw.hook('gadget.skin-setup').fire(skinConfig);
})();

// {{JavaScript category}}