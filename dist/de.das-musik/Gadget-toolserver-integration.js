/*
  Integration vieler externer Hilfsfunktionen vor allem des Toolservers in die Oberfläche der Wikipedia
  mittels zusätzlicher Karteireiter an geeigneten Stellen abhängig vom Kontext der gerade dargestellten
  Seite (Artikel, Bildseite, Benutzerseite, Kategorie...).
*/
  var tab_fist = "FIST";
  var tab_fist_tooltip = null;
  var tab_autoreviewer = "Autoreviewer";
  var tab_autoreviewer_tooltip = null;
  var tab_commonshelper = "Commonshelper";
  var tab_commonshelper_tooltip = null;
  var tab_templatetiger = "Templatetiger";
  var tab_templatetiger_tooltip = null;
  var tab_mydiff = "MyDiff";
  var tab_mydiff_tooltip = null;
  var tab_gallery = "Gallery";
  var tab_gallery_tooltip = null;
  var tab_orphans = "orphans";
  var tab_orphans_tooltip = null;
  var tab_untagged = "Untagged";
  var tab_untagged_tooltip = null;
  var tab_webchecklinks = "Weblink-Check";
  var tab_webchecklinks_tooltip = null;
  var tab_navicheck = "NaviLinkCheck";
  var tab_navicheck_tooltip = null;
  var tab_reviw = "Rev-IW";
  var tab_reviw_tooltip = null;
  var tab_userpages = "UserPages";
  var tab_userpages_tooltip = null;
  var tab_catscan = "CatScan";
  var tab_catscan_tooltip = null;
  var tab_catgraph_article = 'Catgraph'
  var tab_catgraph_article_tooltip = null;
  var tab_catgraph_super = 'Catgraph-Super'
  var tab_catgraph_super_tooltip = null;
  var tab_catgraph_sub = 'Catgraph-Sub'
  var tab_catgraph_sub_tooltip = null;
  importScript('MediaWiki:Gadget-toolserver-integration.js/' + wgUserLanguage.split("-",2)[0]);

