function impart(article) {
    importArticle({ type: 'script', article: article });
}

function getParamValue(param, url) {
	var re = new RegExp('^[^#]*[&?]' + param.replace(/([\\{}()|.?*+\-^$\[\]])/g, '\\$1') + '=([^&#]*)'),
		m = re.exec(url !== undefined ? url : location.href);
	if (m) {
		return decodeURIComponent(m[1].replace(/\+/g, '%20'));
	}
	return null;
}

if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !getParamValue('diff')
) {
    impart('MediaWiki:Common.js/LinkImagePopup.js');
}

var toolbarLabel = '中国全明星玩游戏联盟相关';
var toolbarLinks = [
    {link: 'https://space.bilibili.com/3546377892137707/', label: '凯尔·布罗夫洛夫斯基的Bilibili主页'},
    {link: 'https://space.bilibili.com/13015033', label: 'AngelDust_齐光（Wiki工程师）的Bilibili主页'},
    {link: 'https://space.bilibili.com/267690094/', label: 'Bilign16802的Bilibili主页'},
    {link: 'https://space.bilibili.com/41768545', label: '小鱼大人帅帅帅ii的Bilibili主页'},
];

// Auto-redirect on Special:Search for SXXEXX by Bobogoobo
$(function() {
    var search = getParamValue('query');
    if (
      mw.config.get('wgPageName') === 'Special:Search' &&
      search.length <= 6 &&
      /S\d+E\d+/i.test(search)
    ) {
        $('.results-wrapper p').html('Redirecting to episode...');

        var s, e;
        s = search.toLowerCase().split('e')[0].substr(1);
        e = search.toLowerCase().split('e')[1];
        $.getJSON('/zh/api.php?action=edit&action=parse&text={{nameconvert|' + 
          s + '|' + e + '}}&format=json', function(data) {
            var episode = (data.parse.text['*'].match(/\>(.*)\n\</) || [0, 0])[1];
            if (episode && episode !== 'TBA' && episode.indexOf('<span class="error">') === -1) {
                $('.results-wrapper p').append($('<a />', {
                    'href':'/wiki/' + encodeURIComponent(episode),
                    'text':episode
                }));

                window.location.href = window.location.href.substring(0, 
                  window.location.href.lastIndexOf('/') + 1) + episode;
            } else {
                $('.results-wrapper p').html('Episode not found.');
            }
        });
    }
});

/* ===== 欣赏模式 - 仅限"第三领域全玩者"页面 ===== */
$(function() {
    'use strict';

    if (mw.config.get('wgPageName') !== '第三领域全玩者') {
        return;
    }

    var logoUrl = 'https://static.wikia.nocookie.net/hac/images/9/95/%E7%AC%AC%E4%B8%89%E9%A2%86%E5%9F%9F%E5%85%A8%E7%8E%A9%E8%80%85_logo.png/revision/latest?cb=20250814111550&format=original&path-prefix=zh';

    var $btn = $('<button>', {
        id: 'appreciation-mode-btn',
        text: '🎨 欣赏背景',
        'aria-label': '进入欣赏模式，隐藏页面内容展示背景'
    });

    var $restoreBtn = $('<button>', {
        id: 'appreciation-restore-btn',
        text: '↩ 恢复页面',
        'aria-label': '退出欣赏模式，恢复页面内容'
    });

    var $logo = $('<img>', {
        id: 'appreciation-logo',
        src: logoUrl,
        alt: 'Logo'
    });

    var $overlay = $('<div>', {
        id: 'appreciation-overlay'
    });

    $('body').append($btn, $restoreBtn, $logo, $overlay);

    $btn.on('click', function() {
        $('body').addClass('appreciation-active');
        $overlay.addClass('active');
        setTimeout(function() {
            $logo.addClass('show');
        }, 300);
    });

    $restoreBtn.on('click', function() {
        $logo.removeClass('show');
        setTimeout(function() {
            $('body').removeClass('appreciation-active');
            $overlay.removeClass('active');
        }, 400);
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('body').hasClass('appreciation-active')) {
            $restoreBtn.trigger('click');
        }
    });
});

