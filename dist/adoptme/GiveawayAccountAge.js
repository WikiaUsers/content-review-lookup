/*************
Title        :   GiveawayAccountAge
Description  :   EXCLUSIVELY FOR 'adoptme' WIKI ONLY - Displays user's account age and whether they are eligible to host a giveaway on their user page.
Author       :   Vastmine1029
Version      :   1.1
*************/

mw.loader.using('mediawiki.api', function() {
	if (window.GiveawayAccountAge === true) {
		return;
	}
	window.GiveawayAccountAge = true;
	
	function main() {
		var user = mw.config.get('wgRelevantUserName');
		var user_logged_in = mw.config.get('wgUserName');
		
		var api = new mw.Api(), data_registration_api, data_block_api;
		
		var Box = document.createElement("div"); // Box
		Box.style.margin = "1em 0 1em 0";
		Box.style.border = "1px solid";
		Box.style.padding = "0.25em 0.5em 0.25em 0.5em";
		Box.style.display = "inline-block";
		
		var textParagraph = document.createElement("p");
		
		api.get({
			action: 'query',
			list: 'users',
			usprop: 'registration',
			ususers: user
		}).then(function(d){
			data = d.query.users;
			user_id = data[0]['userid'];
			registration_iso8601 = data[0]['registration'];
			console.log(registration_iso8601);
			registration_epoch = Date.parse(registration_iso8601);
			console.log(registration_epoch);
			date_now = Date.now();
			account_age_ms = date_now-registration_epoch;
			account_age_days = account_age_ms/(1000*60*60*24);
			
			if (user_id === undefined) {
				console.error("User is anonymous.");
				return;
			}
			
			api.get({
				action: 'query',
				list: 'blocks',
				bkusers: user,
			}).then(function(d) {
				data = d.query.blocks;
				
				if (data.length) {
					textParagraph.innerHTML = "<b><u>Account Age:</u></b> " + Math.floor(account_age_days) + " days" + "<br/><span style=\"color: #FF3D3D;\"><i>" + user + "</i> is <b>currently blocked</b> and <b><u>cannot</u> host giveaways</b>.</span>";
					return;
				}
			});
			
			if(account_age_days < 30) {
				if (user === user_logged_in) {
					textParagraph.innerHTML = "<b><u>Account Age:</u></b> " + Math.floor(account_age_days) + " days" + "<br/><span style=\"color: #FF3D3D;\">You <b><u>cannot</u> host giveaways</b>.</span> <a href=\"/wiki/Adopt_Me!_Wiki:Rules_and_Guidelines#Giveaway_Policies\">See Giveaway Policies</a>.";
				}
				else {
					textParagraph.innerHTML = "<b><u>Account Age:</u></b> " + Math.floor(account_age_days) + " days" + "<br/><span style=\"color: #FF3D3D;\"><i>" + user + "</i> <b><u>cannot</u> host giveaways</b>.</span> <a href=\"/wiki/Adopt_Me!_Wiki:Rules_and_Guidelines#Giveaway_Policies\">See Giveaway Policies</a>.";
				}
			}
			else {
				if (user === user_logged_in) {
					textParagraph.innerHTML = "<b><u>Account Age:</u></b> " + Math.floor(account_age_days) + " days<br/><span style=\"color: mediumseagreen;\">You <b><u>can</u> host giveaways</b>.</span> <a href=\"/wiki/Adopt_Me!_Wiki:Rules_and_Guidelines#Giveaway_Policies\">See Giveaway Policies</a> before hosting.";
				}
				else {
					textParagraph.innerHTML = "<b><u>Account Age:</u></b> " + Math.floor(account_age_days) + " days<br/><span style=\"color: mediumseagreen;\"><i>" + user + "</i> <b><u>can</u> host giveaways</b>.</span>";
				}
			}
			
			Box.appendChild(textParagraph);
			
			var interval = setInterval(function() {
				if ($('.user-identity-stats').length) {
					clearInterval(interval);
					$(".user-identity-stats").eq(0).after(Box); // prepending Box to ".ns-2 #content"
				}
			}, 1000);
		});
	}
	main();
});