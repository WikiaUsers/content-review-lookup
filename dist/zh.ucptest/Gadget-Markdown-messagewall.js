!(function(){
  // 不是留言墙
  if (mw.config.get('wgNamespaceNumber') !== 1200) {
    console.log('Not message wall');
    return;
  }
  // 加载showdown.js
  $.ajax({
    url: 'https://cdn.jsdelivr.net/npm/showdown@latest/dist/showdown.min.js',
    dataType: 'script',
    crossDomain: true,
    cache: true
  }).then(function(){
    console.log('showdown.js loaded');
    var _interval = setInterval(init, 500);
    var _limit = 0;
    var converter = new showdown.Converter();
    function init() {
      if ($('.MessageWallForum .Message .entity-content').length > 1) {
        // 留言墙加载完毕
        clearInterval(_interval);
        $('.MessageWallForum .Message .entity-content').html(function(){
          return converter.makeHtml($(this).text())
        }).addClass('md-converted');
      } else if (_limit > 60 * 2) {
        // 超时30s仍未加载完毕，终止任务
        clearInterval(_interval);
        console.log('MD message wall timeout');
      } else { }
    }
  });
})();