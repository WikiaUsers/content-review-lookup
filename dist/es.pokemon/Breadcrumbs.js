$(function() {
	mw.hook('wikipage.content').add(function() {
		$('#navegador').prependTo('.page-header__meta');
	});
}());