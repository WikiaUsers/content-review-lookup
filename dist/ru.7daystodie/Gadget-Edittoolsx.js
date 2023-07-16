$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-doneInitialSections', function () {
    $( '.mw-editTools' ).appendTo( '.wikiEditor-ui-toolbar' );
} );