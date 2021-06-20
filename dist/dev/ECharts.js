/**
 * @name WikiECharts
 * @desc Provides the function of inserting
 *       ECharts table into the wiki page.
 */
!(function(window, $) {
  // @function loadScript
  var loadScript = function(url) {
    return $.ajax({
      url: url,
      dataType: 'script',
      cache: true
    })
  }

  // Get blocks
  var $blocks = $('.ECharts, .Echarts, .echarts')
  if ($blocks.length > 0) {
    // Load dependencies
    // These are trusted official CDN
    $.when(
      // Apache ECharts
      loadScript('https://cdn.jsdelivr.net/npm/echarts'),
      // jsonrepair: Repair invalid JSON without eval()
      loadScript('https://cdn.jsdelivr.net/npm/jsonrepair')
    ).then(function() {
      $blocks.each(function(index, item) {
        var $this = $(item)
        var option = {}
        var text = $this.text()
        $this.html('')

        // Try to parse JSON
        try {
          // Try to repair invalid JSON { foo: 'bar' } -> { "foo": "bar" }
          var repairedJson = jsonrepair(text)
          option = JSON.parse(repairedJson)
        } catch (e) {
          $this.append(
            $('<pre>', {
              class: 'error',
              html: 'ECharts options parse error:\n' + e
            })
          )
          return console.warn('ECharts options parse error', item, e)
        }

        // Init Chart
        var thisChart = echarts.init($this.get(0))
        thisChart.setOption(option)

        // Resize Chart
        thisChart.resize()
        $(window).on('resize', function() {
          thisChart.resize()
        })
        $('.mw-collapsible-toggle, .pi-section-tab').click(function() {
          thisChart.resize()
        })
      })
    })
  }
})(window, jQuery);