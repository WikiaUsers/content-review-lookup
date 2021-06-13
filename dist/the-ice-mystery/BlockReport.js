mw.loader.using('mediawiki.api', function() {
	var user = mw.config.get('profileUserName');
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
					+ "margin-top: 1em;"
					+ "margin-bottom: 1.5em;"
					+ "border: 2px solid #786eff;"
					+ "clear: both;"
					+ "padding: 5px;"
				+ " }"
				+ ".bolding {"
					+ "font-weight: bold;"
				+ "}"
				+ "big {"
					+ "font-size: 25px;"
					+ "font-weight: bold;"
				+ "}"
				+ "div {"
					+ "font-size: 15px;"
					+ "font-weight: normal;"
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
					$('<big>') 
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
			$("#userProfileApp").eq(0).after($content);
		}
		appendCSS(blockr, blockID, blockperformer, blocktime, expire);
	});
});