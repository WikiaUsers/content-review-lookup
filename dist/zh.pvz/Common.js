/* 这里的任何JavaScript将在每次页面载入时为所有用户加载。 */

/* w:c:zh.c:MediaWiki:Gadget-site-lib.js */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh': zh || hans || hant || cn || tw || hk || sg || mo || my,
        'zh-hans': hans || cn || sg || my,
        'zh-hant': hant || tw || hk || mo,
        'zh-cn': cn || hans || sg || my,
        'zh-sg': sg || hans || cn || my,
        'zh-tw': tw || hant || hk || mo,
        'zh-hk': hk || hant || mo || tw,
        'zh-mo': mo || hant || hk || tw
    }
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; //保證每一語言有值
}

window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.importScriptCallback = function(page, ready) {
    importScriptURICallback(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
};

window.importScriptURICallback = jQuery.getScript;

/* 訊息框 */
mw.hook("wikipage.collapsibleContent").add(function () {
    document.querySelectorAll(".mbox.mw-made-collapsible>.mw-collapsible-toggle, .multi-mbox.mw-made-collapsible>.mw-collapsible-toggle").forEach(function (toggle) {
        changeTitle({ target: toggle });
        toggle.removeEventListener('click', changeTitle);
        toggle.addEventListener('click', changeTitle);
    });
    function changeTitle(e) {
        const toggle = e.target;
        toggle.title = toggle.querySelector(':scope>.mw-collapsible-text').innerHTML;
    }
});

/* 多重訊息框 */
$(function () {
    const collapsibleContentMbox = document.querySelectorAll(".multi-mbox>.mw-collapsible-content>.mbox.mw-collapsible");
    collapsibleContentMbox.forEach(makeUncollapsible);
    function makeUncollapsible(mbox) {
        const collapsibleContent = mbox.querySelectorAll(".mw-collapsible-content");
        if (mbox.classList.contains("mw-collapsed")) {
            collapsibleContent.forEach(uncollapseCollapsed);
        }
        collapsibleContent.forEach(makeCollapsibleUncollapsible);
        mbox.classList.remove("mw-collapsible", "mw-collapsed", "mw-made-collapsible");
    }
    function uncollapseCollapsed(collapsibleContent) {
        collapsibleContent.removeAttribute("style");
    }
    function makeCollapsibleUncollapsible(collapsibleContent) {
        collapsibleContent.classList.remove("mw-collapsible-content");
    }
});

/* 用於TabberEX */
(function (window, $, mw) {
    variantDefault();
    function variantDefault() {
        var lV = document.getElementsByClassName('page__main')[0].getAttribute('lang');
        var tL = document.getElementsByClassName('tabberex');
        var gVD, gRVD;
        if (lV.indexOf('zh-Hans') !== -1) {
            gVD = 'data-hans-default';
        } else if (lV.indexOf('zh-Hant') !== -1) {
            gVD = 'data-hant-default';
        }
        if (lV === 'zh-Hans-CN') {
            gRVD = 'data-cn-default';
        }
        for (var i = 0; i < tL.length; i++) {
            if (tL[i].hasAttribute(gVD)) {
                var nVD = parseInt(tL[i].getAttribute(gVD), 10) - 1;
                tL[i].insertBefore(tL[i].childNodes[nVD], tL[i].childNodes[0]);
            }
            if (tL[i].hasAttribute(gRVD)) {
                var nRVD = parseInt(tL[i].getAttribute(gRVD), 10) - 1;
                tL[i].insertBefore(tL[i].childNodes[nRVD], tL[i].childNodes[0]);
            }
        }
    }
}(this, jQuery, mediaWiki));