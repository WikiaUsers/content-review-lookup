/**
 * @name            DupImageList
 * @description     Find duplicate images. Code courtesy of "pcj" of
 *                  WowPedia.org.
 * @author          Pcj
 * @author          Grunny
 * @author          Porter21
 * @author          Jroksjr
 * @author          TOBBE
 * @author          Kangaroopower
 * @author          UltimateSupreme
 * @author          Bobogoobo
 * @author          Saftzie
 **/
( function( window, $, mw ) { 
    "use strict";
    
    // Double-run protection
    if ( window.dev.dupimagelist._loaded ) { 
        return;
    }
    
    // Setting MediaWiki configurations
    const mwconf = mw.config.get( [ 
        "wgArticlePath",
        "wgFormattedNamespaces",
        "wgVersion"
    ] );
    
    // Fetching the decimal version of the current version
    const mwversion = parseFloat( mwconf.wgVersion );
    
    // Checks if the current version is UCP
    const isUCP = mwversion > 1.19;
    
    // A list of canonical file extensions
    const exts = Object.freeze( [ 
        "png",
	    "gif",
	    "jpg",
	    "jpeg",
	    "ico",
	    "pdf",
	    "svg",
	    "odt",
	    "ods",
	    "odp",
	    "odg",
	    "odc",
	    "odf",
	    "odi",
	    "odm",
	    "psd",
	    "pspimage",
	    "woff",
	    "woff2",
	    "ogg",
	    "ogv",
	    "oga"
    ] );
    
    // Extensions pattern
    const extPattern = new RegExp( "\\.(?:" + exts.join( "|" ) + ")$", "i" );
    
    // Creating the main object
    function DIL( ) { 
        if ( this.constructor !== DIL ) {
            return new DIL( );
        }
        
        const p = this;
        
        p._pages = new Map( );
        
        p._loaded = false;
        
        p._currentTitle = "";
        
        p._start = function( ) { 
            mw.hook( "dev.i18n" ).add( function( i18no ) {
                Promise.all( [ 
                    i18no.loadMessages( "DupImageList" ),
                    mw.loader.using( "mediawiki.api" )
                ] ).then( p._init );
            } );
        };
        
        p._init = function( m ) { 
            p._i18n = m[ 0 ];
            
            p.msg = function( ) { 
                const a = Array.from( arguments );
                return p._i18n.msg.apply( p._i18n, a );
            };
            
            p._load( );
        };
        
        p._load = function( ) { 
            const svgns = "http://www.w3.org/2000/svg";
            
            p._spinner = document.createElementNS( svgns, "svg" );
            
            const svga = new Map( [ 
                [ "width", 66 ],
                [ "height", 66 ],
                [ "viewBox", "0 0 66 66" ]
            ] );
            
            svga.forEach( function( name, value ) { 
                p._spinner.setAttributeNS( svgns, name, value );
            } );
            
            p._spinner.classList.add( "wds-spinner", "wds-spinner__block" );
            
            p._spinner.dataset.name = p.msg( "inProgress" ).escape( );
            
            p._spinner.innerHTML = '<g transform="translate(33, 33)">' +
                '<circle class="wds-spinner__stroke" fill="none" stroke-width="2" stroke-dasharray="188.49555921538757" stroke-dashoffset="188.49555921538757" stroke-linecap="round" r="30"></circle>' +
            '</g>';
            
            p._wrapper = document.createElement( "div" );
            
            p._wrapper.classList.add( "DupImageWrapper" );
            
            p._wrapper.setAttribute( "id", "DupImageWrapper" );
            
            if ( document.querySelector( "#mw-dupimages" ) ) { 
                p._target = document.querySelector( "#mw-dupimges" );
                
                p._target.append( p._wrapper );
                
                p._timeout = setTimeout( function( ) { 
                    clearTimeout( p._timeout );
                    
                    p._timeout = null;
                    
                    p._getDupImages( );
                }, 2500 );
            }
        };
        
        p._getDupImages = function( gf ) { 
            const params = {
                action : "query",
                prop : "duplicatefiles",
                dflimit : "max",
                dflocalonly : true,
                generator : "allimages",
                gailimit : "max",
                indexpageids : true,
                format : "json"
            };
            
            if ( arguments.length > 0 ) { 
                if ( gf.includes( "|" ) ) {
                    params.dfcontinue = gf;
                    gf = gf.split( "|" )[ 0 ];
                }
                
                params.gaifrom = gf;
            }
            
            ( new mw.Api( ) )
                .post( params )
                .then( function( data ) { 
                    if ( data.query ) { 
                        const query = data.query, pages = query.pages, pageids = query.pageids;
                        
                        var dupimages = [ ], done = false;
                        
                        pageids.forEach( function( pageid ) { 
                            const page = pages[ pageid ];
                            
                            if ( 
                                extPattern.test( page.title ) &&
                                !p._pages.has( page.title ) &&
                                page.duplicatefiles
                            ) { 
                                if ( p._currentTitle !== page.title ) {
                                    if ( done ) { 
                                        p._pages.set( page.title, dupimages );
                                    }
                                    
                                    dupimages = [ ];
                                    
                                    done = false;
                                    
                                    p._currentTitle = page.title;
                                }
                                
                                const dupfiles = page.duplicateFiles;
                            
                                const lastIndex = dupfiles.length - 1;
                                
                                dupfiles.forEach( function( file, index ) { 
                                    const fileName = mwconf.wgFormattedNamespaces[ 6 ] + 
                                        ":" + 
                                        file.name;
                                    
                                    dupimages.push( { 
                                        url : mw.util.getUrl( fileName ),
                                        name : fileName
                                    } );
                                    
                                    if ( lastIndex === index ) done = true;
                                } );
                            }
                        } );
                        
                        const contKey = isUCP ? 
                            "rawcontinue" : 
                            "query-continue";
                            
                        if ( data[ contKey ] ) { 
                            const contData = data[ contKey ];
                            
                            if ( contData.duplicatefiles ) { 
                                p._getDupImages( contData.duplicatefiles.dfcontinue );
                            } else {
                                p._getDupImages( contData.allimages.gaifrom );
                            }
                        } else {
                            p._render( );
                        }
                    }
                } );
        };
        
        p._start( );
    }
} )( this, jQuery, mediaWiki );