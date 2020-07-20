//Begin Guide
 
/* Signifies Window */
/** Signifies Module **/
/*** Signifies Module Section ***/
/*Null Section*/
//Notes OR Null Line
 
//End Guide

/* !Kick Failure Message */
window.absentMessage = '<user> is not present in the Hive Chatroom.';

/* Chat Delay */
window.dev = window.dev || {};
window.dev.chatdelay = {
	max: 10,
	mainOnly: true
};

/* Chat Statuses - Alphabetized */
window.ChatStatus = {
	statuses: {
		abouttoleave: "is about to leave",
		angry: "is angry",
		annoyed: "is annoyed",
		arguingwithsomeone: "is arguing with someone",
		asleep: "is asleep",
		awayfromkeyboard: "is away from keyboard",
		awayindefinitely: "is away indefinitely",
		awaytemporarily: "is away temporarily",
		beingassassinated: "is being assassinated",
		beingmentallyblocked: "is being mentally blocked",
		beingpetted: "is being petted",
		bored: "is bored",
		busy: "is busy",
		calm: "is calm",
		callingthecops: "is calling the cops",
		demotingsomeone: "is demoting someone",
		distracted: "is distracted",
		doingsomechattests: "is doing some Chat Tests",
		debating: "is debating",
		debatingwithherself: "is debating with herself",
		debatingwithhimself: "is debating with himself",
		donewithlife: "is done with life",
		drinking: "is drinking",
		drinkingmtdew: "is drinking Mt Dew",
		eating: "is eating",
		editing: "is editing",
		editingemotes: "is editing emotes",
		editingthecssjs: "is editing the CSS/JS",
		frightened: "is frightened",
		frustrated: "is frustrated",
		gaming: "is gaming",
		goingtothebathroom: "is going to the bathroom",
		gettingemotional: "is getting emotional",
		gettingsavage: "is getting savage",
		hallucinating: "is hallucinating",
		havingprivateconversation: "is having private conversation",
		hungry: "is hungry",
		invacation: "is in vacation",
		leaving: "is leaving",
		listeningtomusic: "is listening to music",
		notabouttobitesomeone: "is not about to bite someone",
		promotingsomeone: "is promoting someone",
		reading: "is reading",
		readingchatrecords: "is reading Chat records",
		recording: "is recording",
		relaxing: "is relaxing",
		reportingaviolator: "is reporting a violator",
		researching: "is researching",
		restinginpeace: "is resting in peace",
		runningoutoftime: "is running out of time",
		seeingsomesuspicion: "is seeing some suspicion",
		sighing: "is sighing",
		signingapage: "is signing a page",
		stalking: "is stalking",
		studying: "is studying",
		sufferingfrompoorinternetspeed: "is suffering from poor Internet speed",
		takingsomenap: "is taking some nap",
		testingsomethings: "is testing some things",
		thinking: "is thinking",
		wastingtime: "is wasting time",
		watchingtv: "is watching TV",
		watchingyoutube: "is watching Youtube",
		working: "is working",
		writing: "is writing",
		zzz: "is [insert reason to be away here]",
		derp: "._.",
		maxderp: ".___.",
		megaderp: "._____.",
		ultraderp: "._______.",
		ultragigaderp: "._________.",
		ultragigaderpete: ".___________.",
		ultragigamegaderp: "._____________.",
		ultragigamegaderpete: "._______________."
	},
	debug: false
};

/* Imports */
importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js",
		"u:dev:MediaWiki:ChatDelay/code.js",

        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ChatHacksNoStar/code.js',
        'u:dev:MediaWiki:ChatHacks/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js'
    ]
});

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');