var load_tsTools = function() {
  if (mw.config.get( 'wgAction' ) !== "view" && mw.config.get( 'wgAction' ) !== "edit" && mw.config.get( 'wgAction' ) !== "submit" && mw.config.get( 'wgAction' ) !== "history" && mw.config.get( 'wgAction' ) !== "purge"  && mw.config.get( 'wgAction' ) !== "rollback") return;
  if(mw.config.get( 'wgNamespaceNumber' ) >= 0){
    if (document.getElementById('ca-history')) mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~daniel/WikiSense/MyDiff.php?wiki=de.wikipedia.org&user=' + gti_escapeTitle(mw.config.get( 'wgUserName' )) + '&title=' + gti_escapeTitle(mw.config.get( 'wgPageName' )), tab_mydiff, 'ca-mydiff', null, null, document.getElementById('ca-history').nextSibling);
  }

  switch(mw.config.get( 'wgNamespaceNumber' )){
    case -1:
      if(mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Watchlist' || (mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Contributions' && getInnerText(document.getElementById('contentSub').getElementsByTagName("a")[0]) == mw.config.get( 'wgUserName' ))) {
        mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~merl/UserPages/Changes/' + gti_escapeTitle(mw.config.get( 'wgUserName' )) , tab_userpages, 'ca-userpages', tab_userpages_tooltip);
      }
      if(wgCanonicalSpecialPageName == 'Contributions') {
        mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~daniel/WikiSense/Gallery.php?wikilang=de&wikifam=.wikipedia.org&img_user_text=' + gti_escapeTitle(getInnerText(document.getElementById('contentSub').getElementsByTagName("a")[0])) , tab_gallery, 'ca-gallery', tab_gallery_tooltip);
      }
      break;
    case 0:
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~merl/reverselanglinks/query.php?wiki=wikipedia&lang=de&ns=0&page=' + gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_reviw, 'ca-reviw', tab_reviw_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~magnus/fist.php?doit=1&language=de&project=wikipedia&data=' + gti_escapeTitle(mw.config.get( 'wgPageName' )) + '&datatype=articles&params[catdepth]=0&params[random]=50&params[ll_max]=5&params[free_only]=1&params[commons_max]=5&params[commonsense]=on' + '&params[flickr_max]=5&params[flickr_new_name_from_article]=1&params[wts_max]=5&params[gimp_max]=5&params[esp_max]=5&params[esp_skip_flickr]=1&params[forarticles]=all&params[lessthan_images]=3&params[jpeg]=1&params[png]=1&params[gif]=1&params[svg]=1&params[min_width]=80&params[min_height]=80&sources[languagelinks]=1&sources[commons]=1&sources[flickr]=1&sources[wts]=1&sources[gimp]=1&sources[everystockphoto]=1', tab_fist, 'ca-fist', tab_fist);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~timl/cgi-bin/wikilint?l=de&do_typo_check=ON&remove_century=ON&url=http://de.wikipedia.org/wiki/' + gti_escapeTitle(mw.config.get( 'wgPageName' )), tab_autoreviewer, 'ca-autoreviewer', tab_autoreviewer_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~dapete/catgraph/graph.php?wiki=wikipedia&lang=de&sub=article&cat='+  gti_escapeTitle(mw.config.get( 'wgPageName' )), tab_catgraph_article, 'ca-catscan_article', tab_catgraph_article_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~dispenser/cgi-bin/webchecklinks.py?page=de%3A'+  gti_escapeTitle(mw.config.get( 'wgPageName' )), tab_webchecklinks, 'ca-webchecklinks', tab_webchecklinks_tooltip);
      break;
    case 2:
    case 3:
      if (document.getElementById('t-log') && mw.config.get( 'wgTitle' ).indexOf('/') == -1){ //keine anonymen, keine Unterseiten
        mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~daniel/WikiSense/Gallery.php?wikilang=de&wikifam=.wikipedia.org&img_user_text=' + gti_escapeTitle(mw.config.get( 'wgTitle' )) , tab_gallery, 'ca-gallery', tab_gallery_tooltip);
        mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~daniel/WikiSense/OrphanImages.php?wikilang=de&wikifam=.wikipedia.org&img_user_text=' + gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_orphans, 'ca-orphans', tab_orphans_tooltip);
        mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~daniel/WikiSense/UntaggedImages.php?wikilang=de&wikifam=.wikipedia.org&img_user_text=' + gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_untagged, 'ca-untagged', tab_untagged_tooltip);
       }
     break;
    case 6:
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~magnus/commonshelper.php?interface=' + wgUserLanguage + '&language=de&image=' + gti_escapeTitle(mw.config.get( 'wgTitle' )) + '&project=wikipedia&username=' + wgUserName + '&commonsense=1&doit=Get+text' , tab_commonshelper, 'ca-commonshelper', tab_commonshelper_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~dapete/catgraph/graph.php?wiki=' + ((mw.config.get( 'wgTitle') == 0) ? 'commons' : 'wikipedia') + '&lang=de&ns=6&cat='+  gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_catgraph_article, 'ca-catscan_article', tab_catgraph_article_tooltip);
      break;
    case 10:
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~merl/reverselanglinks/query.php?wiki=wikipedia&lang=de&ns=10&page=' + gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_reviw, 'ca-reviw', tab_reviw_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~kolossos/templatetiger/tt-table4.php?lang=de&offset=0&limit=30&template=' + gti_escapeTitle(mw.config.get( 'wgTitle' )) , tab_templatetiger, 'ca-templatetiger', tab_templatetiger_tooltip);
      if(wgTitle.substr(0,17) == 'Navigationsleiste') mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~merl/specialpages/dewiki/Navigationsleistenwartung/' + gti_escapeTitle(mw.config.get( 'wgTitle' )) , tab_navicheck, 'ca-navicheck', tab_navicheck_tooltip);
      break;
    case 14:
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~merl/reverselanglinks/query.php?wiki=wikipedia&lang=de&ns=14&page=' + gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_reviw, 'ca-reviw', tab_reviw_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~magnus/catscan_rewrite.php?language=de&project=wikipedia&interface_language=' + mw.config.get( 'wgUserLanguage' ) + '&categories='+  gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_catscan, 'ca-catscan', tab_catscan_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~dapete/catgraph/graph.php?wiki=wikipedia&lang=de&sub=0&cat='+  gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_catgraph_super, 'ca-catscan_super', tab_catgraph_super_tooltip);
      mw.util.addPortletLink('p-cactions', 'http://toolserver.org/~dapete/catgraph/graph.php?wiki=wikipedia&lang=de&sub=1&cat='+  gti_escapeTitle(mw.config.get( 'wgTitle' )), tab_catgraph_sub, 'ca-catscan_sub', tab_catgraph_sub_tooltip);
    default:
      // nothing
  }
}

function gti_escapeTitle( text ) {
  var re = new RegExp( "\\+", "g" );
  text = text.replace( re, "%2B" );
  re = new RegExp( "&", "g" );
  text = text.replace( re, "%26" );
  re = new RegExp( " ", "g" );
  text = text.replace( re, "_" );
  return text;
} 
jQuery( document ).ready(load_tsTools);