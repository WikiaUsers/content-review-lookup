importArticles({
    type: "style",
    article: "u:dev:ExtendedNavigation/code.css"
});

/*
$(function() {
  if ($('#WikiaRail').length) { 
    $('#WikiaRail').bind('DOMNodeInserted.module', function(event) { //fires after lazy-loading takes place.
      if ($('#WikiaRail section') .size() && !$('#Searches').size()) { 
        $('#WikiaRail section:first-of-type').before("<section id='Searches' class='rail-module center'>"
          + '<center><a href="/wiki/%E5%8F%AC%E5%96%9A%E7%8D%B8%E6%90%9C%E5%B0%8B%E5%99%A8"><img src="https://vignette.wikia.nocookie.net/tos/images/5/54/%E5%8F%AC%E5%96%9A%E7%8D%B8%E6%90%9C%E5%B0%8Bi.png/revision/latest?cb=20150407113752&path-prefix=zh" width="100" height="100" border="0"></a>　　　<a href="http://www.towerofsaviors.com/zh/guildsearch"><img src="https://vignette.wikia.nocookie.net/tos/images/9/9d/%E5%85%AC%E6%9C%83%E6%90%9C%E5%B0%8Bi.png/revision/latest?cb=20150407113900&path-prefix=zh" width="100" height="100" border="0"></a></center>'
          +"</section>");
      }
    });
  }
});
*/

window.BackToTopText = "回到頂端";
window.PurgeButtonText = "重新整理";