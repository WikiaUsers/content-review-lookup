//<source lang="javascript">
/**
 * 
 * Add Interwiki easily and quick. 
 * @author: [[w:User:BlackZetsu]]
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
				alert("정상적으로 추가되었습니다!");
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
			var html = '<form>언어:<br><input type="text" id="lang"><br>요약:<br><input type="text" id="summary" placeholder="인터위키 추가"><br>문서명:<br><input type="teste" id="page"></form>';
			$.showCustomModal('QuickIW', html, {
				id: "modal",
				width: 250,
				buttons: [{
					message: "추가",
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