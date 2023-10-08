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
        old: { u:'FOUNDER 🔨', title:'Founder' },
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
        wildfire: { u: 'INCENDIARY 🧯', title:'2020 Wildfire Contest Winner'},
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
        shoktoberfest: { u: 'ELECTRIC ⚡', title:'Shoktoberfest Contest Winner'},
        log: { u: 'LAWN OF GLOOM 🌙', title:'Lawn of Gloom Contest Winner'},
        faroutfestival: { u: 'FAR OUT FESTIVAL 🚀', title:'Far Out Festival Contest Winner'},
        greatfieryfeast: { u: 'GREAT FIERY FEAST 🔥', title:'Great Fiery Feast Contest Winner'},
        feastivus3: { u: 'GIFTED 🎁', title:'Feastivus 2022 Contest Winner'},
        blastfest: { u: 'BLAST FEST 💥', title:'Blast Fest Contest Winner'},
        chompersdream: { u: 'CHOMPER’S DREAM 🍰', title:'Chomper’s Dream Contest Winner'},
        matd: { u: 'MAGIC! AT THE DISCO 🪩', title:'Magic! At The Disco Contest Winner'},
        forgottenpast: { u: 'FORGOTTEN PAST ⚱️', title:'Forgotten Past Duo Contest Winner'},
        grandmaster: { u: 'GRANDMASTER 🏅', title:'Grandmaster Contest Winner'},
        resort: { u: 'SNAPDRAGON’S RESORT 🩴', title:'Snapdragon’s Resort Contest Winner'},
        deepseason: { u: 'DEEP SEA-SON 🐬', title:'Deep Sea-son Contest Winner'},
        shroomdynasty: { u: 'THE SHROOM DYNASTY 🍒', title:'The Shroom Dynasty Contest Winner'},
        electrofire: { u: 'ELECTROFIRE FEST 🎪', title:'Electrofire Fest Contest Winner'},
        spookytown: { u: 'ROCK & GHOUL 🎸', title:'Rock & Ghoul Contest Winner'},
        november23: { u: '???', title:'??? Contest Winner'},
        december23: { u: '???', title:'??? Contest Winner'},
        january24: { u: '???', title:'??? Contest Winner'},
        february24: { u: '???', title:'??? Contest Winner'},
        march24: { u: '???', title:'??? Contest Winner'},
        //group: { staff }
        rollback: { u:'ROLLBACK 🍊' },
        'content-moderator': { u:' MODERATOR 🍇' },
        sysop: { u:'ADMINISTRATOR 🧊' },
        bureaucrat: { u:'BUREAUCRAT 🥦' },
        representative: { u:'REPRESENTATIVE 🌸' },
        
        //group: { negative }
        blocked: { u:'BLOCKED ⛔'},
        inactive: { u:'SLEEPY 😴'},
        
        //group: { discord }
        discowner: { u:'DISCORD OWNER 💎'},
        discmod: { u:'DISCORD MOD 🔊'},
    }
};

UserTagsJS.modules.custom = {
    'Saunt3D': ['representative'],
    'J192': ['old'],
    'Zomplant Jelo': ['old'],
    'AbsoluteGei': ['tenthcontest','pvzh', 'luckozombie'],
    'AsterWasTaken': ['lawnofdoom', 'winterworld'],
    'Baryonyx138': ['worldcontest'],
    'BobertTheBoss': ['valen', 'foodfight', 'starrycontest', 'discmod', 'lawnofdoom2'],
    'Dartichoke Enjoyer': ['discmod','electrofire'],
    'DigoBlaze12': ['zombiecontest'],
    'DrAhxelYT12': ['worldcontest'],
    'DsFanboy': ['discowner'],
    'DMdarkmatter': ['grandmaster','deepseason'],
    'Krayleb': ['foodfight2'],
    'KyaOBeans': ['discowner','ox'],
    "Nuttin' to see here": ['zombiecontest2','faroutfestival','blastfest','matd'],
    'PunjiChocoBerry': ['feastivus', 'winterworld', 'warpedcontest', 'discmod'],
    'Reapeageddon': ['plantcontest'],
    'Shiverpeace': ['summernights'],
    'TheFrozenAngel': ['bonvoyage'],
    'DavetheFave11': ['wildfire'],
    'AwesomeDude4713': ['pluggedin'],
    'Chickenwastaken': ['animal'],
    'Flag zombie': ['lawnofdoom3','feastivus3'],
    'Fun Animator': ['feastivus2','shoktoberfest'],
    'Rugby Zombie': ['lawnofdoom3'],
    'NotComet': ['pv3'],
    'Wynaut821': ['summernights2'],
    'CongruentSausage803': ['greatfieryfeast'],
    'Creepes': ['log','forgottenpast','resort'],
    'Rocky105': ['chompersdream','shroomdynasty'],
    'Partyfanboy8': ['forgottenpast'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'rollback', 'sysop', 'blocked', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
    rollback: ['content-moderator', 'sysop', 'bureaucrat'],
    'content-moderator': ['sysop', 'bureaucrat'],
    sysop: ['bureaucrat'],
};

var number_of_wiki_names = 14;
var wiki_name_number = 0;

while (wiki_name_number < 1 || wiki_name_number > number_of_wiki_names) {
  wiki_name_number = Math.random().toFixed(2) * 100;
};
var wiki_name_text=["Songs for your soul!", "Turn it up to eleven!", "Boo! A guitar!", "The raveyard!", "Monster mosh pit!", "Spooky solo!", "Skeleton strumming!", "Lyrics to rest in peace to!", "Creepy choir!", "Dangerous duet!", "Cause this is thriller! Thriller night!", "Frankendancing!", "I am afraid of pianos!", "Scary."][wiki_name_number];
var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_text;

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