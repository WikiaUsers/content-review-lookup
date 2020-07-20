// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");
 
// Enable MathJax when viewing deleted revisions
enableMathJax = enableMathJax || (wgCanonicalSpecialPageName === "Undelete");
 
$(function () {
    if (enableMathJax) {
        importScriptURI("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});