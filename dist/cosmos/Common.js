/* Any JavaScript here will be loaded for all users on every page load. */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)',
    location: 'global',
    hoverText: '"The Cosmos is all there is, all there was and all there ever will be."',
    interval: 500, /* How often the timer updates in milliseconds (1000=1second) */
    monofonts: 'Consolas, monospace' /* The font the clock uses by default */
};
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});
 
 
/* Replaces {{Cusername}} with the name of the user browsing the page.
   Requires copying Template:Cusername. */
 
$(function() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").text(wgUserName); }); 
 
 
/* End of the {{Cusername}} replacement */