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
		bot: "<span style='color:white'>Bot</span>",
		bureaucrat: "<a href='http://mlpfanart.wikia.com/wiki/My_Little_Pony_Fan_Labor_Wiki:Administrators'><span style='color:white'>Bureaucrat</span></a>",
		imagecontrol: "<span style='color:white'>Image Control</span>",
		commentcontrol: "<span style='color:white'>Comment Control</span>",
		chatmoderator: "<a href='http://mlpfanart.wikia.com/wiki/My_Little_Pony_Fan_Labor_Wiki:Chat'><span style='color:white'>Chat Moderator</span></a>",
		checkuser: "<a href='http://mlpfanart.wikia.com/wiki/Help:User_access_levels#CheckUsers'><span style='color:white'>Check User</span></a>",
		'content-moderator': "<a href='http://mlpfanart.wikia.com/wiki/Help:User_rights#Content_Moderators'><span style='color:white'>Content Moderator</span></a>", //needs to be in quotes to work with dash in Object
		sysop: "<a href='http://mlpfanart.wikia.com/wiki/My_Little_Pony_Fan_Labor_Wiki:Administrators'><span style='color:white'>Admin</span></a>",
		rollback: "<span style='color:white'>Rollback</span>",
		vstf: "<a href='http://mlpfanart.wikia.com/wiki/Help:VSTF'><span style='color:white'>VSTF</span></a>",
		council: "<a href='http://mlpfanart.wikia.com/wiki/Help:Community_Council'><span style='color:white'>Councilor</span></a>",
		staff: "<a href='http://mlpfanart.wikia.com/wiki/Help:Staff'><span style='color:white'><span style='color: white'>Staff</span></a>",
		helper: "<a href='http://mlpfanart.wikia.com/wiki/Help:Volunteers_and_Helpers#Helpers'><span style='color:white'><span style='color: white'>Helper</span></a>",
		vanguard: "<a href='http://mlpfanart.wikia.com/wiki/Help:Vanguard'><span style='color:white'><span style='color: white'>Vanguard</span></a>",
		authenticated: "<a href='http://mlpfanart.wikia.com/wiki/Help:User_rights#Authenticated'><span style='color:white'><span style='color: white'>Authenticated</span></a>",
		voldev: "<a href='http://dev.wikia.com/wiki/Volunteer_Developers'><span style='color:white'><span style='color: white'>Volunteer Developer</span></a>",
		
		// Custom tags
		founder: "<a href='http://mlpfanart.wikia.com/wiki/My_Little_Pony_Fan_Labor_Wiki:Administrators'><span style='color:white'><span style='color: white'>Founder</span></a>"
	};
	
	// End list of tags

	// Begin list of accounts given custom tags
	//
	// Be sure that the last line listed for custom tags is followed by a semi-colon rather than a comma.

	rights["TheodoreRowy"] = [tags.founder];

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
						case "chatmoderator":
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