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

		for (const key of Object.keys(mainMenu)){
			$(parent).append(await buildPortlet(key));
			for (const link of mainMenu[key]){
				await addPortletLink(key, link[0], link[1], 'n');
			}
		}
	};

	skinConfig.toolbox = async (parent, label) => {
		$(parent).append(await buildPortlet('tb', label));
		if (currentPage.getNamespaceId() > -1){
			await addPortletLink(
				'tb',
				`Special:WhatLinksHere/${currentPage.toText()}`,
				'whatlinkshere',
				't',
			);
			await addPortletLink(
				'tb',
				`Special:RecentChangesLinked/${currentPage.toText()}`,
				'recentchangeslinked-toolbox',
				't',
				'recentchangeslinked',
			);
		}
		await addPortletLink(
			'tb',
			'#',
			'printableversion',
			't',
			'print',
		);
		if (currentPage.getNamespaceId() > -1){
			await addPortletLink(
				'tb',
				`Special:PermanentLink/${config.wgRevisionId}`,
				'permalink',
				't',
			);
			await addPortletLink(
				'tb',
				`Special:PageInfo/${currentPage.toText()}`,
				'pageinfo-toolboxlink',
				't',
				'info',
			);
		}
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

	skinConfig.langs = async parent => {
		const langlinks = (await api.post({
			titles: currentPage.toText(),
			prop: 'langlinks',
			llprop: ['url', 'langname', 'autonym'],
			lllimit: 'max',
		})).query.pages[0].langlinks;

		if (!langlinks){
			return;
		}

		await api.loadMessagesIfMissing('interlanguage-link-title');
		$(parent).append(await buildPortlet('lang', 'otherlanguages'));

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
	};

	skinConfig.associatedPages = async parent => {
		const subjectPage = currentPage.getSubjectPage();
		const talkPage = currentPage.getTalkPage();
		$(parent).append(await buildPortlet('associated-pages'));

		if (!talkPage){
			return;
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

		const subjectTabKey = `nstab-${formatMessageKey(subjectNamespace)}`;
		const talkTabKey = `nstab-${formatMessageKey(talkNamespace)}`;
		const tooltip = `tooltip-ca-nstab-${formatMessageKey(subjectNamespace)}`;
		const accesskey = `accesskey-ca-nstab-${formatMessageKey(subjectNamespace)}`;

		await api.loadMessagesIfMissing([
			'mainpage',
			'nstab-mainpage',
			'talk',
			'tooltip-ca-nstab',
			'tooltip-ca-talk',
			'accesskey-ca-nstab',
			'accesskey-ca-talk',
			subjectTabKey,
			talkTabKey,
			tooltip,
			accesskey,
		]);

		let subjectTab = subjectNamespace;
		let talkTab = mw.message('talk').text();
		let tooltipSubject = mw.message('tooltip-ca-nstab').text();
		let accesskeySubject = mw.message('accesskey-ca-nstab').text();
		const tooltipTalk = mw.message('tooltip-ca-talk').text();
		const accesskeyTalk = mw.message('accesskey-ca-talk').text();
		const mainPage = new mw.Title(mw.message('mainpage').text());
		const mainPageTab = mw.message('nstab-mainpage');

		if (isValid(mainPageTab) && subjectPage.toText() === mainPage.toText()){
			subjectTab = mainPageTab.text();
		} else if (isValid(mw.message(subjectTabKey))){
			subjectTab = mw.message(subjectTabKey).text();
		}

		if (isValid(mw.message(talkTabKey))){
			talkTab = mw.message(talkTabKey).text();
		}

		if (isValid(mw.message(tooltip))){
			tooltipSubject = mw.message(tooltip).text();
		}

		if (isValid(mw.message(accesskey))){
			accesskeySubject = mw.message(accesskey).text();
		}

		mw.util.addPortletLink(
			'p-associated-pages',
			mw.util.getUrl(subjectPage.toText()),
			subjectTab,
			`ca-${subjectTabKey}`,
			tooltipSubject,
			accesskeySubject,
		);

		mw.util.addPortletLink(
			'p-associated-pages',
			mw.util.getUrl(talkPage.toText()),
			talkTab,
			'ca-talk',
			tooltipTalk,
			accesskeyTalk,
		);
	};

	skinConfig.views = async parent => {
		$(parent).append(await buildPortlet('views'));
		if (currentPage.getNamespaceId() === -1){
			return;
		}
		await addPortletLink(
			'views',
			currentPage.toText(),
			'skin-view-view',
			'ca',
			'view',
		);
		await addPortletLink(
			'views',
			`Special:EditPage/${currentPage.toText()}`,
			'skin-view-edit',
			'ca',
			'edit',
		);
		await addPortletLink(
			'views',
			`Special:PageHistory/${currentPage.toText()}`,
			'skin-view-history',
			'ca',
			'history',
		);
		await addPortletLink(
			'views',
			'#',
			'watch',
			'ca',
		);
		$('#ca-watch > a').on('click', event => {
			event.preventDefault();
		});
	};

	skinConfig.actions = async parent => {
		$(parent).append(await buildPortlet('cactions'));
		if (currentPage.getNamespaceId() === -1){
			return;
		}
		await addPortletLink(
			'cactions',
			`Special:DeletePage/${currentPage.toText()}`,
			'skin-action-delete',
			'ca',
			'delete',
		);
		await addPortletLink(
			'cactions',
			`Special:MovePage/${currentPage.toText()}`,
			'skin-action-move',
			'ca',
			'move',
		);
		await addPortletLink(
			'cactions',
			`Special:ProtectPage/${currentPage.toText()}`,
			'skin-action-protect',
			'ca',
			'protect',
		);
	};

	async function buildPortlet(key, label = key){
		await api.loadMessagesIfMissing(label);
		label = isValid(mw.message(label)) ? mw.message(label).text() : label;
		return mw.util.addPortlet(`p-${key}`, label);
	}

	async function addPortletLink(
		portletName,
		target,
		linkText,
		prefix,
		internalName = linkText,
	){
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
		tooltip = isValid(tooltip) ? tooltip.text() : undefined;
		accesskey = isValid(accesskey) ? accesskey.text() : undefined;

		mw.util.addPortletLink(
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