  //tippy tooltip function
  //credit to Dustloop Wiki and Alistair3149 for writing the code
  
  //mw.loader.getScript( 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.0/dist/umd/popper.min.js');  
  //mw.loader.getScript( 'https://cdn.jsdelivr.net/npm/tippy.js@6.0.0/dist/tippy.umd.min.js');
  mw.hook( 'wikipage.content' ).add( function ( content ) {
    /*
     * Tippy.js
     * @see https://atomiks.github.io/tippyjs/
    */
    // content is a jQuery object, content[0] returns the bodyContent element
    // Select top-level tooltips
    const tooltips = content[ 0 ].querySelectorAll( '.tooltip:not( .tooltip .tooltip )' );
    
    if ( tooltips ) {
        mw.loader.getScript( 'https://cdn.jsdelivr.net/npm/@popperjs/core@2/dist/umd/popper.js' ).then( function () {
            mw.loader.getScript( ' https://cdn.jsdelivr.net/npm/tippy.js@6/dist/tippy.umd.js' ).then( function () {
                // Load styles for shift-away animation
                mw.loader.load( 'https://cdn.jsdelivr.net/npm/tippy.js@6/animations/shift-away.css', 'text/css' );
    
                const createTippy = function ( element, position ) {
                    const tooltipContent = element.querySelector( ':scope > .tooltiptext' );
    
                    tippy( element, {
                        content: tooltipContent.innerHTML,
                        placement: position
                    } );
                    
                    // Make tooltip focusable by keyboard
                    element.setAttribute( 'tabindex' ,  '0' );
                };
                
                tippy.setDefaultProps( {
                    animation: 'shift-away',
                    arrow: true,
                    allowHTML: true,
                    appendTo: document.body,
                    ignoreAttributes: true,
                    interactive: true
                } );
    
                tooltips.forEach( function ( tooltip ) {
                    createTippy( tooltip, 'top' );
    
                    const nestedTooltip = tooltip.querySelector( '.tooltip' );
    
                    if ( nestedTooltip ) {
                        createTippy( nestedTooltip, 'bottom' );
                    }
                } );
            },
            function ( e ) {
                mw.log.error( e.message );
            }
            );
        },
        function ( e ) {
            mw.log.error( e.message );
        } );
    }
} );