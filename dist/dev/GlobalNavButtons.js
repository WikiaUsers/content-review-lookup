// Global Nav Buttons

$(function () {
	glnbutt = {};

	/*** START OASIS CODE ***/
	if (mw.config.get('skin') === 'oasis') {
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
	} else /*** END OASIS CODE ***/ if (mw.config.get('skin') === 'fandomdesktop') {
		/*** START FANDOMDESKTOP CODE ***/
		// @author:		Caburum
		glnbutt.init = function () {
			if (window.globalNavButtons) {
				$('.global-navigation__nav .global-navigation__links').empty(); // Remove current links
				$.each(window.globalNavButtons, function(i, glnbutton) {
					if (!glnbutton.isMain && !glnbutton.whoIsMain) { // Normal
						$('.global-navigation__nav .global-navigation__links').append(glnbutt.createTemplate('normal', {
							text: glnbutton.text,
							url: glnbutton.url,
							icon: glnbutton.icon,
							shortName: glnbutton.shortName,
							hasBackground: !glnbutton.hasOwnProperty('hasBackground') || glnbutton.hasBackground
						}));
					} else if (glnbutton.isMain) { // Parent
						$('.global-navigation__nav .global-navigation__links').append(glnbutt.createTemplate('parent', {
							text: glnbutton.text,
							url: glnbutton.url,
							icon: glnbutton.icon,
							shortName: glnbutton.shortName,
							hasBackground: !glnbutton.hasOwnProperty('hasBackground') || glnbutton.hasBackground
						}));
					} else if (!glnbutton.isMain && glnbutton.whoIsMain) { // Child
						$('#custom-global-nav-button-parent-' + glnbutton.whoIsMain + ' .wds-dropdown__content ul').append(glnbutt.createTemplate('child', {
							text: glnbutton.text,
							url: glnbutton.url
						}));
					}
					i++;
				});
			}
		};
	
		glnbutt.templates = {
			defaultIcon: '<svg class="wds-icon wds-icon-small" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.15008 5.30832C6.06799 5.48263 5.90933 5.60345 5.72578 5.63141L0.4831 6.42984C0.0208923 6.50023 -0.163665 7.09555 0.170791 7.43724L3.96443 11.3129C4.09725 11.4486 4.15785 11.6441 4.1265 11.8357L3.23094 17.3082C3.15199 17.7907 3.63516 18.1586 4.04857 17.9308L8.73777 15.3471C8.90194 15.2566 9.09806 15.2566 9.26223 15.3471L13.9514 17.9308C14.3648 18.1586 14.848 17.7907 14.7691 17.3082L13.8735 11.8357C13.8421 11.6441 13.9028 11.4486 14.0356 11.3129L17.8292 7.43724C18.1637 7.09555 17.9791 6.50023 17.5169 6.42984L12.2742 5.63141C12.0907 5.60345 11.932 5.48263 11.8499 5.30832L9.50532 0.329227C9.29862 -0.109742 8.70138 -0.109742 8.49467 0.329226L6.15008 5.30832ZM9 2.99274L7.56499 6.04019C7.25307 6.70259 6.65014 7.16171 5.95267 7.26793L2.74389 7.75661L5.06579 10.1287C5.57048 10.6443 5.80078 11.3872 5.68164 12.1152L5.13351 15.4647L8.00354 13.8833C8.62737 13.5396 9.37263 13.5396 9.99646 13.8833L12.8665 15.4647L12.3184 12.1152C12.1992 11.3872 12.4295 10.6443 12.9342 10.1287L15.2561 7.75661L12.0473 7.26793C11.3499 7.16171 10.7469 6.70259 10.435 6.04019L9 2.99274Z"/></svg></svg>',
			normal:
				'<a {url} class="global-navigation__link">' +
					'<div class="global-navigation__icon {has-background}">{icon}</div>' +
					'<div class="global-navigation__label" {smallText}>{text}</div>' +
				'</a>',
			parent:
				'<div class="wds-dropdown wds-open-to-right" id="custom-global-nav-button-parent-{shortName}">' +
					'<a {url} class="wds-dropdown__toggle">' +
						'<div class="global-navigation__icon {has-background}">{icon}</div>' +
						'<div class="global-navigation__label" {smallText}>{text}</div>' +
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
				shortName: args.shortName || '',
				hasBackground: args.hasBackground ? 'has-background' : ''
			};
			var smallText = /\b\S{7,}\b/g.test(args.text) ? 'style="font-size: 8px"' : '';
			return glnbutt.templates[template].replace('{text}', args.text).replace('{url}', args.url ? 'href="' + args.url + '"' : '').replace('{icon}', args.icon).replace('{shortName}', args.shortName).replace('{has-background}', args.hasBackground).replace('{smallText}', smallText);
		};
		/*** END FANDOMDESKTOP CODE ***/
	} else {
		console.error('[GlobalNavButtons] Unrecognized skin:', mw.config.get('skin'));
	}

	glnbutt.init();
});