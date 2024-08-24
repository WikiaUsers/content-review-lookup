/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 

 
/** Username replace function
 * Inserts user name into
 * By Splarka
 */
function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
}
$(UserNameReplace);

function Spoiler() {
  var Spoiler_vorhanden = document.getElementById("WikiaArticle").getElementsByTagName("div");
  for (i=0; i < Spoiler_vorhanden.length; i ++){
    if (Spoiler_vorhanden[i].className.toLowerCase() == "spoiler")
      return true;
 }
  return false;
}
 
if (Spoiler()) {
  var article = $('div#WikiaArticle');
	$('<div id="blackout">' + '</div>').appendTo(article).css({
		position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, backgroundColor: '#474646', opacity: 1
	  });
  var r = confirm("Auf der Seite befinden sich Spoiler. \nDr�cke OK um es dir anzuschauen. Abbruch bringt dich zur Startseite.");
  if (r != true)
    window.location.href = "http://de.fma.wikia.com/";
  else 
    $('#blackout').fadeOut(500, function () { });
}