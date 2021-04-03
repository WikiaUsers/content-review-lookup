/*******************/
/****CUSTOM TAGS****/ 
/*******************/

window.UserTagsJS = {
	modules: {},
	tags: {
		cow: { u:'Cow', order:-1/0},
		phantom: { u:'Phantom', order:-1/0},
		morkie: { u:'Morkie', order:-1/0},
		robloxredarrows: { u:'Roblox Red Arrows', order:-1/0},
		gamedev: { u:'Game Developer', order:-1/0},
		southwest: { u:'Southwest', order:-1/0},
		politic: { u:'Politic', order:-1/0},
		
		
		/*
		bureaucrat: { u:'Squadron Leader', link:'PTFS Wiki Staff', order:-1 },
		sysop: { u:'Ace', link:'PTFS Wiki Staff', order:1 },
		content-moderator: { u: 'Pilot', link:'PTFS Wiki Staff', order:-1 },
 
 */
	},
	oasisPlaceBefore: ''
};

 UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'cow', 'phantom', 'robloxredarrows', 'morkie', 'gamedev', 'southwest', 'politic', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', "content-moderator", /*'autoconfirmed', 'notautoconfirmed', 'inactive','blocked',
    'founder',*/];
    
UserTagsJS.modules.custom = {
	'TheOriginalCows': ['cow'], 
	'XPhxntomX': ['phantom'],
	'MorkieEdits': ['morkie'],
	'Southwest124': ['Southwest']
	'Jbwpolitic': ['Politic']
};  
    
UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
	'sysop': ['bureaucrat', 'founder', 'gamedev'],
	"content-moderator": ['sysop', 'bureaucrat', 'founder', 'gamedev'],
	'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder', 'gamedev'],
	'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder', 'gamedev'],
	'rollback': ['chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder', 'gamedev'],
	'autoconfirmed': ['townieofthemonth', 'rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder', 'gamedev'],
};

/*******************/
/****BLOCK LOG****/ 
/*******************/
TBL_GROUP = "roblox-en";

/*me fix dis
function fetchNumPlayersInGame(placeUrl) {

return new Promise((resolve, reject) => {
    request(placeUrl, (err, response, body) => {
        if (err) reject(err)
        else {
            let $ = cheerio.load(body)
            resolve($('.game-stat .text-lead').first().text())
        }
    })
}) 
}
*/