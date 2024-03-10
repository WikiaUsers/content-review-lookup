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
        hansybo: { u:'HANSYBO 🪿', title:'Hansybo' },
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
        rockandghoul: { u: 'ROCK & GHOUL 🎸', title:'Rock & Ghoul Contest Winner'},
        starfruitstation: { u: 'STARFRUIT’S STATION 🤩', title:'Starfruit’s Station Contest Winner'},
        invaders: { u: 'THE INVASION🪖', title:'The Invasion Contest Winner'},
        glamfest: { u: 'GLAM FEST✨', title:'Glam Fest Contest Winner'},
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
    'Dartichoke Enjoyer': ['electrofire','rockandghoul'],
    'DigoBlaze12': ['zombiecontest'],
    'DolphiGaming': ['discmod'],
    'DrAhxelYT12': ['worldcontest'],
    'DsFanboy': ['discowner'],
    'DMdarkmatter': ['grandmaster','deepseason','glamfest'],
    'Krayleb': ['discmod','foodfight2'],
    'KyaOBeans': ['ox'],
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
    'Creepes': ['hansybo','log','forgottenpast','resort'],
    'Rocky105': ['chompersdream','shroomdynasty'],
    'Partyfanboy8': ['forgottenpast'],
    'Somebody407MUGEN': ['starfruitstation'],
    'WiLdCaRd2048': ['discmod']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'rollback', 'sysop', 'blocked', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 21;
UserTagsJS.modules.metafilter = {
    rollback: ['content-moderator', 'sysop', 'bureaucrat'],
    'content-moderator': ['sysop', 'bureaucrat'],
    sysop: ['bureaucrat'],
};

var wiki_name_texts=["Create your own characters!", "Find your own path!", "Make what you want to make!", "Where will you wander?", "Find solace in absurdity!", "Smells like Durians...", "Fan-made ideas since 2011!", "Hop on PvZCC!", "Don't forget to join the Discord Server!", "What?!", "Come on down to PvZCC!", "I am a splash text. Notice me!", "Insert splash text here", "We have a Discord Server!", "BREAK IT LIKE YOU MEAN IT, HARVEY!", "Defend your shins!", "Because I'm CRAAAZY!!!!!", "You have to hit him in the pancreas!", "I burped in my helmet!", "The perfect crime!", "This is not the splash text you're looking for!", "Look ma, I'm on a splash text!", "11 herbs and spices!", "The zombies are coming!", "The plants are growing!", "Historically inaccurate!", "Lo-fi beets to study to!", "Contains nuts!", "Hours of fun! Days, even!", "Outhouse compatible!", "Closed Captions: ON!", "A brand-new splash text, just for you!", "Contains infinite splash texts!", "Noooooooooo!", "Send us a postcard!", "What did you just say?", "Time to bring out the eggs!", "You are valid!", "You are welcome here!", "I'm glad you're here!", "Vengeful and savage!", "Dressed up in fancy clothes!", "We've been waiting for you!", "Morally ambiguous!", "PvZCC Presents: Quality Content", "ಠ_ಠ", "Abnormal and wacky!", "Album coming soon!", "You've goat mail!", "Plenty more where that came from!", "Can you dig it?", "Can't stop, won't stop!", "Same day shipping!", "Don't feed Chomper after midnight!", "Scroll down and start reading!", "Wow, that's crazy!", "Don't forget to breathe!", "As seen on TV!", "Made with lots and lots of love!", "Everybody get up!", "Hotter than the sun!", "Rooted into the ground!", "Raising the moat!", "Bigger! Better! Bagels!", "Try it out!", "Touch grass!", "Be constructive!", "That is a fact!", "Run it under cold water!", "Under the light of a thousand stars!", "Food fight!", "Are you not entertained?", "Take a dip in our pool!", "Bountiful!", "For the gardeners in all of us!", "The exclamation mark ran away", "It’s a wild world out there!", "Say cheese!", "The grass is greener!", "It's giving botany!", "Get shuffled into my deck!", "Welcome to Zomburbia!", "Any time is zombie time!", "Brainz! I feel like dancing!", "The zombies are going!", "It's about time!", "Making tea in the treehouse!", "Pickles on a sandwich!", "Every copy is personalized!", "Overwhelmingly underwhelming!", "Underwhelmingly overwhelming!", "You got this!", "I can see my house from here!", "Invisible graveyards!", "Drop the bomb!", "Excellent wiki content!", "Repeater with an eyepatch!"];

var chosen_index = Math.floor(Math.random() * wiki_name_texts.length);

var elements=document.getElementsByClassName('fandom-community-header__community-name');
var wiki_name=elements[0];
wiki_name.textContent=wiki_name_texts[chosen_index];

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