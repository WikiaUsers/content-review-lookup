/**
 * DOMAnimation
 * 
 * Author: Ultimate Dark Carnage
 * Created: July 19, 2020
 * Version: 0.5
 **/
( function( window, document ) { 
    "use strict";
    const CACHE = { 
        cssProps: { },
        springs: { }
    };
    
    const VAR_TYPES = Object.freeze( { 
        array: function( v ) { return Array.isArray( v ); },
        object: function( v ) { return ts( v ) === "[object Object]"; },
        number: function( v ) { return typeof v === "number"; },
        "function": function( v ) { return typeof v === "function"; },
        "string": function( v ) { return typeof v === "string"; },
        "undefined": function( v ) { return typeof v === "undefined"; },
        "void": "undefined",
        boolean: function( v ) { return typeof v === "boolean"; },
        "null": function( v ) { return v === null; },
        "dom": function( v ) { return v.nodeType || v instanceof SVGElement ? true : false; },
        "html": function( v ) { return v instanceof HTMLElement; },
        "svg": function( v ) { return v instanceof SVGElement; },
        map: function( v ) { return v instanceof Map; },
        weakmap: function( v ) { return v instanceof WeakMap; },
        "set": function( v ) { return v instanceof Set; },
        weakset: function( v ) { return v instanceof WeakSet; },
        promise: function( v ) { return v instanceof Promise; }
    } );
    
    function isType( value, type ) { 
        if ( !VAR_TYPES.hasOwnProperty( type ) ) return false;
        const check = VAR_TYPES[ type ];
        if ( typeof check === "string" ) {
            const r = VAR_TYPES[ check ];
            return isType( value, r );
        } 
        return check.call( null, value );
    }
    
    const COLOR_TYPES = Object.freeze( { 
        hex: function( v ) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test( v ); },
        rgb: function( v ) { return /^rgba?/.test( v ); },
        hsl: function( v ) { return /^hsla?/.test( v ); }
    } );
    
    function isColorType( value, type ) {
        if ( !COLOR_TYPES.hasOwnProperty( type ) ) return false;
        const check = COLOR_TYPES[ type ];
        if ( typeof check === "string" ) {
            const r = COLOR_TYPES[ check ];
            return isType( value, r );
        } 
        return check.call( null, value );
    }
    
    function parseEasingParameters( s ) {
        const m = /\(([^)]+)\)/.exec( s );
        return m ? Array.from( m[ 1 ].split( ',' ), parseFloat ) : [ ];
    }
} )( window, document );