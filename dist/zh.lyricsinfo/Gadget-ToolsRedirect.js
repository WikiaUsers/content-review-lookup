// <nowiki>

'use strict';
(function ($) {
	var nsNumber = mw.config.get('wgNamespaceNumber'),
		origPageName = mw.config.get('wgPageName'),
		scriptPath = mw.config.get('wgScriptPath');

	var SUFFIX_APPEND = 0,
		SUFFIX_REPLACE = 1,
		SUFFIX_SETDEFAULT = 2,
		isCategory = nsNumber === 14;

	if (nsNumber === -1) {
		var chainNoop = function () { return this; };
		var noop = function () {};
		mw.toolsRedirect = {
			SUFFIX_APPEND,
			SUFFIX_REPLACE,
			SUFFIX_SETDEFAULT,
			findRedirectCallback: chainNoop,
			findRedirectBySelector: chainNoop,
			setRedirectTextSuffix: noop
		};
		return;
	}

	var _TR,
		_findRedirectCallbacks = [],
		_pageWithRedirectTextSuffix = {},
		_redirectExcludes = {};
	var _nsCanonPrefix = origPageName.split(':')[0] + ':',
		_nsPrefixPattern = $.map(mw.config.get('wgNamespaceIds'), function (nsid, text) {
			return nsid === nsNumber ? text : null;
		}).join('|');
	_nsPrefixPattern = new RegExp('^(' + _nsPrefixPattern + '):', 'i');

	if (nsNumber === 0) {
		// articles
		_nsCanonPrefix = '';
		_nsPrefixPattern = /^/;
	}

	function fixNamespace(title) {
		if (nsNumber === 0) {
			// do nothing if it's articles
			return title;
		} else if (_nsPrefixPattern.test(title)) {
			// canonize the namespace
			return title.replace(_nsPrefixPattern, _nsCanonPrefix);
		} else {
			// don't have a namespace
			return _nsCanonPrefix + title;
		}
	}

	mw.toolsRedirect = {
		SUFFIX_APPEND: SUFFIX_APPEND,
		SUFFIX_REPLACE: SUFFIX_REPLACE,
		SUFFIX_SETDEFAULT: SUFFIX_SETDEFAULT,

		findRedirectCallback: function (callback) {
			/* Add new custom callback for finding new
			 * potential redirect titles.
			 *
			 * @param {function} callback( pagename, $content, titles ) -> title list
			 */
			if (arguments.length === 1) {
				_findRedirectCallbacks.push(callback);
			} else {
				$.merge(_findRedirectCallbacks, arguments);
			}
			return this;
		},

		findRedirectBySelector: function (selector) {
			/* A shortcut to add CSS selectors as rule to find new potential
			 * redirect titles.
			 *
			 * @param {string} selector
			 */
			_findRedirectCallbacks.push(function () {
				return $(selector).map(function () {
					var title = $(this).text();
					return title || null;
				});
			});
			return this;
		},

		setRedirectTextSuffix: function (title, suffix, flag) {
			var flag_set = false,
				flag_append = false;
			flag = flag || SUFFIX_APPEND; // default append
			flag_set = flag === SUFFIX_REPLACE;
			title = fixNamespace(title);
			if (title in _pageWithRedirectTextSuffix) {
				flag_append = flag === SUFFIX_APPEND;
			} else {
				// if not exist, every flag can set
				flag_set = true;
			}

			if (flag_set) {
				_pageWithRedirectTextSuffix[title] = suffix;
			} else if (flag_append) {
				_pageWithRedirectTextSuffix[title] = _pageWithRedirectTextSuffix[title] + suffix;
			}
		},
	};

	_TR = {
		msg: null,
		tabselem: null,
		tagselem: null,
		variants: ['zh-hans', 'zh-hant', 'zh-cn', 'zh-hk', 'zh-mo', 'zh-sg', 'zh-tw'],
		init: function () {
			if (!this.msg) {
				return;
			} // not setup correctly
			var self = this,
				btn = $(mw.util.addPortletLink('p-views', '#', this.msg.btntitle, 'ca-redirect', this.msg.btndesc, null, '#ca-watch')).addClass('collapsible').css('cursor', 'pointer');
			btn.click(function (evt) {
				evt.preventDefault();
				self.dialog();
			});
			mw.config.get('skin') === 'vector-2022' ? $('#p-cactions ul').append(btn) : $('li#ca-history').after(btn);
		},
		dialog: function () {
			var dlg = $('<div class="dialog-redirect" title="' + this.msg.dlgtitle + '">').dialog({
				bgiframe: true,
				resizable: false,
				modal: true,
				width: 600,
			});
			this.tabselem = $('<div class="tab-redirect">').appendTo(dlg);
			this.tagselem = $('<ul>').appendTo(this.tabselem);
			this.addTabs();
			this.tabselem.tabs();
		},
		addTabs: function () {
			for (var kname in this.tabs) {
				if (this.tabs[kname] === null) {
					this.tabs[kname] = this['_initTab' + kname[0].charAt(0).toUpperCase() + kname.slice(1)]();
				}
				var tab = this.tabs[kname];
				this.tagselem.append(tab.tag);
				this.tabselem.append(tab.cont);
			}
			// default tab, autoload when dialog initiate
			this.loadView();
		},
		createTab: function (tabname, tabtitle, onClick) {
			var self = this,
				tag = $('<li><a href="#tab-' + tabname + '">' + tabtitle + '</a></li>'),
				cont = $('<div id="tab-' + tabname + '"/>');
			$('a', tag).on('click', function () {
				onClick.call(self);
			});
			return {tag: tag, cont: cont, loaded: false};
		},
		_initTabView: function () {
			return this.createTab('view', this.msg.tabviewtitle, this.loadView);
		},
		_initTabCreate: function () {
			return this.createTab('create', this.msg.tabcreatetitle, this.loadCreate);
		},
		tabs: {
			view: null,
			create: null,
		},
		fix: function (pagenames) {
			var self = this;
			$('p.desc', this.tabs.view.cont).text(this.msg.fixloading);
			$('p[class!=desc]', this.tabs.view.cont).remove();
			this.loading(this.tabs.view.cont);
			this.bulkEditByRegex(pagenames, / \[\[.*?\]\]/, ' [['+origPageName+']]', this.msg.fixsummary).done(function () {
				// delay load before the asynchronous tasks on server finished
				setTimeout(function () {
					self.loaded(self.tabs.view.cont);
					self.loadView(true);
				}, 3000);
			});
		},
		create: function (pagenames) {
			var self = this;
			$('p.desc', this.tabs.create.cont).text(this.msg.createloading);
			$('p[class!=desc]', this.tabs.create.cont).remove();
			this.loading(this.tabs.create.cont);
			this.bulkEdit(pagenames, this.msg.createtext.replace('$1', origPageName), this.msg.createsummary.replace('$1', origPageName)).done(function () {
				// delay load before the asynchronous tasks on server finished
				setTimeout(function () {
					self.loaded(self.tabs.create.cont);
					self.tabs.view.loaded = false;
					self.loadCreate(true);
				}, 500);
			});
		},
		addRedirectTextSuffix: function (title, text) {
			if (title in _pageWithRedirectTextSuffix) {
				text = text + _pageWithRedirectTextSuffix[title];
			}
			return text;
		},
		bulkEdit: function (titles, text, summary) {
			var self = this;
			titles = titles.filter(function (v, i, arr) {
				return arr.indexOf(v) === i;
			});
			titles = titles.join('|');
			return $.ajax(this.buildQuery({action: 'query', prop: 'info', titles: titles, meta: 'tokens'})).then(function (data) {
				var deferreds = [];
				$.each(data.query.pages, function (idx, page) {
					deferreds.push(
						$.ajax(
							self.buildQuery({
								action: 'edit',
								title: page.title,
								token: data.query.tokens.csrftoken,
								text: self.addRedirectTextSuffix(page.title, text),
								summary: summary,
								tags: 'ToolsRedirect',
							})
						)
					);
				});
				return $.when.apply($, deferreds);
			});
		},
		bulkEditByRegex: function (titles, r, t, summary) {
			var self = this;
			titles = titles.filter(function (v, i, arr) {
				return arr.indexOf(v) === i;
			});
			titles = titles.join('|');
			return $.ajax(this.buildQuery({ action: 'query', prop: 'revisions', titles: titles, rvprop: 'content', meta: 'tokens' })).then(function (data) {
				var deferreds = [];
				$.each(data.query.pages, function (idx, page) {
					var content = page.revisions[0]['*'];
					var newContent = content.replace(r, t);
					deferreds.push(
						$.ajax(
							self.buildQuery({
								action: 'edit',
								title: page.title,
								token: data.query.tokens.csrftoken,
								text: newContent,
								summary: summary,
								tags: 'ToolsRedirect',
								basetimestamp: page.revisions[0].timestamp,
							})
						)
					);
				});
				return $.when.apply($, deferreds);
			});
		},
		loadTabCont: function (tabname, callback, reload) {
			var self = this,
				tab = this.tabs[tabname];
			if (reload) {
				tab.loaded = false;
			}
			if (!tab.loaded) {
				tab.cont.html('');
				var $desc = $('<p class="desc"><span class="desc-text">' + this.msg.rediloading + '</span></p>').appendTo(tab.cont),
					$text = $desc.find('> .desc-text');
				callback
					.apply(this)
					.done(function () {
						$text.text(self.msg['tab' + tabname + 'desc']);
					})
					.fail(function () {
						$text.text(self.msg['tab' + tabname + 'notfound']);
					})
					.always(function () {
						self.addMethods($desc, [
							{
								href: '#refresh',
								title: self.msg.refresh,
								click: function (evt) {
									evt.preventDefault();
									self.loadTabCont(tabname, callback, true);
								},
							},
						]);
					});
				tab.loaded = true;
			}
		},
		loading: function (container) {
			if (container.prop('tagName').toLowerCase() === 'span') {
				container.addClass('mw-ajax-loader');
			} else if ($('span.mw-ajax-loader', container).length === 0) {
				$('<span class="mw-ajax-loader"></span>').appendTo(container);
			}
		},
		loaded: function (container) {
			if (container.prop('tagName').toLowerCase() === 'span') {
				container.removeClass('mw-ajax-loader');
			} else {
				$('span.mw-ajax-loader', container).remove();
			}
		},
		selectAll: function (cont) {
			$('input[type=checkbox]:not(:disabled)', cont).prop('checked', true);
		},
		selectInverse: function (cont) {
			$('input[type=checkbox]:not(:disabled)', cont).each(function () {
				var e = $(this);
				e.prop('checked', !e.prop('checked'));
			});
		},
		selectAction: function (cont, cb) {
			var pagenames = [];
			$('input[type=checkbox]:checked', cont).each(function () {
				pagenames.push($(this).data('page-title'));
			});
			if (pagenames.length) {
				cb.call(this, pagenames);
			}
		},
		clickAction: function (cont, cb) {
			var pagename = $('input[type="checkbox"]', cont).data('page-title');
			cb.call(this, [pagename]);
		},
		buildLink: function (attr) {
			var a = $('<a href="' + attr.href + '" title="' + attr.title + '" target="blank">' + attr.title + '</a>');
			if (attr.click) {
				a.on('click', attr.click);
			}
			if (attr.classname) {
				a.addClass(attr.classname);
			}
			return $('<span class="tools-redirect_link">').append(a);
		},
		addMethods: function ($parent, methods) {
			var self = this,
				$container = $parent.find('> .tools-redirect_methods');

			function methodExist(method) {
				return $container.find('a[href=' + JSON.stringify(method.href) + ']').length > 0;
			}

			if ($container.length === 0) {
				$container = $('<span class="tools-redirect_methods">').appendTo($parent);
			}

			$.each(methods, function (idx, method) {
				if (!methodExist(method)) {
					self.buildLink(method).appendTo($container);
				}
			});
		},
		buildSelection: function (main, metd, mt, dsab) {
			var cont = $('<span>'),
				sele = $('<input type="checkbox"/>').appendTo(cont);
			this.buildLink(main).appendTo(cont);
			this.addMethods(cont, metd);
			sele.data('page-title', mt);
			if (dsab) {
				sele.attr('disabled', true);
			}
			return cont;
		},
		loadView: function (reload) {
			var $container = this.tabs.view.cont;
			this.loadTabCont(
				'view',
				function () {
					return this.loadRedirect(origPageName, $container, 0);
				},
				reload
			);
		},
		loadCreate: function (reload) {
			this.loadTabCont(
				'create',
				function () {
					return this.findRedirect(origPageName);
				},
				reload
			);
		},
		loadRedirect: function (pagename, container, deep, loaded) {
			this.loading(container);
			var self = this,
				deferObj = $.Deferred(),
				top = deep ? $('<dl>').appendTo(container) : container;

			if (!loaded) {
				loaded = {};
				loaded[pagename] = true;
			}

			function onClickFix(evt) {
				/* jshint validthis: true */
				var entry = $(this).parents('dd, p').first();
				evt.preventDefault();
				self.clickAction(entry, self.fix);
			}

			$.ajax(this.buildQuery({action: 'query', prop: 'redirects', titles: pagename, rdlimit: 'max'})).done(function (data) {
				self.loaded(container);
				var has_redirect = false,
					desc = $('p.desc', self.tabs.view.cont),
					maximumRedirectDepth = mw.config.get('toolsRedirectMaximumRedirectDepth', 10);

				$.each(data.query.pages, function (_, page) {
					if (!('redirects' in page)) {
						return;
					}
					$.each(page.redirects, function (_, rdpage) {
						var $container,
							isCycleRedirect,
							rdtitle = rdpage.title,
							ultitle = rdtitle.replace(/ /g, '_'),
							baseuri = scriptPath + '/index.php?title=' + encodeURIComponent(ultitle),
							entry = (deep ? $('<dd>') : $('<p>')).appendTo(top),
							methods = [
								{
									href: baseuri + '&action=edit',
									title: self.msg.rediedit,
								},
							];
						isCycleRedirect = rdtitle in loaded;
						loaded[rdtitle] = true;
						if (!isCycleRedirect && deep) {
							methods.push({
								href: '#fix-redirect',
								title: self.msg.tabviewfix,
								click: onClickFix,
							});
						}
						$container = self.buildSelection({href: baseuri + '&redirect=no', title: rdtitle}, methods, ultitle, !deep).appendTo(entry);
						if (isCycleRedirect) {
							$container.append('<span class="error">' + self.msg.errcycleredirect + '</span>');
						} else if (deep < maximumRedirectDepth) {
							deferObj.done(function () {
								return self.loadRedirect(rdtitle, entry, deep + 1, loaded);
							});
						}
						has_redirect = true;
					});
				});

				if (has_redirect && deep === 1) {
					self.addMethods(desc, [
						{
							href: '#select-all',
							title: self.msg.selectall,
							click: function (evt) {
								evt.preventDefault();
								self.selectAll(self.tabs.view.cont);
							},
						},
						{
							href: '#select-inverse',
							title: self.msg.selectinverse,
							click: function (evt) {
								evt.preventDefault();
								self.selectInverse(self.tabs.view.cont);
							},
						},
						{
							href: '#fix-selected',
							title: self.msg.tabviewfix,
							click: function (evt) {
								evt.preventDefault();
								self.selectAction(self.tabs.view.cont, self.fix);
							},
						},
					]);
				}

				if (has_redirect) {
					deferObj.resolveWith(self);
				} else {
					deferObj.rejectWith(self);
				}
			});

			return deferObj.promise();
		},
		findVariants: function (pagename, titles) {
			var self = this,
				suffixReg = /^.+?( \(.+?\))$/,
				retTitles = [],
				deferreds = [],
				simpAndTrad = {'zh-hans': true, 'zh-hant': true};
			$.each(this.variants, function (_, variant) {
				var xhr = $.ajax(
					self.buildQuery({
						action: 'parse',
						page: pagename,
						prop: 'displaytitle',
						variant: variant,
					})
				).then(function (data) {
					var title = fixNamespace(data.parse.displaytitle);
					if (variant in simpAndTrad) {
						mw.toolsRedirect.setRedirectTextSuffix(title, '\n{{簡繁重定向}}', SUFFIX_APPEND);
					}
					return title;
				});
				if (isCategory) {
					xhr = xhr.then(function (origTitle) {
						return $.ajax(
							self.buildQuery({
								action: 'parse',
								text: pagename,
								prop: 'text',
								variant: variant,
							})
						).then(function (data) {
							var tmpTitle = $(data.parse.text['*'])
								.text()
								.replace(/(^\s*|\s*$)/g, '');
							// should not create redirect categories
							// if the conversion is already in global table,
							// or it will mess up a lot
							_redirectExcludes[tmpTitle] = true;
							return origTitle;
						});
					});
				}
				deferreds.push(xhr);
			});
			return $.when.apply($, deferreds).then(function () {
				var suffixes = [];
				$.each(arguments, function () {
					var suffix,
						title = this;
					// find title suffix,
					// for example " (济南市)" to "市中区 (济南市)"
					suffix = suffixReg.exec(title);
					if (suffix && suffix.length === 2) {
						suffix = suffix[1];
					} else {
						suffix = '';
					}
					retTitles.push(title);
					suffixes.push(suffix);
				});
				// append suffixes
				$.each($.uniqueSort(suffixes), function (_, suffix) {
					$.merge(
						retTitles,
						$.map(titles, function (title) {
							title = fixNamespace(title);
							return suffixReg.test(title) ? title : title + suffix;
						})
					);
				});
				return self.findNotExists($.uniqueSort(retTitles));
			});
		},

		findNotExists: function (titles) {
			var self = this,
				deferreds = [],
				alltitles = [],
				excludes = ['用字模式'];
			titles = titles.join('|');
			$.each(['zh-hans', 'zh-hant'], function (idx, variant) {
				deferreds.push($.ajax(self.buildQuery({action: 'parse', text: titles, prop: 'text', variant: variant})));
			});
			return $.when.apply($, deferreds).then(function () {
				$.each(arguments, function () {
					alltitles = alltitles.concat(
						$(this[0].parse.text['*'])
							.text()
							.replace(/(^\s*|\s*$)/g, '')
							.split('|')
					);
				});
				alltitles = alltitles.filter(function (v, i, arr) {
					return arr.indexOf(v) === i;
				});
				alltitles = alltitles.join('|');
				return $.ajax(
					self.buildQuery({
						action: 'query',
						prop: 'info',
						titles: alltitles,
					})
				).then(function (data) {
					titles = [];
					$.each(data.query.pages, function (pageid, page) {
						var title = page.title;
						if (pageid < 0 && excludes.indexOf(title) === -1) {
							if (title in _redirectExcludes) {
								// exclude special titles
								return;
							}
							titles.push(title);
							if (isCategory) {
								var target = origPageName.replace(/^Category:/, '');
								mw.toolsRedirect.setRedirectTextSuffix(title, '\n{{分类重定向|$1}}'.replace('$1', target));
							}
							// only set default suffix
							mw.toolsRedirect.setRedirectTextSuffix(title, '\n{{別名重定向}}', SUFFIX_SETDEFAULT);
						}
					});
					return titles;
				});
			});
		},

		findRedirect: function (pagename) {
			var self = this,
				titles = [],
				frcDeferreds = [],
				container = this.tabs.create.cont,
				$content = $('#mw-content-text > div.mw-parser-output'),
				deferObj = $.Deferred();
			this.loading(container);
			$.each(_findRedirectCallbacks, function (_, callback) {
				var ret = callback(pagename, $content, titles);
				if (typeof ret === 'string') {
					titles.push(ret);
				} else if ('done' in ret) {
					// is Deferred
					frcDeferreds.push(ret);
				} else {
					$.merge(titles, ret);
				}
			});
			// remove all empty titles
			titles = $.map(titles, function (title) {
				return title || null;
			});
			function onClickCreate(evt) {
				/* jshint validthis: true */
				var entry = $(this).parents('p:first');
				evt.preventDefault();
				self.clickAction(entry, self.create);
			}
			// handles the deferred callbacks
			$.when
				.apply($, frcDeferreds)
				.then(function () {
					$.each(arguments, function (_, ret) {
						if (typeof ret === 'string') {
							titles.push(ret);
						} else {
							$.merge(titles, ret);
						}
					});
					return self.findVariants(pagename, titles);
				})
				.done(function (titles) {
					// build HTML
					self.loaded(container);
					$.each(titles, function (_, title) {
						var ultitle = title.replace(' ', '_'),
							baseuri = scriptPath + '/index.php?title=' + encodeURIComponent(ultitle),
							entry = $('<p>').appendTo(container);
						self.buildSelection(
							{
								href: baseuri + '&action=edit&redlink=1',
								title: title,
								classname: 'new',
							},
							[
								{
									href: '#create-redirect',
									title: self.msg.tabcreatetitle,
									click: onClickCreate,
								},
							],
							ultitle,
							false
						).appendTo(entry);
					});
					var desc = $('p.desc', container);
					if (titles.length > 0) {
						self.addMethods(desc, [
							{
								href: '#select-all',
								title: self.msg.selectall,
								click: function (evt) {
									evt.preventDefault();
									self.selectAll(container);
								},
							},
							{
								href: '#select-inverse',
								title: self.msg.selectinverse,
								click: function (evt) {
									evt.preventDefault();
									self.selectInverse(container);
								},
							},
							{
								href: '#create-selected',
								title: self.msg.tabcreatetitle,
								click: function (evt) {
									evt.preventDefault();
									self.selectAction(container, self.create);
								},
							},
						]);
						deferObj.resolveWith(self, [titles]);
					} else {
						deferObj.rejectWith(self, [titles]);
					}
				});
			return deferObj.promise();
		},
		buildQuery: function (data) {
			var query = {url: scriptPath + '/api.php', dataType: 'json', type: 'POST'};
			query.data = data;
			query.data.format = 'json';
			return query;
		},
	};
	$.when(mw.loader.getScript('/w/index.php?title=MediaWiki:Gadget-ToolsRedirect-msg-' + wgULS('zh-hans', 'zh-hant') + '.js&action=raw&ctype=text/javascript'), $.ready).done(function () {
		_TR.msg = window.tools_redirect_msg;
		_TR.init();
	});
})(jQuery);

// </nowiki>