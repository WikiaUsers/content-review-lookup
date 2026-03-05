/* Any JavaScript here will be loaded for all users on every page load. */
(() => {
	if (mw.config.get('wgPageName') !== 'MediaWiki:Wikia-moderation') return;
	$.get('/api.php?action=parse&page=MediaWiki:Custom-wikia-moderation&format=json', data => {
		$('.noarticletext.mw-content-ltr').text('');
		$('#mw-content-text').append(data.parse.text['*']);
		$('body').append(`
		<style>
		@import "/load.php?mode=articles&articles=u:dev:MediaWiki:Nord.css&only=styles";
		</style>
		`);
	});
})();