/* retrieve json file */
$.getJSON("https://discordapp.com/api/servers/998244832541683742/widget.json", function(json) {
	var countmembers = json.members.length;	//online users number
	var howmanyvoice = 0;	//Voice channel users count;

	/* WIDGET STRUCTURE CREATION  */
	var widgContainer = document.createElement('div');
	$(widgContainer).attr('id', 'widgetcontainer');

	var discWidg = document.createElement('div');
	$(discWidg).attr('id', 'discord-widget').appendTo(widgContainer);

	var widgThemeDark = document.createElement('div');
	$(widgThemeDark).addClass('widget widget-theme-dark').appendTo(discWidg);

	var widgHead = document.createElement('div');
	$(widgHead).addClass('widget-header').appendTo(widgThemeDark);

	var disclogo = document.createElement('a');
	$(disclogo).addClass('widget-logo')
		.attr("href", "https://discordapp.com")
		.attr("target", "_blank")
		.appendTo(widgHead);

	var widgHeadCount = document.createElement('span');
	$(widgHeadCount).addClass('widget-header-count')
		.html("<strong>" + countmembers + "</strong> Online")
		.appendTo(widgHead);

	var widgBody = document.createElement('div');
	$(widgBody).addClass('widget-body')
		.appendTo(widgThemeDark);

	var chaContainer = document.createElement('div');
	$(chaContainer).attr('id', 'channel-container')
		.appendTo(widgBody);

	var widgCha = document.createElement('div');
	$(widgCha).addClass('widget-channel')
		.appendTo(chaContainer);

	var widgChaName = document.createElement('div');
	$(widgChaName).addClass('widget-channel-name')
		.html("Voice Chat<br>General: ")
		.appendTo(widgCha);

	var emptyChaName = document.createElement('div');
	$(emptyChaName).attr('id', 'empty-in-channel-name')
		.appendTo(widgCha);

	var membContainer = document.createElement('div');
	$(membContainer).attr('id', 'members-container')
		.appendTo(widgBody);

	var widgAdminOnline = document.createElement('div');
	$(widgAdminOnline)
		.addClass('widget-admins-online')
		.text("ADMINISTRATOR");

	var widgModOnline = document.createElement('div');
	$(widgModOnline).addClass('widget-mods-online')
		.text("MOD");

	var widgDEOnline = document.createElement('div');
	$(widgDEOnline).addClass('widget-de-online')
		.text("DE");

	var widgFandomOnline = document.createElement('div');
	$(widgFandomOnline).addClass('widget-fandom-online')
		.text("FANDOM");

	var widgBotOnline = document.createElement('div');
	$(widgBotOnline).addClass('widget-bot-online')
		.text("CEPHALON");

	var widgOnline = document.createElement('div');
	$(widgOnline).attr('id', 'userlist')
		.text("ONLINE");

	var widgFooter = document.createElement('div');
	$(widgFooter).addClass('widget-footer')
		.appendTo(widgThemeDark);

	var invitetext = document.createElement('span');
	$(invitetext).addClass('widget-footer-info')
		.appendTo(widgFooter);

	var invitelink = document.createElement('a');
	$(invitelink).addClass('widget-btn-connect')
		.attr("href", "https://discord.gg/yys7mZjJu6")
		.attr("target", "_blank")
		.text("Join Now!")
		.appendTo(widgFooter);

	/* WIDGET POPULATION*/
	var usernames = [
			["FINNSTAR7"],	// Admins
			[],				// Mods
			[],				// DE
			["azgoodaz"],	// Fandom
			["Asca", "Captcha.bot", "Tatsu", "Wiki-Bot"]	// Bot
		];
	var isVoice, widg, widgAvt, avtImg, voiceImg, status, name, game, normal;
	var numAdmin = 0, numMod = 0, numDE = 0, numFandom = 0, numBot = 0, numOnline = 0;

	for (var i = 0; i < countmembers; i++) {	// iterate through every online user
		isVoice = false;
		normal = true;

		if (json.members[i].hasOwnProperty('channel_id')) {
			if (json.members[i].channel_id == "998425036492910636") {	//check if channel_id of voice channel exist and increments voice users counter
				howmanyvoice++;
				isVoice = true;
			} else {
				isVoice = false;
			}
		}

		for (var j = 0; j < usernames.length; j++) {
			for (var k = 0; k < usernames[j].length; k++) {
				if (json.members[i].username == usernames[j][k]) {
					normal = false;
					
					widg = document.createElement('div');
					widgAvt = document.createElement('div');
					avtImg = document.createElement('img');
					voiceImg = document.createElement('img');
					status = document.createElement('span');
					name = document.createElement('span');
					game = document.createElement('span');

					$(widg).addClass('widget-member');
					$(widgAvt).addClass('widget-member-avatar');
					$(avtImg).attr("src", json.members[i].avatar_url).appendTo(widgAvt);

					if (isVoice) {	//if in Voice Channel
						$(widg).attr('id', 'voiceMember');
						$(widgAvt).attr('id', 'voiceAvatar');
						$(avtImg).attr('id', 'avatarImg');
						$(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/warframe/images/2/26/Voice1.svg")
								   .prependTo(widgAvt);
					}

					if (json.members[i].status === 'online')
						$(status).addClass('widget-member-status widget-member-status-online');
					else if (json.members[i].status === 'idle')
						$(status).addClass('widget-member-status widget-member-status-idle');
					else
						$(status).addClass('widget-member-status widget-member-status-dnd');

					$(status).appendTo(widgAvt);
					$(widgAvt).appendTo(widg);

					$(name).addClass('widget-member-name');
					if (json.members[i].hasOwnProperty('nick'))
						$(name).text(json.members[i].nick);
					else
						$(name).text(json.members[i].username);

					$(name).appendTo(widg);

					if (json.members[i].hasOwnProperty('game'))
						$(game).addClass('widget-member-game').text(json.members[i].game.name).appendTo(widg);

					if (j == 0) {
						$(widg).appendTo(widgAdminOnline);
						numAdmin++;
					}
					else if (j == 1) {
						$(widg).appendTo(widgModOnline);
						numMod++;
					}
					else if (j == 2) {
						$(widg).appendTo(widgDEOnline);
						numDE++;
					}
					else if (j == 3) {
						$(widg).appendTo(widgFandomOnline);
						numFandom++;
					}
					else {
						$(widg).appendTo(widgBotOnline);
						numBot++;
					}
				}
			}
		}

		// then create html for remaining users
		if (normal) {
			numOnline++;
			
			widg = document.createElement('div');
			widgAvt = document.createElement('div');
			avtImg = document.createElement('img');
			voiceImg = document.createElement('img');
			status = document.createElement('span');
			name = document.createElement('span');
			game = document.createElement('span');

			$(widg).addClass('widget-member');
			$(widgAvt).addClass('widget-member-avatar');
			$(avtImg).attr("src", json.members[i].avatar_url).appendTo(widgAvt);

			if (isVoice) {	//if in Voice Channel
				$(widg).attr('id', 'voiceMember');
				$(widgAvt).attr('id', 'voiceAvatar');
				$(avtImg).attr('id', 'avatarImg');
				$(voiceImg).attr("src", "https://vignette.wikia.nocookie.net/warframe/images/2/26/Voice1.svg")
					.prependTo(widgAvt);
			}

			if (json.members[i].status === 'online')
				$(status).addClass('widget-member-status widget-member-status-online');
			else if (json.members[i].status === 'idle')
				$(status).addClass('widget-member-status widget-member-status-idle');
			else
				$(status).addClass('widget-member-status widget-member-status-dnd');

			$(status).appendTo(widgAvt);
			$(widgAvt).appendTo(widg);

			$(name).addClass('widget-member-name');
			if (json.members[i].hasOwnProperty('nick'))
				$(name).text(json.members[i].nick);
			else
				$(name).text(json.members[i].username);

			$(name).appendTo(widg);
 
			if (json.members[i].hasOwnProperty('game'))
				$(game).addClass('widget-member-game').text(json.members[i].game.name).appendTo(widg);

			$(widg).appendTo(widgOnline);
		}
	}
	
	if (numAdmin > 0)
		$(widgAdminOnline).appendTo(membContainer);

	if (numMod > 0)
		$(widgModOnline).appendTo(membContainer);

	if (numDE > 0)
		$(widgDEOnline).appendTo(membContainer);

	if (numFandom > 0)
		$(widgFandomOnline).appendTo(membContainer);

	if (numBot > 0)
		$(widgBotOnline).appendTo(membContainer);

	if (numOnline > 0)
		$(widgOnline).appendTo(membContainer);

	if (howmanyvoice != 0) {
		var voicehtml = $(widgChaName).html() + howmanyvoice;	//set total voice channel users.
		$(widgChaName).html(voicehtml).show();
	}

	$(widgContainer).prependTo('#WikiaRail');
});