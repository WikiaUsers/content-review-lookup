/* Any JavaScript here will be loaded for all users on every page load. */

/* Back to Top button */
window.BackToTopModern = true;

/* Display Clock */
window.DisplayClockJS = {
    format: '%2Y-%2m-%2d (%{Monday;Tuesday;Wednesday;Thursday;Friday;Saturday;Sunday}w) %2H:%2M:%2S (JST)',
    hoverText: 'JST Clock',
    interval: 500, /* How often the timer updates in milliseconds (1000=1 second) */
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
    offset: 540 /* Time offset from UTC in minutes - 480 changes the clock from UTC to CST (China Standard Time) */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});

/* Lock Old Comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 3;
window.lockOldComments.addNoteAbove = true;

/* User Account Age */
window.customUserAccountAge = {
	showFullDate: true
};
mw.hook('dev.userAccountAge').add(function() {
    var checkExist = setInterval(function() {
        var $tag = $('#userAccountAge-a');
        
        if ($tag.length) {
            clearInterval(checkExist);
            
            var originalDate = $tag.text();

            var formattedDate = originalDate.replace(/\s(\d{4})$/, ', $1');
            
            $tag.text("Joined on " + formattedDate);
        }
    }, 100);
});