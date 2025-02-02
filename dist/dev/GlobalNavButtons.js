// Global Nav Buttons
// @author: Jr Mime
// @author: Caburum
// @maintainer: Aeywoo
// <pre>

mw.loader.using(['mediawiki.template.mustache']).then(function () {
	glnbutt = {};
	glnbutt.config = $.extend({
		keepLinks: [] // tracking ids of links to keep (ex. 'explore-tab', 'fan-central', 'current-wiki-tab')
	}, window.GlobalNavButtonsConf);

	if (mw.config.get('skin') !== 'fandomdesktop') return console.error('[GlobalNavButtons] Unrecognized skin:', mw.config.get('skin'));

	glnbutt.init = function () {
		if (window.globalNavButtons) {
			$nav = $('.global-explore-navigation__nav');
			var keptLinks = false;
			$('.global-explore-navigation__nav > *').each(function () { // Remove Fandom links
				if (!glnbutt.config.keepLinks.includes(
					$(this).find('[data-tracking-label]').first().data('tracking-label')
				)) $(this).remove();
				else keptLinks = true;
			});
			if (keptLinks && window.globalNavButtons.length) {
				$nav.append($('<div class="global-explore-navigation__item global-explore-navigation__divider"></div>'));
			}
			$.each(window.globalNavButtons, function(i, glnbutton) {
				if (typeof glnbutton !== 'object' || glnbutton === null) { // Do nothing
				} else if (!glnbutton.isMain && glnbutton.whoIsMain) { // Child
					$('#custom-global-explore-nav-button-parent-' + glnbutton.whoIsMain + ' .wds-dropdown__content ul').append(glnbutt.createTemplate('child', {
						text: glnbutton.text,
						url: glnbutton.url
					}));
				} else {
					$nav.append(glnbutt.createTemplate(glnbutton.isMain ? 'parent' : 'normal', {
						text: glnbutton.text,
						url: glnbutton.url,
						icon: glnbutton.icon,
						shortName: glnbutton.shortName,
					}));
				}
			});
		}
	};

	glnbutt.templates = {
		defaultIcon: '<svg height="24" width="24" viewBox="0 0 24 24" class="wds-icon" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 3.85717L10.0698 7.95468C9.64219 8.86245 8.8156 9.49163 7.85943 9.6372L3.54338 10.2943L6.6665 13.4837C7.3584 14.1903 7.67412 15.2084 7.51079 16.2061L6.77352 20.7097L10.6339 18.5834C11.4891 18.1123 12.5109 18.1123 13.3661 18.5834L17.2265 20.7097L16.4892 16.2061C16.3259 15.2084 16.6416 14.1903 17.3335 13.4837L20.4566 10.2943L16.1406 9.6372C15.1844 9.49163 14.3578 8.86244 13.9302 7.95468L12 3.85717ZM12.7521 0.489852C12.4445 -0.163284 11.5555 -0.163284 11.2479 0.489852L8.18943 6.98241C8.06726 7.24177 7.83109 7.42154 7.5579 7.46313L0.719066 8.50426C0.0310963 8.60899 -0.243607 9.49476 0.254213 10.0032L5.20284 15.0569C5.40052 15.2588 5.49073 15.5497 5.44406 15.8347L4.27585 22.9707C4.15833 23.6886 4.87751 24.236 5.49285 23.8971L11.6097 20.5279C11.854 20.3934 12.146 20.3934 12.3903 20.5279L18.5071 23.8971C19.1225 24.236 19.8417 23.6886 19.7241 22.9707L18.5559 15.8347C18.5093 15.5497 18.5995 15.2588 18.7972 15.0569L23.7458 10.0032C24.2436 9.49476 23.9689 8.60899 23.2809 8.50426L16.4421 7.46313C16.1689 7.42154 15.9327 7.24177 15.8106 6.98241L12.7521 0.489852Z" clip-rule="evenodd"></path></svg>',
		normal:
			'<div class="global-explore-navigation__item global-explore-navigation__item--with-icon">' +
				'<a {{{url}}}>' +
					'<span class="wds-avatar wds-avatar--square">' +
						'<span class="global-explore-navigation__icon">{{{icon}}}</span>' +
						'<span class="global-explore-navigation__label" {{{smallText}}}>{{text}}</span>' +
					'</span>' +
				'</a>' +
			'</div>',
		parent:
			'<div class="global-explore-navigation__item global-explore-navigation__item--with-icon">' +
				'<div class="wds-dropdown wds-open-to-right" id="custom-global-explore-nav-button-parent-{{{shortName}}}">' +
					'<a {{{url}}} class="wds-dropdown__toggle">' +
						'<span class="wds-avatar wds-avatar--square">' +
							'<span class="global-explore-navigation__icon">{{{icon}}}</span>' +
							'<span class="global-explore-navigation__label" {{{smallText}}}>{{text}}</span>' +
						'</span>' +
					'</a>' +
					'<div class="wds-dropdown__content">' +
						'<ul class="wds-list wds-is-linked">' +
							// Children here
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>',
		child: '<li><a {{{url}}}>{{text}}</a></li>'
	};

	glnbutt.createTemplate = function (template, args) {
		args = {
			text: args.text,
			url: args.url ? 'href="' + args.url + '"' : '',
			icon: args.icon || glnbutt.templates.defaultIcon,
			shortName: args.shortName || '',
			smallText: /\b\S{7,}\b/g.test(args.text) ? 'style="font-size:8px"' : ''
		};
		return Mustache.render(glnbutt.templates[template], args);
	};

	glnbutt.init();
	mw.hook('dev.GlobalNavButtons').add(glnbutt.init); // hook to recreate nav with new links/icons (ex. after fetching icons)
});
// </pre>