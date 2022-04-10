//          Funzioni per pulsanti - Importato da it.onepiece
//=========================================
/**
 * Funzioni per il caricamento asincrono
 * dei pulsanti, necessari per          
 * MediaWiki:Wikia.js/customInterface.js 
 */

// Facebook
// https://developers.facebook.com/docs/plugins
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.6";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));