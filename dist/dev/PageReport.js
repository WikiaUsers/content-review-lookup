/* esversion: 5 */
mw.loader.using(['jquery.makeCollapsible', 'mediawiki.api']).then(function() {
	if (mw.config.get('wgArticleId') === 0) return;

	var api = new mw.Api();
	var parserReport = mw.config.get('wgPageParseReport');
	var messageKeys = Object.keys(parserReport.limitreport)
		.map(function(key) { return "limitreport-" + key })
		.concat(parserReport.scribunto ? Object.keys(parserReport.scribunto).map(function(key) { return 'scribunto-' + key }) : []);

	return $.when(
		api,
		importArticles({ type: 'script', articles: []
			.concat(window.dev && window.dev.i18n ? [] : 'u:dev:MediaWiki:I18n-js/code.js')
			.concat(mw.libs.QDmodal ? [] : 'u:dev:MediaWiki:QDmodal.js')
		}),
		api.loadMessagesIfMissing(messageKeys
			.concat(
				messageKeys.map(function(key) { return key + "-value" }),
				['size-kilobytes', 'size-megabytes', 'scribunto-limitreport-profile-percent', 'scribunto-limitreport-profile-ms', 'whatlinkshere']
			)
		)
	);
}).then(function(api) {
	return $.when(
		api,
		window.dev.i18n.loadMessages('PageReport')
	);
}).then(function(api, i18n) {
	if (window.PageReportLoaded) return console.warn('[PageReport] Script was double loaded, exiting...');
	window.PageReportLoaded = 1;
	if (!api) return;

	var modal = new mw.libs.QDmodal("PageReportModal");
	var luaErrors = mw.config.get('ScribuntoErrors');
	var parserReport = mw.config.get('wgPageParseReport');
	var transclusionKeys = Object.keys(parserReport.limitreport);
	var scribuntoKeys = parserReport.scribunto && Object.keys(parserReport.scribunto);
	var scribuntoErrors = mw.config.get('ScribuntoErrors');

	modal.$container.addClass('page-content');

	function formatNum(s) {
		return (+s).toLocaleString(undefined);
	}

	function parseDate(s) {
		var m = s.match(/^(?<yyyy>\d{4})(?<mm>\d{2})(?<dd>\d{2})?(?<hh>\d{2})?(?<m>\d{2})?(?<ss>\d{2})?(?<ms>\d{4})?$/);
		// monthIndex is 0-based, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#parameters
		m[2] -= 1

		return new Date(Date.UTC.apply(Date, m.slice(1).map(function(v) { return +v }).filter(Boolean)));
	}

	function onTabClick() {
		var $this = $(this);
		var index = $this.parent().children().index(this);

		if ($this.hasClass('wds-is-current')) return;

		var $tabber = $this.parents('.pagereport-tabber');

		$tabber.find('*.wds-is-current').removeClass('wds-is-current');
		$this.addClass('wds-is-current');
		$tabber.find('.wds-tab__content').eq(index).addClass('wds-is-current');
	}

	function createReportRows(report, keys) {
		return [
			$('<colgroup>', {
				html: [
					$('<col>', {
						css: {
							width: '50%',
						},
					}),
					$('<col>', {
						css: {
							width: '50%',
						},
					}),
				],
			}),
		].concat(keys.map(function(key, i) {
			var value = parserReport[report][key];

			if (key === 'timingprofile' || key === 'limitreport-logs' || key === 'limitreport-profile') return;

			return $('<tr>', {
				id: report + "-" + key,
				html: [
					$('<th>', { text: mw.msg(report + '-' + key) }),
					$('<td>', {
						text: mw.message.apply(mw, [
							report + '-' + key + '-value',
						].concat(value.limit
							? [ formatNum(value.value), formatNum(value.limit) ]
							: formatNum(value)
						)).parse()
					}),
				],
			});
		}));
	}

	var $transclusionReport = $('<table>', {
		class: "PageReport-transclusionReport-table wikitable",
		html: [
			$('<caption>', {
				html: ['(', $('<a>', {
					href: mw.util.getUrl('Special:WhatLinksHere/' + mw.config.get('wgPageName')),
					text: mw.msg("whatlinkshere"),
					title: 'Special:WhatLinksHere/' + mw.config.get('wgPageName'),
				}), ')'],
			}),
		].concat(createReportRows('limitreport', transclusionKeys)),
		css: {
			'min-width': '600px',
		},
	});

	var $scribuntoReport = scribuntoKeys && $('<table>', {
		class: "PageReport-scribuntoReport-table wikitable",
		css: {
			'min-width': '600px',
		},
		html: [
			$('<caption>', {
				html: ['(', $('<a>', {
					href: mw.util.getUrl('Special:AllPages', { namespace: 828 }),
					text: i18n.msg('all-modules').plain(),
					title: 'Special:AllPages',
				}), ')'],
			}),
		].concat(createReportRows('scribunto', scribuntoKeys).concat(parserReport.scribunto['limitreport-profile'] ? [
			$('<tr>', {
				html: $('<th>', {
					colspan: 2,
					text: mw.msg("scribunto-limitreport-profile"),
				}),
			}), $('<tr>', {
				html: $('<td>', {
					colspan: 2,
					html: $('<table>', {
						html: $('<tbody>', {
							html: [
								$('<tr>', {
									html: [
										$('<th>', { text: i18n.msg('lua-function').plain() }),
										$('<th>', { text: i18n.msg('lua-time-usage').plain() }),
										$('<th>', { text: i18n.msg('lua-time-percentage').plain() }),
									]
								}),
							].concat(parserReport.scribunto['limitreport-profile'].map(function(d) {
								return $('<tr>', {
									html: [
										$('<td>', { text: d[0] }),
										$('<td>', { text: mw.msg('scribunto-limitreport-profile-ms', d[1]), align: "right", }),
										$('<td>', { text: mw.msg('scribunto-limitreport-profile-percent', d[2]), align: "right" }),
									],
								});
							})),
						}),
					}),
				}),
			})
		] : [], parserReport.scribunto['limitreport-logs'] ? [
			$('<tr>', {
				html: $('<th>', {
					colspan: 2,
					text: mw.msg('scribunto-limitreport-logs'),
				}),
			}), $('<tr>', {
				html: $('<td>', {
					colspan: 2,
					html: $('<pre>', {
						text: parserReport.scribunto['limitreport-logs'],
					}).makeCollapsible().find('.mw-collapsible-toggle').click().end(),
				}),
			})
		] : [])),
	});

	var $scribuntoErrors = scribuntoErrors && $('<table>', {
		class: "PageReport-scribuntoErrors-table wikitable",
		css: {
			'min-width': '600px',
		},
		html: [
			$('<caption>', {
				html: $('<a>', {
					href: mw.util.getUrl('Category:Pages with script errors'),
					text: i18n.msg('script-errors-description').plain(),
					title: "Category:Pages with script errors",
				}),
			}),
		].concat(scribuntoErrors.map(function(html) {
			return $('<tr>', { html: $('<td>', { html: html }) });
		})),
	});

	function onClick() {
		var date = parseDate(parserReport.cachereport.timestamp);
		// ttl is in s but date uses ms
		var nextRefreshDate = new Date(+date + parserReport.cachereport.ttl * 1000);

		modal.show({
			title: i18n.msg('title').escape(),
			content: [
				$('<div>', {
					html: [
						i18n.msg('last-cache', date.toLocaleDateString() + " " + date.toLocaleTimeString()).escape(),
						'<br>',
						i18n.msg('next-cache', nextRefreshDate.toLocaleDateString() + " " + nextRefreshDate.toLocaleTimeString()).escape(),
						'&nbsp;(', $('<a>', { href: "?action=purge", title: mw.config.get('wgPageName'), text: i18n.msg('refresh-now').plain() }), ")",
					],
				}),
				$('<div>', {
					class: "wds-tabs pagereport-tabber",
					css: {
						'flex-direction': 'column',
					},
					html: [
						$('<div>', {
							class: "wds-tabs__wrapper",
							css: {
								'display': 'flex',
								'align-items': 'flex-start',
								'width': '-webkit-fill-available',
							},
							html: $('<ul>', {
								class: "wds-tabs",
								html: [
									$('<li>', {
										class: "wds-tabs__tab wds-is-current",
										id: "PageReport-limitreport",
										html: $('<span>', {
											class: 'wds-tabs__tab-label',
											title: i18n.msg('transclusion-report').plain(),
											text: i18n.msg('transclusion-report').plain(),
										}),
									}),
									$scribuntoReport ? $('<li>', {
										class: "wds-tabs__tab",
										id: "PageReport-limitreport",
										html: $('<span>', {
											class: 'wds-tabs__tab-label',
											title: i18n.msg('scribunto-report').plain(),
											text: i18n.msg('scribunto-report').plain(),
										}),
									}) : "",
						 			$scribuntoErrors ? $('<li>', {
										class: "wds-tabs__tab",
										id: "PageReport-limitreport",
										html: $('<span>', {
											class: 'wds-tabs__tab-label',
											title: i18n.msg('script-errors').plain(),
											text: i18n.msg('script-errors').plain(),
										}),
									}) : "",
								],
							}).on('click', 'li', onTabClick),
						}),
						$('<div>', {
							class: "wds-tab__content wds-is-current pagereport__tab",
							html: $transclusionReport,
						}),
						$scribuntoReport ? $('<div>', {
							class: "wds-tab__content pagereport__tab",
							html: $scribuntoReport,
						}) : "",
						$scribuntoErrors ? $('<div>', {
							class: "wds-tab__content pagereport__tab",
							html: $scribuntoErrors,
						}) : "",
					],
				}),
			],
		});
	}

	$('#t-info').after($('<a>', {
		text: i18n.msg('tools-title').plain(),
		title: i18n.msg('tools-description').plain(),
		css: {
			cursor: "pointer",
		},
		click: onClick,
		wrap: $('<li>', {
			id: "t-pagereport",
		}),
	}).parent());
});