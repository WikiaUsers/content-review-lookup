/* Nueva versión del contador, vJquery by Giovi */
$(document).ready(function() { 
  $('.WikiaPagesOnWikiModule').append('<br /><div style="float:right;"><img src="http://contador-de-visitas.com/hit.php?id=764066&counter=37" /></div><div style="font-variant: small-caps; text-align:justify;">VISITANTES<br />DESDE MARZO<br /> DE 2011</div>'); 
});
window.SkinNotification = {
	article: 'Usuario Blog:Lord Dhaos/Casi los 1000 articulos',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(SkinNotification.key);
		if (pref) return;
		SkinNotification.render();
	},