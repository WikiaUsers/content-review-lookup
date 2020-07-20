/* Any JavaScript here will be loaded for all users on every page load. */
/* Create a section on the WikiaRail to advertise the fanon portal
 * by: [[User:The 888th Avatar]], based on code from RuneScape Wiki
 */

if (skin == "oasis" && wgNamespaceNumber == 0 && !window.fanonlink) {
	addOnloadHook(addfanonlink);
}
 
var fanonlink = true;
 
function addfanonlink () {
	$('<section class="FanFiction module"><h1 style="margin-top:0px; margin-bottom:10px;">Fanon dan fiksi penggemar</h1><div><p>Tahukah kamu bahwa kamu dapat menerbitkan fiksi penggemar di Avatar Indonesia Wiki? Mulai cerita fiksi penggemar <i>Avatar</i>!<br style="margin-bottom: 10px;"/><a href="http://avatar.wikia.com/id/wiki/Avatar_Indonesia_Wiki:Avatar_fanon" target="_blank">Pergi ke portal fanon</a> &bull; <a href="http://avatar.wikia.com/id/wiki/Avatar_Indonesia_Wiki:Membuat_fanon" target="_blank">Pelajari cara membuatnya</a></p></div></section>').insertAfter('.LatestPhotosModule');
}