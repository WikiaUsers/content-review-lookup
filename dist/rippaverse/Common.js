$( function () {
    mw.loader.using( [ "mediawiki.jqueryMsg", "mediawiki.api" ], function () {
        $.urlParam = function ( name ) {
            var results = new RegExp( "[?&]" + name + "=([^&#]*)" ).exec(
                window.location.href
            );
            if ( results == null ) {
                return null;
            }
            return decodeURI( results[ 1 ] ) || 0;
        };

        $.extend( {
            _urlVars: null,
            getUrlVars: function () {
                if ( $._urlVars === null ) {
                    var i,
                        j,
                        hash,
                        hashes = window.location.search
                        .slice( window.location.search.indexOf( "?" ) + 1 )
                        .split( "&" );
                    $._urlVars = {};
                    for ( i = 0, j = hashes.length; i < j; i++ ) {
                        hash = hashes[ i ].split( "=" );
                        $._urlVars[ hash[ 0 ] ] = hash[ 1 ];
                    }
                }
                return $._urlVars;
            },
            getUrlVar: function ( name ) {
                return $.getUrlVars()[ name ];
            },
        } );

        if ( mw.config.get( "wgArticleId" ) == 0 ) {
            if (
                mw.config.get( "wgNamespaceNumber" ) == 0 &&
                ( $.urlParam( "action" ) == "edit" ||
                    $.urlParam( "veaction" ) == "edit" ||
                    $.urlParam( "veaction" ) == "editsource" )
            ) {
                var ParseParams = {
                    action: "parse",
                    page: "Template:AutoNewPageButtons",
                    format: "json",
                };
                var ParseAPI = new mw.Api();

                ParseAPI.get( ParseParams ).done( function ( data ) {
                    $( ".page-header" ).before( data.parse.text[ "*" ] );
                    $( ".AutoNewPageButtons" ).replaceWith(
                        "<center>" +
                        $( ".AutoNewPageButtons" )
                        .html()
                        .replace(
                            /Template:AutoNewPageButtons/g,
                            mw.config.get( "wgPageName" )
                        )
                    );
                    $( 'a[href*="&preload="]' ).attr( "target", "_self" );
                } );
            }
        } else {
            return;
        }
    } );
} );
$( function () {
    mw.loader.using( [ "mediawiki.jqueryMsg", "mediawiki.api" ], function () {
        if ( mw.config.get( "wgCanonicalSpecialPageName" ) === "Upload" ) {
            if ( !$.getUrlVar( "wpForReUpload" ) )
                jQuery( function ( $ ) {
                    "use strict";
                    var $desc = $( "#wpUploadDescription" );
                    if ( $desc.val() ) {
                        return; // If not empty then don't do anything (i.e. error message confirm page)
                    }

                    var params = {
                        action: "parse",
                        page: "Template:Default Upload Summary",
                        format: "json",
                        prop: "wikitext",
                    };
                    var api = new mw.Api();

                    api.get( params ).done( function ( data ) {
                        return $desc.val( data.parse.wikitext[ "*" ] );
                    } );

                    if ( window.location.href.indexOf( "wpForReUpload" ) > -1 ) {
                        return;
                    } else {
                        function verifyLicense() {
                            if ( !$( "#wpLicense" ).val() ) {
                                window.alert( "Licensing must be complete." );
                                return false;
                            }
                        }
                        $desc.closest( "form" ).submit( verifyLicense );
                    }
                } );
        }
    } );
} );