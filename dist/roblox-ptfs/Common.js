
/* Progress Bar */
window.enableReadProgressBarOnArticles = true;
/*Back to Top*/
window.BackToTopModern = true;

/* SPOILERS */
var spoilers = document.querySelectorAll("span.blockspoiler");
for (var i = 0; i < spoilers.length; i++)
{
    spoilers[i].addEventListener("click", function(e)
    {
        e.target.classList.toggle("blockspoiler-spoiled");
    });
}

//Block log
TBL_GROUP = "roblox-en";

/*
var font = document.createElement("font");
font.src = "https://fonts.gstatic.com/s/nunito/v16/XRXV3I6Li01BKofIOOaBTMnFcQIG.woff2";
document.body.appendChild(font);*/

/*******************/
/****CUSTOM TAGS****/ 
/*window.UserTagsJS = {
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
 /*
	},
	oasisPlaceBefore: ''
};

 UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'cow', 'phantom', 'robloxredarrows', 'morkie', 'gamedev', 'southwest', 'politic', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', "content-moderator", /*'autoconfirmed', 'notautoconfirmed', 'inactive','blocked',
    'founder',];
    
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
/*

switch (mw.config.get('wgPageName')) {
    case 'Template:VisitCount':
       
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		setInterval(function(){
			var Http = new XMLHttpRequest();
			const url='https://games.roblox.com/v1/games?universeIds=21164849';
			Http.open("GET", url);
			Http.send();
		
			Http.onreadystatechange = (e) => {
				var visits = Http.responseText.substring(
					Http.responseText.indexOf(':',Http.responseText.search("visits")) + 1, 
					Http.responseText.indexOf(",",Http.responseText.search("visits"))
				);
				function commas(x) {
					var pattern = /(-?\d+)(\d{3})/;
					while (pattern.test(x))
						x = x.replace(pattern, "$1,$2");
					return x;
				};
				
				
				 visits = commas(visits);
				
				
				console.log(visits);
			};
		}, 5000);
        
        break;

}

*/