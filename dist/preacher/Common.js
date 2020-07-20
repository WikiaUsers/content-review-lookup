/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/Slider.js",
        "w:c:dev:ReferencePopups/code.js",
        'u:dev:AjaxRC/code.js'
    ]
});

window.JSExtensionConfig = window.JSExtensionConfig || {};
window.JSExtensionConfig.TabViewEditButtons = window.JSExtensionConfig.TabViewEditButtons || {};
 
window.JSExtensionConfig.TabViewEditButtons.defaultMode = 'none'; // 'edit', 'vde', 'none'
 
// **************************************************
// Start Javascript Libraries - Credit to User:Jgjake2 
// **************************************************
 
+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g];try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);
 
importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');
 
// Read a page's GET URL variables and return them as an associative array. - jgjake2
function getUrlVars() {
    var vars = [],
        hash,
		hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'),
		i = 0;
    for ( ; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
 
window.JSExtensionConfig = window.JSExtensionConfig || {};
 
var diURLVars = getUrlVars();
var tmpjsextcfg;
 
if(diURLVars.jsextcfg){
	try {
		tmpjsextcfg = JSON.parse(unescape(diURLVars.jsextcfg));
	} catch(e) {
		tmpjsextcfg = {};
	}
	$.extend(true, window.JSExtensionConfig, tmpjsextcfg);
}
 
 
// **************************************************
// wikiMod Dependant Scripts
// **************************************************
 
window.JSExtensionConfig.TabViewEditButtons = window.JSExtensionConfig.TabViewEditButtons || {};
window.JSExtensionConfig.TabViewEditButtons.version = 'beta'; // Forces beta script to load. Remove this line to use production version.
// Tab View Edit Buttons Loader
!(function(TabViewEditButtonsCfg){
	var JS_Version,
		TabViewEditButtons_JSEnabled = true;
 
	// Do not load while debugging local code
	if(TabViewEditButtonsCfg){
		try {
			if(TabViewEditButtonsCfg.disable)
				return;
 
			JS_Version = TabViewEditButtonsCfg.jsVersion || TabViewEditButtonsCfg.version;
 
			if(TabViewEditButtonsCfg.jsDisable)
				TabViewEditButtons_JSEnabled = false;
		} catch(e) {}
	}
 
	if(TabViewEditButtons_JSEnabled){
		importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons' + (JS_Version ? '-' + escape(JS_Version) : '') + '.js', 'deadisland');
	}
})(window.JSExtensionConfig.TabViewEditButtons);


importScriptPage('AjaxRC/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 2 };

importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

jQuery(document).ready(function($) {
    $(".aw-table td").click(function() {
        window.document.location = $(this).data("href");
    });
});

/**END**/