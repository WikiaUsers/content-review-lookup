$( function() {
'use strict';

/**
 * Adicione um botão de edição que carrega o editor de sprite
 *
 * Se spriteaction=edit está no URL, o editor será carregado
 * Imediatamente, caso contrário, aguardará o botão ser clicado.
 */
var editPage = $( '#sprite-editor-message' ).data( 'page' ) || null;
if ( !$( '#spritedoc' ).length && !editPage ) {
	return;
}

var $spriteEditLink;
var $spriteEditTab;
    
// Mudanças temporárias para o FandomDesktop
if ( $( ".skin-fandomdesktop" ).length > 0 ) {
	var $editButton = $( '#ca-edit-side-tool' );
	if ( !$editButton.length ) {
		$editButton = $( '#ca-viewsource-side-tool' );
	}
	
	$spriteEditLink = $( '<a>' )
	    .attr( 'id', 'ca-spriteedit' )
	    .attr( 'href', mw.util.getUrl( editPage, { spriteaction: 'edit' } ) )
	    .attr( 'title', 'Editar sprite' )
	    .addClass( 'page-side-tool' )
	    .html('<svg width="24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>');
	    // It's the "Photograph" icon from Heroicons – https://heroicons.dev/
	    
	$spriteEditLink.insertAfter( $editButton );
	$spriteEditTab = $spriteEditLink;
} else {
	var $editTab = $( '#ca-edit' );
	if ( !$editTab.length ) {
		$editTab = $( '#ca-viewsource' );
	}
	$spriteEditLink = $( '<a>' ).text( 'Editar sprite' ).attr( 'href',
		mw.util.getUrl( editPage, { spriteaction: 'edit' } )
	);
	$spriteEditTab = $( '<li>' )
	    .attr( 'id', 'ca-spriteedit' )
	    .addClass( 'page-side-tool' )
	    .append(
		    $( '<span>' ).append( $spriteEditLink )
	    );
	
	$spriteEditTab.insertAfter( $editTab );
}

// Página para o editor de sprite não está aqui, portanto, não precisa ligar eventos
if ( editPage ) {
	return;
}

var loadSpriteEditor = function() {
	$spriteEditTab.add( '#ca-view' ).toggleClass( 'selected' );
	
	return mw.loader.using( 'ext.gadget.spriteEdit' );
};
if ( location.search.match( '[?&]spriteaction=edit' ) ) {
	loadSpriteEditor();
	return;
}

var $win = $( window );
$spriteEditLink.one( 'click.spriteEditLoader', function( e ) {
	// Inicialmente adicione o histórico por isso não é atrasado em espera
	// para carregar o editor. O editor lidará a partir de agora.
	history.pushState( {}, '', this.href );
	
	loadSpriteEditor().then( function() {
		$win.off( '.spriteEditLoader' );
	} );
	
	e.preventDefault();
} );

// Se a página for recarregada enquanto o editor não for carregado, navegando
// voltar ao editor não funcionará, então uma verificação inicial de navegação é
// necessário para carregar o editor, onde ele monitorará a navegação
$win.on( 'popstate.spriteEditLoader', function() {
	if (
		location.search.match( '[?&]spriteaction=edit' ) &&
		!$( 'html' ).hasClass( 'spriteedit-loaded' )
	) {
		loadSpriteEditor().then( function() {
			$win.off( '.spriteEditLoader' );
		} );
	}
} );

} );