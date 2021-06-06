/**
 * Displays the options window
 */
function openOptions() {
	// TODO: Kill this with fire? There has to be a better way to do this - perhaps use $.showModal
	var $optionsWindowHTML = $.showCustomModal( "Options", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Couleurs générales</p><p style="font-size:80%;">Entrez un <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">nom de couleur</a> ou son <a href="http://html-color-codes.info/" target="_blank">code hexadécimal</a><p>Fond du tchat&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Fond de ses propres messages&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Contour&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Police d\'écriture</p><p>Police <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p>Couleur de police&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Fonctionnalités additionnelles</p><input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Activer les <a href="http://fr.sims.wikia.com/wiki/MediaWiki:Chat.js/MultiPM.js" target="_blank">discussions privées de groupe</a><br/><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Ne plus afficher la barre de défilement horizontale en cas de spam</fieldset></form>', {
		id: "optionsWindow",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Annuler",
		    handler: function () {
				cancelChanges();
		    }
		},
		{
			id: "updateCookie",
			defaultButton: true,
			message: "Enregistrer",
			handler: function () {
				updateCookie();
		    }
	    }
		]
	});
	$(".close").click(cancelChanges);
	// Check if various modules have been enabled by the user, and check their boxes if so
	if (chatOptions.modules.chatHacks.enabled)
		$("#chatHacks").attr("checked",true);
	if (chatOptions.modules.multiPM.enabled)
		$("#multiPM").attr("checked",true);
	if (chatOptions.modules.tabComplete.enabled)
		$("#tabComplete").attr("checked",true);
	if (chatOptions.modules.searchBar.enabled)
		$("#searchBar").attr("checked",true);
	if (chatOptions.modules.multiKick.enabled)
		$("#multiKick").attr("checked",true);
	if (chatOptions.modules.ignoreURL.enabled)
		$("#ignoreURL").attr("checked",true);
	if (chatOptions.modules.stopSideScroll.enabled)
		$("#stopSideScroll").attr("checked",true);
 
	if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontList").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}