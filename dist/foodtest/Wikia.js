// Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 
// Change chat description
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					chatDescInt.clearInterval();
				}
			}, 50);
		}
	});
}

//Testing space

if (wgPageName.indexOf("Special:MovePage/File:") != -1 || wgCanonicalNamespace == "File") {
$('input[name=wpLeaveRedirect]').attr('checked', false);
}

importScript('MediaWiki:CatRename.js');



 if (wgPageName.indexOf("Special:MovePage") != -1 && wgPageName.indexOf("File") != -1){
    $('input#wpNewTitleMain').after("<a class='wikia-button' onclick='$(\"input#wpNewTitleMain\").val(\"FANMADE \"+$(\"input#wpNewTitleMain\").val())' >Add \"FANMADE\"</a>");
  }