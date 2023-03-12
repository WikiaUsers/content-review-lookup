/* จาวาสคริปต์ในหน้านี้จะถูกใช้งานต่อผู้ใช้ทุกคน */
/* Any JavaScript here will be loaded for all users on every page load. */
 
// AjaxRC
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refreshes the page when new edits occur.';
ajaxPages = ["พิเศษ:WikiActivity", "พิเศษ:Log", "พิเศษ:Images", "พิเศษ:Videos", "พิเศษ:Contributions", "พิเศษ:AbuseLog"];
 
// FastDelete
var fdButtons = [];
 
fdButtons[fdButtons.length] = {
    'summary': 'Deleted page by clicking one-click delete button by [[w:c:dev:FastDelete|FastDelete]] script',
        'label': 'one-click delete'
};
 
// DynamicImages
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};

// BackToTopButton default settings
var Speed = 600;
var Start = 800;
 
// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};

// DisplayClock
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y %2H:%2M:%2S (UTC)';
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }
        var tpm = ' ';
 
    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* Spoiler Alert */
window.SpoilerAlertJS = {
    question: 'ส่วนนี้เปิดเผยเนื้อเรื่องบางส่วนของภาพยนตร์ คุณต้องการอ่านเนื้อหาส่วนนี้หรือไม่',
    yes: 'ใช่',
    no: 'ไม่',
    fadeDelay: 500
};
/* End of the Spoiler Alert */