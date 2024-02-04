importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js"
    ]
});

// ЗАПОЗИЧЕНО У  "Deus Ex Wiki" Menu support script
$(function() {
    $('.warframe-wiki-menu-level-1-item').show();
    $('.warframe-wiki-menu-item').each(function() {
        if ($(this).data("opener-for") !== '') {
            var $menuItem = $(this);
            $(this).children().click(function() {
                if ($('.warframe-wiki-menu-item').is(':animated')) {
                    return;
                }
                var hideLevels = [0];
                if ($menuItem.hasClass('warframe-wiki-menu-level-1-item')) {
                    hideLevels = [3, 2];
                } else if ($menuItem.hasClass('warframe-wiki-menu-level-2-item')) {
                    hideLevels = [3];
                }
                toggleMenu(hideLevels, $menuItem.data("opener-for"));
            });
        }
    });
 
    function toggleMenu(levels, dataOpenBy) {
        var duration = 100;
        var delay = 0;
        $.each(levels, function(index, level) {
            var visibleItemsCount = $('.warframe-wiki-menu-level-' + level + '-item:visible').length;
            if ($('.warframe-wiki-menu-level-' + level + '-item').is(":visible")) {
                $($('.warframe-wiki-menu-level-' + level + '-item:visible').get().reverse()).each(function() {
                    $(this).delay(delay).fadeOut(duration, function() {
                    });
                    delay += duration;
                });
            }
        });
 
        $('.warframe-wiki-menu-item[data-open-by="' + dataOpenBy + '"]:hidden').each(function() {
            $(this).delay(delay).queue(function(next) {
                $(this).css({
                    opacity: 0,
                    display: 'inline-block'
                });
                next();
            }).animate({
                opacity: 1
            }, duration);
            delay += duration;
        });
        // }
    }
    // Temporary, for menu test purposes only
    if (mw.config.get('wgTitle') === 'Warframe Wiki Menu' && mw.config.get('wgAction') === 'view') {
        $('.mw-content-text, .WikiaMainContent').width($('.mw-content-text').width() + 320);
        $('.WikiaRail').hide();
    }
});











/* Главное меню. Табуляция. Взято с http://ru.summonerswar.wikia.com */
// Script for switching tabs on main page
(function($) {
    if (!$('.switchtab').length) {
        return;
    }
 
    $('.switchtab').click(function() {
        if ($(this).hasClass('toggledtab')) {
            return;
        }
 
        to_hide = $('.toggledtab').attr('data-tab');
        to_show = $(this).attr('data-tab');
 
        $('.toggledtab').toggleClass('toggledtab');
        $(this).toggleClass('toggledtab');
 
        $('.tab' + to_hide).hide(0);
        $('.tab' + to_show).show(0);
    });
 
})(this.jQuery);











var Warframe = function() {
	this.init = function() {
		var _this = this;
		arguments = Array.prototype.slice.call(arguments, 0);
		this.SV = {};
		Object.getPrototypeOf(this).arguments = arguments;
		this.run.apply(this, arguments);
		this.auto.apply(this, arguments);
		this.scrollTop.apply(this, arguments);
		this.spoiler.apply(this, arguments);
		this.hideSpoilers.apply(this, arguments);
		this.profileTags.apply(this, arguments);
		this.sandbox.apply(this, arguments);
		this.mainPage.apply(this, arguments);
		this.tabbers.apply(this, arguments);
		this.lastEdited.apply(this, arguments.concat({
			namespaces: [0, 6, 8, 10, 14, 15, 110, 111, 828, 829],
			diff: true,
			avatar: true,
			size: true,
			time: 'timeago',
			comment: true
		}));
		this.twitterWidget.apply(this, arguments);
		this.ajaxAutoRefresh.apply(this, arguments.concat({
			pages: ['Спеціальна:Watchlist', 'Спеціальна:WikiActivity', 'Спеціальна:RecentChanges', 'Спеціальна:Изображения', 'Спеціальна:Log'],
			interval: 60000,
			cb: function() {
				_this.hideSpoilers.apply(_this, _this.arguments);
			},
			options: function(e, j) {
				var pages = this.pages,
					interval = this.interval;
				e.preventDefault();
				e.stopPropagation();
				_this.modalWindow.apply(_this, _this.arguments.concat(
					[{
							title: 'Настройки (не реализовано)',
							section: '<dl><dt data-pages="current">Текущие страницы</dt><dt data-added="current">Добавленные страницы</dt><dt data-interval="">Интервал обновления: <span style="font-weight: normal;">' + interval / 1000 + 'сек</span></dt><dt>Скрываемые элементы</dt><dd><a href="/wiki/%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD:S" title="Шаблон:S">Шаблон:S (Спойлер)</a></dd></dl>'
						},
						true, {
							fn: function() {
								for (var i = 0; i < pages.length; i++) {
									j('dt[data-pages="current"]').after('<dd><a href="/wiki/' + encodeURIComponent(pages[i]) + '" target="_blank">' + pages[i] + '</a></dd>');
								}
							}
						}
					]));
			}
		}));
		this.ajaxBatchDelete.apply(this, arguments);
		this.inactiveUsers.apply(this, arguments.concat([{
			text: 'НЕАКТИВНЫЙ УЧАСТНИК',
			months: 3,
			gone: []
		}]));
		this.dupImages.apply(this, arguments);
		this.ajaxToolTips.apply(this, arguments.concat([true]));
		this.timer.apply(this, arguments);
		this.ajaxCommentDelete.apply(this, arguments);
		this.targetBlank.apply(this, arguments);
	};
};
var warframe = new Warframe();
/* Запускает функции, указанные в атрибуте. Атрибутов может быть много.
 *  Original: -
 *  Contributors: GoodLuck
 */
