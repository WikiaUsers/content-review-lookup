/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		missing: { u:'Missing' },
		FirstPaxadoran: { u:'The First'},
		Paxadoran: { u:'Paxadoran'},
		traveler: { u:'Fourth Wall Master'},
		senpai: { u:'Wiki Senpai'},
		proinsane: { u:'Professional Cannibal'},
		pineapple: { u:'Pineapple Lord'},
		phil: { u:'Maker of Phil'},
		koopa: { u:'Bowser'},
		lemon: { m:"King of Lemons", f:'Queen of Lemons', u: 'Lemon Ruler'},
		reference: { u: 'Reference Boogie'},
		literature: { u: 'Lord of Literature'},
		cute: { u:'Cuteness Queen'},
		spex: { u:'Spex Commander'},
		factory: { u:'Factory-Built'},
		friends: { u:'FRIEND'},
		ptwg: { u:'World Painter'},
		remorse: { u:'Remorseful'},
		bandicoot: {u:'Bandicoot'},
		silly: {u:'Silly'},
		DFTP: {u:'Tropper'},
	}
};
UserTagsJS.modules.custom = {
	'TheKrazyStew': ['FirstPaxadoran','Paxadoran','factory','friends','ptwg','remorse'],
	'TheKrazyStew2': ['Paxadoran','factory','friends'],
	'LinkMarioKirby': ['traveler','factory','friends','ptwg','remorse','missing'],
	'Animetrex': ['senpai','factory','friends','ptwg','remorse', 'proinsane'],
	'DrasticPark': ['pineapple','factory','friends','ptwg'],
	'KingOfKretaceous': ['pineapple','factory','friends','ptwg'],
	'64.82.204.2': ['phil','factory'],
	'108.218.65.81': ['phil','factory'],
	'Tyrannosaurus dude11': ['koopa','friends','ptwg','remorse'],
	'Cityws': ['lemon','friends','ptwg'],
	'Kurraka': ['lemon','friends','ptwg','remorse'],
	'Mephistophele': ['reference','factory','friends','ptwg'],
	'Sophia Orr': ['cute','ptwg'],
	'Aaronthekil': ['factory'],
	'Dantolaus': ['friends','ptwg'],
	'Thelalaloopsygirl': ['friends','ptwg','remorse'],
	'Glem3': ['friends','ptwg'],
	'Raptordude115': ['friends','ptwg','remorse'],
	"Freddy's Little Helper": ['factory','friends','ptwg'],
	'The Skys Wolf': ['spex','friends','ptwg','remorse'],
	'Bluesarethebest': ['missing','friends','ptwg'],
	'Drago, Lord of Dragons': ['factory','friends','ptwg'],
	'Fluffy the Dragon Animatronic': ['friends','ptwg'],
	'PrixyBandicoot': ['friends','ptwg','remorse','bandicoot','silly'],
	'ChickenAndBeer': ['friends','ptwg','remorse'],
	'Mr. Mark Twain': ['literature','factory','friends','ptwg','remorse'],
	'Lord History': ['literature','factory','friends','ptwg','remorse'],
	'TheHiprStew':['Paxadoran'],
	'Ethanpotato':['remorse'],
	"Rainbow 'Foxy' Dash":['remorse'],
	'Dismantled Foxy The Pirate (New Account)': ['DFTP'],
	'夢子ちゃん': ['missing']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});