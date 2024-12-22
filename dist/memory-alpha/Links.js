$(function(){
	var server = mw.config.get('wgServer');
	$('.internal-external-link [href^="' + server + '/"]').removeAttr('target rel class');
});