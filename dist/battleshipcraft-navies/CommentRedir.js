
// Temp fix for comment links in RC
// @ Author RansomTime
// As far as I'm concerned you can do what you want with this code, it's just string manipulation 
$(function() {
	if (wgNamespaceNumber && wgNamespaceNumber === 501) {
		var targetURL = wgServer+ "/wiki/" + wgPageName.slice(0,wgPageName.search("/@")).replace("_comment","");
		var hashyolo = window.location.href.slice(window.location.href.search("#"));
		window.location.href = targetURL + hashyolo;
	}
});