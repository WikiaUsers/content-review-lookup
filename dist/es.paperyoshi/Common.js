importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

navbox: {
            conditional: ( conf.wgNamespaceNumber === 0 && $( '.navbox' ).length ),
            exec: function () {
                    // should be defined by [[MediaWiki:Collapsible-expand]]
                    // currently hardcoded into template due to wikia bug
                var expand = 'show',
                    $navbox = $( '.navbox' ),
                    // maximum number of navboxes before they all get collapsed
                    maxShow = 2,
                    // maximum allowable height of navbox before it gets collapsed
                    maxHeight = 300;
 
                function collapseNavbox( navbox ) {
                    var $navbox = $( navbox ),
                        $rows,
                        $toggle;
 
                    if ( $navbox.hasClass( 'mw-collapsed' ) ) {
                        return;
                    }
 
                    // add the collapsed class
                    $navbox.addClass( 'mw-collapsed' );
 
                    // make sure we aren't selecting any nested navboxes
                    $rows = $navbox.find( '> tbody > tr' );
 
                    $rows.each( function ( i ) {
                        // first row is the header
                        if ( i === 0 ) {
                            return;
                        }

                        $( this ).hide();
                    } );
 
                    // toggle is always in header
                    $toggle = $rows.first().find( '.mw-collapsible-toggle' );
 
                    // this class is required to make expand work properly
                    $toggle.addClass( 'mw-collapsible-toggle-collapsed' );
                    $toggle.children( 'a' ).text( expand );

                }
 
                // collapse if more than `maxShow`
                if ( $navbox.length > ( maxShow - 1 ) ) {
                    $navbox.each( function () {
                        collapseNavbox( this );
                    } );
                }
 
                // collapse if taller than `maxHeight`
                $navbox.each( function () {
                    if ( $( this ).height() > maxHeight ) {
                        collapseNavbox( this );
                    }
                } );
            }
        }