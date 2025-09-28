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
  
  function reviver(key, value) {
  // If the value is a string that starts with "function",
  // convert it back into an executable function.
  // used different quote for in-function-variables, e.g. position: "function (point, params, dom, rect, size) {return [point[0], '10%'];}"
    if (typeof value === 'string' && value.startsWith('function')) {
	    // A safer alternative to eval is using new Function().
	    return new Function('return (' + value + ')')();
	    }
    return value;
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
          //option = JSON5.parse(text)
          // Parse JSON with JSON5 { foo: 'bar' } -> { "foo": "bar" } and revive inline function
          option = JSON5.parse(text, reviver)
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