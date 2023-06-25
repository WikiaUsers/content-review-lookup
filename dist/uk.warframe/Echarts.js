/**
 * @author 机智的小鱼君 (https://dev.fandom.com/wiki/ECharts)
 * @name Modified WikiECharts 
 * @desc Provides the function of inserting
 *       ECharts table into the wiki page.
 *       Also support js code inside with eval()
 * 
 *       Graphs will be placed in separate templates
 *       Adding/editing code in template will only be possible
 *       for moderators/administrators to prevent malicious code adding
 */
!(function(window, $) {
  // @function loadScript
  var loadScript = function(url) {
    return $.ajax({
      url: url,
      dataType: 'script',
      cache: true
    });
  };

  // Get blocks
  var $blocks = $('.ECharts-template, .Echarts-template, .echarts-template');
  if ($blocks.length > 0) {
    // Load dependencies
    // These are trusted official CDN
    $.when(
      // Apache ECharts
      loadScript('https://cdn.jsdelivr.net/npm/echarts'),
      loadScript('https://cdn.jsdelivr.net/npm/echarts-gl')//, Extension pack of ECharts providing 3D plots and globe visualization
      // JSON5: https://github.com/json5/json5
      //loadScript('https://cdn.jsdelivr.net/npm/json5')
    ).then(function() {
      $blocks.each(function(index, item) {
        var $this = $(item);
        var option;
        var text = $this.text();
        $this.html('');
        try {
          option = '';
          eval(text);
        } catch (e) {
          $this.append(
            $('<pre>', {
              class: 'error',
              html: 'ECharts options parse error:\n' + e
            })
          );
          return console.warn('ECharts options parse error', item, e);
        }

        // Init Chart
        var thisChart = echarts.init($this.get(0));
        thisChart.setOption(option);
        // Resize Chart
        thisChart.resize();
        $(window).on('resize', function() {
          thisChart.resize();
        });
        $('.mw-collapsible-toggle, .pi-section-tab').click(function() {
          thisChart.resize();
        });
      });
    });
  }
})(window, jQuery);