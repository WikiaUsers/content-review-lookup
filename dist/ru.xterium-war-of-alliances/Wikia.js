/* By GodRich 28.03.2018 */

var Warframe = function g($$, window, document, Object, Math, Date, RegExp, Array, JSON) {
	//g._ — storage
	//$ — this (for g.main);
	//g — global;
	//$$ — Gabriel
	//Current context = g;
	this.logError = function(exception) {
		var t = $$(document.body),
			x,
			text = '<div class="_js-error"><div class="_js-error_title">JavaScript error</div><div class="_js-error_exception">' + exception + '</div></div>';
		if ((x = t.find('._js-error')).length) {
			x.remove();
		}
		t.append(text).find('._js-error').on({
			mouseenter: function() {
				$$(this).remove();
			}
		});
		return exception;
	};
	if (!(this.mw = window.mw || window.mediaWiki)) {
		$$.isFunction(window.alert), (this.alert = window.alert) && this.alert('Переменные mediaWiki не обнаружены; Не могу продолжить');
		return;
	}
	this.log = (function(console) {
		try {
			return $$.isFunction(console.log) ? function() {
				console.log.apply(console, arguments);
			} : $$.fn;
		} catch (e) {
			return $$.fn;
		}
	})(window.console);
	this._ = {};
	this.delay = function() {
		return window.setTimeout.apply(window, arguments);
	};
	this.delay.clear = function() {
		return window.clearTimeout.apply(window, arguments);
	};
	this.interval = function interval() {
		return window.setInterval.apply(window, arguments);
	};
	this.interval.clear = function() {
		return window.clearInterval.apply(window, arguments);
	};
	this.ajaxonload = $$.createPrototype(function(params) {
		this.params = $$.extend({
			rewrite: false
		}, params, {
			action: 'prepend',
			bgcolor: '#fff',
			ajaximage: '//images.wikia.com/warframe/ru/images/0/05/Ajax.gif',
			onloadtext: 'Идёт загрузка...',
			fadeTime: 250,
			visible: true
		});
		if (!this.params.insertTo) {
			return;
		}
		if ($$.isNode(this.params.insertTo)) {
			this.params.insertTo = $$(this.params.insertTo);
		}
		this.target = this.params.insertTo[this.params.action]('<div class="ajax-onload"><div><img src="' + this.params.ajaximage + '" />' + ($$.isString(params.onloadtext) ? '<br /><span style="font-weight: 700;">' + this.params.onloadtext + '</span>' : '') + '</div></div>').find('.ajax-onload').first().style({
			backgroundColor: this.params.bgcolor
		});
		if (this.params.visible) {
			this.on();
		}
		return this;
	}, {
		on: function() {
			return this.target.fadeIn(this.params.fadeTime), this;
		},
		off: function() {
			return this.target.fadeOut(this.params.fadeTime), this;
		},
		setParam: function(pname, pvalue) {
			if (pname in this.params && pvalue) {
				this.params[pname] = pvalue;
			}
			return this;
		},
		destroy: function() {
			return this.target.remove();
		}
	});
	$$.delay = this.delay;
	$$.interval = this.interval;
	$$.log = this.log;
	g.scroll = function(q) {
		if (q) {
			$$('html, .WikiaSiteWrapper').removeClass('scroll-disabled');
		} else {
			$$('html, .WikiaSiteWrapper').addClass('scroll-disabled');
		}
	};
	$$.forEach(['wgUserName', 'wgPageName', 'wgUserGroups', 'wgAction', 'wgCanonicalSpecialPageName', 'wgTitle', 'wgIsMainPage', 'wgScript', 'wgArticlePath', 'wgArticleId', 'wgIsArticle', 'wgNamespaceNumber'], function(e) {
		this[e] = mw.config.get(e);
	}, this);
	this.wgEditToken = mw.user.tokens.get('editToken');
	this.urlparams = (function() {
		var url = window.decodeURIComponent(window.location.href),
			params = {};
		if (!!(~location.href.indexOf('?'))) {
			url = window.decodeURIComponent(window.location.href).match(/\?.+/).join().slice(1).split('&');
		} else {
			return params;
		}
		for (var i = 0; i < url.length; i++) {
			url[i] = url[i].split('=');
			params[url[i][0]] = url[i][1];
		}
		return params;
	})();
	this.main = $$.createPrototype(function() {
		$$.MediaWiki = {};
		$$.forEach(['raw', 'render'], function(e) {
			$$.MediaWiki[e] = function(page, cb) {
				if (!$$.isString(page) && !$$.isNumber(page)) {
					return;
				}
				$$.fetch('/index.php', {
					params: {
						action: e,
						title: page,
						cb: $$.keygen(),
						dataType: 'text'
					},
					method: 'GET'
				}).success(function(d) {
					$$.isFunction(cb) && cb(d);
				});
			};
		});
		$$.MediaWiki.block = function(name, time, cb) {
			if (!$$.isNumber(time) || !name) {
				return;
			}
			$$.fetch('/api.php', {
				params: {
					action: 'block',
					user: name,
					expiry: time === Infinity ? 'infinite' : time + ' days',
					reblock: true,
					autoblock: true,
					allowusertalk: true,
					nocreate: true,
					token: g.wgEditToken,
					format: 'json'
				},
				method: 'POST'
			}).complete(function(d) {
				$$.isFunction(cb) && cb(d);
			});
		};
		$$.MediaWiki.unblock = function(name, cb) {
			$$.fetch('/api.php', {
				params: {
					action: 'unblock',
					user: name,
					token: g.wgEditToken,
					format: 'json'
				},
				method: 'POST'
			}).complete(function(d) {
				$$.isFunction(cb) && cb(d && !d.error && true || false);
			});
		};
		$$.MediaWiki.wallmessage = function(title, text, to, cb) {
			if ([title, text, to].some(function(e) {
					return !e || (!$$.isString(e) && !$$.isNumber(e));
				})) {
				return;
			}
			$$.fetch('/wikia.php', {
				params: {
					controller: 'WallExternal',
					method: 'postNewMessage',
					format: 'json',
					convertToFormat: '',
					notifyeveryone: 0,
					messagetitle: title,
					pagenamespace: 1200,
					body: text,
					pagetitle: to,
					token: g.wgEditToken
				},
				method: 'POST'
			}).complete(function(d) {
				$$.isFunction(cb) && cb(d && d.status && true || false);
			});
		};
		$$.MediaWiki.purge = function() {
			return (window.location.href += ((window.location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge') + '&cb=' + $$.keygen()), true;
		};
		$$.MediaWiki.userinfo = function(name, cb) {
			if (!$$.isArray(name) && !$$.isString(name) && !$$.isNumber(name)) {
				return;
			}
			$$.isArray(name) ? (name = name.join('|')) : undefined;
			$$.fetch('/api.php', {
				params: {
					action: 'query',
					list: 'users',
					ususers: name,
					usprop: ['groups', 'blockinfo', 'rights', 'editcount', 'registration'].join('|'),
					format: 'json'
				}
			}).complete(function(d) {
				$$.isFunction(cb) && cb(d && !d.error && d.query || false);
			});
		};
		$$.MediaWiki.deletepage = function(page, reason, cb) {
			if (!page || !$$.isString(page)) {
				return;
			}
			$$.fetch('/api.php', {
				params: {
					action: 'delete',
					title: page,
					reason: reason,
					format: 'json',
					token: g.wgEditToken
				},
				method: 'POST'
			}).success(function(d) {
				$$.isFunction(cb) && cb(d);
			});
		};
		this.name = (function() {
			if ($$.inArray([2, 3, 500, 1200], g.wgNamespaceNumber)) {
				if (wgCanonicalNamespace == 'Блог_участника') {
					return g.wgTitle.split('/').shift();
				}
				return g.wgTitle;
			}
			if (g.wgNamespaceNumber == -1 && $$.inArray(['Following', 'Contributions'], g.wgCanonicalSpecialPageName)) {
				if (g.wgScript == window.location.pathname) {
					return g.urlparams.target || null;
				}
				if (g.wgCanonicalSpecialPageName == 'Following') {
					return $$('#UserProfileMasthead [itemprop="name"]').equal(0).text();
				}
				return window.decodeURIComponent(window.location.pathname.split('/').pop().replace(/_/g, ' ')) || null;
			}
			return null;
		})();
		$$(document).save(g._, 'document');
		$$(window).save(g._, 'window');
		$$(document.body).save(g._, 'body');
		$$('#mw-content-text').save(g._, 'articleContent');
		this.Invoke();
		this.Auto();
		this.Spoiler();
		this.ScrollTop();
		this.Tabbers(document);
		this.Mainpage();
		this.AjaxLastEdit([0, 6, 8, 10, 14, 15, 110, 111, 828, 829]);
		this.AjaxAutoRefresh(['Служебная:Watchlist', 'Служебная:WikiActivity', 'Служебная:RecentChanges', 'Служебная:Изображения', 'Служебная:Log']);
		this.AjaxBatchDelete();
		this.ProfileTags(this.InactiveUsers.bind(this, {
			months: 1,
			text: 'Неактивный участник'
		}, this.UserPoints.bind(this)));
		this.QuickTemplates();
		this.Timers();
		this.AjaxTooltips();
		this.AjaxCommentsDelete();
		this.Rewards();
		this.UserPointsHistory();
		return this;
	}, {
		Invoke: function Invoke(elem) {
			if (arguments[1] === Invoke) {
				return;
			}
			var $ = this,
				t = $$.isNode(elem) && $$(elem).find('div[data-invoke]') || $$.isGabriel(elem) && elem.find('div[data-invoke]') || $$('div[data-invoke]');
			!t.length ? undefined : (t.each(function(e) {
				var x = $$(e),
					a = x.attr('data-invoke');
				try {
					$[a].call($, e, Invoke);
				} catch (e) {
					g.logError(e);
					x.html('<span style="color:#d30000;">' + e + '</span>');
				}
			}));
		},
		Auto: function Auto() {
			if (arguments[1] === this.Invoke) {
				return;
			}
			var f,
				wme,
				tabs,
				cvr,
				$ = this;
			(f = $$('.WikiNav a[data-canonical="forum"]')).length && f.text('Обсуждения').attr('href', '/d/f');
			if (g.wgUserName && (wme = $$('#WikiHeader .WikiaMenuElement')).length) {
				wme.save(g._, 'wme');
				wme.append('<li><a href="/wiki/Участник:' + g.wgUserName + '/wikia.js">wikia.js</a></li><li><a href="/wiki/Участник:' + g.wgUserName + '/common.js">common.js</a></li><li><a href="/wiki/Участник:' + g.wgUserName + '/chat.js">chat.js</a></li><li><a href="/wiki/Участник:' + g.wgUserName + '/wikia.css">wikia.css</a></li><li><a href="/wiki/Участник:' + g.wgUserName + '/common.css">common.css</a></li><li><a href="/wiki/Участник:' + g.wgUserName + '/chat.css">chat.css</a></li><li><a href="/wiki/Служебная:MultipleUpload">Массовая загрузка</a></li>');
			}
			if ((g.wgArticleId !== 0 || g.wgIsMainPage) && g.wgAction != 'history' && !g.urlparams.diff && !g.urlparams.oldid) {
				$$('#WikiaPageHeader').append(' <a class="wikia-button purge secondary" style="' + ($$('#ShareEntryPoint').length ? 'margin: 2px 10px 0;' : '') + 'display: none" href="#"><span class="fa fa-refresh"></span></a>').find('.wikia-button.purge.secondary').click(function() {
					$$.MediaWiki.purge();
				});
				$$('#WikiaPageHeader > .wikia-button.purge.secondary').fadeIn(250);
			}
			if ((tabs = $$('#UserProfileMasthead + .tabs-container > ul.tabs')).length) {
				g.wgUserName && this.HTMLLivePad(null, tabs.append('<li data-id="sandbox"><a href="#">Песочница</a></li>').find('[data-id="sandbox"] a'));
			}
			if ((cvr = $$('#content-void-relics')).length) {
				var collection = cvr.find('#content-void-relics .void-relics > *');
				cvr.find('.find-relic').append('<input placeholder="Поиск..." />');
				cvr.find('.find-relic > input').on('input', function(event) {
					this.value = this.value.replace(/[\\_#\[\]()^$?=+.]/g, '');
					collection.hide();
					collection.each(function(e) {
						e = $$(e);
						if (e.match(new RegExp(this.value, 'gi'), true)) {
							e.show();
						}
					}, this);
				});
				cvr.fadeIn(250);
			}
			g.wgUserName && this.BugReport($$('.WikiaSiteWrapper'));
			var wnav;
			if ((wnav = $$('.WarframesNavigation')).length) {
				wnav.each(function(e) {
					e = $$(e);
					var awidth = g._.articleContent.width(),
						scrollVal,
						cells,
						buttonWidth = (e.attr('data-bwidth') || 25) * 2,
						cellWidth = (cells = e.find('.WarframesNavigation-image')).first().width(),
						cellsLength = cells.length,
						scrollTarget = e.find('.WarframesNavigation-contentWrapper'),
						scrollLim,
						currentScroll = 0,
						visibleCells;
					e.style('width', (scrollVal = awidth - (awidth % cellWidth) - buttonWidth) + 'px');
					scrollVal = scrollVal - (scrollVal % cellWidth);
					visibleCells = scrollVal / cellWidth;
					scrollLim = (cellsLength * cellWidth) - (visibleCells * cellWidth);
					e.find('.WarframesNavigation-scrollRight').click(function() {
						var v = currentScroll + scrollVal;
						if (v >= scrollLim) {
							scrollTarget.style('left', -(currentScroll = scrollLim) + 'px');
							return;
						}
						scrollTarget.style('left', -(v) + 'px');
						currentScroll += scrollVal;
					});
					e.find('.WarframesNavigation-scrollLeft').click(function() {
						var v = currentScroll - scrollVal;
						if (v < 0) {
							scrollTarget.style('left', (currentScroll = 0) + 'px');
							return;
						}
						scrollTarget.style('left', (v === 0 ? v : -(v)) + 'px');
						currentScroll -= scrollVal;
					});
				});
			}
		},
		ModalWindow: function(size, content, callback, onclose) {
			if (arguments[1] === this.Invoke) {
				return;
			}
			var $ = this;
			if (size === null) {
				$$('.ModalWindow-wrapper').remove();
				g.scroll(true);
				return true;
			}
			var modal;
			if ((modal = $$('.ModalWindow')).length) {
				return false;
			}
			var navh = $$('.wds-global-navigation-wrapper').height(),
				html,
				height,
				width,
				resize = function(modal, sizing) {
					modal.style('width', ((document.documentElement.clientWidth * sizing.width) - navh) + 'px');
					modal.style('height', ((document.documentElement.clientHeight * sizing.height) - navh) + 'px');
				};
			size = (function(size) {
				var diff = document.documentElement.clientWidth < document.documentElement.clientHeight;
				if (size == 'fullscreen') {
					return {
						width: 1,
						height: 1
					};
				}
				if (size == 'big' || !size) {
					return diff ? {
						width: 0.90,
						height: 0.30
					} : {
						width: 0.75,
						height: 0.75
					};
				}
				if (size == 'medium') {
					return diff ? {
						width: 0.75,
						height: 0.25
					} : {
						width: 0.60,
						height: 0.60
					};
				}
				if (size == 'small') {
					return diff ? {
						width: 0.45,
						height: 0.15
					} : {
						width: 0.40,
						height: 0.40
					};
				}
				if (size == 'smallest') {
					return diff ? {
						width: 0.30,
						height: 0.10
					} : {
						width: 0.275,
						height: 0.275
					};
				}
			})(size);
			content = content || {};
			callback = $$.isFunction(callback) ? callback : $$.fn;
			html = '<div ' + (content.id && ('id="' + content.id + '"') || '') + ' class="ModalWindow-wrapper" style="display: none;"><div class="ModalWindow"><header><span class="fa fa-times ModalWindow-close"></span><h3 style="font-weight: 700;">' + (content.title || '') + '</h3></header><section class="WikiaArticle">' + (content.section || '') + '</section>' + (content.footer && ('<footer>' + content.footer + '</footer>') || '') + '</div></div>';
			g._.body.append(html);
			modal = $$('.ModalWindow');
			resize(modal, size);
			var r = function() {
				resize(modal, size);
			};
			g._.window.resize(r);
			g.scroll(false);
			$$('.ModalWindow-wrapper').fadeIn(250);
			callback(modal.parent().click(function(event) {
				event.target == this || $$(event.target).hasClass('ModalWindow-close') ? (function(modal) {
					$$.isFunction(onclose) && onclose();
					g.scroll(true);
					modal.remove();
					g._.window.off('resize', r);
				})($$(this)) : undefined;
			}), modal.find('section').equal(0));
		},
		Spoiler: function Spoiler() {
			if ($$.inArray(['delete', 'edit'], g.wgAction)) {
				return;
			}
			g._.document.click(function(event) {
				var t = $$(event.target),
					n = t.next();
				if (t.hasClass('spoiler-target') && n.isHidden() && n.length && n.hasClass('spoiler-content')) {
					n.style('display', null);
				} else if (n.length && n.hasClass('spoiler-content')) {
					n.hide();
				}
			});
		},
		BugReport: function BugReport() {
			var $ = this;
			if (arguments[1] === this.Invoke || !arguments[0].length) {
				return;
			}
			arguments[0].prepend('<div id="BugReport" style="display: none" class="button">Сообщить об ошибке</div>');
			var sysops = ['BonjouR3', 'GoodLuck', 'Гейдж', 'ZhekaMONSTR'],
				to,
				additional = null;
			if ($$.inArray(sysops, g.wgUserName)) {
				sysops.splice(sysops.indexOf(g.wgUserName), 1);
			}

			function values(list) {
				var h = '';
				for (var i = 0; i < list.length; i++) {
					h += '<option value="' + list[i] + '">' + list[i] + '</option>';
				}
				return h;
			}
			var p = false;
			if ($$.inArray(g.wgUserGroups, 'sysop') || $$.inArray(g.wgUserGroups, 'threadmoderator') || $$.inArray(g.wgUserGroups, 'Часовой')) {
				additional = '<div>Отправить: <br /><select id="report-to" type="text">' + values(sysops) + '</select></div>';
			}
			var mfunction = function(modal, section) {
					modal.find('#send-BugReport').click(function() {
						if (p) {
							return;
						}
						var cat = modal.find('#BugReport-cat').value(),
							text = modal.find('#BugReport-text').value(),
							title = modal.find('#BugReport-title').value(),
							sendTo = modal.find('#report-to');
						if (additional) {
							to = sendTo.value();
						} else {
							to = sysops[+(Math.random() * sysops.length).toString().slice(0, 1)];
						}
						if ([text, title].some(function(e) {
								return !e || /^[\t\s]+$/.test(e);
							}) || !to) {
							return;
						}
						p = true;
						$$(this).prop('disabled', true);
						$$.MediaWiki.wallmessage(title, '<span class="cat">' + cat + '</span><div class="text">' + text + '</div>', to, function(status) {
							if (status) {
								section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">Сообщение успешно отправлено.</div>');
							} else {
								section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.</div>');
							}
							g.delay(function() {
								$.ModalWindow(null);
							}, 1000);
						});
					});
				},
				mcontent = {
					id: 'BugReport-ModalWindow',
					title: 'Сообщить об ошибке',
					section: '<div class="BugReport-section"><input id="BugReport-title" placeholder="Заголовок" type="text"><textarea id="BugReport-text" placeholder="Опишите проблему..."></textarea><br /><div>Категория проблемы<br><select id="BugReport-cat">' + values(['Игровая проблема', 'Проблема на вики', 'Другое']) + '</select>' + additional + '</div></div>',
					footer: '<input id="send-BugReport" value="Отправить сообщение" type="submit">'
				};
			$$('#BugReport').style('top', ($$('#globalNavigation').height() + g._.window.height()) / 1.75 + 'px').click(function() {
				$.ModalWindow('medium', mcontent, mfunction);
			}).fadeIn(250);
		},
		Tabbers: function Tabbers(target) {
			if (arguments[1] === this.Invoke) {
				return;
			}
			var $ = this;
			if (!$$.isNode(target) && !$$.isGabriel(target)) {
				return false;
			}
			$$.isNode(target) ? (target = $$(target)) : undefined;
			if (!(target = target.find('.wf__r-tabs')).length) {
				return false;
			}

			function init() {}

			function isTabberExist() {}
			target.each(function(e) {
				e = $$(e);
				var tabbers = e.find('.wf__r-tabs-content').first().children(),
					buttons = e.find('.wf__r-tabs-buttons').first().children();
				buttons.click(function() {
					var ctx = $$(this),
						tabIndex = ctx.attr('data-tab'),
						currentTabber;
					if ((currentTabber = tabbers.among('[data-tab="' + tabIndex + '"]')).length) {
						buttons.removeClass('selected');
						tabbers.hide();
						ctx.addClass('selected');
						currentTabber.show();
					}
				});
			});
			return true;
		},
		HTMLLivePad: function HTMLLivePad(elem, autorun) {
			var $ = this;
			$$.extend(null, HTMLLivePad, {
				delay: 500,
				pagetitle: 'Предпросмотр',
				run: function(main) {
					var input = main.find('.HTMLLivePad-input'),
						output = main.find('.HTMLLivePad-output'),
						gID;
					input.on('input', function(e) {
						var t = $$(this);
						gID && g.delay.clear(gID);
						gID = g.delay(function() {
							$$.fetch('/index.php', {
								method: 'post',
								accept: 'application/json, text/javascript, */*;',
								params: {
									action: 'ajax',
									rs: 'EditPageLayoutAjax',
									title: HTMLLivePad.pagetitle,
									content: t.value(),
									method: 'preview',
									page: 'SpecialCustomEditPage',
									section: '',
									summary: ''
								}
							}).success(function(data) {
								var t;
								if ($$.isCommonObject(data) && data.html) {
									t = output.html(data.html);
									$.Tabbers(t);
									$.Invoke(t);
								}
							});
						}, HTMLLivePad.delay);
					});
				},
				init: function() {
					var initHTML = '<div class="WikiaArticle"><div id="mw-content-text"><div id="HTMLLivePad"><textarea class="HTMLLivePad-input"></textarea><div class="HTMLLivePad-output"></div></div></div></div>';
					if ($$.isNode(elem)) {
						this.run($$(elem).html(initHTML));
					} else if ($$.isGabriel(autorun)) {
						autorun.click(function(e) {
							var t;
							e.preventDefault();
							t = $$(this);
							t.closest(2).find('.selected').removeClass('selected');
							t.closest(1).addClass('selected');
							HTMLLivePad.run($$('#WikiaMainContentContainer').html(initHTML));
						});
					}
				}
			});
			HTMLLivePad.init();
		},
		NewTab: function(target) {
			if (arguments[1] === this.Invoke) {
				return;
			}
			if ($$.isNode(target)) {
				target = $$(target);
			}
			if ($$.isGabriel(target)) {
				target.find('._blank a').attr('target', '_blank');
				return true;
			}
		},
		Mainpage: function Mainpage() {
			if (!g.wgIsMainPage || arguments[1] === this.Invoke) {
				return;
			}
			var $ = this,
				cache = {},
				prevent = false,
				buttons = $$('#mainpage-box .mainpage-box-buttons > div'),
				ajaxcontent = $$('#mainpage-box .mainpage-box-ajax-content'),
				ajax = $$.extend(null, function() {
					var context = this,
						throbber = new g.ajaxonload({
							insertTo: ajaxcontent,
							bgcolor: 'rgba(255, 255, 255, 0.75)',
							visible: false
						});
					throbber.on();
					$$('#mainpage-box .mainpage-box-cache').load('/wiki/' + $$(this).find('.mainpage-box-ajax-pagename').text(), '#ajax-load', function() {
						var t = $$(this);
						prevent = false;
						if (!t.html()) {
							ajaxcontent.html('<div style="width: 100%; text-align: center; color: #d30000; font-weight: 700;">Ошибка в назначении страницы или отсутствие в ней идентификатора загрузки.</div>');
							buttons.removeClass('selected');
							$$(context).addClass('error');
							throw new Error('Ошибка в назначении страницы.');
						}
						cache[context.className + '-HTML'] = t.html();
						t.html(null);
						throbber.off().destroy();
						$.NewTab(ajaxcontent.html('<div style="display: none;">' + (cache[context.className + '-HTML']) + '</div>'));
						$$('#mainpage-box .mainpage-box-ajax-content > div').fadeIn(250);
						buttons.removeClass('selected');
						$$(context).addClass('selected').off('click').on('click', function() {
							ajax.success.apply(this, arguments);
						});
					});
				}, {
					success: function() {
						var t = $$(this);
						if (t.hasClass('selected')) {
							return;
						}
						buttons.removeClass('selected');
						$.NewTab($$('#mainpage-box .mainpage-box-ajax-content').html('<div style="display: none;">' + (cache[this.className + '-HTML']) + '</div>'));
						$$('#mainpage-box .mainpage-box-ajax-content > div').fadeIn(250);
						t.addClass('selected');
					}
				});
			$$('#mainpage-box .mainpage-box-buttons > div').on('click', function() {
				if (prevent) {
					return;
				}
				prevent = true;
				ajax.apply(this, arguments);
			});

			function discussions() {
				$$('.wf__r-tabs-mainpage .wf__r-tabs-content .mainpage-box-discussions').append('<a target="discussions" href="/d/f">Обновить</a><a>Фиксировать</a><a href="/d/f" target="_blank">Открыть в новом окне</a><iframe src="/d/f" class="mainpage-box-discussions-iframe" name="discussions" style="height: ' + document.documentElement.clientHeight * 0.75 + 'px;"></iframe>');
				$$('.wf__r-tabs-mainpage .mainpage-box-discussions a[target="discussions"] + a').toggle('click', function(event) {
					event.preventDefault();
					g.scroll(false);
				}, function(event) {
					event.preventDefault();
					g.scroll(true);
				});
			}
			$$('.wf__r-tabs-mainpage > .wf__r-tabs-buttons .discussions').once('click', function() {
				discussions.apply(this, arguments);
			});

			function trade() {
				$$('.wf__r-tabs-mainpage .mainpage-box-LIVEtrade').append('<div id="trade-output"></div><input id="trade-input" placeholder="Сообщение..." type="text">');
				var output = $$('.wf__r-tabs-mainpage .mainpage-box-LIVEtrade #trade-output'),
					input = $$('.wf__r-tabs-mainpage .mainpage-box-LIVEtrade #trade-input');
				g.wgUserName && output.click(function(e) {
					if ($$(e.target).prop('tagName') && $$(e.target).prop('tagName').toLowerCase() === 'a') {
						e.preventDefault();
						input.value(input.value() + '[[Участник:' + $$(e.target).text() + '|' + $$(e.target).text() + ']], ');
					}
				});

				function watch() {
					$$.MediaWiki.render('Warframe вики:Торговля', function(html) {
						var elems = $$.parseHTML(html).find('div').my(Infinity).splice(-50);
						elems = $$(elems).appendTo(document.createElement('div'));
						if ((output.prop('scrollTop') - ((window.parseInt(output.style('borderTopWidth'), 10) + window.parseInt(output.style('borderBottomWidth'), 10)) || 0)) === output.prop('scrollHeight') - output.prop('offsetHeight')) {
							output.html(elems.html());
							output.prop('scrollTop', output.prop('scrollHeight'));
						} else {
							output.html(elems.html());
						}
						g.delay(watch, 333);
					});
				}
				$$.addCSSRule('.wf__r-tabs-mainpage .mainpage-box-LIVEtrade #trade-output {height:' + document.documentElement.clientHeight * 0.6 + 'px;}');

				function parse() {
					return arguments[0].replace(/\{/gmi, '&#123;').replace(/\}/gmi, '&#125;').replace(/</gmi, '&#60;').replace(/>/gmi, '&#62;').replace(/\n/g, '');
				}
				g.wgUserName && (input.keyup(function(e) {
					if (e.which != 13) {
						return;
					}
					var v = $$(this).value(),
						ctx = this;
					if (!v) {
						return;
					}
					v = parse(v);
					$$(this).prop('disabled', true);
					$$.fetch('/api.php', {
						params: {
							action: 'edit',
							title: 'Warframe вики:Торговля',
							appendtext: '<div class="LIVEtrade-msg"><span class="LIVEtrade-username">[[Участник:' + g.wgUserName + '|' + g.wgUserName + ']]</span>: ' + v + '</div>',
							summary: '#[' + $$.keygen() + ']',
							bot: true,
							notminor: true,
							token: g.wgEditToken,
							format: 'json'
						},
						method: 'POST'
					}).success(function() {
						$$(ctx).prop('disabled', false);
						$$(ctx).value(null);
					});
				}), true) || input.prop('disabled', true);
				watch();
			}
			$$('.wf__r-tabs-mainpage > .wf__r-tabs-buttons .trade').once('click', function() {
				0 && trade.apply(this, arguments);
			});
		},
		ScrollTop: function ScrollTop() {
			var wsw;
			if (!(wsw = $$('.WikiaSiteWrapper')).length || arguments[1] === this.Invoke) {
				return;
			}
			wsw.prepend('<div id="ScrollTop"><div><span class="fa fa-chevron-up"></span><span>Наверх</span></div></div>');
			$$('#ScrollTop').save(ScrollTop, 'button');
			var from,
				text = ScrollTop.button.find('span:not(.fa)'),
				exec = function(to) {
					from = window.scrollY;
					window.scrollTo(0, to && to || 0);
					text.text('Возврат');
					text.prev().removeClass('fa-chevron-up').addClass('fa-chevron-down');
				};
			ScrollTop.button.click(function(event) {
				exec(from);
			});
			ScrollTop.button.style('width', (wsw.prop('offsetWidth') - $$('#WikiaPage').prop('offsetWidth')) / 2 + 'px'), $$('#ScrollTop div').style('margin-top', $$('#globalNavigation').prop('offsetHeight') * 1.75 + 'px');
			g._.document.scroll(function(event) {
				if (window.scrollY > 800) {
					text.text('Наверх'),
						from = null,
						text.prev().removeClass('fa-chevron-down').addClass('fa-chevron-up'),
						ScrollTop.button.show();
				} else if (window.scrollY > 300) {
					ScrollTop.button.hide();
				}
			});
		},
		WarframeNexus: function(elem) {
			var t = $$(elem);
			t.html('<div style="text-align: center;"><textarea style="width: 100%; height: 225px; box-sizing: border-box; resize: none;"></textarea><button>Открыть</button></div>');
			t.find('button').click(function() {
				var value = t.find('textarea').value();
				try {
					var elements = value.split('\n');
					for (var i = 0; i < elements.length; i++) {
						elements[i] = JSON.parse(elements[i]);
					}
					for (i = 0; i < elements.length; i++) {
						window.open('http://content.warframe.com/MobileExport' + elements[i].textureLocation.replace(/(\\\\|\\)/g, '/'));
					}
					t.find('textarea').value(null);
				} catch (error) {
					t.find('textarea').value(error);
				}
			});
		},
		Avatar: function(elem) {
			elem = $$(elem);
			var username;
			if (!(username = elem.attr('data-username'))) {
				return;
			}
			$$.fetch('/api/v1/User/Details', {
				params: {
					ids: username,
					size: 150
				}
			}).success(function(d) {
				try {
					elem.append('<img alt="avatar" width="150" height="150" src="' + d.items[0].avatar + '"/>');
				} catch (e) {
					g.logError(e);
				}
			});
		},
		MobileExport: function(elem) {
			var t = $$(elem);
			$$.fetch('/index.php', {
				params: {
					title: 'Участник:AppleJuicetice/Img',
					action: 'raw',
					cb: $$.keygen(),
					dataType: 'text'
				}
			}).success(function(data) {
				data = data.split('\n');
				for (var i = 0; i < data.length; i++) {
					t.html('<div style="clear: both;"><img src="//content.warframe.com/MobileExport' + data[i].replace(/\\/g, '/') + '" style="max-height: 250px; width: auto;" /></div>');
				}
				t.click(function(event) {
					var tg = $$(event.target);
					if (tg.prop('tagName') == 'IMG') {
						window.open(tg.attr('src'));
					}
				});
			}).error(function(x, xhr) {
				throw new Error('Fetch failed (' + xhr.status + ': ' + xhr.statusText + ')</span>');
			});
		},
		Calcs: function(elem) {
			var t = $$(elem),
				type = t.attr('data-calc');
			t.addClass('js-calc');
			if (!type) {
				throw new Error('Не указан атрибут data-calc');
			}
			switch (type) {
				case 'armor':
					{
						var r;
						t.append('<div class="js-calc-title">Калькулятор брони</div><div class="js-calc-val"><div class="js-calc-val-name">Броня</div><div class="js-calc-val-field"><input class="js-calc-val-input" placeholder="Введите число..." type="text"></div></div><div class="js-calc-val"><div class="js-calc-val-name">Поглощение</div><div class="js-calc-val-field"><input class="js-calc-val-output" disabled="" type="text"></div></div>');
						r = t.find('input.js-calc-val-output');
						t.find('input.js-calc-val-input').input(function() {
							var v = +$$(this).value();
							r.value(100 * (v / (v + 300)) + '%');
						});
					}
					break;
				default:
					{
						throw new Error('Калькулятора ' + type + ' не существует');
					}
			}
		},
		DuplicateImages: function(elem) {
			var t = $$(elem),
				extensions = /\.(?:eot|gif|ico|jpeg|jpg|mp4|odc|odf|odg|odi|odm|odp|ods|odt|oga|ogg|ogv|pdf|png|psd|pspimage|svg|ttf|woff)$/i,
				output,
				list = {},
				title,
				timeout = 500,
				ajax = function ajax(gaifrom) {
					var params = {
						action: 'query',
						prop: 'duplicatefiles',
						dflimit: 500,
						dflocalonly: 1,
						generator: 'allimages',
						gailimit: 500,
						format: 'json'
					};
					if (gaifrom) {
						if (!!(~gaifrom.indexOf('|'))) {
							params.dfcontinue = gaifrom;
							gaifrom = gaifrom.split('|')[0];
						}
						params.gaifrom = gaifrom;
					}
					$$.fetch('/api.php', {
						params: params
					}).success(function(data) {
						if (data.query) {
							var pages = data.query.pages;
							for (var pageID in pages) {
								if (!t.exist()) {
									break;
								}
								if (extensions.test(pages[pageID].title) && !list[pages[pageID].title] && pages[pageID].duplicatefiles) {
									if (title !== pages[pageID].title) {
										if (output) {
											t.append(output + '</ul>');
										}
										title = pages[pageID].title;
										output = '<h3><a href="' + window.encodeURI(g.wgArticlePath.replace('$1', title).replace(/ /g, '_')) + '">' + title + '</a></h3><ul>';
									}
									for (var i = 0; i < pages[pageID].duplicatefiles.length; i++) {
										output += '<li><a href="' + window.encodeURI(g.wgArticlePath.replace('$1', 'Файл:' + pages[pageID].duplicatefiles[i].name).replace(/ /g, '_')) + '">Файл:' + pages[pageID].duplicatefiles[i].name.replace(/_/g, ' ') + '</a></li>';
										list['Файл:' + pages[pageID].duplicatefiles[i].name.replace(/_/g, ' ')] = true;
									}
								}
							}
							if (data['query-continue'] && elem) {
								if (data['query-continue'].duplicatefiles) {
									g.delay(ajax.bind(null, data['query-continue'].duplicatefiles.dfcontinue), timeout);
								} else {
									g.delay(ajax.bind(null, data['query-continue'].allimages.gaifrom), timeout);
								}
							} else if (output) {
								t.append(output + '</ul>');
							}
						}
					});
				};
			ajax();
		},
		AjaxAutoRefresh: function AjaxAutoRefresh(pages) {
			if (!($$.inArray(pages, g.wgPageName)) || $$.inArray(['delete', 'edit', 'protect', 'revisiondelete'], g.wgAction) || arguments[1] === this.Invoke) {
				return;
			}
			var state;
			if ((state = $$.storage.get('AjaxAutoRefresh')) === null) {
				state = $$.storage.set('AjaxAutoRefresh', true);
			}
			var $ = this,
				html = '<div id="AjaxAutoRefresh">Автообновление страницы<span class="fa ' + (state === true ? 'fa-check-square' : 'fa-square') + ' checkbox" title="Включить/Выключить автообновление"></span><span class="fa fa-refresh" title="Обновить"></span><span class="fa fa-clock-o interval" title="Изменить интервал"></span><span class="fa fa-circle-o-notch fa-spin throbber" style="display:none;"></span></div>',
				ajaxinterval,
				id;
			try {
				($$('#WikiaPageHeader').length ? $$('#WikiaPageHeader') : $$('#AdminDashboardHeader').length ? $$('#AdminDashboardHeader > h1') : false).append(html);
			} catch (e) {
				$$('#WikiaArticle').prepend(html);
			} finally {
				$$('#AjaxAutoRefresh').fadeIn(250);
			}
			$$('#AjaxAutoRefresh').save(AjaxAutoRefresh, 'ajax');
			var throbber = AjaxAutoRefresh.ajax.find('.throbber'),
				checkbox = AjaxAutoRefresh.ajax.find('.checkbox'),
				p = false;
			ajaxinterval = +$$.storage.get('AjaxAutoRefresh-interval') || $$.storage.set('AjaxAutoRefresh-interval', 45000);
			throbber.click(function(event) {
				event.stopPropagation();
			});

			function ajax() {
				if (p) {
					return;
				}
				p = true;
				throbber.style('display', null);
				g._.articleContent.load('/wiki/' + g.wgPageName, '#mw-content-text', function() {
					p = false;
					throbber.hide();
				});
			}
			run();
			$$('#AjaxAutoRefresh > span.fa-refresh').click(function(event) {
				event.stopPropagation();
				ajax();
			});

			function run() {
				state ? (id = g.interval(ajax, ajaxinterval)) : undefined;
			}

			function off() {
				g.interval.clear(id);
			}

			function enable() {
				if (p) {
					return;
				}
				if (state === true) {
					disable();
					return;
				}
				state = $$.storage.set('AjaxAutoRefresh', true);
				run();
				checkbox.removeClass('fa-square').addClass('fa-check-square');
			}

			function disable() {
				if (state === false) {
					enable();
					return;
				}
				state = $$.storage.set('AjaxAutoRefresh', false);
				off();
				checkbox.removeClass('fa-check-square').addClass('fa-square');
			}
			$$('#AjaxAutoRefresh').toggle('click', enable, disable);
			var mfunction = function(modal, section) {
				function checkIntervalValue(_interval) {
					var oldinterval = ajaxinterval;
					if (!$$.isNumber(_interval)) {
						modal.find('#AjaxAutoRefresh-warning').text('Пожалуйста, укажите число. Например: ' + (Math.random() * 60).toFixed(2)).style('display', 'inline');
					} else if (_interval < 0) {
						modal.find('#AjaxAutoRefresh-warning').text('Пожалуйста, укажите положительное число.').style('display', 'inline');
					} else if (oldinterval === _interval) {
						return;
					} else {
						$$.storage.set('AjaxAutoRefresh-interval', _interval);
						ajaxinterval = _interval;
						section.html('<div class="display-flex justifyContent-center alignItems-center" style="height:100%;">Значение успешно изменено и записано в ваше локальное хранилище.</div>');
						modal.find('#AjaxAutoRefresh-accept').prop('disabled', true);
						off();
						run();
						g.delay(function() {
							$.ModalWindow(null);
						}, 2000);
					}
				}
				modal.find('#AjaxAutoRefresh-interval').keyup(function(e) {
					if (e.which !== 13) {
						return;
					}
					var v = $$(this).value();
					checkIntervalValue(+(v !== '' && v || NaN) * 1000);
				});
				modal.find('#AjaxAutoRefresh-accept').click(function() {
					checkIntervalValue(+(modal.find('#AjaxAutoRefresh-interval').value()) * 1000);
				});
			};

			function curInterval(interval) {
				return interval / 1000;
			}
			AjaxAutoRefresh.ajax.find('.interval').click(function(e) {
				e.stopPropagation();
				$.ModalWindow('small', {
					id: 'AjaxAutoRefresh-modal',
					title: 'Изменить интервал автообновления',
					section: '<div class="display-flex justifyContent-center flexDirection-column"><span id="AjaxAutoRefresh-warning"></span><input id="AjaxAutoRefresh-interval" placeholder="Время в секундах..." type="text" value="' + curInterval(ajaxinterval) + '"/></div>',
					footer: '<input value="Применить" id="AjaxAutoRefresh-accept" type="button" />'
				}, mfunction);
			});
		},
		AjaxCommentsDelete: function AjaxCommentsDelete() {
			if (!g.wgIsArticle || g.wgIsMainPage || !(/(Часовой|bureaucrat|sysop|threadmoderator|helper|vstf|staff)/g.test(g.wgUserGroups.join(''))) || arguments[1] === this.Invoke) {
				return;
			}
			var $ = this,
				comments = (function(comments) {
					if ($$.isCommonObject(comments) && $$.isFunction(comments.init) && $$.isFunction(comments.setPage)) {
						return {
							init: comments.init,
							setPage: comments.setPage
						};
					}
					return null;
				})(window.ArticleComments),
				stop = false;
			if (comments) {
				$$.extend(null, AjaxCommentsDelete, {
					enabled: false,
					reasonsHTML: null,
					collection: {},
					errors: 0,
					inproccess: false,
					defaultReason: 'Причина удаления не указана.',
					nullify: function() {
						return (this.collection = {
							length: 0
						});
					},
					getTitle: function(link) {
						if ($$.isString(link)) {
							link = link.match(/[^/wiki/].+\d\?/)[0];
							return link && link.slice(0, -1);
						}
					},
					select: function(comment, key) {
						var nextComm;
						if (key in this.collection) {
							return;
						}
						this.collection[key] = comment;
						++this.collection.length == 1 ? (this.confirmButton.fadeIn(250), this.reason.fadeIn(250)) : undefined;
						comment.addClass('selected');
						nextComm = comment.next();
						if (nextComm.hasClass('sub-comments')) {
							nextComm.find('li.comment').each(function(e) {
								e = $$(e);
								$$(e).addClass('selected');
								key = AjaxCommentsDelete.getTitle(e.find('a.article-comm-delete').attr('href'));
								if (key in AjaxCommentsDelete.collection) {
									delete AjaxCommentsDelete.collection[key];
									AjaxCommentsDelete.collection.length--;
								}
							});
						}
					},
					unselect: function(comment, key) {
						var nextComm,
							parentComm,
							mainComm;
						if (key in this.collection) {
							nextComm = comment.next();
							comment.removeClass('selected');
							!(--this.collection.length) ? (this.confirmButton.fadeOut(250), this.reason.fadeOut(250)) : undefined;
							delete this.collection[key];
							if (nextComm.hasClass('sub-comments')) {
								nextComm.find('li.comment').removeClass('selected');
							}
						} else {
							parentComm = comment.closest('ul.sub-comments');
							comment.removeClass('selected');
							mainComm = parentComm.prev();
							comment = comment.my()[0];
							if (mainComm.hasClass('selected')) {
								mainComm.removeClass('selected');
								key = this.getTitle(mainComm.find('a.article-comm-delete').attr('href'));
								if (key in this.collection) {
									delete this.collection[key];
									this.collection.length--;
									parentComm.find('li.comment').each(function(e) {
										if (e === comment) {
											return;
										}
										e = $$(e);
										AjaxCommentsDelete.select(e, AjaxCommentsDelete.getTitle(e.find('a.article-comm-delete').attr('href')));
									});
									!(this.collection.length) ? (this.confirmButton.fadeOut(250), this.reason.fadeOut(250)) : undefined;
								}
							}
						}
					},
					remove: function(comment, key, callback, reason, forced) {
						reason = reason || this.defaultReason;
						key = window.decodeURIComponent(key);
						callback = $$.isFunction(callback) && callback || $$.fn;
						$$.MediaWiki.deletepage(key, reason, function(d) {
							try {
								if (d.error) {
									callback(true);
								} else {
									var subCommments = comment.next();
									if (subCommments.length && subCommments.hasClass('sub-comments')) {
										subCommments.fadeOut(250);
										comment.fadeOut(250);
									} else {
										comment.fadeOut(250);
									}
									callback();
								}
							} catch (e) {
								!forced && (stop = true);
								callback();
							}
						});
					},
					delay: 100,
					onpagechangeText: 'Некоторые комментарии всё ещё находятся в очереди удаления. Вы действительно хотите сменить страницу комментариев?',
					onpageleaveText: 'Некоторые комментарии всё ещё находятся в очереди удаления. Вы действительно хотите покинуть страницу?',
					modal: function(comment, title) {
						if (!this.reasonsHTML) {
							return;
						}
						$.ModalWindow('medium', {
							id: 'AjaxCommentsDelete-modal',
							title: 'Удаление комментария',
							section: '<div class="AjaxCommentsDelete-section"><fieldset><legend>Удаление</legend><table><tbody><tr><td>Причина: </td><td>' + this.reasonsHTML + '</td></tr><tr><td>Другая причина/дополнение:</td><td><input class="AjaxCommentsDelete-additionalReason"></td></tr></tbody></table></fieldset></div>',
							footer: '<input type="button" class="AjaxCommentsDelete-cancel" value="Отмена" /><input type="button" class="AjaxCommentsDelete-confirm" value="Удалить" />'
						}, function(modal) {
							modal.find('.AjaxCommentsDelete-additionalReason').focus();
							modal.find('.AjaxCommentsDelete-cancel').click(function() {
								$.ModalWindow(null);
							});
							modal.find('.AjaxCommentsDelete-confirm').click(function() {
								var additional = modal.find('.AjaxCommentsDelete-additionalReason').value();
								AjaxCommentsDelete.remove(comment, title, null, modal.find('.AjaxCommentsDelete-reason').value() + (additional ? ': ' + additional : ''), true);
								$.ModalWindow(null);
							});
						});
					},
					init: function() {
						$$.MediaWiki.raw('MediaWiki:Deletereason-dropdown', function(data) {
							AjaxCommentsDelete.reasonsHTML = (function(data) {
								var m = data.match(/^\*{1,2}\s.+$/gm),
									html = '<select class="AjaxCommentsDelete-reason"><option value="Другая причина">Другая причина</option>',
									f = false;
								if (!m) {
									return;
								}
								for (var i = 0; i < m.length; i++) {
									if (/^\*{1}\s/.test(m[i])) {
										if (f) {
											html += '</optgroup>';
										}
										m[i] = m[i].replace(/^\*{1}\s/, '');
										html += '<optgroup label="' + m[i] + '">';
										f = !f;
										continue;
									}
									if (/^\*{2}\s/.test(m[i])) {
										m[i] = m[i].replace(/^\*{2}\s/, '');
										html += '<option value="' + m[i] + '">' + m[i] + '</option>';
									}
								}
								return html + '</optgroup></select>';
							})(data);
						});
						$$(window).on('beforeunload', function(e) {
							var msg;
							if (AjaxCommentsDelete.inproccess) {
								msg = AjaxCommentsDelete.onpageleaveText;
								e.returnValue = msg;
								return msg;
							}
						});
						window.ArticleComments.init = function() {
							comments.init.apply(this, arguments);
							AjaxCommentsDelete.comments = $$('#article-comments-ul');
							var ac = $$('#article-comments').prepend('<div id="AjaxCommentsDelete-options"><input class="AjaxCommentsDelete-reason" placeholder="Причина удаления..." type="text"><input value="Подтвердить удаление" class="AjaxCommentsDelete-confirm" type="button"><input value="Включить массовое удаление" class="AjaxCommentsDelete-toggle" type="button"></div><div class="article-comm-delete-result"></div>');
							ac.find('.article-comm-delete-result').save(AjaxCommentsDelete, 'result');
							ac.find('.AjaxCommentsDelete-toggle').click(function() {
								if (AjaxCommentsDelete.enabled) {
									$$(this).value('Включить массовое удаление');
									AjaxCommentsDelete.enabled = false;
									AjaxCommentsDelete.confirmButton.fadeOut(250);
									AjaxCommentsDelete.comments.removeClass('delete-mode-enabled');
									AjaxCommentsDelete.comments.find('li.comment').removeClass('selected');
									AjaxCommentsDelete.reason.fadeOut(250);
								} else if (!AjaxCommentsDelete.inproccess) {
									$$(this).value('Выключить массовое удаление');
									AjaxCommentsDelete.enabled = true;
									AjaxCommentsDelete.comments.addClass('delete-mode-enabled');
								}
								AjaxCommentsDelete.nullify();
							}).fadeIn(250).save(AjaxCommentsDelete, 'toggleButton');
							$$('#AjaxCommentsDelete-options .AjaxCommentsDelete-reason').save(AjaxCommentsDelete, 'reason');
							ac.find('.AjaxCommentsDelete-confirm').click(function() {
								if (!AjaxCommentsDelete.collection.length || AjaxCommentsDelete.inproccess) {
									return;
								}
								var queue = Object.keys(AjaxCommentsDelete.collection),
									called = 0;
								if ($$.inArray(queue, 'length')) {
									queue.splice(queue.indexOf('length'), 1);
								}
								AjaxCommentsDelete.inproccess = true;
								AjaxCommentsDelete.reason.prop('disabled', true).fadeOut(250);
								$$(this).prop('disabled', true).fadeOut(250);
								AjaxCommentsDelete.toggleButton.prop('disabled', true);
								$$('#article-comments .article-comm-delete-result').style('visibility', null);

								function loop(title) {
									if (stop) {
										stop = false;
										AjaxCommentsDelete.result.text('Операция была прервана. Удалено комментариев: ' + called + '.').style('visibility', 'visible');
										AjaxCommentsDelete.reason.value(null).prop('disabled', false);
										AjaxCommentsDelete.toggleButton.prop('disabled', false);
										AjaxCommentsDelete.confirmButton.prop('disabled', false);
										AjaxCommentsDelete.errors = called = 0;
										AjaxCommentsDelete.nullify();
										return;
									}
									if (!title) {
										AjaxCommentsDelete.toggleButton.prop('disabled', false);
										AjaxCommentsDelete.inproccess = false;
										AjaxCommentsDelete.reason.value(null).prop('disabled', false);
										AjaxCommentsDelete.toggleButton.prop('disabled', false);
										AjaxCommentsDelete.confirmButton.prop('disabled', false);
										AjaxCommentsDelete.result.text('Операция завершена. Ошибок: ' + AjaxCommentsDelete.errors + '.').style('visibility', 'visible');
										AjaxCommentsDelete.errors = called = 0;
										AjaxCommentsDelete.nullify();
										return;
									}
									AjaxCommentsDelete.remove(AjaxCommentsDelete.collection[title], title, function(error) {
										error && AjaxCommentsDelete.errors++ || called++;
										delete AjaxCommentsDelete.collection[title];
										AjaxCommentsDelete.collection.length--;
										queue.splice(queue.indexOf(title), 1);
										g.delay(loop.bind(null, queue[0] || null), AjaxCommentsDelete.delay);
									}, $$.trim(AjaxCommentsDelete.reason.value()) || AjaxCommentsDelete.defaultReason);
								}
								loop(queue[0]);
							}).save(AjaxCommentsDelete, 'confirmButton');
							$$('#WikiaArticleComments').click(function(event) {
								if (AjaxCommentsDelete.inproccess) {
									event.preventDefault();
									return;
								}
								var target = $$(event.target),
									link;
								if (AjaxCommentsDelete.enabled) {
									target = target.closest('li.comment');
									event.preventDefault();
									if (!target.length) {
										return;
									}
									link = target.find('a.article-comm-delete').attr('href');
									if (target.hasClass('selected')) {
										AjaxCommentsDelete.unselect(target, AjaxCommentsDelete.getTitle(link));
									} else {
										AjaxCommentsDelete.select(target, AjaxCommentsDelete.getTitle(link));
									}
								} else if (target.hasClass('article-comm-delete')) {
									event.preventDefault();
									AjaxCommentsDelete.modal(target.closest('li.comment'), AjaxCommentsDelete.getTitle(target.attr('href')));
								}
							});
						};
						window.ArticleComments.setPage = function() {
							if (AjaxCommentsDelete.inproccess) {
								var c = window.confirm(AjaxCommentsDelete.onpagechangeText);
								if (c) {
									AjaxCommentsDelete.inproccess = false;
									stop = true;
									exec.apply(this, arguments);
								}
								return;
							}
							exec.apply(this, arguments);
						};

						function exec(e) {
							comments.setPage.apply(this, arguments);
							AjaxCommentsDelete.nullify();
							AjaxCommentsDelete.confirmButton.fadeOut(250);
							AjaxCommentsDelete.reason.fadeOut(250);
						}
					}
				});
				AjaxCommentsDelete.init();
			}
		},
		AjaxBatchDelete: function AjaxBatchDelete() {
			if (!g.wgUserName || $$.inArray(['edit'], g.wgAction) || arguments[1] === this.Invoke || !g._.wme) {
				return;
			}
			g._.wme.append('<li><a href="/wiki/Служебная:AjaxBatchDelete">Массовое удаление</a></li>');
			if (g.wgPageName != 'Служебная:AjaxBatchDelete' || $$.inArray(['edit'], g.wgAction)) {
				return;
			}
			$$('#WikiaPageHeader .header-column.header-title').html('<h1>Массовое удаление (ajax)</h1>');
			document.title = 'AjaxBatchDelete | Warframe вики | Fandom powered by Wikia';
			g._.articleContent.html('<div id="AjaxBatchDelete"><div class="AjaxBatchDelete-content"><textarea class="AjaxBatchDelete-input" placeholder="Список страниц (через строку)"></textarea><textarea class="AjaxBatchDelete-output" disabled=""></textarea></div><div class="AjaxBatchDelete-options"><input class="AjaxBatchDelete-reason" placeholder="Укажите причину удаления" type="text"><button class="AjaxBatchDelete-confirm">Удалить</button></div></div>');
			var input = $$('#AjaxBatchDelete .AjaxBatchDelete-input'),
				output = $$('#AjaxBatchDelete .AjaxBatchDelete-output'),
				startButton = $$('#AjaxBatchDelete .AjaxBatchDelete-confirm'),
				reason = $$('#AjaxBatchDelete .AjaxBatchDelete-reason'),
				list = [],
				invalidChars = /(\#|<|>|\[|\]|\{|\}|\|)/;

			function next() {
				list.shift();
				input.value(list.join('\n'));
				ajax.call(this, list[0]);
			}

			function log(text) {
				if ((output.prop('scrollTop') - ((window.parseInt(output.style('borderTopWidth'), 10) + window.parseInt(output.style('borderBottomWidth'), 10)) || 0)) === output.prop('scrollHeight') - output.prop('offsetHeight')) {
					output.append(text);
					output.prop('scrollTop', output.prop('scrollHeight'));
				} else {
					output.append(text);
				}
			}

			function ajax(page) {
				var ctx = this;
				if (!page) {
					log('Операция завершена.\n');
					$$(this).prop('disabled', false);
					reason.prop('disabled', false);
				} else if (invalidChars.test(page)) {
					log('Обнаружены запрещённые символы! Пропускаю: ' + page + '\n');
					g.delay(next.bind(this), 500);
				} else {
					log('Удаляю: ' + page + '\n');
					$$.MediaWiki.deletepage(page, reason.value(), function(d) {
						if (d.error) {
							log('Ошибка (ответ сервера): ' + d.error.info + '\n');
						} else {
							log('Удалено: ' + page + '\n');
						}
						g.delay(next.bind(ctx), 500);
					});
				}
			}
			startButton.click(function(e) {
				list = input.value().split('\n').filter(function(e) {
					return e;
				});
				if ($$.isEmptyArray(list)) {
					return;
				}
				$$(this).prop('disabled', true);
				reason.prop('disabled', true);
				ajax.call(this, list[0]);
			});
		},
		AjaxLastEdit: function AjaxLastEdit(namespaces) {
			if ($$.inArray(['edit', 'history', 'protect', 'delete', 'revisiondelete'], g.wgAction) || !($$.inArray(namespaces, g.wgNamespaceNumber)) || g.wgIsMainPage || !g.wgArticleId || !$$('#WikiaPageHeader .header-column.header-title').length || g.urlparams.oldid || arguments[1] === this.Invoke) {
				return;
			}
			var $ = this;
			$$.fetch('/api.php', {
				params: {
					action: 'query',
					titles: g.wgPageName,
					prop: 'revisions',
					rvprop: 'timestamp|user|userid|size|parsedcomment',
					rvdiffto: 'prev',
					format: 'json'
				}
			}).success(function(data) {
				if (data.error) {
					return;
				}
				var info = data.query.pages[g.wgArticleId].revisions[0];
				$$('#WikiaPageHeader .header-column.header-title').append('<div id="AjaxLastEdit">Последняя правка <a href="/wiki/Участник:' + info.user + '">' + info.user + '</a> (<a href="/wiki/Стена_обсуждения:' + info.user + '">Обсуждение</a> | <a href="/wiki/Служебная:Contributions/' + info.user + '">Вклад</a>' + (/(bureaucrat|sysop|helper|vstf|staff|Часовой|threadmoderator)/g.test(g.wgUserGroups.join(' ')) ? ' | <a href="/wiki/Служебная:Block/' + info.user + '">Заблокировать</a>' : '') + ')' + (function() {
					var element = document.createElement('span');
					window.timestamp = info.timestamp;
					element.setAttribute('title', '' + info.timestamp);
					jQuery && jQuery(element).timeago();
					element.removeAttribute('title');
					return ' ' + element.innerHTML;
				})() + (info.diff.from ? '<a style="cursor:pointer" class="diff"> (разн.)</a>' : '') + (function() {
					var string = '';
					if (info.parsedcomment) {
						if (!!(~info.parsedcomment.indexOf('Created page with'))) {
							string += '<br />Комментарий: Создана страница';
						} else {
							string += '<br />Комментарий: ' + info.parsedcomment;
						}
					}
					return string;
				})() + '<br />Размер: ' + info.size + ' байт</div>');
				$$('#AjaxLastEdit .diff').click(function(event) {
					$.ModalWindow('big', {
						id: 'AjaxLastEditChanges',
						title: 'Изменения: ' + g.wgPageName.replace(/_/g, ' '),
						section: '<table id="AjaxLastEditTable" class="diff">' + info.diff['*'] + '</table>',
						footer: '<input class="link" value="Ссылка" type="button" /><input class="undo" value="Отменить" type="button" />',
					}, function() {
						$$('#AjaxLastEditChanges .link').click(function(event) {
							$.ModalWindow(null);
							window.open('/?diff=' + info.diff.to);
						});
						$$('#AjaxLastEditChanges .undo').click(function(event) {
							$.ModalWindow(null);
							$$('#AjaxLastEditChanges').remove();
							window.open('/wiki/' + g.wgPageName + '?action=edit&undoafter=' + info.diff.from + '&undo=' + info.diff.to);
						});
					});
				});
				$$('#AjaxLastEdit').fadeIn(250);
			});
		},
		ProfileTags: function ProfileTags(callback) {
			if (!$$.inArray([2, 3, 500, 1200], g.wgNamespaceNumber) && !$$('#UserProfileMasthead').length || arguments[1] === this.Invoke) {
				return;
			}
			var $ = this,
				name = this.name,
				masthead = $$('#UserProfileMasthead .masthead-info > hgroup'),
				defaultTags = (function() {
					var elements = masthead.find('.tag'),
						tags = {};
					for (var i = 0; i < elements.length; i++) {
						tags[elements.equal(i).html().replace(/^\s*/, '').replace(/\s*$/, '')] = elements.equal(i);
					}
					return tags;
				})();
			$$.MediaWiki.raw('MediaWiki:ProfileTags', function(data) {
				if (!data.length) {
					return;
				}
				var tags = {},
					splitter,
					original,
					replace;
				data = data.split('\n');
				for (var i = 0; i < data.length; i++) {
					splitter = data[i].split('|');
					tags[splitter[0]] = splitter[1].split(',');
				}
				if (name in tags && tags[name].length >= 1) {
					masthead.find('.tag').fadeIn(250);
					for (i = 0; i < tags[name].length; i++) {
						if (!!(~tags[name][i].indexOf('>>>'))) {
							replace = tags[name][i].match(/\s*>>>\s*.+/).join().slice(3);
							original = tags[name][i].match(/.+\s*>>>\s*/).join().slice(0, -3).replace(/^\s*/, '').replace(/\s*$/, '');
							if (original in defaultTags) {
								defaultTags[original].html(replace);
							}
							continue;
						}
						masthead.append('<span style="display: none;" class="tag tag-' + tags[name][i].replace(/\s/g, '_') + '">' + tags[name][i] + '</span>');
						masthead.children().last().fadeIn(250);
					}
				} else {
					masthead.find('.tag').fadeIn(250);
				}
				$$.isFunction(callback) && callback();
			});
		},
		InactiveUsers: function InactiveUsers(options, callback) {
			if (!($$.inArray([2, 3, 500, 1200], g.wgNamespaceNumber)) && !($$('#UserProfileMasthead').length) || arguments[1] === this.Invoke) {
				return;
			}
			var $ = this,
				name = this.name;
			$$.fetch('/api.php', {
				params: {
					action: 'query',
					list: 'usercontribs',
					uclimit: 1,
					ucprop: 'title|timestamp',
					format: 'json',
					ucuser: name,
					ucstart: new Date(Date.now()).toISOString(),
					ucend: new Date(Date.now() - 30 * Math.max(parseInt(options.months, 10) || 1, 1) * 24 * 60 * 60 * 1000).toISOString()
				}
			}).success(function(data) {
				if (data.error) {
					return;
				}
				try {
					if (data.query && data.query.usercontribs && !data.query.usercontribs.length && name) {
						$$('#UserProfileMasthead hgroup').append('<span class="tag tag-' + options.text.replace(/\s/g, '_') + '" style="display: none;">' + options.text + '</span>');
						$$('#UserProfileMasthead hgroup .tag-' + options.text.replace(/\s/g, '_')).fadeIn(250);
					}
				} catch (e) {} finally {
					$$.isFunction(callback) && callback();
				}
			});
		},
		QuickTemplates: function QuickTemplates() {
			if (g.wgAction != 'edit' || g.wgNamespaceNumber !== 0 || g.wgIsMainPage || arguments[1] === this.Invoke) {
				return;
			}
			var select = null,
				textbox = $$('#wpTextbox1'),
				textboxV = textbox.value(),
				startPos = textboxV.length,
				endPos = textboxV.length,
				insert = function(tplText, textboxVal) {
					if (textboxVal === '') {
						return textboxVal + tplText;
					}
					return textboxVal.slice(0, textbox.prop('selectionStart')) + tplText + textboxVal.slice(textbox.prop('selectionEnd'));
				};
			textboxV = null;
			$$.MediaWiki.raw('Warframe вики:Шаблоны.json', function(data) {
				$$.isCommonObject(data) ? undefined : (data = {});
				$$('#EditPage .module.module_page_controls > .module_content').append('<select style="margin-top: 8px;width: 100%; display: none" id="switch-template"></select>');
				$$('#EditPage .module.module_page_controls .buttons > a#wpDiff + *').after('<input id="insert-template" style="display: none;" value="Вставить шаблон" type="button">').next().fadeIn(250).click(function() {
					var textboxVal = textbox.value(),
						tpl = '',
						s_val = select.value();
					if (s_val in data) {
						tpl += '{{' + data[s_val].name + (data[s_val].insert ? '\n' : '');
						if (data[s_val].insert) {
							for (var i = 0; i < data[s_val].insert.length; i++) {
								tpl += '| ' + data[s_val].insert[i] + ' = \n';
							}
						}
						tpl += '}}';
						if ((textbox.prop('scrollTop') - ((window.parseInt(textbox.style('borderTopWidth'), 10) + window.parseInt(textbox.style('borderBottomWidth'), 10)) || 0)) === textbox.prop('scrollHeight') - textbox.prop('offsetHeight')) {
							textbox.value(insert(tpl, textboxVal));
							textbox.prop('scrollTop', textbox.prop('scrollHeight'));
						} else {
							textbox.value(insert(tpl, textboxVal));
						}
					}
				});
				select = $$('#switch-template');
				for (var key in data) {
					select.append('<option value="' + data[key].val + '">' + data[key].val + '</option>');
				}
				select.fadeIn(250);
			});
		},
		Timers: function Timers() {
			var timers;
			if (!(timers = $$('.timer[data-active="true"]')).length || arguments[1] === this.Invoke) {
				return;
			}
			var time = function(options) {
					return ((options.month && options.month.toString().length == 1 ? '0' + options.month : options.month) || '01') + '/' + ((options.day && options.day.toString().length == 1 ? '0' + options.day : options.day) || '01') + '/' + (options.year || 1970) + ' ' + ((options.hour && options.hour.toString().length == 1 ? '0' + options.hour : options.hour) || '00') + ':' + ((options.minute && options.minute.toString().length == 1 ? '0' + options.minute : options.minute) || '00') + ':' + ((options.second && options.second.toString().length == 1 ? '0' + options.second : options.second) || '00') + ' ' + (options.timezone || '+0000');
				},
				timer = function(to, id) {
					var now = new Date(),
						context = $$(this),
						diff = Math.floor((to - now) / 1000),
						days_left = context.find('span[data-daysleft]'),
						hours_left = context.find('span[data-hoursleft]'),
						minutes_left = context.find('span[data-minutesleft]'),
						seconds_left = context.find('span[data-secondsleft]');
					if (diff < 0) {
						if (context.attr('data-text')) {
							context.text(context.attr('data-text'));
						} else {
							context.text('Время истекло!');
						}
						g.interval.clear($.timers[id]);
					}
					seconds_left.text(diff % 60);
					diff = Math.floor(diff / 60);
					minutes_left.text(diff % 60);
					diff = Math.floor(diff / 60);
					hours_left.text(diff % 24);
					diff = Math.floor(diff / 24);
					days_left.text(diff);
				},
				$ = this;
			this.timers = {};
			timers.each(function(e) {
				e = [e, $$(e)];
				var to = time({
					day: e[1].attr('data-day'),
					month: e[1].attr('data-month'),
					year: e[1].attr('data-year'),
					hour: e[1].attr('data-hour'),
					minute: e[1].attr('data-minute'),
					second: e[1].attr('data-second'),
					timezone: e[1].attr('data-timezone'),
				});
				e[1].attr('id', 'timer_' + (arguments[1] + 1));
				$.timers[e[1].attr('id')] = g.interval(timer.bind(e[0], new Date(to), e[1].attr('id')), 1000);
				e[1].fadeIn(250);
			});
		},
		AjaxTooltips: function AjaxTooltips() {
			if ($$.inArray(['edit', 'history', 'protect', 'delete', 'revisiondelete'], g.wgAction) || arguments[1] === this.Invoke) {
				return;
			}
			var $ = this,
				noresult = '<div id="AjaxTooltip-noresult">Отсутствует содержимое или вне зоны видимости<br>Инструкция: <ul><li>Извлечение: &lt;span class="AjaxTooltip" data-selector=".css_Селектор" data-page="название страницы"&gt;Отображаемое&lt;/span&gt;</li><li>Если элементов по заданному селектору больше одного, то будет извлечён только первый.</li><li>По умолчанию извлекается идентификатор #AjaxTooltip-target (если есть). Если его нет, то появляется это окно.</li></ul></div>',
				tooltip;
			g._.body.append('<div id="AjaxTooltip-template" style="display: none;"></div>');
			tooltip = $$('#AjaxTooltip-template');
			AjaxTooltips.delay = 100;
			$$('.AjaxTooltip').each(function(e) {
				e = $$(e);
				var p = false,
					show = true,
					t = true;

				function move(event) {
					tooltip.style('top', (Math.min(event.clientY + 20, Math.abs($$(window).height() - tooltip.height() - ($$('#WikiaBarWrapper:not(.hidden)').height() || 0)))) + 'px');
					tooltip.style('left', (Math.min(event.clientX + 20, $$(window).width() - tooltip.width())) + 'px');
				}

				function leave() {
					if (t) {
						tooltip.html(null);
						tooltip.hide();
						show = false;
					}
				}
				tooltip.on({
					mouseleave: function() {
						t = true;
						leave.apply(this, arguments);
					},
					mouseenter: function() {
						t = false;
					}
				});
				e.on({
					mouseenter: function(event) {
						if (p) {
							return;
						}
						p = true;
						var context = $$(this),
							scontext = this,
							title = context.attr('data-page'),
							selector = context.attr('data-selector') ? context.attr('data-selector') : '#AjaxTooltip-target';
						$$(document.createElement('div')).load('/index.php', {
							title: title,
							action: 'render',
							cb: $$.keygen()
						}, selector, function() {
							p = false;
							context.data('AjaxTooltip', (window.x = $$(this).html() || noresult));
							tooltip.html(context.data('AjaxTooltip'));
							show && tooltip.style('display', null);
							move.call(scontext, event);
							context.off('mouseenter').mouseover(function() {
								tooltip.html(context.data('AjaxTooltip'));
								tooltip.style('display', null);
							});
						});
					},
					mouseleave: leave,
					mousemove: move
				});
			});
		},
		Rewards: function Rewards() {
			if (arguments[1] === this.Invoke || (!$$.inArray([-1, 2, 4, 500, 1200], g.wgNamespaceNumber)) || (g.wgNamespaceNumber == -1 && !$$.inArray(['Contributions', 'Following'], g.wgCanonicalSpecialPageName)) || ((g.wgNamespaceNumber == 4 && g.wgAction == 'edit' && g.wgTitle != 'Награды') || (g.wgNamespaceNumber == 4 && g.wgTitle != 'Награды')) || g.urlparams.diff) {
				return;
			}
			var $ = this,
				name = this.name;
			$$.extend(null, Rewards, {
				data: null,
				olddata: null,
				revertdata: function() {
					return (this.data = $$.extend({
						deep: true
					}, {}, this.olddata));
				},
				rewardlist: function(target) {
					var html = '';
					target = target || this.data.r;
					for (var reward in target) {
						html += '<div class="Rewards-lreward" data-rewardname="' + target[reward].n + '"><div class="Rewards-image"><img onerror="alert(\'Изображение \' + this.src + \' не может быть загружено\');" src="' + target[reward].i + '" /><div class="Rewards-name">' + target[reward].n + '</div></div><div class="Rewards-desc">' + target[reward].d + '</div><button class="Rewards-removereward"><span class="fa fa-times"></span></button></div>';
					}
					return html;
				},
				rtpl: function(reward) {
					return '<div title="' + reward.d + '" class="Rewards-reward" data-rewardname="' + reward.n + '"><div class="Rewards-image"><img src="' + reward.i + '" onerror="alert(\'Изображение \' + this.src + \' не может быть загружено\'); /"><div class="Rewards-name">' + reward.n + '</div><button class="Rewards-removereward"><span class="fa ' + (reward.c > 1 ? 'fa-minus' : 'fa-times') + '"></span></button><div class="Rewards-count">' + reward.c + '</div></div></div>';
				},
				userlist: function(target) {
					var html = '',
						user,
						i,
						reward;
					target = target || this.data.u;
					for (user in target) {
						html += '<div data-username="' + user + '"><div class="Rewards-username"><a href="/wiki/Участник:' + user + '" target="_blank">' + user + '</a></div><div class="Rewards-rewards">';
						for (reward in target[user]) {
							html += this.rtpl(target[user][reward]);
						}
						html += '</div></div>';
					}
					return html;
				},
				savechanges: function(cb) {
					$$.fetch('/api.php', {
						method: 'POST',
						params: {
							action: 'edit',
							title: 'Warframe вики:Награды',
							text: JSON.stringify(this.data),
							summary: 'Настройки изменены',
							bot: true,
							notminor: true,
							token: g.wgEditToken,
							format: 'json'
						}
					}).success(function(d) {
						try {
							if (d.error) {
								cb(d.error.info);
								Rewards.wasError = true;
								return;
							}
							if (d.edit.result === 'Success') {
								cb('Настройки успешно изменены. Сейчас страница автоматически обновится.');
								g.delay(function() {
									$$.MediaWiki.purge();
								}, 2000);
							}
						} catch (e) {
							Rewards.wasError = true;
							cb(e);
						}
					});
				},
				wasError: false,
				editor: function() {
					$.ModalWindow('big', {
						id: 'Rewards-modal',
						title: 'Редактор наград',
						section: '<div class="wf__r-tabs" id="Rewards-tabber"><div class="wf__r-tabs-buttons"><span data-tab="0" class="selected">Список участников</span><span data-tab="1">Награды</span></div><div class="wf__r-tabs-content"><div style="display: block;" data-tab="0"><div class="Rewards-assign Rewards-new"><input placeholder="Имя участника" class="Rewards-to" type="text"><input placeholder="Название награды" class="Rewards-rname" type="text"><div style="text-align: center;"><button class="Rewards-assignto">Добавить</button></div></div><div class="Rewards-userlist">' + this.userlist() + '</div></div><div data-tab="1" style="display: none;"><div class="Rewards-new"><input placeholder="URL изображения" class="Rewards-rewardurl" type="text"><input placeholder="Описание награды" class="Rewards-rewarddesc" type="text"><input placeholder="Название награды" class="Rewards-rewardname" type="text"><div style="text-align: center;"><button class="Rewards-createnew">Создать</button></div></div><div class="Rewards-list">' + this.rewardlist() + '</div></div></div></div>',
						footer: '<input type="button" id="Rewards-revertchanges" value="Отменить изменения"/><input type="button" id="Rewards-savechanges" value="Сохранить"/>'
					}, function(modal, section) {
						var tab1 = section.find('div[data-tab="0"]'),
							tab2 = section.find('div[data-tab="1"]');
						$.Tabbers(section);
						modal.find('#Rewards-savechanges').click(function() {
							if (Rewards.wasError) {
								return;
							}
							modal.find('#Rewards-revertchanges').prop('disabled', true);
							$$(this).prop('disabled', true);
							Rewards.savechanges(function(info) {
								section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + info + '</div>');
							});
						});
						modal.find('#Rewards-revertchanges').click(function() {
							Rewards.revertdata();
							tab1.find('.Rewards-userlist').html(Rewards.userlist());
							tab2.find('.Rewards-list').html(Rewards.rewardlist());
						});
						section.find('.Rewards-createnew').click(function() {
							var image = section.find('.Rewards-rewardurl').value(),
								desc = section.find('.Rewards-rewarddesc').value(),
								name = section.find('.Rewards-rewardname').value(),
								data = Rewards.data.r,
								newReward = {};
							if ([image, desc, name].some(function(e) {
									return !e || /^[\t\s]+$/.test(e);
								}) || name in data) {
								return;
							}
							data[name] = (newReward[name] = {
								n: name,
								d: desc,
								i: image
							});
							section.find('.Rewards-list').append(Rewards.rewardlist(newReward));
						});
						section.find('.Rewards-list').click(function(e) {
							var t = $$(e.target),
								rewardname,
								i,
								data = Rewards.data.r,
								reward;
							if (t.hasClass('Rewards-removereward') || !!t.closest('.Rewards-removereward').length) {
								rewardname = (reward = t.closest('.Rewards-lreward')).attr('data-rewardname');
								if (rewardname in data) {
									delete data[rewardname];
									reward.remove();
								}
							}
						});
						section.find('.Rewards-assignto').click(function() {
							var username = section.find('.Rewards-to').value(),
								rewardname = section.find('.Rewards-rname').value(),
								v = {},
								t,
								reward,
								rewards = Rewards.data.r,
								users = Rewards.data.u;
							if (rewardname in rewards) {
								if (username in users) {
									if (rewardname in users[username]) {
										reward = section.find('.Rewards-userlist div[data-username="' + username + '"] div[data-rewardname="' + rewardname + '"]');
										t = reward.find('.Rewards-count');
										t.text(++users[username][rewardname].c);
										if (users[username][rewardname].c == 2) {
											reward.find('.Rewards-removereward > *').removeClass('fa-times').addClass('fa-minus');
										}
									} else {
										users[username][rewardname] = (t = $$.extend(null, rewards[rewardname], {
											c: 1
										}));
										section.find('.Rewards-userlist div[data-username="' + username + '"] .Rewards-rewards').append(Rewards.rtpl(t));
									}
								} else {
									users[username] = {};
									users[username][rewardname] = (t = $$.extend(null, rewards[rewardname], {
										c: 1
									}));
									v = {};
									v[username] = {};
									v[username][rewardname] = t;
									section.find('.Rewards-userlist').append(Rewards.userlist(v));
								}
							}
						});
						section.find('.Rewards-userlist').click(function(e) {
							var t = $$(e.target),
								reward,
								rewardname,
								username,
								rewards = Rewards.data.r,
								users = Rewards.data.u,
								user;
							if (t.hasClass('Rewards-removereward') || !!t.closest('.Rewards-removereward').length) {
								username = (user = t.closest('div[data-username]')).attr('data-username');
								reward = t.closest('.Rewards-reward');
								rewardname = reward.attr('data-rewardname');
								if (username in users && rewardname in users[username]) {
									reward.find('.Rewards-count').text(--users[username][rewardname].c);
									if (users[username][rewardname].c === 0) {
										delete users[username][rewardname];
										if ($$.isEmptyObject(users[username])) {
											user.remove();
											delete users[username];
										} else {
											reward.remove();
										}
									} else if (users[username][rewardname].c == 1) {
										reward.find('.Rewards-removereward > *').removeClass('fa-minus').addClass('fa-times');
									}
								}
							}
						});
					}, function() {
						Rewards.revertdata();
					});
				},
				init: function() {
					$$.MediaWiki.raw('Warframe вики:Награды', function(d) {
						var rail;
						if (!$$.isCommonObject(d)) {
							d = {
								r: {},
								u: {}
							};
						}
						if (g.wgNamespaceNumber == 4 && g.wgAction == 'view') {
							Rewards.data = d;
							Rewards.olddata = $$.extend({
								deep: true
							}, {}, d);
							if (g.urlparams.oldid || g.urlparams.diff) {
								return;
							}
							g._.articleContent.prepend('<div style="text-align: center; line-height: normal;"><input id="RewardsEditor" style="display: none;" value="Настройки наград" type="button"></div>').find('#RewardsEditor').click(function(e) {
								Rewards.editor();
							}).fadeIn(250, 'inline');
						}
						if (name in d.u) {
							rail = $$('#WikiaRail').prepend((function(rewards) {
								var showall = function(passed) {
									return passed ? '<div class="Rewards-showall-wrapper"><button class="Rewards-showall">Показать все</button></div>' : '';
								};
								return '<section id="Rewards-module" class="rail-module" style="display: none;"><h2>Награды участника</h2><div class="Rewards-userrewards">' + (function() {
									var html = '',
										lim = 8,
										i = 0;
									for (var reward in rewards) {
										if (i > lim) {
											showall.passed = true;
											break;
										}
										html += '<div class="Rewards-reward"><img class="Rewards-image" src="' + rewards[reward].i + '" /><span class="Rewards-count">' + rewards[reward].c + '</span><div class="Rewards-desc">' + rewards[reward].n + '<hr><div class="Rewards-desc-chevron"></div>' + rewards[reward].d + '</div></div>';
										i++;
									}
									return html;
								})() + '</div>' + showall(showall.passed) + '</section>';
							})(d.u[name])).find('#Rewards-module').fadeIn(250);
							rail.find('.Rewards-showall').click(function() {
								$.ModalWindow('big', {
									id: 'Rewards-modal',
									title: 'Награды участника ' + name,
									section: '<div class="Rewards-list Rewards-alluserrewards">' + (function(rewards) {
										var html = '';
										for (var reward in rewards) {
											html += '<div class="Rewards-lreward" data-rewardname="' + rewards[reward].n + '"><div class="Rewards-image"><img src="' + rewards[reward].i + '" /><div class="Rewards-name">' + rewards[reward].n + '</div></div><div class="Rewards-desc">' + rewards[reward].d + '</div><div class="Rewards-count">' + rewards[reward].c + '</div></div>';
										}
										return html;
									})(d.u[name]) + '</div>'
								});
							});
							rail.find('.Rewards-reward').on({
								mouseover: function(e) {
									var t = $$(this).find('.Rewards-desc'),
										ch = t.find('.Rewards-desc-chevron'),
										w = t.width();
									t.style('right', -w / 4 + 'px');
									ch.style('right', (w - ch.width()) / 2 + 'px');
									t.style('visibility', 'visible');
								},
								mouseleave: function(e) {
									$$(this).find('.Rewards-desc').style('visibility', null);
								}
							});
						}
					});
				}
			});
			Rewards.init();
		},
		UserPointsHistory: function UserPointsHistory() {
			if (arguments[1] === this.Invoke) {
				return;
			}
			var $ = this;
			$$.extend(null, UserPointsHistory, {
				bhandle: function(e) {
					$.ModalWindow('big', UserPointsHistory.defaultmparams, UserPointsHistory.mhandle);
				},
				parseData: function(data) {
					var s = '';

					function tpl(obj, name) {
						return '<table cellspacing="0" cellpadding="0" border="0"><caption>' + name + '<div class="UserPoints-curpoints">[' + data.users[name].points + ']</div></caption><tbody><tr><th>Исполнитель</th><th>Цель</th><th>Разница</th><th>Описание к действию</th><th>Локальное время исполнителя</th></tr>' + (function() {
							var h = '';
							for (var key in obj) {
								h += '<tr><td>' + obj[key].executor + '</td><td>' + name + '</td><td>' + obj[key].pointsDiff + '</td><td>' + obj[key].reason + '</td><td>' + obj[key].ltime + '</td></tr>';
							}
							return h;
						})() + '</tbody></table>';
					}
					for (var name in data.history) {
						s += '<div class="UserPoints-user">' + tpl(data.history[name], name) + '</div?';
					}
					return s;
				},
				mhandle: function(modal, section) {
					var insertTo,
						throbber = new g.ajaxonload({
							insertTo: (insertTo = section.find('div'))
						});
					$$.MediaWiki.raw(wgPageName, function(data) {
						throbber.off().destroy();
						insertTo.append(UserPointsHistory.parseData(data));
					});
				},
				defaultmparams: {
					id: 'UserPoints-modal-history',
					title: 'История действий',
					section: '<div class="UserPoints-userlist"></div>'
				},
				init: function() {
					if (g.wgTitle == 'Очки нарушений' && g.wgNamespaceNumber === 4 && g.wgAction === 'view') {
						g._.articleContent.prepend('<div style="text-align: center; line-height: normal;"><input id="UserPoints-history" style="display: none;" value="Просмотреть историю" type="button"></div>').find('#UserPoints-history').click(this.bhandle).fadeIn(250);
					}
				}
			});
			UserPointsHistory.init();
		},
		UserPoints: function UserPoints() {
			var $ = this,
				name = this.name;
			if (arguments[1] === this.Invoke) {
				return;
			}
			$$.extend(null, UserPoints, {
				defReason: g.wgUserName + ' не указал причины.',
				hasBlock: null,
				edit: function(b) {
					var delayID;
					b.click(function(e) {
						if (UserPoints.hasBlock) {
							$.ModalWindow('small', {
								title: 'Разблокировать ' + name,
								id: 'UserPoints-modal-unblock',
								section: '<div style="height: 100%;" class="display-flex justifyContent-center flexFlow-wrap"><div class="display-flex justifyContent-center">Участник ' + name + ' уже заблокирован. Хотите разблокировать его?</div><div class="display-flex justifyContent-center"><input type="button" class="UserPoints-unblock" value="Разблокировать" /></div></div>'
							}, function(modal, section) {
								var p = false;
								section.find('.UserPoints-unblock').click(function() {
									if (p) {
										return;
									}
									$$(this).prop('disabled', true);
									p = true;
									$$.MediaWiki.unblock(name, function(d) {
										try {
											if (d.error) {
												section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + d.error + '</div>');
												return;
											}
											section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">Участник ' + name + ' успешно разблокирован.</div>');
											UserPoints.hasBlock = false;
											UserPoints.btag && (UserPoints.btag.remove(), UserPoints.btag = null);
											UserPoints.abb();
										} catch (e) {
											section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + e + '</div>');
										} finally {
											delayID = g.delay(function() {
												$.ModalWindow(null);
											}, 2000);
										}
									});
								});
							}, function() {
								g.delay.clear(delayID);
							});
						} else {
							$.ModalWindow('medium', {
								id: 'UserPoints-modal',
								title: 'Очки нарушений',
								section: '<div class="display-flex justifyContent-center">Используйте нижние кнопки и поле для увеличения/уменьшения очков.</div><div class="display-flex alignItems-center justifyContent-center"><button class="UserPoints-decreasepoints fa fa-minus"></button><input class="UserPoints-currentpoints" type="text"><button class="UserPoints-increasepoints fa fa-plus"></button></div><div class="display-flex alignItems-center justifyContent-center"><textarea placeholder="Сообщение участнику..." class="UserPoints-reason"></textarea></div>',
								footer: '<input type="button" class="UserPoints-savechanges" value="Сохранить изменения"/>'
							}, function(modal, section) {
								var dec = section.find('.UserPoints-decreasepoints'),
									inc = section.find('.UserPoints-increasepoints'),
									pointsField = section.find('.UserPoints-currentpoints'),
									reasonField = modal.find('.UserPoints-reason');
								pointsField.value(UserPoints.curPoints);
								inc.click(function() {
									var v = +pointsField.value() || 0;
									pointsField.value(++v);
								});
								dec.click(function() {
									var v = +pointsField.value() || 0;
									!(v <= 0) && pointsField.value(--v) || pointsField.value(v);
								});

								function parseDate(date) {
									function p(n) {
										if (n < 10) {
											return '0' + n;
										}
										return n;
									}
									return p(date.getUTCDate()) + ':' + p(date.getUTCMonth() + 1) + ':' + date.getUTCFullYear();
								}
								var p = false;
								modal.find('.UserPoints-savechanges').click(function() {
									var points = +pointsField.value(),
										oldPoints,
										reason,
										date,
										blocked,
										id,
										ltime;
									if (!$$.isNumber(points) || p || points < 0) {
										return;
									}
									p = true;
									oldPoints = +UserPoints.curPoints;
									reason = $$.trim(reasonField.value()) || UserPoints.defReason;
									if (oldPoints == points) {
										return;
									}
									reasonField.prop('disabled', true);
									pointsField.prop('disabled', true);
									inc.prop('disabled', true);
									dec.prop('disabled', true);
									date = (ltime = parseDate(new Date(Date.now()))) + (id = '[' + $$.keygen() + ']');
									if (!(name in UserPoints.data.users)) {
										UserPoints.data.users[name] = {};
									}
									if (!(name in UserPoints.data.history)) {
										UserPoints.data.history[name] = {};
									}
									$$(this).prop('disabled', true);
									UserPoints.data.users[name].points = points;
									UserPoints.data.history[name][date] = {
										reason: reason,
										points: points,
										pointsDiff: (points - oldPoints),
										executor: g.wgUserName,
										ltime: ltime
									};
									if (points > oldPoints) {
										if (UserPoints.data.users[name].points - (UserPoints.data.users[name].points % 10) > oldPoints - (oldPoints % 10)) {
											$$.MediaWiki.block(name, Math.floor(UserPoints.data.users[name].points / 10) * 3, function(d) {
												if (d.error) {
													section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + d.error + '</div>');
													return;
												}
												UserPoints.btag = UserPoints.masthead.find('hgroup .tag').first().before('<span class="tag tag_b">Заблокирован(а)</span>').parent().find('.tag_b').fadeIn(250);
											});
											UserPoints.bbutton && UserPoints.bbutton.remove();
											blocked = UserPoints.hasBlock = true;
										}
										$$.MediaWiki.wallmessage((blocked ? 'Блокировка ' + id : 'Предупреждение ' + id + ''), reason, name);
									}
									$$.fetch('/api.php', {
										params: {
											action: 'edit',
											title: 'Warframe вики:Очки нарушений',
											text: JSON.stringify(UserPoints.data),
											summary: '#' + id,
											bot: true,
											notminor: true,
											token: g.wgEditToken,
											format: 'json'
										},
										method: 'POST'
									}).success(function(d) {
										try {
											if (d.error) {
												section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + d.error + '</div>');
											}
											if (d.edit.result == 'Success') {
												section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">Изменения успешно внесены. Сейчас это окно автоматически закроется.</div>');
												UserPoints.ptag.text('[' + (UserPoints.curPoints = +UserPoints.data.users[name].points) + ']');
											}
										} catch (e) {
											section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + e + '</div>');
										} finally {
											delayID = g.delay(function() {
												$.ModalWindow(null);
											}, 2000);
										}
									});
								});
							}, function() {
								g.delay.clear(delayID);
							});
						}
					});
				},
				data: null,
				groups: null,
				curPoints: null,
				ptag: null,
				btag: null,
				allowed: /(bureaucrat|sysop|helper|vstf|staff|Часовой|threadmoderator)/,
				abb: function() {
					var p = false,
						delayID;
					this.bbutton = this.masthead.find('hgroup .points').after('<span class="tag pblock">X</span>').parent().find('.pblock').click(function() {
						var ctx = this;
						if (p) {
							return;
						}
						p = true;
						$.ModalWindow('small', {
							title: 'Перманентная блокировка',
							id: 'UserPoints-pblock',
							section: '<div style="height: 100%;" class="display-flex justifyContent-center flexFlow-wrap"><div class="display-flex justifyContent-center">Вы действительно хотите навсегда заблокировать участника ' + name + '?</div><div class="display-flex justifyContent-center"><input type="button" class="UserPoints-pblock" value="Заблокировать" /></div></div>'
						}, function(m, section) {
							var p = false;
							section.find('.UserPoints-pblock').click(function() {
								if (p) {
									return;
								}
								$$(this).prop('disabled', (p = true));
								$$.MediaWiki.block(name, Infinity, function(d) {
									try {
										if (d.error) {
											section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + d.error + '</div>');
										} else {
											$$(ctx).remove();
											section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">Участник ' + name + ' успешно заблокирован!</div>');
											!UserPoints.btag && (UserPoints.btag = UserPoints.masthead.find('hgroup .tag').first().before('<span class="tag tag_b">Заблокирован(а)</span>').parent().find('.tag_b').fadeIn(250));
											UserPoints.masthead.find('.pblock').remove();
											UserPoints.hasBlock = true;
										}
									} catch (e) {
										section.html('<div class="display-flex justifyContent-center alignItems-center" style="height: 100%;">' + e + '</div>');
									} finally {
										delayID = g.delay(function() {
											$.ModalWindow(null);
										}, 2000);
									}
								});
							});
						}, function() {
							p = false;
							g.delay.clear(delayID);
						});
					});
				},
				init: function() {
					if (!(UserPoints.masthead = $$('#UserProfileMasthead')).length || !name) {
						return;
					}
					$$.MediaWiki.raw('Warframe вики:Очки нарушений', function(data) {
						UserPoints.data = (function(d) {
							if (!$$.isCommonObject(d)) {
								return {
									history: {},
									users: {}
								};
							}
							return d;
						})(data);
						var b = UserPoints.masthead.find('hgroup').append('<span class="tag points" style="display: none;">[' + (function() {
							try {
								return (UserPoints.curPoints = +data.users[name].points);
							} catch (e) {
								return (UserPoints.curPoints = 0);
							}
						})() + ']</span>').find('.tag.points').fadeIn(250);
						UserPoints.ptag = b;
						$$.MediaWiki.userinfo(name, function(data) {
							try {
								if (UserPoints.allowed.test(g.wgUserGroups.join(' ')) && !UserPoints.allowed.test(data.users[0].groups.join(' '))) {
									UserPoints.hasBlock = data.users[0].blockexpiry ? (function(a) {
										var x = UserPoints.masthead.find('.tag');
										x.each(function(e) {
											var x = $$(e);
											if (/блок.+(\(а\)|н|на)$/.test(x.text())) {
												UserPoints.btag = x;
												return false;
											}
										});
										return a;
									})(true) : false;
									UserPoints.edit(b);
									if (!UserPoints.hasBlock) {
										UserPoints.abb();
									}
									$$.addCSSRule('#UserProfileMasthead .tag.points:hover {background-color:#CB9600;cursor:pointer;} #UserProfileMasthead .pblock:hover {background-color:#d30000;cursor:pointer;}');
								}
							} catch (e) {}
						});
					});
				}
			});
			UserPoints.init();
		}
	});
	try {
		$$.Warframe = {
			g: this,
			r: new this.main()
		};
	} catch (e) {
		this.logError(e);
		this.log(e);
	}
	return (window.Warframe = 0);
};
(function(window, callbacks) {
	var document = window.document,
		Element = window.Element,
		Node = window.Node,
		Object = window.Object,
		Array = window.Array,
		Function = window.Function,
		RegExp = window.RegExp,
		Error = window.Error,
		Math = window.Math,
		Date = window.Date,
		XMLHttpRequest,
		getComputedStyle,
		localStorage,
		JSON,
		Event,
		Core,
		$ = {},
		global = window,
		Gabriel = function(s, p) {
			return new Core(s, p, Gabriel);
		},
		VERSION = '0.11',
		matchesSelector;
	g = 'Gabriel' + (Math.random().toString().slice(2));
	//Chrome 8.0+; FF 8.0+; Opera 12.0+; Safari 5.1+; not: IE, Edge;
	if ([document.implementation.createHTMLDocument, (XMLHttpRequest = window.XMLHttpRequest), (getComputedStyle = window.getComputedStyle), (localStorage = window.localStorage), (JSON = window.JSON), (matchesSelector = (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.matchesSelector)), Element.prototype.querySelectorAll, Element.prototype.querySelector, Element.prototype.getBoundingClientRect, Object.create, Object.keys, document.createElement('div').classList, Element.prototype.addEventListener, Element.prototype.removeEventListener, Element.prototype.dispatchEvent, (Event = window.Event)].some(function(e) {
			return !e;
		})) {
		throw new Error('Exception');
	}
	var die = function(from, target, callback) {
			if (Gabriel.isEmptyObject(from[target])) {
				delete from[target];
				Gabriel.isFunction(callback) && callback();
			}
		},
		trim = function(target) {
			if (Gabriel.isString(target)) {
				return target.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			}
		};
	Gabriel.trim = trim;
	(function(Gabriel) {
		Gabriel.isNumber = function(target) {
			return target !== null && !this.isBoolean(target) && typeof + target == 'number' && !window.isNaN(target);
		};
		Gabriel.isString = function(target) {
			return typeof target == 'string';
		};
		Gabriel.isObject = function(target) {
			return target instanceof Object;
		};
		Gabriel.isArray = function(target) {
			return target instanceof Array;
		};
		Gabriel.isFunction = function(target) {
			return typeof target == 'function';
		};
		Gabriel.isRegExp = function(target) {
			return target instanceof RegExp;
		};
		Gabriel.isNode = function(target) {
			return target instanceof Node;
		};
		Gabriel.isGabriel = function(target) {
			return target instanceof Gabriel;
		};
		Gabriel.isBoolean = function(target) {
			return typeof target == 'boolean';
		};
		Gabriel.isEmptyObject = function(target) {
			var p,
				i = 0;
			if (this.isObject(target)) {
				if (this.isArray(target)) {
					for (; i < target.length;) {
						return false;
					}
					return true;
				}
				for (p in target) {
					return false;
				}
				return true;
			} else {
				return true;
			}
		};
		Gabriel.isEmptyArray = function() {
			return this.isEmptyObject.apply(this, arguments);
		};
		Gabriel.isCommonObject = function(target) {
			return this.isObject(target) && target.constructor == Object;
		};
	})(Gabriel);
	Gabriel.toArray = function() {
		return Array.prototype.slice.call(arguments[0] || true);
	};
	Gabriel.inArray = function(array, target) {
		if (this.isArray(array)) {
			return (!!(~array.indexOf(target)));
		} else {
			return null;
		}
	};
	Gabriel.fn = function() {};
	Gabriel.isLikeArray = function(target) {
		var keys;
		if (this.isObject(target)) {
			keys = Object.keys(target);
			if (this.inArray(keys, 'length') ? target.length === (keys.length - 1) : target.length === keys.length) {
				return true;
			}
			return false;
		}
	};
	Gabriel.extend = function(settings, gtarget) {
		settings = this.isCommonObject(settings) && settings || {};
		gtarget = this.isObject(gtarget) && gtarget || {};
		var deep = settings.deep || false,
			rewrite = 'rewrite' in settings ? settings.rewrite : true,
			clone,
			extend = function extend(target) {
				for (var i = 1; i < arguments.length; i++) {
					for (var prop in arguments[i]) {
						if (prop in target && (!rewrite || gtarget == arguments[i][prop]) || !Object.hasOwnProperty.call(arguments[i], prop)) {
							continue;
						}
						if (deep && (this.isCommonObject(arguments[i][prop]) || this.isArray(arguments[i][prop]))) {
							this.isArray(arguments[i][prop]) ? (clone = []) : (clone = {});
							target[prop] = extend.call(this, clone, arguments[i][prop]);
							continue;
						}
						target[prop] = arguments[i][prop];
					}
				}
				return target;
			};
		return (gtarget = extend.apply(this, this.toArray(arguments).slice(1)));
	};
	Gabriel.createPrototype = function(initial, prototype) {
		if (this.isObject(initial)) {
			if (this.isCommonObject(initial)) {
				return this.extend(null, Object.create(prototype), initial);
			}
			if (this.isFunction(initial)) {
				return (initial.prototype = prototype), initial;
			}
		} else {
			return {};
		}
	};
	Gabriel.forEach = function(target, callback, context) {
		var i = 0,
			prop;
		if (this.isFunction(callback)) {
			context ? (callback = callback.bind(context)) : undefined;
			if (this.isArray(target) || this.isGabriel(target)) {
				for (; i < target.length; i++) {
					if (callback(target[i], i) === false) {
						break;
					}
				}
				return target;
			}
			if (this.isObject(target)) {
				for (prop in target) {
					if (callback(target[prop], i++) === false) {
						break;
					}
				}
				return target;
			}
		}
	};
	Gabriel.fetch = (function(Gabriel) {
		Gabriel.parseJSON = function(target) {
			if (!Gabriel.isString(target) || !target) {
				return null;
			}
			try {
				try {
					return JSON.parse(target);
				} catch (err) {
					return target;
				}
			} catch (err) {
				return target;
			}
		};
		Gabriel.parseHTML = function(markup) {
			var pseudoDocument = document.implementation.createHTMLDocument(true);
			pseudoDocument = Gabriel(pseudoDocument);
			pseudoDocument.find('html').html(markup);
			return pseudoDocument.children();
		};

		function parseString(t) {
			try {
				return window.encodeURIComponent(window.decodeURIComponent(t))
			} catch (e) {
				return t;
			}
		}

		function parseObj(u, o) {
			var f = !f;
			for (var k in o) {
				if (f) {
					u += '?' + parseString(k) + '=' + parseString(o[k]);
					f = !f;
					continue;
				}
				u += '&' + parseString(k) + '=' + parseString(o[k]);
			}
			return (u).replace(/\s/g, '_');
		}

		function serialize(url, params) {
			if (url === null && Gabriel.isCommonObject(params)) {
				return (parseObj('', params)).replace('?', '');
			}
			if (url === undefined) {
				if (Gabriel.isCommonObject(params)) {
					return parseObj(window.location.pathname, params);
				}
				return parseObj(window.location.pathname);
			}
			if (Gabriel.isString(url)) {
				return params === undefined ? url : Gabriel.isCommonObject(params) ? parseObj(url, params) : '';
			}
			if (Gabriel.isCommonObject(url) && params === undefined) {
				return parseObj(window.location.pathname, url);
			}
		}

		function fetch(url, setup) {
			setup = setup || {};
			var ajaxAccept = Gabriel.isArray(setup.accept) ? setup.accept : ['*/*'],
				ajaxContentType = Gabriel.isString(setup.contentType) && setup.contentType ? setup.contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				ajaxHeaders = Gabriel.isCommonObject(setup.headers) ? Gabriel.extend(null, {
					'X-Requested-With': 'XMLHttpRequest'
				}, setup.headers) : {
					'X-Requested-With': 'XMLHttpRequest'
				},
				ajax = new XMLHttpRequest(),
				ajaxRequestMethod = (setup.method || 'GET').toUpperCase(),
				ajaxRequestUrl = Gabriel.isCommonObject(setup.params) && !(Gabriel.isEmptyObject(setup.params)) && ajaxRequestMethod != 'POST' ? serialize(url, setup.params) : (serialize(url) || window.location.pathname),
				prop,
				i = 0,
				self = this;
			Gabriel.extend(null, ajax, {
				onloadstart: function() {
					self.before();
				},
				onloadend: function() {
					if (this.status >= 400 && this.status < 600) {
						self.error(Gabriel.parseJSON(this.response), this);
					}
					self.complete(Gabriel.parseJSON(this.response), this);
				},
				onload: function() {
					if (this.status >= 200 && this.status < 400 || this.status === 0) {
						self.success(Gabriel.parseJSON(this.response), this);
					}
				}
			});
			ajax.open(ajaxRequestMethod, ajaxRequestUrl, true);
			for (prop in ajaxHeaders) {
				ajax.setRequestHeader(prop, ajaxHeaders[prop]);
			}
			ajax.setRequestHeader('Content-Type', ajaxContentType);
			for (; i < ajaxAccept.length; i++) {
				ajax.setRequestHeader('Accept', ajaxAccept[i]);
			}
			ajax.send(ajaxRequestMethod == 'POST' && Gabriel.isCommonObject(setup.params) && !(Gabriel.isEmptyObject(setup.params)) ? serialize(null, setup.params) : null);
		}
		Gabriel.createPrototype(fetch, {
			success: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.success = fn;
				}
				return this;
			},
			error: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.error = fn;
				}
				return this;
			},
			complete: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.complete = fn;
				}
				return this;
			},
			before: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.before = fn;
				}
				return this;
			}
		});
		return function(url, params) {
			return new fetch(url, params);
		};
	})(Gabriel);
	(function(Gabriel) {
		Gabriel.storage = function() {
			return localStorage;
		};
		Gabriel.extend(null, Gabriel.storage, {
			get: function(target) {
				if (Gabriel.isString(target) || Gabriel.isNumber(target)) {
					return Gabriel.parseJSON(localStorage.getItem(target));
				}
			},
			set: function(target, value) {
				if (Gabriel.isString(target) || Gabriel.isNumber(target)) {
					if (Gabriel.isObject(value)) {
						try {
							value = JSON.stringify(value);
						} catch (err) {}
					}
					localStorage.setItem(target, value);
					return value;
				}
			},
			remove: function(target) {
				if (Gabriel.isString(target) || Gabriel.isNumber(target)) {
					localStorage.removeItem(target);
					return target;
				}
			},
			clear: function() {
				return localStorage.clear();
			}
		});
	})(Gabriel);

	function push(target, elems) {
		for (var i = 0; i < elems.length; i++) {
			target[i] = elems[i];
		}
		target.length = elems.length || 0;
	}
	Core = function(selector, extend, Gabriel) {
		if (selector) {
			if (Gabriel.isGabriel(selector)) {
				return selector;
			}
			if (Gabriel.isFunction(selector)) {
				return selector(Gabriel), this;
			}
			if (Gabriel.isArray(selector)) {
				push(this, selector.filter(function(e) {
					return Gabriel.isNode(e) || e === window || e === document;
				}));
			}
			if (Gabriel.isString(selector) && !/\d/.test(selector[0])) {
				push(this, document.querySelectorAll(selector));
			}
			if (Gabriel.isNode(selector) || selector === window) {
				push(this, [selector]);
			}
		}
	};

	function iargs(message) {
		this.name = 'IncorrectArguments';
		this.message = (message || '');
		return this;
	}

	function IncorrectArguments(message) {
		throw new iargs(message);
	}
	Gabriel.createPrototype(iargs, Error.prototype);

	function error(exception) {
		throw new Error(exception);
	}
	Gabriel.extend(null, $, {
		each: function(fn, ctx) {
			if (!this.isFunction(fn)) {
				IncorrectArguments('.each(function, context*)');
			}
			return this.length && this.forEach(this, fn, ctx) || this;
		},
		equal: function(eq) {
			if (this.isNumber(eq)) {
				return Gabriel(this[eq >= 0 ? eq : this.length + eq]);
			} else {
				IncorrectArguments('.equal(number)');
			}
		},
		first: function() {
			return this.equal(0);
		},
		last: function() {
			return this.equal(-1);
		},
		odd: function() {
			if (this.length < 2) {
				return Gabriel();
			}
			return Gabriel(Array.prototype.filter.call(this, function() {
				return !!(arguments[1] % 2);
			}));
		},
		even: function() {
			if (this.length < 1) {
				return Gabriel();
			}
			return Gabriel(Array.prototype.filter.call(this, function() {
				return !(arguments[1] % 2);
			}));
		}
	});
	Gabriel.forEach([['next', 'nextElementSibling'], ['prev', 'previousElementSibling'], ['parent', 'parentElement']], function(p, y) {
		y = p[0];
		p = p[1];
		$[y] = function(steps) {
			var elem = this[0],
				i = 0;
			if (!this.length || !elem) {
				return this;
			}
			steps = this.isNumber(steps) && steps || 1;
			for (; i < steps; i++) {
				if (!elem[p]) {
					return Gabriel();
				}
				elem = elem[p];
			}
			return Gabriel(elem);
		};
	});
	Gabriel.extend(null, $, {
		remove: function() {
			return this.each(function(e) {
				e.parentElement && e.parentElement.removeChild(e);
			}, this);
		},
		save: function(scope, name) {
			if (arguments.length == 1 && (this.isString(scope) || this.isNumber(scope))) {
				name = scope;
				scope = Gabriel;
			}
			if (this.isObject(scope) && (this.isString(name) || this.isNumber(name))) {
				if (scope == Gabriel && name in Gabriel) {
					error(name + ' already defined in Gabriel, use other scope');
				}
				scope[name] = this;
			} else {
				IncorrectArguments('.save(name|scope, name)');
			}
			return this;
		},
		matches: function(selector) {
			if (!this[0]) {
				return false;
			}
			if (!this.isString(selector)) {
				IncorrectArguments('.matches(stringSelector)');
			}
			return matchesSelector.call(this[0], selector);
		},
		children: function() {
			if (!this.length) {
				return Gabriel();
			}
			return Gabriel(this[0] && this.toArray(this[0].children));
		},
		closest: function(selector) {
			var target = this[0],
				self = target,
				empty = Gabriel();
			if (target) {
				if (this.isString(selector)) {
					while (target) {
						if (matchesSelector.call(target, selector) && target != self) {
							return Gabriel(target);
						} else {
							target = target.parentElement;
							if (target === null) {
								return empty;
							}
						}
					}
				}
				if (this.isNumber(selector)) {
					return this.parent(selector);
				}
			} else {
				return empty;
			}
		},
		find: function(selector) {
			if (this.isString(selector)) {
				var result = [];
				this.each(function(e) {
					if (e === window) {
						return;
					}
					result = result.concat(this.toArray(e.querySelectorAll(selector)));
				}, this);
				for (var i = 0; i < result.length; i++) {
					for (var j = (1 + i); j < result.length; j++) {
						if (result[i] === result[j]) {
							result.splice(j, 1);
							j--;
						}
					}
				}
				return Gabriel(result);
			}
			IncorrectArguments('.find(stringSelector)');
		},
		attr: function(attr, value) {
			var target = this[0],
				attrs,
				i = 0,
				map = {};
			if (target) {
				if (!arguments.length) {
					attrs = Array.prototype.slice.call(this[0].attributes);
					for (; i < attrs.length; ++i) {
						map[attrs[i].name] = attrs[i].value;
					}
					return map;
				}
				if (value === undefined) {
					return target.getAttribute(attr) || null;
				}
				if (value === null) {
					return this.each(function(e) {
						e.removeAttribute(attr);
					});
				}
				return this.each(function(e) {
					e.setAttribute(attr, value);
				});
			}
		}
	});
	Gabriel.forEach([['addClass', 'add'], ['removeClass', 'remove'], ['toggleClass', 'toggle']], function(q, z) {
		z = q[1];
		q = q[0];
		$[q] = function(className) {
			if (className === undefined) {
				IncorrectArguments('.' + q + '(className|array[classNames{1, }])');
			}
			var i;
			if (this.isArray(className)) {
				return this.each(function(e) {
					for (i = 0; i < className.length; i++) {
						e.classList[z](className[i]);
					}
				});
			}
			return this.each(function(e) {
				e.classList[z](className);
			});
		};
	});
	$.hasClass = function(className) {
		if (!this.isNumber(className) && !this.isString(className)) {
			IncorrectArguments('.hasClass(className)');
		}
		return this[0] ? (this[0]).classList.contains(className) : false;
	};
	Gabriel.forEach([['text', 'textContent'], ['html', 'innerHTML']], function(r, i) {
		i = r[1];
		r = r[0];
		$[r] = function(content) {
			return content !== undefined ? this.each(function(e) {
				e[i] = content;
			}) : this[0] && this[0][i] || null;
		};
	});
	Gabriel.extend(null, $, {
		prop: function(prop, value) {
			if (prop !== undefined && this[0]) {
				return value !== undefined ? this.each(function(e) {
					e[prop] = value;
				}) : !this[0] ? this : this.isFunction(this[0][prop]) ? this[0][prop].bind(this[0]) : this[0][prop];
			}
			IncorrectArguments('.prop(nodeProperty, newNodeValue*)');
		},
		style: function(prop, value) {
			var target = this[0],
				fn;
			if (prop !== undefined && target) {
				if (this.isCommonObject(prop)) {
					fn = function(e) {
						for (var key in prop) {
							e.style[key] = prop[key];
						}
					};
					value = null;
				} else {
					fn = function(e) {
						e.style[prop] = value;
					};
				}
				return value !== undefined ? this.each(fn) : getComputedStyle(target)[prop];
			}
			IncorrectArguments('.style(get: nodeStyleProperty, set: NewNodeStyleValue*)');
		},
		value: function(val) {
			return val === undefined ? this.prop('value') : this.prop('value', val);
		},
		match: function(expr, txt) {
			var target = this[0],
				content = txt && this.isBoolean(txt) ? Gabriel(target).text() : Gabriel(target).html();
			if (!target) {
				return false;
			}
			if (!expr) {
				IncorrectArguments('.match(regexp|number|string, textOnly*)');
			}
			if (target && expr) {
				return this.isRegExp(expr) ? expr.test(content) : this.isString(expr) || this.isNumber(expr) ? new RegExp(expr, 'g').test(content) : false;
			}
		}
	});
	$.hide = function() {
		return this.style('display', 'none');
	};
	var defaultDisplays = {};

	function getDefaultDisplay(nodeName) {
		if (nodeName in defaultDisplays) {
			return defaultDisplays[nodeName];
		}
		var iframe = document.body.appendChild(document.createElement('iframe')),
			elem;
		iframe.frameBorder = 0;
		iframe.width = 0;
		iframe.height = 0;
		iframe.style.display = 'none';
		elem = iframe.contentDocument.body.appendChild(document.createElement(nodeName));
		defaultDisplays[nodeName] = getComputedStyle(elem, null).display;
		document.body.removeChild(iframe);
		return defaultDisplays[nodeName];
	}
	$.show = function() {
		return this.each(function(e) {
			e = Gabriel(e);
			if (e.isHidden()) {
				e.style('display', null);
				if (e.isHidden()) {
					e.style('display', getDefaultDisplay(e.prop('tagName')));
				}
			}
		});
	};
	$.among = function(selector) {
		var matches = [];
		return this.each(function(e) {
			Gabriel(e).matches(selector) ? matches.push(e) : undefined;
		}), Gabriel(matches);
	};
	$.load = function(url, params, selector, callback) {
		var html;
		url = url || window.location.pathname;
		if (this.isString(params)) {
			callback = selector;
			selector = params;
			params = undefined;
		}
		callback = callback || $$.fn;
		this.fetch(url, {
			params: params,
			accept: ['text/html']
		}).complete((function(data) {
			var target = this.parseHTML(data).find(selector).equal(0);
			html = (target.length && target.html()) || null;
			this.each(function(e) {
				Gabriel(e).html(html);
				callback.call(e);
			});
		}).bind(this));
		return this;
	};
	$.quick = function(fn) {
		return (this.isFunction(fn) && fn.call(this, Gabriel)), this;
	};
	$.my = function(count) {
		count = this.isNumber(count) ? count : 1;
		return this.toArray(this).slice(0, count);
	};
	$.exist = function() {
		return !!(this.length);
	};
	var keygen = Gabriel.keygen = function() {
		return +(Math.random() + '').slice(2);
	};
	Gabriel.ikeys = Gabriel.createPrototype({
		add: function(target) {
			return this.isObject(target) ? (target[g] = {}) : undefined;
		},
		has: function(target) {
			return this.isObject(target) && g in target;
		},
		get: function(target) {
			return this.isObject(target) && g in target ? target[g] : null;
		},
		remove: function(target) {
			return this.has(target) ? ((delete target[g]), true) : false;
		}
	}, Gabriel.prototype);
	Gabriel.extend(null, (Gabriel.modules = {}), {
		Event: Gabriel.createPrototype({
			add: function(target, type, handler) {
				var ev,
					handlers,
					qdata,
					queue,
					i = 0;
				if (this.isCommonObject(type)) {
					for (ev in type) {
						this.add(target, ev, type[ev]);
					}
					return;
				}
				handler = this.isArray(handler) ? handler.filter(function(e) {
					return Gabriel.isFunction(e);
				}) : handler;
				if (this.isString(type) && (this.isFunction(handler) || this.isArray(handler) && !this.isEmptyArray(handler))) {
					qdata = !this.ikeys.has(target) ? this.ikeys.add(target) : this.ikeys.get(target);
					handlers = !('handlers' in qdata) ? (qdata.handlers = {}) : qdata.handlers;
					queue = this.isArray(handler) ? handler : [handler];
					if (type in handlers) {
						handlers[type] = handlers[type].concat(queue);
					} else {
						handlers[type] = queue;
					}
					for (; i < queue.length; ++i) {
						target.addEventListener(type, queue[i]);
					}
				}
			},
			clear: function(target) {
				die(target[g], 'handlers');
				die(target, g);
				return true;
			},
			remove: function(target, type, handler) {
				var qdata = this.ikeys.get(target),
					ev,
					i,
					handlers;
				if (Gabriel.isCommonObject(qdata)) {
					handlers = qdata.handlers;
					if (!type) {
						for (ev in handlers) {
							for (i = 0; i < handlers[ev].length; i++) {
								target.removeEventListener(ev, handlers[ev][i]);
							}
							delete handlers[ev];
						}
						this.clear(target);
					}
					if (this.isString(type) && type in handlers) {
						if (this.isNumber(handler) && ((handler = +handler), (handler >= 0 && handler in handlers[type])) || handler < 0 && (handler = handler + handlers[type].length) in handlers[type]) {
							target.removeEventListener(type, handlers[type][handler]);
							handlers[type].splice(handler, 1);
						} else if (Gabriel.isFunction(handler) && Gabriel.inArray(handlers[type], handler)) {
							i = handlers[type].indexOf(handler);
							target.removeEventListener(type, handlers[type][i]);
							handlers[type].splice(i, 1);
						} else {
							for (i = 0; i < handlers[type].length; i++) {
								target.removeEventListener(type, handlers[type][i]);
								handlers[type].splice(i, 1);
								i++;
							}
						}
						if (!handlers[type].length) {
							delete handlers[type];
							this.clear(target);
						}
					}
				}
			}
		}, Gabriel.prototype),
		Data: Gabriel.createPrototype({
			clear: function(target) {
				die(target[g], 'data');
				die(target, g);
			},
			get: function(target, prop) {
				if (this.ikeys.has(target) && 'data' in target[g]) {
					return prop ? target[g].data[prop] : target[g].data;
				}
			},
			add: function(target, prop, value) {
				var qdata = this.ikeys.has(target) ? this.ikeys.get(target) : this.ikeys.add(target),
					data;
				if (qdata !== null) {
					data = 'data' in qdata ? qdata.data : (qdata.data = {});
					data[prop] = value;
				}
			},
			remove: function(target, prop) {
				var qdata = this.ikeys.get(target);
				if (qdata !== null && 'data' in qdata) {
					if (prop) {
						delete qdata.data[prop];
					} else {
						delete qdata.data;
					}
					this.clear(target);
				}
			},
			rewrite: function(target) {}
		}, Gabriel.prototype)
	});
	Gabriel.forEach([['off', 'remove'], ['on', 'add']], function(l, s) {
		s = l[0];
		l = l[1];
		$[s] = function(type, fn) {
			return this.each(function(elem) {
				Gabriel.modules.Event[l](elem, type, fn);
			});
		};
	});
	Gabriel.extend(null, $, {
		once: function(type, fn) {
			if (this.isArray(fn)) {
				for (var i = 0; i < fn.length; i++) {
					this.once(type, fn[i]);
				}
				return this;
			}
			if (!this.isFunction(fn)) {
				IncorrectArguments('.once(eventType, function)');
			}
			return this.each(function(elem) {
				Gabriel.modules.Event.add(elem, type, function h() {
					fn.apply(this, arguments);
					Gabriel.modules.Event.remove(elem, type, h);
				});
			});
		},
		toggle: function(type) {
			var queue = this.isArray(arguments[1]) && arguments[1] || this.toArray(arguments).filter((function(e) {
					return this.isFunction(e);
				}).bind(this)),
				f = 0,
				h = function() {
					return function h() {
						queue[f].apply(this, arguments);
						f++;
						f = (f > queue.length - 1) ? 0 : f;
					};
				};
			return queue.length > 1 ? this.each(function(elem) {
				Gabriel.modules.Event.add(elem, type, h());
			}) : this.on(type, queue);
		},
		data: function(prop, value) {
			var target;
			if (prop === null) {
				return this.each(function(e) {
					this.modules.Data.remove(e);
				}, this);
			}
			if ((target = this[0]) && value === undefined) {
				return this.modules.Data.get(target, prop);
			}
			if (this.isString(prop) || this.isNumber(prop)) {
				return value === null ? this.each(function(e) {
					this.modules.Data.remove(e, prop);
				}, this) : this.each(function(e) {
					this.modules.Data.add(e, prop, value);
				}, this);
			}
		}
	});
	Gabriel.forEach(['keydown', 'keypress', 'keyup', 'mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu', 'wheel', 'mouseleave', 'mouseout', 'select', 'resize', 'scroll', 'input'], function(b) {
		$[b] = function(fn) {
			return this.on(b, fn);
		};
	});
	Gabriel.forEach(['focus', 'blur'], function(z) {
		$[z] = function() {
			var t = this[0];
			return t && t[z]() || this;
		};
	});
	Gabriel.forEach([['append', 'beforeend'], ['prepend', 'afterbegin'], ['after', 'afterend'], ['before', 'beforebegin']], function(x, m) {
		m = x[0];
		x = x[1];
		$[m] = function(html) {
			return this.each(function(e) {
				e.insertAdjacentHTML(x, html);
			});
		};
	});
	var ins = {
		appendChild: function(parent, child) {
			parent.appendChild(child);
		},
		prependChild: function(parent, child) {
			parent.insertBefore(child, parent.firstChild || null);
		},
		insertAfter: function(parent, child) {
			if (parent.parentElement) {
				parent.parentElement.insertBefore(child, parent.nextElementSibling || null);
			}
		},
		insertBefore: function(parent, child) {
			if (parent.parentElement) {
				parent.parentElement.insertBefore(child, parent);
			}
		}
	};
	Gabriel.forEach(['appendChild', 'prependChild', 'insertAfter', 'insertBefore'], function(s) {
		$[s] = function(child, live) {
			return this.each(function(e, i) {
				ins[s](e, child);
				child = child.cloneNode(true);
			}, this);
		};
	});
	Gabriel.forEach(['appendTo', 'prependTo'], function(d) {
		$[d] = function(selector) {
			var n = d.slice(0, -2) + 'Child',
				target = Gabriel(selector);
			if (this.exist()) {
				return this.each(function(elem) {
					target[n](elem);
				}), target;
			}
			return this;
		};
	});
	Gabriel.forEach(['height', 'width'], function(j) {
		$[j] = function() {
			var target = this[0];
			if (target) {
				j = j[0].toUpperCase() + j.slice(1);
				if (target === window) {
					return document.documentElement['client' + j];
				}
				if (target === document) {
					return document.documentElement['offset' + j];
				}
				return target['offset' + j];
			}
		};
	});
	$.isHidden = function() {
		var target = this[0];
		if (!target) {
			return false;
		}
		if (!target.offsetHeight && !target.offsetWidth) {
			return true;
		}
		return false;
	};
	$.offset = function() {
		var target = this[0],
			rect,
			pageYOffset = window.pageYOffset,
			pageXOffset = window.pageXOffset,
			_default = {
				top: null,
				left: null
			};
		if (!target) {
			return this;
		}
		if (this.isHidden()) {
			return _default;
		}
		if (target !== window || target !== document) {
			rect = target.getBoundingClientRect();
			return {
				top: pageYOffset + rect.top,
				left: pageXOffset + rect.left
			};
		}
		return _default;
	};
	(function(Gabriel) {
		var animations = {
			fadeOut: function(target, duration) {
				target = Gabriel(target);
				if (target.style('display') !== 'none') {
					target.style('animation', 'fadeOut ' + (duration / 1000) + 's linear 0s forwards');
					window.setTimeout(function() {
						target.style({
							animation: null
						}).hide();
					}, duration);
				}
			},
			fadeIn: function(target, duration) {
				target = Gabriel(target);
				if (target.style('display') === 'none') {
					target.style({
						animation: 'fadeIn ' + (duration / 1000) + 's linear 0s'
					}).show();
					window.setTimeout(function() {
						target.style('animation', null);
					}, duration);
				}
			}
		};

		function find(target) {
			for (var i = 0; i < this.current.length; i++) {
				if (this.current[i].target === target) {
					return this.current[i];
				}
			}
			return false;
		}
		var Sequence = Gabriel.Sequence = Gabriel.createPrototype(function() {
				var queue = Gabriel.toArray(arguments).filter(function(e, i) {
						return !(i % 2) && Gabriel.isFunction(e);
					}),
					delays = Gabriel.toArray(arguments).filter(function(e, i) {
						return !!(i % 2) && Gabriel.isNumber(e);
					}),
					init = {},
					length;
				if (queue.length === delays.length && ![queue.length, delays.length].some(function(e) {
						return e === 0;
					})) {
					length = queue.length;
					for (var i = 0; i < length; i++) {
						init[i] = {
							delay: delays[i],
							fn: queue[i]
						};
					}
				}
				init.length = length || 0;
				this.init = init;
			}, {
				add: function(fn, delay) {
					if (Gabriel.isFunction(fn) && Gabriel.isNumber(delay)) {
						this.init[this.init.length++] = {
							delay: delay,
							fn: fn
						};
					}
					return this;
				},
				remove: function(i) {
					if (i in this.init) {
						Array.prototype.splice.call(this.init, i, 1);
					}
					return this;
				},
				fncomplete: function(fn) {
					if (Gabriel.isFunction(fn)) {
						this.fncomplete = fn;
					}
					return this;
				},
				success: function(fn) {
					if (Gabriel.isFunction(fn)) {
						this.success = fn;
					}
					return this;
				},
				start: function() {
					var i = 0;

					function Q(sequence) {
						if (sequence[i]) {
							window.setTimeout((function() {
								sequence[i].fn();
								Array.prototype.splice.call(sequence, i, 1);
								this.fncomplete();
								Q.call(this, sequence);
							}).bind(this), sequence[i].delay);
						} else {
							this.success();
						}
					}
					Q.call(this, this.init);
					return this;
				}
			}),
			AnimateProto = {},
			Animate = Gabriel.Animate = Gabriel.createPrototype({
				current: [],
			}, AnimateProto);
		Gabriel.forEach(['fadeIn', 'fadeOut'], function(n) {
			AnimateProto[n] = function(target, duration, a3, a4, a5, a6, a7) {
				duration = Gabriel.isNumber(duration) ? duration : 500;
				var sequence;
				if ((sequence = find.call(this, target))) {
					sequence.add(animations[n].bind(animations, target, duration, a3, a4, a5, a6, a7), duration);
					return;
				}
				this.current.push(sequence = new Gabriel.Sequence(animations[n].bind(animations, target, duration, a3, a4, a5, a6, a7), 0));
				sequence.target = target;
				sequence.success((function() {
					this.current.splice(this.current.indexOf(target), 1);
				}).bind(this));
				sequence.start();
			};
		});
		Gabriel.forEach(['fadeIn', 'fadeOut'], function(d) {
			$[d] = function() {
				var args = this.toArray(arguments);
				return this.each(function(e) {
					this.Animate[d].apply(this.Animate, [e].concat(args));
				}, this);
			};
		});
	})(Gabriel);
	(function(Gabriel) {
		var CSS;
		Gabriel.addCSSRule = function(cssCode) {
			if (!cssCode || !this.isString(cssCode)) {
				IncorrectArguments('.addCSSRule(cssRuleString)');
			}
			var ret = [],
				i;
			cssCode = cssCode.replace(/(\t|\n|\s*\/.+?\/\s*)/g, '').match(/[\w\d\-\_\.\[\]\s\#\"\=\,\>\~\+\(\)\:\*]+(\{.+?\})/g);
			if (!CSS) {
				CSS = (function(styleSheets, stylenode) {
					Gabriel(stylenode).appendTo('head');
					for (i = 0; i < styleSheets.length; i++) {
						if (styleSheets[i].ownerNode == stylenode) {
							return styleSheets[i];
						}
					}
				}).call(this, document.styleSheets, document.createElement('style'));
			}
			if (cssCode.length >= 1) {
				for (i = 0; i < cssCode.length; i++) {
					cssCode[i] = trim(cssCode[i]);
				}
			}
			if (cssCode.length == 1) {
				return CSS.insertRule(cssCode[0], CSS.cssRules.length);
			} else {
				for (i = 0; i < cssCode.length; i++) {
					ret.push(CSS.insertRule(cssCode[i], CSS.cssRules.length));
				}
				return ret;
			}
		};
		Gabriel.removeCSSRule = function(index) {
			var deletedRules = [];
			if (CSS) {
				if (this.isArray(index) && index.every(function(e) {
						return this.isNumber(e);
					})) {
					for (var i = 0; i < index.length; i++) {
						deletedRules.push(CSS.cssRules[index[i] - (i ? 1 : 0)].cssText);
						CSS.deleteRule(index[i] - (i ? 1 : 0));
					}
				} else if (this.isNumber(index)) {
					deletedRules.push(CSS.cssRules[index].cssText);
					CSS.deleteRule(index);
				}
			}
			return deletedRules;
		};

		function parseCSSRules(props) {
			var t = {},
				temp;
			for (var i = 0; i < props.length; i++) {
				if (!props[i]) {
					continue;
				}
				temp = props[i].split(':');
				t[trim(temp[0])] = trim(temp[1]);
			}
			return t;
		}
		Gabriel.getCSSRules = function(index) {
			var rules = {
				length: 0
			};
			if (CSS) {
				for (var i = 0; i < CSS.cssRules.length; i++) {
					rules[i] = {
						selector: CSS.cssRules[i].selectorText,
						properties: parseCSSRules(trim(CSS.cssRules[i].cssText.replace(/(\t|\n|\s*\/.+?\/\s*)/g, '').match(/(\{.+?\})/g).join('').replace(/\{|\}/g, '')).split(';'))
					};
					rules.length++;
				}
			}
			return this.isNumber(index) && index in rules ? rules[index] : rules;
		};
	})(Gabriel);
	Gabriel.createPrototype(Core, Gabriel.createPrototype(Gabriel.extend(null, {
		length: 0
	}, $), Gabriel.extend(null, Gabriel.prototype, Core, Gabriel)));
	(function(Gabriel) {
		document.addEventListener('DOMContentLoaded', function f() {
			window.Gabriel = Gabriel;
			for (var i = 0; i < callbacks.length; i++) {
				callbacks[i](Gabriel, window, document, Object, Math, Date, RegExp, Array, JSON);
			}
			this.removeEventListener('DOMContentLoaded', f);
		});
	})(Gabriel);
})(window, [Warframe.bind(Warframe)]);