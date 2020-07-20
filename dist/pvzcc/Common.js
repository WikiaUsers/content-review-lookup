/*Javascript applied here will apply to all skins*/

addOnloadHook(function() {$('head').append('<style type="text/css">' + $('#css').html() + '</style>');});
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* UserTags Shenanigans */
window.UserTagsJS = {
	modules: {},
	tags: {
	    // group: { prizes }
		valen: { u:'lovey 😍', title:'Valenbrainz Contest Winner' },
		ticktock: { u:'tick-tock 🕖', title:'24 Hour Contest Winner'},
		winterworld: { u:'frosty 🥶', title:'Winter World Contest Winner'},
		feastivus: { u:'festive 🎅', title:'Feastivus Contest Winner'},
		bonvoyage: { u:'adventurous 🤠', title:'Bon Voyage Contest Winner'},
		foodfight: { u:'bountiful 🍖', title:'Food Fight Contest Winner'},
		lawnofdoom: { u:'spooky 👻', title:'Lawn of Doom Contest Winner'},
		plantcontest: { u:'botanical 🌺', title:'Plant Contest Winner'},
		zombiecontest: { u:'undead 🧠', title:'Zombie Contest Winner'},
		worldcontest: { u: 'worldwide 🌏', title:'World Contest Winner'},
		summernights: { u: 'dazey 🥂', title:'Summer Nights Contest Winner'},
		warpedcontest: { u: 'numinous ✨', title:'Warped Contest Winner'},
		starrycontest: { u: 'whimsical 🔮', title:'Starry Contest Winner'},
		
		//group: { staff }
		rollback: { u:'rollback 🍊' },
		'content-moderator': { u:'content mod. 🍇' },
		sysop: { u:'admin 🧊' },
		bureaucrat: { u:'bureaucrat 🥦' },
		threadmoderator: { u:'discussions mod. 💭' },
		chatmoderator: { u:'chatmod. 💌' },
		
		//group: { negative }
		blocked: { u:'blocked ⛔', title:'Eaten by the Zombies 🥩'},
		inactive: { u:'inactive 💬'},
		
		//group: { discord }
		discowner: { u:'discord owner 💎'},
		discmod: { u:'discord mod. 🔊'},
	}
};

UserTagsJS.modules.custom = {
	'BobertTheBoss': ['valen', 'foodfight', 'starrycontest'],
	'PunjiChocoBerry': ['feastivus', 'winterworld', 'warpedcontest'],
	'Asterplant': ['lawnofdoom', 'winterworld'],
	'TheFrozenAngel': ['bonvoyage'],
	'Reapeageddon': ['plantcontest'],
	'DigoBlaze12': ['zombiecontest'],
	'Shiverpeace': ['summernights'],
	'Baryonyx138': ['worldcontest'],
	'DrAhxelYT12': ['worldcontest'],
	'Cryptic72': ['ticktock'],
	'DsFanboy': ['discowner'],
	'HDMaster': ['discmod'],
	'TaigaFox': ['discmod'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'rollback', 'sysop', 'blocked', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
    rollback: ['content-moderator', 'sysop', 'bureaucrat'],
    'content-moderator': ['sysop', 'bureaucrat'],
    sysop: ['bureaucrat'],
};