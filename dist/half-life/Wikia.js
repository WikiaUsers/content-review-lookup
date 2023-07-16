$(function NamespacesInHeader() {
	if(wgCanonicalNamespace != '' && wgCanonicalNamespace != 'Talk') {
		$('#WikiaPageHeader h1').html(wgFormattedNamespaces[wgNamespaceNumber] + ':' + wgTitle);
	}
});

//When there's a takeover ad, hide the fixed mainpage boxes.
$(window).load(function() {
	var adSkinStyle = $('#ad-skin').attr('style');
	if ( $('#ad-skin').children().length > 0 || typeof adSkinStyle != 'undefined') {
		$('.mainpage-float').remove();
	}
});