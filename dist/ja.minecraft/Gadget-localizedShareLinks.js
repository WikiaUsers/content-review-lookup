$( function () {
  var wgPageName = mw.config.get( 'wgPageName' ),
      wgServer = mw.config.get( 'wgServer' ),
      wgSiteName = mw.config.get( 'wgSiteName' );
  var title = wgPageName.replace( /_/g, ' ' );
  
  var text = '「' + title + '」を' + wgSiteName + 'で見てみましょう';
  var url = wgServer + '/' + encodeURI( wgPageName ).replace( /\?/g, '%3F' );
  
  // Twitter
  var twitterIntentURL = 'https://twitter.com/intent/tweet?text=' + encodeURI( text + ' --' ) + '&via=CurseGamepedia&url=' + encodeURI( url );
  $( '#socialIconImages a:eq(0)' ).attr( 'href', twitterIntentURL );
} );