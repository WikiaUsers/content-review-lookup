/**
 * Timeago
 * 
 * @author      Ultimate Dark Carnage
 * @version     v0.6
 **/
( function( window, mw ) { 
    "use strict";
    // Checks for the dev object
    window.dev = window.dev || { };
    // Checks for the UCP object
    window.UCP = window.UCP || { };
    // If the Timeago object exists, do not run
    if ( 
        window.dev.hasOwnProperty( "timeago" ) ||
        window.dev.hasOwnProperty( "Timeago" )
    ) return;
    // Creates the Timeago object
    [ "dev", "UCP" ].forEach( function( k ) { 
        const _m = k === "UCP" ? "Timeago" : "timeago";
        window[ k ][ _m ] = ( function( window, mw ) { 
            // Minute (in seconds)
            const minute = 60;
            // Hour (in seconds)
            const hour = 60 * minute;
            // Day (in seconds)
            const day = 24 * hour;
            // Month (in seconds)
            const month = 30.44 * day;
            // Year (in seconds)
            const year = ( 146097 / 400 ) * day;
            // Returns a step
            const getStep = function( g, u ) { 
                for ( var i = 0; i < g.length; i++ ) {
                    const s = g[ i ];
                    if ( s.unit === unit ) return s;
                }
            };
            // Returns a date object
            const getDate = function( v ) { 
                return v instanceof Date ? v : new Date( v );
            };
            // Gradations
            const gradations = Object.freeze( { 
                canonical : Object.freeze( [
                    { factor : 1, unit : "now" },
                    { threshold : 0.5, factor : 1, unit : "second" },
                    { threshold : 59.5, factor : 60, unit : "minute" },
                    { threshold : 59.5 * 60, factor : 60 * 60, unit : "hour" },
                    { threshold : 23.5 * 60 * 60, factor : day, unit : "day" },
                    { threshold : 6.5 * day, factor : 7 * day, unit : "week" },
                    { threshold : 3.5 * 7 * day, factor : month, unit : "month" },
                    { threshold : 11.5 * month, factor : year, unit : "year" }
                ] )
            } );
            // Styles
            const styles = Object.freeze( { 
                
                _default : "canonical"
            } );
        } )( window, mw );
    } );
} )( this, mediaWiki );