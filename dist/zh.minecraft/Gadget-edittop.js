// Imported from [[wikipedia:MediaWiki:Gadget-edittop.js]] as was 675636814.

if ($.inArray( mw.config.get('wgAction'), [ 'view', 'purge' ]) !== -1 && mw.config.get( 'wgNamespaceNumber' ) >=0) {
  $(function edittop_hook () {
    var localtitles = {
      en: 'Edit lead section',
      zh: wgULS('编辑首段', '編輯首段')
    };

    var our_content = $("#content, #mw_content").first();
    var span1 = our_content.find("span.mw-editsection:not(.plainlinks)").first();
    if (!span1.length) {
      return;
    }
    var span0 = span1.clone();

    $("#mw_header h1, #content h1").first().append(span0);
    span0.find("a").each(function (idx) {
      var a = $(this);
      a.attr("title", localtitles[mw.config.get( 'wgUserLanguage' )] || localtitles.zh);
      if ( !/&(ve|)section=T/.test( a.attr( "href" ) ) ) { // not transcluded
        a.attr( "href", a.attr( "href" ).replace( /&(ve|)section=\d+/, "&$1section=0&summary=/*%20" + wgULS('导言', '導言') + "%20*/%20" ) );
      } else if ( /&vesection=/.test( a.attr( "href" ) ) ) { // transcluded, VE
        a.attr( "href", mw.util.getUrl( mw.config.get( 'wgPageName' ) ) + "?veaction=edit&vesection=0&summary=/*%20" + wgULS('导言', '導言') + "%20*/%20" );
      } else { // transcluded, not VE
        a.attr( "href", mw.util.getUrl( mw.config.get( 'wgPageName' ) ) + "?action=edit&section=0&summary=/*%20" + wgULS('导言', '導言') + "%20*/%20" );
      }
    });
  });
}