/*************
Title        :   StackableBlockRecommendationSystem.js
Description  :   Provides recommendation to viewer (i.e., moderator and above) on Special:Block page for stackable block described in Wiki Policies.
Author       :   Vastmine1029
Version      :   0.1.1a
*************/
mw.loader.using('mediawiki.api', function() {
	// Relevant MediaWiki Variables
	var config = mw.config.get([
		'wgRelevantUserName',
		'wgCanonicalSpecialPageName'
	]);
	
	//----------- | Script Execution Prerequisites | -----------//
	// Run JS only if a relevant name of the user to which content actions and some extra navigation links, 
	if (config.wgRelevantUserName === null) {
		console.error("No relevant username attributed to the current viewed page. StackableBlockRecommendationSystem.js aborted!");
		return;
	}
	
	// Run only on if on Special:Block, excluding not post-blocking.
	if (!(config.wgCanonicalSpecialPageName === 'Block' && ($("#mw-content-text form").length))) {
		console.error("Not on the \"Special:Block\" form. StackableBlockRecommendationSystem.js aborted!");
		return;
	}
	
	//----------- | Retreive Relevant User Block Information | -----------//
	var api = new mw.Api();
	api.get({
	  action: "query",
	  list: "logevents",
	  letype: "block",
	  letitle: "User:" + config.wgRelevantUserName,
	  format: "json"
	}).done(function (data) {
	  var events = data.query.logevents;
	  var blockLogDict = {};
	  var stackableBlockDurations = ["24 hours", "1 day", "3 days", "1 week"];  // Block Durations for Stackable Blocks (Minor Policy Violations)
	  var outstandingBlockCount = 0;
	  events.forEach(function (event) {
		blockLogDict[event.logid] = {
		  timestamp: event.timestamp,  // block start timestamp
		  action: event.action,  // block / unblock / reblock
		  admin: event.user,  // block performer who performed the action
		  comment: event.comment || "",  // block reason
		  expiry: (event.params && event.params.expiry) ? event.params.expiry : null,  // block end timestamp
		  duration: (event.params && event.params.duration) ? event.params.duration : null  // block duration
		};
	  });
	  
	  
	  //----------- | Main Function | -----------//
	  function main(user, blockLogDict) {
		  //----------- | Calculate and Determine Number of Outstanding Blocks on all Existing User Blocks | -----------//
		  Object.values(blockLogDict).forEach(function (entry) {
			if (entry.action !== "reblock" && entry.expiry !== null && stackableBlockDurations.includes(entry.duration)) {
				// Calculate block end timestamp to current time
				var targetTime = new Date(entry.expiry);
				var now = new Date();
				var diff = Math.abs(Math.floor((targetTime - now) / 1000));

				const days = Math.floor(diff / 86400);
				const hours = Math.floor((diff - days * 86400) / 3600);
				const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
				const secs = diff - days * 86400 - hours * 3600 - minutes * 60;
				
				// Determine if block is within the outstanding block definition (30 days)
				if (days < 30) {
					outstandingBlockCount++;
				}
			}
			});
			
			// Determine block recommednation based on number of determined user outstading blocks
			var stackableBlockRecommendation = "";
			if (outstandingBlockCount == 0) {
				stackableBlockRecommendation = "1 day (Warning)";
			}
			else if (outstandingBlockCount == 1) {
				stackableBlockRecommendation = "1 day (2nd Warning)";
			}
			else if (outstandingBlockCount == 2) {
				stackableBlockRecommendation = "3 days";
			}
			else {
				stackableBlockRecommendation = "1 week";
			}
			
			//----------- | HTML Display of Recommendation for Stackable Block | -----------//
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
			
			// HTML content in the Box
			var textParagraph = document.createElement("p"); // create a text
			textParagraph.innerHTML = '<b><span style="font-size: 12pt">Stackable Block Recommendation:</span></b><blockquote>Block <i>' + config.wgRelevantUserName + '</i> for <b><u>' + stackableBlockRecommendation + '</u></b>.</blockquote><i><b><u>Note:</u></b> This recommendation only applies if ' + config.wgRelevantUserName + ' violated a minor policy. For major policy violations, follow the "<a href="https://growagarden.fandom.com/wiki/Grow_a_Garden_Wiki:Wiki_Policies#Standalone_Block_(Major_Policy_Violations)">Standalone Block (Major Policy Violations)</a>" section in the <a href=https://growagarden.fandom.com/wiki/Grow_a_Garden_Wiki:Wiki_Policies">Wiki Policies</a>. <b>Verify that the block duration selection is accurate before proceeding with block.</b> See the "<a href="https://growagarden.fandom.com/wiki/Grow_a_Garden_Wiki:Wiki_Policies#Punishment_System">Punishment System</a>" section in the <a href=https://growagarden.fandom.com/wiki/Grow_a_Garden_Wiki:Wiki_Policies">Wiki Policies</a>. for official guidelines or consult with an administrator through the Staff Discord Communications.</i>';
			Box.appendChild(textParagraph);
			
			// Prepend HTML display before the specified class.
			var interval = setInterval(function() {
				if ($('.mw-htmlform-select-or-other').length) {
					clearInterval(interval);
					$(".mw-htmlform-select-or-other").eq(0).before(Box); // prepending Box to ".ns-2 #content"
				}
			}, 1000);
	  }
	  main(config.wgRelevantUserName, blockLogDict);
	});
});