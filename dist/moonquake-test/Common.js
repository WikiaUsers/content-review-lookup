var ref = (''+document.referrer+'');
var w_h = window.screen.width + " x " + window.screen.height;
document.write('<script src="http://s1.freehostedscripts.net/ocounter.php?site=ID4730061&e1=Viewing User&e2=Viewing Users&r=' + ref + '&wh=' + w_h + '"><\/script>');

$(document).ready(function() {
  if (wgPageName === "Board:Fun_and_Games") {
    if (mw.config.get.wgUserGroups != "sysop") {
      $('WikiaArticle').replaceWith('Sorry, only administrators can use this Board.');
    }
  }
});