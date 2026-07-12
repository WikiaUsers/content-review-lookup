'use strict';
// Local settings
window.Vector2022 = {};
window.Vector2022.storageKey = 'custom.vector-2022.settings';
window.Vector2022.storedData = mw.storage.getObject(window.Vector2022.storageKey) || {
	'custom-font-size': 'standard',
	'limited-width': 'standard',
	'skin-theme': 'automatic',

	'main-menu': 'pinned',
	'toc': 'pinned',
	'tools': 'pinned',
	'appearance': 'pinned',
};

mw.hook('gadget.skin-setup').add(async skinConfig => {
	// Setup
	$(document.body).prepend($('<div id="page-grid">'));
	$('#page-grid').append(
		$('<div id="personal-tools" class="global-top-navigation">'),
		$('.page-header__title-wrapper'),
		$('<div id="left-rail-wrapper">'),
		$('<div id="page-actions">'),
		$('<div id="right-rail-wrapper">'),
		$('.main-container'),
		$('<footer id="footer">'),
	);

	$('#page-header').before($('<div id="contentSub">'));
	$('#contentSub').append(
		$('.page-header__page-subtitle'),
		$('.page-header__subtitle'),
	);

	// Lang list
	if ($('#collapsible-content-languages').length){
		$('#collapsible-content-languages a').wrap($('<li>'));
		const langLinks = $('#collapsible-content-languages li');
		$('#firstHeading').after($('<div>', {
			id: 'p-lang-btn',
			class: 'wds-dropdown',
		}).append($('<span>', {
			class: 'wds-dropdown__toggle toggle-with-icon',
			text: `${langLinks.length} languages`,
		}), $('<div class="wds-dropdown__content">').append($('<ul>', {
			class: 'wds-list wds-is-linked',
			html: langLinks,
		}))));
	}

	// Personal tools
	$('#personal-tools').append(
		$('<div>').append(
			$('<a>', {
				id: 'p-logo',
				href: '/wiki/',
			}).append(
				$('<div>', {
					id: 'logo-wordmark',
					text: 'Memory Alpha',
				}),
				$('<div>', {
					id: 'logo-tagline',
					text: 'The Free Star Trek Reference',
				}),
			),
			$('<div>', {
				id: 'search-box',
			}).append($('<form>', {
				action: mw.util.getUrl('Special:Search'),
			}).append(
				$('<input>', {
					type: 'search',
					id: 'searchInput',
					name: 'query',
					required: true,
					placeholder: 'Search Memory Alpha',
				}),
				$('<input>', {
					type: 'submit',
					id: 'searchButton',
					name: 'go',
					value: 'Search',
					title: 'Go to a page with this exact name if it exists',
				}),
			)),
		),
		$('<ul>').append(
			$(ptItem(
				'userpage',
				`User:${mw.config.get('wgUserName')}`,
				'Your user page',
				mw.config.get('wgUserName'),
			)),
			$(ptItem('notifications')).append($('#global-top-navigation .notifications')),
			$(ptItem(
				'watchlist',
				'Special:Watchlist',
				'The list of pages you are monitoring for changes',
				'Watchlist',
			)),
			$(ptItem('userlinksdropdown')),
		),
	);

	$('#pt-userlinksdropdown').addClass('wds-dropdown');
	$('#pt-userlinksdropdown').append($('<span>', {
		class: 'wds-dropdown__toggle toggle-with-icon',
		title: 'Personal settings',
		text: 'Personal tools',
	}));
	$('#pt-userlinksdropdown').append($('<div>', {
		class: 'wds-dropdown__content',
	}).append($('<ul class="wds-list wds-is-linked">')));
	$('#pt-userlinksdropdown .wds-list').append(
		$(ptItem(
			'mytalk',
			`User talk:${mw.config.get('wgUserName')}`,
			'Your talk page',
			'Talk',
		)),
		$(ptItem(
			'sandbox',
			`User:${mw.config.get('wgUserName')}/sandbox`,
			'Your sandbox',
			'Sandbox',
		)),
		$(ptItem(
			'preferences',
			'Special:Preferences',
			'Your preferences',
			'Preferences',
		)),
		$(ptItem(
			'contribs',
			`Special:Contributions/${mw.config.get('wgUserName')}`,
			'A list of your contributions',
			'Contributions',
		)),
		$(ptItem(
			'imagegallery',
			'Special:MyUploads',
			'A list of your uploaded media',
			'Uploaded media',
		)),
		$(ptItem('logout', 'Special:UserLogout', 'Log out', 'Log out')),
	);

	$('.notifications__toggle').attr('title', 'Your notifications');

	// Page actions
	await skinConfig.associatedPages('#page-actions');
	skinConfig.views('#page-actions');

	// Footer
	$('#footer').append(
		$('<div id="footer-copyright">').html($('.license-description').html()),
		$('<ul id="footer-places">'),
		$('<ul id="footer-icons">'),
	);

	$('#footer-places').append(
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Copyrights')}">Copyright</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Special:Statistics')}">Statistics</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact Memory Alpha</a></li>`),
		$('<li><a href="https://www.fandom.com/privacy-policy">Privacy Policy</a></li>'),
		$('<li><a href="https://www.fandom.com/terms-of-use">Terms of Use</a></li>'),
		$('<li><a href="https://www.fandom.com/terms-of-sale">Terms of Sale</a></li>'),
		$('<li><a href="https://www.fandom.com/community-creation-policy">Community Creation Policy</a></li>'),
		$('<li><a href="https://about.fandom.com/about">About Fandom</a></li>'),
	);

	$('#footer-icons').append(
		footerIcon(
			'hostedbyico',
			'Hosting provided by Fandom',
			'https://www.fandom.com'
		),
		footerIcon(
			'poweredbyico',
			'Powered by MediaWiki',
			'https://www.mediawiki.org'
		),
	);

	// Left rail
	$('#left-rail-wrapper').append($('<div>', {
		id: 'pc-main-menu',
		class: 'portlet-container',
	}));
	$('#pc-main-menu').append(
		pcHeader('Main menu', 'main-menu'),
		portlet('navigation', 'Navigation'),
		portlet('interaction', 'Contribute'),
		portlet('global', 'Fandom'),
	);

	$('#p-navigation-body').html($('<ul>'));
	$('#p-navigation-body ul').append(
		$(`<li><a href="${mw.util.getUrl('Portal:Main')}">Main page</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Forums')}">Forums</a></li>`),
		$('<li><a href="/f">Discussions</a></li>'),
		$(`<li><a href="${mw.util.getUrl('Special:Random')}">Random article</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact us</a></li>`),
	);

	$('#p-interaction-body').html($('<ul>'));
	$('#p-interaction-body ul').append(
		$(`<li><a href="${mw.util.getUrl('MA Help:Contents')}">Help</a></li>`),
		$(`<li><a href="${mw.util.getUrl('MA Help:Editing')}">Learn to edit</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Special:Community')}">Community portal</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:FAQ')}">FAQ</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Policies and guidelines')}">Policies</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Special:RecentChanges')}">Recent changes</a></li>`),
	);

	$('#p-global-body').html($('<ul>'));
	$('#p-global-body ul').append(
		$('<li><a href="https://www.fandom.com">Fandom home</a></li>'),
		$('<li><a href="https://www.fandom.com/fancentral/home">FanCentral</a></li>'),
		$('<li><a href="https://www.fandom.com/explore">Explore other wikis</a></li>'),
		$('<li><a href="https://community.fandom.com/wiki/">Community Central</a></li>'),
		$('<li><a href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki">Start a wiki</a></li>'),
	);

	$('#left-rail-wrapper').append($('<div>', {
		id: 'pc-toc',
		class: 'portlet-container rail-module-sticky',
	}).append(pcHeader(
		'Contents',
		'toc',
	), $('<div class="pBody">')));
	skinConfig.toc('#pc-toc .pBody');

	// Right rail
	$('#right-rail-wrapper').append($('<div class="rail-module-sticky">'));
	const pcTools = $('<div id="pc-tools" class="portlet-container">').append(
		pcHeader('Tools', 'tools'),
		portlet('cactions', 'Actions'),
		portlet('my-tb', 'My tools'),
	);

	if (window.Vector2022.storedData.tools === 'pinned'){
		$('#right-rail-wrapper > div').prepend(pcTools);
	} else {
		$('#page-actions').append($('<div>', {
			id: 'pc-tools-unpinned',
			tabindex: 0,
		}).append($('<span>', {
			class: 'toggle-with-icon',
			text: 'Tools',
		}), pcTools));
	}

	$('#p-cactions-body').html($('<ul>'));
	$('#p-cactions-body ul').append(
		$('<li id="ca-delete-li">').append(trimmer('#ca-delete').attr(
			'title',
			'Delete this page',
		)),
		$('<li id="ca-undelete-li">').append(trimmer('#ca-undelete').attr(
			'title',
			'Undelete this page',
		)),
		$('<li id="ca-move-li">').append(trimmer('#ca-move').attr(
			'title',
			'Rename this page',
		)),
		$('<li id="ca-protect-li">').append(trimmer('#ca-protect').attr(
			'title',
			'Protect this page from editing',
		)),
		$('<li id="ca-unprotect-li">').append(trimmer('#ca-unprotect').attr(
			'title',
			'Change the protection level on this page',
		)),
	);
	$('#p-cactions-body li:empty').remove();

	mw.hook('fandom.rightrail.loaded').add(() => {
		$('#p-my-tb').before(portlet('tb', 'Page tools'));
		$('#p-tb-body').html($('.page-tools-module ul').removeAttr('class'));
		$('.page-tools-module').remove();
	});

	const myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
	$('#p-my-tb-body').html(myTools);
	$('#p-my-tb-body ul').removeAttr('class').append(
		$('li:has([data-tracking="admindashboard/toolbar/admin"])'),
		$('li:has([data-tracking="admindashboard/toolbar/reported"])'),
		$('li:has([data-tracking="quickanswers/toolbar"])'),
		$('li:has(.global-shortcuts-help-entry-point)'),
	);
	$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');

	if ($('.content-review__widget').length){
		pcTools.append(portlet('js-review', 'Review status'));
		$('#p-js-review-body').append($('.content-review__widget__title').nextAll());
	}

	$('#right-rail-wrapper > div').append($('<div>', {
		id: 'pc-appearance',
		class: 'portlet-container',
	}));
	$('#pc-appearance').append(
		pcHeader('Appearance', 'appearance'),
		portlet('custom-font-size', 'Text'),
		portlet('limited-width', 'Width'),
		portlet('skin-theme', 'Color'),
	);

	$('#p-custom-font-size-body').append($('<form>'));
	$('#p-custom-font-size-body form').append(
		option('custom-font-size', 'small', 'Small'),
		option('custom-font-size', 'standard', 'Standard'),
		option('custom-font-size', 'large', 'Large'),
	);

	$('#p-limited-width-body').append($('<form>'));
	$('#p-limited-width-body form').append(
		option('limited-width', 'standard', 'Standard'),
		option('limited-width', 'wide', 'Wide'),
	);

	$('#p-skin-theme-body').append($('<form>'));
	$('#p-skin-theme-body form').append(
		option('skin-theme', 'automatic', 'Automatic'),
		option('skin-theme', 'light', 'Light'),
		option('skin-theme', 'dark', 'Dark'),
	);

	// Update stored settings
	const radioButtons = [
		'#p-custom-font-size input',
		'#p-limited-width input',
		'#p-skin-theme input',
	];
	$(radioButtons.join(', ')).on('change', updateSettings);
	$('.pinnable-header-toggle-button').on('click', updateSettings);
});

