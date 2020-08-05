/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */

// MathJax is disabled in the Special and MediaWiki namespaces
var enableMathJax = (wgCanonicalNamespace !== "Special") && (wgCanonicalNamespace !== "MediaWiki");
 
// Enable MathJax when viewing deleted revisions
enableMathJax = enableMathJax || (wgCanonicalSpecialPageName === "Undelete");
 
addOnloadHook(function () {
    if (enableMathJax) {
        importScriptURI("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML,Safe");
    }
});