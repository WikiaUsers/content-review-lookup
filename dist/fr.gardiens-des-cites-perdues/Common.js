/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/** Modèles **/
/// Modèle 'Username'
 
// Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
// Requiert de copier {{USERNAME}}.
 
function substUsername() {
        $('.insertusername').text('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + wgUserName + '</a>');
        $('.insertusername:hover').css('text-decoration', 'none');
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').text(wgUserName); });

/// Customisation

// Imports

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:UserTags/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
    ]
});

// AddRailModule (Dev Wiki)

window.AddRailModule = [{prepend: true}];

// SLIDER

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});
//Retrait des [GDCP] dans les sommaires – par Ninofr

(function () {
  /**
   * @type {HTMLElement}
   */
  var LISTE = document.getElementById('toc');
  var content = String(LISTE.innerHTML);
  content = content
    .replace(
      /(?:<sup>)?\[(?:(?:GDCP\d)|(?:GDCP8\.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))[^\]]*\]?(?:<\/sup>)?/g,
      ''
    )
    .replace(
      /\[(?:(?:GDCP\d)|(?:GDCP8.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))\]/g,
      ''
    );
  document.getElementById('toc').innerHTML = content;
})();

// Modification de la page d'import de fichiers
$(function() {
	if (mw.config.get('wgPageName') != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|description=\r\n|licence=\r\n|source=\r\n|autre=}}");
	$('.mw-htmlform-field-HTMLTextAreaField .mw-input').append('<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="Tèxte en gras" title="Tèxte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="Tèxte en italica" title="Tèxte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam intèrne" title="Ligam intèrne" id="button-link" style="width: 23px; height: 22px;">');
	$('#button-italic').click(function() {
		richEditor("\'\'", "\'\'");
	});
	$('#button-bold').click(function() {
		richEditor("\'\'\'", "\'\'\'");
	});
	$('#button-link').click(function() {
		richEditor("[[", "]]");
	});

	function richEditor(primier, segond) {
		var textarea = document.getElementById("wpUploadDescription");
		if ('selectionStart' in textarea) {
			if (textarea.selectionStart != textarea.selectionEnd) {
				var newText = textarea.value.substring (0, textarea.selectionStart) + 
								primier + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + segond +
								textarea.value.substring (textarea.selectionEnd);
				textarea.value = newText;
			}
		}
		else {
			var textRange = document.selection.createRange ();
			var rangeParent = textRange.parentElement ();
			if (rangeParent === textarea) {
				textRange.text = primier + textRange.text + segond;
			}
		}
	}
});
// Kiwi IRC
mw.hook('wikipage.content').add(function($content) {
    $content.find('#JRChatReplace').each(function() {
        var $this = $(this);
        $this.html($('<iframe>', {
            src: 'https://webchat.freenode.net/#' + encodeURIComponent($this.attr('data-channels')),
            width:  $this.attr('data-width') || 450,
            height: $this.attr('data-height') || 500
        }));
    });
});