/* HLTV 战队榜单：点击卡片展开/收起 */
$( function () {
    $( document ).on( 'click', '.hltv-rankcard-header', function ( e ) {
        // 让"查看更多信息"链接的点击不触发收起
        if ( $( e.target ).closest( '.hltv-more-btn' ).length ) return;
        $( this ).closest( '.hltv-rankcard' ).toggleClass( 'is-expanded' );
    } );
} );
/* TFA OrgTree */
(function () {
  'use strict';
  var requested = false;

  function loadChart(content) {
    var node = content && content.jquery ? content[0] : content;
    node = node || document;
    if (requested || !node.querySelector) {
      return;
    }
    if ((node.matches && node.matches('.tfa-org')) || node.querySelector('.tfa-org')) {
      requested = true;
      mw.loader.load(mw.util.getUrl('MediaWiki:TFAOrgChart.js', {
        action: 'raw',
        ctype: 'text/javascript'
      }));
    }
  }

  mw.loader.using('mediawiki.util').then(function () {
    mw.hook('wikipage.content').add(loadChart);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { loadChart(document); });
    } else {
      loadChart(document);
    }
  });
}());
/* Only .tfa-relations diagrams are affected. */
(function () {
    'use strict';

    if (window.tfaRelationsScaler) {
        window.tfaRelationsScaler.refresh(document);
        return;
    }

    var designWidth = 1600;
    var designHeight = 1120;
    var items = [];
    var observer;

    function update(item) {
        if (!document.documentElement.contains(item.root)) {
            return;
        }
        var width = item.root.clientWidth;
        if (!width || width === item.width) {
            return;
        }
        item.width = width;
        var scale = Math.min(1, width / designWidth);
        item.canvas.style.transform = 'scale(' + scale + ')';
        item.root.style.height = (designHeight * scale) + 'px';
    }

    function updateAll() {
        items = items.filter(function (item) {
            if (!document.documentElement.contains(item.root)) {
                if (observer) {
                    observer.unobserve(item.root);
                }
                return false;
            }
            update(item);
            return true;
        });
    }

    function bind(root) {
        if (root.getAttribute('data-tfa-scaler') === 'ready') {
            return;
        }
        var canvas = root.querySelector('.tfa-r001');
        if (!canvas) {
            return;
        }
        root.setAttribute('data-tfa-scaler', 'ready');
        root.style.position = 'relative';
        root.style.overflow = 'hidden';
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.width = designWidth + 'px';
        canvas.style.height = designHeight + 'px';
        canvas.style.transformOrigin = '0 0';
        var item = { root: root, canvas: canvas, width: null };
        items.push(item);
        update(item);
        if (observer) {
            observer.observe(root);
        }
    }

    function refresh(scope) {
        if (scope && scope.jquery) {
            scope = scope[0];
        }
        scope = scope || document;
        if (scope.nodeType === 1 && scope.classList.contains('tfa-relations')) {
            bind(scope);
        }
        var roots = scope.querySelectorAll('.tfa-relations');
        for (var i = 0; i < roots.length; i++) {
            bind(roots[i]);
        }
        updateAll();
    }

    if (window.ResizeObserver) {
        observer = new window.ResizeObserver(updateAll);
    } else {
        // Also detect sidebar/layout changes that do not fire a window resize.
        window.setInterval(updateAll, 300);
    }

    window.tfaRelationsScaler = { refresh: refresh };
    window.addEventListener('resize', updateAll);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            refresh(document);
        });
    } else {
        refresh(document);
    }

    if (window.mw && window.mw.hook) {
        window.mw.hook('wikipage.content').add(refresh);
    }
}());

(function () {
    'use strict';
    var requested = false;
    function loadRadar(content) {
        var node = content && content.jquery ? content[0] : content;
        node = node && node.querySelector ? node : document;
        if (requested || !((node.matches && node.matches('.hltv-ranklist')) || node.querySelector('.hltv-ranklist'))) return;
        requested = true;
        mw.loader.load(mw.util.getUrl('MediaWiki:TeamRankRadar.js', {
            action: 'raw', ctype: 'text/javascript'
        }));
    }
    mw.loader.using('mediawiki.util').then(function () {
        mw.hook('wikipage.content').add(loadRadar);
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { loadRadar(document); });
        else loadRadar(document);
    });
}());

