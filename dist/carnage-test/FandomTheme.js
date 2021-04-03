/**
 * @name            FandomTheme
 * @version         v1.1
 * @author          Ultimate Dark Carnage
 * @description     Creates a Feeds-like theme
 **/

( function( window, $, mw ) { 
    "use strict";
    window.dev = Object.assign( { }, window.dev );
    if ( window.dev.hasOwnProperty( "fandomtheme" ) ) return;
    const VERSION = "v1.2";
    const THEME_TRAPS = Object.freeze( { 
        get : function( obj, prop ) { 
            return prop in obj ? obj[ prop ] : null;
        }
    } );
    function toAlpha( rgb, alpha ) {
        const a = Number( alpha );
        if ( a < 0 || a > 1 || ( isNaN( a ) && !isFinite( a ) ) ) return rgb;
        const rgbPattern = /rgba?\((.*)\)/g;
        const rgbString = rgbPattern.exec( rgb )[ 1 ] || "";
        if ( rgbString === "" ) return rgb;
        const tuple = Array.from( rgbString.split( /,\s*/g ) );
        if ( tuple.length < 3 && tuple.length > 4 ) return rgb;
        tuple[ 3 ] = a;
        return "rgba(" + tuple.join( ', ' ) + ")"; 
    }
    function FandomTheme( options ) { 
        if ( !( this instanceof FandomTheme ) ) return new FandomTheme( options );
        this.settings = Object.assign( { }, options );
        this.themes = new Proxy( { }, THEME_TRAPS );
        this.isBright = false;
        this.load( );
    }
    FandomTheme.prototype = { 
        constructor : FandomTheme,
        load : function( ) { 
            Promise.all( [
                this.loadColors( ),
                this.loadWDS( )
            ] ).then( this.init.bind( this ) );
        },
        loadColors : function( ) {
            return new Promise( function( resolve, reject ) { 
                mw.hook( "dev.colors" ).add( resolve );
            } );
        },
        loadWDS : function( ) {
            return new Promise( function( resolve, reject ) { 
                mw.hook( "dev.wds" ).add( resolve );
            } );
        },
        loadURL : function( ) { 
            return new Promise( function( resolve, reject ) { 
                
            } );
        },
        addThemes : function( ) {
            const url = new WikiaURL( );
            mw.loader.load( );
            const wk = this.mainTheme = this.colors.wikia;
            const prefix = "--fandom-theme__";
            Object.keys( wk ).forEach( function( key ) { 
                this.themes[ prefix + key ] = wk[ key ];
            }, this );
            this.isBright = this.colors.parse( wk.body ).isBright( );
            this.themes[ prefix + "header-accent" ] = toAlpha( this.colors
                .parse( wk.border ).lighten( this.isBright ? -12 : 12 ).rgb( ), 
                0.55 );
            this.themes[ prefix + "rail-background" ] = this.colors.parse( wk.border )
                .lighten( this.isBright ? 7 : -7 ).rgb( );
            this.themes[ prefix + "font-color" ] = wk.text;
            this.addCSS( );
        },
        addCSS : function( ) { 
            const root = ":root { \n $css }";
            const result = root.replace( "$css", Object.keys( this.themes )
                .reduce( function( s, k ) { 
                    const v = this.themes[ k ];
                    return s.concat( k + ": " + v + "; \n" );
                }.bind( this ), "" ) );
            const env = document.createElement( "style" );
            env.setAttribute( "id", "fandom-theme__style" );
            env.setAttribute( "media", "all" );
            env.textContent = String( result );
            document.body.appendChild( env );
        },
        init : function( ) {
            this.wds = window.dev.wds;
            this.colors = window.dev.colors;
            this.addThemes( );
        }
    };
    const _options = Object.assign( { }, window.fandomThemeConfig );
    window.fandomTheme = new FandomTheme( _options );
    window.dev.fandomtheme = window.fandomtheme;
    mw.hook( "dev.fandomtheme" ).fire( window.dev.fandomtheme );
} ( window, jQuery, mediaWiki ) );