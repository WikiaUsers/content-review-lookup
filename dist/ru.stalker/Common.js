/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
function runAsEarlyAsPossible(callback, $testElement, func) {
	func = func || $;
	$testElement = $testElement || $('.page-footer');

	if ($testElement.length) {
		callback();
	} else {
		func(callback);
	}
}

runAsEarlyAsPossible(function () {
	/**
	 * {{executeJS}}
	 */
	var namesExempt = {};
	$('.executeJS').each( function () {
		var names = $(this).data('scriptnames');
		if (names) {
			names.split(' ').forEach(function (name) {
				name = name.replace( /[^\w_-]/g, '' );
				if (name && !namesExempt[name]) {
					namesExempt[name] = true;
					mw.loader.load( '/ru/wiki/MediaWiki:Script/' + name + '.js?action=raw&ctype=text/javascript');
				}
			} );
		}
	} );


}, $( '.page-footer' ), mw.hook( 'wikipage.content' ).add );

/* Inactive users */
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};