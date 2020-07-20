/* Mensaje */
var WikiaNotificationMessage = "¿Qué tanto conoces sobre las <a href='/wiki/Bio_Organic_Weapon_(B.O.W.)'>B.O.W.s</a>?";
var WikiaNotificationexpiry = 31;

// WikiActivity & RecentChanges
AjaxRCRefreshText = 'Actualización Automática';
AjaxRCRefreshHoverText = 'Refrescar la página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

// **************************************************
//  START import coding
// **************************************************
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:Digital_Clock/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:DISPLAYTITLE/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'MediaWiki:Gadget-QuizQ.js',        
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        // 'u:dev:WikiaNotification/code.js',
    ]
});

function moveArticletypeDiv() {
    var fooel = document.getElementById('ma-article-type');
    if (fooel != null) {
        var artel = document.getElementById('article');
        var wphel = document.getElementById('WikiaPageHeader');
        var titel = document.getElementById('top');
        fooel = fooel.parentNode.removeChild(fooel);
        if (artel != null) {
            artel.parentNode.insertBefore(fooel, artel);
        } else if (wphel != null) {
            wphel.parentNode.insertBefore(fooel, wphel);
        } else {
            //fall back to a position before H1 - useful for monobook skin
            titel.parentNode.insertBefore(fooel, titel);
        }
    }
}

hookEvent("load", moveArticletypeDiv);

// **************************************************
// BOTONES ADICIONALES - Para página de edición
// **************************************************

if (typeof (mwCustomEditButtons) != 'undefined') {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
            "speedTip": "Código fuente",
            "tagOpen": "<code><nowiki>",
            "tagClose": "</" + "nowiki></code>",
            "sampleText": "Código fuente"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
            "speedTip": "Plantillas",
            "tagOpen": "{{",
            "tagClose": "}}",
            "sampleText": "Plantilla"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
            "speedTip": "Enlace a usuario",
            "tagOpen": "[[user:",
            "tagClose": "|]]",
            "sampleText": "Usuario"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
            "speedTip": "Categoría",
            "tagOpen": "[[Category:",
            "tagClose": "]]",
            "sampleText": "Nombre categoría"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
            "speedTip": "Insertar tabla",
            "tagOpen": '{| {' + '{tablabonita|alineacion=col1izq col2cen col3der|}}\n|-\n',
            "tagClose": "\n|}",
            "sampleText": "!| encabezado 1\n!| encabezado 2\n!| encabezado 3\n|-\n|| fila 1, columna 1\n|| fila 1, columna 2\n|| fila 1, columna 3\n|-\n|| fila 2, columna 1\n|| fila 2, columna 2\n|| fila 2, columna 3"
    };
}
// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:170px; top:-2px; border:none;"><button style=" font-size: 97%; height: 17px; line-height: 16px;" type="button" value="Volver Arriba" onClick="goToTop();">Volver Arriba</button></li>').appendTo('#WikiaBarWrapper .toolbar > ul.tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
// **************************************************
//  Fin - BackToTopButton
// **************************************************