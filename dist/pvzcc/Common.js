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

window.BackToTopModern = true;

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 1825;
window.lockOldComments.addNoteAbove = true;
/* This locks comments after they are five years old - helps combat necroposting */

/* UserTags Shenanigans */
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { prizes }
        valen: { u:'LOVELY 😍', title:'Valenbrainz Contest Winner' },
        winterworld: { u:'FROSTY 🥶', title:'Winter World Contest Winner'},
        feastivus: { u:'FESTIVE 🎅', title:'Feastivus 2019 Contest Winner'},
        bonvoyage: { u:'ADVENTUROUS 🤠', title:'Bon Voyage Contest Winner'},
        foodfight: { u:'BOUNTIFUL 🍖', title:'Food Fight 2019 Contest Winner'},
        lawnofdoom: { u:'SPOOKY 👻', title:'Lawn of Doom 2019 Contest Winner'},
        plantcontest: { u:'BOTANICAL 🥬', title:'2019 Plant Contest Winner'},
        zombiecontest: { u:'UNDEAD 🧠', title:'2019 Zombie Contest Winner'},
        worldcontest: { u: 'WORLDWIDE 🌏', title:'World Contest Winner'},
        summernights: { u: 'RELAXED 🥂', title:'Summer Nights Contest Winner'},
        warpedcontest: { u: 'ARCANE ✨', title:'Warped Contest Winner'},
        starrycontest: { u: 'CELESTIAL 🔮', title:'Starry Contest Winner'},
        zombiecontest2: { u: 'ON YOUR LAWN 🧟', title:'2020 Zombie Contest Winner'},
        wildfire: { u: 'INCENDIARY 🌸', title:'2020 Wildfire Contest Winner'},
        lawnofdoom2: { u: 'HAUNTED 🎃', title:'Lawn of Doom 2020 Contest Winner'},
        pluggedin: { u: 'TELEVISED 📺', title:'2020 Plugged In Contest Winner'},
        ox: { u: 'OX 🐂', title:'Year of the Ox Contest Winner'},
        foodfight2: { u: 'THANKFUL 🦃', title:'Food Fight Contest Winner'},
        tenthcontest: { u: 'LEGENDARY 🏆', title:'10th Anniversary Contest Winner'},
        animal: { u: 'WILD 🐈', title:'2021 Animal Contest Winner'},
        pvzh: { u: 'HEROIC 🦸', title:'2021 PvZH Contest Winner'},
        lawnofdoom3: { u: 'OSSIFIED 💀', title:'Lawn of Doom 2021 Contest Winner'},
        feastivus2: { u: 'JOLLY 🎄', title:'Feastivus 2021 Contest Winner'},
        luckozombie: { u: 'LUCKY 🍀', title:'Luck o’ the Zombie 2022 Contest Winner'},
        pv3: { u: '3D 🪅', title:'Pv3 Contest Winner'},
        summernights2: { u: 'SIZZLING 🌭', title:'Summer Nights 2022 Contest Winner'},
        shoktober: { u: 'ELECTRIC ⚡', title:'Shoktoberfest Contest Winner'},
        lawnofgloom: { u: 'DOWNTRODDEN 🌙', title:'Lawn of Gloom Contest Winner'},
        faroutfestival: { u: 'GALACTIC 🚀', title:'Far Out Festival Contest Winner'},
        greatfieryfeast: { u: 'FIERY 🔥', title:'Great Fiery Feast Contest Winner'},
        feastivus3: { u: 'GIFTED 🎁', title:'Feastivus 2022 Contest Winner'},
        blastfest: { u: 'EXPLOSIVE 💥', title:'Blast Fest Contest Winner'},
        chompersdream: { u: 'HUNGRY 🍰', title:'Chomper’s Dream Contest Winner'},
        //group: { staff }
        rollback: { u:'ROLLBACK 🍊' },
        'content-moderator': { u:'CONTENT MOD 🍇' },
        sysop: { u:'ADMIN 🧊' },
        bureaucrat: { u:'BUREAUCRAT 🥦' },
        threadmoderator: { u:'DISCUSSIONS MOD 💭' },
        chatmoderator: { u:'CHAT MOD 💌' },
        
        //group: { negative }
        blocked: { u:'BLOCKED ⛔'},
        inactive: { u:'SLEEPY 😴'},
        
        //group: { discord }
        discowner: { u:'DISCORD OWNER 💎'},
        discmod: { u:'DISCORD MOD 🔊'},
    }
};

UserTagsJS.modules.custom = {
'AbsoluteGei': ['discmod'],
    'AsterWasTaken': ['lawnofdoom', 'winterworld'],
    'Baryonyx138': ['worldcontest'],
    'BobertTheBoss': ['valen', 'foodfight', 'starrycontest', 'discmod'],
    'DigoBlaze12': ['zombiecontest'],
    'DrAhxelYT12': ['worldcontest'],
    'DsFanboy': ['discowner'],
    'Krayleb': ['foodfight2'],
    'KyaOBeans': ['discowner'],
    "Nuttin' to see here": ['zombiecontest2'],
    'PunjiChocoBerry': ['feastivus', 'winterworld', 'warpedcontest', 'discmod'],
    'Reapeageddon': ['plantcontest'],
    'Shiverpeace': ['summernights'],
    'TheFrozenAngel': ['bonvoyage'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'rollback', 'sysop', 'blocked', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 14;
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