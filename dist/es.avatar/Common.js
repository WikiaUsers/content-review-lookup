// Import ReferencesPopUp 
importScriptPage('ReferencePopups/code.js', 'dev');
// Fin Import

// Discord
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'VeUywyy',
    prependToRail: true
};

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"MediaWiki:Common.js/insertusername.js", /* Nombre de usuario reemplazado por Plantilla:USERNAME */

	]
});

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */
 
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});

/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:Xiao Qiao]]
 */
 
if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Imagebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
if ( wgCanonicalSpecialPageName == "MultipleUpload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Imagebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

/* Adds buttons for one-click deletions with delete summary included
 * See w:c:dev:FastDelete for info & attribution 
 */

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Vandalismo',
  'label': 'V'};
fdButtons[fdButtons.length] = {
  'summary': 'Limpieza',
  'label': 'L'};


/* Añadir botones extra de edición */
if (mwCustomEditButtons) {
// <nowiki>
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/c/c8/Button_comment_round.png",
		"speedTip": "Insertar plantilla de cita",
		"tagOpen": "{{Cita|<nacionalidad>|<cita>|<vocero> <cuando>}} ",
		"tagClose": "",
		"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insertar plantilla de personaje",
     "tagOpen": "{{Personaje infobox\n| nación          = ",
     "tagClose": "\n| imagen          = \n| nombre          = \n| nombrealter     = \n| nacionalidad    = \n| etnia           = \n| edad            = \n| nacimiento      = \n| muerte          = \n| reinado         = \n| pred            = \n| suces           = \n| género          = \n| cabello         = \n| ojos            = \n| colordepiel     = \n| interesamoroso  = \n| aliados         = \n| enemigos        = \n| arma            = \n| estilodepelea   = \n| profesión       = \n| posición        = \n| afiliación      = \n| aparición       = \n| últimaapar      = \n| voz original    = \n| voz de doblaje  = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "A favor",
		"tagOpen": "{{Afavor}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "En contra",
		"tagOpen": "{{Encontra}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insertar Plantilla:Imagebox",
		"tagOpen": "\{\{Imagebox\r| descripción = ",
		"tagClose": "\r| película    = \r| series      = \r| temporada   = \r| episodio    = \r| fuente      = \r| origen      = \r| cats        = \r| licencia    = \r\}\}",
		"sampleText": ""};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
		"speedTip": "Proponer que el artículo sea borrado",
		"tagOpen": "{{Borrar|Motivo}} ",
		"tagClose": "",
		"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
		"speedTip": "Insertar aviso de en construcción",
		"tagOpen": "{{Construyendo|Usuario}} ",
		"tagClose": "",
		"sampleText": ""};
// </nowiki>
}

/*** Añadir botón para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


// Etiqueta Inactivo
InactiveUsers = { text: 'Congelado en el Iceberg' };
importScriptPage('InactiveUsers/code.js', 'dev');

/* Wikia Side Rail Social Icons
 * By: [[Madnessfan34537]]
 */
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/avatarwikies"><img src="https://images.wikia.nocookie.net/testshenanigans/images/f/f4/Bot%C3%B3nFacebook.png"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}

/**
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {
 
	if( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	var	summaryOptionsHtml = '',
		$summaryOptionsList,
		$summaryLabel = $( '#wpSummaryLabel' );
 
	$.get( wgScript, { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			summaryOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).html( summaryOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				if( skin === 'oasis' ) {
					$( '#wpSummary' ).val( value ); //$( '#wpSummary' ).text( value );
				} else {
					$( '#wpSummary' ).val( value );
				}
			}
		} );
 
		$summaryLabel.prepend( 'Resúmenes estándares: ', $summaryOptionsList, '<br />' );
	} );
 
}
addOnloadHook(fillEditSummaries);