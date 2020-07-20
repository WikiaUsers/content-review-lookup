/**
 * load the Edittools on [[Special:Upload]] and prefill the summary textarea
 * Load pages: [[MediaWiki:DEdittminiupload.js]], [[MediaWiki:DEdittmini.js]]
 */
if (mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload') {
 importScript("MediaWiki:DEdittminiupload.js");
 importScript("MediaWiki:DEdittmini.js");
}
/**
 * load the Edittools ([[MediaWiki:Edittools]], the part under the edit form)
 * Load page: [[MediaWiki:DEdittmini.js]]
 */
if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
 importScript("MediaWiki:DEdittmini.js");
}