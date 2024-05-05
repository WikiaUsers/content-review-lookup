/* Create a section on the WikiaRail to advertise the fanon portal
 * by: [[User:Stellamusa101]], based on code from Avatar Wiki
 */
 
if (skin == "oasis" && wgNamespaceNumber == 0 && !window.fanonlink) {
	addOnloadHook(addfanonlink);
}
 
var fanonlink = true;
 
function addfanonlink () {
	$('<section class="FanFiction module"><h1 style="margin-top:0px; margin-bottom:10px;">Fanon and fan fiction</h1><div><p>Did you know that you can publish fan fiction on The Gems: A Magical Adventure and Teenage DreamsPedia? Start an <i>The Gems: A Magical Adventure</i> and/or <i>Teenage Dreams</i> fan fiction story!<br style="margin-bottom: 10px;"/><a href="http://avatar.wikia.com/wiki/The_Gems_A_Magical_Adventure_Wiki:Fanon_Portal" target="_blank">Go to the fanon portal</a> ).insertAfter('.LatestPhotosModule');
}