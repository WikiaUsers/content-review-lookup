/* 此 JavaScript 會用於使用者載入的每一個頁面。 */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true
};

// tt 模板优化，代码来自神奇宝贝百科
    var tip = $('.explain, abbr, acronym');
    if (tip.length > 0) {
        mw.loader.using('jquery.tipsy', function(){
            tip.tipsy();
        });
        tip.click(function() {
            if (tip.hasClass('no-fix')) {
                return;
            }
            if ($('div.tipsy-n').length == 1) {
                $('#MoeNotification').after($('div.tipsy-n').clone());
            } else {
                $('div.tipsy-n')[0].remove();
            }
        });
    }