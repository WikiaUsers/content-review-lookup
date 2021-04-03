( function( window, $, mw ) { 
    "use strict";
    const tto = function tto( o ) { 
        const r = /^\[(.*)\]$/;
        const t = Object.prototype.toString.call( o );
        const e = r.exec( t )[ 1 ].split( /\s+/g )[ 1 ];
        if ( /(?:HTML|SVG)(?:.+)Element/.test( e ) ) {
            return "element";
        } else if ( [ "HTMLCollection", "NodeList" ].includes( e ) ) {
            return "domlist";
        }
        return e.toLowerCase( );
    };
    
    function AccordionView( el ) { 
        if ( new.target !== AccordionView ) return new AccordionView( el );
        this.options = Object.assign( { }, defaults );
        if ( tto( el ) === "string" ) {
            this.el = document.querySelector( el );
            this.els = null;
        } else if ( tto( el ) === "domlist" ) { 
            this.el = null;
            this.els = el;
        } else if ( tto( el ) === "element" ) {
            this.el = el;
            this.els = null;
        } else {
            this.el = null;
            this.els = document.querySelectorAll( ".accordion-view" );
        }

        if ( this.els ) { 
            Array.from( this.els ).forEach( function( elem, index ) { 
                this[ index ] = new AccordionView( elem );
            }, this );
            this.length = Array.from( this.els ).length;
            return this;
        }
        this.cache = { };
        this.entries = [ ];
        this.configure( );
    }
    
    Object.assign( AccordionView, { 
        fn : AccordionView.prototype
    } );
    
    Object.assign( AccordionView.fn, { 
        each : function( callback, ctx ) { 
            if ( !this.els ) return;
            if ( arguments.length === 1 ) ctx = this;
            const a = Array.from( this );
            return a.forEach( callback, ctx );
        },
        configure : function( ) { 
            const obj = Object.assign( { }, this.el.dataset );
            Object.keys( obj ).forEach( function( key ) { 
                const orig = this.options[ key ], value = obj[ key ];
                this.options = obj.hasOwnProperty( key ) ? value : orig;
            }, this );
        },
        renderAccordion : function( ) { 
            const sections = this.el.querySelectorAll( ".accordion-section" );
        }
    } );
} )( this, jQuery, mediaWiki );