// 06:49, November 1, 2011 (UTC)

// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
// Made entirely dynamic by Ozank Cx

// Note: you should only have to add users to this if they have at least one custom tag

mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
    if ([2,3,500].indexOf(mw.config.get("wgNamespaceNumber")) === -1 && mw.config.get("wgCanonicalSpecialPageName") !== "Contributions") return; //return if current page is not user/user talk/user blog/contributions

	var rights = {},
	username = mw.config.get("wgTitle").replace("Contributions/",""),
	
	// Begin list of tags
	//
	// Be sure that each name of the usergroup tags match those found in the API or it will not work, and that the last line listed has no comma.
	tags = {
	
		// Usergroup tags
		bot: "<a href='/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Bots'><span style='color:white'>Bot</span></a>",
		bureaucrat: "<a href='/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Administrators'><span style='color:white'>Bureaucrat</span></a>",
		imagecontrol: "<a href='/wiki/Forum:Image_control_group_nomination_thread'><span style='color:white'>Image Control</span></a>",   
		commentcontrol: "<a href='/wiki/Forum:Comment_control_group_nomination_thread'><span style='color:white'>Comment Control</span></a>",
		checkuser: "<a href='/wiki/Help:User_access_levels#CheckUsers'><span style='color:white'>Check User</span></a>",
		contentmoderator: "<a href='/wiki/Forum:Content_moderator_group_nomination_thread'><span style='color:white'>Content Moderator</span></a>", //needs to be in quotes to work with dash in Object
		sysop: "<a href='/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Administrators'><span style='color:white'>Admin</span></a>",
		rollback: "<a href='/wiki/Forum:Rollback_group_nomination_thread'><span style='color:white'>Rollback</span></a>",
		vstf: "<a href='/wiki/Help:VSTF'><span style='color:white'>VSTF</span></a>",
		council: "<a href='/wiki/Help:Community_Council'><span style='color:white'>Councilor</span></a>",
		staff: "<a href='/wiki/Help:Staff'><span style='color:white'><span style='color: white'>Staff</span></a>",
		helper: "<a href='/wiki/Help:Volunteers_and_Helpers#Helpers'><span style='color:white'><span style='color: white'>Helper</span></a>",
		vanguard: "<a href='/wiki/Help:Vanguard'><span style='color:white'><span style='color: white'>Vanguard</span></a>",
		globalMod: "<a href='/wiki/Help:Global_Discussions_moderators'><span style='color:white'><span style='color: white'>Global Discussions Moderator</span></a>",
		authenticated: "<a href='/wiki/Help:User_rights#Authenticated'><span style='color:white'><span style='color: white'>Authenticated</span></a>",
		voldev: "<a href='https://dev.wikia.com/wiki/Volunteer_Developers'><span style='color:white'><span style='color: white'>Volunteer Developer</span></a>",
		
		// Custom tags
		founder: "<a href='/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Administrators'><span style='color:white'><span style='color: white'>Founder</span></a>",
		twitteroverseer: "<a href='/wiki/Help:Wiki_Twitter'><span style='color:white'><span style='color: white'>Twitter Overseer</span></a>",
		discordadmin: "<a href='/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat'><span style='color: white'>Discord Admin</span></a>",
		discordmoderator: "<a href='/wiki/My_Little_Pony_Friendship_is_Magic_Wiki:Chat'><span style=' color:white'><span style='color: white'>Discord Moderator</span></a>"
		
		
	};
	
	// End list of tags

	// Begin list of accounts given custom tags
	//
	// Be sure that the last line listed for custom tags is followed by a semi-colon rather than a comma.
	
	// Founder
	rights["TheodoreRowy"] = [tags.founder],

	// Twitter Overseers
	rights["Callofduty4"] = [tags.vstf, tags.council, tags.discordmoderator, tags.twitteroverseer],
	rights["Dogman15"] = [tags.sysop, tags.twitteroverseer],
	rights["ImperfectXIII"] = [tags.bureaucrat, tags.sysop, tags.twitteroverseer],
	rights["Jonny Manz"] = [tags.bureaucrat, tags.sysop, tags.twitteroverseer],
	rights["Mega Sean 45"] = [tags.sysop, tags.twitteroverseer],
	rights["TheGuineaPig45"] = [tags.commentcontrol, tags.rollback, tags.twitteroverseer];

    // Image Controllers
	rights["343TheGuiltyProphet"] = [tags.globalMod, tags.council, tags.imagecontrol, tags.rollback];
	
	// Content Moderators
	
	// Discord Moderators/Operators
	rights["Daxxie X Z"] = [tags.discordmoderator],
	rights["DJVinylScratchy"] = [tags.discordmoderator],
	rights["Lelouch vi Britannia of the Rebellion"] = [tags.discordmoderator],
	rights["Lil' Shaddie The Gallade"] = [tags.discordmoderator],
	rights["Mystery O"] = [tags.discordmoderator],
	rights["NoktiKlepto"] = [tags.discordmoderator],
	rights["Thundermare"] = [tags.discordadmin],
	rights["UnknownProdigy"] = [tags.discordmoderator],
	rights["William Holden"] = [tags.discordadmin];
	
	//
	// End list of accounts given custom tags
	
	// Remove existing tags (if any) if user isn't blocked/banned
	if (["Banned From Chat","Blocked"].indexOf($('.tag').text()) !== -1)
		return;
	else if ($('.tag').length) 
		$('.tag').remove();
	
	if (typeof rights[username] != "undefined") { // Add custom tags
		for (var i = 0, len = rights[username].length; i < len; i++) {
			$('<span style="margin-left: 10px;" class="tag">' + rights[username][i] +
				'</span>').appendTo('.masthead-info hgroup');
		}
	}
	else { // Add usergroup tags
		var API = new mw.Api();
		API.get({
		action: 'query',
		list: 'users',
		ususers: username,
		usprop: 'groups',
		cb: new Date().getTime()
		})
		.done(function(d) {
			if (!d.error) {
				for (var i in d.query.users) {
					for (var j in d.query.users[i].groups) {
						var group = d.query.users[i].groups[j];
						
						switch (group) {
						
						case "bot":
						case "bureaucrat":
						case "content-moderator":
						case "sysop":
						case "vstf":
						case "checkuser":
						case "commentcontrol":
						case "imagecontrol":
						case "rollback":
						case "council":
						case "voldev":
						case "authenticated":
						case "vanguard":
						case "globalMod":
						case "staff":
						case "helper":
									$('<span style="margin-left: 10px;" class="tag">' + tags[group] +
										'</span>').appendTo('.masthead-info hgroup');
						break;
						
						}
					}
				}
			}
			else
				console.log("Failed to check for user rights: " + d.error.code);				
		})
		.fail(function() {
			console.log("Failed to check for user rights!");
		});
	}
});