$(document).ready(function (){

	if((mw.config.get('wgCanonicalNamespace') != 'Special')||(mw.config.get('wgCanonicalSpecialPageName') != 'Recentchanges')){
		return;
	}

	$('.mw-rollback-link').remove();
	
});