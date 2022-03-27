function quickRollback() {
	mw.loader.using([
		'mediawiki.Uri', 
		'mediawiki.api'
	]).then( function () {
		
		$('span.mw-rollback-link').click( function(e) {
			
			e.preventDefault();
		
			var $rblink    = $(this);
			var href       = this.getElementsByTagName('a')[0].href;
			this.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Loading.gif" style="vertical-align: baseline;" height="10" width="10" border="0" alt="Rollingback..." />';
			
			var api    = new mw.Api();		
			var uri    = new mw.Uri(href); 
			var decode = decodeURIComponent;
			var params = {
					action: 'rollback',
					title: decode( uri.query.title || uri.path.match(/\/wiki\/(.+)/)[1] ),
					user: decode( uri.query.from ),
					markbot: e.ctrlKey,
					format: 'json'
				};
				
			api.postWithToken('rollback',  params)
				
				.done( function (data) {
					$rblink.text('✓');
				} )
				
				.fail( function (reason) {
					$rblink.text('✗');
					new BannerNotification('Откатить не удалось: ' + reason, 'error').show();
				} );
				
		} );
		
	} );
}

$.when($.ready).then(function () {
	mw.hook('wikipage.content').add(quickRollback);
});