/*SkinNotification: Agrega una notificación para los que usen oasis. */
window.SkinNotification = {
        article: 'Usuario_Blog:Yoh.:./Reviviendo_Caricartoons)',
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
                var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Ayúdanos a revivir el wiki <a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">Descubre como aquí aquí</a>.</div>');
                nf.children().eq(0).append(sn);
                sn.children().eq(0).click(SkinNotification.dismiss);
        },
        dismiss: function(e) {
                $(e.target).parent().remove();
                $.cookies.set(SkinNotification.key,'1');
        }
};
 
$(SkinNotification.init);
 
/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario:'+ encodeURIComponent(wgUserName) +'/wikia.css" title="Tu apariencia personal">Mi apariencia</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
 
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite
 
addOnloadHook(rewriteTitle);