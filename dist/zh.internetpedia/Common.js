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

    // 5. 搜尋框條目數顯示 - Fandom UCP 動態監聽版
    new mw.Api().get({
        action: 'query',
        meta: 'siteinfo',
        siprop: 'statistics',
        format: 'json'
    }).done(function(data) {
        if (data.query && data.query.statistics) {
            var articles = data.query.statistics.articles;
            var formattedCount = articles.toLocaleString('zh-Hant');
            var placeholderText = '搜尋 ' + formattedCount + ' 個條目';
            
            // Fandom 搜尋框選擇器列表
            var searchSelectors = '.unified-search__input, .wds-global-navigation__search-input, .mobile-search__input, #searchInput, input[data-test="search-input"]';
            
            // 函數：設定所有搜尋框的 placeholder
            function updateSearchPlaceholder() {
                var $searchInputs = $(searchSelectors);
                $searchInputs.each(function() {
                    // 避免重複設定
                    if ($(this).attr('placeholder') !== placeholderText) {
                        $(this).attr('placeholder', placeholderText);
                    }
                });
                return $searchInputs.length > 0;
            }
            
            // 立即執行一次
            updateSearchPlaceholder();
            
            // 用 MutationObserver 監聽 DOM 變化，Fandom 搜尋框是動態載入的
            var observer = new MutationObserver(function(mutations) {
                // 只要有新增節點，就檢查一次搜尋框
                if (updateSearchPlaceholder()) {
                    // 成功設定後就停止監聽，節省效能
                    observer.disconnect();
                }
            });
            
            // 開始監聽整個 body
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            // 保險機制：10秒後還沒成功就停掉監聽
            setTimeout(function() {
                observer.disconnect();
            }, 10000);
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
    var redlinkObserver = new MutationObserver(function(mutations) {
        applyRedColor();
    });

    // 開始監控整張網頁的變化
    redlinkObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初始執行一次
    $(function() {
        applyRedColor();
    });

});

$(document).ready(function() {
    // 1. 定義你的多語言子站清單
    const wikiFamily = {
        "Deutsch": "https://internetpedia.fandom.com/de/wiki/",
        "English": "https://internetpedia.fandom.com/en/wiki/",
        "Español": "https://internetpedia.fandom.com/es/wiki/",
        "Bahasa Indonesia": "https://internetpedia.fandom.com/id/wiki/",
        "日本語": "https://internetpedia.fandom.com/ja/wiki/",
        "한국어": "https://internetpedia.fandom.com/ko/wiki/",
        "Bahasa Melayu": "https://internetpedia.fandom.com/ms/wiki/",
        "Nederlands": "https://internetpedia.fandom.com/nl/wiki/",
        "Reo tahiti": "https://internetpedia.fandom.com/ty/wiki/"
    };

    // 2. 獲取當前頁面名稱
    let pageTitle = mw.config.get('wgPageName');

    // 3. 建立下拉選單的 HTML 結構
    let $customLangContainer = $('<div class="custom-lang-selector" style="margin: 10px 0; position: relative; display: inline-block; z-index: 9999;"></div>');
    let $button = $('<button class="custom-lang-btn" style="background: #ffffff; color: #333; border: 1px solid #a2a9b1; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">🌐 跨語言連結 ▼</button>');
    let $dropdown = $('<ul class="custom-lang-dropdown" style="display: none; position: absolute; left: 0; top: 100%; background: #ffffff; border: 1px solid #dadce0; border-radius: 4px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); list-style: none; padding: 6px 0; margin: 4px 0 0 0; min-width: 160px;"></ul>');

    // 4. 循環把所有語言塞進選單中
    $.each(wikiFamily, function(langName, urlPrefix) {
        let targetUrl = urlPrefix + encodeURIComponent(pageTitle);
        let $li = $('<li style="margin:0; padding:0;"></li>');
        let $a = $('<a href="' + targetUrl + '" style="display: block; padding: 8px 16px; color: #333; text-decoration: none; font-size: 14px;">' + langName + '</a>');
        
        // 滑鼠滑過變色效果
        $a.hover(
            function() { $(this).css('background-color', '#f1f3f4'); },
            function() { $(this).css('background-color', '#ffffff'); }
        );
        
        $li.append($a);
        $dropdown.append($li);
    });

    $customLangContainer.append($button).append($dropdown);

    // 5. 【暴力插入法】直接插入到 Fandom 的主要內容區塊 (#mw-content-text) 的最前面
    if ($('#mw-content-text').length) {
        $('#mw-content-text').prepend($customLangContainer);
    }

    // 6. 點擊按鈕切換下拉選單顯示/隱藏
    $button.on('click', function(e) {
        e.stopPropagation();
        $dropdown.toggle();
    });

    $(document).on('click', function() {
        $dropdown.hide();
    });
});