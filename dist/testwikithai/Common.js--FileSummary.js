/* Automatically fills the summary field in upload form with filebox
 * by: [[User:Xiao Qiao]]
 */

if (wgCanonicalSpecialPageName == "Upload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

if (wgCanonicalSpecialPageName == "MultipleUpload") {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}