importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/Parallax.js'
    ]
});

$(function(){
  if( !document.getElementById('marquesina') ) {
 	return;
  }

  var editzIndex1 = null;
 	editzIndex1 = document.getElementById('WikiaHeader');
 	editzIndex1.style.zIndex = '1';

  var editzIndex2 = null;
 	editzIndex2 = document.getElementById('WikiHeader');
 	editzIndex2.style.zIndex = '1';

  var editzIndex3 = null;
 	editzIndex3 = document.getElementById('WikiaPageHeader');
 	editzIndex3.style.zIndex = '1';

/** No funciona
  var editzIndex4 = null;
 	editzIndex4 = $UT.getElementsByClassName('WikiaAdvertPages', 'div', bc);
 	editzIndex4.style.zIndex = '3';
**/
});

// $('div.busca-contenido').replaceWith( '<marquee class="busca-contenido" id="marquesina" behavior="scroll" scrollamount="4" direction="left" >' + $('div.busca-contenido').text() + '</marquee>' );

$('div.busca-boton1').replaceWith( '<input id="busca-boton1" type="button" value="Stop" onClick=' + "document.getElementById('marquesina').stop();" + '>' );

$('div.busca-boton2').replaceWith( '<input id="busca-boton2" type="button" value="Start" onClick=' + "document.getElementById('marquesina').start();" + '>' );

$('div.busca-sonido').replaceWith( '<embed src="http://www.youtube.com/v/___shQiFjOY?version=3&amp;hl=es_ES&amp;rel=0" type="application/x-shockwave-flash" width="0" height="0" allowscriptaccess="always" allowfullscreen="false" autostart="true" loop="false" hidden="true"></embed>' );


window.WikiNotification = {
	article: 'Wiki Laboratorio de Bola',
	key: 'WNotif',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(WikiNotification.key);
		if (pref) return;
		WikiNotification.render();
	},
	render: function() {
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Este wiki así como muchas otras webs, se ve mal con el navegador Internet Explorer, visita el wiki con otro navegador para verlo bien. <a href="'+wgServer+wgArticlePath.replace('$1',WikiNotification.article.replace(/\s/g,'_'))+'" title="'+WikiNotification.article+'">Ir a portada</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(WikiNotification.key,'1');
	}
};
 
$(WikiNotification.init);