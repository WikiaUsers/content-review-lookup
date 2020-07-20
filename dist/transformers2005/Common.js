/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
importStylesheet("Template:Ambox/code.css");
function includePage( name )
{
 document.write('<script type="text/javascript" src="' + wgScript + '?title='
  + name 
  + '&action=raw&ctype=text/javascript"><\/script>' 
 );
}
/* End of includePage */
 
 
/* Including extra .js pages */ 
 
// switches for scripts
// TODO: migrate to JSConfig
// var load_extratabs = true;
var load_edittools = true;
 
// extra drop down menu on editing for adding special characters
includePage( 'MediaWiki:Edittools.js' );

/* Imagemap Editor */
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');