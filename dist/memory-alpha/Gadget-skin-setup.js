'use strict';
(() => {
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

	skinConfig.mainMenu = async parent => {
		await api.loadMessagesIfMissing('sidebar');
		const mainMenu = {};
		const mainMenuPortlets = [];
		let activePortlet;

		for (const item of mw.message('sidebar').text().split(/\s*\n/)){
			if (/^\*\*/.test(item)){
				const linkMessages = item.replace(/^\*\*+\s*/, '').split('|');
				mainMenu[activePortlet].push(linkMessages);
				await api.loadMessagesIfMissing([
					linkMessages[0],
					linkMessages[1],
					`tooltip-n-${linkMessages[1]}`,
					`accesskey-n-${linkMessages[1]}`,
				]);
			} else {
				activePortlet = item.replace(/^\*\s*/, '');
				mainMenu[activePortlet] = [];
				await api.loadMessagesIfMissing(activePortlet);
			}
		}

		for (const key of Object.keys(mainMenu)){
			const portlet = buildPortlet(key);
			mainMenuPortlets.push(portlet);
			$(parent).append(portlet);
			for (const link of mainMenu[key]){
				addPortletLink(key, link[0], link[1], 'n');
			}
		}

		return mainMenuPortlets;
	};

	skinConfig.toolbox = async (parent, label) => {
		await api.loadMessagesIfMissing([
			label,
			'whatlinkshere',
			'tooltip-t-whatlinkshere',
			'accesskey-t-whatlinkshere',
			'recentchangeslinked-toolbox',
			'tooltip-t-recentchangeslinked',
			'accesskey-t-recentchangeslinked',
			'printableversion',
			'tooltip-t-print',
			'accesskey-t-print',
			'permalink',
			'tooltip-t-permalink',
			'accesskey-t-permalink',
			'pageinfo-toolboxlink',
			'tooltip-t-info',
			'accesskey-t-info',
		]);
		const toolboxPortlets = [];
		const mainPortlet = buildPortlet('tb', label);
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

	skinConfig.langs = async parent => {
		await api.loadMessagesIfMissing([
			'interlanguage-link-title',
			'otherlanguages',
		]);
		const langlinks = (await api.get({
			titles: currentPage.toText(),
			prop: 'langlinks',
			llprop: ['url', 'langname', 'autonym'],
			lllimit: 'max',
		})).query.pages[0].langlinks;
		const langs = buildPortlet('lang', 'otherlanguages');
		$(parent).append(langs);

		if (!langlinks){
			return langs;
		}

		for (const langlink of langlinks){
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

		const subjectMsg = `nstab-${formatMessageKey(subjectNamespace)}`;
		const talkMsg = `nstab-${formatMessageKey(talkNamespace)}`;
		const tooltipMsg = `tooltip-ca-nstab-${formatMessageKey(subjectNamespace)}`;
		const accesskeyMsg = `accesskey-ca-nstab-${formatMessageKey(subjectNamespace)}`;

		await api.loadMessagesIfMissing([
			'associated-pages',
			'mainpage',
			'nstab-mainpage',
			'talk',
			'tooltip-ca-nstab',
			'tooltip-ca-talk',
			'accesskey-ca-nstab',
			'accesskey-ca-talk',
			subjectMsg,
			talkMsg,
			tooltipMsg,
			accesskeyMsg,
		]);

		const associatedPages = buildPortlet('associated-pages');
		$(parent).append(associatedPages);

		if (!talkPage){
			return associatedPages;
		}

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

	skinConfig.views = async parent => {
		const editLinkInternalName = config.wgRelevantPageIsProbablyEditable ? 'edit' : 'viewsource';
		let editMsg = 'skin-view-create';
		if (!config.wgRelevantPageIsProbablyEditable){
			editMsg = 'skin-action-viewsource';
		} else if (config.wgRelevantArticleId){
			editMsg = 'skin-view-edit';
		}
		await api.loadMessagesIfMissing([
			'views',
			'skin-view-view',
			'tooltip-ca-view',
			'accesskey-ca-view',
			editMsg,
			`tooltip-ca-${editLinkInternalName}`,
			`accesskey-ca-${editLinkInternalName}`,
			'skin-view-history',
			'tooltip-ca-history',
			'accesskey-ca-history',
			'watch',
			'tooltip-ca-watch',
			'accesskey-ca-watch',
			'unwatch',
			'tooltip-ca-unwatch',
			'accesskey-ca-unwatch',
		]);
		const views = buildPortlet('views');
		$(parent).append(views);
		if (currentPage.getNamespaceId() === -1){
			return views;
		}
		const viewLink = addPortletLink(
			'views',
			currentPage.toText(),
			'skin-view-view',
			'ca',
			'view',
		);
		const editLink = addPortletLink(
			'views',
			{action: 'edit'},
			editMsg,
			'ca',
			editLinkInternalName,
		);
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
			const watchAction = (await api.get({
				titles: currentPage.toText(),
				prop: 'info',
				inprop: 'watched',
			})).query.pages[0].watched ? 'unwatch' : 'watch';
			const watchLink = addPortletLink(
				'views',
				{action: watchAction},
				watchAction,
				'ca',
			);
			const require = await mw.loader.using('mediawiki.page.watch.ajax');
			const watch = require('mediawiki.page.watch.ajax');
			watch.watchstar($(watchLink).find('a'), currentPage.toText());
			if (['watch', 'unwatch'].includes(config.wgAction)){
				$(watchLink).addClass('selected');
			}
		}
		if (config.wgAction === 'view' && config.wgPageName === config.wgRelevantPageName){
			$(viewLink).addClass('selected');
		} else if (['edit', 'submit'].includes(config.wgAction)){
			$(editLink).addClass('selected');
		}
		return views;
	};

	skinConfig.actions = async parent => {
		await api.loadMessagesIfMissing([
			'cactions',
			'skin-action-delete',
			'tooltip-ca-delete',
			'accesskey-ca-delete',
			'skin-action-undelete',
			'tooltip-ca-undelete',
			'accesskey-ca-undelete',
			'skin-action-move',
			'tooltip-ca-move',
			'accesskey-ca-move',
			'skin-action-protect',
			'tooltip-ca-protect',
			'accesskey-ca-protect',
			'skin-action-unprotect',
			'tooltip-ca-unprotect',
			'accesskey-ca-unprotect',
		]);
		const page = (await api.get({
			titles: currentPage.toText(),
			prop: ['info', 'deletedrevisions'],
			inprop: 'protection',
			intestactions: ['delete', 'undelete', 'move', 'protect'],
			drvlimit: 1,
			drvprop: '',
		})).query.pages[0];
		const actions = buildPortlet('cactions');
		$(parent).append(actions);
		if (currentPage.getNamespaceId() === -1){
			return actions;
		}
		if (page.actions.delete && config.wgRelevantArticleId){
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
		if (page.actions.undelete && page.deletedrevisions && !config.wgRelevantArticleId){
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
		if (page.actions.move && config.wgRelevantArticleId){
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
		if (page.actions.protect){
			const mode = page.protection.length ? 'unprotect' : 'protect';
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

	skinConfig.personalTools = async parent => {
		await api.loadMessagesIfMissing([
			'personal',
			'tooltip-pt-userpage',
			'accesskey-pt-userpage',
			'fd-notifications-notifications',
			'mytalk',
			'tooltip-pt-mytalk',
			'accesskey-pt-mytalk',
			'mypreferences',
			'tooltip-pt-preferences',
			'accesskey-pt-preferences',
			'mywatchlist',
			'tooltip-pt-watchlist',
			'accesskey-pt-watchlist',
			'mycontris',
			'tooltip-pt-mycontris',
			'accesskey-pt-mycontris',
			'pt-userlogout',
			'tooltip-pt-logout',
			'accesskey-pt-logout',
			'pt-createaccount',
			'tooltip-pt-createaccount',
			'accesskey-pt-createaccount',
			'pt-login',
			'tooltip-pt-login',
			'accesskey-pt-login',
		]);
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

	// TODO: Make sure this works properly
	skinConfig.toc = async parent => {
		const notoc = (await api.get({
			titles: currentPage.toText(),
			prop: 'pageprops',
			ppprop: 'notoc',
		})).query.pages[0].pageprops;
		const headings = $('#mw-content-text').find('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id], .mw-headline[id]');

		if (notoc || !headings.length){
			return;
		}

		await api.loadMessagesIfMissing('toc');
		const processedHeadings = [{
			target: '#',
			label: '(Top)',
			trail: [0],
		}];
		const toc = buildPortlet('toc');

		headings.each((index, heading) => {
			const headingEntry = {};
			const linkSelector = /<a(?: rel=".+?")?(?: class=".+?")?(?: href=".+?")?(?: class=".+?")?(?: title=".+?")?>(.+?)<\/a>/g;
			const objPrev = processedHeadings[processedHeadings.length - 1];

			headingEntry.target = '#' + $(heading).attr('id');
			headingEntry.label = $(heading).html().replace(linkSelector, '$1');
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
			const tocText = $('<span>').html(obj.label);
			link.attr('href', obj.target);
			link.append(tocNumber).append(tocText);
			listItem.append(link);

			if (processedHeadings[i + 1] && processedHeadings[i + 1].trail.length > obj.trail.length){
				const button = $('<button>', {
					'class': 'toc-sublist-toggle',
					'aria-expanded': 'false',
				});

				sublists[i] = $('<ul>').toggle();
				listItem.append(button).append(sublists[i]);
				button.on('click', () => {
					const state = button.attr('aria-expanded');
					sublists[i].toggle();
					button.attr('aria-expanded', state === 'false' ? 'true' : 'false');
				});
			}

			if (obj.trail.length === 1){
				$(toc).find('ul').append(listItem);
			} else {
				sublists[levels[obj.trail.length - 1]].append(listItem);
			}

			levels[obj.trail.length] = i;
		});

		$(parent).append(toc);
		return toc;
	};

	skinConfig.appearance = async parent => {
		// TODO
	};

	skinConfig.search = async parent => {
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
	){
		$(`#${prefix}-${internalName}`).remove();
		let href = mw.message(String(target));
		let label = mw.message(linkText);
		let tooltip = mw.message(`tooltip-${prefix}-${internalName}`);
		let accesskey = mw.message(`accesskey-${prefix}-${internalName}`);

		href = isValid(href) ? href.text() : target;

		if (target === '#'){
			href = target;
		} else if (typeof target === 'object'){
			href = mw.util.getUrl(currentPage.toText(), target);
		} else {
			href = mw.util.getUrl(href);
		}

		label = isValid(label) ? label.text() : linkText;
		tooltip = isValid(tooltip) ? tooltip.text() : undefined;
		accesskey = isValid(accesskey) ? accesskey.text() : undefined;

		return mw.util.addPortletLink(
			`p-${portletName}`,
			href,
			label,
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