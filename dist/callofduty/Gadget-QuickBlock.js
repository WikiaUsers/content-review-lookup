// <nowiki>
// BEGIN MW GADGET
// Quickblock link

function quickBlock() {
	var userArray = wgPageName.split(":");
	$('.WikiaMenuElement').append('<li><a data-id="history" accesskey="h" href="/wiki/Special:Block/' + userArray[1] + '">Block</a></li>');
}

if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
	addOnloadHook(quickBlock);
}

// END MW GADGET
// </nowiki>