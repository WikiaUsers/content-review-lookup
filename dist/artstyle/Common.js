/* Any JavaScript here will be loaded for all users on every page load. */

// Peppy by James Donaghue

importScript('MediaWiki:Peppy.js');

// Wait until it's loaded

var peppyLoaded = false;
    while(peppyLoaded = false) {
        if($('script[src=\"/index.php?title=MediaWiki:Peppy.js&action=raw&ctype=text/javascript\"]').length < 0) {
            jQuery.find = peppy.query;
            peppyLoaded = true;
        }
    }

//Redirect from Special:MyPage/skin.js/css to actual page, from Wikipedia

if (wgArticleId == 0 && wgUserName) {
  var slash = wgPageName.indexOf('/');
  var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
  var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
  var ext = null;
  if (norm == test + 'js') ext = 'js';
  else if (norm == test + 'css') ext = 'css';
  if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin + '.' + ext);
}