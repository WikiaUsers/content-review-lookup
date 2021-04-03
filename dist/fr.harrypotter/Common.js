//=================================================================================================
//
//                                              ICÔNES
//
//=================================================================================================

// Adds icons to page header.
// By The 888th Avatar (from avatar.wikia.com) 

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.3em', 'z-index' : 'initial'});
	}
});

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
//                                             USERTAGS
//
//=================================================================================================

// Affiche plusieurs titres sur les pages utilisateur.

window.UserTagsJS = {
		modules: {},
		tags: {
			sysop: { u: 'Professeur', link:'Project:Administrateurs' },
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
//                                   BEGIN Dynamic Navigation Bars
//
//================================================================================================= 
 /** Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
  */
 
 var hasClass = (function () {
 	var reCache = {};
 	return function (element, className) {
 		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
 };
 })();

// set up the words in your language
var NavigationBarHide = '▲ Enrouler';
var NavigationBarShow = '▼ Dérouler';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 0;
 
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
	var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
	var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
	var NavChild;
 
	if (!NavFrame || !NavToggle) {
		return false;
	}
 
	// if shown now
	if (NavToggle.firstChild.data == NavigationBarHide) {
		for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
			if (NavChild.className == 'NavPic') {
				NavChild.style.display = 'none';
			}
			if (NavChild.className == 'NavContent') {
				NavChild.style.display = 'none';
			}
			if (NavChild.className == 'NavToggle') {
				NavChild.firstChild.data = NavigationBarShow;
			}
		}
 
	// if hidden now
	} else if (NavToggle.firstChild.data == NavigationBarShow) {
		for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
			if (NavChild.className == 'NavPic') {
				NavChild.style.display = 'block';
			}
			if (NavChild.className == 'NavContent') {
				NavChild.style.display = 'block';
			}
			if (NavChild.className == 'NavToggle') {
				NavChild.firstChild.data = NavigationBarHide;
			}
		}
	}
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
	var indexNavigationBar = 0,
		NavFrame;
	// iterate over all <div>-elements
	for( var i = 0, divElt = document.getElementsByTagName("div"); i < divElt.length; i++ ) {
		NavFrame = divElt[i];
		
		// if found a navigation bar
		if (NavFrame.className == "NavFrame") {
 
			indexNavigationBar++;
			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
			var NavToggleText = document.createTextNode(NavigationBarHide);
			NavToggle.appendChild(NavToggleText);
 
			// add NavToggle-Button as first div-element 
			// in <div class="NavFrame">
			NavFrame.insertBefore(
				NavToggle,
				NavFrame.firstChild
			);
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
	}
	// if more Navigation Bars found than Default: hide all
	if (NavigationBarShowDefault < indexNavigationBar) {
		for( var j = 1; j <= indexNavigationBar; j++ ) {
			toggleNavigationBar(j);
		}
	}
 
}

if (document.readyState === 'loading') {
	$(createNavigationBarToggleButton);
} else {
	createNavigationBarToggleButton();
}

 
// END Dynamic Navigation Bars
// ============================================================


//=================================================================================================
//
//                                        BOÎTES DÉROULANTES
//
//=================================================================================================

// Pour [[Modèle:Méta palette de navigation]]

var autoCollapse = 2;
var collapseCaption = '[Reducio]';
var expandCaption = '[Amplificatum]';
 
function collapseTable( tableIndex ) {
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );
  if ( !Table || !Button ) return false;
 
  var Rows = Table.getElementsByTagName( "tr" ); 
 
  if ( Button.firstChild.data == collapseCaption ) {
	for ( var i = 1; i < Rows.length; i++ ) {
		Rows[i].style.display = "none";
	}
	Button.firstChild.data = expandCaption;
  } else {
	for ( var i = 1; i < Rows.length; i++ ) {
		Rows[i].style.display = Rows[0].style.display;
	}
	Button.firstChild.data = collapseCaption;
  }
}
 
