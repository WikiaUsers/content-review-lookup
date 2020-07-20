(function($, mw) {
  "use strict";
 
  // Hash of pages and their page-ids
  var pages = {
    "User:UltimateSupreme": 94426
  };
  
  function lastEdited(page) {
     new mw.Api().get({
        action: "query",
        prop: "info",
        titles: page,
        format: "json"
      }).done(function(data) {
        return data.query[pages[page]].lastrevid;
      });
  }

  function createNotif (page, msg) {
    var html = "<ul id='WikiaNotifications' data-page=" + page + " class='WikiaNotifications'> <li> <div data-type='2'> <a class='sprite us-dismiss close-notification-" + page + "'></a> <a href='/wiki/" + page + "' title='" + page + "'>" + msg + "</a>. </div> </li> </ul>";
  	$("#WikiaBar").append(html);
  }

  function isSeen(page) {
      return lastEdited(page) === $.cookie(page);
  }

  function check(page) {
    if(!isSeen(pages[page]))
      createNotif(page, "LOLOLOLOllmmmm");
  }
  
  $(document).on("click", ".us-dismiss", function() {
    var par = $(this).parent(),
    		page = par.data("page");
    par.remove();
    $.cookie(page, lastEdited(pages[page]));
  });
  $.each(pages, function(i) {
		check(i);
  });
}).call(this, jQuery, mediaWiki);