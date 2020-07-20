/* killing the My Home thingy */
if( wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome' && window.location.toString().indexOf('redirect=no') == -1 ) {
	window.location = wgServer + wgArticlePath.replace('$1',(window.wgMainpage||window.wgMainPageTitle));
}

$(function() {
	$('#header_myhome a,#community-widget-action-button,#myhome-feed-switch a').click(function() {
		window.location = this.href + '?redirect=no';
		return false;
	});
});