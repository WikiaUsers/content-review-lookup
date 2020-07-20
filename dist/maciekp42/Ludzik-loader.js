var ludzik_path = "http://macieksoft.bitbucket.org/";

$( function ( ) 
{
    $( ".rekjnapi-loadludzik" ).html( '<object width="640" height="480"><param name="movie" value="' + ludzik_path + '"><embed src="' + ludzik_path + '" width="640" height="480"></embed></object>' );
} );

// Add this line:
// importScriptPage ( 'MediaWiki:Ludzik-loader.js', 'maciekp42' );