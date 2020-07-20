/* Any JavaScript here will be loaded for all users on every page load. See w:c:dev:AjaxRC for info & attribution  */  
AjaxRCRefreshText = 'Auto-Refresh'; AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Special:AbuseLog"]; 
importScriptPage('AjaxRC/code.js', 'dev')
 
/* Clock */
window.DisplayClockJS = '%X %x [%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w] (UTC)';
 
/* Last edit header */
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: true,
    time: 'timeago',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};

window.i = window.i || 0; //Required for SignatureCheck to work properly

// opens links in new tab
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}
/*
ready(function() {

  var website = window.location.hostname;

  var internalLinkRegex = new RegExp('^((((http:\\/\\/|https:\\/\\/)(www\\.)?)?'
                                     + website
                                     + ')|(localhost:\\d{4})|(\\/.*))(\\/.*)?$', '');

  var anchorEls = document.querySelectorAll('a');
  var anchorElsLength = anchorEls.length;

  for (var i = 0; i < anchorElsLength; i++) {
    var anchorEl = anchorEls[i];
    var href = anchorEl.getAttribute('href');

    if (!internalLinkRegex.test(href)) {
      anchorEl.setAttribute('target', '_blank');
    }
  }
});
*/