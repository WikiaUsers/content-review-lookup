
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
        valen: { u:'LOVELY 😍', title:'Valenbrainz Contest Winner' },
        ticktock: { u:'TICK-TOCK 🕖', title:'24 Hour Contest Winner'},
        winterworld: { u:'FROSTY 🥶', title:'Winter World Contest Winner'},
        feastivus: { u:'FESTIVE 🎅', title:'Feastivus Contest Winner'},
        bonvoyage: { u:'ADVENTUROUS 🤠', title:'Bon Voyage Contest Winner'},
        foodfight: { u:'BOUNTIFUL 🍖', title:'Food Fight Contest Winner'},
        lawnofdoom: { u:'SPOOKY 👻', title:'Lawn of Doom Contest Winner'},
        plantcontest: { u:'BOTANICAL 🌺', title:'Plant Contest Winner'},
        zombiecontest: { u:'UNDEAD 🧠', title:'Zombie Contest Winner'},
        worldcontest: { u: 'WORLDWIDE 🌏', title:'World Contest Winner'},
        summernights: { u: 'DAZEY 🥂', title:'Summer Nights Contest Winner'},
        warpedcontest: { u: 'NUMINOUS ✨', title:'Warped Contest Winner'},
        starrycontest: { u: 'WHIMSICAL 🔮', title:'Starry Contest Winner'},
        zombiecontest2: { u: 'ON YOUR LAWN 🧟', title:'2020 Zombie Contest Winner'},
        foodfight2: { u: 'THANKFUL 🦃', title:'Food Fight 2020 Contest Winner'},
        //group: { staff }
        rollback: { u:'ROLLBACK 🍊' },
        'content-moderator': { u:'CONTENT MOD 🍇' },
        sysop: { u:'ADMIN 🧊' },
        bureaucrat: { u:'BUREAUCRAT 🥦' },
        threadmoderator: { u:'DISCUSSIONS MOD 💭' },
        chatmoderator: { u:'CHAT MOD 💌' },
        
        //group: { negative }
        blocked: { u:'BLOCKED ⛔', title:'Eaten by the Zombies 🥩'},
        inactive: { u:'INACTIVE 💬'},
        
        //group: { discord }
        discowner: { u:'DISCORD OWNER 💎'},
        discmod: { u:'DISCORD MOD 🔊'},
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