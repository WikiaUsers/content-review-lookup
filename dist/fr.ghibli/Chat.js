// Barre de navigation
var chatTopicArray = [
{url:wgServer+"/fr/wiki/Catégorie:Règles",text:"Règles",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/f/f0/Ic%C3%B4neR%C3%A8gles.png/revision/latest?cb=20171214164439&path-prefix=fr"},
{url:wgServer+"/fr/wiki/Special:WikiActivity",text:"Activité du wiki",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/0/03/Ic%C3%B4neActivit%C3%A9Wiki.png/revision/latest?cb=20171214164421&path-prefix=fr"},
{url:wgServer+"/fr/wiki/MediaWiki:Emoticons",text:"Émoticônes",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/0/01/Ic%C3%B4ne_emoticons.png/revision/latest?cb=20170621094433&path-prefix=fr"},
{url:wgServer+"/fr/wiki/Special:MyPage",text:"Profil",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/9/96/Ic%C3%B4ne_profil.png/revision/latest?cb=20170621094451&path-prefix=fr"},
{url:wgServer+"/fr/wiki/Special:Chat?action=purge",text:"Actualiser",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/b/bf/Ic%C3%B4neRafraichir.png/revision/latest?cb=20171214164354&path-prefix=fr"},
{url:"https://discord.gg/HkFXKS8",text:"Discord",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/8/86/Ic%C3%B4ne_Discord.png/revision/latest?cb=20170621094337&path-prefix=fr"}
];

// Javascript
 
var loadedTester = setInterval(function() {
if(typeof mainRoom !== "undefined") {
importScriptPage("MediaWiki:JacobsLadderSuite.js","d97"); // import the API
setTimeout(function() {
importScriptPage("ChatObject/code.js","dev");
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage("NewMessageCount.js","dev");
importScriptPage("MediaWiki:TextEmotes.js","d97");
importScriptPage("MediaWiki:ChatTopic2.js","d97");
importScriptPage("MediaWiki:Options.js","d97");
mainRoom.maxCharacterLimit = 2500; // custom max character limit
setTimeout(function() { importScriptPage('MediaWiki:Cg.js','d97'); },1000);
setTimeout(function() { 
ChatGame.gameList.push({
"name": "Drawing App",
"code": "DRW",
"info": "A drawing pad for your masterpieces!",
"url": "MediaWiki:DrawingApp.js",
"wiki": "d97",
"mode": "single",
"players": 1,
});
ChatGame.gameList.push({
"name": "Chess",
"code": "CHX",
"info": "The classic game of strategy! (alpha, buggy)",
"url": "MediaWiki:Chess.js",
"wiki": "d97",
"mode": "multi",
"players": 1,
});
},2500);
$("#join-alert").remove();
chatIsLoaded = true;
},500);
clearInterval(loadedTester);
console.log("[CHAT.JS] Chat.js loading complete.");
} 
},100);

// is typing
 
importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        "u:dev:MediaWiki:AjaxEmoticons/code.js",
        "u:dev:MediaWiki:EmoticonsWindow/code.js",
        "u:dev:MediaWiki:ChatImages/code.js",
        "u:dev:MediaWiki:ExtendedPrivateMessaging/code.js",
        "u:dev:MediaWiki:ChatLinkPreview.js",
        "u:dev:MediaWiki:ChatInterwikiLinks/code.js",
        "u:dev:MediaWiki:EmoticonDragAndDrop.js",
        "u:dev:MediaWiki:ChatBlockButton/code.2.js",
        "u:dev:MediaWiki:!kick/code.js",
        "u:dev:MediaWiki:!block/code.js",
        "u:dev:MediaWiki:!ban/code.js",
        "u:dev:MediaWiki:Pings.js",
        "u:dev:MediaWiki:PrivateMessageAlert/code.js",
        // ...
    ]
});