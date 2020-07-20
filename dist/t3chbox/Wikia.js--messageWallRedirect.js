/*// ==UserScript==
// @name           Message Wall Redirect
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Redirects users automatically from a message wall to a chosen page.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
function MessageWallRedirect() {
	var pathArray = window.location.pathname.split( ':' );
	window.location.href = window.location.protocol + "User:" + pathArray[1] + "/Talk_Page"
}
 
       if ($(".MessageWallRedirect")[0]){
		addOnloadHook(MessageWallRedirect);   
}*/