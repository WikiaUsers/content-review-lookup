if (mw.config.get('wgNamespaceNumber') === 0 && mw.config.get('wgArticleId') !== 0) {
(function() {
    var pagename = mw.config.get('wgPageName'), pageid = mw.config.get('wgArticleId');
 
    $('#WikiaPageHeader > a').after('<div id="jsdates" style="text-align:center;' + 
      ' font-size:smaller; font-weight:bold;">Created: <span></span> / ' + 
      'Last Update: <span></span></div>');
 
    $.getJSON('/api.php?action=query&prop=info&titles=' + pagename + 
      '&inprop=created&format=json', function(data) {
        var date = data.query.pages[pageid].created;
        date = new Date(date).toJSON().substring(0, date.indexOf('T'));
        $('#jsdates span:first').html(date);
    });
 
    $.getJSON('/api.php?action=query&prop=revisions&titles=' + pagename + 
      '&rvprop=timestamp&rvlimit=1&format=json', function(data) {
        var date = data.query.pages[pageid].revisions[0].timestamp;
        date = new Date(date).toJSON().substring(0, date.indexOf('T'));
        $('#jsdates span:last').html(date);
    });
}());
}