(function($) {
     /* Stuff */
     //User blog: 500
     //Message Walls: 1200
     //User: 2
     //Special:Contributions: Use RegExp
     $(function() {
          if (wgNamespaceNumber === 500 || wgNamespaceNumber === 1200 || wgNamespaceNumber === 2 || /^Special:Contributions/.test(wgPageName)) {
               if (/Kayem-san$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Head poncho");
               else if (/(?:IAmBagel)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Head admin");
               else if (/(?:RespectMahAuthoritah)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Bot");
               else if (/(?:Chaossy)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Second in command");
               else if (/(?:Derphox)$/.test(wgPageName)) $('<span style="margin-left: 1em;" class="tag" />').insertAfter($("hgroup span.tag:last")).html("Third in command");
          }
     });
})(jQuery);
 
importScriptPage('User:Monchoman45/ChatHacks.js', 'c');
 
importScriptPage('User:Joeytje50/ChatLogger.js', 'runescape');