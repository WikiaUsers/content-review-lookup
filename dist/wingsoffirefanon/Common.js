// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';

// Imports
importArticles({
  type: "script",
  articles: [
    "w:c:dev:Countdown/code.js",
	"w:c:dev:UserTags/code.js",
	"w:c:dev:AjaxRC/code.js",
	"w:dev:MediaWiki:WallGreetingButton/code.js",
	]
});
 
var hasClass = (function () {
  var reCache = {};
  return function (element, className) {
    return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// Dragon anon avatars
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/')) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/30", "https://vignette.wikia.nocookie.net/wingsoffirefanon/images/7/7c/Fanon_anon_icon.png/revision/latest?cb=20191123034609");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/50", "https://vignette.wikia.nocookie.net/wingsoffirefanon/images/7/7c/Fanon_anon_icon.png/revision/latest?cb=20191123034609");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/150", "https://vignette.wikia.nocookie.net/wingsoffirefanon/images/7/7c/Fanon_anon_icon.png/revision/latest?cb=20191123034609");
        }
    }
}
changeSourceAll();

// Lock old forums
window.LockForums = {
  expiryDays: 90,
  disableOn: [
    '178728', // Promotions & Demotions board: Feedback
    '510219', // Promotions & Demotions board: Roles of Promoted Users
  ],
};