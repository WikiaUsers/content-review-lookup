//<source lang="javascript">
/**
 * 
 * Add Interwiki easily and quick. 
 * @author: [[w:User:BlackZetsu]] 
 * taken from dev.wikia.com
 * only changed the standard summary
 */
 
(function($, mw) {
	function addIW() {
		var page = $("#page").val() || mw.config.get("wgPageName"),
			lang = $("#lang").val(),
			summ = $("#summary").val() || $("#summary").attr('placeholder'),
			interwiki = "\n[[" + lang + ":" + page + "]]";
		$.post(mw.util.wikiScript("api"), {
			format: "json",
			action: "edit",
			summary: summ,
			title: mw.config.get("wgPageName"),
			appendtext: interwiki,
			token: mw.user.tokens.get("editToken"),
			success: function() {
				alert("Done!");
				$("#modal").closeModal();
				location.href += "?action=purge";
			}
		});
	}
 
	function addButton() {
		var $tools = $("#WikiaBar").find(".tools"),
		    $wikiabar = $("<li><a id=iw>Interwiki</a></li>");
		$tools.append($wikiabar);
		$("#iw").click(function() {
			var html = '<form>Language:<br><input type="text" id="lang"><br>Summary:<br><input type="text" id="summary" placeholder="+Interwiki"><br>Page:<br><input type="teste" id="page"></form>';
			$.showCustomModal('QuickIW', html, {
				id: "modal",
				width: 250,
				buttons: [{
					message: "AddIW",
					handler: function() {
						addIW();
					}
				}]
			});
		});
	}
 
	if (mw.config.get("skin") == "oasis") {
		$(addButton);
	}
 
}(jQuery, mediaWiki));
//</source>