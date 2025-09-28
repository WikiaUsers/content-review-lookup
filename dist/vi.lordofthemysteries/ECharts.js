if (mw.config.get("wgPageName") === "MediaWiki:ECharts.js") {
  // Create a container for the chart
  var chartBox = document.createElement("div");
  chartBox.className = "ECharts"; // matches your script’s selector
  chartBox.style.width = "100%";
  chartBox.style.height = "600px";

  // Inject into the wiki content area
  document.getElementById("mw-content-text").appendChild(chartBox);

  // Now your existing WikiECharts script will find `.ECharts`
  // and render the chart inside it
}

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
        $this.html('')
        
        var data = {
					  name: 'flare',
					  description: 'Root of the flare hierarchy',
					  url: 'https://example.com/flare',
					  image: 'https://via.placeholder.com/40?text=flare',
					  children: [
					    {
					      name: 'analytics',
					      children: [
					        {
					              name: 'analytics',
					              description: 'Analytics tools and algorithms',
					              url: 'https://lordofthemysteries.fandom.com/vi/wiki/Main_Page',
					              image: 'https://via.placeholder.com/40?text=analytics',
					              children: [
					                {
					                  name: 'cluster',
					                  description: 'Clustering algorithms',
					                  url: 'https://example.com/cluster',
					                  image: 'https://via.placeholder.com/40?text=cluster',
					                  children: [
					                    {
					                      name: 'AgglomerativeCluster',
					                      value: 3938,
					                      description: 'Agglomerative clustering method',
					                      url: 'https://example.com/AgglomerativeCluster',
					                      image: 'https://via.placeholder.com/40?text=AgglomerativeCluster'
					                    },
					                    {
					                      name: 'CommunityStructure',
					                      value: 3812,
					                      description: 'Community structure detection',
					                      url: 'https://example.com/CommunityStructure',
					                      image: 'https://via.placeholder.com/40?text=CommunityStructure'
					                    }
					                  ]
					                }
					              ]
					        },
					        {
					          name: 'graph',
					          children: [
					            { name: 'BetweennessCentrality', value: 3534 },
					            { name: 'LinkDistance', value: 5731 },
					            { name: 'MaxFlowMinCut', value: 7840 },
					            { name: 'ShortestPaths', value: 5914 },
					            { name: 'SpanningTree', value: 3416 }
					          ]
					        },
					        {
					          name: 'optimization',
					          children: [
					            { name: 'AspectRatioBanker', value: 7074 }
					          ]
					        }
					      ]
					    },
					    {
					      name: 'data',
					      children: [
					        {
					          name: 'converters',
					          children: [
					            { name: 'Converters', value: 721 },
					            { name: 'DelimitedTextConverter', value: 4294 },
					            { name: 'GraphMLConverter', value: 9800 },
					            { name: 'IDataConverter', value: 1314 },
					            { name: 'JSONConverter', value: 2220 }
					          ]
					        },
					        { name: 'DataField', value: 1759 },
					        { name: 'DataSchema', value: 2165 },
					        { name: 'DataSet', value: 586 },
					        { name: 'DataSource', value: 3331 },
					        { name: 'DataTable', value: 772 },
					        { name: 'DataUtil', value: 3322 }
					      ]
					    }
					  ]
					};
					
		// // $.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
		
		// Add a recursive function to overwrite description, url, and image fields:
		function enrichNode(node) {
		  node.description = `Description for ${node.name}`;
		  node.url = `https://example.com/${node.name}`;
		  node.image = `https://via.placeholder.com/40?text=${encodeURIComponent(node.name)}`;
		
		  // Tooltip formatting
		  node.tooltip = {
		    formatter: function () {
		      return `<b>${node.name}</b><br/>${node.description}<br/><img src="${node.image}" width="40"/>`;
		    }
		  };
		
		  // Click redirection
		  node.label = {
		    distance: 10,
		    formatter: function(params) {
		      return params.name;
		    }
		  };
		  node.link = node.url;
		
		  if (node.children) {
		    node.children.forEach(enrichNode);
		  }
		}
		
		// 1. Define icon mapping
		  const iconMap = {
		    'analytics': 'rectagle',
		    'data': 'roundRect',
		    'default': 'image://https://echarts.apache.org/en/images/logo.png?_v_=20240226'
		  };
		
		  // 2. Recursive function to assign icons
		  function assignIcons(node) {
		    // Choose icon based on node name or type
		    if (node.name.toLowerCase().indexOf('analytics') !== -1) {
		      node.symbol = iconMap['analytics'];
		    } else if (node.name.toLowerCase().indexOf('data') !== -1) {
		      node.symbol = iconMap['data'];
		    } else {
		      node.symbol = iconMap['default'];
		    }
		
		    node.symbolSize = 20;
		
		    node.symbolOffset = [0, 0]; // shift left by 10px
		    node.label = {
		      // position: 'right',
		      distance: 10,
		      // verticalAlign: 'middle',
		      // align: 'left',
		      formatter: function(params) {
		        return params.name;
		      }
		    };
		
		    if (node.children) {
		      node.children.forEach(assignIcons);
		    }
		  }
		
		  // 3. Apply to root node
		  assignIcons(data);
					
	  // 4. Set chart option
	  var option = {
	      tooltip: {
	        trigger: 'item',
	        triggerOn: 'mousemove',
	        formatter: function(params) {
	          const node = params.data;
	          return `<b>${node.name}</b><br/>${node.description}<br/><img src="${node.image}" width="40"/>`;
	        }
	      },
	      series: [
	        {
	          type: 'tree',
	          data: [data],
	          top: '18%',
	          bottom: '14%',
	          layout: 'radial',
	          symbol: 'emptyCircle',
	          symbolSize: 7,
	          initialTreeDepth: 3,
	          animationDurationUpdate: 750,
	          emphasis: {
	            focus: 'descendant'
	          },
	          expandAndCollapse: false, // Prevent layout shift
	          // roam: false,              // Disable zoom/pan
	          // animation: false,         // Disable animation for stability
	          // label: {
	          //   position: 'right',
	          //   verticalAlign: 'middle',
	          //   align: 'left'
	          // }
	        }
	      ]
	    };
	  // });

        // // Try to parse JSON
        // try {
        //   // Parse JSON with JSON5 { foo: 'bar' } -> { "foo": "bar" }
        //   //option = JSON5.parse(text)
        //   option = eval('(' + text + ')')
        // } catch (e) {
        //   $this.append(
        //     $('<pre>', {
        //       class: 'error',
        //       html: 'ECharts options parse error:\n' + e
        //     })
        //   )
        //   return console.warn('ECharts options parse error', item, e)
        // }

        // Init Chart
        var thisChart = echarts.init($this.get(0))
        thisChart.setOption(option)
        thisChart.on('click', function(params) {
                              const node = params.data;
                              if (node.url) {
                                window.open(node.url, '_blank');
                              }
                          });

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