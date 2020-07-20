/**
 * @title               WDSDialog
 * @description         Creates a dialog using the new modern styles
 * @version             v0.9
 * @author              Ultimate Dark Carnage
 * @external            jQuery
 * @external            mw
 **/

require( [
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function( window, document, $, mw ){
    "use strict";
    
    var UID = 0;
    
    var CACHE = { };
    
    function WDSDialog( id, options ){
        if ( !( this instanceof WDSDialog ) ) return new WDSDialog( id, options );
        
        if ( typeof id !== "string" ){
            options = Object.assign( { }, id );
            id = options.id;
            delete options.id;
        } else {
            options = Object.assign( { }, options );
        }
        
        if ( id === void 0 || id === null ){
            throw new ReferenceError( "All dialogs require an ID." );
        }
        
        if ( CACHE[ id ] ){
            CACHE[ id ].configureOptions( options );
            return CACHE[ id ];
        }
        
        this.uid = UID++;
        
        this.id = id;
        this.settings = Object.assign( { }, this.constructor.settings );
        this.callbacks = { };
        this.data = { };
        this.active = false;
        this.opened = false;
        this.state = "";
        this.configureOptions( options );
        
        CACHE[ this.id ] = this;
        
        return this.create( );
    }
    
    WDSDialog.extend = function extend( target ){
        var sources = Array.prototype.slice.call( arguments, 1 );
        
        if ( arguments.length === 0 ){
            return this;
        } else if ( arguments.length === 1 ){
            sources = [ target ];
            target = this;
        }
        
        loopSources: while ( sources.length ){
            var source = sources.shift( );
            if ( source === void 0 || source === null ) continue loopSources;
            loopProperties: for ( const property in source ){
                var original = source[ property ];
                if ( typeof original === "object" ){
                    target[ property ] = Object.assign( { }, target[ property ] );
                    extend( target[ property ], original );
                } else if ( original !== void 0 ){
                    target[ property ] = original;
                } else continue loopProperties;
            }
        }
        
        return target;
    };
    
    WDSDialog.extend( {
        resources: Object.freeze( {
            wds: "u:dev:MediaWiki:WDSIcons/code.js",
            colors: "u:dev:MediaWiki:Colors/code.js"
        } ),
        settings: Object.freeze( {
            title: "",
            content: "",
            buttons: [],
            classNames: [],
            callback: null,
            delay: 0
        } ),
        specials: Object.freeze( {
        } ),
        html: Object.freeze( {
            curtain: "<div></div>",
            wrapper: "<section></section>",
            header: "<header></header>",
            heading: "<h4></h4>",
            closeButton: "<a></a>",
            content: "<div></div>",
            toolbar: "<footer></footer>",
            actions: "<nav></nav>",
            button: "<a></a>"
        } ),
        loadScripts: function( ){
            var resources = Object.assign( { }, this.resources );
            return Promise.all( Object.entries( resources ).map( function( entry ){
                return new Promise( function( resolve, reject ){
                    var name = entry[ 0 ], script = entry[ 1 ],
                        importObj = importArticle( { type: "script", article: script } );
                
                    importObj.addEventListener( "load", function( event ){ 
                        mw.hook( "dev." + name ).add( resolve );
                    } );
                } );
            } ) );
        },
        init: function( fn ){
            this.loadScripts( ).then( function( ){
                mw.hook( "dev.dialog" ).fire( this );
            }.bind( this ) );
        },
        cleanHTML: function( string ){
            var div = document.createElement( "div" ),
                selectors = [ "script", "style", "meta", "link", "base", "object", "iframe", "noscript" ];
 
            div.innerHTML = string;
 
            var elements = Array.from( div.querySelectorAll( selectors.join( ", " ) ) );
 
            while ( elements.length ){
                var element = elements.shift( );
                if ( !( element.remove ) ){
                    element.parentNode.removeChild( element );
                } else {
                    element.remove( );
                }
            }
 
            var allElements = Array.from( div.querySelectorAll( "*" ) ),
                blacklistedAttrs = [ /on.*/g, "tabindex", "style" ],
                blacklistedAttrValues = [ /(?:(?:java|ecma)script|data):.*/g ],
                blacklistedProps = [ /(?:-(?:ms|webkit|moz)-|)behavior/g, "cursor", /--(?:[\w\d\-\_]+)/g ],
                blacklistedCSSValues = [ /(?:-(?:webkit|ms)-|)url\(.*\)/g, /var\(.*\)/g ];
 
            while ( allElements.length ){
                var currElement = allElements.shift( ),
                    attributes = Array.from( currElement.attributes );
                while ( attributes.length ){
                    var attribute = attributes.shift( ),
                        name = attribute.name,
                        value = attribute.value;
 
                    loopAttrs: for ( var i = 0; i < blacklistedAttrs.length; i++ ){
                        var attr = blacklistedAttrs[ i ];
                        if ( Object( attr ) instanceof RegExp ){
                            if ( !attr.test( name ) ) continue loopAttrs;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        } else {
                            if ( attr !== name ) continue loopAttrs;
                            else if ( attr === "style" ){
                                var cssProps = value.split(/\s*;/g);
                                cssProps = cssProps.filter( function( x ){
                                    return x !== "";
                                } );
                                loopCSSProps: while ( cssProps.length ){
                                    var item = cssProps.shift( );
                                    
                                    if ( item === "" ) continue loopCSSProps;
                                    
                                    var prop = item.slice( 0, item.indexOf( ":" ) ).trim( );
                                    var val = item.slice( item.indexOf( ":" ) + 1 ).trim( );
                                    
                                    loopBProps: for ( var k = 0; k < blacklistedProps.length; k++ ){
                                        var bProp = blacklistedProps[ k ];
                                        if ( Object( bProp ) instanceof RegExp ){
                                            if ( !bProp.test( prop ) ) continue loopBProps;
                                            if ( !currElement.remove ){
                                                currElement.parentNode.removeChild( currElement );
                                            } else {
                                                currElement.remove( );
                                            }
                                        } else {
                                            if ( bProp !== prop ) continue loopBProps;
                                            if ( !currElement.remove ){
                                                currElement.parentNode.removeChild( currElement );
                                            } else {
                                                currElement.remove( );
                                            }
                                        }
                                    }
                                    
                                    loopBVals: for ( var l = 0; l < blacklistedCSSValues.length; l++ ){
                                        var bVal = blacklistedCSSValues[ l ];
                                        if ( Object( bVal ) instanceof RegExp ){
                                            if ( !bVal.test( val ) ) continue loopBVals;
                                            if ( !currElement.remove ){
                                                currElement.parentNode.removeChild( currElement );
                                            } else {
                                                currElement.remove( );
                                            }
                                        } else {
                                            if ( bVal !== val ) continue loopBVals;
                                            if ( !currElement.remove ){
                                                currElement.parentNode.removeChild( currElement );
                                            } else {
                                                currElement.remove( );
                                            }
                                        }
                                    }
                                }
                            }
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        }
                    }
 
                    loopVals: for ( var j = 0; j < blacklistedAttrValues.length; j++ ){
                        var val_ = blacklistedAttrValues[ j ];
                        if ( Object( val_ ) instanceof RegExp ){
                            if ( !val_.test( value ) ) continue loopVals;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        } else {
                            if ( val_ !== value ) continue loopVals;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        }
                    }
                }
            }
 
            return div.innerHTML;
        },
        parseHTML: function( string, clean ){
            const parser = new DOMParser( );
            if ( clean ){ 
                string = this.cleanHTML( string ); 
            }
            const body = parser.parseFromString( string, "text/html" ).body;
            if ( !body.firstElementChild ) return null;
            return body.firstElementChild;
        }
    } );
    
    WDSDialog.fn = WDSDialog.prototype;
    
    WDSDialog.fn.extend = WDSDialog.extend;
    
    WDSDialog.fn.extend( {
        configureOptions: function( options ){
            const specials = Object.assign( { }, this.constructor.specials );
            
            loopProps: for ( const property in options ){
                var value = options[ property ], 
                    original = this.settings[ property ];
                
                if ( value === original ) continue loopProps;
                
                if ( property in specials ){
                    var handler = specials[ property ];
                    this.settings[ property ] = typeof handler === "function" ?
                        ( handler.call( this, value || original ) || original ) :
                        handler;
                } else {
                    this.settings[ property ] = value || original;
                }
            }
        },
        create: function( ){
            var dialogHTML = Object.assign( { }, this.constructor.html );
            this.curtain = this.constructor.parseHTML( dialogHTML.curtain );
            this.wrapper = this.constructor.parseHTML( dialogHTML.wrapper );
            this.header = this.constructor.parseHTML( dialogHTML.header );
            this.heading = this.constructor.parseHTML( dialogHTML.heading );
            this.closeButton = this.constructor.parseHTML( dialogHTML.closeButton );
            this.content = this.constructor.parseHTML( dialogHTML.content );
            this.footer = this.constructor.parseHTML( dialogHTML.footer );
            this.actions = this.constructor.parseHTML( dialogHTML.actions );
            
            this.curtain.classList.add( "wds-dialog__curtain" );
            this.wrapper.classList.add( "wds-dialog__wrapper" );
            this.header.classList.add( "wds-dialog__title" );
            this.closeButton.classList.add( "wds-dialog__close" );
            this.content.classList.add( "wds-dialog__content" );
            this.footer.classList.add( "wds-dialog__toolbar" );
            this.actions.classList.add( "wds-dialog__actions" );
            
            this.wrapper.setAttribute( "id", this.id );
            this.closeButton.addEventListener( "click", this.closeModal.bind( this ) );
            
            if ( this.constructor.wds ){
                this.closeButton.appendChild( this.constructor.wds.icon( "close-small", { 
                    "class": "wds-dialog__close-icon"
                } ) );
            }
            
            if ( this.wrapper.append ){
                this.wrapper.append( this.header, this.content, this.footer );
            } else {
                var frag = document.createDocumentFragment( );
                [ this.header, this.content, this.footer ].forEach( function( target ){
                    frag.appendChild( target );
                }, this );
                this.wrapper.appendChild( frag );
            }
            
            return this;
        }
    } );
} );