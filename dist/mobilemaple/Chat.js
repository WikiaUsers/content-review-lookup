// Script credits
// Old chat options - Callofduty4, Madnessfan34537, Fang³
// New chat options - Gamedezyner, Dragonfree97
// Chattopic - unknown
// Censor and text emotes - MLP wiki
// Stylesheet changer - Roadhawk, Dragonfree97
// ChatTags - LilMissRarity, ShadeTempest, Dragonfree97

// ChatTopic setup

var siteUrl = wgServer.slice(7,-10);

var chatTopicArray = [
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Maplestory_Mobile_Wiki:Chatroom_Guidelines",
   text: "chat rules",
   imgUrl: "http://img3.wikia.nocookie.net/__cb20140914153818/d97/images/9/91/Icon_rules.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Special:RecentChanges",
   text: "recent changes",
   imgUrl: "http://img3.wikia.nocookie.net/__cb20140914153816/d97/images/7/7c/Icon_recent_changes.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/MediaWiki:Emoticons",
   text: "emoticons",
   imgUrl: "http://img3.wikia.nocookie.net/__cb20140914153814/d97/images/6/6c/Icon_emoticons.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Maplestory_Mobile_Wiki:Rules",
   text: "chattags",
   imgUrl: "http://img2.wikia.nocookie.net/__cb20140914153812/d97/images/3/3a/Icon_chattags.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Special:MyPage",
   text: "my page",
   imgUrl: ""+wgAvatarUrl+""
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Special:Chat?action=purge",
   text: "refresh",
   imgUrl: "http://img1.wikia.nocookie.net/__cb20140914153817/d97/images/8/89/Icon_refresh.png"
   },
]

// Styleswitcher setup

var stylesheetsArray = [
   {
   name: "Spring",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Spring.css&action=raw&ctype=text/css",
   logo: "http://img1.wikia.nocookie.net/__cb7/mobilemaple/images/8/89/Wiki-wordmark.png"
   },
   {
   name: "Summer",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Summer.css&action=raw&ctype=text/css",
   logo: "http://img1.wikia.nocookie.net/__cb7/mobilemaple/images/8/89/Wiki-wordmark.png"
   },
   {
   name: "Fall",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Autumn.css&action=raw&ctype=text/css",
   logo: "http://img1.wikia.nocookie.net/__cb7/mobilemaple/images/8/89/Wiki-wordmark.png"
   },
   {
   name: "Winter",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Winter.css&action=raw&ctype=text/css",
   logo: "http://img1.wikia.nocookie.net/__cb7/mobilemaple/images/8/89/Wiki-wordmark.png"
   },
   {
   name: "Minimal",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Minimal.css&action=raw&ctype=text/css",
   logo: "http://img1.wikia.nocookie.net/__cb7/mobilemaple/images/8/89/Wiki-wordmark.png"
   }
]

var ssDefaultSkin = "3";

// Imports

setTimeout(function() { 
    importScriptPage('User:Dragonfree97/chat.js/options2.js','animalcrossing'); 
}, 1000); // Chattopic & options
console.log("Chat options initialized.");

importScriptPage('ChatObject/code.js', 'dev' );
importScriptPage('Animal Crossing Wiki:Sandbox/CustomChatTags.js', 'animalcrossing');  // ChatTags
console.log("ChatTags initialized.");
// importScriptPage("MediaWiki:BanPlsFilter.js", "d97"); // BanPls filter
importScriptPage("MediaWiki:StyleSwitcher2.js", "d97"); // Style switcher
importScriptPage("MediaWiki:Censor.js", "d97"); // Chat censor
importScriptPage("MediaWiki:TextEmotes.js", "d97"); // text-based emotes
importScriptPage('MediaWiki:ChatTopic2.js','d97'); 

// END Imports

mainRoom.maxCharacterLimit = 2000;

// Finished loading
$('#loadingnotifier').remove();
console.log("Script loading complete.");