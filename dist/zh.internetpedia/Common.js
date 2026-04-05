/**
 * 所有用戶在加載任何頁面時，這裡的JavaScript都會加載
 */

mw.loader.using(['ext.gadget.site-lib', 'mediawiki.util', 'mediawiki.api']).then(function() {

    // 1. 編輯頁面相關腳本加載
    if (mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit' || mw.config.get('wgCanonicalSpecialPageName') === 'Search') {
        importScript('MediaWiki:Common.js/edit.js');
    } else {
        mw.loader.using('ext.visualEditor.desktopArticleTarget.init', function() {
            mw.libs.ve.addPlugin(function() {
                importScript('MediaWiki:Common.js/edit.js');
            });
        });
    }

    // 2. 註腳捲軸優化
    if (!mw.config.get('wgCanonicalNamespace')) {
        $(function() {
            $('div#mw-content-text ol.references').each(function() {
                var needobjs=[], $curobj=$(this);
                do {
                    $curobj=$curobj.parent();
                    if (!$curobj) break;
                    if ($curobj.attr('id') === 'mw-content-text' || $curobj.prop('tagName').toLowerCase() === 'body') break;
                    if ($curobj.css('overflow').match(/(?: auto|scroll)/i) || $curobj.css('overflow-x').match(/(?:auto|scroll)/i) || $curobj.css('overflow-y').match(/(?:auto|scroll)/i)) {
                    } else continue;
                    if ((''+$curobj.attr('class')).split(' ').indexOf('noprint') >= 0) return;
                    needobjs.push($curobj.get(0));
                } while (true);
                $(needobjs).css({'overflow': 'visible', 'overflow-x': 'visible', 'overflow-y': 'visible', 'border': '', 'height': '', 'max-height': ''});
            });
        });
    }

    // 3. 自訂 Wiki 導航側欄
    $(function() {
        if ($('#p-custom-navigation').length === 0) {
            $.get(mw.util.wikiScript('api'), {
                action: 'parse',
                page: 'MediaWiki:Wiki-navigation',
                format: 'json'
            }, function (data) {
                if (data.parse && data.parse.text) {
                    var html = data.parse.text['*'];
                    var $newBox = $('<section>')
                        .addClass('portal portlet')
                        .attr('id', 'p-custom-navigation')
                        .append($('<h2>').text('自訂導航'))
                        .append($('<div>').addClass('body').html(html));
                    $('#WikiaRail, #mw-panel').append($newBox);
                }
            });
        }
    });

    // 4. 僅保留「簡体」與「繁體」語言選項
    $(function () {
        var filterLang = function() {
            var $langDropdown = $('.wds-dropdown__content');
            if ($langDropdown.length) {
                $langDropdown.find('a').each(function () {
                    var text = $(this).text().trim();
                    if (text !== '簡体' && text !== '繁體' && text !== '簡體') {
                        $(this).remove(); 
                    }
                });
            }
        };
        filterLang();
        setTimeout(filterLang, 1000);
    });

    // 5. 搜尋框條目數顯示
    new mw.Api().get({
        action: 'query',
        meta: 'siteinfo',
        siprop: 'statistics'
    }).done(function (data) {
        var articles = data.query.statistics.articles.toLocaleString();
        var $search = $('#searchInput, .searchInput, input[type="search"]');
        if ($search.length) {
            $search.attr('placeholder', '搜尋 ' + articles + ' 個條目');
        }
    });

    // 6. 自訂底欄圖標
    (function() {
        var $footerBar = $('.wds-global-footer__bottom-bar');
        if ($footerBar.length > 0 && $('#custom-footer-icons').length === 0) {
            var $iconsContainer = $('<div id="custom-footer-icons" style="display: flex; gap: 15px; align-items: center;"></div>');
            var ccIcon = '<a href="https://creativecommons.org/licenses/by-sa/3.0/deed.zh_TW" target="_blank"><img src="https://www.mediawiki.org/static/images/footer/creative-commons-88x31.png" alt="CC" width="88" height="31"></a>';
            var fandomIcon = '<a href="https://www.fandom.com" target="_blank"><img src="https://static.wikia.nocookie.net/central/images/c/c5/Fandom_logo.png" alt="Fandom" width="88" height="31" style="background: #002a32; padding: 2px; border-radius: 3px;"></a>';
            var mwIcon = '<a href="https://www.mediawiki.org/" target="_blank"><img src="https://www.mediawiki.org/static/images/footer/poweredby_mediawiki_88x31.png" alt="MW" width="88" height="31"></a>';
            $iconsContainer.append(ccIcon, fandomIcon, mwIcon);
            $footerBar.append($iconsContainer);
        }
    })();

    // 7. 時間轉換為 CST (台灣時間)
    $(function() {
        $('.timestamp, .mw-changeslist-date, .mw-logevent-date').each(function() {
            var text = $(this).text();
            if (text.indexOf('（台北時間）') === -1) {
                var utcTime = new Date(text + ' UTC');
                if (!isNaN(utcTime)) {
                    var options = { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                    $(this).text(new Intl.DateTimeFormat('zh-TW', options).format(utcTime) + '（台北時間）');
                }
            }
        });
    });

    /* ============================================================
       8. 終極解決方案：強制修正「紅鏈」顏色 (DOM 監聽模式)
       ============================================================ */
    function applyRedColor() {
        // 1. 強制讓所有 class="new" 的連結變紅
        $('a.new').attr('style', 'color: #cc0000 !important;');
        
        // 2. 針對搜尋結果頁面中「在本wiki建立頁面」的提示區
        $('.mw-search-createlink a').each(function() {
            var href = $(this).attr('href') || '';
            // 判斷是否為紅鏈或含有 redlink 參數
            if (href.indexOf('redlink=1') !== -1 || $(this).hasClass('new')) {
                $(this).attr('style', 'color: #cc0000 !important; font-weight: bold; text-decoration: underline;');
            }
        });
    }

    // 啟動監聽器，應對 Fandom 的非同步(AJAX)載入內容
    var observer = new MutationObserver(function(mutations) {
        applyRedColor();
    });

    // 開始監控整張網頁的變化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初始執行一次
    $(function() {
        applyRedColor();
    });

});