/*************
Title        :   BlockSummary
Description  :   Displaying a summary of user's block on the blocked user's "User" Namespace pages
Author       :   Vastmine1029
Version      :   1.4.1
*************/

mw.loader.using('mediawiki.api', function() {
	var config = mw.config.get([
		'wgNamespaceNumber',
		'wgRelevantUserName',
		'wgServer', // Wiki URL
		'wgSiteName', // Wiki Name
		'wgContentLanguage' // Wiki Language Code
	]);
	
	if (config.wgNamespaceNumber !== 2) {
		console.error("The page is not a \"User\" namespace page. BlockSummary.js aborted!");
		return; // Only run in "User" namespace.
	}
	
	if (config.wgRelevantUserName === null) {
		console.error("No relevant username attributed to the current viewed page. BlockSummary.js aborted!");
		return; // Only run in "User" namespace.
	}
	
	var wiki_name = config.wgSiteName;
	var wiki_url = config.wgServer;
	var wiki_lang = config.wgContentLanguage;
	var wiki_lang_for_url = "";
	
	if (wiki_lang !== "en") {
		wiki_lang_for_url = "/" + wiki_lang;
	}
	
	wiki_url = wiki_url + wiki_lang_for_url;
	
	// If the wiki is not English, add language code next to the site name.
	if (wiki_lang !== "en") {
		lang_for_wiki_name = " (" + wiki_lang + ")";
	}
	else {
		lang_for_wiki_name = "";
	}
	
	var user = config.wgRelevantUserName; // grabbing username of user blocked
	var url_user = user.replace(/ /g, "_");
	
	var api = new mw.Api(), data;
	var blockr, blockID, blockperformer, blocktime, expire, block_type; // declaring variables for api.get
	var partial_block_pages, partial_block_features, partial_block_namespaces;
	var partial_block_namespaces_titles = [];
	var parsedBlockReason; // parsed reason stored from parse API output
	var startDate, startTime, startHour, startMinute, startSecond, start_am_pm, blockStartDateTime, blockStartDateTimeHHMMSS; // start time variables
	var endDate, endTime, endHour, endMinute, endSecond, blockEndDateTime, blockEndDateTimeHHMMSS; // end time variables
	var temp; // declaring variable for formatting text
	var lang_for_wiki_name;

	api.get({
		action: 'query',
		list: 'blocks',
		bkusers: user,
		bkprop: "restrictions|by|expiry|id|reason|timestamp|user|userid|flags|byid",
	}).then(function(d) {
		data = d.query.blocks;
		
		// if the user is not blocked, terminate program
		if (data === undefined || data.length < 1) { 
			return;
		}
		
		blockr = data[0].reason; // fetching block reason
		blockID = data[0].id; // fetching block ID
		blockperformer = data[0].by; // fetching block performer
		blockperformer_url = blockperformer.replace(/ /g, "_");
		blocktime = data[0].timestamp; // fetching block start time
		expire = data[0].expiry; // fetching block expiration
		block_type = data[0].partial !== undefined ? "Partial" : "Sitewide"; // Determine if block is sitewide or partial.
		// If partial block applies, fetch what wiki features, pages, and namespaces user is blocked on.
		if (block_type === "Partial") {
			partial_block_pages = [];
			if (data[0].restrictions.pages !== undefined) {
				for (var i in data[0].restrictions.pages) {
					partial_block_pages.push(data[0].restrictions.pages[i]["title"]);
				}
			}
			else {
				partial_block_pages = "N/A";
			}
			partial_block_features = data[0].restrictions.actions;
			partial_block_namespaces = data[0].restrictions.namespaces;

			// API fetch for namespaces.
			// The purpose of this code section is to parse out which namespaces the user is blocked on for partial block.
			if (partial_block_namespaces !== undefined) {
				api.get({
					action: 'query',
					meta: 'siteinfo',
					siprop: 'namespaces',
				}).then(function(data_namespaces) {
					data_namespaces = data_namespaces.query.namespaces;
					
					for (var id in partial_block_namespaces) {
						for (var i in data_namespaces) {
							if (partial_block_namespaces[id] === data_namespaces[i]["id"]) {
								partial_block_namespaces_titles.push(data_namespaces[i]["canonical"]);
								break;
							}
						}
					}
				});
			}
			else {
				partial_block_namespaces_titles = "N/A";
			}
		}
		
		// Avoid double run
		if (window.BlockSummary || !user)
			return;
		window.BlockSummary = true;
		
		
		//----------- | Main Function for Block Report | -----------//
		function main(user, blockreason, blockID, blockperformer, blockperformer_url, blocktime, blockexpire, block_type, partial_block_pages, partial_block_features, partial_block_namespaces_titles) {			
			
			// Passing wikitext for parsing
			console.log("%c[RUNNING] Parsing block reason wikitext...", "background: #F9F983; color: black");
			api.parse(blockreason).done(function(parsedBlockReason) {
				console.log("%c[PASSED] Parsing block reason wikitext.", "background: limegreen; color: black");
				
				//----------- | Block Start Time | -----------//
				console.log("%c[RUNNING] Block (Start) Timestamp Process...", "background: #F9F983; color: black");
				
				temp = blocktime.split("T"); 
				startDate = temp[0];
				temp = temp[1].split("Z");
				startTime = temp[0];
				
				
				blockStartDateTimeHHMMSS = startTime.split(":"); // Splitting time into hours, minutes, seconds as array (blockEndDateTimeHHMMSS = {HH, MM, SS})
				startMinute = blockStartDateTimeHHMMSS[1]; // MM
				startSecond = blockStartDateTimeHHMMSS[2]; // SS
				
				if (parseInt(blockStartDateTimeHHMMSS[0]) == 0) {
					startHour = "12";
					start_am_pm = "AM";
				}
				else if (parseInt(blockStartDateTimeHHMMSS[0]) == 12) {
					startHour = "12";
					start_am_pm = "PM";
				}
				else if (parseInt(blockStartDateTimeHHMMSS[0]) > 12) {
					startHour = parseInt(blockStartDateTimeHHMMSS[0])-12;
					startHour = startHour.toString();
					start_am_pm = "PM";
				}
				else {
					startHour = blockStartDateTimeHHMMSS[0];
					startHour = startHour.toString();
					start_am_pm = "AM";
				}
				
				// Formatting Start Time
				startTime = startHour + ":" + startMinute + ":" + startSecond + " " + start_am_pm;
				blockStartDateTime = startDate + ", " + startTime + " (UTC)";
				
				console.log("%c[PASSED] Block (Start) Timestamp Process", "background: limegreen; color: black");
				
				//----------- | Time Formatting for Block End Time | -----------//
				console.log("%c[RUNNING] Block (End) Timestamp Process...", "background: #F9F983; color: black");
				
				if (blockexpire == "infinity") {
					blockEndDateTime = "infinity";
				}
				else {
					temp = blockexpire.split("T");
					endDate = temp[0];
					temp = temp[1].split("Z");
					endTime = temp[0];
					blockEndDateTime = endDate + ", " + endTime + " UTC";
					
					blockEndDateTimeHHMMSS = endTime.split(":"); // Splitting time into hours, minutes, seconds as array (blockEndDateTimeHHMMSS = {HH, MM, SS})
					endMinute = blockStartDateTimeHHMMSS[1];
					endSecond = blockStartDateTimeHHMMSS[2];
					
					temp = parseInt(blockEndDateTimeHHMMSS[0]) - 12;
					
					if (parseInt(blockEndDateTimeHHMMSS[0]) == 0) {
						endHour = "12";
						end_am_pm = "AM";
					}
					else if (parseInt(blockEndDateTimeHHMMSS[0]) == 12) {
						endHour = "12";
						end_am_pm = "PM";
					}
					else if (parseInt(blockEndDateTimeHHMMSS[0]) > 12) {
						endHour = parseInt(blockEndDateTimeHHMMSS[0])-12;
						endHour = endHour.toString();
						end_am_pm = "PM";
					}
					else {
						endHour = blockEndDateTimeHHMMSS[0];
						endHour = endHour.toString();
						end_am_pm = "AM";
					}
					
					// Formatting End Time
					endTime = endHour + ":" + endMinute + ":" + endSecond + " " + end_am_pm;
					blockEndDateTime = endDate + ", " + endTime + " (UTC)";
				}
				
				console.log("%c[PASSED] Block (End) Timestamp Process", "background: limegreen; color: black");
				
				
				//----------- | HTML Display of Block Report | -----------//
				console.log("%c[RUNNING] Creating HTML Display of Block Report...", "background: #F9F983; color: black");
				
				var Box = document.createElement("div"); // Box
				Box.style.marginTop = "1em"; // setting top-margin for Box
				Box.style.marginBottom = "1em"; // setting bottom-margin for Box
				Box.style.paddingTop = "1em"; // setting padding-top for Box
				Box.style.paddingLeft = "1em"; // setting padding-left for Box
				Box.style.paddingRight = "1em"; // setting padding-right for Box
				Box.style.paddingBottom = "1em"; // setting padding-bottom for Box
				
				
				// adding classes for Box -- these classes are made by Fandom
				Box.classList.add("warningbox");
				Box.classList.add("mw-warning-with-logexcerpt");
				Box.classList.add("mw-content-ltr");
				
				var textParagraph = document.createElement("p"); // create a text paragraph

				if (block_type === "Partial") {
					var partial_block_details = "<br/>&nbsp;&nbsp;&nbsp;<b><i>Blocked Features: </b></i>" + partial_block_features + "<br/>&nbsp;&nbsp;&nbsp;<b><i>Blocked Pages: </b></i>" + partial_block_pages + "<br/>&nbsp;&nbsp;&nbsp;<b><i>Blocked Namespaces: </b></i>" + partial_block_namespaces_titles;
				}
				else {
					var partial_block_details = "";
				}
				
				// HTML design
			textParagraph.innerHTML = "<center><div style=\"font-size: 15pt; line-height: 1em\"><a href=\"" + wiki_url + "/wiki/User:" + url_user +"\">" + user + "</a> is currently blocked on <a href=\"\">" + wiki_name + "<span style=\"font-size: 8pt;\">" + lang_for_wiki_name + "</a></span> </div></center><a href=\"" + wiki_url + "/wiki/User:" + user + "\"></a><hr style=\"border: 1px solid rgb(var(--theme-alert-color--rgb)); background-color: rgb(var(--theme-alert-color--rgb));\"><span style=\"position: relative; float: right; border: 1.5px dotted; padding: 0 0.25em 0 0.25em\"><a href=\"" + wiki_url + "/wiki/Special:Log?type=block&page=User:" + url_user + "\">Block Log</a></span><div style =\"font-size: 15pt; text-decoration: underline;\">Block Information</div><b><i>Username: </i></b>" + user + "<br/><b><i>Block ID: </b></i>" + blockID + "<br/><b><i>Block Performer: </b></i><a href=\"" + wiki_url + "/wiki/User:" + blockperformer_url + "\">" + blockperformer + "</a><br/><b><i>Block Type: </b></i>" + block_type + partial_block_details + "<br/><b><i>Block Start: </b></i>" + blockStartDateTime + "<br/><b><i>Block Expiry: </b></i>" + blockEndDateTime + "<br/><b><i>Block Reason: </b></i><blockquote style=\"border-left: 5px solid rgba(var(--theme-alert-color--rgb), 0.5); padding-left: 0.5em;\">" + parsedBlockReason + "</blockquote>";
				
				Box.appendChild(textParagraph); // apply all text configurations into Box
				
				console.log("%c[DONE] HTML Display of Block Report", "background: limegreen; color: black");
				
				//----------- | Using setInterval to ensure prepending of Box to content page | -----------//
				var interval = setInterval(function() {
					if ($('.ns-2 #content').length) {
						clearInterval(interval);
						$(".ns-2 #content").eq(0).before(Box); // prepending Box to ".ns-2 #content"
					}
				}, 1000);	
			});
		}
		main(user, blockr, blockID, blockperformer, blockperformer_url, blocktime, expire, block_type, partial_block_pages, partial_block_features, partial_block_namespaces_titles); // executing function
	});
});