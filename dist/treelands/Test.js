(function(){
	var username = mw.config.get('wgRelevantUserName');
	if (
        window.BlockReport || !username ||
        // TODO: Fix weird loading order
        mw.util.isIPAddress(username)
    ) {
        return;
    }
	window.BlockReport = true;
	
	mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function() {
        return new mw.Api().get({
            action: 'query',
			list: 'blocks',
			bkusers: user
        });
	}).then(function(d){
		data = d.query.blocks;
		
		blockr = data[0].reason;
		blockID = data[0].id;
		blockperformer = data[0].by;
		blocktime = data[0].timestamp;
		expire = data[0].expiry;
		
		mw.util.addCSS(
				//mw-warning-with-logexcerpt
				".blockreport-border {"
					+ "padding: 3px;"
					+ "margin-bottom: 3px;"
					+ "border: 2px solid #2a4b8d;"
					+ "clear: both;"
				+ " }"
				+ ".bolding {"
					+ "font-weight: bold;"
				+ "}"
				// Break Line Class (For <span>) - Unused
				+ ".break-line {"
					+ "white-space: pre;"
					+ "content: ' '"
				+ "}"
				
			);
		
		$(".page-header__title").append(
			$('<div>', {
				'class': 'blockreport-border'
			}).append(
				$('<a>'), {
					href: mw.util.getUrl('User:' + username),
                    title: blockr,
                    text: blockr
				}
			)
		);
	});
})();