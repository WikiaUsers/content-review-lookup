// Global Nav Buttons
$(function () {
	glnbutt = {};
	if (mw.config.get('skin') === 'oasis') {
		/*** START OASIS CODE ***/
		// @author:		Jr Mime
		glnbutt.init = function () {
			if (window.globalNavButtons) {
				if ($(".wds-global-navigation__links").length === 0) {
					$('.wds-global-navigation__content-bar-left').append($('<div>').addClass('wds-global-navigation__links'));
				}
				$(".wds-global-navigation__links").empty();
				$.each(window.globalNavButtons, function(i) {
					if (!window.globalNavButtons[i].isMain && !window.globalNavButtons[i].whoIsMain) {
						$(".wds-global-navigation__links").append("<a href='" + window.globalNavButtons[i].url + "' class='wds-global-navigation__link' id='custom-global-nav-button-" + window.globalNavButtons[i].shortName + "'>" + window.globalNavButtons[i].text + "</a>");
					} else if (window.globalNavButtons[i].isMain) {
						$(".wds-global-navigation__links").append(
							'<div class="wds-dropdown wds-global-navigation__link-group wds-has-dark-shadow">' +
								'<div class="wds-dropdown__toggle wds-global-navigation__dropdown-toggle wds-global-navigation__link">' +
								'<span id="custom-global-nav-button-href-' + window.globalNavButtons[i].shortName + '">' + window.globalNavButtons[i].text + '</span>' +
								'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
									'<path d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z" fill-rule="evenodd">' +
									'</path>' +
								'</svg>' +
							'</div>' +
							 '<div class="wds-dropdown__content wds-global-navigation__dropdown-content">' +
								'<ul class="wds-list wds-is-linked" id="custom-global-nav-button-lbl-' + window.globalNavButtons[i].shortName + '">' +
									// Items here
								'</ul>' +
							 '</div>'
						);
						if (window.globalNavButtons[i].url) document.getElementById("custom-global-nav-button-href-" + window.globalNavButtons[i].shortName).innerHTML = '<a style="color: inherit;" href="' + window.globalNavButtons[i].url + '">' + window.globalNavButtons[i].text + '</a>';
					} else if (!window.globalNavButtons[i].isMain && window.globalNavButtons[i].whoIsMain) {
						$("#custom-global-nav-button-lbl-" + window.globalNavButtons[i].whoIsMain).append(
							'<li>'+
								'<a href="' + window.globalNavButtons[i].url + '">' + window.globalNavButtons[i].text + '</a>' +
							'</li>'
						);
					}
					i++;
				});
			}
		};
		/*** END OASIS CODE ***/
	} else if (mw.config.get('skin') === 'fandomdesktop') {
		/*** START FANDOMDESKTOP CODE ***/
		// @author:		Caburum
		glnbutt.init = function () {
			if (window.globalNavButtons) {
				$('.global-navigation__link').remove(); // Remove current links
				$.each(window.globalNavButtons, function(i) {
					if (!window.globalNavButtons[i].isMain && !window.globalNavButtons[i].whoIsMain) { // Normal
						$('.global-navigation__nav').append(glnbutt.createTemplate('normal', {
							text: window.globalNavButtons[i].text,
							url: window.globalNavButtons[i].url,
							icon: window.globalNavButtons[i].icon,
							shortName: window.globalNavButtons[i].shortName
						}));
					} else if (window.globalNavButtons[i].isMain) { // Parent
						$('.global-navigation__nav').append(glnbutt.createTemplate('parent', {
							text: window.globalNavButtons[i].text,
							url: window.globalNavButtons[i].url,
							icon: window.globalNavButtons[i].icon,
							shortName: window.globalNavButtons[i].shortName
						}));
					} else if (!window.globalNavButtons[i].isMain && window.globalNavButtons[i].whoIsMain) { // Child
						$('#custom-global-nav-button-parent-' + window.globalNavButtons[i].whoIsMain + ' .wds-dropdown__content ul').append(glnbutt.createTemplate('child', {
							text: window.globalNavButtons[i].text,
							url: window.globalNavButtons[i].url
						}));
					}
					i++;
				});
			}
		};
		glnbutt.templates = {
			defaultIcon: '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-fandom-small"></use></svg>',
			normal:
				'<a {url} class="global-navigation__link">' +
					'<div class="global-navigation__link-icon">{icon}</div>' +
					'<div class="global-navigation__link-text">{text}</div>' +
				'</a>',
			parent:
				'<div class="global-navigation__link wds-dropdown wds-open-to-right wds-has-shadow attach-to-bottom" id="custom-global-nav-button-parent-{shortName}">' +
					'<a {url} class="wds-dropdown__toggle">' +
						'<div class="global-navigation__link-icon">{icon}</div>' +
						'<div class="global-navigation__link-text">{text}</div>' +
					'</a>' +
					'<div class="wds-dropdown__content">' +
						'<ul class="wds-list wds-is-linked">' +
							// Children here
						'</ul>' +
					'</div>' +
				'</div>',
			child: '<li><a {url}>{text}</a></li>'
		};
		glnbutt.createTemplate = function (template, args) {
			args = {
				text: args.text,
				url: args.url || '',
				icon: args.icon || glnbutt.templates.defaultIcon,
				shortName: args.shortName || ''
			};
			return glnbutt.templates[template].replace('{text}', args.text).replace('{url}', args.url ? 'href="' + args.url + '"' : '').replace('{icon}', args.icon).replace('{shortName}', args.shortName);
		};
		/*** END FANDOMDESKTOP CODE ***/
	}
	glnbutt.init();
});