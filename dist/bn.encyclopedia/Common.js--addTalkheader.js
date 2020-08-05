/* Any JavaScript here will be loaded for all users on every page load. *// 18:54, July 20, 2014 (UTC)
// <source lang="JavaScript">
 
// From [[w:c:yugioh:MediaWiki:Common.js]]
// (http://yugioh.wikia.com/?oldid=2797835)
 
// Add Template:Talkheader if it's not there.
 
if (mNamespace.match(/talk/i) && mNamespace != "User_talk" && !mSection && mAction != "submit") {
	addOnloadHook(addTalkheader);
 
	function addTalkheader() {
		var vText = $('#wpTextbox1').val().replace("{\{talkheader", "{\{Talkheader");
		if (!vText.match("{\{Talkheader") && !vText.match("{\{Delete")) {
			$('#wpTextbox1').val("{\{Talkheader}\}\n\n" + vText);
		} else {
			$('#wpTextbox1').val(vText);
		}
	}
}
 
// END Add Template:Talkheader if it's not there.
 
// </source>