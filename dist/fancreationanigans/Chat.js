// Script credits
// Old chat options                - Callofduty4, Madnessfan34537, Fang³
// New chat options                - Gamedezyner, Dragonfree97
// Chattopic                       - unknown
// Censor and text emotes          - MLP wiki
// Stylesheet changer              - Roadhawk, Dragonfree97
// ChatTags                        - LilMissRarity, ShadeTempest, Dragonfree97
// Vid tag abuse filter            - Dragonfree97, Incongruence
// Title notifications             - Incongruence

// ChatTopic setup

var siteUrl = wgServer.slice(7,-10);

var chatTopicArray = [
   {
   url: "http://" + siteUrl + "fancreations.wikia.com/wiki/Fan_Creations:Policies#Chat_Policy",
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

// Styleswitcher setup

var stylesheetsArray = [
   {
   name: "Spring",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Spring.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"
   },
   {
   name: "Summer",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Summer.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"
   },
   {
   name: "Fall",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Autumn.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"
   },
   {
   name: "Winter",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Winter.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"
   },
   {
   name: "Night",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Night.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png"
   },
   {
   name: "Aurora",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:SpaceAurora.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png",
   clear: true
   },
   {
   name: "Pokémon ORAS",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Oras.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20140919191135/d97/images/f/f9/Wordmark_yellow.png",
   clear: true
   },
   {
   name: "Minimal",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Minimal.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png"
   },
   {
   name: "Twitch",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Twitch.css&action=raw&ctype=text/css",
   logo: "https://images.wikia.nocookie.net/__cb20141121230158/d97/images/b/b0/Wordmark_twitch_2.png"
   },
   {
   name: "DANK.CSS",
   url: "http://d97.wikia.com/index.php?title=MediaWiki:Dank.css&action=raw&ctype=text/css"
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

// Following section prevents vid tag abuse

$("#fb_xdm_frame_http").remove();
$("#fb_xdm_frame_https").remove();

function removeVids() {
    chatVidRemove = $("iframe").length - 3;
    if (chatVidRemove > -1) {
        for (i = 0; i < chatVidRemove; i++) {
            $("iframe")[i].remove();
        }
    }
}  

mainRoom.model.chats.bind("afteradd",removeVids);

// END vid tag abuse

// Title notifications -- credit to Rose (Incongruence)

old = document.title;
unread = 0;
 
mainRoom.model.chats.bind("afteradd", function() {
  if(!document.hasFocus()){
     unread++;
     document.title = "(" + unread + ") " + old;
  }
});
 
window.onfocus = function() {
  document.title = old;
  unread = 0;
}

// END title notifications

// Finished loading
$('#loadingnotifier').remove();
console.log("Script loading complete.");