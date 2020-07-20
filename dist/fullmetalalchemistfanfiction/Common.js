/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

// ArchiveTool
var archiveListTemplate = 'ArchiveList';
var archivePageTemplate = 'ArchivePage';
importScriptPage('ArchiveTool/code.js', 'dev');

$(function() {
  if ( skin === "monaco" ) {
    var $siteNotice = $('#siteNotice');
    $siteNotice.find('script').remove();
    $siteNotice.insertBefore('#article');
    $siteNotice.find('table table').appendTo($siteNotice);
    $siteNotice.find('#mw-dismissable-notice').remove();
  } else {
    $('#mw-dismissable-notice > tbody > tr > td:last').remove();
  }
  if( ( wgAction === "edit" && wgNamespaceNumber > -1 && wgNamespaceNumber % 2 === 0 ) || wgPageName === "Special:CreatePage" )
    $("<div class=warningmessage>Check all site polices before you create an article.</div>")
      .prependTo('#bodyContent');
});

/*</pre>*/