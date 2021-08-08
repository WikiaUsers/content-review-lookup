var titleChanger = function() {
    if (mw.config.get('wgIsMainPage')) {
        return;
    }
    oldtitle = document.getElementsByTagName('title')[0].innerHTML;
    if (document.getElementById('singulartitle') || mw.config.get("wgCanonicalNamespace") !== '') {
        document.getElementsByTagName('title')[0].innerHTML = mw.config.get("wgPageName") + ' is a lie - Conspiracy Wiki - FANDOM';
    } else {
        document.getElementsByTagName('title')[0].innerHTML = mw.config.get("wgPageName") + ' are lies - Conspiracy Wiki - FANDOM';
    }
};

$(function() {
	window.setTimeout(titleChanger,100);
});

/* AjaxRC */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';