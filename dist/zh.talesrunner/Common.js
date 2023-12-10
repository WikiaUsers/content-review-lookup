/* 此 JavaScript 會用於使用者載入的每一個頁面。 */
// tooltips.js setting
window.tooltips_config = {
    waitForImages: true,
    noCSS: true
};

// tt improvement, from 神奇宝贝百科 https://wiki.52poke.com/wiki/MediaWiki:Common.js
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

// NoLicenseWarning setting
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
    	'bureaucrat',
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};

// Prepare custom messages for NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};

// Add custom content instead of default messages
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = '請選擇授權條款以便分類，謝謝合作！';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = '未選擇授權條款，請檢察是否有檔案未選擇授權條款，謝謝合作！';