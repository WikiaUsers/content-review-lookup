/**
 * Any JavaScript here will be loaded for all users on every page load.
 * 所有用戶在加載任何頁面時，這裡的JavaScript都會加載，請管理員小心編輯。
 */
// <syntaxhighlight lang="javascript">
// </syntaxhighlight>

// 強制將所有編輯連結導向原始碼編輯 (Action=edit)
$(function() {
    function fixEditLinks() {
        // 尋找所有包含 veaction 的連結，並將其替換為原始碼編輯 action=edit
        $('a[href*="veaction="], .section-edit, .mw-editsection a').each(function() {
            var $el = $(this);
            var href = $el.attr('href');
            if (href && (href.indexOf('veaction=') !== -1)) {
                var newHref = href.replace(/veaction=[^&]+/, 'action=edit');
                $el.attr('href', newHref);
                // 移除觸發視覺化編輯器的 class
                $el.removeClass('mw-editsection-visualeditor ve-init-mw-desktopArticleTarget-editableContent');
            }
        });
    }

    // 執行一次
    fixEditLinks();
    
    // 針對 Fandom 可能的延遲加載進行二次檢查
    setTimeout(fixEditLinks, 1000);
});

// [[Category:JavaScript頁面]]