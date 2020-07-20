// Barre de navigation
var chatTopicArray = [
{url:wgServer+"/wiki/Catégorie:Règles",text:"règles",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/f/f0/Ic%C3%B4neR%C3%A8gles.png/revision/latest?cb=20171214164439&path-prefix=fr"},
{url:wgServer+"/wiki/Special:WikiActivity",text:"activité du wiki",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/0/03/Ic%C3%B4neActivit%C3%A9Wiki.png/revision/latest?cb=20171214164421&path-prefix=fr"},
{url:wgServer+"/wiki/MediaWiki:Emoticons",text:"émoticônes",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/0/01/Ic%C3%B4ne_emoticons.png/revision/latest?cb=20170621094433&path-prefix=fr"},
{url:wgServer+"/wiki/Special:MyPage",text:"profil",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/9/96/Ic%C3%B4ne_profil.png/revision/latest?cb=20170621094451&path-prefix=fr"},
{url:wgServer+"/wiki/Special:Chat?action=purge",text:"actualiser",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/b/bf/Ic%C3%B4neRafraichir.png/revision/latest?cb=20171214164354&path-prefix=fr"},
{url:"https://discordapp.com",text:"discord",imgUrl:"https://vignette.wikia.nocookie.net/sshadow/images/8/86/Ic%C3%B4ne_Discord.png/revision/latest?cb=20170621094337&path-prefix=fr"}
];

// SpeedEmoticon.js
 
importStylesheetURI('http://fr.sshadow.wikia.com/wiki/MediaWiki:SpeedEmoticon/code.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://vignette.wikia.nocookie.net/animalcrossing/images/b/b9/Noelsmiley.gif/revision/latest?cb=20151216154910&path-prefix=fr" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
        $('#poplist').css({             
                top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
                left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
            });
    });
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
    $('#SpeedEmoticon a').each(function() {
        $(this).after('<img src="' + $(this).attr('href') + '"/>');
        $(this).remove();
    });
    $('#poplist img').click(function(){
        var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
            messg = $('.message textarea').val();
        $('.message textarea').val(messg + txt + ' ').focus();
    });
    $('#poplist div').attr('style', '');
    console.log('SpeedEmoticon v1.8')
});

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
        // ...
    ]
});