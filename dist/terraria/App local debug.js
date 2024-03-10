function addAjaxDisplayLink() {
  $("table.ajax").each(function (i) {
      var table = $(this).attr("id", "ajaxTable" + i);
      var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
      var cell = table.find("td").first(), needLink = true;

      table.find(".nojs-message").remove();
      cell.parent().show();

      if (cell.hasClass("showLinkHere")) {
          var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
          if (rep != old) {
              cell.html(rep);
              needLink = false;
          }
      }

      if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');

      table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
          var sourceTitle = table.data('ajax-source-page'), baseLink = 'https://' + currentWikiDomain + '.gamepedia.com/index.php?';

          event.preventDefault();
          cell.text('Please wait while the content is being loaded...');

          $.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
              if (data) {
                  var re = /(href=\"\/\/.*?com\/)/g;
                  data = data.replace(re, 'href = "file:///');
                  cell.html(data);
                  cell.find('.ajaxHide').remove();
                  var shown = true;
                  $("<a href='javascript:;'>hide</a>").click(function() {
                      shown = !shown;
                      shown ? cell.show() : cell.hide();
                      $(this).text(shown ? "hide" : "show");
                      console.log("UpdateView");
                  }).appendTo(headerLinks);
              }
          }).error(function() {
              cell.text('Unable to load table; the source article for it might not exist.');
          });
      });
  });
}
$(addAjaxDisplayLink);