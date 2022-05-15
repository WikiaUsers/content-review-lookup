//=================================================================================================
//
//                                             SUBLIST
//
//=================================================================================================

// Generates a list of subpages
// By Penguin-Pal

/* dependency for template:SubList; Idea:Love Robin, custom code by Penguin-Pal */
$(".prefixindex-custom").each(function() {
	// custom css
	mw.util.addCSS(
		'/* upper-roman */\n' +
		'nav.toc.prefixindex-custom-toc-upper-roman li:before {\n' +
			'\tcontent: counters(item,".", upper-roman) " ";\n' +
		'}\n' +
		'/* lower-roman */\n' +
		'nav.toc.prefixindex-custom-toc-lower-roman li:before {\n' +
			'\tcontent: counters(item,".", lower-roman) " ";\n' +
		'}\n' +
		'/* lower-alpha */\n' +
		'nav.toc.prefixindex-custom-toc-lower-alpha li:before {\n' +
			'\tcontent: counters(item,".", lower-alpha) " ";\n' +
		'}\n' +
		'/* upper-alpha */\n' +
		'nav.toc.prefixindex-custom-toc-upper-alpha li:before {\n' +
			'\tcontent: counters(item,".", upper-alpha) " ";\n' +
		'}\n' +
		'/* square */\n' +
		'nav.toc.prefixindex-custom-toc-square li:before {\n' +
			'\tcontent: "\\25A0\\0020\\0020";\n' +
			'\tfont-size: 10px;\n' +
			'\tvertical-align: top;\n' +
		'}\n' +
		'/* none */\n' +
		'nav.toc.prefixindex-custom-toc-none li:before {\n' +
			'\tcontent: " ";\n' +
		'}'
	);
	// function t based on http://stackoverflow.com/questions/4549894/how-can-i-repeat-strings-in-javascript#answer-4549907
	function t(s, t) {
		return new Array(t + 1).join(s);
	}
	// list() from wiki2html, http://remysharp.com/2008/04/01/wiki-to-html-using-javascript/
	function list(str) {
		return str.replace(/(?:(?:(?:^|\n)[\*#].*)+)/g, function (m) {  // (?=[\*#])
			var type = m.match(/(^|\n)#/) ? 'ol' : 'ul';
			// strip first layer of list
			m = m.replace(/(^|\n)[\*#][ ]{0,1}/g, "$1");
			m = list(m);
			return '<' + type + '><li>' + m.replace(/^\n/, '').split(/\n/).join('</li><li>') + '</li></' + type + '>';
		});
	}
	if ($(this).next().attr("id") == "mw-prefixindex-list-table" && $(this).next()[0].nodeName.toLowerCase() == "table") {
		var a = $(this).next().find("a"), // links
			b = [], // raw output
			c = ""; // final output
		for (var i = 0; i < a.length; i++) {
			var href = $(a[i]).attr("href").substr(6); // current link target
			b.push(
				t("#", href.split("/").length - 1) + // give an index for the sub list - 1 is the first sub level
				" " +
				a[i].outerHTML
			);
			if (i + 1 == a.length) {
				var d = $(list(b.join("\n")));
				$(d).find("li").each(function(i) {
					$(this).addClass(
						"toclevel-" + (
							($(this).parents().length - 1) / 2 + 1
						)
					);
				});
				// add custom listing systems
				if ($(this).attr("data-list").length > 0) {
					switch ($(this).attr("data-list").toLowerCase()) {
						case "numbered":
							var piSort = "decimal";
							break;
						case "lower-alpha":
							var piSort = "lower-alpha";
							break;
						case "upper-alpha":
							var piSort = "upper-alpha";
							break;
						case "alpha":
							var piSort = "lower-alpha";
							break;
						case "upper-roman":
							var piSort = "upper-roman";
							break;
						case "lower-roman":
							var piSort = "lower-roman";
							break;
						case "roman":
							var piSort = "lower-roman";
							break;
						case "square":
							var piSort = "square";
							break;
						case "none":
							var piSort = "none";
							break;
						default:
							var piSort = "decimal";
					}
				}
				$(this).next().replaceWith('<nav class="prefixindex-custom-toc' + (piSort != "decimal" ? ' prefixindex-custom-toc-' + piSort : '') + ' toc show">\n<ol>\n' + $(d).html() + '\n</ul>\n</nav>');
				// now, only give the links their "Final" sub page name
				$(this).next().find("a").each(function() {
					if ($(this).html().indexOf("/") > -1) {
						$(this).html(
							$(this).html().split("/")[
								$(this).html().split("/").length - 1
							]
						);
					}
				});
			}
		}
	}
});

//=================================================================================================
//
//                                        BOÎTES DÉROULANTES
//
//=================================================================================================
/* Substitute Template:Information into upload page */
$(function() {
	if (mw.config.get('wgPageName') != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|Description=\r\n|Date=\r\n|Auteur=\r\n|Source=\r\n|Licence=\r\n|Et plus=\r\n}}");
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

//=================================================================================================
//
//                                             USERTAGS
//
//=================================================================================================

// Affiche plusieurs titres sur les pages utilisateur.

window.UserTagsJS = {
		modules: {},
		tags: {
			sysop: { u: 'Professeur', link:'Catégorie:Administrateur du Wiki Harry Potter' },
			rollback: { m: 'Préfet', f: 'Préfète', u: 'Préfet' },
			prefetenchef: { m: 'Préfet-en-chef', f: 'Préfète-en-chef', u: 'Préfet-en-chef', order:1 }
	},
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot', 'prefetenchef', 'util', 'voldev', 'helper'];

//=================================================================================================
//
//                                             USERNAME
//
//=================================================================================================

// Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
// Requiers de copier {{USERNAME}}.

function substUsername() {
	$('.insertusername').html('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + mw.config.get('wgUserName') + '</a>');
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
$(function() { $('.insertusername').html(wgUserName); });

//=================================================================================================
//
//                                         IMPORT D'ARTICLES
//
//=================================================================================================

importArticles({
	type: 'script',
	articles: [
        'MediaWiki:Common.js/Convertisseur.js', // Convertisseur argent des sorciers / euros
	]
});

//=================================================================================================
//
//                                            MAM (Mod.Adm.Mod.)
//
//=================================================================================================

var ug = mw.config.get('wgUserGroups').join(' ');
if (ug.indexOf('staff') + ug.indexOf('helper') + ug.indexOf('vstf') + ug.indexOf('sysop') > -4) {
	$("div.mam").addClass("mamadmin");
	$("div.mam").click(function(){ 
		$( this ).toggleClass("mamadmin2"); 
	}); 
}

$( ".accueil-parts .partbox" ).hover(
	function() {
		$( this ).addClass( "partboxsel" );
		$( ".partboxselp" ).css('background', '').css('opacity', '0.5');
		$( ".partinfo" ).html( $( this ).find( "span:last" ).text() );
	}, function() {
		$( ".partinfo" ).html( "Venez parcourir les couloirs de Poudlard avec nos partanires&nbsp;!" );
		$( this ).removeClass( "partboxsel" );
		$( ".partboxselp" ).css('background', 'rgba( 255, 0, 0, 0.1)').css('opacity', '1');
	}
);

//=================================================================================================
//                                            MassEdit
//=================================================================================================
window.MassEditConfig = {
  interval: 750,
  placement: {
    element: "toolbar",
    type: "append"
  }
};