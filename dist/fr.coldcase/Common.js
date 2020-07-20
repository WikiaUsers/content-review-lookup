/* MERCI DE DÉCRIRE À QUOI SERT CHAQUE LIGNE DE CE CODE ! */

/* Ceci sert au modèle {{USERNAME}}. */
$('.username').text(mw.config.get('wgUserName'));

$('#wpUploadDescription').text("[[Catégorie:Galerie");

 // **************************************************
 // Experimental javascript countdown timer (Splarka)
 // Version 0.0.3
 // **************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  Only <span class="countdowndate">January 01 2019 00:00:00 PST</span> until New Years.
 //  </span>
 //  <span class="nocountdown">Javascript disabled.</span>
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* ACTUALISATION AUTOMATIQUE */
window.ajaxPages = ["Spécial:WikiActivity","Special:Log","Spécial:Modifications_récentes"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto-Actualisation';
window.AjaxRCRefreshHoverText = 'Actualiser automatiquement la page';

//=================================================================================================
//
//                                             USERTAGS
//
//=================================================================================================
// Affiche plusieurs titres sur les pages utilisateur.
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {
            u:'Lieutenant',
            order: 1,
            link:'Wiki Cold Case:Staff',
            title:'Cet utilisateur est bureaucrate' 
        },
		sysop: { u: 'Inspecteur', f: 'Inspectrice', link:'Wiki Cold Case:Staff', title:'Cet utilisateur est administrateur', order: -1/0 },
		'council': { u: 'Consultant', f: 'Consultante', order:1 },
		blocked: { u: 'Incarcéré(e)' },
	}
};
UserTagsJS.modules.newuser = {
	days: 5, // est présent depuis moins de 5 jours
	edits: 10, // à fait moins de 10 édits
	namespace: 0 // Les édits doivent être faits sur des articles
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot', 'council', 'util', 'voldev', 'helper'];

            
/* MODÈLE COUNTDOWN */
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

/* USERNAME */
 
// Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
// Requiers de copier {{USERNAME}}.

function substUsername() {
        $('.insertusername').html('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + wgUserName + '</a>');
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
                elements[i].firstChild.nodeValue = elements
[i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').html(wgUserName); });

/* BOÎTES DÉROULANTES */

// Pour [[Modèle:Méta palette de navigation]]

var autoCollapse = 2;
var collapseCaption = '[masquer]';
var expandCaption = '[dérouler]';
 
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
 
  for (var i = 0; i < tableIndex; i++) {
    if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) collapseTable( i );
  }
}
addOnloadHook(createCollapseButtons);

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
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
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
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
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
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all <div>-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
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
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
}
 
addOnloadHook ( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars
// ============================================================

/* Substitute Template:Information into upload page */
$(function() {
	if (wgPageName != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("==Description==\r\n{{Fichier\r\n|Description=\r\n|Auteur=\r\n|Source=\r\n|Licence=\r\n|Et plus=\r\n}}");
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