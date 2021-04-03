
/*
* NotabilityMove v1.1 (rev 6/13/2017)
* @description Allows for quick moving of pages deemed non-notable.
*
* Based off of
*     [[w:c:dev:AjaxRedirect]] by Ozuzanna
*/

// todo: option to move to "User blog" namespace (sysop ONLY) + modal

var ug = mw.config.get("wgUserGroups").join(' ');
if (ug.indexOf('sysop') + ug.indexOf('content-moderator') > -2) {

    ;(function($, mw) {
      if ($('#ca-ncu').length // already exists
      || mw.config.get('wgCanonicalNamespace') === "Thread"
      || mw.config.get('wgCanonicalNamespace') === "File"
      || mw.config.get('wgCanonicalNamespace') === "MediaWiki"
      || mw.config.get('wgCanonicalSpecialPageName')) return;
    
      if (({"oasis": 1, "wikia": 1})[mw.config.get('skin')] === 1) {
        $('.page-header__contribution-buttons').append(
          '<a class="wds-button wds-is-squished wds-is-secondary" id="ca-ncu" href><span>NCU Move</span></a>');
      } else if (mw.config.get('wgNamespaceNumber') !== -1 && mw.config.get('wgAction') === 'view') {
        $('#p-cactions > .pBody > ul > li:last-child').after(
          $('<li/>').append('<a style="cursor:pointer" id="ca-ncu">NCU move</a>')
        );
      }
      
      function respHandler (res, type) {
        if (res === true) {
          console.log(type + ' successful!');
          new BannerNotification(type + ' succesful!','confirm').show();
          
          if (type === "Protect")
              setTimeout((function() { window.location.reload(); }), 3000);
        } else {
          console.log('Failiure: ' + type);
          new BannerNotification('Failiure: ' + type,'error').show();
        }
      }
    
      // Declare vars
      var api,token;
      var oldPageName,basePageName;
      var newPageName;
    
      $('#ca-ncu').click(function() {
        var targUser = prompt('Please enter the target user:');
          
        if (!targUser) {
          console.log('You need to specify the target user!');
          return;
        }
        
        // Initialize vars
        token = mw.user.tokens.get('editToken');
        oldPageName = mw.config.get('wgPageName');
        basePageName = /^(?:[A-Za-z]*:)?(.+)/.exec(oldPageName)[1]; // removes namespace
        newPageName  = 'User:' + targUser + '/' + basePageName;
        api = new mw.Api();
        
        // Confirm move
        if (!confirm('"'
            + oldPageName.replace(/_/g, ' ') + '" will be moved to\n"'
            + newPageName.replace(/_/g, ' ') + '".')) return;
        
        // Move page
        api.post({
          action: 'move',
          from: oldPageName,
          to:   newPageName,
          noredirect: '',
          reason: '[[RW:NCU|Does not meet notability policies]]. ([[Help:Why was the page I created deleted?|why?]])',
          token: token
        }).done(function(d) {
            respHandler(!d.error, "Move"); // move succesful
            
            // Temporarily protect page
            api.post({
                format: 'json',
                action: 'protect',
                expiry: '1 hour',
                protections: 'create=sysop',
                watchlist: 'nochange',
                title: oldPageName,
                reason: 'Automatically protected page when moving to user space.',
                token: token
            })
            .done(function(d) { respHandler(!d.error, "Protect"); })
            .fail(function()  { resphandler(false,    "Protect"); });
            
        }).fail(function() {
          respHandler(false, "Move");
        });
      });
      
    })(this.jQuery, this.mediaWiki);
    
}