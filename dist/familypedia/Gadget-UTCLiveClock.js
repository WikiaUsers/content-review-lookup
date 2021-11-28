 // UTC Live Clock
 // Created by [[w:User:AzaToth]]
 //
 // Adds a clock in the personal toolbar that shows the current time in UTC, and provides a purge link.

$j(document).ready(function ()
{
  var personal = 'p-personal';
  if (!document.getElementById (personal)) personal = 'personal'; // Vector...
  if (!document.getElementById (personal)) return; // Old skins: don't do anything
  var liveClock =
    addPortletLink (
        personal
      , wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge'
      , ""
      , 'utcdate');
  if (!liveClock) return; // Paranoia
  if (skin !== "vector") { //large font looks like crap on vector
    liveClock.style.fontSize = 'larger';
  }
  liveClock.style.fontWeight = 'bolder';
 
  function showTime ()
  {
    var now = new Date();
    var hh  = now.getUTCHours();
    var mm  = now.getUTCMinutes();
    var ss  = now.getUTCSeconds();
    var time = 
     (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    liveClock.firstChild.replaceChild (document.createTextNode (time), liveClock.firstChild.firstChild);
    window.setTimeout (showTime, 1000);
  }

  showTime();
});