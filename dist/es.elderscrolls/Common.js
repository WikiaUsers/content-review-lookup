/* Botones extra de edición en modo fuente */

if (mwCustomEditButtons) {
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
		"speedTip": "Borrar",
		"tagOpen": "{{Borrar|",
                "tagClose": "}}",
                "sampleText": "Motivo"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
                "speedTip": "Código fuente",
                "tagOpen": "<code><nowiki>",
                "tagClose": "</" + "nowiki></code>",
                "sampleText": "código fuente"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20060601060125/inciclopedia/images/7/78/Bot%C3%B3n_Obras.png",
		"speedTip": "En obras",
                "tagOpen": "{{Enobras|",
                "tagClose": "}}",
                "sampleText": "usuario"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20060530050932/inciclopedia/images/b/b2/Bot%C3%B3n_esbozo.png",
                "speedTip": "Esbozo",
                "tagOpen": "{{",
                "tagClose": "}}",
                "sampleText": "esbozo"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
		"speedTip": "Spoiler",
		"tagOpen": "{{Spoiler",
		"tagClose": "}}",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20100619040208/inciclopedia/images/3/3d/Bot%C3%B3n_Arreglar.png",
		"speedTip": "Arreglar",
		"tagOpen": "{{Arreglar|",
                "tagClose": "}}",
                "sampleText": "razón"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
                 "speedTip": "Insertar comentario oculto",
                 "tagOpen": "<!-- ",
                 "tagClose": " -->",
                 "sampleText": "Comentario"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080111185919/central/images/f/f7/Button_comment1.png",
		"speedTip": "Nota",
		"tagOpen": "{{Nota|",
                "tagClose": "}}",
                "sampleText": "razón"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20080111190038/central/images/2/28/Button_info.png",
		"speedTip": "Ortografía",
		"tagOpen": "{{Ortografía",
		"tagClose": "}}",
		"sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
		"speedTip": "Desambiguación",
                "tagOpen": "{{Desambiguación",
                "tagClose": "}}",
                "sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20060530050420/inciclopedia/images/5/5c/Bot%C3%B3n_discusi%C3%B3n.png",
     "speedTip": "Cita",
     "tagOpen": "{{Cita|",
     "tagClose": "Cita= <--cita-->|Autor= <--autor-->|Fuente = <--fuente-->}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100626135844/inciclopedia/images/f/ff/Bot%C3%B3nFoto.png",
     "speedTip": "Falta imagen",
     "tagOpen": "{{Imagen",
     "tagClose": "}}",
     "sampleText": ""};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c8/Button_redirect.png",
     "speedTip": "Redirección",
      "tagOpen": "#REDIRECCIÓN [[",
     "tagClose": "]]",
     "sampleText": "Inserta texto"};
 
 }

/* Imports */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog se considera archivado ya que no ha sido comentado en más de <expiryDays> días, por favor no añadas más comentarios.",
    nonexpiryCategory: "Noticias"
};

window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Este foro se considera archivado ya que no ha sido comentado en más de <expiryDays> días, por favor no añadas más comentarios.",
    forumName: "Índice" 
};

importArticles({
    type: "script",
    articles: [
        'w:c:dev:BackToTopButton/es/code.js',
        'w:c:dev:LockForums/code.js',
        'w:c:dev:LockOldBlogs/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:SearchSuggest/code.js'
    ]
});

(function( $ ) {
	"use strict";
	var title_text;
	$( '.pi-theme-libro1 .pi-header' ).each( function() {	
		title_text = $( this ).text();
		switch( title_text ) {
            case 'Online':
                $( this ).addClass( 'online' );
				break;
			case 'Skyrim':
				$( this ).addClass( 'skyrim' );
				break;
			case 'Dragonborn':
				$( this ).addClass( 'dragonborn' );
				break;
			case 'Dawnguard':
                $( this ).addClass( 'dawnguard' );
                break;
			case 'Oblivion':
                $( this ).addClass( 'oblivion' );
                break;
            case 'Shivering Isles':
                $( this ).addClass( 'shiveringIsles' );
                break;
			case 'Morrowind': 
				$( this ).addClass( 'morrowind' );
				break;
			case 'Bloodmoon':
                $( this ).addClass( 'bloodmoon' );
                break;
            case 'Tribunal':
                $( this ).addClass( 'tribunal' );
                break;
        	case 'Daggerfall':
				$( this ).addClass( 'daggerfall' );
				break;
			default:
				return;
		}
	});
})( this.jQuery );