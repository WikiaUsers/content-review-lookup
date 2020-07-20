/* Adds a toggleable button that lets you hide 
logs from Fandom bots in Special:Log.

Default is 'shown', not hidden.
*/
;(function($) {
   if (mw.config.get('wgCanonicalNamespace') !== 'Special' || 
       mw.config.get('wgCanonicalSpecialPageName') !== 'Log' ) return;

   $('#mw-content-text').prepend('<span id="hide-fandom-logs" data-logs="shown" class="button">Hide logs from Fandom bots</span>');
   
   var bots = ['Wikia',
               'WikiaBot',
               'FandomBot',
               'Fandom',
               'FANDOMbot',
               'FANDOM'
              ];

   $('#hide-fandom-logs').click(function() {
      $parent = $(this)
      $('.mw-logline-move').each(function(i) {
         var user = $(this).children('a.mw-userlink').text();
         if (bots.indexOf(user) >= 0) {
            if ($parent.attr('data-logs') === 'shown') {
               $(this).hide();
            } else {
               $(this).show();
            }
         }
      });
      if ($parent.attr('data-logs') === 'shown') {
         $('#hide-fandom-logs').attr('data-logs', 'hidden');
         $('#hide-fandom-logs').html('Show logs from Fandom bots');
      } else {
         $('#hide-fandom-logs').attr('data-logs', 'shown');
         $('#hide-fandom-logs').html('Hide logs from Fandom bots');
      }
   });
})(this.jQuery);