function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( "table" );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], "collapsible" ) ) {
			NavigationBoxes[ tableIndex ] = Tables[i];
			Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
			var Button     = document.createElement( "span" );
			var ButtonLink = document.createElement( "a" );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.style.styleFloat = "right";
			Button.style.cssFloat = "right";
			Button.style.fontWeight = "normal";
			Button.style.textAlign = "right";
			Button.style.width = "7em";
 
			ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
			ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( ButtonLink );
 
			var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
			/* only add button and increment count if there is a header row to work with */
			if (Header) {
				Header.insertBefore( Button, Header.childNodes[0] );
				tableIndex++;
	  		}
		}
	}
 
	for (var j = 0; j < tableIndex; j++) {
		if ( hasClass( NavigationBoxes[j], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) collapseTable( j );
  	}
}

if (document.readyState === 'loading') {
    $(createCollapseButtons);
} else {
    createCollapseButtons();
}

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
//                                             TWITTER
//
//=================================================================================================

//'u:dev:TwitterWidget/code.js'

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

if (mw.config.get("wgPageName") === "Utilisateur:Hulothe") {
	var avatar = document.getElementsByClassName("avatar")[1];
	avatar.setAttribute("src", "https://images.wikia.nocookie.net/__cb20140821143758/harrypotter/fr/images/1/19/Avatar_Hulothe.png");
}

/* Modifs Hulothe activité récente */
$(document).ready(function() {
	$('.rcoptions a:nth-child(19)').before('<span><a class="rc-rmv-btn" style="text-decoration: none; color: #6b979c">Afficher</a><a class="rc-rmv-btn" style="display: none; text-decoration: none; color: #6b979c">Masquer</a> les modifs d\'Hulothe • </span>');
	$("a.rc-rmv-btn").hover(function() {
		$(this).css({ "text-decoration": "underline", "cursor": "pointer" });
	});
	$('.rc-rmv-btn').click(function() {
		$(".rc-rmvd").toggle();
		$(".rc-rmv-btn").toggle();
	});
	$("div.rc-conntent table.mw-enhanced-rc").each(function() {
		var mdfHltRc = $( this ).find( "tbody tr td a.mw-userlink" );
		var mdfHltRct = mdfHltRc.text();
		if(mdfHltRct.match( 'Hulothe' )) {
			$(this).hide();
			$(this).addClass( 'rc-rmvd' );
		}
	});
});

$( ".accueil-parts .partbox" ).hover(
	function() {
		$( this ).addClass( "partboxsel" );
		$( ".partboxselp" ).css('background', '').css('opacity', '0.5');
		$( ".partinfo" ).html( $( this ).find( "span:last" ).text() );
	}, function() {
		$( ".partinfo" ).html( "Venez parcourir les couloirs de Poudlard avec la communauté de la Pensine&nbsp;!" );
		$( this ).removeClass( "partboxsel" );
		$( ".partboxselp" ).css('background', 'rgba( 255, 0, 0, 0.1)').css('opacity', '1');
	}
);

//=================================================================================================
//
//                                         IMPORT D'ARTICLES
//
//=================================================================================================

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:ReferencePopups/code.js',
		'u:dev:MediaWiki:DynamicImages/code.js',
		'u:dev:MediaWiki:ExtendedNavigation/code.js',
		'u:dev:MediaWiki:UserTags/code.js',
		'u:dev:MediaWiki:Standard_Edit_Summary/code.js',
		'u:dev:MediaWiki:TopEditors/code.js',
		'u:dev:MediaWiki:EditcountTag/code.js',
		'u:dev:MediaWiki:ListUsers/code.js',
		'MediaWiki:userRightsIcons.js',
		'u:dev:MediaWiki:FileUsageAuto-update/code.js',
		'u:dev:MediaWiki:Countdown/code.js',
	]
});

//=================================================================================================
//                                         BOUTON "Aller en haut/bas"
//=================================================================================================
$(function() {
	$('#WikiaBar').before('<div id="TopBottom"/>');
	$(window).on('scroll', function() {
		if (window.pageYOffset === 0) {
			$('#TopBottom').closest('div').fadeIn();
		}
	});
	$('#TopBottom').on('click', function() {
		iPosition = $(window).scrollTop();
 
		if (iPosition === 0) {
			$(document).scrollTop($( document ).height());
		}
		else{
			$(document).scrollTop('iPosition');
		}		
    });
});

$(document).scroll(function() {
	iPosition = $(window).scrollTop();
 
	if (iPosition > 0) {
		$('#TopBottom').addClass('Bottom');
	}
	else{
		$('#TopBottom').removeClass('Bottom');
	}
});