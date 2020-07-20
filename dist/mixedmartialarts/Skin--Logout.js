function Get_Cookie( name ) {
	
var start = document.cookie.indexOf( name + "=" );
var len = start + name.length + 1;
if ( ( !start ) &&
( name != document.cookie.substring( 0, name.length ) ) )
{
return null;
}
if ( start == -1 ) return null;
var end = document.cookie.indexOf( ";", len );
if ( end == -1 ) end = document.cookie.length;
return unescape( document.cookie.substring( len, end ) );
}

function Delete_Cookie( name, path, domain ) {
if ( Get_Cookie( name ) ) document.cookie = name + "=" +
( ( path ) ? ";path=" + path : "") +
( ( domain ) ? ";domain=" + domain : "" ) +
";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

Delete_Cookie('wikicitiesToken', '/', '.wikia.com');
Delete_Cookie('wikicities_session', '/', '.wikia.com');
window.location='http://mixedmartialarts.wikia.com/wiki/Mixed_Martial_Arts_Wiki';
alert('You should now be logged out. You can continue to use EDGE MMA anonymously, or you can log in again as the same or as a different user. Note that some pages may continue to be displayed as if you were still logged in, until you clear your browser cache.')