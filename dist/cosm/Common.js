/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{username}} with the name of the user browsing the page.
   Requires copying Template:username. */

$(function() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").text(wgUserName); }); 


/* End of the {{XWusername}} replacement */