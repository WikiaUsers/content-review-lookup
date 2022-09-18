/*************
Title        :   BlockSummary
Description  :   Displaying a summary of user's block on the blocked user's "User" Namespace pages
Author       :   Vastmine1029
Version      :   1.3
*************/

mw.loader.using('mediawiki.api', function() {
	var config = mw.config.get([
		'wgRelevantUserName',
		'wgServer', // Wiki URL
		'wgSiteName', // Wiki Name
		'wgContentLanguage' // Wiki Language Code
	]);
	
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
	var blockr, blockID, blockperformer, blocktime, expire; // declaring variables for api.get
	var parsedBlockReason; // parsed reason stored from parse API output
	var startDate, startTime, startHour, startMinute, startSecond, start_am_pm, blockStartDateTime, blockStartDateTimeHHMMSS; // start time variables
	var endDate, endTime, endHour, endMinute, endSecond, blockEndDateTime, blockEndDateTimeHHMMSS; // end time variables
	var temp; // declaring variable for formatting text
	var lang_for_wiki_name;

	api.get({
		action: 'query',
		list: 'blocks',
		bkusers: user,
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
		
		if (window.BlockSummary || !user)
			return;
		window.BlockSummary = true;
		
		
		//----------- | Main Function for Block Report | -----------//
		function main(user, blockreason, blockID, blockperformer, blockperformer_url, blocktime, blockexpire) {			
			
			// Passing wikitext for parsing
			console.log("%c[RUNNING] Parsing block reason wikitext...", "background: #F9F983; color: black");
			api.parse(blockreason).done(function(textOutput) {
				console.log("%c[PASSED] Parsing block reason wikitext.", "background: limegreen; color: black");
				
				parsedBlockReason = textOutput;
				
				// console.log("[INFO] parsedBlockReason: " + parsedBlockReason);
				
				
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
					// console.log("blockEndDateTimeHHMMSS parseInt: " + blockEndDateTimeHHMMSS);
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
				// console.log("[INFO] blockStartDateTime: " + blockStartDateTime);
				
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
					
					// console.log("blockEndDateTimeHHMMSS[0]: " + blockEndDateTimeHHMMSS[0]);
					
					temp = parseInt(blockEndDateTimeHHMMSS[0])-12;
					// console.log("End Hour: " + temp.toString());
					
					if (parseInt(blockEndDateTimeHHMMSS[0]) == 0) {
						endHour = "12";
						end_am_pm = "AM";
						// console.log("blockEndDateTimeHHMMSS parseInt: " + blockEndDateTimeHHMMSS);
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
				// console.log("[INFO] blockEndDateTime: " + blockEndDateTime);
				
				
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
				
				textParagraph.innerHTML = "<center><div style=\"font-size: 15pt; line-height: 1em\">" + "<a href=\"" + wiki_url + "/wiki/User:" + url_user + "\">" + user + "</a> is currently blocked on " + "<a href=\"" + wiki_url + "\">" + wiki_name + "<span style=\"font-size: 8pt;\">" + lang_for_wiki_name + "</a></span>.</div></center>" + 
				"<center><span style=\"font-size: 8pt; padding: 0 0.25em 0 0.25em;\"><a href=\"" + wiki_url + "/wiki/User:" + url_user + "\">" + wiki_url + "/wiki/User:" + url_user + "</a></span></center>" + 
				"<hr style=\"border: 1px solid rgb(var(--theme-alert-color--rgb)); background-color: rgb(var(--theme-alert-color--rgb));\">" +
				"<span style=\"position: relative; float: right; border: 1.5px dotted; padding: 0 0.25em 0 0.25em\"><a href=\"" + wiki_url + "/wiki/Special:Log?type=block&page=User:" + url_user + "\">Block Log</a></span>" +
				"<div style =\"font-size: 15pt; text-decoration: underline;\">Block Information</div>" + 
				"<b><i>Username: </i></b>" + user +
				"<br/><b><i>Block ID: </b></i>" + blockID +
				"<br/><b><i>Block Performer: </b></i><a href=\"" + wiki_url + "/wiki/User:" + blockperformer_url + "\">" + blockperformer + "</a>" +
				"<br/><b><i>Block Start: </b></i>" + blockStartDateTime +
				"<br/><b><i>Block Expiry: </b></i>" + blockEndDateTime +
				"<br/><b><i>Block Reason: </b></i><blockquote style=\"border-left: 5px solid rgba(var(--theme-alert-color--rgb), 0.5); padding-left: 0.5em;\">" + parsedBlockReason + "</blockquote>";
				
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
		main(user, blockr, blockID, blockperformer, blockperformer_url, blocktime, expire); // executing function
	});
});