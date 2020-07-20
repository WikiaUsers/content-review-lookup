
(function () {
    "use strict";
    var userRightsList = {
        "Nestor8.16": ["Reversor"],
        "Deidara1197": ["Oficial"]
    };

    if ($('.masthead-info hgroup').length) {
        var name = $('.masthead-info h1[itemprop="name"]').text();
        if (userRightsList[name] !== undefined) {
            var i;
            for (i = 0; i < userRightsList[name].length; i++) {
                $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
            }
        }
    }
}());

// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };

/* RapiTareas (creado por VegaDark) */
importScriptURI('http://vegadark.wikia.com/index.php?title=MediaWiki:RapiTareas.js&action=raw&ctype=text/javascript');

/* Agrega una notificación en oasis. Por [[w:c:es.pokemon:User:Ciencia Al Poder]] y modificado por [[User:Bola]] */

window.WikiNotification = {
	article: 'One Piece Wiki:VPD',
	key: 'WNotif',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(WikiNotification.key);
		if (pref) return;
		WikiNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Vota y nomina<a href="'+wgServer+wgArticlePath.replace('$1',WikiNotification.article.replace(/\s/g,'_'))+'" title="'+WikiNotification.article+'"> los mejores artículos en el VPD</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(WikiNotification.key,'1');
	}
};
 
$(WikiNotification.init);