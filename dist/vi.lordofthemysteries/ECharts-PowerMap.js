if (mw.config.get("wgPageName") === "MediaWiki:ECharts-PowerMap.js") {
  // Create a container for the chart
  var chartBox = document.createElement("div");
  chartBox.className = "ECharts-PowerMap"; // matches your script's selector
  chartBox.style.width = "100%";
  chartBox.style.height = "800px";

  // Inject into the wiki content area
  document.getElementById("mw-content-text").appendChild(chartBox);

  // WikiECharts script will find `.ECharts`
  // and render the chart inside it
}

/**
 * @name WikiECharts - Diagram
 * @desc Provides the function of inserting
 *       ECharts diagram into the wiki page.
 */
!(function (window, $) {
  // @function loadScript
  var loadScript = function (url) {
    return $.ajax({
      url: url,
      dataType: 'script',
      cache: true
    });
  };
  
  // Remote data URL
  var remoteDataUrl = 'https://lordofthemysteries.fandom.com/vi/index.php?title=Diagram_Power_data&action=raw&ctype=text/json';
  var remoteColorsUrl = 'https://lordofthemysteries.fandom.com/vi/index.php?title=Diagram_Power_data/colors&action=raw&ctype=text/json';
  
  // Parent local path
  var parentPath = 'https://lordofthemysteries.fandom.com/vi';
  
  // Data holders
  var chartData = null;
  var colors = null;
  
  // Page theme dark/light mode check
  function getThemeByDataAttribute(defaultTheme) {
    defaultTheme = defaultTheme || 'light';
    return (
      document.documentElement.getAttribute('data-theme')
      || (document.body && document.body.getAttribute('data-theme'))
      || defaultTheme
    );
  }
  var currentTheme = getThemeByDataAttribute();

  // Get blocks
  var $blocks = $('.ECharts-PowerMap, .echarts-powermap, .EChart-PowerMap');
  if ($blocks.length > 0) {
    // Load dependencies from trusted official CDN
    $.when(
      // Apache ECharts
      loadScript('https://cdn.jsdelivr.net/npm/echarts'),
      // JSON5: https://github.com/json5/json5
      loadScript('https://cdn.jsdelivr.net/npm/json5')
    ).then(function () {
      function fetchRemoteData() {
        // Fetch both data sources in parallel with longer timeout
        var chartDataPromise = $.ajax({
          url: remoteDataUrl + '&_=' + Date.now(),
          method: 'GET',
          dataType: 'text',
          cache: false,
          timeout: 10000  // 10 second timeout
        });

        var colorsPromise = $.ajax({
          url: remoteColorsUrl + '&_=' + Date.now(),
          method: 'GET',
          dataType: 'text',
          cache: false,
          timeout: 10000  // 10 second timeout
        });

        // Process data
        chartDataPromise.done(function (txt) {
          try {
            var parsed;
            try { parsed = JSON.parse(txt); } catch (e) { parsed = JSON5.parse(txt); }
            if (!parsed.data || !parsed.links) throw new Error('Remote data missing data/links');
            chartData = parsed;
            // console.log('[PowerMap] Remote Data loaded successfully');
          } catch (parseErr) {
            console.warn('[PowerMap] Failed to parse  data:', parseErr);
          }
        }).fail(function (err) {
          console.warn('[PowerMap] Data request failed:', err.status, err.statusText);
        });

        // Process colors data
        colorsPromise.done(function (txt) {
          try {
            var parsed;
            try { parsed = JSON.parse(txt); } catch (e) { parsed = JSON5.parse(txt); }
            if (typeof parsed !== 'object') throw new Error('Colors should be an object');
            colors = parsed;
            // console.log('[PowerMap] Remote colors loaded successfully');
          } catch (parseErr) {
            console.warn('[PowerMap] Failed to parse colors:', parseErr);
          }
        }).fail(function (err) {
          console.warn('[PowerMap] Colors request failed:', err.status, err.statusText);
        });

        // Return a promise that resolves/rejects when both are done
        return $.when(chartDataPromise, colorsPromise);
      }

      // Load remote first, then render blocks (wait for completion)
      fetchRemoteData().always(function () {
        // Add small delay to ensure data assignment completes
        setTimeout(function() {
          console.log('[PowerMap] Starting render. Data:', chartData ? 'loaded' : 'null', 'colors:', colors ? 'loaded' : 'null');
        $blocks.each(function (index, item) {
          var $this = $(item);
          
          // Show loading indicator
          $this.html('<div style="text-align:center;padding:40px;color:#888;">Loading PowerMap...</div>');

          // Basic HTML escaper
          function escapeHTML(str) {
            return String(str)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          }

          // Category colors - default fallback
          var categoryColors = [
            '#FFD700',  // 0: Tối Sơ (Original)
            '#888888',  // 1: Trụ chưa hình thành (4th Pillar)
            '#0078D7',  // 2: Đấng Cổ xưa (Nội) - Inner
            '#C1504D',  // 3: Đấng Cổ xưa (Ngoại) - Outer
            '#9ed566'   // 4: Đường tắt (Pathways)
          ];

          // Enrich nodes with URLs and styling
          function enrichNode(node) {
            // Skip if already enriched
            if (node.__enriched) return;
            
            var linkPath = node.link || node.name.replace(/\s+/g, '_');
            var safeLink = encodeURIComponent(linkPath);
            node.url = parentPath + '/wiki/' + safeLink;
            
            // Apply color from colors object if available, otherwise use category color
            var nodeColor;
            if (colors && colors[node.name]) {
              nodeColor = colors[node.name];
            } else if (node.category !== undefined && categoryColors[node.category]) {
              nodeColor = categoryColors[node.category];
            }
            
            if (nodeColor) {
              node.itemStyle = {
                color: nodeColor,
                borderColor: nodeColor
              };
            }
            
            // Store image URL for label rendering
            if (node.image) {
              node.imageUrl = node.image.startsWith('http')
                ? node.image
                : parentPath + '/wiki/Special:FilePath/' + encodeURIComponent(node.image.replace(/\s+/g, '_'));
            }
            
            // Create tooltip with image and description
            node.tooltip = {
              formatter: function () {
                var imageUrl = node.image ? 
                  (node.image.startsWith('http') ? node.image : (parentPath + '/wiki/Special:FilePath/' + encodeURIComponent(node.image.replace(/\s+/g, '_')))) 
                  : '';
                var img = imageUrl ? '<img src="' + imageUrl + '" width="48" height="48" style="object-fit:contain;display:block;margin-right:8px;"/>' : '';
                var safeDesc = node.description ? escapeHTML(node.description) : '';
                var safeName = escapeHTML(node.name);
                return '<div style="display:flex;align-items:flex-start;gap:8px;max-width:320px;">' +
                       img +
                       '<div style="flex:1 1 auto;line-height:1.25;white-space:normal;">' +
                       '<div style="font-weight:600;margin:0 0 4px 0;font-size:14px;">' + safeName + '</div>' +
                       '<div style="font-size:12px;word-wrap:break-word;overflow-wrap:anywhere;white-space:normal;max-width:260px;">' + safeDesc + '</div>' +
                       '</div></div>';
              }
            };
            
            // Mark as enriched
            node.__enriched = true;
          }

          // Fallback default data
          var defaultChartData = {
            data: [
              // { name: 'Sequence 0', image: 'Sequence0.png', description: 'Starting point' },
              // { name: 'Sequence 1', image: 'Sequence1.png', description: 'First level' },
              // { name: 'Sequence 2', image: 'Sequence2.png', description: 'Second level' },
              // { name: 'Sequence 3', image: 'Sequence3.png', description: 'Third level' },
              // { name: 'Sequence 4', image: 'Sequence4.png', description: 'Fourth level' },
              // { name: 'Demigod', image: 'Demigod.png', description: 'Demigod level' },
              // { name: 'Angel', image: 'Angel.png', description: 'Angel level' },
              // { name: 'King of Angels', image: 'King_of_Angels.png', description: 'King of Angels level' },
              // { name: 'True God', image: 'True_God.png', description: 'True God level' }
            ],
            links: [
              // { source: 'Sequence 0', target: 'Sequence 1', value: 5 },
              // { source: 'Sequence 1', target: 'Sequence 2', value: 5 },
              // { source: 'Sequence 2', target: 'Sequence 3', value: 5 },
              // { source: 'Sequence 3', target: 'Sequence 4', value: 5 },
              // { source: 'Sequence 4', target: 'Demigod', value: 3 },
              // { source: 'Demigod', target: 'Angel', value: 3 },
              // { source: 'Angel', target: 'King of Angels', value: 2 },
              // { source: 'King of Angels', target: 'True God', value: 1 }
            ]
          };

          var defaultColors = {
            // 'Sequence 0': '#F78D02',
            // 'Sequence 1': '#888888',
            // 'Sequence 2': 'rgba(234, 81, 81, 1)',
            // 'Sequence 3': '#CC3F57',
            // 'Sequence 4': 'rgba(52, 235, 213, 0.8)',
            // 'Demigod': 'rgba(248, 213, 15, 0.8)',
            // 'Angel': 'rgba(207, 207, 206, 0.8)',
            // 'King of Angels': '#FF6551',
            // 'True God': '#9ed566'
          };

          // Use remote data or fallback
          var safeData = chartData || defaultChartData;
          var safeColors = colors || defaultColors;

          // Matrix positioning system - assigns depth (column) to each node
          // Uses depthMapping configuration from JSON data
          function assignNodeDepth(node, allNodes, links, depthMapping) {
            if (!depthMapping || !depthMapping.rules) {
              // Fallback: use node's x coordinate if available
              return node.x !== undefined ? node.x : undefined;
            }
            
            var nodeName = node.name;
            var nodeId = node.id;
            
            // Check each depth rule in order
            for (var i = 0; i < depthMapping.rules.length; i++) {
              var rule = depthMapping.rules[i];
              
              // Check if node is explicitly listed
              if (rule.nodes && rule.nodes.indexOf(nodeName) !== -1) {
                return rule.depth;
              }
              
              // Check if node's category matches
              if (rule.categories && node.category !== undefined && rule.categories.indexOf(node.category) !== -1) {
                return rule.depth;
              }
              
              // Check if node is a child of specified parent nodes
              if (rule.parentNodes && Array.isArray(rule.parentNodes)) {
                for (var j = 0; j < rule.parentNodes.length; j++) {
                  var parentName = rule.parentNodes[j];
                  
                  // Find parent node ID
                  var parentNode = null;
                  for (var k = 0; k < allNodes.length; k++) {
                    if (allNodes[k].name === parentName) {
                      parentNode = allNodes[k];
                      break;
                    }
                  }
                  var parentId = parentNode ? parentNode.id : parentName;
                  
                  // Check if there's a link from parent to this node
                  var isChild = false;
                  for (var l = 0; l < links.length; l++) {
                    var link = links[l];
                    if ((link.source === parentId || link.source === parentName) && 
                        (link.target === nodeId || link.target === nodeName)) {
                      isChild = true;
                      break;
                    }
                  }
                  
                  if (isChild) {
                    return rule.depth;
                  }
                }
              }
            }
            
            // Default: use node's x coordinate or let ECharts auto-calculate
            return node.x !== undefined ? node.x : undefined;
          }

          // Process nodes: handle virtual spacers and value calculation
          // Skip recalculation if spacers already have fixed values (valueCalculate: false)
          var needsCalculation = false;
          if (safeData.data && Array.isArray(safeData.data)) {
            for (var i = 0; i < safeData.data.length; i++) {
              if (safeData.data[i].virtual && safeData.data[i].valueCalculate === true) {
                needsCalculation = true;
                break;
              }
            }
          }
          
          if (needsCalculation && safeData.data && Array.isArray(safeData.data)) {
            // Get chart configuration from JSON or use defaults
            var chartConfig = safeData.chartConfig || {};
            var chartContainerHeight = $this.height();
            var chartTop = chartConfig.top !== undefined ? chartConfig.top : 20;
            var chartBottom = chartConfig.bottom !== undefined ? chartConfig.bottom : 50;
            var chartAvailableHeight = chartContainerHeight - chartTop - chartBottom;
            var nodeGap = chartConfig.nodeGap !== undefined ? chartConfig.nodeGap : 20;
            
            // First pass: group nodes by depth and calculate heights
            var nodesByDepth = {};
            for (var i = 0; i < safeData.data.length; i++) {
              var node = safeData.data[i];
              var x = node.x !== undefined ? node.x : 0;
              if (!nodesByDepth[x]) nodesByDepth[x] = [];
              nodesByDepth[x].push(node);
            }
            
            // Calculate ky scaling factor for each column
            // Based on ECharts source: ky = (height - (n - 1) * nodeGap) / sum(node.value)
            var columnInfo = {};
            var minKy = Infinity;
            
            for (var depth in nodesByDepth) {
              var depthNodes = nodesByDepth[depth];
              var realNodes = [];
              for (var i = 0; i < depthNodes.length; i++) {
                if (!depthNodes[i].virtual) {
                  realNodes.push(depthNodes[i]);
                }
              }
              var nodeCount = realNodes.length;
              var sumNodeValue = 0;
              for (var i = 0; i < realNodes.length; i++) {
                sumNodeValue += (realNodes[i].value || 1);
              }
              
              // Calculate ky for this column (how node.value translates to pixels)
              var ky = (chartAvailableHeight - (nodeCount - 1) * nodeGap) / sumNodeValue;
              
              // Track minimum ky (ECharts uses minKy across all columns)
              if (ky < minKy) {
                minKy = ky;
              }
              
              columnInfo[depth] = {
                nodeCount: nodeCount,
                sumNodeValue: sumNodeValue,
                ky: ky
              };
            }
            
            // console.log('[PowerMap] Chart dimensions:', {
              // containerHeight: chartContainerHeight,
              // availableHeight: chartAvailableHeight,
              // nodeGap: nodeGap
            // });
            // console.log('[PowerMap] Column info:', columnInfo);
            // console.log('[PowerMap] minKy (value to pixel):', minKy);
            
            // Calculate target sum of values for centering
            // All columns should have same total height when rendered
            // ECharts source minKy:
            // targetHeight = sum(node.value) * minKy + (n-1) * nodeGap
            // targetSumValue = (targetHeight - (n-1) * nodeGap) / minKy
            // For auto mode, find the column that will be tallest
            var maxRenderedHeight = 0;
            var targetSumValue = 0;
            
            for (var depth in nodesByDepth) {
              var info = columnInfo[depth];
              var renderedHeight = info.sumNodeValue * minKy + (info.nodeCount - 1) * nodeGap;
              if (renderedHeight > maxRenderedHeight) {
                maxRenderedHeight = renderedHeight;
                targetSumValue = info.sumNodeValue;
              }
            }
            
            // console.log('[PowerMap] Max rendered height:', maxRenderedHeight);
            // console.log('[PowerMap] Target sum value for centering:', targetSumValue);
            
            // Count spacers per column first
            var spacersPerColumn = {};
            for (var i = 0; i < safeData.data.length; i++) {
              var node = safeData.data[i];
              if (node.virtual && node.valueCalculate === true) {
                var x = node.x !== undefined ? node.x : 0;
                if (!spacersPerColumn[x]) spacersPerColumn[x] = [];
                spacersPerColumn[x].push(node);
              }
            }
            
            // Update virtual spacer values if valueCalculate is true
            for (var depth in spacersPerColumn) {
              var spacers = spacersPerColumn[depth];
              var info = columnInfo[depth];
              
              if (!info) continue;
              
              var realColumnHeightPixels = info.sumNodeValue * minKy + (info.nodeCount - 1) * nodeGap;
              var centerPoint = chartAvailableHeight / 2;
              
              if (spacers.length === 1) {
                // Single spacer (top): centers the column
                // Formula: spacer * minKy + nodeGap + realColumnHeight/2 = availableHeight/2
                var spacerPixels = centerPoint - nodeGap - (realColumnHeightPixels / 2);
                var spacerValue = spacerPixels / minKy;
                spacers[0].value = Math.max(0, Math.round(spacerValue * 100) / 100);
                
                // console.log('[PowerMap] Spacer x' + depth + ' (single): realColumnHeight=' + realColumnHeightPixels.toFixed(1) + 'px, centerPoint=' + centerPoint.toFixed(1) + 'px, spacer=' + spacers[0].value + ' (' + spacerPixels.toFixed(1) + 'px)');
                
              } else if (spacers.length === 2) {
                // Two spacers (top and bottom): split to center the column
                // Total space to distribute = availableHeight - realColumnHeight - 2*nodeGap (gaps for top and bottom spacers)
                var totalSpacerPixels = chartAvailableHeight - realColumnHeightPixels - 2 * nodeGap;
                var eachSpacerPixels = totalSpacerPixels / 2;
                var eachSpacerValue = eachSpacerPixels / minKy;
                
                for (var i = 0; i < spacers.length; i++) {
                  spacers[i].value = Math.max(0, Math.round(eachSpacerValue * 100) / 100);
                }
                
                // console.log('[PowerMap] Spacers x' + depth + ' (top+bottom): realColumnHeight=' + realColumnHeightPixels.toFixed(1) + 'px, each spacer=' + spacers[0].value + ' (' + eachSpacerPixels.toFixed(1) + 'px)');
                
              } else if (spacers.length > 2) {
                // Multiple spacers: distribute evenly
                // Total space = availableHeight - realColumnHeight - spacers.length*nodeGap
                var totalSpacerPixels = chartAvailableHeight - realColumnHeightPixels - spacers.length * nodeGap;
                var eachSpacerPixels = totalSpacerPixels / spacers.length;
                var eachSpacerValue = eachSpacerPixels / minKy;
                
                for (var i = 0; i < spacers.length; i++) {
                  spacers[i].value = Math.max(0, Math.round(eachSpacerValue * 100) / 100);
                }
                
                // console.log('[PowerMap] Spacers x' + depth + ' (' + spacers.length + ' spacers): realColumnHeight=' + realColumnHeightPixels.toFixed(1) + 'px, each spacer=' + spacers[0].value + ' (' + eachSpacerPixels.toFixed(1) + 'px)');
              }
            }
            
            // Second pass: enrich non-virtual nodes only
            for (var i = 0; i < safeData.data.length; i++) {
              var node = safeData.data[i];
              // Skip virtual nodes for enrichment
              if (!node.virtual) {
                enrichNode(node);
              }
              
              // Assign depth for matrix positioning using depthMapping from JSON
              var depth = assignNodeDepth(node, safeData.data, safeData.links || [], safeData.depthMapping);
              if (depth !== undefined) {
                node.depth = depth;
              }
            }
          }
          
          // Enrich all non-virtual nodes if not in calculation mode
          if (!needsCalculation && safeData.data && Array.isArray(safeData.data)) {
            for (var i = 0; i < safeData.data.length; i++) {
              var node = safeData.data[i];
              if (!node.virtual) {
                enrichNode(node);
              }
              
              var depth = assignNodeDepth(node, safeData.data, safeData.links || [], safeData.depthMapping);
              if (depth !== undefined) {
                node.depth = depth;
              }
            }
          }

          // Prepare data with labels that include images + text
          var enrichedData = [];
          if (safeData && safeData.data && Array.isArray(safeData.data)) {
            for (var i = 0; i < safeData.data.length; i++) {
              var node = safeData.data[i];
              var enrichedNode;
              
              // For virtual nodes, preserve their original settings (opacity: 0, label.show: false)
              if (node.virtual) {
                // Copy all properties from node
                enrichedNode = {};
                for (var key in node) {
                  if (node.hasOwnProperty(key)) {
                    enrichedNode[key] = node[key];
                  }
              }
              // Ensure tooltip is disabled for virtual nodes
              enrichedNode.tooltip = {
                show: false
              };
            } else {
              // For real nodes, add rich text labels with images
              enrichedNode = {};
              for (var key in node) {
                if (node.hasOwnProperty(key)) {
                  enrichedNode[key] = node[key];
                }
              }
              
              // Add label with image if imageUrl exists
              if (node.imageUrl) {
                enrichedNode.label = {
                  formatter: function(params) {
                    return '{img|}{name|' + params.name + '}';
                  },
                  rich: {
                    img: {
                      backgroundColor: {
                        image: node.imageUrl
                      },
                      height: 20,
                      width: 20,
                      align: 'center'
                    },
                    name: {
                      fontSize: 12,
                      fontWeight: 'bold',
                      padding: [0, 0, 0, 4],
                      align: 'left'
                    }
                  },
                  fontSize: 12,
                  fontWeight: 'bold'
                };
              }
            }
            enrichedData.push(enrichedNode);
          }
          }

          // Prepare category legend data
          var categories = safeData.categories || [];
          var legendData = [];
          for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            legendData.push({
              name: cat.name,
              value: [i * 2.5, 0], // Position horizontally with more spacing (multiply by 2)
              category: i,
              itemStyle: {
                color: categoryColors[i] || '#999'
              }
            });
          }

          // Set chart option for diagram
          var option = {
            darkMode: (currentTheme === 'dark'),
            textStyle: {
              fontFamily: 'inherit'
            },
            title: {
              text: 'Power Progression Map',
              subtext: 'Interactive  Diagram',
              top: 'bottom',
              left: 'right'
            },
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            grid: {
              left: 50,
              right: 150,
              bottom: 10,
              height: 30,
              show: false
            },
            xAxis: {
              type: 'value',
              show: false,
              min: -0.5,
              max: (categories.length - 0.5) * 2  // Adjust max to match spacing
            },
            yAxis: {
              type: 'value',
              show: false,
              min: -1,
              max: 1
            },
            series: [
              {
                name: 'Power Map',
                type: 'sankey',
                left: 50,
                top: 20,
                right: 150,
                bottom: 50,
                animation: true,
                animationDuration: 500,
                animationEasing: 'cubicOut',
                emphasis: {
                  focus: 'adjacency'
                },
                data: enrichedData,
                links: safeData.links || [],
                lineStyle: {
                  color: 'source',
                  curveness: 0.5,
                  opacity: 0.3
                },
                itemStyle: {
                  borderWidth: 1,
                  borderColor: '#fff'
                },
                label: {
                  color: currentTheme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)',
                  fontFamily: 'inherit',
                  fontSize: 12,
                  fontWeight: 'bold'
                },
                nodeGap: 20,
                layoutIterations: 0,
                z: 2
              },
              {
                name: 'Category Legend',
                type: 'scatter',
                coordinateSystem: 'cartesian2d',
                data: legendData,
                symbolSize: 16,
                symbol: 'roundRect',
                label: {
                  show: true,
                  position: 'right',
                  formatter: '{b}',
                  fontSize: 11,
                  color: currentTheme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                  distance: 5
                },
                tooltip: {
                  show: false
                },
                silent: true,
                z: 1
              }
            ]
          };
          
          // console.log('[PowerMap] Parsed ECharts option:', option);

          // Clear loading indicator
          $this.html('');
          
          // Check if we have valid data to render
          if (!enrichedData || enrichedData.length === 0) {
            $this.html('<div style="text-align:center;padding:40px;color:#888;">No data available. Please check the remote data source.</div>');
            return;
          }
          
          // Init chart with performance optimizations
          var thisChart = echarts.init($this.get(0), null, {
            renderer: 'canvas',
            useDirtyRect: true  // Enable dirty rectangle rendering for better performance
          });
          window._PowerMapChart = thisChart;
          
          // Set option with optimizations for initial render
          thisChart.setOption(option, {
            notMerge: true,  // Don't merge with previous options (faster initial render)
            lazyUpdate: false  // Update immediately
          });
          
          // Add click event to open URLs
          thisChart.on('click', function (params) {
            if (params.data && params.data.url) {
              window.open(params.data.url, '_blank');
            }
          });
          
          // console.log('[PowerMap] Chart option set');
          
          // Resize handlers
          thisChart.resize();
          $(window).on('resize', function () { thisChart.resize(); });
          $('.mw-collapsible-toggle, .pi-section-tab').click(function () { 
            setTimeout(function() { thisChart.resize(); }, 100);
          });
        });
        }, 100); // end setTimeout delay for data loading
      }); // end remote fetch always
    });
  }
})(window, jQuery);