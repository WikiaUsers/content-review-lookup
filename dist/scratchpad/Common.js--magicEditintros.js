// 08:02, March 14, 2016 (UTC)
// <source lang="JavaScript">

// MAGIC EDITINTROS
// Description: Adds editintros on disambiguation pages and BLP pages.
// Maintainers: [[wikipedia:User:RockMFR]]

function addEditIntro( name ) {
    switch( skin ) {
        case 'monobook':
            $( '.mw-editsection, #ca-edit' ).find( 'a' ).each( function ( i, el ) {
                el.href = $( this ).attr( 'href' ) + '&editintro=' + name;
            } );
            break;
        case 'oasis':
            $( '.mw-editsection, #ca-edit' ).each( function ( i, el ) {
                el.href = $( this ).attr( 'href' ) + '&editintro=' + name;
            } );
            break;
    }
}

if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
    $( function () {
        if ( document.getElementById( 'disambigbox' ) ) {
            addEditIntro( 'Template:Disambig_editintro' );
        }
    } );

    $( function () {
        var cats = mw.config.get('wgCategories');
        if ( !cats ) {
            return;
        }
        if ( $.inArray( 'Living people', cats ) !== -1 || $.inArray( 'Possibly living people', cats ) !== -1 ) {
            addEditIntro( 'Template:BLP_editintro' );
        }
    } );
}

// </source>