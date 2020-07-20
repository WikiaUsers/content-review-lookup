importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
importArticles({
    type: "script",
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
    ]
});
window.MessageWallUserTags = {
    tagColor: '#FFFFFF',
    glow: true,
    glowSize: '15px',
    glowColor: '#00FFD5',
    users: {
        '---': 'Bureaucrat',
    }
};
window.UserTagsJS = {
	modules: {},
	tags: {
    chatmoderator: {u:'Omega'},
        threadmoderator: {u:'Omega'},
        sysop: {u:'Beta'},
        founder: {u:'Alpha Zenpai'},
        tyler: {u:'Scissorman'},
        tyler2: {u:'Video Game Collector'},
        tyler3: {u:'Conker Impressionist'},
        jane: {u:'Retro Gamer Girl'},
        jane2: {u:'Vampire'},
        jane3: {u:'Customization Coder'}, 
        esdeath: {u:'Strongest of the Empire'},
        akame: {u: 'Administrator of Time and Space'},
        akame2: {u:'The Enforcer'},
        alice: {u:'Goddess of Darkness'},
        alice2: {u: 'Theorist of the Cosmos'},
        alice3: {u: 'The Impossible Girl'},
        alice4: {u: 'Tanzanite'},
        aquua: {u: 'Your Vacuum Cleaner'},
	}
};
 
UserTagsJS.modules.custom = {
        'HugeClockTowerFan':['tyler','tyler2','tyler3'],
        'Jane The Psychotic Killer':['jane','jane2','jane3'],
        'ZenerRocksMC':['founder'],
        'General Esdeath':['esdeath'],
        'Akame Kiyomizu':['akame','akame2'],
        'AliceTheNeko':['alice','alice2','alice3','alice4'],
        'TheAquuaHybrid':['aquua'],
};
window.MessageWallUserTags = {
    tagColor: 'GhostWhite',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'DarkViolet', //Glow color
    users: {
        'HugeClockTowerFan': 'Scissorman',
        'Akame Kiyomizu': 'Enforcer',
        'Jane The Psychotic Killer': 'Vampire',
        'ZenerRocksMC': 'Zenpai',
        'TheAquuaHybrid': 'Your Vacuum Cleaner',
        'AliceTheNeko': 'The Impossible Girl',
        
    }
};

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});