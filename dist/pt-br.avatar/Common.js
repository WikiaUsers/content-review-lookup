/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/icones.js",
		
	]
});

// Create the "dev" namespace if it doesn't exist already:

window.dev = window.dev || {};

// Create the sub-namespace for this addon and set some options:

window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
};

// The options need to be set before the import! Otherwise they may not work.

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

addOnloadHook(
    function () { 
         $("#icones").css("display", "inline").appendTo($(".firstHeading"));
    }
);

addOnloadHook(
    function () {
         $(".WikiaPageHeader details .categories").remove();
         $(".WikiaPageHeader details").append($("#icones"));
    }
);
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') == null) return;
    $('.insertusername').text(mw.config.get('wgUserName')); }
 $(UserNameReplace);
 
 addOnloadHook(UserNameReplace);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny

 * Modificada para atender à estrutura com o espaço nominal "Cânon", por Thales César
 */
function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');
 
		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}
 
		if (el)
			el.href += '&editintro=' + name;
 
		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;
 
			if (spans[i].className == 'editsection') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if (spans[i].className == 'editsection-upper') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			}
		}
	}
}
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
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
 
		$summaryLabel.prepend( 'Sumários padrões: ', $summaryOptionsList, '<br />' );
	} );
 
}
addOnloadHook(fillEditSummaries);

$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#ícones'));
		$('#ícones').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});