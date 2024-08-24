/* Qualquer JavaScript aqui ser� carregado apenas para administradores */
/**
 * Deixe em branco o campo "Outro/motivo adicional" ao excluir p�ginas,
 * e insira o motivo do modelo de exclus�o
 * 
 * Isso � para que n�o recebamos vandalismo est�pido e spam e
 * tudo o que n�o foi preservado para a posteridade no registro de exclus�o
 */
$.when( $.ready, mw.loader.using( 'mediawiki.util' ) ).done( function() {
	'use strict';
	/**
	 * Parte 1: Adicione o motivo da exclus�o do modelo de exclus�o ao bot�o Excluir
	 */
	var $deleteReason = $( '.delete-reason' );
	if ( $deleteReason.length ) {
		// A parent node is required for $().replaceWith to work
		var $reasonNodes = $( '<i>' ).append( $( '.delete-reason' ).contents().clone() );
		$reasonNodes.find( 'a' ).each( function() {
			var $link = $( this );
			// Only allow internal links
			var classes = $link.attr( 'class' );
			if ( classes && classes !== 'new' && classes !== 'mw-redirect' ) {
				return;
			}
			
			var href = $link.attr( 'href' );
			var page = mw.util.getParamValue( 'title', href ) || ( href.match( /\/wiki\/([^?]+)/ || [] )[1] );
			if ( page ) {
				page = decodeURIComponent( page ).replace( /_/g, ' ' );
				var wikiLink = $link.text();
				if ( page !== wikiLink[0].toUpperCase() + wikiLink.slice( 1 ) ) {
					wikiLink = page + '|' + wikiLink;
				}
				$link.replaceWith( '[' + '[' + wikiLink + ']]' );
			}
		} );
		
		var reasonText = $reasonNodes.text();
		if ( reasonText ) {
			$( '#ca-delete a, a#ca-delete' ).prop( 'href', function() {
				// Propositalmente n�o usando o wpReason, o motivo gerado automaticamente ainda est� l� inicialmente
				// para que o usu�rio possa pressionar desfazer para recuper�-lo, se desejar, em vez deste
				return this.href += '&deleteReason=' + encodeURIComponent( reasonText );
			} );
		}
	}
	
	/**
     * Parte 2: obtenha o motivo adicionado anteriormente da URL ou tente extra�-lo do resumo "conte�do era".
     * Em seguida, se corresponder parcialmente a um dos motivos de exclus�o predefinidos, selecione-o e deixe em branco o resumo,
     * caso contr�rio, basta substituir o resumo por ele
	 */
	if ( mw.config.get( 'wgAction' ) === 'delete' && !mw.util.getParamValue( 'wpReason' ) ) {
		var $reason = $( '#wpReason' ), autoReason = $reason.prop( 'value' );
		var deleteReason = mw.util.getParamValue( 'deleteReason' );
		
		if ( !deleteReason ) {
			var contentDeleteReason = autoReason.match(
				/\{\{\s*(?:template:\s*)?delete\s*\|\s*([^\}]+?)\s*(?:\|[^\]\}]*)?(?:\}\}|\.\.\.$)/i
			);
			if ( contentDeleteReason ) {
				deleteReason = contentDeleteReason[1];
			}
		}
		
		if ( deleteReason ) {
			var lcReason = deleteReason.toLowerCase();
			$( '#wpDeleteReasonList option' ).each( function() {
				var $option = $( this );
				if ( $option.text().toLowerCase() === lcReason ) {
					deleteReason = null;
					$option.prop( 'selected', true );
					return false;
				}
			} );
			
			if ( deleteReason && deleteReason.length > 255 ) {
				deleteReason = deleteReason.slice( 0, 252 ) + '...';
			}
		}
		
		$reason.prop( 'value', deleteReason || '' );
	}
} );