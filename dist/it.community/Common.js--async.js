//=========================================
//          Funzioni per pulsanti
//=========================================
/**
 * Funzioni per il caricamento asincrono 
 * dei pulsanti
 */

// Facebook
// https://developers.facebook.com/docs/plugins
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.10";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Google+
// https://developers.google.com/+/web/+1button/
window.___gcfg = {lang: 'it'};
(function() {
   var po = document.createElement("script");
   po.type = "text/javascript";
   po.async = true;
   po.src = "https://apis.google.com/js/platform.js";
   var s = document.getElementsByTagName("script")[0];
   s.parentNode.insertBefore(po, s);
})();

// Twitter
// https://dev.twitter.com/web/overview
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
    t.widgets.load();
  };
}(document, "script", "twitter-wjs"));