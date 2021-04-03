$(function() {
  // Talk link does not already exist
  if ($('#ca-talk').length === 0) {
    var talkLink = "/wiki/Talk:" + wgPageName;
    
    // This Promise makes an ajax request to the Talk page for this article
    // Then, it counts the number of links containing "User:" in the
    // article page area. This number is the number of responses on the page.
    new Promise(function (resolve, reject) {
      $.ajax({
        url      : talkLink,
        dataType : 'html',
        success  : function (data) {
          var allLinks = $(data).find('#WikiaArticle a');

          var numResponses = allLinks.toArray().filter(function(link) {
            return link.toString().includes('User:');
          }).length;

          resolve(numResponses);
        },
        // If the Talk page doesn't exist, it returns an HTTP 404 status code,
        // which triggers error.
        error : function () { resolve(0); }
      });
    }).then(function(talkNum) {
      // This part creates the link to the talk page in the dropdown.
      // Since the dropdown itself doesn't have an id, we select the edit
      // button by its id and work our way up from there before appending.
      $("#ca-delete").parent().append(
        '<li>'
          + '<a '
            + 'id="ca-talk" '
            + 'href="' + talkLink +'" '
            + 'accesskey="t"'
            + 'rel="nofollow" '
            + 'data-tracking="ca-talk-dropdown">'
            + 'Talk (' + talkNum +')'
          + '</a>'
        + '</li>');
    });
    
    /*** This section adds a "What Links Here?" link to the dropdown ***/
    var linksHereLink = "/wiki/Special:WhatLinksHere?target=" + mw.config.wgPageName;
      
    $("#ca-delete").parent().append(
      '<li>'
        + '<a '
          + 'id="ca-links-here" '
          + 'href="' + linksHereLink +'" '
          + 'accesskey="t"'
          + 'rel="nofollow" '
          + 'data-tracking="ca-links-here-dropdown">'
          + 'What Links Here?'
        + '</a>'
      + '</li>');
  }
});