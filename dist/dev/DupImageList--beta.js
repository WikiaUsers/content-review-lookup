/**
 * @name            DupImageList
 * @description     Find duplicate images
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
    
    // Creating the dev object
    window.dev = window.dev || { };
    
    // MediaWiki dependencies
    const deps = Object.freeze( [ 
        "mediawiki.api",
        "mediawiki.util"
    ] );
    
    // MediaWiki variables
    const conf = mw.config.get( [ 
        "wgVersion",
        "wgUserGroups",
        "wgFormattedNamespaces"
    ] );
    
    // Checks if the wiki is UCP
    const isUCP = parseFloat( conf.wgVersion ) > 1.19;
    
    // Determines whether the string is not empty
    function notEmpty( s ) { 
        return typeof s === "string" && s !== "";
    }
    
    // Determines whether the user is a member of
    // a group (or groups).
    function isMember( groups ) { 
        if ( typeof groups === "string" ) {
            const g = groups.split( /\s+/g ).filter( notEmpty );
            return conf.wgUserGroups.some( function( gr ) { 
                return g.includes( gr );
            } );
        } else if ( Array.isArray( groups ) ) { 
            return conf.wgUserGroups.some( function( gr ) { 
                return groups.includes( gr );
            } );
        } else {
            return false;
        }
    }
    
    // Checks whether the user can delete
    const canDelete = isMember( [ 
        "staff",
        "soap",
        "sysop",
        "content-moderator"
    ] );
    
    // Canonical file extensions
    const fileExts = Object.freeze( [ 
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
    
    // Extension pattern
    const extPattern = new RegExp( "\\.(?:" + fileExts.join( "|" ) + ")$", "i" );
    
    // Core scripts
    const scripts = new Map( [ 
        [ "i18n", "u:dev:MediaWiki:I18n-js/code.js" ],
        [ "colors", "u:dev:MediaWiki:Colors/code.js" ],
        [ "wds", "u:dev:MediaWiki:WDSIcons/code.js" ],
        [ "ui", "u:dev:MediaWiki:UI-js/code.js" ]
    ] );
    
    // Importing required scripts
    scripts.forEach( function( script, scriptName ) { 
        if ( window.dev[ scriptName ] ) return;
 
        importArticle( { type : "script", article : script } );
    } );
 
    // Importing the core stylesheet
    importArticle( { 
        type : "style",
        article : "u:dev:MediaWiki:DupImageList.css"
    } );
    
    function DupImageList( ) { 
        if ( this.constructor !== DupImageList ) {
            return new DupImageList( );
        }
        
        const dil = this;
        
        dil._currentTitle = "";
        
        dil._processing = false;
        
        dil._processed = false;
        
        dil._started = false;
        
        dil._generated = false;
        
        dil._dupImages = { };
        
        dil._dlimit = 6;
        
        dil._dcount = 0;
        
        dil.target = document.querySelector( "#mw-dupimages" );
            
        if ( !dil.target ) { 
            dil._hasTarget = false;
        } else {
            dil._hasTarget = true;
        }
        
        if ( !dil._hasTarget ) return this;
        
        dil.createElement = function( s, o ) { 
            const r = { }, q = Object( o );
 
            if ( typeof s === "string" ) { 
                r.type = s;
            }
 
            if ( q.hasOwnProperty( "condition" ) ) {
                if ( typeof q.condition === "function" ) { 
                    const v = q.condition( );
                    r.condition = v;
                } else {
                    r.condition = q.condition;
                }
            }
 
            if ( 
                q.hasOwnProperty( "attr" ) ||
                q.hasOwnProperty( "attributes" ) 
            ) {
                const attr = q.attr || q.attributes;
 
                r.attr = attr instanceof Map ? Object.fromEntries( map ) :
                    attr;
            }
 
            if ( 
                q.hasOwnProperty( "data" ) ||
                q.hasOwnProperty( "dataset" ) 
            ) {
                const data = q.data || q.dataset;
 
                r.data = data instanceof Map ? Object.fromEntries( data ) :
                    Object( data );
            }
 
            if ( 
                q.hasOwnProperty( "events" ) ||
                q.hasOwnProperty( "on" )
            ) {
                const evs = q.events || q.on;
                r.events = evs instanceof Map ? Object.fromEntries( evs ) :
                    Object( evs );
            }
 
            if ( q.child ) { 
                r.children = [ q.child ];
            } else if ( q.children ) {
                r.children = q.children;
            }
 
            if ( 
                q.hasOwnProperty( "classes" ) ||
                q.hasOwnProperty( "classNames" )
            ) {
                r.classes = q.classes || q.classNames;
            } else if ( 
                q.hasOwnProperty( "className" )
            ) {
                r.classes = q.className.split( /\s+/g );
            }
 
            if ( q.html ) r.html = q.html;
 
            if ( q.text ) r.text = q.text;
 
            if ( q.parent ) { 
                r.parent = q.parent;
            }
 
            if ( q.hasOwnProperty( "props" ) ) { 
                const props = q.props;
                r.props = props instanceof Map ? Object.fromEntries( props ) :
                    Object( props );
            }
 
            if ( q.checked ) r.checked = q.checked;
 
            if ( q.selected ) r.selected = q.selected;
 
            if ( q.value ) r.value = q.value;
 
            return dil._ui( r );
        };
        
        dil.empty = function( el ) { 
            if ( arguments.length === 0 ) { 
                el = dil.target;
            } else if ( typeof el === "string" ) {
                el = document.querySelector( el );
            }
            
            while ( el.firstChild ) {
                el.removeChild( el.firstChild );
            }
        };
        
        dil.load = function( ) { 
            dil._processing = true;
            
            Promise.all( [ 
                "i18n",
                "ui",
                "wds",
                "colors"
            ].map( function( k ) { 
                return new Promise( function( res, rej ) { 
                    mw.hook( "dev." + k ).add( res );
                } );
            } ) ).then( dil.loadMsgs );
        };
        
        dil.loadMsgs = function( ) { 
            dil._ui = window.dev.ui;
            
            dil._wds = window.dev.wds;
            
            dil._colors = window.dev.colors;
            
            window.dev.i18n.loadMessages( "DupImageList", { 
                noCache : true
            } ).then( dil.init );
        };
        
        dil.init = function( i18n ) { 
            dil._i18n = i18n;
            
            dil.msg = function( ) { 
                const a = Array.from( arguments );
                return dil._i18n.msg.apply( dil._i18n, a );
            };
            
            dil.getIcon = function( ) { 
                const a = Array.from( arguments );
                return dil._wds.icon.apply( dil._wds, a );
            };
            
            dil.addSpinner( );
            
            dil.findDupImages( );
        };
        
        dil.addSpinner = function( ) { 
            dil.spinner = dil.createElement( "svg", { 
                classes : [ 
                    "wds-spinner",
                    "wds-spinner__block"
                ],
                attr : {
                    width : "66",
                    height : "66",
                    viewBox : "0 0 66 66",
                    xmlns : "http://www.w3.org/2000/svg"
                },
                children : [ {
                    type : "g",
                    attr : {
                        transform : "translate(33, 33)"
                    },
                    children : [ { 
                        type : "circle",
                        classes : [ 
                            "wds-spinner__stroke"
                        ],
                        attr : {
                            fill : "none",
                            "stroke-width" : "2",
                            "stroke-dasharray" : "188.49555921538757",
                            "stroke-dashoffset" : "188.49555921538757",
                            "stroke-linecap" : "round",
                            "r" : "30"
                        }
                    } ]
                } ]
            } );
            
            dil.spinnerText = dil.createElement( "p", { 
                classes : [ "DILSpinnerText", "dil-spinner__text" ],
                text : dil.msg( "progress" ).plain( )
            } );
            
            dil.progressEl = dil.createElement( "div", { 
                classes : [ "DILProgress", "dil-progress" ],
                children : [
                    dil.spinner,
                    dil.spinnerText
                ]
            } );
            
            dil.empty( dil.target );
            
            dil.target.appendChild( dil.progressEl );
        };
        
        dil.findDupImagesAjax = function( gf ) { 
            if ( !dil._started ) {
                dil._started = true;
                dil.render( );
            }
            
            const params = new Map( [ 
                [ "action", "query" ],
                [ "prop", "duplicatefiles" ],
                [ "dflimit", "max" ],
                [ "dflocalonly", true ],
                [ "generator", "allimages" ],
                [ "gailimit", "max" ],
                [ "indexpageids", true ]
            ] );
            
            if ( arguments.length > 0 ) { 
                gf = String( gf );
                if ( gf.includes( "|" ) ) {
                    params.set( "dfcontinue", gf );
                    gf = gf.split( /\|/g )[ 0 ];
                }
                params.set( "gaifrom", gf );
            }
            
            return ( new mw.Api( ) )
                .post( Object.fromEntries( params ) );
        };
        
        dil.findDupImages = function( gf ) { 
            const ajax = arguments.length > 0 ? dil.findDupImagesAjax( gf ) :
                dil.findDupImagesAjax( );
                
            ajax.then( function( response ) {
                if ( response.error ) return;
                
                const query = response.query;
                
                const pages = query.pages;
                
                const pageids = query.pageids;
                
                Array.from( pageids || [ ] ).forEach( function( pageid ) { 
                    const page = pages[ pageid ];
                    
                    if ( 
                        extPattern.test( page.title ) && 
                        !dil._dupImages[ page.title ] &&
                        page.duplicatefiles
                    ) {
                        if ( dil._currentTitle !== page.title ) {
                            if ( dil._generated ) {
                                const item = dil.renderTitle( dil._currentTitle );
                                dil.list.append( item );
                            }
                            
                            dil._currentTitle = page.title;
                            dil._dupImages[ dil._currentTitle ] = [ ];
                            
                            dil._generated = true;
                        }
                        
                        const dupFiles = page.duplicatefiles;
                        
                        Array.from( dupFiles || [ ] ).forEach( function( l ) { 
                            dil._dupImages[ dil._currentTitle ]
                                .push( l.name );
                        } );
                    }
                } );
                    
                const continueKey = isUCP ? "continue" : "query-continue";
                
                dil._dcount++;
                
                if ( response[ continueKey ] ) {
                    const r = response[ continueKey ];
                    if ( !isUCP ) {
                        if ( r.duplicatefiles ) {
                            const c = r.duplicatefiles.dfcontinue;
                            
                            dil.findDupImages( c );
                        } else {
                            const c = r.allimages.gaifrom;
                            
                            dil.findDupImages( c );
                        }
                    } else {
                        if ( r.dfcontinue ) {
                            const c = r.dfcontinue;
                            
                            dil.findDupImages( c );
                        } else {
                            const c = r.gaicontinue;
                            
                            dil.findDupImages( c );
                        }
                    }
                } else {
                    dil._processing = false;
                    
                    dil._processed = true;
                    
                    dil._currentTitle = "";
                }
            } );
        };
        
        dil.render = function( ) { 
            dil.list = dil.createElement( "ul", { 
                classes : [ "DupImageList" ],
                attr : {
                    id : "DupImageList"
                }
            } );
            
            dil.content = dil.createElement( "nav", { 
                classes : [ "DupImageListWrapper" ],
                attr : {
                    id : "DupImageListWrapper"
                },
                children : [ dil.list ]
            } );
            
            dil.empty( );
            
            dil.target.append( dil.content );
            
            dil.renderSearch( );
        };
        
        dil.renderSearch = function( ) { 
            dil.search = dil.createElement( "form", { 
                classes : [ "DupImageSearch" ],
                attr : {
                    id : "DupImageSearch"
                },
                children : [ 
                    {
                        type : "div",
                        classes : [ "DupImageSearchInputWrapper" ],
                        attr : {
                            id : "DupImageSearchInputWrapper"
                        },
                        children : [ 
                            {
                                type : "label",
                                attr : {
                                    "for" : "DupImageSearchInput",
                                    id : "DupImageSearchLabel"
                                },
                                classes : [ "DupImageSearchLabel" ],
                                text : dil.msg( "search" ).plain( )
                            },
                            {
                                type : "input",
                                attr : {
                                    type : "text",
                                    id : "DupImageSearchInput",
                                    name : "DupImageSearchInput"
                                },
                                classes : [ "DupImageSearchInput" ],
                                events : {
                                    focusin : function( ev ) {
                                        const target = ev.target;
                                        
                                        const wrapper = target.parentElement;
                                        
                                        if ( !wrapper ) return;
                                        
                                        wrapper.classList.remove( "dormant" );
                                    },
                                    focusout : function( ev ) { 
                                        const target = ev.target;
                                        
                                        const wrapper = target.parentElement;
                                        
                                        if ( !wrapper ) return;
                                        
                                        wrapper.classList.add( "dormant" );
                                    },
                                    input : function( ev ) { 
                                        const targets = Array.from( dil.list.querySelectorAll( ".DupImageTitle" ) );
                                        
                                        const value = ev.target.value;
                                        
                                        if ( value === "" ) {
                                            targets.forEach( function( target ) { 
                                                if ( target.classList.contains( "hidden" ) ) {
                                                    target.classList.remove( "hidden" );
                                                }
                                            } );
                                        } else {
                                            targets.forEach( function( target ) { 
                                                const title = target.dataset.title;
                                                
                                                if ( !title.startsWith( value ) ) {
                                                    target.classList.add( "hidden" );
                                                } else {
                                                    target.classList.remove( "hidden" );
                                                }
                                            } );
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            } );
            
            dil.header = dil.createElement( "header", { 
                classes : [ "DupImageHeader" ],
                attr : {
                    id : "DupImageHeader"
                },
                children : [ dil.search ]
            } );
            
            dil.target.insertAdjacentElement( "afterbegin", dil.header );
        };
        
        dil.renderTitle = function( title ) {
            const d = dil._dupImages[ title ];
            const url = mw.util.getUrl( title );
            
            const delUrl = mw.util.getUrl( title, { 
                action : "delete"
            } );
            
            return dil.createElement( "li", {
                classes : [ "DupImageTitle" ],
                data : {
                    title : title
                },
                children : [ 
                    { 
                        type : "div",
                        classes : [ "DupImageTitleWrapper" ],
                        children : [ 
                            {
                                type : "a",
                                classes : [ "DupImageTitleLink" ],
                                attr : {
                                    href : url
                                },
                                text : title
                            },
                            {
                                type : "div",
                                classes : [ "DupImageDeleteWrapper" ],
                                children : [ { 
                                    type : "a",
                                    classes : [ "DupImageDeleteButton" ],
                                    attr : {
                                        href : delUrl
                                    },
                                    children : [ 
                                        dil.getIcon( "trash", { 
                                            "class" : "DupImageDeleteIcon"
                                        } ),
                                        {
                                            type : "span",
                                            classes : [ "DupImageDeleteButtonText" ],
                                            text : dil.msg( "delete" ).plain( )
                                        }
                                    ],
                                } ],
                                condition : canDelete
                            }
                        ]
                    },
                    {
                        type : "ul",
                        classes : [ "DupImageItems" ],
                        children : d.map( dil.renderDups ),
                        condition : d.length
                    }
                ]
            } );
        };
        
        dil.renderDups = function( dup ) {
            const file = conf.wgFormattedNamespaces[ 6 ] + ":" + dup;
            
            const url = mw.util.getUrl( file );
            
            const delUrl = mw.util.getUrl( file, { 
                action : "delete"
            } );
            
            return {
                type : "li",
                classes : [ "DupImageItem" ],
                data : {
                    file : dup,
                    title : file
                },
                children : [ 
                    { 
                        type : "a",
                        classes : [ "DupImageLink" ],
                        attr : {
                            href : url
                        },
                        text : file
                    },
                    {
                        type : "div",
                        classes : [ "DupImageDeleteWrapper" ],
                        children : [
                            {
                                type : "a",
                                classes : [ "DupImageDeleteButton" ],
                                attr : {
                                    href : delUrl
                                },
                                children : [
                                    dil.getIcon( "trash", { 
                                        "class" : "DupImageDeleteIcon"
                                    } ),
                                    {
                                        type : "span",
                                        classes : [ "DupImageDeleteText" ],
                                        text : dil.msg( "delete" ).plain( )
                                    }
                                ]
                            }
                        ],
                        condition : canDelete
                    }
                ]
            };
        };
        
        mw.loader.using( deps ).then( dil.load );
    }
    
    window.dev.dil = new DupImageList( );
    
    mw.hook( "dev.dil" ).fire( window.dev.dil );
} )( window, jQuery, mediaWiki );