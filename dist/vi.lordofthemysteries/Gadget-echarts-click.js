// User:Khánh/common.js
mw.hook('wikipage.content').add(function($content) {
  $content.find('.echarts').each(function() {
    // The actual chart is initialized on the first child div
    var mount = this.querySelector(':scope > div');
    if (!mount || !window.echarts) return;

    var chart = echarts.getInstanceByDom(mount);
    if (!chart) return;

    chart.off('click'); // avoid duplicates
    chart.on('click', function(params) {
      if (params.data && params.data.url) {
        // Open internal wiki links in same tab, external in new tab
        var href = params.data.url;
        if (href.startsWith('/wiki/')) {
          location.href = href;
        } else {
          window.open(href, '_blank');
        }
      }
    });
  });
});