$(function TitleChanger() {
    if (mw.config.get('wgIsMainPage')) {
        return;
    }
    oldtitle = document.getElementsByTagName('title')[0].innerHTML;
    newtitle = oldtitle.substring(0, oldtitle.indexOf(" - Conspir"));
    if (document.getElementById('singulartitle') || wgCanonicalNamespace != '') {
        document.getElementsByTagName('title')[0].innerHTML = newtitle + ' is a lie - Conspiracy Wiki - FANDOM';
    } else {
        document.getElementsByTagName('title')[0].innerHTML = newtitle + ' are lies - Conspiracy Wiki - FANDOM';
    }
});

/* AjaxRC */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';