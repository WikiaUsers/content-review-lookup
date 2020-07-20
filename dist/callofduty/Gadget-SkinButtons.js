// <nowiki>
// BEGIN MW GADGET

/* skin change buttons */
function CreateSkinChangeButtons() {
	//Oasis buttons
	$('#AccountNavigation').prepend('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook" accesskey="b" class="wikia-button" id="skinChangeButton" data-id="monobookbutton">Monobook</a>');
	//Monobook buttons
	$('#p-cactions .pBody ul li:nth-last-child(1)').after('<li id="ca-nstab-main" class="skinChangeTab" style="margin:0 3px 0 36px"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li>');
}
addOnloadHook(CreateSkinChangeButtons);

// END MW GADGET
// </nowiki>