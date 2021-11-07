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
      // JSON5: https://github.com/json5/json5
      loadScript('https://cdn.jsdelivr.net/npm/json5')
    ).then(function() {
      $blocks.each(function(index, item) {
        var $this = $(item)
        var option = {}
        var text = $this.text()
        $this.html('')

        // Try to parse JSON
        try {
          // Parse JSON with JSON5 { foo: 'bar' } -> { "foo": "bar" }
          option = JSON5.parse(text)
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