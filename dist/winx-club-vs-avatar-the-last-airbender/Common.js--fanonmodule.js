/* Create a section on the WikiaRail to advertise the fanon portal
 * by: [[User:The 888th Avatar]], based on code from RuneScape Wiki
 */
 
if (skin == "oasis" && wgNamespaceNumber == 0 && !window.fanonlink) {
	addOnloadHook(addfanonlink);
}
 
var fanonlink = true;
 
function addfanonlink () {
	$('<section class="FanFiction module"><h1 style="margin-top:0px; margin-bottom:10px;">Fanon and fan fiction</h1><div><p>Did you know that you can publish fan fiction on Avatar Wiki? Start an <i>Avatar</i> fan fiction story!<br style="margin-bottom: 10px;"/><a href="http://winx-club-vs-avatar-the-last-airbender.wikia.com/wiki/Winx_Club_vs_Avatar:_The_Last_Airbender_Fanon" target="_blank">Go to the fanon portal</a> &bull; <a href="http://avatar.wikia.com/wiki/Avatar_Wiki:Creating_a_fanon" target="_blank">Learn how to create one</a></p></div></section>').insertAfter('.LatestPhotosModule');
}