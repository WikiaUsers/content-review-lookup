/* Por [[w:User:Hotsoup.6891|Hotsoup.6891]] */
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "bottom",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
  importScriptPage('SocialIcons/code.js','dev');

/* Por [[w:User:Rappy 4187|Rappy 4187]] */
$(function addMastheadTags() {
  if ($('#UserProfileMasthead')) {
    var rights = {};
 
    rights["Kamatis"]  = ["Administrador"], 
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();
        for( var i=0, len=rights[user].length; i < len; i++) {
          $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
  }
});

/* Agrega una notificación en oasis. Por [[w:c:es.pokemon:User:Ciencia Al Poder]] */
window.SkinNotification = {
	article: 'Tío_Grandpa_Wiki:Reglas',
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
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Consulta las<a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'"> normas de uso para el Wiki</a>.</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};
 
function Tío_Grandpa_WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
//		$(agregarEnlaceSkin);
	}
}
 
Tío_Grandpa_WikiaSkinLoad();

/*Facebook*/

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=151981424827777&connections=5" align="top" frameborder="0" width="300" height="175" scrolling="no" />');
}
 
$(fBox);