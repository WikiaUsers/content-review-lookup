//<nowiki>
/**
 * Selectively delete multiple files or pages directly on certain special pages.
 * Based on WHAM2 code by Ozuzanna.
 * @author Spottra <https://dev.fandom.com/wiki/User:Spottra>
 * @author KhangND <https://dev.fandom.com/wiki/User:KhangND>
 * @author Thundercraft5 <https://dev.fandom.com/wiki/User:Thundercraft5>
 */
/* jshint esversion: 5 */

(function($, mw) {
	var userGroups = mw.config.get("wgUserGroups"),
		specialPage = mw.config.get("wgCanonicalSpecialPageName"),
		supportedPages = [
			[
				'Listredirects',
				'Lonelypages',
				'Ancientpages',
				'Fewestrevisions',
				'Withoutinterwiki',
				'Shortpages',
				'Uncategorizedfiles',
				'Uncategorizedpages',
				'Uncategorizedtemplates',
				'Unorganizedtemplates',
				'Unusedcategories',
				'Unusedtemplates',
				'BrokenRedirects',
				'Unusedcategories',
				'Unusedtemplates',
				'Deadendpages',
				'Shortpages',
			], [
				'Allpages',
				'Prefixindex',
				'Whatlinkshere',
			], [
				'Unusedimages',
			],
		];

	var logger = (function() {
		Object.keys(this).forEach(function(method) {
			this[method] = this[method].bind(null, '[MultipleFileDelete] [' + method.toUpperCase() + ']:');
		}, this);

		return this;
	}).call({
		error: console.error,
		warn: console.warn,
		log: console.log,
		debug: mw.log,
	});

	// load protections
	if (!supportedPages.flat().includes(specialPage) // not from list
		|| !/staff|sysop|content-moderator|wiki-specialist|soap/.test(userGroups.join('\n')) //not in group
		|| window.mfdLoaded // double loading
		// exclude page(s)
		|| (window.mfdExclude && (window.mfdExclude === page || window.mfdExclude.indexOf(page) >= 0))
		) {
			return logger.log('Page is not supported, or script is double loading, exiting...');
		}

	window.mfdLoaded = true;

	var btnProps = {
			css: {
				cursor: 'pointer',
				height: 'initial',
				'margin-left': 3,
			}
		},
		i18n = {},
		$wrapper = $(),
		$oldButton,
		specialPageType = supportedPages.findIndex(function(pages) {
			return pages.indexOf(specialPage) >= 0;
		}) + 1,
		time = 0,
		wgArticlePath = mw.config.get('wgArticlePath').replace(/\$1/, '');
		api = new mw.Api(),
		i18Messages = [
			'start', 
			'delete', 
			'check',
			'uncheck', 
			'enter', 
			'reason',
			'noselect', 
			'error', 
			'success',
			'uninvert',
			'invert',
		];
	

	function preload(i18nLoaded) {
		i18Messages.forEach(function(msg) {
			i18n[msg] = i18nLoaded.msg(msg).plain();
		});

		init();
	}

	function init() {
		// create wrapper with start button
		$wrapper = $('<span>', {
			html: $('<button>', $.extend({
				class: 'btn-mfd-start',
				text: i18n.start,
				click: start,
			}, btnProps))
		});

		$([
			'.mw-allpages-body', 
			'.mw-prefixindex-body', 
			'.mw-spcontent > p:first-of-type',
			'.mw-spcontent > p:last-of-type',
			'body.mw-special-Whatlinkshere #mw-content-text > p:first-of-type',
		].join(', ')).before($wrapper);

		$([
			'.mw-prefixindex-body', 
			'.mw-allpages-body',
			'body.mw-special-Whatlinkshere #mw-content-text'
		].join(', ')).after($wrapper.clone());
	}

	function start() {
		$('.btn-mfd-start').after(
			// delete button
			$('<button>', $.extend({
				class: 'btn-mfd-delete',
				text: i18n['delete'],
				click: performDelete,
			}, btnProps)),
			// check all button
			$('<button>', $.extend({
				class: "btn-mfd-check",
				text: i18n.check,
				click: performCheck,
			}, btnProps)),
			// invert selection button
			$('<button>', $.extend({
				class: "btn-mfd-invert",
				text: i18n.invert,
				click: invertSelection,
			}, btnProps))
		);
		$oldButton = $('.btn-mfd-start').remove();

		// create checkboxes and add before items
		var $chk = $('<input>', {
			class: "selectiveDel",
			type: "checkbox",
		});

		switch (specialPageType) {
			case 1:
				mw.util.$content.find('ol li a:first-child').each(function() {
					$(this).before($chk.clone());
					selectHax(this);
				});

				break;
			case 2:
				if ($('.mw-allpages-chunk').length) { // Allpages
					$('.mw-allpages-chunk li > a').each(function() {
						$(this).before($chk.clone());
						selectHax(this);
					});
				} else if ($('#mw-whatlinkshere-list').length) { // WhatLinksHere
					$('#mw-whatlinkshere-list > li > a').each(function() {
						$(this).before($chk.clone());
						selectHax(this);
					});
				} else { //PrefixIndex
					$('.mw-prefixindex-list > li a, .gallery-image-wrapper').each(function() {
						$(this).before($chk.clone());
						selectHax(this);
					});
				}

				break;
			default:
				$('.gallerytext > a, .gallery-image-wrapper').each(function() {
					$(this).has('.image.lightbox').before($chk.clone());
					selectHax(this);
				});
		}
	}

	function performDelete() {
		var selected = $('.selectiveDel:checked');
		if (!selected.length)
			return alert(i18n.noselect);

		var deleteReason = prompt(i18n.enter, i18n.reason);
		if (!deleteReason)
			return;
		
		// lock delete button
		$(this)
			.attr('disabled', true)
			.text("Deleting Pages...")
			.css({
				'background-repeat': 'no-repeat',
				'background-position': 'center'
			});

		selected.each(function(i) {
			var $link = $(this).parent().find('a').first();
			var page;

			if (specialPageType === 3) {
			    page = $link.attr('href')
    			    .replace(wgArticlePath, '')
    			    .replace(mw.config.get('wgServer'), '');
			} else {
			    page = $link.attr('title') || $link.text();
			}

			apiDelete(
				page,
				deleteReason,
				$link,
				i+1,
				selected.length // reload indicator
			);
		});
	}

	function performCheck() {
		var $btn = $('.btn-mfd-check');
		var $checkboxes = $('.selectiveDel');
	
		if ($btn.first().text() === i18n.uncheck) {
			$checkboxes.each(function() {
				this.checked = false;
			});

			$btn.text(i18n.check);
		} else {
			$checkboxes.each(function() {
				this.checked = true;
			});

			$btn.text(i18n.uncheck);
		}
		displayCount();
	}

	function selectHax(elem) { // parent select hacks
		var $elem = $(elem);
		var $parent = $elem.parent();

		$parent.hover(function() {
			$(this).css({
				cursor: 'pointer',
				background: 'rgba(0,0,0,.2)'
			});
		}, function() {
			$(this).css({
				background: 'initial'
			});
		});

		$parent.click(function(e) {
			if (e.target === this) { // prevent event double firing
				var input = $(this).children('input')[0];
				input.checked = !input.checked;
			}
			displayCount();
		});
	}

	function invertSelection() {
		$('.selectiveDel').each(function() {
			this.checked = !this.checked;
		});
		$(this).text($(this).text() === i18n.invert ? i18n.uninvert : i18n.invert);
		displayCount();
	}

	function displayCount() {
		$('.btn-mfd-delete').text(
			i18n['delete']
			+ ' ('
			+ $('.selectiveDel:checked').length
			+ ')');
	}

	function reset() {
		$('.btn-mfd-delete')
			.attr('disabled', false)
			.text(i18n['delete'])
			.css({
				'background-image': "",
			});

		$('.btn-mfd-check').text(i18n.check);
		$('.btn-mfd-invert').text(i18n.invert);
	}

	function apiDelete(page, reason, $link, cur, count) {
		page = decodeURIComponent(page); // Api doesn't like percent encodes page names

	   	api.postWithEditToken({
			format: 'json',
			action: 'delete',
			title: page,
			reason: reason,
			bot: true
		}).then(function(d) {
			mw.notify('Successfully deleted ' + page);
			logger.log('Successfully deleted ' + page);
			var $target = specialPageType === 3 ? $link.parent().parent().parent() : $link.parent();
			$target.remove();

			if (cur === count) {
				reset();
			}

		}, function(_, e) {
			mw.notify('Failed to delete deleted ' + page + ": " + e.error.info, { type: "warn" });
			logger.warn('Failed to delete deleted ' + page + ": " + e.error.info);
		});
	}

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});

	mw.hook('dev.i18n').add(function(i18n) {
		$.when(  
			i18n.loadMessages('MultipleFileDelete'),
			mw.loader.using('mediawiki.api')
		).then(preload);
	});
})(this.jQuery, this.mediaWiki);