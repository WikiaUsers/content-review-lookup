/* Qualquer JavaScript aqui será carregado apenas para administradores */
/**
 * Deixe em branco o campo "Outro/motivo adicional" ao excluir páginas,
 * e insira o motivo do modelo de exclusão
 * 
 * Isso é para que não recebamos vandalismo estúpido e spam e
 * tudo o que não foi preservado para a posteridade no registro de exclusão
 */
$.when( $.ready, mw.loader.using( 'mediawiki.util' ) ).done( function() {
	'use strict';
	/**
	 * Parte 1: Adicione o motivo da exclusão do modelo de exclusão ao botão Excluir
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
				// Propositalmente não usando o wpReason, o motivo gerado automaticamente ainda está lá inicialmente
				// para que o usuário possa pressionar desfazer para recuperá-lo, se desejar, em vez deste
				return this.href += '&deleteReason=' + encodeURIComponent( reasonText );
			} );
		}
	}
	
	/**
     * Parte 2: obtenha o motivo adicionado anteriormente da URL ou tente extraí-lo do resumo "conteúdo era".
     * Em seguida, se corresponder parcialmente a um dos motivos de exclusão predefinidos, selecione-o e deixe em branco o resumo,
     * caso contrário, basta substituir o resumo por ele
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