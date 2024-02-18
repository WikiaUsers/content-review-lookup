$(function () {
	if ((window.dev = window.dev || {}).refRevision_Loaded) {return;}
	var api, refs;
	var config = mw.config.get(['wgPageName', 'wgArticleId', 'wgAction', 'wgNamespaceNumber']);
	var loadingDefault = '<img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" width="25px" style="vertical-align: baseline;" border="0" /> Loading...';
	
	var refRevision = {
		init: function() {
			refs = {
				_default: {},
				_callbacks: [],
				_conflicts: {},
				_undefined: {},
				_pages: { _list: [] },
			};
			if (['edit', 'submit'].includes(config.wgAction)) {
				refRevision.initEdit();
			} else if (config.wgAction == 'view') {
				refRevision.initView();
			}
		},
		initEdit: function () {
			var wrapper = 
				'<div tabindex="0" role="button" aria-expanded="true" class="mw-brokenRefsExplanation mw-editfooter-toggler mw-icon-arrow-collapsed">' +
					'<p>Broken references on this page:</p>' +
				'</div>' +
				'<small class="mw-editfooter-list brokenRefsResetter-wrapper" style="display: none;"><i>Click <a class="brokenRefsResetter" href="#brokenRefs">here</a> to reset the checker</i></small>' +
				'<div class="brokenRefsList mw-editfooter-list mw-collapsible mw-made-collapsible mw-collapsed" style="display: none;">' +
					loadingDefault +
				'</div>';
			if (document.querySelector('.brokenRefs')) {
				document.querySelector('.brokenRefs').innerHTML = wrapper;
			} else {
				$('.hiddencats').before( $('<div id="brokenRefs" class="brokenRefs">' + wrapper + '</div>') );
			}
			var toggler = document.querySelector('.brokenRefs .mw-editfooter-toggler');
			document.querySelector('.mw-brokenRefsExplanation').addEventListener('click', function (event) {
				if (document.querySelector('.brokenRefs .mw-icon-arrow-collapsed')) {
					toggler.classList.add('mw-icon-arrow-expanded');
					toggler.classList.remove('mw-icon-arrow-collapsed');
					document.querySelector('.brokenRefs .brokenRefsList').style.display = '';
					document.querySelector('.brokenRefsResetter-wrapper').style.display = '';
				} else {
					toggler.classList.add('mw-icon-arrow-collapsed');
					toggler.classList.remove('mw-icon-arrow-expanded');
					document.querySelector('.brokenRefs .brokenRefsList').style.display = 'none';
					document.querySelector('.brokenRefsResetter-wrapper').style.display = 'none';
				}
				if (!document.querySelector('.brokenRefs .brokenRefsList.listLoaded')) {
					document.querySelector('.brokenRefs .brokenRefsList').classList.add('listLoaded');
					refRevision.parseCurrent($('#wpTextbox1').textSelection('getContents'));
				}
			});
		},
		initView: function () {
			if (document.querySelector('.brokenRefs')) {
				document.querySelector('.brokenRefs').classList.add('wds-is-collapsed');
				var list = document.querySelector('.brokenRefsList');
				list.classList.remove('listLoaded');
				list.innerHTML = loadingDefault;
			} else {
				$('.page-footer > .license-description').before(
					$(
						'<div id="brokenRefs" class="brokenRefs wds-collapsible-panel page-footer__references wds-is-collapsed">' +
							'<header class="wds-collapsible-panel__header" aria-controls="collapsible-content-references" aria-expanded="false">References<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-menu-control-small"></use></svg></header>' +
							'<div class="wds-collapsible-panel__content" id="collapsible-content-references">' +
								'<nav id="articleReferences" class="article-references">' +
									'<div id="reflinks" class="reflinks" data-mw="interface"><div id="mw-normal-reflinks" class="mw-normal-reflinks">' +
										'<small class="brokenRefsResetter-wrapper"><i>Click <a class="brokenRefsResetter" href="#brokenRefs">here</a> to reset the checker</i></small>' +
										'<div class="brokenRefsList">' +
											loadingDefault +
										'</div>' +
									'</div></div>' +
								'</nav>' +
							'</div>' +
						'</div>'
					)
				);
			}
			function startCheck() {
				api
					.get({
						action: 'query',
						prop: 'revisions',
						titles: config.wgPageName,
						rvslots: '*',
						rvprop: 'content',
					})
					.then(function (data) {
						var page_content = data.query.pages[config.wgArticleId].revisions[0].slots.main['*'];
						refRevision.parseCurrent(page_content);
					});
			}
			document.querySelector('.brokenRefs').addEventListener('click', function (event) {
				if (!document.querySelector('.brokenRefs .brokenRefsList.listLoaded')) {
					document.querySelector('.brokenRefs .brokenRefsList').classList.add('listLoaded');
					startCheck();
				}
			});
		},
		renderList: function () {
			console.log(refs);
			var list = '';
			if (Object.keys(refs._conflicts).length > 0) {
				var header = false;
				Object.keys(refs._conflicts).forEach(function (group) {
					if (Object.keys(refs._conflicts[group]).length > 0) {
						if (!header) {
							header = true;
							list += '<h2>Conflicting Initializations</h2>';
						}
						list += '<h3>' + (group == '_default' ? 'Ungrouped' : group) + '</h3><ul>';
						Object.keys(refs._conflicts[group]).forEach(function (name) {
							list += '<li>' + name + ':<ul>';
							refs._conflicts[group][name].forEach(function (conflict) {
								list += '<li>In <a href=/wiki/"' + conflict.page + '">' + conflict.page + '</a>: <code>' + conflict.content + '</code></li>';
							});
							list += '</ul></li>';
						});
						list += '</ul>';
					}
				});
			}
			if (Object.keys(refs._undefined).length > 0) {
				var header = false;
				Object.keys(refs._undefined).forEach(function (group) {
					if (Object.keys(refs._undefined[group]).length > 0) {
						if (!header) {
							header = true;
							list += '<h2>Uninitialized Callbacks</h2>';
						}
						list += '<h3>' + (group == '_default' ? 'Ungrouped' : group) + '</h3><ul>';
						Object.keys(refs._undefined[group]).forEach(function (name) {
							var _pagelist = [];
							refs._undefined[group][name].forEach(function (_page) {
								_pagelist.push('<a href=/wiki/"' + _page + '">' + _page + '</a>');
							});
							list += '<li>' + name + ': ' + _pagelist.join(', ') + '</li>';
						});
						list += '</ul>';
					}
				});
			}
			if (list == '') {
				list = 'No broken references detected. Good job!';
			}
			document.querySelector('.brokenRefsList').innerHTML = list;
		},
		parseCurrent: function (page_content) {
			if (/\{\{Transclude\s*\|[^\}]+?\}\}/.test(page_content)) {
				// Get transclusions
				page_content.match(/\{\{Transclude\s*\|[^\}]+?\}\}/g).forEach(function (str) {
					var _a = str.replace(/\{\{Transclude\s*\|/, '').replace(/\}\}$/, '').split('|');
					_a.forEach(function(param){
						if (/=/.test(param)) {
							if (/^\s*1\s*=/.test(param)) {page = param;}
							else if (/^\s*2\s*=/.test(param)) {section = param;}
							else if (/^\s*section\s*=/.test(param)) {tag = true;}
						} else {
							if (!page) {page = param;}
							else if (!section) {section = param;}
						}
					});
					var page, section, tag;
					refs._pages[page] = refs._pages[page] || {
						title: page,
						sections: [],
						tags: []
					};
					refs._pages._list.push(page);
					if (tag) {refs._pages[page]['tags'].push(section);}
					else {refs._pages[page].sections.push(section);}
					
				});
			}

			// Get references
			refRevision.parseReferences(page_content, config.wgPageName);
			if (refs._pages._list.length > 0) {
				var _t = 0;
				for (var i = 0; i < refs._pages._list.length; i = i + 49) {
					var _page = refs._pages._list.slice(i, i + 49);
					api
						.get({
							action: 'query',
							prop: 'revisions',
							titles: _page,
							rvslots: '*',
							rvprop: 'content',
						})
						.then(function (data) {
							if (data?.query?.pages && Object.keys(data.query.pages).length > 0) {
								Object.keys(data.query.pages).forEach(function (id) {
									if (data.query.pages?.[id]?.revisions?.[0]?.slots?.main?.['*']) {
										var pageName = data.query.pages[id].title;
										var split = refRevision.splitSections(data.query.pages[id].revisions[0].slots.main['*'], pageName);
										console.log(refs._pages[pageName], 'refs._pages[pageName]')
										console.log(split, 'split')
										refs._pages[pageName].sections.forEach(function (name) {
											if (split.sections?.[name]?.length > 0) {
												refRevision.parseReferences(split.sections[name], pageName);
											}
										});
										refs._pages[pageName]['tags'].forEach(function (name) {
											if (split['tags']?.[name]?.length > 0) {
												refRevision.parseReferences(split['tags'][name], pageName);
											}
										});
									}
								});
								_t++;
							}
						});
				}
				function waitforPages() {
					if (_t >= Math.ceil((refs._pages._list.length - 1) / 50)) {
						refRevision.findUndefined();
						refRevision.renderList();
					} else {
						setTimeout(waitforPages, 500);
					}
				}
				setTimeout(waitforPages, 500);
			} else {
				refRevision.findUndefined();
				refRevision.renderList();
			}
		},
		parseReferences: function (page_content, page) {
			// Parse initializers
			if (/<ref\s*[^\/>]*?>[\s\S]+?<\/ref>/.test(page_content)) {
				page_content.match(/<ref\s*[^\/>]*?>[\s\S]+?<\/ref>/g).forEach(function (str) {
					var _a = /<ref\s*([^\/>]*?)>([\s\S]+?)<\/ref>/.exec(str);
					var settings = { group: '_default' };
					if (_a[1].length > 0 && /\w[\w\s]*\s*=\s*".+?"/.test(_a[1])) {
						_a[1].match(/\w[\w\s]*\s*=\s*".+?"/g).forEach(function (sett) {
							var _b = /(\w[\w\s]*)\s*=\s*"(.+?)"/.exec(sett);
							if (_b[1].length > 0 && _b[2].length > 0) {
								settings[_b[1]] = _b[2];
							}
						});
						if (settings.name) {
							refs[settings.group] = refs[settings.group] || {};
							refs._conflicts[settings.group] = refs._conflicts[settings.group] || {};
							if (refs[settings.group][settings.name] && refs[settings.group][settings.name].content !== _a[2].trim()) {
								refs._conflicts[settings.group][settings.name] = refs._conflicts[settings.group][settings.name] || [refs[settings.group][settings.name]];
								refs._conflicts[settings.group][settings.name].push({
									name: settings.name,
									group: settings.group,
									content: _a[2].trim(),
									page: page,
								});
							} else {
								refs[settings.group][settings.name] = {
									name: settings.name,
									group: settings.group,
									content: _a[2].trim(),
									page: page,
								};
							}
						}
					}
				});
			}

			// Parse callbacks
			if (/<ref\s*[^\/>]*?\/>/.test(page_content)) {
				page_content.match(/<ref\s*[^\/>]*?\/>/g).forEach(function (str) {
					var _a = /<ref\s*([^\/>]*?)\/>/.exec(str);
					var settings = { group: '_default' };
					if (_a[1].length > 0 && /\w[\w\s]*\s*=\s*".+?"/.test(_a[1])) {
						_a[1].match(/\w[\w\s]*\s*=\s*".+?"/g).forEach(function (sett) {
							var _b = /(\w[\w\s]*)\s*=\s*"(.+?)"/.exec(sett);
							if (_b[1].length > 0 && _b[2].length > 0) {
								settings[_b[1]] = _b[2];
							}
						});
						if (settings.name) {
							refs[settings.group] = refs[settings.group] || {};
							refs._callbacks.push({
								name: settings.name,
								group: settings.group,
								page: page,
							});
						}
					}
				});
			}
		},
		splitSections: function (str, page) {
			var sorted = {
				sections: {},
				tags: {}
			};
			str = str.replace(/<!--[\s\S]*?-->/g, '');
			if (/<section/.test(str)) {
				str.match(/<section.*?begin=".*?".*?\/\s*>[\s\S]*?<section.*?end=".*?".*?\/\s*>/g).forEach(function(group){
					var _a = /<section.*?begin="(.*?)".*?\/\s*>([\s\S]*?)<section.*?end=".*?".*?\/\s*>/.exec(group);
					if (_a[1]?.length>0 && _a[2]?.length>0) {
						sorted['tags'][_a[1]] = _a[2];
					}
				});
			}
			str = str.replace(/^[\s\S]*?==/, '==');
			function split(content, level) {
				var indexes = [];
				content.replace(RegExp('='.repeat(level) + '[^=]+' + '='.repeat(level), 'g'), function (a, b) {
					indexes.push(b);
				});
				indexes.forEach(function (curr, index) {
					var _s = RegExp('\\s*' + '='.repeat(level) + '([^=]+)' + '='.repeat(level) + 's*([\\s\\S]+)s*$', 'g').exec(content.substring(curr, indexes[index + 1] ? indexes[index + 1] : undefined));
					if (_s && _s[1].length > 0 && _s[2]) {
						sorted.sections[_s[1]] = _s[2];
						if (_s[2].length > 0) {
							split(_s[2], level + 1);
						}
					}
				});
			}
			split(str, 2);
			return sorted;
		},
		findUndefined: function () {
			refs._callbacks.forEach(function (callback) {
				if (!refs?.[callback.group]?.[callback.name]) {
					refs._undefined[callback.group] = refs._undefined[callback.group] || {};
					refs._undefined[callback.group][callback.name] = refs._undefined[callback.group][callback.name] || [];
					if (refs._undefined[callback.group][callback.name].indexOf(callback.page) == -1) {
						refs._undefined[callback.group][callback.name].push(callback.page);
					}
				}
			});
		}
	};
	mw.loader.using('mediawiki.api').then(function () {
		window.dev.refRevision_Loaded = true;
		if ([2, 0].includes(config.wgNamespaceNumber)) {
			api = new mw.Api();
			var style = document.createElement('style');
			style.innerHTML =
				'.brokenRefs ul { margin: 6px 0 6px 36px; list-style-type: disc; } ' +
				'.brokenRefs :is(h2, h3) { margin: .5em 0 .2em; font-size: 18px; font-weight: 500; overflow: initial; font-family: var(--theme-page	-headings-font),rubik,helvetica,arial,sans-serif; line-height: 1.25; overflow-wrap: break-word; } ' +
				'.brokenRefs h3 { font-size: 18px; } ' +
				'.brokenRefs h2 { font-size: 24px; padding: 6px 0; } ';
			document.body.append(style);
			refRevision.init();
			document.addEventListener('click', function(event){
				if (event.target.classList.contains('brokenRefsResetter')) {
					refRevision.init();
				}
			});
		}
	});
});