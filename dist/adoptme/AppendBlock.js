/*************
Title        :   AppendBlock
Description  :   Appends Block Summary onti Uer Profile or anything after id "#firstHeading"
Author       :   Vastmine1029
Version      :   0.1
*************/

/* https://adoptme.fandom.com/api.php?action=query&list=users&ususers=USERNAME&usprop=blockinfo|groups|editcount|registration|emailable|gender*/
/*mw.loader.using('mediawiki.api', function() {
	'use strict';
})();*/

mw.loader.using('mediawiki.api', function() {
	var user = mw.config.get('wgRelevantUserName');
	var api = new mw.Api(), data;
	var blockr, blockID, blockperformer, blocktime, expire;

	api.get({
		action: 'query',
		list: 'blocks',
		bkusers: user
	}).then(function(d) {
		data = d.query.blocks;
		
		blockr = data[0].reason;
		blockID = data[0].id;
		blockperformer = data[0].by;
		blocktime = data[0].timestamp;
		expire = data[0].expiry;
		
		var ucp = mw.config.get('wgVersion') !== '1.19.24';
		var selector = ucp ? $('.page-header__separator') : $('#contentSub > a:last-child');
		
		if (window.BlockReport || !user)
			return;
		window.BlockReport = true;
		
		
		function appendCSS(blockreason, blockID1, blockdoneby, blocktime1, blockexpire){
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

			// add groups + label to newly created element, then add to DOM
			var $content = $('<div>')    
			
			$content
				.addClass("blockreport-border")
				.append(
					$('<div>') 
						.text("Block Report")
						.append(
							$("<div>")
								.text("Username: "  + user)
								.append(
									$("<div>")
										.text("Block ID: "  + blockID1)
										.append(
											$("<div>")
												.text("Block Performer: " + blockdoneby)
												.append(
													$("<div>")
														.text("Block Timestamp: " + blocktime1)
														.append(
															$("<div>")
																.text("Block Reason: " + blockreason)
																.append(
																	$("<div>")
																		.text("Block Expiry: " + expire)
																)
														)
												)
										)
								)
						)
				);
			$("#firstHeading").eq(0).after($content);
		}
		appendCSS(blockr, blockID, blockperformer, blocktime, expire);
	});
});