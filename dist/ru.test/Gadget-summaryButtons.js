function initSummaryButtons( mode ) {
	function insertSummary( txt ) {
		if ( typeof txt !== 'string' ) {
			txt = this.title;
		}
		if ( typeof summaryItemsSeparator === 'undefined' ) {
			window.summaryItemsSeparator = ',';
		}
		var val = $summary.val();
		var regExp = new RegExp( '(^|[,;.?!/]) ?' + mw.util.escapeRegExp( txt ) );
		if ( regExp.test( val ) ) {
			return;
		}
		if ( /[^,; \/]$/.test( val ) ) {
			val += summaryItemsSeparator;
		}
		if ( /[^ ]$/.test( val ) ) {
			val += ' ';
		}
		$summary.val( val + txt ).focus().change();
	}
	
	mode = mode || 'classic';
	
	window.insertSummary = insertSummary;
	if ( typeof summaryButtons === 'undefined' ) {
		window.summaryButtons = {
			hideDefaultButtons: false
		};
	}
	
	var veSaveDialog, $summaryWrapper, $summary;
	if ( mode === 'classic' ) {
		$summaryWrapper = $( '#wpSummaryWidget' );
		$summary = $( '#wpSummary' );
	} else {
		veSaveDialog = ve.init.target.saveDialog;
		$summaryWrapper = veSaveDialog.editSummaryInput.$element;
		$summary = veSaveDialog.editSummaryInput.$input;
	}
	
	var $summaryButtons = $( '<div>' )
		.addClass( 'summaryButtons' )
		.insertAfter( $summaryWrapper );
	var $groups = $( '<div>' )
		.addClass( 'summaryButtons-groups' )
		.appendTo( $summaryButtons );
	
	window.addSumButton = window.addSummaryButton = function ( label, text, group ) {
		group = group || 'custom';  // default is 'default'
		var $group = $( '.summaryButtons-group-' + group );
		if ( !$group.length ) {
			$group = $( '<div>' )
				.addClass( 'mw-ui-button-group summaryButtons-group summaryButtons-group-' + group )
				.appendTo( $groups );
		}
		
		$( '<button>' )
			.attr( 'type', 'button' )
			.attr( 'title', text )
			.addClass( 'mw-ui-button summaryButtons-button' )
			.html( label )
			.click( insertSummary )
			.appendTo( $group );
	};
	/* Кнопки для визуального редактирования */
	var buttons = mode !== 'visual' ?
		[
			'Тест'
		] :
		/* Кнопки для визуального редактора без кнопок для обсуждений */
		[
			'Тест'
		];
	
	if ( !summaryButtons.hideDefaultButtons ) {
		$.each(
			buttons,
			function ( i, s ) {
				addSummaryButton( s.replace( /\|.*/, '' ), s.replace( /\|/, '' ), 'default' );
			}
		);
	}
	$( '<a>' )
		.attr( 'href', 'https://ru.wikipedia.org/wiki/Википедия:Гаджеты/Кнопки_описания_правок' )
		.attr( 'target', '_blank' )
		.attr( 'title', 'Информация о кнопках описания правок' )
		.attr( 'tabindex', '-1' )
		.addClass( 'mw-ui-button mw-ui-quiet summaryButtons-info-link' )
		.text( '?' )
		.appendTo( $summaryButtons );
	
	// Эти стили находятся здесь, а не в отдельном CSS, потому что на страницах, где кнопок нет,
	// они вредны, а за тем, где запускается CSS, мы не можем проследить.
	mw.util.addCSS( '\
		.mw-editform #wpSummaryWidget {\
			margin-bottom: 0;\
		}\
		\
		.mw-editform .editCheckboxes {\
			margin-top: .85714em;\
		}\
	' );
	
	if ( mode !== 'classic' && !additionalCSS ) {
		additionalCSS = mw.util.addCSS( '\
			.ve-ui-mwSaveDialog-savePanel .summaryButtons {\
				margin-top: 2px;\
			}\
			\
			.ve-ui-mwSaveDialog-savePanel .ve-ui-mwSaveDialog-options {\
				border-top: 1px solid #c8ccd1;\
				border-radius: 2px;\
			}\
		' );
		veSaveDialog.updateSize();
	}
	
	mw.hook( 'summaryButtons' ).fire();
}

var additionalCSS;
if ( window.ve && ve.init && ve.init.target && ve.init.target.active || $( '.ve-loading' ).length ) {
	mw.hook( 've.saveDialog.stateChanged' ).add( function () {
		if ( !mw.config.get( 'wgArticleId' ) || $( '.summaryButtons' ).length ) return;
		initSummaryButtons( ve.init.target.getSurface().getMode() );
	} );
} else if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	$( function () {
		var frm = document.getElementById( 'editform' );
		if ( !mw.config.get( 'wgArticleId' ) || !frm || $( frm.wpSection ).val() === 'new' ) return;
		initSummaryButtons( 'classic' );
	} );
}