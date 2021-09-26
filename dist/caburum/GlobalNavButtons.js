/**
 * Name:        GlobalNavButtons
 * Version:     v2.0
 * Author:      Caburum
 * Description: Replaces default global nav buttons with custom ones
 * <pre>
**/

mw.loader.using(['mediawiki.template.mustache']).then(function () {
	if (mw.config.get('skin') !== 'fandomdesktop') return console.error('[GlobalNavButtons] Unrecognized skin:', mw.config.get('skin'));

	function init(wds) {
		// Remove default links
		const ignores = window.GlobalNavButtonsIgnore || [];
		$('.global-navigation__nav .global-navigation__links > *').each(function() {
			if (!ignores.includes(
				$(this).attr('data-tracking-label') ||
				$(this).find('.wds-dropdown__toggle').attr('data-tracking-label')
			)) $(this).remove();
		});

		// Parse config
		if (!window.GlobalNavButtons) return console.info('[GlobalNavButtons] Missing config');
		$('.global-navigation__nav .global-navigation__links').prepend(parseConfig(window.GlobalNavButtons, true));

		// $.each(window.globalNavButtons, function(i, glnbutton) {
		// 	if (!glnbutton.isMain && !glnbutton.whoIsMain) { // Normal
		// 		$('.global-navigation__nav .global-navigation__links').append(createTemplate('normal', {
		// 			text: glnbutton.text,
		// 			url: glnbutton.url,
		// 			icon: glnbutton.icon,
		// 			shortName: glnbutton.shortName,
		// 			hasBackground: !glnbutton.hasOwnProperty('hasBackground') || glnbutton.hasBackground
		// 		}));
		// 	} else if (glnbutton.isMain) { // Parent
		// 		$('.global-navigation__nav .global-navigation__links').append(createTemplate('parent', {
		// 			text: glnbutton.text,
		// 			url: glnbutton.url,
		// 			icon: glnbutton.icon,
		// 			shortName: glnbutton.shortName,
		// 			hasBackground: !glnbutton.hasOwnProperty('hasBackground') || hasBackground
		// 		}));
		// 	} else if (!glnbutton.isMain && glnbutton.whoIsMain) { // Child
		// 		$('#custom-global-nav-button-parent-' + glnbutton.whoIsMain + ' .wds-dropdown__content ul').append(createTemplate('child', {
		// 			text: glnbutton.text,
		// 			url: glnbutton.url
		// 		}));
		// 	}
		// 	i++;
		// });
	}

	// Loads config into HTML, recurses if nessecary
	function parseConfig(array, isTop) {
		var html;
		$.each(array, function(i, object) {
			var template = 'child';
			if (isTop && !object.parent && !object.children) template = 'normal';
			if (isTop && !object.parent && object.children) template = 'parent';
			if (!isTop && object.children) template = 'nested';

			if (object.children) {
				object.content = parseConfig(object.children, false);
			}

			html += createTemplate(template, object);
		});
		return html;
	}

	const templates = {
		normal:
			'<a {{{url}}} class="global-navigation__link">' +
				'<div class="global-navigation__icon {{hasBackground}}">{{{icon}}}</div>' +
				'<div class="global-navigation__label" {{{smallText}}}>{{name}}</div>' +
			'</a>',
		parent:
			'<div class="wds-dropdown wds-open-to-right">' +
				'<a {{{url}}} class="wds-dropdown__toggle">' +
					'<div class="global-navigation__icon {{hasBackground}}">{{{icon}}}</div>' +
					'<div class="global-navigation__label" {{{smallText}}}>{{name}}</div>' +
				'</a>' +
				'<div class="wds-dropdown__content">' +
					'<ul class="wds-list wds-is-linked">{{{content}}}</ul>' +
				'</div>' +
			'</div>',
		nested:
			'<li class="wds-dropdown-level-nested wds-open-to-right">' +
				'<a {{{url}}} class="wds-dropdown-level-nested__toggle">{{name}}</a>' +
				'<div class="wds-dropdown-level-nested__content">' +
					'<ul class="wds-list wds-is-linked">{{{content}}}</ul>' +
				'</div>' +
			'</li>',
		child: '<li><a {{{url}}}>{{name}}</a></li>'
	};

	function createTemplate(template, args) {
		args = {
			name: args.name,
			url: args.url ? 'href="' + args.url + '"' : '',
			icon: args.icon || window.dev.wds.icon('star-small').outerHTML,
			content: args.content || '',
			// shortName: args.shortName || '',
			hasBackground: args.hasBackground ? 'has-background' : '',
			smallText: /\b\S{7,}\b/g.test(args.text) ? 'style="font-size: 8px"' : ''
		};

		return Mustache.render(templates[template], args);
	}

	mw.hook('dev.wds').add(init);

	importArticles({
		type: 'script',
		articles: 'u:dev:MediaWiki:WDSIcons/code.js'
	});
});
// </pre>