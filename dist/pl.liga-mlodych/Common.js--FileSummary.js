/* Automatically fills the summary field in upload form with filebox
 * by: [[User:Xiao Qiao]]
 */
 
if (wgCanonicalSpecialPageName == "Upload" || wgCanonicalSpecialPageName == "MultipleUpload") {
    importScriptPage('MediaWiki:Filebox.js');
}