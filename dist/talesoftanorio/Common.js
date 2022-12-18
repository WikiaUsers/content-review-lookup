/* Any JavaScript here will be loaded for all users on every page load. */
// Time template
//test
(function() {
	function updateTime() {
		var elements = document.querySelectorAll('.display-time');
		var date = new Date();
		var month = date.getMonth();
		elements.forEach(function(i) {
			var dst = i.getAttribute('data-dst') === "true";
			var timeZone = Number(i.getAttribute('data-timezone'));
			if (isNaN(timeZone)) {
				return;
			}
			if (dst && month >= 2 && month <= 10) {
				timeZone = timeZone + 1;
			}
			var utc = new Date(date.getTime() + (new Date().getTimezoneOffset() * 60 * 1000)).getTime();
			var userDate = new Date(utc + (timeZone * 3600 * 1000));
			var hour = userDate.getHours();
			var minute = userDate.getMinutes().toString();
			minute = minute.length === 1 ? '0' + minute : minute;
			i.innerText = (hour % 12 === 0 ? '12' : (hour % 12).toString()) + ':' + (minute) + ' ' + (hour >= 12 ? 'PM' : 'AM');
		});
	}
	setInterval(updateTime, 1000);
})();

// Edit count template

(function() {
	var elements = document.querySelectorAll('.editcount');
	elements.forEach(function(i) {
		var username = i.getAttribute('data-user');
		if (username) {
			fetch('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(username)).then(function(response) {
				response.json().then(function(obj) {
					var userId = obj.query.users[0] ? obj.query.users[0].userid : null;
					if (userId) {
						fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + userId.toString()).then(function(response2) {
							response2.json().then(function(obj2) {
								i.innerText = obj2.userData.localEdits ? obj2.userData.localEdits.toString() : '0';
							});
						});
					}
				});
			});
		}
	});
})();

// Active since template

