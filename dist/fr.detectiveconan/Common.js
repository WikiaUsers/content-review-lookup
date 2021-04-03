/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

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


*/
if (mw.config.get('wgPageName') == 'Blog:Darwin') {
    $('#mw-content-text').before('<table class="plainlinks" style="padding: 5px; color: #555555; background: #f9fafc; font-size: 14px; text-align: center; border: 1px solid black; margin: 0 auto 10px"><tr><th rowspan="3" style="width: 1px;"><img alt="Darwin logo" src="http://images3.wikia.nocookie.net/__cb20130817023136/darwin8086/images/7/75/Darwin_logo.png" width="150" height="92" data-image-name="Darwin logo.png" data-image-key="Darwin_logo.png"></th><th style="font-size:225%; color: #02518C; padding-top: 5px"><img alt="Project Darwin" src="http://images3.wikia.nocookie.net/darwin8086/images/thumb/f/f8/Project_Darwin.png/200px-Project_Darwin.png" width="200" height="36" data-image-name="Project Darwin.png" data-image-key="Project_Darwin.png"></th></tr><tr><td><table cellspacing="5" style="margin-top: -5px; padding: 5px; text-align: left"><tr><th style="text-align: right; padding-right: 10px"><i>Read more</i></th><td><a href="http://community.wikia.com/wiki/Blog:Darwin" class="extiw" title="w:Blog:Darwin">Staff Blog</a> • <a href="http://community.wikia.com/wiki/Board:Nouveau_sur_Wiki_DetectiveConan" class="extiw" title="w:Board:Nouveau_sur_Wiki_DetectiveConan">Forum</a> • <a href="http://community.wikia.com/wiki/Help:Darwin" class="extiw" title="w:Help:Darwin">Help Pages</a></td></tr><tr><th style="text-align: right; padding-right: 10px"><i>Try it out</i></th><td><a href="http://darwin.wikia.com/wiki/" class="extiw" title="w:c:darwin">Darwin Wikia</a> • <a href="http://communitytest.wikia.com/wiki/" class="extiw" title="w:c:ct">Community Test Wikia</a></td></tr></table></td></tr></table>');
}