/* Create a section on the WikiaRail to advertise the fanon portal
 * by: [[User:Stellamusa101]], based on code from Avatar Wiki
 */
 
if (skin == "oasis" && wgNamespaceNumber == 0 && !window.fanonlink) {
	addOnloadHook(addfanonlink);
}
 
var fanonlink = true;
 
function addfanonlink () {
	$('<section class="FanFiction module"><h1 style="margin-top:0px; margin-bottom:10px;">Fanon and fan fiction</h1><div><p>Did you know that you can publish fan fiction on The Rubies:A Teenage Adventure And VampirePedia Wiki? Start a <i>The Rubies:A Teenage Adventure</i> and/or <i>Teenage Dreams</i> fan fiction story!<br style="margin-bottom: 10px;"/><a href="http://the-rubiesa-teenage-adventure-and-the-vampirepedia.wikia.com/wiki/The Rubies:A Teenage Adventure:Fanon_Portal" target="_blank">Go to the fanon portal
}