// *************************************************
// change profile labels on individual pages
//
// 
// *************************************************
 
if (wgCanonicalNamespace === "User_talk" || wgCanonicalNamespace === "User"  ){
	if ( document.getElementById('UserProfileMasthead').getElementsByClassName('group').length === 1 ){
		if (document.getElementById('adm-changetitle') !== null ){
			document.getElementById('UserProfileMasthead').getElementsByClassName('group')[0].innerHTML = document.getElementById('adm-changetitle').innerHTML;
		}
	}
}

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}