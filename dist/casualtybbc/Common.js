/* ----------------------- CASUALTY WIKI COMMON JS ----------------------- */
 
/* ----------------------------- JS IMPORTS ------------------------------ */

importArticles({
	type:'script',
	articles: [
                'w:c:dev:LockOldBlogs/code.js',
                'MediaWiki:Common.js/navigation.js'
	]
});

/* Countdown */
importScriptPage('MediaWiki:Countdown.js', 'casualtybbc');

importScriptPage('MediaWiki:Summaries.js', 'casualtybbc');

/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'This article contains plot details about an upcoming episode. Are you sure you wish to read it?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

 if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/casualty/images/c/cf/Button.png",
     "speedTip": "Holby City Wiki link",
     "tagOpen": "[[hc:",
     "tagClose": "]]",
     "sampleText": "Link title"}
  }

//************************************************
// Archive Old Blog Posts
//************************************************
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};