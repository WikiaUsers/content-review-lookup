/* Automatically fills the summary field in upload form with imagebox */
 
var pageName = mw.config.get( 'wgCanonicalSpecialPageName' );

if (( pageName == 'Upload' ) || ( pageName == 'MultipleUpload' )) {
    document.write('<script src="/index.php?title=MediaWiki:FillUploadTemplate.js&action=raw&ctype=text/javascript&dontcountme=s" type="text/javascript" />');
}