/* This code checks user groups. Made by Monchoman45 */

function ContentCheck() {
	var autoconfirmed = false;
	var admin = false;
	var bureaucrat = false;
	var staff = false;
	var helper = false;
	var vstf = false;

	for(i in wgUserGroups) {
		if(wgUserGroups[i] == 'autoconfirmed') {autoconfirmed = true;}
		if(wgUserGroups[i] == 'sysop') {admin = true;}
		if(wgUserGroups[i] == 'bureaucrat') {bureaucrat = true;}
		if(wgUserGroups[i] == 'staff') {staff = true;}
		if(wgUserGroups[i] == 'helper') {helper = true;}
		if(wgUserGroups[i] == 'vstf') {vstf = true;}
	}

	if(admin == false && bureaucrat == false) {
		$('.conditionalcontent').css({'display': 'none'})
	}
}

addOnloadHook(ContentCheck);



/* This code displays a clock or a countdown timer. Adapted from w3schools.com example. */
function startTime() {
   var timerElem = $('#CountdownTimer');

   if (timerElem.length > 0) {
      var today=new Date();
      var h=today.getUTCHours();
      var m=today.getUTCMinutes();
      var s=today.getUTCSeconds();
      var s1=(s!=00)?60-s:s;
      var m1=(m!=00)?60-m:m;
      var h1=(24 - (h-10)) % 24; // <--10 is used as a time zone offset
 
      // add a zero in front of numbers<10
      m1=checkTime(m1);
      s1=checkTime(s1);
      timerElem.text(h1 + ":" + m1 + ":" + s1);
      t=setTimeout('startTime()', 1000);
   }
}
 
function checkTime(i) {
   if (i<10) {
      i="0" + i;
   }
   return i;
}
 
addOnloadHook(startTime);