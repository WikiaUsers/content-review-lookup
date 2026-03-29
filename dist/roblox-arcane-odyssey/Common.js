/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'Damage_Calculation') {
	$(function () {
	        importScriptPage('MediaWiki:Calculators/DamageCalculator.js');
	});
}
/* Link Preview */
(function () {
    let lpLoaded = false;
    $(document).on('mouseenter', 'a[href*="/wiki/"]', function () {
        if (!lpLoaded) {
            lpLoaded = true;
            importScriptPage('LinkPreview/code.js', 'dev');
        }
    });
})();
window.pPreview = $.extend(true, window.pPreview, {
    container: '.mw-parser-output',
    tlen: 300,
    apid: true,
    pibox: false,
    RegExp: {
        onlyinclude: ['p:first-of-type'],
        noinclude: ['.navbox', '.toc']
    }
});

window.refPopups = {
    animate: true,
    fade: true,
    delay: 150,
    hideDelay: 200,
    offset: 15
};