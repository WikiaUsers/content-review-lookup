//Original: http://animalcrossing.wikia.com/wiki/MediaWiki:Chat.js


// The following block of code loads us our own Chat Welcome Message. 
// If it freaks out for whatever reason, it'll give us a default.
cWelMsg = "";
 try {
    //We're gonna grab the Chat Welcome Message contents
    cWelMsg = $.ajax({
        url: '//animalcrossing.wikia.com/api.php?action=query&prop=revisions&titles=MediaWiki%3AChat-welcome-message&rvlimit=1&rvprop=content&format=jsonfm',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        async: false,
    }).responseText;
    cWelMsg = JSON.parse(cWelMsg.slice(cWelMsg.indexOf("query")-2,-1)).query.pages["86269"].revisions[0]["*"];
}
catch(err) {
    console.error("Es war nicht möglich, die CWM zu laden.");
    cWelMsg = "Willkommen im Chat der Community Deutschland!";
}
 
// Define the chat header items
var chatTopicArray = [
    {url:wgServer+"/wiki/Community-Richtlinien",text:"Community-Richtlinien",imgUrl:"https://images.wikia.nocookie.net/__cb20140914153818/d97/images/9/91/Icon_rules.png"},
    {url:wgServer+"/wiki/Special:RecentChanges",text:"Letzte Änderungen",imgUrl:"https://images.wikia.nocookie.net/__cb20140914153816/d97/images/7/7c/Icon_recent_changes.png"},
    {url:wgServer+"/wiki/MediaWiki:Emoticons",text:"Emoticons",imgUrl:"https://images.wikia.nocookie.net/__cb20140914153814/d97/images/6/6c/Icon_emoticons.png"},
    /* {url:wgServer+"/wiki/Help:ChatTags",text:"chattags",imgUrl:"https://images.wikia.nocookie.net/__cb20140914153812/d97/images/3/3a/Icon_chattags.png"}, */
    {url:wgServer+"/wiki/Special:MyPage",text:"Profil",imgUrl:""+wgAvatarUrl},
    {url:wgServer+"/wiki/Special:Chat?action=purge",text:"Neu laden",imgUrl:"https://images.wikia.nocookie.net/__cb20140914153817/d97/images/8/89/Icon_refresh.png"}
];

