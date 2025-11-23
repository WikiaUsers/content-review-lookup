/*global mw, $, console, importStylesheet, importScript, importArticles, addOnloadHook, enableOldForumEdit */
/* Add RailModule to the top of right rail */
window.AddRailModule = [{prepend: true}];

/*jshint browser:true, curly:false, eqnull:true, strict:false */
mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

/**
 * Cleanup excessive space in hlist elements
 */
var items = document.querySelectorAll('.hlist li, .hlist dt, .hlist dd');
for (var i = items.length - 1; i >= 0; i--) {
   items[i].innerHTML = items[i].innerHTML.trim();
}

/* End of mw.loader.using callback; DO NOT ADD CODE BELOW THIS LINE */
});