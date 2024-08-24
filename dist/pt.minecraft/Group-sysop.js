/* Qualquer JavaScript aqui ser� carregado apenas para sysops */
/**
 * Em branco o campo "Outro/motivo adicional" ao excluir p�ginas,
 * e insira o motivo da predefini��o de exclus�o
 * 
 * � assim que n�o temos vandalismo est�pido e spam e
 * O que n�o preservado para a posteridade no registro de exclus�o
 */
$.when( $.ready, mw.loader.using( 'mediawiki.util' ) ).done( function() {
	'use strict';
	/**
	 * Parte 1: Parte 1: Adicionar o motivo da elimina��o a partir da predefini��o de exclus�o para o bot�o de Excluir 
	 */
	var $deleteReason = $( '.delete-reason' );
	if ( $deleteReason.length ) {
		// Um n� pai � necess�rio para $().replaceWith para funcionar 
		var $reasonNodes = $( '<i>' ).append( $( '.delete-reason' ).contents().clone() );
		$reasonNodes.find( 'a' ).each( function() {
			var $link = $( this );
			// Permitido apenas links internos
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
			$( '#ca-delete a' ).prop( 'href', function() {
				// Propositadamente n�o usando wpReason, ent�o o motivo inicialmente � gerado automaticamente
				// ent�o o usu�rio pode pressionar desfazer para recuper�-lo se eles quiserem em vez deste
				return this.href += '&deleteReason=' + encodeURIComponent( reasonText );
			} );
		}
	}
	
	/**
	 * Parte 2: Obtenha o motivo previamente adicionado do URL ou tente extrai-lo do resumo do "conte�do".
	 * Ent�o, se parcialmente corresponder a uma dos motivos de exclus�o pr�-definidas, selecione isso e em branco o resumo,
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