/* 
// Define the stylesheet items
var stylesheetsArray = [
    {name:"Spring",url:"http://d97.wikia.com/index.php?title=MediaWiki:Spring.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/animalcrossing/images/f/fc/SpringSummerLogo.png/revision/latest?cb=20150901024342.jpg"},
    {name:"Summer",url:"http://d97.wikia.com/index.php?title=MediaWiki:Summer.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/animalcrossing/images/f/fc/SpringSummerLogo.png/revision/latest?cb=20150901024342.jpg"},
    {name:"Fall",url:"http://d97.wikia.com/index.php?title=MediaWiki:Autumn.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/animalcrossing/images/4/4c/FallLogo.png/revision/latest?cb=20150901022847.jpg"},
    {name:"Winter",url:"http://d97.wikia.com/index.php?title=MediaWiki:Winter.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"},
    {name:"Night",url:"http://d97.wikia.com/index.php?title=MediaWiki:Night.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png"},
    {name:"Aurora",url:"http://d97.wikia.com/index.php?title=MediaWiki:SpaceAurora.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png",clear:true},
    {name:"Pokémon ORAS",url:"http://d97.wikia.com/index.php?title=MediaWiki:Oras.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20140919191135/d97/images/f/f9/Wordmark_yellow.png",clear:true},
    {name:"Minimal",url:"http://d97.wikia.com/index.php?title=MediaWiki:Minimal.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"},
    {name:"Twitch",url:"http://d97.wikia.com/index.php?title=MediaWiki:Twitch.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20141121230158/d97/images/b/b0/Wordmark_twitch_2.png"},
    {name:"DANK.CSS (joke)",url:"http://d97.wikia.com/index.php?title=MediaWiki:Dank.css&action=raw&ctype=text/css"},
    {name:"Flower",url:"http://d97.wikia.com/index.php?title=MediaWiki:OrangeFlower.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/__cb20140919191135/d97/images/f/f9/Wordmark_yellow.png",clear:true}
];
 
// This ugly block will set the default skin to the current season for new users joining the chat - HOPEFULLY
 
var cM = new Date().getMonth() + 1;
var cD = new Date().getDate();
if (typeof southernHemisphere === "undefined" || southernHemisphere === false) {
    // NORTHERN HEMISPHERE - we're going to handle winter based on the snow in Animal Crossing: New Leaf
    if (cM == 1  || cM == 2 || cM == 12 ) defaultSkin = "3"; // winter
    if (cM == 2 || cM == 3  || cM == 4  || cM == 5)    defaultSkin = "0"; // spring
    if (cM == 6  || cM == 7  || cM == 8)                            defaultSkin = "1"; // summer
    if (cM == 9  || cM == 10 || cM == 11 || cM == 12)  defaultSkin = "2"; // autumn
} else {
    // SOUTHERN HEMISPHERE - we're going to handle winter like every other month
    if (cM == 1  || cM == 2  || cM == 12 ) defaultSkin = "1"; // summer
    if (cM == 3  || cM == 4  || cM == 5  ) defaultSkin = "2"; // autumn
    if (cM == 6  || cM == 7  || cM == 8  ) defaultSkin = "3"; // winter
    if (cM == 9  || cM == 10 || cM == 11 ) defaultSkin = "0"; // spring
}
 
$("#fb_xdm_frame_http").remove();     // Not too sure what these lines do. I think Rose added them at some point
$("#fb_xdm_frame_https").remove();    // Either way I'm not going to touch them because I don't know what they do
 
// Wait for Wikia to load
 
var loadedTester = setInterval(function() {
   if(typeof mainRoom !== "undefined") {
       importScriptPage("MediaWiki:JacobsLadderSuite.js","d97"); // import the API
       setTimeout(function() {
            importScriptPage("ChatObject/code.js","dev");
            importScriptPage("Animal Crossing Wiki:Sandbox/CustomChatTags.js","animalcrossing");
            importScriptPage("MediaWiki:StyleSwitcher3.js","d97");
            importScriptPage("MediaWiki:TextEmotes.js","d97");
            importScriptPage("MediaWiki:ChatTopic2.js","d97");
            importScriptPage("MediaWiki:Options.js","d97");
            importScriptPage("MediaWiki:SidebarConsole.js","d97");
            importScriptPage("MediaWiki:TitleNotifications.js","d97");
            importScriptPage("MediaWiki:ClientsideCensor.js","d97");
            mainRoom.maxCharacterLimit = 2500; // custom max character limit
            setTimeout(function() { importScriptPage('MediaWiki:Cg.js','d97'); },1000);
            setTimeout(function() { 
                ChatGame.gameList.push({
                    "name": "Drawing App",
                    "author": "Incongruence",
                    "code": "DRW",
                    "info": "A drawing pad for your masterpieces!",
                    "url": "MediaWiki:DrawingApp.js",
                    "wiki": "d97",
                    "mode": "single",
                    "players": 1,
                });
                ChatGame.gameList.push({
                    "name": "Chess",
                    "author": "Dragonfree97",
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
 
var cwmLoader = setInterval(function() {
    if(typeof $(".Chat > ul > .inline-alert")[0] !== "undefined") {
        welcomeMessage = $(".Chat > ul > .inline-alert")[0]; // Selects the first inline alert.
        $(welcomeMessage).html('<table class="ChatWelcomeTable" style="border: 1px solid #7b3b0a; border-radius:64px; padding:5px; padding-left:32px; padding-right:32px; margin-left: auto; margin-right: auto; background-color: #fff8e3;"><tr><td><big>'+mw.html.escape(cWelMsg)+'</big><br />Before chatting, don\'t forget to read the rules <u><a href="http://animalcrossing.wikia.com/wiki/Animal Crossing Wiki:Chat Rules">here</a></u>.<br />Reminder: As per <u><a href="http://www.coppa.org">COPPA</a></u>, we reserve the right to permanently ban any user under the age of 13.<br />Whilst not many people here play NL, please stick around for the conversation!</td></tr></table>');
        clearInterval(cwmLoader);
        console.log("CWM loaded, tried to change it");
        cwmLoaded = true;
        // By loading this here, we'll hopefully prevent it from modifying messages before the CWM
        mainRoom.model.chats.bind("afteradd", function() {
            appendTimestamps();
        });
    } else {
        console.log("CWM isn't loaded");
    }
},50);
*/
 
// Tiny bit of code to add a second timestamp to incoming messages && inline alerts
function appendTimestamps() {
    if(cwmLoaded === true) {
        timer = new Date();
        hours = timer.getHours() % 12;
        if (hours === 0) { hours = 12; }
        minutes = timer.getMinutes();
        seconds = timer.getSeconds();
        if($("#entry-"+JLAPI.mostRecentMessage.cid()).hasClass('inline-alert')) {
            $("#entry-"+JLAPI.mostRecentMessage.cid()).append("<span class='time' style='font-weight: initial;'>"+hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2)+"</span>");
        } else {
            $("#entry-"+JLAPI.mostRecentMessage.cid()+" > span.time").html(hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2));
        }
    }
}
 
// thx to some guy on stackexchange for this one
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
 
$("body").append("<header id='christmaslights' style='display: none; height: 45px; position: absolute; width: 100%; top: 29px; z-index: 999999; background-position-x: 65px;'></header>"); //adds a thing for us to make christmas lights with