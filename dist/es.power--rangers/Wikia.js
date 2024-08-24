
// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* Por [[w:User:Rappy 4187|Rappy 4187]] */
$(function() {
  var rights = {};
 
  rights["Power_:3"]                  = ["Silver Ranger"];
 
  if (typeof rights[wgTitle] != "undefined") {
     $('.UserProfileMasthead .masthead-info span.group').remove();
     for (var i=0, len=rights[wgTitle].length; i < len; i++) {
       $('<span class="group">' + rights[wgTitle][i] +
         '</span>').appendTo('.masthead-info hgroup');
      }
    }
});


/* Enlace a wikia.css en el menú desplegable de usuario */
 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario:'+ encodeURIComponent(wgUserName) +'/wikia.css" title="Tu apariencia personal">Mi apariencia</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
/*<pre> MediaWiki:Wikia.js v1.4 */

/*SkinNotification: Agrega una notificación para los que usen oasis. */
window.SkinNotification = {
	article: 'Especial:PáginasRequeridas',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(SkinNotification.key);
		if (pref) return;
		SkinNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"><li></li></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Demuestra tus conocimientos sobre Power Rangers<a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">, ayúdanos a crear o mejorar los artículos</a>.</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};