function updateSettings(event){
	window.Vector2022.storedData[event.currentTarget.name] = event.currentTarget.value;
	mw.storage.setObject(window.Vector2022.storageKey, window.Vector2022.storedData);

	if (window.Vector2022.storedData.tools === 'pinned'){
		$('#right-rail-wrapper > div').prepend($('#pc-tools'));
		$('#pc-tools [value="pinned"]').attr('hidden', true);
		$('#pc-tools [value="unpinned"]').removeAttr('hidden');
		$('#pc-tools-unpinned').remove();
	} else {
		$('#page-actions').append($('<div>', {
			id: 'pc-tools-unpinned',
			tabindex: 0,
		}).append($('<span>', {
			class: 'toggle-with-icon',
			text: 'Tools',
		}), $('#pc-tools')));
		$('#pc-tools [value="unpinned"]').attr('hidden', true);
		$('#pc-tools [value="pinned"]').removeAttr('hidden');
	}
}

function pcHeader(label, pc){
	return $('<div class="pinnable-header">').append(
		$('<h2>', {
			class: 'pinnable-header-label',
			text: label,
		}),
		$('<button>', {
			class: 'pinnable-header-toggle-button',
			name: pc,
			value: 'pinned',
			hidden: window.Vector2022.storedData[pc] === 'pinned',
			text: 'move to sidebar',
		}),
		$('<button>', {
			class: 'pinnable-header-toggle-button',
			name: pc,
			value: 'unpinned',
			hidden: window.Vector2022.storedData[pc] === 'unpinned',
			text: 'hide',
		}),
	);
}

function option(name, value, label){
	return $('<div>').append($('<input>', {
		type: 'radio',
		id: `${name}--${value}`,
		name: name,
		value: value,
		checked: window.Vector2022.storedData[name] === value,
	}), $(`<label for="${name}--${value}">${label}</label>`));
}

function portlet(name, label){
	return $(`<nav class="portlet" id="p-${name}" aria-labelledby="p-${name}-label"><h3 class="pHeading" id="p-${name}-label">${label}</h3><div class="pBody" id="p-${name}-body"></div></nav>`);
}

function footerIcon(id, title, url){
	return $('<li>').append($('<a>', {
		class: 'footer-icon',
		id: `footer-${id}`,
		title: title,
		href: url,
	}));
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

// {{JavaScript category}}