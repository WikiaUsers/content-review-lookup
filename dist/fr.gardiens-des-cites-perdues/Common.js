/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/***** Customisation *****/
/*** AddRailModule (Dev Wiki) ***/
window.AddRailModule = [{prepend: true}];

/*** Modification de la page d'import de fichier ***/
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

/*** Tchat ***/

mw.hook('wikipage.content').add(function($content) {
    $content.find('#tchat').each(function() {
        var $this = $(this);
        $this.html($('<iframe>', {
            src: 'https://webchat.freenode.net/#wiki_gdcp',
            width:  $this.attr('data-width') || 450,
            height: $this.attr('data-height') || 500
        }));
    });
});

/*** Forcer le favicon à s'afficher lors de bugs ***/

(function () {
 // Remettre le favicon s'il n'est pas chargé
 var headTitle = document.querySelector('head'), 
  favIcons = [{ rel: 'apple-touch-icon' }, { rel: 'apple-touch-startup-image' }, { rel: 'shortcut icon' }];
 favIcons.forEach(function (favIcon) {
    var setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel', favIcon.rel);
    setFavicon.setAttribute('href', 'https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/6/64/Favicon.ico/revision/latest?cb=20201126084739&path-prefix=fr');
    headTitle.appendChild(setFavicon);
 });
 //headTitle.appendChild(setFavicon);
})();

/***** Modèles *****/

/*** USERNAME ***/
 
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

/*** Slider ***/

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

// Retrait des [GDCP] dans les sommaires – par Ninofr

$(function () {
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
});
/*** Module de progression ***/
setTimeout(function () {
  document.querySelectorAll('.progressmodifs').forEach(function (item) {
    var modifs = parseInt(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', '')),
      palier;
      console.log(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', ''));
    if (modifs < 20) {
      palier = 20;
    } else if (modifs < 50) {
      palier = 50;
    } else if (modifs < 100) {
      palier = 100;
    } else if (modifs < 200) {
      palier = 200;
    } else if (modifs < 350) {
      palier = 350;
    } else if (modifs < 500) {
      palier = 500;
    } else if (modifs < 750) {
      palier = 750;
    } else if (modifs < 1000) {
      palier = 1000;
    } else if (modifs < 1500) {
      palier = 1500;
    } else if (modifs < 2000) {
      palier = 2000;
    } else if (modifs < 2500) {
      palier = 2500;
    } else if (modifs < 3000) {
      palier = 3000;
    } else if (modifs < 4000) {
      palier = 4000;
    } else {
      palier = 10000;
    }
    var calc = (modifs / palier) * 100,
      color;
    if (calc <= 25) {
      color = 'red';
    } else if (calc <= 50) {
      color = 'orange';
    } else if (calc <= 75) {
      color = 'yellow';
    } else {
      color = 'green';
    }
    item.innerHTML =
      '<center>' +
      Math.round(calc) +
      '% de ' +
      palier +
      '</center>\n<center><div style="width: 75%; height: 20px; background-image: linear-gradient(to right, ' +
      color +
      ' ' +
      calc +
      '%, #FFF 0%); border: 3px solid #3A3A3A"></div></center>';
  });
}, 5000);