/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 /* Skins anpassen für Artikel (geklaut aus der Kamelopedia...die hams von der Uncy)
 * Alles geklaut von: http://uncyclopedia.org/wiki/MediaWiki:Common.js 
 * Instructions:
 * 1) Add the page title and namespace exactly ("Name_space:Page_name") as new skin, use 
 *    UNDERSCORES *NOT* SPACES: ("Main_Page": "", should be first line). The next parameter 
 *    is optionally an existing "MediaWiki:Skin/"-prefixed file (in which case you can skip 
 *    step 2).
 * 2) Create MediaWiki:Skin/Name_Space:Page_Name.css and place reskin CSS content there.
 */
 
 reskin = {
    "Main_Page": "",
    "Snoop kamell": "Snoop kamell.css"
 //Make sure all lines in this list except the last one have a comma after!
 }
 var skinName;
 
 if (reskin[wgPageName] != undefined && wgIsArticle == true) {
     skinName = (reskin[wgPageName].length > 0) ? reskin[wgPageName] : wgPageName + '.css';
     document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }