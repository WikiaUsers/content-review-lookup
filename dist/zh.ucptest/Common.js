/* Any JavaScript here will be loaded for all users on every page load. */

/* MediaWiki:Gadget-site-lib.js */
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
	return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; // 保證每一語言有值
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

/* Gadget-NoteTAViewer.js (adapted from Gadget-noteTA.js) */
$(function () {

});

/* Temporary fix: Remove style="height: 0px;" in <div class="banner-notifications-placeholder" style="height: 0px;"> */
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 1000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 2000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 3000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 4000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 5000);