// Why does this not work in chrome on mac???
if ($("body").hasClass("ns-112")) {
anctp_section = $( "h2 > #Kapitel" ).parent().index( "h2" ) - 1;
letztes_Kapitel_auf_Seite = $("#WikiaArticle li:last-child span.vorlage-kapitel-link > a");
letztes_Kapitel_auf_Seite_nummer = parseInt(letztes_Kapitel_auf_Seite.text());

anctp_lc_p1 = "00000" + (letztes_Kapitel_auf_Seite_nummer + 1);
anctp_lc_p2 = "00000" + (letztes_Kapitel_auf_Seite_nummer + 2);
anctp_lc_p3 = "00000" + (letztes_Kapitel_auf_Seite_nummer + 3);
anctp_lc_p4 = "00000" + (letztes_Kapitel_auf_Seite_nummer + 4);
anctp_lc_p5 = "00000" + (letztes_Kapitel_auf_Seite_nummer + 5);

anctp_lc_1 = anctp_lc_p1.slice(-3);
anctp_lc_2 = anctp_lc_p2.slice(-3);
anctp_lc_3 = anctp_lc_p3.slice(-3);
anctp_lc_4 = anctp_lc_p4.slice(-3);
anctp_lc_5 = anctp_lc_p5.slice(-3);

function addNewChaptersToPage() {
var anctp_meta = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
};

 var edit_url = anctp_meta.server + '/api.php?action=edit&title=' + encodeURIComponent(anctp_meta.pagename) + '&section=' + anctp_section + '&appendtext=' + encodeURIComponent("\n*{{Kapitel|" + anctp_lc_1 + "}}\n*{{Kapitel|" + anctp_lc_2 + "}}\n*{{Kapitel|" + anctp_lc_3 + "}}\n*{{Kapitel|" + anctp_lc_4 + "}}\n*{{Kapitel|" + anctp_lc_5 + "}}") + isBot + '&token=' + encodeURIComponent(anctp_meta.edittoken) + '&summary=Kapitel zur Übersicht hinzugefügt';
 
$.post(edit_url, function () {
$("*").css("cursor", "progress");
    }).success(function() {
$("*").css("cursor", "progress");
setTimeout(function() {
location.reload();
}, 2000);
});
}

$(window).ready(function () {
setTimeout(function() {
if(anctp_lc_1 === "NaN") { } else {
letztes_Kapitel_auf_Seite.parent().parent().after('<li id="last-item" class="button-add-more-chapters" style="list-style: none;"><a onclick="addNewChaptersToPage()" class="button">Neue Kapitel zur Liste hinzufügen</a></li>');
}

/* info notif */
$(".button-add-more-chapters a")
	.mouseover(function() {
		$( this ).parent().append('<div id="new-chapter-notice" class="mainpage-box" style="position: absolute; z-index: 10; margin-top: 10px; margin-left: 5px;"><div class="arrow-up" style="border-width: 0 10px 10px 10px; border-style: solid; border-color: #FFE9A0 transparent; position: absolute; margin-top: -10px;"></div>Klicke diesen Button, um automatisch fünf neue leere Kapitel zu dieser Liste hinzuzufügen.</div>');
	})
	.mouseout(function() {

		$("#new-chapter-notice").fadeOut("slow");

			setTimeout(function() {
				$("#new-chapter-notice").remove();
			}, 1000);
	});

},1000);
});
}