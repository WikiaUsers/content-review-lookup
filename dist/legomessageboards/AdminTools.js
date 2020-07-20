/*This page adds several tabs to userpages allowing administrators to quickly access many more useful tools that would otherwise take longer to access. This tool is only to be used by administrators. Violators will have it removed. - Written by Drew1200 */
 
$(document).ready(function() {
	$('.tabs-container > ul').append('<li><a href="/wiki/Special:Editcount/'+wgTitle+'">Edits</a></li><li><a href="/wiki/Special:UserRights/'+wgTitle+'">Rights</a></li><li><a href="/wiki/Special:DeletedContributions/'+wgTitle+'">Deleted</a></li><li><a href="/wiki/Special:Log?page='+wgTitle+'">Logs</a></li><li><a href="/wiki/Special:Block/'+wgTitle+'">Block</a></li><li><a href="/wiki/Special:Emailuser/'+wgTitle+'">Email</a></li>');
});