/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
	var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-DFW&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="650" height="200" style="border:0;"></iframe>');
});

/* Thanks to Cakemix from the Call of Duty Wiki */

 function updatetimer(i) {
        var now = new Date();
        var then = timers[i].eventdate;
        var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
        // catch bad date strings
        if(isNaN(diff)) {
            timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
            return;
        }
 
        // determine plus/minus
        if(diff<0) {
            diff = -diff;
            var tpm = 'T plus ';
        } else {
            var tpm = 'T minus ';
        }
 
        // calcuate the diff
        var left = (diff%60) + ' seconds';
        diff=Math.floor(diff/60);
        if(diff > 0) left = (diff%60) + ' minutes ' + left;
        diff=Math.floor(diff/60);
        if(diff > 0) left = (diff%24) + ' hours ' + left;
        diff=Math.floor(diff/24);
        if(diff > 0) left = diff + ' days ' + left
        timers[i].firstChild.nodeValue = tpm + left;
 
        // a setInterval() is more efficient, but calling setTimeout()
        // makes errors break the script rather than infinitely recurse
        timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
    }
 
    function checktimers() {
        //hide 'nocountdown' and show 'countdown'
        var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
        for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
        var countdowns = getElementsByClassName(document, 'span', 'countdown');
        for(var i in countdowns) countdowns[i].style.display = 'inline'
 
        //set up global objects timers and timeouts.
        timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
        timeouts = new Array(); // generic holder for the timeouts, global
        if(timers.length == 0) return;
        for(var i in timers) {
            timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
            updatetimer(i);  //start it up
        }
    }
    addOnloadHook(checktimers);

/* lock blog comments for blogs that haven't been commented on for more than 2 months.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/

$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
var now = new Date();
month--;
month= monthnames[month];
var day = then.match(/\d{2}$/);
then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
old = Math.floor(old/(1000*60*60*24));
if (old > 60) {
$('#article-comm').attr('disabled','disabled').text('This blog post hasn\'t been commented on for over two months. There is no need to comment.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */