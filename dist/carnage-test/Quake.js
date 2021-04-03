/**
 * Quake
 * 
 * Some functionality was forked from Dorui
 */
( function( window, mw ) { 
    "use strict";

    const HTML_TAGS = new Set( [ 
        // Core elements
        "html",
        "head",
        "body",
        // Head elements
        "title",
        "meta",
        // Resources
        "script",
        "style",
        "link",
        // Layout
        "span",
        "div",
        // Lists
        "ul",
        "ol",
        "li",
        // Headings
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        // Form layout
        "form",
        "fieldset",
        "label",
        "legend",
        // Form control
        "input",
        "textarea",
        "button",
        "select",
        "option",
        "optgroup",
        "datalist",
        "meter",
        "progress",
        "output",
        // Media
        "img",
        "audio",
        "video",
        "picture",
        "source",
        "track",
        // Text
        "a",
        "cite",
        "p",
        "pre",
        "code",
        "em",
        "i",
        "mark",
        "b",
        "strong",
        "s",
        "u",
        "small",
        "sub",
        "sup",
        "blockquote",
        "q",
        "dl",
        "dd",
        "dt",
        "dfn",
        "kbd",
        "samp",
        "br",
        "hr",
        "abbr",
        "address",
        // HTML5 layout
        "main",
        "article",
        "header",
        "nav",
        "footer",
        "aside",
        "section",
        "figure",
        "figcaption",
        "dialog",
        // HTML5 text
        "time",
        "data",
        "bdi",
        "bdo",
        // Render objects
        "iframe",
        "canvas",
        "object",
        "param",
        "embed",
        "map",
        "area",
        // Tables
        "table",
        "thead",
        "tbody",
        "tfoot",
        "th",
        "td",
        "tr",
        "caption",
        "col",
        "colgroup",
        // Diffs
        "ins",
        "del"
    ] );

    const SVG_TAGS = new Set( [ 
        // Core elements
        "svg",
        // Data
        "g",
        "defs",
        "use",
        "symbol",
        "desc",
        // Shapes
        "line",
        "path",
        "rect",
        "circle",
        "ellipse",
        "polygon",
        "text",
        // Gradients
        "linearGradient",
        "radialGradient",
        "stop",
        // Filters
        "filter",
        "feOffset",
        "feGaussianBlur",
        "feColorMatrix",
        // Other
        "image",
        "mask",
        "geometry",
        "foreignObject",
        "animation",
        "animate",
        "animateTransform",
        "clipPath"
    ] );

    const NS_ATTRS = new Map( Object.entries( { 
        xmlns : "http://www.w3.org/2000/xmlns",
        "xmlns:xlink" : "http://www.w3.org/2000/xmlns",
        "xlink:href" : "http://www.w3.org/1999/xlink"
    } ) );

    function setAttr( elem, k, v, svg ) { 
        if ( svg && NS_ATTRS.has( k ) ) {
            elem.setAttributeNS( NS_ATTRS.get( k ), k, v );
        } else {
            elem.setAttribute( k, v );
        }
    }

    function setElOptions( el, options, svg ) {
        const o = new Map( Object.entries( { 
            html : function( v ) { 
                el.innerHTML = v;
            },
            text : function( v ) {
                el.appendChild( document.createTextNode( v ) );
            },
            child : function( v ) { 
                if ( typeof v === "string" ) {
                    el.appendChild( document.createTextNode( v ) );
                } else {
                    el.appendChild( v );
                }
            },
            children : function( v ) { 
                Array
                    .from( v )
                    .forEach( function( c ) { 
                        if ( typeof c === "string" ) {
                            el.appendChild( document.createTextNode( c ) );
                        } else {
                            el.appendChild( c );
                        }
                    } );
            },
            className : function( v ) { 
                el.className = String( v );
            },
            classNames : function( v ) { 
                if ( Array.isArray( v ) ) { 
                    el.className = v.join( " " );
                } else if ( v instanceof Set ) { 
                    el.className = Array.from( v ).join( " " );
                } else { 
                    const o = v instanceof Map ? 
                        Object.fromEntries( v ) :
                        v;
                    
                    Object.keys( o ).forEach( function( k ) { 
                        const b = o[ k ];

                        const r = b instanceof Function ?
                            b.call( el, k ) :
                            b;
                        
                        if ( b ) el.classList.add( k );
                    } );
                }
            },
            "class" : "className",
            classes : "classNames",
            events : function( v ) { 
                const m = new Map( Object.entries( v ) );

                m.forEach( function( _v, _k ) { 
                    el.addEventListener( _k, _v );
                } );
            },
            on : "events",
            style : function( v ) { 
                v = v instanceof Map ? Object.fromEntries( v ) : v;

                Object.keys( v ).forEach( function( k ) { 
                    const p = v[ k ];

                    var s = k.replace( /[A-Z]/g, function( c ) { 
                        return "-" + c.toLowerCase( );
                    } );

                    const j = new Set( [ 
                        "webkit",
                        "ms",
                        "o",
                        "moz",
                        "khtml"
                    ] );

                    const u = Array.from( j );

                    for ( var i = 0; i < u.length; i++ ) { 
                        if ( s.beginsWith( u[ i ] + "-" ) ) {
                            s = "-" + s;
                            break;
                        }
                    }

                    const isImportant = p
                        .trim( )
                        .endsWith( "!important" );
                    
                    const importance = isImportant ? "important" : "";

                    const g = isImportant ?
                        p.trim( ).slice( 0, -( "!important" ).length ) :
                        p;
                    
                    el.style.setProperty( s, g, importance );
                } );
            },
            css : "style",
            attrs : function( v ) { 
                v = v instanceof Map ? Object.fromEntries( v ) : v;

                Object.keys( v ).forEach( function( k ) { 
                    var l = v[ k ];

                    if ( l === false ) return;
                    else if ( l === true ) l = k;

                    setAttr( el, k, l, svg );
                } );
            },
            "attr" : "attrs",
            props : function( v ) { 
                v = v instanceof Map ? Object.fromEntries( v ) : v;

                Object.keys( v ).forEach( function( k ) { 
                    el[ k ] = v[ k ];
                } );
            }
        } ) );

        const ev = new Set( [ 
            // Focus events
            "focus",
            "blur",
            "focusin",
            "focusout",
            // Animation events
            "animationstart",
            "animationcancel",
            "animationend",
            "animationiteration",
            // Transition events
            "transitionstart",
            "transitioncancel",
            "transitionend",
            "transitionrun",
            // Form events
            "reset",
            "submit",
            // Composition events
            "compositionstart",
            "compositionupdate",
            "compositionend",
            // Keyboard events
            "keydown",
            "keypress",
            "keyup",
            // Mouse events",
            "auxclick",
            "click",
            "contextmenu",
            "dblclick",
            "mousedown",
            "mouseenter",
            "mouseleave",
            "mousemove",
            "mouseover",
            "mouseout",
            "mouseup",
            "pointerlockchange",
            "pointerlockerror",
            "select",
            "wheel",
            // Drag and drop events
            "drag",
            "dragend",
            "dragenter",
            "dragstart",
            "dragleave",
            "dragover",
            "drop",
            // Media events
            "audioprocess",
            "canplay",
            "canplaythrough",
            "complete",
            "durationchange",
            "emptied",
            "ended",
            "loadeddata",
            "loadedmetadata",
            "pause",
            "play",
            "playing",
            "ratechange",
            "seeked",
            "seeking",
            "stalled",
            "suspend",
            "timeupdate",
            "volumechange",
            "waiting",
            // Touch events
            "touchcancel",
            "touchend",
            "touchmove",
            "touchstart",
            // Pointer events
            "pointerover",
            "pointerenter",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointercancel",
            "pointerout",
            "pointerleave",
            "gotpointercapture",
            "lostpointercapture"
        ] );

        ev.forEach( function( e ) { 
            if ( o.has( e ) ) return;

            o.set( e, function( v ) { 
                el.addEventListener( e, v );
            } );
        } );

        const sr = options instanceof Map ? 
            Object.fromEntries( options ) :
            options;
        
        Object.keys( sr ).forEach( function( sk ) { 
            const sv = sr[ sk ];

            if ( o.has( sk ) ) { 
                const skv = o.get( sk );

                if ( typeof skv === "string" ) { 
                    const skvt = o.get( skv );

                    skvt.call( el, sv );
                } else { 
                    skv.call( el, sv );
                }
            } else { 
                setAttr( el, sk, sv, svg );
            }
        } );

        return el;
    }

    function makeEl( tag, options ) { 
        const el = document.createElement( tag );

        return setElOptions( el, options, false );
    }

    function makeSVG( tag, options ) { 
        const el = document.createElementNS( 
            "http://www.w3.org/2000/svg",
            tag
        );

        return setElOptions( el, options, true );
    }

    function el( tag, options ) { 
        if ( SVG_TAGS.has( tag ) ) {
            return makeSVG( tag, options );
        } else {
            return makeEl( tag, options );
        }
    }

    SVG_TAGS.forEach( function( tag ) { 
        el[ tag ] = function( options ) { 
            return el( tag, options );
        };
    } );

    HTML_TAGS.forEach( function( tag ) { 
        el[ tag ] = function( options ) { 
            return el( tag, options );
        };
    } );

    el.text = function( value ) { 
        return document.createTextNode( value );
    };

    el.frag = function( children ) { 
        const frag = document.createDocumentFragment( );

        Array.from( children ).forEach( function( child ) { 
            if ( typeof child === "string" ) { 
                frag.appendChild( el.text( child ) );
            } else if ( child ) { 
                frag.appendChild( child );
            }
        } );

        return frag;
    };

    
} )( window, mediaWiki );