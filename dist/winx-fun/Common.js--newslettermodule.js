/* Create a section on the WikiaRail to advertise the NewsLetter portal
 * by: [[User:Stellamusa101]], based on code from Avatar Wiki
 */
 
if (skin == "oasis" && wgNamespaceNumber == 0 && !window.fanonlink) {
	addOnloadHook(addfanonlink);
}
 
var fanonlink = true;
 
function addfanonlink () {
	$('<section class="FanFiction module"><h1 style="margin-top:0px; margin-bottom:10px;">Fanon and fan fiction</h1><div><p>Winx Wiki has a monthly newsletter! <br style="margin-bottom: 10px;"/><a href="http://winx-fun.wikia.com" target="_blank">Main page</a> &bull; <a href="http://winx-fun.wikia.com/wiki/Special:ListAdmins" target="_blank">Admin Search</a></p></div></section>').insertBefore('.LatestPhotosModule');
}