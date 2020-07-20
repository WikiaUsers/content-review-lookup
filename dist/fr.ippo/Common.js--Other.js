if (console) console.log("Other.js en marche !");

// Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================