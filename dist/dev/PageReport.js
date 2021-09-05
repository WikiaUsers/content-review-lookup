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
		api.loadMessagesIfMissing(messageKeys
			.concat(
				messageKeys.map(function(key) { return key + "-value" }), 
				['size-kilobytes', 'size-megabytes', 'scribunto-limitreport-profile-percent', 'scribunto-limitreport-profile-ms']
			)
		)
	);
}).then(function(api) {
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

		return new Date(Date.UTC.apply(Date, m.slice(1).map(function(v) { return +v }).filter(Boolean)));
	}

	function onTabClick() {
		var $this = $(this)
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
					text: "What links here",
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
					text: "All modules",
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
										$('<th>', { text: "Lua function" }),
										$('<th>', { text: "Time usage" }),
										$('<th>', { text: "Time percentage" }),
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
					text: "Script errors on this page",
					title: "Category:Pages with script errors",
				}),
			}),
		].concat(scribuntoErrors.map(function(html) {
			return $('<tr>', { html: $('<td>', { html: html }) });
		})),
	});

	function onClick() {
		var date = parseDate(parserReport.cachereport.timestamp);
		var nextRefreshDate = new Date(+date + parserReport.cachereport.ttl);

		modal.show({
			title: "Page Parser Report",
			content: [
				$('<div>', {
					html: [
						"Page last cached at " + date.toLocaleDateString() + " " + date.toLocaleTimeString(),
						'<br>',
						"Next cache refresh at " + nextRefreshDate.toLocaleDateString() + " " + nextRefreshDate.toLocaleTimeString(),
						'&nbsp;(', $('<a>', { href: "?action=purge", title: mw.config.get('wgPageName'), text: "Refresh now" }), ")",
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
										id: "PageReport-limitreport wds-tabs__tab wds-is-current",
										html: $('<span>', {
											class: 'wds-tabs__tab-label',
											title: "Transclusion Report",
											text: "Transclusion Report",
										}),
									}),
									$scribuntoReport ? $('<li>', {
										id: "PageReport-limitreport wds-tabs__tab",
										html: $('<span>', {
											class: 'wds-tabs__tab-label',
											title: "Scribunto Report",
											text: "Scribunto Report",
										}),
									}) : "",
						 			$scribuntoErrors ? $('<li>', {
										id: "PageReport-limitreport wds-tabs__tab",
										html: $('<span>', {
											class: 'wds-tabs__tab-label',
											title: "Script Errors",
											text: "Script Errors",
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
		text: "Parser Report",
		title: "View the parser report for this page",
		css: {
			cursor: "pointer",
		},
		click: onClick,
		wrap: $('<li>', {
			id: "t-pagereport",
		}),
	}).parent());
});