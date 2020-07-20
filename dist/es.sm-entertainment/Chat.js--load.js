// Credit to Runescape and Call of Duty Wiki
 
 
// Change mod icons depending on the time 
// Written by Foodbandlt
 
function nighttime_moon(){
var night = new Date();
var nighthour=night.getHours();
 
if (nighthour >= 19 || nighthour <= 7){
$(".chat-mod .username").removeClass("modday");
$(".chat-mod .username").addClass("modnight");
}else{
$(".chat-mod .username").removeClass("modnight");
$(".chat-mod .username").addClass("modday");
}
setTimeout("nighttime_moon()", 10*60*1000);
}
 
nighttime_moon();
/* Creating /me command */
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me') {
			this.value = '* '+wgUserName;
		}
	}
}
/* Tab Insert */
importScript('User:Joeytje50/tabinsert.js')
 
/* Rate Limit */
importScript('User:Joeytje50/ratelimit.js')
 
/*Adding Quick Chat thing per discussion in Chat*/
importScript('User:Joeytje50/qc.js')