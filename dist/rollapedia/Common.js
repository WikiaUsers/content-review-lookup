/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');

/* Including extra .js pages */ 
// switches for scripts
var load_edittools = true;
 
// extra drop down menu on editing for adding special characters
includePage( 'MediaWiki:Edittools.js' );