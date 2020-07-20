(function($) {
     /* Adds a tag to each of the WSL staff members
      * With the position they hold
      * By [[User:MateyY|MateyY]]
      */
     //User blog: 500
     //Message Walls: 1200
     //User: 2
     //Special:Contributions: Use RegExp
     $(function() {
          if (wgNamespaceNumber === 500 || wgNamespaceNumber === 1200 || wgNamespaceNumber === 2 || /^Special:Contributions/.test(wgPageName)) {
               if (/Omashu[\s_]Rocks$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Editor");
               else if (/(?:MateyY|AvatarRokusGhost|Minnichi)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Deputy editor");
          }
     });
     importArticles({ type: "script", article: "User:MateyY/LatestIssue.js" });
})(jQuery);