Warframe.prototype.run = function(d, w, j) {
	var tR = j('div[data-run]');
	if (!tR.length) {
		return;
	}
	try {
		if (tR.length == 1) {
			this[tR.attr('data-run')].apply(this, this.arguments.concat([tR, '!init']));
		}
		if (tR.length > 1) {
			for (var i = 0; i < tR.length; i++) {
				this[tR.eq(i).attr('data-run')].apply(this, this.arguments.concat(
					[tR.eq(i), '!init']));
			}
		}
	} catch (err) {
		alert(err);
		console.error('warframe.run: Запущено с ошибкой; внешний вызов');
		return;
	}
	console.info('Warframe.prototype.run: Ок');
};


/* Простая функция
 *  Original: -
 *  Contributors: GoodLuck
 */
Warframe.prototype.auto = function(d, w, j, mw) {
	if (arguments[arguments.length - 1] == '!init' || !mw.UserName) {
		console.warn('Warframe.prototype.auto: Отменено');
		return;
	}
	j('#WikiHeader .WikiaMenuElement').append('<li><a href="/wiki/Користувач:' + mw.UserName + '/wikia.js">wikia.js</a></li><li><a href="/wiki/Користувач:' + mw.UserName + '/common.js">common.js</a></li><li><a href="/wiki/Користувач:' + mw.UserName + '/wikia.css">wikia.css</a></li><li><a href="/wiki/Користувач:' + mw.UserName + '/common.css">common.css</a></li><li><a href="/wiki/Спеціальна:MultipleUpload">Масове завантаження</a></li>');
	(function(d, w, j) {
		var p = 0,
			v = +j('.template.scroll-navigation').attr('data-scroll-value'),
			c = +j('.template.scroll-navigation').attr('data-scroll-count'),
			t = true;
		if (isNaN(v) || isNaN(c)) {
			return;
		}
 
		function l() {
			if (!t || p === 0) {
				return;
			}
			t = false;
			p += v;
			j('.template.scroll-navigation > .content-wrapper').animate({
				left: p + 'px'
			}, 250);
			t = true;
		}
 
		function r() {
			if (!t || Math.abs(p) == (c * v) - 600) {
				return;
			}
			t = false;
			p -= v;
			j('.template.scroll-navigation > .content-wrapper').animate({
				left: p + 'px'
			}, 250);
			t = true;
		}
		j('.template.scroll-navigation div[data-scroll="left"]').on('click', function(e) {
			l.call(this, e);
		});
		j('.template.scroll-navigation div[data-scroll="right"]').on('click', function(e) {
			r.call(this, e);
		});
	}).apply(this, arguments);
	console.info('Warframe.prototype.auto: Ок');
};
document.addEventListener('DOMContentLoaded', function() {
	warframe.init(document, window, window.jQuery, {
		UserName: window.mediaWiki.config.get('wgUserName'),
		PageName: window.mediaWiki.config.get('wgPageName'),
		UserGroups: window.mediaWiki.config.get('wgUserGroups'),
		debug: window.mediaWiki.config.get('debug'),
		Action: window.mediaWiki.config.get('wgAction'),
		CanonicalSpecialPageName: window.mediaWiki.config.get('wgCanonicalSpecialPageName'),
		NamespaceNumber: window.mediaWiki.config.get('wgNamespaceNumber'),
		Title: window.mediaWiki.config.get('wgTitle'),
		IsMainPage: window.mediaWiki.config.get('wgIsMainPage'),
		Script: window.mediaWiki.config.get('wgScript'),
		ScriptPath: window.mediaWiki.config.get('wgScriptPath'),
		skin: window.mediaWiki.config.get('skin'),
		stylepath: window.mediaWiki.config.get('stylepath'),
		Api: window.mediaWiki.Api,
		util: {
			addCSS: window.mediaWiki.util.addCSS,
			wikiUrlencode: window.mediaWiki.util.wikiUrlencode,
			wikiGetlink: window.mediaWiki.util.wikiGetlink,
			wikiScript: window.mediaWiki.util.wikiScript
		},
		loader: {
			using: window.mediaWiki.loader.using
		},
		ArticlePath: window.mediaWiki.config.get('wgArticlePath'),
		editToken: window.mediaWiki.user.tokens.get('editToken'),
		IsArticle: window.mediaWiki.config.get('wgIsArticle')
	});
});