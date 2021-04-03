var cgnListOfWikis = [];

window.clearNotificationFromWiki = function(wiki) {
	if (wiki== cgnListOfWikis.length) {
		$("img.cgn-clear").attr("src","/media/d/db/Icon_delete.png").css({"cursor":"pointer","width":"45px","padding":"0"});
		$(".mw-echo-ui-crossWikiNotificationItemWidget").hide();
		$(".mw-echo-notifications-badge").attr("data-counter-text",0);
		return;
    }
    if (cgnListOfWikis[wiki].url.indexOf("hydra.gamepedia")!=-1) {
    	clearNotificationFromWiki(wiki+1);
    	return;
    }
	fa = new mw.ForeignApi(cgnListOfWikis[wiki].url);
	fa.postWithToken('csrf',{action:"echomarkread",all:"true"}).always(function(data) {
		clearNotificationFromWiki(wiki+1);
    });
}

mw.loader.using(['mediawiki.api','mediawiki.ForeignApi']).then(function() {
	mw.trackSubscribe( 'timing.MediaWiki.echo.overlay.ooui',function() {
		$(".mw-echo-ui-notificationsWidget-markAllReadButton").hide();
	    $(".mw-echo-ui-notificationBadgeButtonPopupWidget-popup").find(".oo-ui-popupWidget-head").prepend('<span style="float:right;font-size: 1em;margin-top: 0.3em;" class="oo-ui-labelElement-label">Limpar todas as notificações<img class="cgn-clear" src="/media/d/db/Icon_delete.png" style="cursor:pointer;height: 20px;width: 45px;"></span>'); 
	    $("img.cgn-clear").click(function() {
	    	$("img.cgn-clear").attr("src","/media/0/05/Ajax.gif").css({"cursor":"wait","width":"20px","padding":"0 12.5px"});
	    	a = new mw.Api();
	    	a.postWithToken('csrf',{action:"echomarkread",all:"true"});
			a.get({action:"query",meta:"notifications",notfilter:"!read",notcrosswikisummary:1,notlimit:"max"}).done(function(data){ 
				for (var s in data.query.notifications.list[0].sources) cgnListOfWikis.push(data.query.notifications.list[0].sources[s]);
				clearNotificationFromWiki(0);
			});
	    });
	});
});