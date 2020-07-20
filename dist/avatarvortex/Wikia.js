(function($) {
     /* Authors */
     //User blog: 500
     //Message Walls: 1200
     //User: 2
     //Special:Contributions: Use RegExp
     $(function() {
          if (wgNamespaceNumber === 500 || wgNamespaceNumber === 1200 || wgNamespaceNumber === 2 || /^Special:Contributions/.test(wgPageName)) {
               if (/Suzon$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex");
               else if (/(?:MateyY)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and Legend of Mel");
               else if (/(?:AvatarRokusGhost)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and Energy Saga");
               else if (/(?:Minnichi)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and Silent Hero in Emerald");
               else if (/(?:BlackMonkey)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and The Avatar Rhythm");
               else if (/(?:Agent[\s_]Slash)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and The Slash Trilogy");
               else if (/(?:Wordbender)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and Air");
               else if (/(?:Mageddon725)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Author of Vortex, and the Spirit War trilogy");
          }
     });
})(jQuery);