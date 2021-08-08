/* jshint
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw */
$(function() {
	var pagename = mw.config.get('wgPageName'),
		sep2 = '<b> &bull; </b>';

	function makeLink(link, text, query, id) {
		query = query ? new mw.Uri().extend(query).getQueryString() : undefined;

		return $('<a>', {
			id: id,
			href: mw.util.getUrl(link) + (query ? "?" + query : ""),
			title: link,
			text: text || link,
		});
	}

	if (window.globalJsLinksLoaded || !pagename.match(/\/(global|common)\.(js|css)\/?/) || mw.config.get('wgCityId') !== 177) return;
	window.globalJsLinksLoaded = true;
	window.globalJsIgnoreJSPages = window.globalJsIgnoreJSPages || [];

	var isCSS = /\.css$/.test(pagename),
		prefix = isCSS ? 'css' : 'js',
		isLocal = /\/common\.(js|css)/.test(pagename),
		target = isLocal ? 'global' : 'common',
		upperCaseTarget = target.replace(/^(.)(.+)/, function(_, $1, $2) { 
			return $1.toUpperCase() + $2;
		}),
		invertedPrefix = !isCSS ? 'css' : 'js',
		userName = mw.config.get('wgUserName');

	$.get(mw.util.getUrl('Special:PrefixIndex/User:' + userName + '/global.' + prefix + '/')).then(function(data) {
		var arr = [];
		$(data).find('.mw-prefixindex-list > li > a').each(function() {
			var title = $(this).attr('title');

			if (!window.globalJsIgnoreJSPages.some(function(v) {
				return title.match(v);
			})) arr.push(title);
		});
		return arr;
	}).then(function(arr) {
		var $list = $('<ul>', {
			css: {
				'list-style': 'square',
				'margin': '0.4em 0px 0.5em 2.5em',
			}
		});
		// $('#firstHeading').html($('#firstHeading').html().replace(/^User:.*\//g, 'JS: ').replace('global.js/', ''));

		arr.forEach(function(v) {
			$list.append(
				$('<li>', {
					css: {
						'line-height': '20px',
						'font-size': '14px',
					},
					html: [
						makeLink(v, v.replace(/User:.*\/(global|common)\.(js|css)\//i, '')),
						$('<small>', {
							html: [
								'&nbsp;(',
								makeLink(v, 'edit', { action: 'edit' }),
								sep2,
								makeLink(v, 'latest diff', { diff: 'cur' }),
								sep2,
								makeLink(v, 'hist', { action: "history" }),
								sep2,
								makeLink(v, 'purge', { action: "purge" }),
								')',
							]
						}),
					],
				})
			);
		});

		$('#mw-clearyourcache')
			.after(
				$('<div>', {
					id: prefix.toUpperCase() + "Interface",
					html: [
						$('<h2>', {
							id: prefix.toUpperCase() + "Interface__header",
							html: [
								"Global "  + prefix.toUpperCase() + " Interface",
								$('<span>', {
									css: {
										'font-size': '20px',	
									},
									html: [
										'&nbsp;(',
										makeLink('User:' + userName + '/global.' + prefix, 'Return to main page'),
										sep2,
										makeLink('User:' + userName + '/global.' + invertedPrefix, 'Switch to ' + invertedPrefix.toUpperCase()),
										')',
									],
								}),
								$('<span>', {
									css: {
										'font-size': '16px',	
									},
									html: [
										'&nbsp;(',
										makeLink('User:' + userName + '/global.' + prefix, 'edit', { action: 'edit' }),
										sep2,
										makeLink('User:' + userName + '/global.' + prefix, 'latest diff', { diff: 'cur' }),
										sep2,
										makeLink('User:' + userName + '/global.' + prefix, 'hist', { action: "history" }),
										sep2,
										makeLink('User:' + userName + '/global.' + prefix, 'purge', { action: "purge" }),
										')',
									]
								})
							]
						}),
						$list,
						"(",
						makeLink('User:' + userName + '/' + target + '.js', upperCaseTarget + ' JS'),
						sep2,
						makeLink('User:' + userName + '/' + target + '.css', upperCaseTarget + ' CSS'),
						")",
						$('<h3>', {
							css: {
								'margin-top': "15px",
							},
							html: [
								"Page Code",
								$('<small>', {
									html: [
										'&nbsp;(',
										makeLink(pagename, 'edit', { action: 'edit' }),
										sep2,
										makeLink(pagename, 'latest diff', { diff: 'cur' }),
										sep2,
										makeLink(pagename, 'hist', { action: "history" }),
										sep2,
										makeLink(pagename, 'purge', { action: "purge" }),
										')',
									]
								})
							]
						})
					],
				})
			);

		$('#mw-clearyourcache').remove();

	});
});