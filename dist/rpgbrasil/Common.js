// Plugin Setups
// =============
window.spAllowedNS = [4];
window.spOnlyStripNS = [4];

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

// SubPages Begin
(function($){
  "use strict";
  
  if(typeof window.SubPages !== 'undefined') return false;
  
  window.SubPages = {
    version: '1.0',
    init: function(){
      if(typeof wgNamespaceNumber === 'undefined' || wgFormattedNamespaces[wgNamespaceNumber] === undefined) return false;
      if(typeof wgIsArticle === 'undefined' || wgIsArticle === false) return false;
      if(typeof wgIsMainPage !== 'undefined' && wgIsMainPage === true) return false;
      if(!window.spAllowedNS || window.spAllowedNS.indexOf(wgNamespaceNumber) == -1) return false;
      
      var pageName = wgPageName.replace(wgFormattedNamespaces[wgNamespaceNumber].replace(/ /g,'_')+":",'').replace(/_/g,' ');
      $('#WikiaPageHeader > h1').text(pageName);
      
      if(typeof window.spOnlyStripNS !== 'undefined' && window.spOnlyStripNS.indexOf(wgNamespaceNumber) != -1) return true;
      
      var pageLevels = pageName.split('/');
      if(pageLevels.length > 1){
        var linkTitle = wgFormattedNamespaces[wgNamespaceNumber]+":"+pageLevels.slice(0,-1).join('/');
        var linkUrl = wgArticlePath.replace('$1',linkTitle.replace(/ /g,'_'));
        $('<h2>').text(wgFormattedNamespaces[wgNamespaceNumber]+' | < ').appendTo('#WikiaPageHeader');
        $('<a>').attr({href: linkUrl, title: linkTitle }).text(linkTitle).appendTo('#WikiaPageHeader > h2');
      } else $('<h2>').text(wgFormattedNamespaces[wgNamespaceNumber]).appendTo('#WikiaPageHeader');
    }
  };
  
  $(document).ready(window.SubPages.init);
})(jQuery);
// SubPages End