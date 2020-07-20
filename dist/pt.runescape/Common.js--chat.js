/* <pre> */
// ============================================================
// Função: Publicitar o [[Special:Chat]]
// ============================================================

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.ChatModule');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>Agora podes <a href='http://pt.runescape.wikia.com/wiki/Special:Chat' id='chatjs'>conversar</a> com outros editores! Sente-te livre de parar um pouco e experimentar o chat.<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://pt.runescape.wikia.com/wiki/Special:Chat' id='chatjs'><img src='https://images.wikia.nocookie.net/__cb20101110015943/runescape/images/7/7e/Windows_client_icon.png' alt='Chat' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}

        $("#chatjs").click(function() {
                window.open('/wiki/Especial:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
 
                return false;
 
        });
 
});
 
/* </pre> */