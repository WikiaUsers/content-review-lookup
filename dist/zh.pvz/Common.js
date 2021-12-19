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

/* 二代植物圖鑑 */
$(function () {
  function almanac2() {
    var a = document.getElementById("a2p-find-more");
    a.addEventListener("click", almanac2FindMore);
  }
  function almanac2FindMore() {
    var b = document.getElementById("a2p-find-more-tooltip");
    if (b.style.display == "none") {
      b.style.display = "block";
      b.addEventListener("click", almanac2FindMoreTooltipFocus);
      document.addEventListener("click", almanac2FindMoreTooltip, { once: true });
      event.stopPropagation();
    }
  }
  function almanac2FindMoreTooltip() {
    var b = document.getElementById("a2p-find-more-tooltip");
    b.style.display = "none";
    b.removeEventListener("click", almanac2FindMoreTooltipFocus);
  }
  function almanac2FindMoreTooltipFocus(event) {
    event.stopPropagation();
  }
  almanac2();
});