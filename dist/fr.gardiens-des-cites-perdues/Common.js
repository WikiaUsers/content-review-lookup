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
 
function substUsername() {
        $('.insertusername').text('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + mw.config.get('wgUserName') + '</a>');
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
$(function() { $('.insertusername').text(mw.config.get('wgUserName'))});

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

// Retrait des [GDCP] dans les sommaires

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

/*** Discord ***/
mw.hook('wikipage.content').add(function($content) {
    if (!mw.util.$content) {
        return;
    }
    mw.util.$content.find('.dchat').each(function() {
        var $this = $(this),
            widget = true,
            css = {
                width: '100%',
                height: '800',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://e.widgetbot.io/channels/719085354514251877/719215577994100766',
                css: css
            })
        );
    });
});

/*** Discuter avec Messenger sur Messeger ([[Spécial:ShannonMessenger]]) ***/
;(function($, mw){
    if (mw.config.get('wgPageName') != "Spécial:ShannonMessenger" && mw.config.get('wgPageName') != "Special:ShannonMessenger") {
        return;
    }

    var data = {
  "RANDOM1": {
  	"initial": "Oh, bonjour chers lecteurs ! Sachez que je vous Keefe ! (Keefe, Kiffe... bon je retourne écrire moi.)",
  	"options": [],
  	"response": []
  },
  "RANDOM2": {
  	"initial": "Pourquoi l'impératrice Pernille ne joue pas aux jeux vidéos ? Parce qu'elle n'arrête pas de troller tout le monde !",
  	"options": [],
  	"response": []
  },
  "RANDOM3": {
  	"initial": "Saviez-vous que Sandor avait été viré de son travail de cuisinier ? En effet, à chaque fois qu'il sortait un ingrédient du placard, il le gob-elin-ait !",
  	"options": [],
  	"response": []
  },
  "RANDOM4": {
  	"initial": "Saviez-vous que Sandor avait été viré de son travail de cuisinier ? En effet, à chaque fois qu'il sortait un ingrédient du placard, il le gob-elin-ait !",
  	"options": [],
  	"response": []
  },
  "RANDOM5": {
  	"initial": "Pourquoi dit-on que les elfes sont suisses ? Parce qu'ils font partie de la confédération elf-étique !",
  	"options": [],
  	"response": []
  },
  "RANDOM6": {
  	"initial": "Que fait Verdi quand il n'arrive pas à choisir ce qu'il va manger ? Un tirajosaure",
  	"options": [],
  	"response": []
  },
  "RANDOM7": {
  	"initial": "Oh non, la porte du sanctuaire est cassée ! Comment la réparer ? Ah, je sais : utilisons une argenta-visse !",
  	"options": [],
  	"response": []
  },
  "RANDOM8": {
  	"initial": "Arrêter d'écrire les Gardiens des Cités Perdues ?! Ah sha non !",
  	"options": [],
  	"response": []
  },
  "RANDOM9": {
  	"initial": "Quelle chanson de Dalida les lutins adorent-ils par dessus tout ? Iggy l'amoroso !",
  	"options": [],
  	"response": []
  },
  "RANDOM10": {
    "initial": "Je vis avec plein de chats chez moi. En même temps, c’est logique, il y a « Sha » dans mon prénom !",
    "options": [],
    "response": []
  },
  "RANDOM11": {
    "initial": "Voulez-vous que je vous apprenne à écrire un article ?",
    "options": [
      "Oui ! ",
      "Non."
    ],
    "response": [
      "Alors demandez à l’équipe administrative, ou lisez <a href='https://gdcp.fandom.com/fr/Aide:Contribuer_sur_le_wiki'>ce truc</a> Pour savoir comment faire ! Attendez, vous croyiez vraiment que j’allais vous l’expliquer moi-même ?",
      "Bon ben au revoir alors !"
    ]
  },
  "RANDOM12": {
    "initial": "Avez-vous entendu parler du tome 11, qui sort l’année prochaine ?",
    "options": [
      "Bien sûr !"
    ],
    "response": [
      "Incroyable, parce que je suis la dame qui écrit cette série, et je n’en ai jamais entendu parler !",
    ]
  },
  "RANDOM13": {
    "initial": "Saviez-vous que le tome 10 sort en automne prochain ?",
    "options": [
      "J’ai hâte !"
    ],
    "response": [
      "Poisson d’avril haha, il sort en 2039 !",
    ]
  },
  "RANDOM14": {
    "initial": "Saviez-vous qu’il y a trois emojis à mon effigie sur le <a href='https://dsc.gg/wikigdcp'>Discord du wiki</a> ? Ils doivent vraiment m’adorer ! ",
    "options": [],
    "response": []
  },
  "RANDOM15": {
    "initial": "Dis, tu me trouves sympa ?",
    "options": [
    	"T’es ma BFF, Shannon"
    ],
    "response": [
    	"Wow, merci beaucoup ! Tiens, <a href='https://gdcp.fandom.com/fr/Spécial:Ma_page?action=edit&preload=Modèle:Cadeau_Shannon&section=new'>voici un cadeau</a> pour te remercier !"
    ]
  },
  "RANDOM16": {
  	"initial": "Toc toc",
  	"options": [
  		"Qui est là ?"
  	],
  	"response": [
  		"Pas le tome 10 en tout cas !"
  	]
  },
  "RANDOM17": {
  	"initial": "Connais-tu l'histoire de l'elfe qui faisait un saut lumineux ?",
  	"options": [
  		"Non"
  	],
  	"response": [
  		"Trop tard, il est parti !"
  	]
  },
  "RANDOM18": {
  	"initial": "Tu aimes les paillettes ?",
  	"options": [
  		"Oui",
  		"Non"
  	],
  	"response": [
  		"Oh moi aussi, j'adore ! Faisons un club !",
  		"Tu as tort, les paillettes c'est la vie !"
  	]
  },
  "RANDOM19": {
  	"initial": "Toc toc",
  	"options": [
  		"Qui est là ?"
  	],
  	"response": [
  		"Encore un nouveau tome dans 18 mois !"
  	]
  }
}
    var pagename = mw.config.get('wgTitle');
    var namespace = mw.config.get('wgCanonicalNamespace');
    var categories = mw.config.get('wgCategories');
    var conversation = null;
        var key = "RANDOM" + (Math.floor(Math.random() * 19) + 1);
        conversation = data[key];
    
    var $div = $("<div id=\"full-shannon\"><div id=\"shannon-speech\"><div id=\"message-container-pos\"><div id=\"commencer-bas\"><div id=\"full-message-container\"><div id=\"shannon-speech-texte\"></div></div></div></div></div><div id=\"shannon-image-pos\"><div id=\"shannon-image-container\"><div id=\"shannon-image\"></div></div></div></div>");
    var $buttons = $("<div id=\"shannon-speech-boutons\" style=\"font-family: Rubik;font-size: 14px;position: relative;text-align: center;border-top: 1px solid #C2C2C2;bottom: 0;margin: 7px 7px 10px 7px\"></div>");
    var $button = $("<button class=\"shannon-bouton\" style=\"background-color: #fff;border: 1px solid #C2C2C2;border-radius: 3px;padding: 5px 12px;margin: 10px 5px 0 5px\">No</button>");
    mw.log(conversation.initial);
    var $contentContainer = $('#content'),
	$pageTitle = $('.page-header__title');
	$contentContainer.empty();
	$pageTitle.text("Discuter avec Messenger sur Messenger");
	$contentContainer.append($div);
    $("#shannon-speech-texte").html(conversation.initial);
    if (conversation.options.length > 0) {
        $("#shannon-speech-texte").after($buttons);
    }
    var onClick = function(event) {
        $("#shannon-speech-texte").html($(event.target).attr('data-response'));
        $("#shannon-speech-boutons").remove();
    }
    for (var i = 0; i < conversation.options.length; i++) {
        var butt = $button.clone();
        butt.text(conversation.options[i]);
        butt.attr("data-response", conversation.response[i]);
        butt.click(onClick);
        $("#shannon-speech-boutons").append(butt);
    }
})(jQuery, mw);