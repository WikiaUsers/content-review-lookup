/* Test */
$(function(window, mw, $, mwConfig){
   if (mwConfig.wgPageName === "Special:Test") {
   var html = '<h2 style='color: blue; background: -webkit-linear-gradient(top, silver, gray 100%);'>Test</h2>'
   $('.WikiaArticle').html(html);
   }
}(this, this jQuery, this mediaWiki, mediaWiki.config.values));