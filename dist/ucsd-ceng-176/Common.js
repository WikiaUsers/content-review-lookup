/* Any JavaScript here will be loaded for all users on every page load. */

(function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";

  var config = 'MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "all"} } });'
  
  script.text = config
  document.getElementsByTagName("head")[0].appendChild(script);
})();




/*jquery( function( $ ) {

  importScriptURI("https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML");
  
})*/


/*mw.loader.load( "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML" )

MathJax.Hub.Config({
  TeX: {
    equationNumbers: {autoNumber: "all"}
  }
});*/