'use strict';
$(() => {
	// Appearance config
	/*
	const storageKey = 'mw-gadget-vector-2022-appearance-settings';
	const storedData = mw.storage.getObject(storageKey) || {
		'custom-font-size': 'standard',
		'main-menu': 'hidden',
		'toc': 'pinned',
		'tools': 'pinned',
		'appearance': 'pinned',
	};
	*/
	
	// Setup
	$('.mediawiki').prepend($('<div id="page-grid">'));
	$('#page-grid')
		.append($('<div id="personal-tools" class="global-top-navigation">'))
		.append($('.page-header__title-wrapper'))
		.append($('<div id="left-rail-wrapper">'))
		.append($('<div id="page-actions">'))
		.append($('<div id="right-rail-wrapper">'))
		.append($('.main-container'))
		.append($('<footer id="footer">'));
	
	$('#page-header').before($('.page-header__subtitle'));
	
	// Lang list
	if ($('#collapsible-content-languages').length){
		$('#collapsible-content-languages a').wrap($('<li>'));
		const langLinks = $('#collapsible-content-languages li');
		$('#firstHeading').after($('<div>', {
			'id': 'p-lang-btn',
			'class': 'wds-dropdown',
		}).append($('<span>', {
			'class': 'wds-dropdown__toggle toggle-with-icon',
			'text': `${langLinks.length} languages`,
		})).append($('<div class="wds-dropdown__content">').append($('<ul>', {
			'class': 'wds-list wds-is-linked',
			'html': langLinks,
		}))));
	}
	
	// Left rail
	$('#left-rail-wrapper').append($('<div id="pc-main-menu" class="portlet-container">'));
	$('#pc-main-menu')
		.append($('<h2 class="pinnable-header">Main menu</h2>'))
		.append($(portlet('navigation', 'Navigation')))
		.append($(portlet('interaction', 'Contribute')))
		.append($(portlet('global', 'Fandom')));
	
	$('#p-navigation-body').html($('<ul>'));
	$('#p-navigation-body ul')
		.append($(`<li><a href="${mw.util.getUrl('Portal:Main')}">Main page</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Forums')}">Forums</a></li>`))
		.append($('<li><a href="/f">Discussions</a></li>'))
		.append($(`<li><a href="${mw.util.getUrl('Special:Random')}">Random article</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact us</a></li>`));
	
	$('#p-interaction-body').html($('<ul>'));
	$('#p-interaction-body ul')
		.append($(`<li><a href="${mw.util.getUrl('MA Help:Contents')}">Help</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('MA Help:Editing')}">Learn to edit</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Special:Community')}">Community portal</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:FAQ')}">FAQ</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Policies and guidelines')}">Policies</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Special:RecentChanges')}">Recent changes</a></li>`));
	
	$('#p-global-body').html($('<ul>'));
	$('#p-global-body ul')
		.append($('<li><a href="https://www.fandom.com">Fandom home</a></li>'))
		.append($('<li><a href="https://www.fandom.com/fancentral/home">FanCentral</a></li>'))
		.append($('<li><a href="https://www.fandom.com/explore">Explore other wikis</a></li>'))
		.append($('<li><a href="https://community.fandom.com/wiki/">Community Central</a></li>'))
		.append($('<li><a href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki">Start a wiki</a></li>'));
	
	const preSelector = new RegExp('<([Pp][Rr][Ee])[^>]*>.*?</\\1 *>', 'g');
	const shSelector = new RegExp('<([Ss][Yy][Nn][Tt][Aa][Xx][Hh][Ii][Gg][Hh][Ll][Ii][Gg][Hh][Tt])[^>]*>.*?</\\1 *>', 'g');
	const nwSelector = new RegExp('<([Nn][Oo][Ww][Ii][Kk][Ii])[^>]*>.*?</\\1 *>', 'g');
	const cmtSelector = new RegExp('<!--.*?-->', 'g');
	const tocChecker = new RegExp('__[Nn][Oo][Tt][Oo][Cc]__');
	
	$.get(mw.util.getUrl(mw.config.get('wgPageName'), {
		action: 'raw',
		templates: 'expand',
	})).done(wikitext => {
		const headings = $('#mw-content-text .mw-headline');
		const notoc = wikitext
			.replace(preSelector, '')
			.replace(shSelector, '')
			.replace(nwSelector, '')
			.replace(cmtSelector, '')
			.search(tocChecker) !== -1;
		
		if (notoc || !headings.length){
			return;
		}
		
		const tocList = $('<ul>');
		const processedHeadings = [{
			target: '#',
			label: '(Top)',
			trail: [0],
		}];
		
		$('#left-rail-wrapper').append($('<div id="pc-toc" class="portlet-container rail-module-sticky">'));
		$('#pc-toc').append($('<h2 class="pinnable-header">Contents</h2>')).append($('<div class="pBody">'));
		$('#pc-toc .pBody').append(tocList);
		
		headings.each((index, heading) => {
			const headingEntry = {};
			const linkSelector = new RegExp('<a(?: rel=".+?")?(?: class=".+?")?(?: href=".+?")?(?: class=".+?")?(?: title=".+?")?>(.+?)</a>', 'g');
			const objPrev = processedHeadings[processedHeadings.length - 1];
			
			headingEntry.target = '#' + $(heading).attr('id');
			headingEntry.label = $(heading).html().replace(linkSelector, '$1');
			headingEntry.level = Number($(heading).parent().prop('tagName').substring(1));
			
			if (processedHeadings.length === 1){
				objPrev.level = headingEntry.level;
			}
			
			const levelPrev = objPrev.level;
			const trailPrev = objPrev.trail;
			
			if (levelPrev < headingEntry.level){
				headingEntry.trail = trailPrev.concat([1]);
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
				tocList.append(listItem);
			} else {
				sublists[levels[obj.trail.length - 1]].append(listItem);
			}
			
			levels[obj.trail.length] = i;
		});
	});
	
	// Right rail
	$('#right-rail-wrapper').append($('<div class="rail-module-sticky">'));
	$('#right-rail-wrapper > div').append($('<div id="pc-tools" class="portlet-container">'));
	$('#right-rail-wrapper > div').append($('<div id="pc-appearance" class="portlet-container">'));
	
	$('#pc-tools')
		.append($('<h2 class="pinnable-header">Tools</h2>'))
		.append($(portlet('cactions', 'Actions')))
		.append($(portlet('my-tb', 'My tools')));
	
	$('#p-cactions-body').html($('<ul>'));
	$('#p-cactions-body ul')
		.append($('<li id="ca-delete-li">'))
		.append($('<li id="ca-undelete-li">'))
		.append($('<li id="ca-move-li">'))
		.append($('<li id="ca-protect-li">'))
		.append($('<li id="ca-unprotect-li">'));
	
	$('#ca-delete-li').append(trimmer('#ca-delete').attr('title', 'Delete this page'));
	$('#ca-undelete-li').append(trimmer('#ca-undelete').attr('title', 'Undelete this page'));
	$('#ca-move-li').append(trimmer('#ca-move').attr('title', 'Rename this page'));
	$('#ca-protect-li').append(trimmer('#ca-protect').attr('title', 'Protect this page from editing'));
	$('#ca-unprotect-li').append(trimmer('#ca-unprotect').attr('title', 'Change the protection level on this page'));
	
	$('#p-cactions-body li:empty').remove();
	
	pageTools();
	
	const myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
	$('#p-my-tb-body').html(myTools);
	$('#p-my-tb-body ul')
		.removeAttr('class')
		.append($('li:has([data-tracking="admindashboard/toolbar/admin"])'))
		.append($('li:has([data-tracking="admindashboard/toolbar/reported"])'))
		.append($('li:has([data-tracking="quickanswers/toolbar"])'))
		.append($('li:has(.global-shortcuts-help-entry-point)'));
	$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');
	
	if ($('.content-review__widget').length){
		$('#pc-tools').append($(portlet('js-review', 'Review status')));
		$('#p-js-review-body').append($('.content-review__widget__title').nextAll());
	}
	
	$('#pc-appearance')
		.append($('<h2 class="pinnable-header">Appearance</h2>'))
		.append($(portlet('custom-font-size', 'Text')))
		.append($(portlet('limited-width', 'Width')))
		.append($(portlet('skin-theme', 'Color')));
	
	$('#p-custom-font-size-body').append($('<form>'));
	$('#p-custom-font-size-body form')
		.append(option('custom-font-size', 'small', 'Small'))
		.append(option('custom-font-size', 'standard', 'Standard', true))
		.append(option('custom-font-size', 'large', 'Large'));
	
	$('#p-limited-width-body').append($('<form>'));
	$('#p-limited-width-body form')
		.append(option('limited-width', 'standard', 'Standard', true))
		.append(option('limited-width', 'wide', 'Wide'));
	
	$('#p-skin-theme-body').append($('<form>'));
	$('#p-skin-theme-body form')
		.append(option('skin-theme', 'automatic', 'Automatic', true))
		.append(option('skin-theme', 'light', 'Light'))
		.append(option('skin-theme', 'dark', 'Dark'));
	
	// Personal tools
	const logoutURL = `https://auth.fandom.com/logout?source=mw&redirect=${window.location.href}`;
	
	$('#personal-tools').append($('<div>')).append($('<ul>'));
	$('#personal-tools > div')
		.append($('<a id="p-logo" href="/wiki/">'))
		.append($('<div id="search-box">'));
	
	$('#p-logo')
		.append($('<div id="logo-wordmark">Memory Alpha</div>'))
		.append($('<div id="logo-tagline">The Free Star Trek Reference</div>'));
	
	$('#search-box').append($(`<form action="${mw.util.getUrl('Special:Search')}">`));
	$('#search-box form')
		.append($('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'))
		.append($('<input type="submit" id="searchButton" name="go" value="Search" title="Go to a page with this exact name if it exists">'));
	
	$('#personal-tools > ul')
		.append($(ptItem('userpage', `User:${mw.config.get('wgUserName')}`, 'Your user page', mw.config.get('wgUserName'))))
		.append($(ptItem('notifications')).append($('#global-top-navigation .notifications')))
		.append($(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'Watchlist')))
		.append($(ptItem('userlinksdropdown')));
	
	$('#pt-userlinksdropdown').addClass('wds-dropdown');
	$('#pt-userlinksdropdown').append($('<span class="wds-dropdown__toggle toggle-with-icon" title="Personal settings">Personal tools</span>'));
	$('#pt-userlinksdropdown').append($('<div class="wds-dropdown__content">').append($('<ul class="wds-list wds-is-linked">')));
	$('#pt-userlinksdropdown .wds-list')
		.append($(ptItem('mytalk', `User talk:${mw.config.get('wgUserName')}`, 'Your talk page', 'Talk')))
		.append($(ptItem('sandbox', `User:${mw.config.get('wgUserName')}/sandbox`, 'Your sandbox', 'Sandbox')))
		.append($(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'Preferences')))
		.append($(ptItem('contribs', `Special:Contributions/${mw.config.get('wgUserName')}`, 'A list of your contributions', 'Contributions')))
		.append($(ptItem('imagegallery', 'Special:MyUploads', 'A list of your uploaded media', 'Uploaded media')))
		.append($(ptItem('logout')).append($(`<a href="${logoutURL}" title="Log out">Log out</a>`)));
	
	$('.notifications__toggle').attr('title', 'Your notifications');
	
	// Page actions
	const subjectNamespaceName = {
		'-1': 'Special page',
		'0': 'Article',
		'2': 'User page',
		'4': 'Project page',
		'6': 'File',
		'8': 'Interface page',
		'10': 'Template',
		'14': 'Category',
		'102': 'Portal',
		'110': 'Forum',
		'112': 'Help page',
		'828': 'Module',
		'2900': 'Map',
	};
	
	const pageName = mw.config.get('wgPageName').replace(/^Special:MovePage\//, '').replace(/_/g, ' ');
	const subjectPageName = new mw.Title(pageName).getSubjectPage();
	const talkPageName = new mw.Title(pageName).getTalkPage() ? new mw.Title(pageName).getTalkPage() : subjectPageName;
	
	const subjectNamespace = subjectPageName.getNamespaceId();
	const tabLabel = (subjectPageName.getPrefixedText() === 'Portal:Main') ? 'Main Page' : subjectNamespaceName[subjectNamespace];
	
	$('#page-actions').append($('<ul id="left-navigation">'));
	$('#left-navigation')
		.append($(`<li id="ca-nstab-main-li"><a id="ca-nstab-main" href="${mw.util.getUrl(subjectPageName.getPrefixedText())}" title="View the content page">${tabLabel}</a></li>`))
		.append($(`<li id="ca-talk-li"><a id="ca-talk" href="${mw.util.getUrl(talkPageName.getPrefixedText())}" title="Discuss improvements to the content page">Talk</a></li>`));
	
	$('#page-actions').append($('<ul id="right-navigation">'));
	$('#right-navigation')
		.append($('<li id="ca-view-li">'))
		.append($('<li id="ca-edit-li">'))
		.append($('<li id="ca-history-li">'))
		.append($('<li id="ca-watch-li">'))
		.append($('<li id="ca-unwatch-li">'));
	
	$('#ca-view-li').append($(`<a href="${mw.util.getUrl(pageName)}">Read</a>`));
	$('#ca-edit-li').append(trimmer('#ca-edit').removeAttr('class').attr('title', 'Edit this page'));
	$('#ca-history-li').append($('#ca-history').html('View history').attr('title', 'Past revisions of this page'));
	$('#ca-watch-li').append(trimmer('#ca-watch').attr('title', 'Add this page to your watchlist'));
	$('#ca-unwatch-li').append(trimmer('#ca-unwatch').attr('title', 'Remove this page from your watchlist'));
	
	$('#page-actions li:empty').remove();
	
	if (pageName === subjectPageName.getPrefixedText()){
		$('#ca-nstab-main-li').addClass('selected');
	} else {
		$('#ca-talk-li').addClass('selected');
	}
	
	if (mw.config.get('wgAction') === 'view'){
		$('#ca-view-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit'){
		$('#ca-edit-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'history'){
		$('#ca-history-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'watch' || mw.config.get('wgAction') === 'unwatch'){
		$('#ca-watch-li, #ca-unwatch-li').addClass('selected');
	}
	
	if (subjectNamespace === -1){
		$('#page-actions li:not(#ca-nstab-main-li)').remove();
	}
	
	updateWatchButtons();
	
	// Footer
	$('#footer')
		.append($('<div id="footer-copyright">').html($('.license-description').html()))
		.append($('<ul id="footer-places">'))
		.append($('<ul id="footer-icons">'));
	
	$('#footer-places')
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Copyrights')}">Copyright</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Special:Statistics')}">Statistics</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact Memory Alpha</a></li>`))
		.append($('<li><a href="https://www.fandom.com/privacy-policy">Privacy Policy</a></li>'))
		.append($('<li><a href="https://www.fandom.com/terms-of-use">Terms of Use</a></li>'))
		.append($('<li><a href="https://www.fandom.com/terms-of-sale">Terms of Sale</a></li>'))
		.append($('<li><a href="https://www.fandom.com/community-creation-policy">Community Creation Policy</a></li>'))
		.append($('<li><a href="https://about.fandom.com/about">About Fandom</a></li>'));
	
	$('#footer-icons')
		.append(footerIcon('hostedbyico', 'Hosting provided by Fandom', 'https://www.fandom.com'))
		.append(footerIcon('poweredbyico', 'Powered by MediaWiki', 'https://www.mediawiki.org'));
	
	// Update appearance config
	/*
	$('#p-custom-font-size input').on('change', event => {
		storedData[event.currentTarget.name] = event.currentTarget.value;
		mw.storage.setObject(storageKey, storedData);
	});
	*/
});