/* Preserve its existing contents. */
(function () {
    'use strict';
    var appearanceLoading = false;
    mw.hook('wikipage.content').add(function ($content) {
        var node = $content && $content.jquery ? $content[0] : $content;
        if (appearanceLoading || !node || !node.querySelector) { return; }
        if (!(node.matches && node.matches('.ql-ap-source')) && !node.querySelector('.ql-ap-source')) { return; }
        appearanceLoading = true;
        mw.loader.using('mediawiki.util').then(function () {
            return mw.loader.getScript(mw.util.getUrl('MediaWiki:出场.js', {
                action: 'raw', ctype: 'text/javascript'
            }));
        }).catch(function (error) {
            appearanceLoading = false;
            if (window.console) { console.warn('出场面板脚本加载失败', error); }
        });
    });
}());
/* ===== 全玩者标题党派与战队标识 ===== */
(function () {
    'use strict';

    if (window.quanwanTitleLogos) {
        window.quanwanTitleLogos.refresh();
        return;
    }

    function pageName(value) {
        return String(value || '').replace(/_/g, ' ');
    }

    function refresh() {
        var existing = document.getElementById('qw-title-logos');

        if (
            mw.config.get('wgNamespaceNumber') !== 0 ||
            mw.config.get('wgAction') !== 'view' ||
            new URLSearchParams(window.location.search).has('diff')
        ) {
            if (existing) {
                existing.remove();
            }
            return;
        }

        var content = document.getElementById('mw-content-text');
        if (!content) {
            return;
        }

        var sources = content.querySelectorAll('.qw-title-logos-source');
        var source = null;

        for (var i = 0; i < sources.length; i++) {
            if (
                pageName(sources[i].getAttribute('data-qw-page')) ===
                pageName(mw.config.get('wgPageName'))
            ) {
                source = sources[i];
                break;
            }
        }

        if (!source) {
            if (existing) {
                existing.remove();
            }
            return;
        }

        var heading = document.querySelector(
            '.page-header__title, #firstHeading, #firstheading'
        );
        if (!heading) {
            return;
        }

        var header = heading.closest('.page-header');
        var top = header && header.querySelector('.page-header__top');
        var signature = source.innerHTML;

        if (existing && existing.getAttribute('data-qw-signature') === signature) {
            return;
        }
        if (existing) {
            existing.remove();
        }

        var bar = document.createElement('div');
        bar.id = 'qw-title-logos';
        bar.className = 'qw-title-logos';
        bar.setAttribute('role', 'group');
        bar.setAttribute('aria-label', '人物所属党派与战队');
        bar.setAttribute('data-qw-signature', signature);

        for (var n = 0; n < source.children.length; n++) {
            var badge = source.children[n].cloneNode(true);
            if (!badge.classList.contains('qw-title-logo')) {
                continue;
            }

            badge.querySelectorAll('a').forEach(function (link) {
                link.setAttribute(
                    'aria-label',
                    badge.getAttribute('data-qw-label') || '查看所属组织'
                );
            });

            badge.querySelectorAll('img').forEach(function (img) {
                // 源节点隐藏，主动恢复延迟加载图片，避免把占位图带到标题。
                if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                }
                if (img.getAttribute('data-srcset')) {
                    img.srcset = img.getAttribute('data-srcset');
                }

                img.loading = 'eager';
                img.classList.remove('lazyload', 'lazyloading');

                img.addEventListener('error', function () {
                    var owner = img.closest('.qw-title-logo');
                    var anchor = owner && owner.querySelector('a');

                    if (anchor) {
                        anchor.textContent = owner
                            .getAttribute('data-qw-label')
                            .replace(/^[^：]+：/, '');
                    }
                }, { once: true });
            });

            bar.appendChild(badge);
        }

        if (!bar.children.length) {
            return;
        }

        if (top) {
            top.classList.add('qw-title-logos-top');
            top.insertBefore(bar, top.firstChild);
        } else if (header) {
            header.insertBefore(bar, header.firstChild);
        } else {
            heading.parentNode.insertBefore(bar, heading);
        }
    }

    window.quanwanTitleLogos = { refresh: refresh };
    mw.hook('wikipage.content').add(refresh);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refresh);
    } else {
        refresh();
    }
}());
/* ===== END 全玩者标题党派与战队标识 ===== */