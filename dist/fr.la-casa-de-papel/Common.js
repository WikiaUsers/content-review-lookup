/* MERCI DE DÉCRIRE À QUOI SERT CHAQUE LIGNE DE CE CODE ! */

/* Ceci sert au modèle {{USERNAME}}. */
$('.username').text(mw.config.get('wgUserName'));

$('#wpUploadDescription').text("[[Catégorie:Galerie");

/*Ceci sert à la barre d'outils de l'éditeur source*/
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/la-casa-de-papel/fr/images/b/b0/Infobox_Personnage.png",
		"speedTip": "Insérer le modèle {{Infobox Personnage}}",
		"tagOpen": "\{\{Infobox Personnage\r|Nom=",
		"tagClose": "\r|Image= \r|Caption= \r|Surnom(s)= \r|Sexe= \r|Naissance= \r|Mort= \r|Famille= \r|Occupation= \r|Affiliation= \r|Première= \r|Dernière= \r|Interprète= \r|Doubleur VF= \r|Galerie= \r\}\}",
		"sampleText": ""
	};
		
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/la-casa-de-papel/fr/images/1/1c/Button-gallery.png",
		"speedTip": "Insérer une galerie d'images",
		"tagOpen": "\<gallery>\r",
		"tagClose": "\r</gallery>",
		"sampleText": ""
	};
}

window.UserTagsJS = {
    modules: {},
    tags: {
        sysop: { 
            u: 'Braqueur Pro',
            f: 'Braqueuse Pro',
            link:'Project:Administrateurs'
        }
    }
};

/*Modèle Countdown*/
$(function(){
	importArticles({
		type: 'script',
		article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
	}, {
		type: 'style',
		article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
	});
});

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