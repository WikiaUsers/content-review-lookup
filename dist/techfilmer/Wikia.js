(function($) {
     /* Authors */
     //User blog: 500
     //Message Walls: 1200
     //User: 2
     //Special:Contributions: Use RegExp
     $(function() {
          if (wgNamespaceNumber === 500 || wgNamespaceNumber === 1200 || wgNamespaceNumber === 2 || /^Special:Contributions/.test(wgPageName)) {
               if (/Godsrule$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Co-Author");
               else if (/(?:KataraLover)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Co-Author");
               else if (/(?:Blueflame[\s_]1)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Beta-Reader");
               else if (/(?:Kuzonkid7[\s_]1)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Editor");
               else if (/(?:Annawantimes)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Editor");
          }
     });
})(jQuery);