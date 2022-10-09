/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
        // group: { associated tag data }
        featured: { u:'Featured contributor' },
        htmluser: { u:'HTML coder' },
        photouser: { u:'Photo Guru' },
        inactive: { u:'Inactive User' },
        trusted: { u:'Valued Contributor' },
        mstaff: { u:'Mineplex Staff' },
        mbedstaff: {u:'Mineplex Bedrock Staff' },
        mretired: { u:'Retired Mineplex Staff' },
        top: { u:'Top Editor' },
        mgi: { u:'Mineplex Game Insights' },
        mdev: { u:'Mineplex Developer' },
	}
};

UserTagsJS.modules.custom = {
    
    '44jbdf': ['mretired'],
    'Ace771': ['mretired'],
    'Amidala skywalker': ['inactive'],
    'ArcticZeroo': ['mretired'],
    'AvrooVulcan': ['mretired'],
    'BREEZLET': ['mbedstaff'],
    'Baseballboyg': ['mretired'],
    'BeeInc': ['mretired'],
    'BlueAndGreen': ['top', 'trusted'],
    'Boomerzap': ['mretired'],
    'Chaseymichael': ['mretired'],
    'CloudGamer360': ['mretired'],
    'DanielW231': ['mretired'],
    'Emmaelise401': ['mretired'],
    'Enigmata2': ['mretired'],
    'Enunciated': ['mretired'],
    'EvenceMP': ['mretired'],
    'Evgeen1': ['mstaff'],
    'FabianTuck': ['mretired'],
    'FoggyIO': ['mretired'],
    'Glitcch': ['mretired'],
    'GwenTheGuardian': ['mbedstaff'],
    'GuardianAI': ['mretired'],
    'Henry.l.villelas': ['inactive'],
    'Hylore': ['mretired'],
    'Jillbo': ['mretired'],
    'JonocraftFTW': ['mretired'],
    'KorniDE': ['mretired'],
    'LeonMineplex': ['mretired'],
    'Lpnt': ['mretired'],
    'MCMiniumm': ['mretired'],
    'MSWS': ['mretired'],
    'MachoPiggies': ['mretired'],
    'MarzieK': ['mstaff'],
    'MidgetGolem': ['inactive'],
    'MiningCreeperI': ['mstaff'],
    'Millenium200': ['mretired'],
    'Nicodami': ['mgi'],
    'Poydoy': ['mretired'],
    'PrismaticGamer': ['mretired'],
    'RedXTech': ['mretired'],
    'ScharfMineplex': ['mretired'],
    'Scratblue': ['inactive'],
    'SheSoCookie': ['mretired'],
    'SophOG': ['mretired', 'trusted'],
    'Surved': ['mretired'],
    'TheBlueComet481': ['mstaff'],
    'Thefrogkid': ['mstaff'],
    'Timmi6790': ['mstaff'],
    'True619Blue': ['mretired'],
    'VanCity - Grayden': ['mretired'],
    'Vanessa1375': ['mretired'],
    'Wattywatty14': ['mretired'],
    'Williamtiger': ['mretired'],
    'XApolloJustice': ['mretired'],
    'XEmmaLiex':['mstaff'],
    'Xaanit': ['mretired'],
    'Xytl': ['inactive'],
    'ZTB12345': ['mretired'],
};

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});