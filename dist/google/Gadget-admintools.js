/* Script adds extra tools to user's profiles 
** Written by Drew1200 and Seaside98.
*/
 
$(document).ready(function() {
	$('.tabs-container > ul').append('<li><a href="/wiki/Special:UserRights/'+wgTitle+'">Rights</a></li><li><a href="/wiki/Special:DeletedContributions/'+wgTitle+'">Deleted</a></li><li><a href="/wiki/Special:Log?page='+wgTitle+'">Logs</a></li><li><a href="/wiki/Special:Block/'+wgTitle+'">Block</a></li><li><a href="/wiki/Special:Emailuser/'+wgTitle+'">Email</a></li>');
});