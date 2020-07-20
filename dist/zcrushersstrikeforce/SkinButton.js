

 /* skin change buttons */
 function CreateSkinChangeButtons() {
 	//Oasis buttons
 	$('div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook" accesskey="b" class="wikia-button secondary" id="skinChangeButton" data-id="monobookbutton">Monobook</a><a style="margin:0 42px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector" accesskey="v" class="wikia-button secondary" id="skinChangeButton" data-id="vectorbutton">Vector</a>');
 	//Monobook buttons
 	$('#p-cactions .pBody ul li:nth-last-child(1)').after('<li id="ca-nstab-main" class="skinChangeTab" style="margin:0 3px 0 36px"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li><li id="ca-nstab-main" class="skinChangeTab"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector [v]" id="skinChangeButton" accesskey="o">Vector</a></li>');
 }
 addOnloadHook(CreateSkinChangeButtons);