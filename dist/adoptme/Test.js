/*************
Title        :   BlockReport
Description  :   Displaying a summary of user's block in User Profile page
Author       :   Vastmine1029
Version      :   1.0
*************/


/* https://adoptme.fandom.com/api.php?action=query&list=users&ususers=USERNAME&usprop=blockinfo|groups|editcount|registration|emailable|gender
*/

mw.loader.using('mediawiki.api', function() {
	var user = mw.config.get('wgRelevantUserName'); // grabbing username of user blocked
	var api = new mw.Api(), data;
	var blockr, blockID, blockperformer, blocktime, expire; // declaring variables for api.get
	var parsedBlockReason, startDate, startTime, blockStartDateTime, endDate, endTime, blockEndDateTime, temp; // declaring variables for formatting text

	api.get({
		action: 'query',
		list: 'blocks',
		bkusers: user
	}).then(function(d) {
		data = d.query.blocks;
		
		blockr = data[0].reason; // fetching block reason
		blockID = data[0].id; // fetching block ID
		blockperformer = data[0].by; // fetching block performer
		blocktime = data[0].timestamp; // fetching block start time
		expire = data[0].expiry; // fetching block expiration
		 
		
		var ucp = mw.config.get('wgVersion') !== '1.19.24';
		var selector = ucp ? $('.page-header__separator') : $('#contentSub > a:last-child');
		
		if (window.BlockReport || !user)
			return;
		window.BlockReport = true;
		
		// Main function for Block Report
		function main(user, blockreason, blockID, blockperformer, blocktime, blockexpire) {			
			var api = new mw.Api();
			
			// Passing wikitext for parsing
			api.parse(blockreason).done(function(textOutput) {
				parsedBlockReason = textOutput;
				console.log("parsedBlockReason: " + parsedBlockReason);
				
				// Time Formatting for Block Start Time
				temp = blocktime.split("T");
				startDate = temp[0];
				temp = temp[1].split("Z");
				startTime = temp[0];
				blockStartDateTime = startDate + ", " + startTime + " UTC";
				console.log("blockStartDateTime: " + blockStartDateTime);
				
				// Time Formatting for Block End Time
				if (blockexpire == "infinity") {
					blockEndDateTime = "infinity";
				}
				else {
					temp = blockexpire.split("T");
					endDate = temp[0];
					temp = temp[1].split("Z");
					endTime = temp[0];
					blockEndDateTime = endDate + ", " + endTime + " UTC";
				}
				console.log("blockEndDateTime: " + blockEndDateTime);
				
				
				/* HTML Display of Block Report */
				var Box = document.createElement("div"); // Box
				Box.style.marginTop = "1em"; // setting top-margin for Box
				Box.style.marginBottom = "1em"; // setting bottom-margin for Box
				
				// adding classes for Box -- these classes are made by Fandom
				Box.classList.add("warningbox");
				Box.classList.add("mw-warning-with-logexcerpt");
				Box.classList.add("mw-content-ltr");

				var textParagraph = document.createElement("p"); // create a text paragraph
				
				textParagraph.innerHTML = "<div style =\"font-size: 16pt; text-decoration: underline; text-align: center\">Block Report</div><b>Username: </b>" + user +
				"<br/><b>Block ID: </b>" + blockID +
				"<br/><b>Block Performer: </b><a href=\"https://adoptme.fandom.com/wiki/User:" + blockperformer + "\">" + blockperformer + "</a>" +
				"<br/><b>Block Start: </b>" + blockStartDateTime +
				"<br/><b>Block Expiry: </b>" + blockEndDateTime +
				"<br/><b>Block Reason: </b><blockquote>" + parsedBlockReason + "</blockquote>";
				console.log("Parse Output (main): " + parsedBlockReason);
				
				Box.appendChild(textParagraph); // apply all text configurations into Box
				
				// Using setInterval to ensure prepending of Box to content page
				var interval = setInterval(function() {
					if ($('.ns-2 #content')) {
						clearInterval(interval);
						$(".ns-2 #content").eq(0).before(Box); // prepending Box to ".ns-2 #content"
					}
				}, 1000);	
			});
		}
		main(user, blockr, blockID, blockperformer, blocktime, expire); // executing function
	});
});