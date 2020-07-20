/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:Contributions"
];

// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");
 
// Enable MathJax when viewing deleted revisions
enableMathJax = enableMathJax || (wgCanonicalSpecialPageName === "Undelete") && (wgCanonicalSpecialPageName === "WikiActivity");
 
addOnloadHook(function () {
    if (enableMathJax) {
        importScriptURI("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});