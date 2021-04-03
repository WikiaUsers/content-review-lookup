
/*Javascript applied here will apply to all skins*/

window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
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
        zombiecontest2: { u: 'on your lawn 🧟', title:'2020 Zombie Contest Winner'},
        foodfight2: { u: 'thankful 🦃', title:'Food Fight 2020 Contest Winner'},
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
    'BobertTheBoss': ['valen', 'foodfight', 'starrycontest', 'discmod'],
    'PunjiChocoBerry': ['feastivus', 'winterworld', 'warpedcontest', 'discmod'],
    'AsterWasTaken': ['lawnofdoom', 'winterworld', 'discmod'],
    'TheFrozenAngel': ['bonvoyage'],
    'Reapeageddon': ['plantcontest'],
    'DigoBlaze12': ['zombiecontest'],
    'Shiverpeace': ['summernights'],
    'Baryonyx138': ['worldcontest'],
    'DrAhxelYT12': ['worldcontest'],
    'Cryptic72': ['ticktock'],
    "Nuttin' to see here": ['zombiecontest2'],
    'CCogStudios': ['foodfight2'],
    'DsFanboy': ['discowner'],
    'KyaOBeans': ['discmod'],
    'TaigasTunes': ['discmod']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'rollback', 'sysop', 'blocked', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
    rollback: ['content-moderator', 'sysop', 'bureaucrat'],
    'content-moderator': ['sysop', 'bureaucrat'],
    sysop: ['bureaucrat'],
};

/*WikiActivity config*/

window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};