(function() {
	var elements = document.querySelectorAll('.user-active-since');
	elements.forEach(function(i) {
		var username = i.getAttribute('data-user');
		if (username) {
			fetch('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(username)).then(function(response) {
				response.json().then(function(obj) {
					var userId = obj.query.users[0] ? obj.query.users[0].userid : null;
					if (userId) {
						fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + userId.toString()).then(function(response2) {
							response2.json().then(function(obj2) {
								i.innerText = obj2.userData.registration ? obj2.userData.registration : '';
							});
						});
					}
				});
			});
		}
	});
})();
//CREDITS TO THEONEANDONLYSPOICY 
mw.loader.using('mediawiki.api', function() {
	// Variable Declarations
	var api = new mw.Api(), cookie_data, block_data, summary_output, dismiss_status, user_info;
	var user = mw.config.get('wgUserName');
	var startDate, startTime, startHour, startMinute, startSecond, start_am_pm, blockStartDateTime, blockStartDateTimeHHMMSS; // start time variables
	var endDate, endTime, endHour, endMinute, endSecond, blockEndDateTime, blockEndDateTimeHHMMSS, blockexpire_current_timezone, blockexpire_UTC; // end time variables
	var block_read_status_page = "User:" + user + "/Block_Notification_Read";
	
	// CSS for the Block Notification
	mw.util.addCSS(".dimScreen{align-items:center;background:rgba(0,0,0,0.8);display:flex;height:100%;justify-content:center;left:0;position:fixed;top:0;width:100%;z-index:799}.block-notif-dismiss a{color:#3a3a3a}.block-notif-dismiss:hover{opacity:.7}");
		
	api.get({
	action: 'query',
	list: 'blocks',
	bkusers: user,
	}).then(function(d) {
		block_data = d.query.blocks;
		
		// If user is not blocked, do not continue with the script. Terminate here.
		if (block_data.length < 1) {
			console.error("You (" + user + ") are not blocked. \"BlockUserNotification\" JS aborted!");
			document.cookie = "read=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			return;
		}
		
		blockr = block_data[0].reason; // fetching block reason
		blockID = block_data[0].id; // fetching block ID
		blockperformer = block_data[0].by; // fetching block performer
		blockperformer_url = blockperformer.replace(/ /g, "_");
		blocktime = block_data[0].timestamp; // fetching block start time
		blockexpire = block_data[0].expiry; // fetching block expiration
		
		//----------- | Block Start Time | -----------//
		console.log("[RUNNING] Block (Start) Timestamp Process...");
		
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
		
		console.log("[PASSED] Block (Start) Timestamp Process");
		// console.log("[INFO] blockStartDateTime: " + blockStartDateTime);
		
		//----------- | Time Formatting for Block End Time | -----------//
		console.log("[RUNNING] Block (End) Timestamp Process...");
		
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
			
			temp = parseInt(blockEndDateTimeHHMMSS[0])-12;
			
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
		
		text_to_format = "<div class=\"default-background\" style=\"line-height: 1.5; border: 2px solid red; font-family: rubik, helvetica, arial, sans-serif;\"><center><span style=\"font-size: 16pt;\">'''You have been blocked from using the Tales of Tanorio Wiki.'''</span></center><hr/>You will not be able to do the following, until your block ends:<li>Discussing or upvoting in [https://talesoftanorio.fandom.com/f Discussions]; and</li><li>Editing any pages on the Tales of Tanorio Wiki]].</li><hr/><span style=\"font-size: 16pt; text-decoration: underline;\">Block Information</span><br/>Block Performer: [[User:" + blockperformer + "|" + blockperformer + "]]<br/>Block Start: " + blockStartDateTime + " <br/>Block Expiry: " + blockEndDateTime + "<br/>Block Reason:<blockquote style=\"margin-top: 0.5em;  margin-bottom: 0.5em;\"><i>" + blockr + "</i></blockquote><hr/>Please abide by the Rules and Guidelines so that the Tales of Tanorio Wiki]] can be a safe and fun place for all Fandom community members.<br/><center><div class=\"wds-button block-notif-dismiss\" id=\"block_notif_dismiss\" style=\"cursor: pointer; background-color: salmon; border-color: salmon; margin: 1em 0 0.5em 0; color: #3A3A3A;\">Dismiss</div></center></div>";
		
		// Cookies
		var all_cookies = document.cookie; // get all cookies
		var cookie_read_status = "0"; // variable to store cookie value for reading block notification
		try {
			var read_cookie_regex = /read=([0-1]+);/; // Regular expressions for finding cookie name (name="read") and value
			var cookie_match = all_cookies.match(read_cookie_regex); // find cookie regex match. If no match is found error will be caught.
			cookie_read_status = cookie_match[1];
			console.warn("\'read\' cookie exists with value \"" + cookie_read_status + "\"!");
		}
		catch(err) {
			console.error(err);
			console.error("\'read\' cookie does not exist.");
			// if cookie does not exist, create the cookie and set cookie value 0 (this means block notification has assumed "not to be read by blocked user"
			if (blockexpire == "infinity") {
				document.cookie = "read=0; path=/";
				document.cookie = "blockid=" + blockID + "; path=/";
			}
			else {
				blockexpire_current_timezone = new Date(blockexpire);
				blockexpire_UTC = blockexpire_current_timezone.toUTCString();
				document.cookie = "read=0; expires=" + blockexpire_UTC + "; path=/";
				document.cookie = "blockexpiry=" + blockexpire + "; expires=" + blockexpire_UTC + "; path=/";
				document.cookie = "blockreason=" + blockr + "; expires=" + blockexpire_UTC + "; path=/";
				console.log("blockexpire_UTC:", blockexpire_UTC);
			}
			console.log("Read cookie created.");
		}
		
		all_cookies = document.cookie;
		var blockid_cookie_regex = /blockexpiry=(\S+);/;
		var blockreason_cookie_regex = /blockreason=(.*?);/;
		var blockid_cookie_match = all_cookies.match(blockid_cookie_regex);
		var blockreason_cookie_match = all_cookies.match(blockreason_cookie_regex);
		
		if ((cookie_read_status === "1") && (blockexpire === blockid_cookie_match[1]) && (blockr === blockreason_cookie_match[1])) {
			console.error(user + " has already dismissed notification and no change was made to block. i.e., Cookie value is \"" + cookie_read_status + "\".");
			console.error("\"BlockUserNotification\" JS aborted!");
			return;
		}
		else {
			blockexpire_current_timezone = new Date(blockexpire);
			blockexpire_UTC = blockexpire_current_timezone.toUTCString();
			document.cookie = "read=0; expires=" + blockexpire_UTC + "; path=/";
			document.cookie = "blockexpiry=" + blockexpire + "; expires=" + blockexpire_UTC + "; path=/";
			document.cookie = "blockreason=" + blockr + "; expires=" + blockexpire_UTC + "; path=/";
			console.warn("Block expiry comparison: \'" + blockid_cookie_match[1] + "\' to \'" + blockexpire + "\'");
			console.warn("Block reason comparison: \'" + blockreason_cookie_match[1] + "\' to \'" + blockr + "\'");
		}
		
		var block_display = document.createElement("div");
		block_display.classList.add("dimScreen");
		
		api.get({
			action: 'parse',
			text: text_to_format
		}).then(function(d) {
			summary_output = d.parse.text["*"];
			var textParagraph = document.createElement("div");
			textParagraph.innerHTML = summary_output;
			block_display.appendChild(textParagraph);
			$(".mediawiki").eq(0).before(block_display);
			console.log("Display block notification at this point.");
			document.getElementById("block_notif_dismiss").onclick = function() {
				if (blockexpire == "infinity") {
					document.cookie = "read=1; path=/";
				}
				else {
					document.cookie = "read=1; expires=" + blockexpire_UTC + "; path=/";
				}
				console.log("Dismiss block notification. i.e., updating \"read\" cookie to \"1\".");
				location.reload();
			};
			console.log("\"BlockUserNotification\" JS successfully loaded.");
		});
	});
});