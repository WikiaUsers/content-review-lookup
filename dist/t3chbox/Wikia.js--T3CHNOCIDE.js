function psychoHello() {
	$('#WikiaRail').append('<div class="hi" style="position:absolute; right:15px; top:181px;"></div>')
	setTimeout( function(){$('.hi').remove();} , 2000);
}
 
if (mw.config.get("wgPageName") == "User:T3CHNOCIDE") {
	addOnloadHook(psychoHello);
}