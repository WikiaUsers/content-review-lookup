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
   url: "http://" + siteUrl + ".wikia.com/wiki/Tomodachi_Life_Wiki:Chat_Rules",
   text: "chat rules",
   imgUrl: "https://images.wikia.nocookie.net/__cb20140914153818/d97/images/9/91/Icon_rules.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Special:RecentChanges",
   text: "recent changes",
   imgUrl: "https://images.wikia.nocookie.net/__cb20140914153816/d97/images/7/7c/Icon_recent_changes.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/MediaWiki:Emoticons",
   text: "emoticons",
   imgUrl: "https://images.wikia.nocookie.net/__cb20140914153814/d97/images/6/6c/Icon_emoticons.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Help:ChatTags",
   text: "chattags",
   imgUrl: "https://images.wikia.nocookie.net/__cb20140914153812/d97/images/3/3a/Icon_chattags.png"
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Special:MyPage",
   text: "my page",
   imgUrl: ""+wgAvatarUrl+""
   },
   {
   url: "http://" + siteUrl + ".wikia.com/wiki/Special:Chat?action=purge",
   text: "refresh",
   imgUrl: "https://images.wikia.nocookie.net/__cb20140914153817/d97/images/8/89/Icon_refresh.png"
   },
]
// Imports

setTimeout(function() { 
    importScriptPage('User:Dragonfree97/chat.js/options2.js','animalcrossing'); 
}, 1000); // Chattopic & options
console.log("Chat options initialized.");

importScriptPage('ChatObject/code.js', 'dev' );
importScriptPage('Animal Crossing Wiki:Sandbox/CustomChatTags.js', 'animalcrossing');  // ChatTags
console.log("ChatTags initialized.");
importScriptPage("MediaWiki:StyleSwitcher2.js", "d97"); // Style switcher
importScriptPage("MediaWiki:Censor.js", "d97"); // Chat censor
importScriptPage("MediaWiki:TextEmotes.js", "d97"); // text-based emotes
importScriptPage('MediaWiki:ChatTopic2.js','d97'); 

// END Imports
mainRoom.maxCharacterLimit = 2000;

// Finished loading
$('#loadingnotifier').remove();
console.log("Script loading complete.");