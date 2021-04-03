/* Any JavaScript here will be loaded for all users on every page load. */
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
		bot: "<a href='/wiki/My_Little_Pony_Wikia:Bot'><span style='color:white'>Bot</span></a>",
		bureaucrat: "<a href='/wiki/My_Little_Pony_Wikia:Pengurus'><span style='color:white'>Birokrat</span></a>",
		imagecontrol: "<a href='/wiki/Forum:Utas_nominasi_grup_kontrol_gambar'><span style='color:white'>Kontrol Gambar</span></a>",   
		commentcontrol: "<a href='/wiki/Forum:Utas_nominasi_grup_kontrol_komentar'><span style='color:white'>Kontrol Komentar</span></a>",
		checkuser: "<a href='/wiki/Help:User_access_levels#CheckUsers'><span style='color:white'>Pemeriksa</span></a>",
		contentmoderator: "<a href='/wiki/Forum:Utas_nominasi_grup_moderator_konten'><span style='color:white'>Moderator Konten</span></a>", //needs to be in quotes to work with dash in Object
		sysop: "<a href='/wiki/My_Little_Pony_Wikia:Pengurus'><span style='color:white'>Admin</span></a>",
		rollback: "<a href='/wiki/Forum:Utas_nominasi_grup_pengembali_revisi'><span style='color:white'>Pengembali Revisi</span></a>",
		vstf: "<a href='/wiki/Help:VSTF'><span style='color:white'>VSTF</span></a>",
		council: "<a href='/wiki/Help:Community_Council'><span style='color:white'>Penasihat</span></a>",
		staff: "<a href='/wiki/Help:Staff'><span style='color:white'><span style='color: white'>Staf</span></a>",
		helper: "<a href='/wiki/Help:Volunteers_and_Helpers#Helpers'><span style='color:white'><span style='color: white'>Pembantu</span></a>",
		vanguard: "<a href='/wiki/Help:Vanguard'><span style='color:white'><span style='color: white'>Staf</span></a>",
		globalMod: "<a href='/wiki/Help:Global_Discussions_moderators'><span style='color:white'><span style='color: white'>Moderator Diskusi Global</span></a>",
		authenticated: "<a href='/wiki/Help:User_rights#Authenticated'><span style='color:white'><span style='color: white'>Diautentikasi</span></a>",
		voldev: "<a href='https://dev.wikia.com/wiki/Volunteer_Developers'><span style='color:white'><span style='color: white'>Pengembang Sukarelawan</span></a>",
		
		// Custom tags
		founder: "<a href='/wiki/My_Little_Pony_Wikia:Pengurus'><span style='color:white'><span style='color: white'>Pengurus</span></a>",
		twitteroverseer: "<a href='/wiki/Bantuan:Twitter_Wiki'><span style='color:white'><span style='color: white'>Pengawas Twitter</span></a>",
		discordadmin: "<a href='/wiki/My_Little_Pony_Wikia:Obrolan'><span style='color: white'>Admin Discord</span></a>",
		discordmoderator: "<a href='/wiki/My_Little_Pony_Wikia:Obrolan'><span style=' color:white'><span style='color: white'>Moderator Discord</span></a>"
		
		
	};
	
	// End list of tags

	// Begin list of accounts given custom tags
	//
	// Be sure that the last line listed for custom tags is followed by a semi-colon rather than a comma.
	
	// Founder
	rights["MrLazarV"] = [tags.founder],

	// Admin
	rights["TrueGuy"] = [tags.bureaucrat, tags.sysop],
	rights["Ivan the Brony Kaiju"] = [tags.bureaucrat, tags.sysop],
	
	//
	// End list of accounts given custom tags
	
	// Remove existing tags (if any) if user isn't blocked/banned
	if (["Dilarang Mengobrol","Diblokir"].indexOf($('.tag').text()) !== -1)
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
				console.log("Gagal memeriksa hak pengguna: " + d.error.code);				
		})
		.fail(function() {
			console.log("Gagal memeriksa hak pengguna!");
		});
	}
});