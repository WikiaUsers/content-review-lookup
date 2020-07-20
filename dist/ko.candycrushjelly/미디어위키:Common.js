/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */

// AjaxRC
window.ajaxRefresh = 30000; // AjaxRC time setting
window.ajaxPages = ["특수기능:최근바뀜", "특수기능:위키활동내역", "특수기능:기록",  "특수기능:새파일",  "특수기능:새동영상", "특수기능:기여"]; // AjaxRC page setting
window.AjaxRCRefreshText = '자동 갱신'; // AjaxRC text setting
window.AjaxRCRefreshHoverText = '페이지를 자동으로 갱신'; // AjaxRC text hover setting
 
// AjaxBatchDelete
batchDeleteDelay = 500;

// DisplayClock
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y %2H:%2M:%2S (UTC)';
 
// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'threadmoderator', 'content-moderator', 'sysop', 'bureaucrat', 'vstf', 'helper', 'staff']
};
 
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
    for (i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
 
/* 틀:USERNAME 활성화 */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */