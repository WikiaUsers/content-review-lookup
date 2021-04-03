/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Загрузить js для карты
importScriptPage('MediaWiki:Maps.js');

/*
var Crossout = (function(window) {
	'use strict';
	if (window === null) {
		throw new TypeError('window is not found');
	}
	var $;
	var jQuery;
	if (typeof window.jQuery !== 'undefined') {
		jQuery = $ = window.jQuery;
	} else {
		throw new Error('jQuery is undefined');
	}
	var mw = window.mw || window.mediaWiki;
	if (!mw || typeof mw !== 'object') {
		throw new Error('mw is not defined');
	}
	function random(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}
	function probability(pcoeff) {
		return random(0, 100) / 100 < pcoeff;
	}
	var editToken = mw.user.tokens.get('editToken');
	var wgUserName = mw.config.get('wgUserName');
	var wgPageName = mw.config.get('wgPageName');
	var wgUserGroups = mw.config.get('wgUserGroups');
	var wgAction = mw.config.get('wgAction');
	var wgCanonicalSpecialPageName = mw.config.get('wgCanonicalSpecialPageName');
	var wgTitle = mw.config.get('wgTitle');
	var wgIsMainPage = mw.config.get('wgIsMainPage');
	var wgScript = mw.config.get('wgScript');
	var wgArticlePath = mw.config.get('wgArticlePath');
	var wgArticleId = mw.config.get('wgArticleId');
	var wgIsArticle = mw.config.get('wgIsArticle');
	var wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
	var $document = $(document);
	var $html = $('html');
	var $window = $(window);
	var $body = $(document.body);
	var $WikiaPage = $('#WikiaPage');
	var $mwContentText = $('#mw-content-text');
	var $WikiaRail = $('#WikiaRail');
	var API = '/ru/api.php';
	var INDEX = '/ru/index.php';
	var mwtools = {
		block: function(name, time, callback) {
			$.post(API, {
				action: 'block',
				user: name,
				expiry: time === Infinity ? 'infinite' : time + ' days',
				reblock: true,
				autoblock: true,
				allowusertalk: true,
				nocreate: true,
				token: editToken,
				format: 'json'
			}).success(function(data) {
				callback(data);
			});
		},
		unblock: function(name, callback) {
			$.post(API, {
				action: 'unblock',
				user: name,
				token: editToken,
				format: 'json'
			}).success(function(data) {
				callback(!data.error && true || false);
			});
		},
		wallmessage: function(title, text, to, callback) {
			$.post('/ru/wikia.php', {
				controller: 'WallExternal',
				method: 'postNewMessage',
				format: 'json',
				convertToFormat: '',
				notifyeveryone: 0,
				messagetitle: title,
				pagenamespace: 1200,
				body: text,
				pagetitle: to,
				token: editToken
			}).success(function(data) {
				callback(data.status && true || false);
			});
		},
		purge: function() {
			location.href += (location.href.indexOf('?') > -1 ? '&action=purge' : '?action=purge') + '&cb=' + random(0, 0x7fffffff);
		},
		userinfo: function(name, callback) {
			if ($.isArray) {
				name = name.join('|');
			}
			$.get(API, {
				action: 'query',
				list: 'users',
				ususers: name,
				usprop: ['groups', 'blockinfo', 'rights', 'editcount', 'registration'].join('|'),
				format: 'json'
			}).success(function(data) {
				callback(data && !data.error && data.query || false);
			});
		},
		deletepage: function(page, reason, callback) {
			$.post(API, {
				action: 'delete',
				title: page,
				reason: reason,
				format: 'json',
				token: editToken
			}).success(function(data) {
				callback(data);
			});
		},
		getCurrentUserName: function() {
			if ([2, 3, 500, 1200].indexOf(wgNamespaceNumber) !== -1) {
				if (wgCanonicalNamespace === 'Блог_участника') {
					return wgTitle.split('/').shift();
				}
				return wgTitle;
			}
			if (wgNamespaceNumber === -1 && ['Following', 'Contributions'].indexOf(wgCanonicalSpecialPageName) !== -1) {
				if (wgScript == location.pathname) {
					return this.getUrlVars().target || null;
				}
				if (wgCanonicalSpecialPageName === 'Following') {
					return $('#UserProfileMasthead [itemprop="name"]').eq(0).text();
				}
				return decodeURIComponent(location.pathname.split('/').pop().replace(/_/g, ' ')) || null;
			}
			return null;
		},
		raw: function(page, callback) {
			$.get(INDEX, {
				action: 'raw',
				title: page,
				cb: random(0, 0x7fffffff),
				dataType: 'text'
			}).always(function(data) {
				callback(data);
			});
		},
		render: function(page, callback) {
			$.get(INDEX, {
				action: 'render',
				title: page,
				cb: random(0, 0x7fffffff),
				dataType: 'text'
			}).success(function(data) {
				callback(data);
			});
		},
		getUrlVars: function(url) {
			var params = {};
			var length;
			var i;
			url = decodeURIComponent(url && String(url) || location.href);
			try {
				if (url.indexOf('?') !== -1) {
					url = url.match(/\?.+/).join().slice(1).split('&');
				} else {
					return params;
				}
				length = url.length;
				for (i = 0; i < length; i++) {
					url[i] = url[i].split('=');
					params[url[i][0]] = url[i][1];
				}
			} catch (ex) {}
			return params;
		}
	};
	var storage = (function(localStorage) {
		return {
			get: function(elem) {
				try {
					return JSON.parse(localStorage.getItem(String(elem)));
				} catch (ex) {
					return localStorage.getItem(String(elem));
				}
			},
			set: function(elem, val) {
				if (arguments.length <= 1) {
					return;
				}
				elem = String(elem);
				if (val && typeof val === 'object') {
					try {
						val = JSON.stringify(val);
					} catch (ex) {}
				} else {
					val = String(val);
				}
				localStorage.setItem(elem, val);
			},
			clear: function() {
				return localStorage.clear();
			},
			remove: function(elemn) {
				if (typeof elem === 'string' || typeof elem === 'number') {
					localStorage.removeItem(elem);
					return elem;
				}
			}
		};
	})(window.localStorage);
	var This;
	var FADETIME = 250;
	return This = {
		Init: function() {
			!('customToggleClick' in jQuery.fn) && (jQuery.fn.customToggleClick = function() {
				var functions = Array.prototype.slice.call(arguments).filter($.isFunction);
				return this.each(function(_, elem) {
					var i = 0;
					$(elem).on('click', function() {
						if (functions[i].apply(this, arguments) !== false) {
							i++;
						}
						if (i === functions.length) {
							i = 0;
						}
					});
				});
			});
			this.Mainpage.init();
		},
		Mainpage: {
			cache: {},
			selected: null,
			ajaxThrobberURL: 'https://images.wikia.nocookie.net/warframe/ru/images/0/05/Ajax.gif',
			blackoutClassName: 'MainpageBlackout',
			blackoutText: 'Идёт загрузка...',
			getBlackoutHTML: function() {
				return '<div style="display: none;" class="' + this.blackoutClassName + '"><div><span><img src="' + this.ajaxThrobberURL + '"></span><br><span>' + this.blackoutText + '</span></div></div>';
			},
			showBlackout: function() {
				this.$ajaxContent.prepend(this.getBlackoutHTML());
				this.$blackout = this.$mainpage.find('.' + this.blackoutClassName);
				this.$blackout.show();
			},
			removeBlackout: function() {
				this.$blackout.remove();
			},
			errorHTML: '<span class="error">Ошибка при загрузке страницы.</span>',
			checkHTML: function($button, html) {
				var that = this;
				if (!html) {
					$button.addClass('error');
					this.removeBlackout();
					this.$ajaxContent.html(this.errorHTML);
					this.selected = null;
					return false;
				}
				return true;
			},
			appendContent: function($button, id) {
				var that = this;
				var html = this.cache[id];
				if (!this.checkHTML($button, html)) {
					return;
				}
				if ($button.hasClass('error')) {
					$button.removeClass('error');
				}
				$button.addClass('selected');
				this.removeBlackout();
				this.$ajaxContent.html(html);
			},
			HTMLTempContainer: null,
			idAttr: 'data-id',
			load: function($button, pagename) {
				var that = this;
				var id = $button.attr(this.idAttr);
				pagename = pagename.replace(/\s/g, '_');
				if (id === this.selected) {
					return;
				}
				this.$buttons.removeClass('selected');
				this.showBlackout();
				this.selected = id;
				if (id in this.cache) {
					this.appendContent($button, id);
				} else {
					this.loading = true;
					this.HTMLTempContainer = $('<div>');
					this.HTMLTempContainer.load('/ru/wiki/' + pagename + ' ' + this.ajaxContentTargetSelector, function() {
						var html = that.HTMLTempContainer.html();
						that.HTMLTempContainer = null;
						that.loading = false;
						if (that.checkHTML($button, html)) {
							that.cache[id] = html;
							that.appendContent($button, id);
						}
					});
				}
			},
			ajaxLoaderPageNameSelector: '.MainpageAjaxPagename',
			ajaxContentSelector: '.MainpageAjaxContent',
			buttonsSelector: '.MainpageButtons > div',
			ajaxContentTargetSelector: '#MainpageAjaxTarget',
			loading: false,
			tabberId: 'MainpageTabber',
			mainpageId: 'Mainpage',
			discussionsButtonSelector: 'span.discussions',
			discussionsId: 'MainpageDiscussions',
			isDiscussionsLoaded: false,
			targetId: 'target' + random(0, 0x7fffffff),
			sizeCoeff: 0.75,
			fixButtonText: 'Включить фиксацию',
			unFixButtonText: 'Выключить фиксацию',
			getDiscussionsHTML: function() {
				return '<a target="' + this.targetId + '" href="/ru/d/f">Обновить</a><a class="FixMainpageDiscussions">' + this.fixButtonText + '</a><a href="/ru/d/f" target="_blank">Открыть в новом окне</a><iframe src="/ru/d/f" class="MainpageDiscussionsIframe" name="' + this.targetId + '" style="height: ' + ($window.height() * this.sizeCoeff) + 'px;"></iframe>';
			},
			init: function() {
				var that = this;
				this.$mainpage = $('#' + this.mainpageId);
				this.$tabber = $('#' + this.tabberId);
				this.$buttons = this.$mainpage.find(this.buttonsSelector);
				this.$ajaxContent = this.$mainpage.find(this.ajaxContentSelector);
				this.$buttons.on('click', function() {
					if (that.loading) {
						return;
					}
					var $this = $(this);
					that.load($this, $this.find(that.ajaxLoaderPageNameSelector).text());
				});
				this.$discussionsNode = this.$tabber.find('#' + this.discussionsId);
				var handler = function(e) {
					e.preventDefault();
				};
				this.$tabber.find(this.discussionsButtonSelector).one('click', function() {
					that.$discussionsNode.html(that.getDiscussionsHTML());
					that.$fixDiscussions = that.$discussionsNode.find('.FixMainpageDiscussions').customToggleClick(function() {
						$window.on({
							DOMMouseScroll: handler,
							ontouchmove: handler
						});
						that.$fixDiscussions.text(that.unFixButtonText);
					}, function() {
						$window.off('DOMMouseScroll', handler).off('ontouchmove', handler);
						that.$fixDiscussions.text(that.fixButtonText);
					});
				});
			}
		}
	};
})(typeof window !== 'undefined' ? window : null);
Crossout.Init();
*/