function option(name, value, label, checked = false){
	return $('<div>')
		.append($('<input>', {
			'type': 'radio',
			'id': `${name}--${value}`,
			'name': name,
			'value': value,
			'checked': checked,
		}))
		.append($(`<label for="${name}--${value}">${label}</label>`));
}

function portlet(name, label){
	return `<nav class="portlet" id="p-${name}" aria-labelledby="p-${name}-label"><h3 class="pHeading" id="p-${name}-label">${label}</h3><div class="pBody" id="p-${name}-body"></div></nav>`;
}

function footerIcon(id, title, url){
	return $('<li>').append($('<a>', {
		'class': 'footer-icon',
		'id': `footer-${id}`,
		'title': title,
		'href': url,
	}));
}

function pageTools(){
	if ($('.page-tools-module').length === 1){
		$('#p-my-tb').before($(portlet('tb', 'Page tools')));
		$('#p-tb-body').html($('.page-tools-module ul').removeAttr('class'));
		$('.page-tools-module').remove();
	} else if ($('.right-rail-wrapper').length === 1 && !$('#p-js-review').length){
		setTimeout(pageTools, 1000);
	}
}

function ptItem(id, url, title, text){
	if (url){
		return `<li class="ptItem" id="pt-${id}"><a href="${mw.util.getUrl(url)}" title="${title}">${text}</a></li>`;
	}
	
	return `<li class="ptItem" id="pt-${id}">`;
}

function trimmer(selector){
	return $(selector).html($(selector).text().trim());
}

function updateWatchButtons(){
	$('#ca-watch').on('click', () => {
		$('#ca-watch-li').attr('id', 'ca-unwatch-li');
		$('#ca-watch').attr('id', 'ca-unwatch');
		updateWatchButtons();
	});
	
	$('#ca-unwatch').on('click', () => {
		$('#ca-unwatch-li').attr('id', 'ca-watch-li');
		$('#ca-unwatch').attr('id', 'ca-watch');
		updateWatchButtons();
	});
}