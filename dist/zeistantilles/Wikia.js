/*<pre><nowiki>*/
// 2. Importaci�n de precargas
importScript('MediaWiki:Precargas.js');
// 3. Importaci�n de botones extra de la barra de edici�n
importScript('MediaWiki:Common.js/botones.js');


$(document).ready(function()
{
	// Restores normal upload form since the popup one ignores source and license policy. Obtenido de http://starwars.wikia.com/wiki/MediaWiki:Wikia.js.
	$('a.wikia-button.upphotos').unbind('click');
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*</nowiki></pre>*/