/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * |           Please discuss changes on the talk page before editing.           |
 * |_____________________________________________________________________________|
 *
 * Gadget definition for Monaco Sidebar Recent Changes Widget
 */
(function ($, mw) {
  $(function () {
    var monacoWidget = mw.libs.monacoWidget;
    var ns = mw.config.get('wgNamespaceNumber');
    var getRecentChanges = function (widget) {
      widget.state = 1; // loading
      monacoWidget.DoAPIQuery(
        widget, monacoWidget.GetRecentChangesQuery(),
        // query callback
        function (widget, data) {
          widget.state = 2; // loaded
          widget.makeRefreshPic();
          widget.emptyStdListContentElement();
          var rclist = $('#RCWidget_stdlist');
          data.query.recentchanges.forEach(function (result) {
            var pretty = monacoWidget.PrettyDate(result.timestamp);
            var prettyStr = pretty ? ' (' + pretty + ')' : '';
            rclist.append(
              '<li>' + monacoWidget.ArticleLink(result.title, result) +
              '<br/> - ' + monacoWidget.UserLink(result.user) + 
              prettyStr +
              '</li>'
            ); // end append()
          }); // end forEach()
        } // end of DoAPIQuery callback
      ); // end DoAPIQuery()
    };
    if(!monacoWidget || !monacoWidget.IsMonaco() || monacoWidget.Exists('RCWidget'))
      return;
    if(ns < 0 || mw.config.get('wgAction') !== 'view') // not on special pages, and on view only
      return;
    new monacoWidget('RCWidget', 'Recent changes', false, null, true, 0, 'Refresh', 'refresh',
      // content callback
      function (widget) 
      { 
        widget.addStdListContentElement(false);
        getRecentChanges(widget);
      },
      // click callback
      function (widget) {
        if(widget.state == 2)
          getRecentChanges(widget);
      } // end click callback
    ); // end new monacoWidget()
  }); // end $()
})(jQuery, mediaWiki);