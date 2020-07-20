/*
* Ajax Redirect
* @description Redirects the current page quickly.
* @author Ozuzanna
*/
 
mw.loader.using(['mediawiki.api'], function() {
  if ($('#ca-redirect').length || mw.config.get('wgCanonicalNamespace') === "Thread" || mw.config.get('wgCanonicalNamespace') === "File" || mw.config.get('wgCanonicalSpecialPageName')) return;
 
  if (({"oasis": 1, "wikia": 1})[mw.config.get('skin')] === 1) {
    $('#WikiaPageHeader > .wikia-menu-button > .WikiaMenuElement > li:last-child').after(
      $('<li/>').append('<a style="cursor:pointer" id="ca-redirect">Redirect</a>')
    );
  } else if (mw.config.get('wgNamespaceNumber') !== -1 && mw.config.get('wgAction') === 'view') {
    $('#p-cactions > .pBody > ul > li:last-child').after(
      $('<li/>').append('<a style="cursor:pointer" id="ca-redirect">Redirect</a>')
    );
  }
 
  function respHandler (res) {
    if (res === true) {
      console.log('Redirect successfully made!');
      new BannerNotification('Redirect successfully made!','confirm').show();
      setTimeout((function() {
        window.location.reload();
      }), 3000);
    } else {
      console.log('Failed to edit page!');
      new BannerNotification('Failed to edit page!','error').show();
    }
  }
 
  $('#ca-redirect').click(function() {
    var redir = prompt('Please enter the page you want to redirect to:'),
      api;
 
    if (!redir) {
      console.log('You need to specify the page to redirect to!');
      return;
    }
 
    api = new mw.Api();
    api.post({
      action: 'edit',
      watchlist: 'nochange',
      title: mw.config.get('wgPageName'),
      text: '#REDIRECT [['+redir.charAt(0).toUpperCase() + redir.slice(1)+']]',
      token: mw.user.tokens.get('editToken')
    }).done(function(d) {
        respHandler(!d.error);
    }).fail(function() {
      respHandler(false);
    });
  });
});