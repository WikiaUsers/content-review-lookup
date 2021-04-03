/**
 * Google web fonts
 * https://fonts.google.com/selection?query=Open+sans&selection.family=Bowlby+One%7COpen+Sans:400,400i,700,700i
 * Formerly used technique: https://github.com/typekit/webfontloader#get-started
*/

var pageName = mw.config.get("wgPageName");

if (pageName === 'Main_Page') {
	mw.loader.load( 'https://fonts.googleapis.com/css?family=Bowlby+One%7COpen+Sans:400,400i,700,700i', 'text/css' );
}