// Any JavaScript here will be loaded for all users on every page load. 

// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');

// Ajax auto-refresh
// Ajax auto-refresh
window.ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
window.AjaxRCRefreshText = 'Auto-refresh';

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';

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

//Get names
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

//Old blog comments
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it has not been commented on in over <expiryDays> days. There is no need to comment!"
};