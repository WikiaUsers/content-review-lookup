if (mw.config.get("wgPageName") === "MediaWiki:ECharts-PowerMap.js") {
  // Create a container for the chart
  var chartBox = document.createElement("div");
  chartBox.className = "ECharts-PowerMap"; // matches your script's selector
  chartBox.style.width = "100%";
  chartBox.style.height = "600px";
  
  chartBox.textContent = "Loading PowerMap...";

  // Inject into the wiki content area
  document.getElementById("mw-content-text").appendChild(chartBox);
  console.log("ECharts test block added");
  // WikiECharts script will find `.ECharts`
  // and render the chart inside it
}

/**
 * @name WikiECharts-PowerMap
 * @desc Provides the function of inserting
 *       ECharts table into the wiki page.
 */
!(function (window, $) {
  // @function loadScript
  const loadScript = function (url) {
    return $.ajax({
      url: url,
      dataType: 'script',
      cache: true
    });
  };
  // Remote data URL
  const remoteDataUrl = 'https://lordofthemysteries.fandom.com/vi/index.php?title=Diagram_Power_data&action=raw&ctype=text/json';
  const remoteZoneDataUrl = 'https://lordofthemysteries.fandom.com/vi/index.php?title=Diagram_Power_data/zoneData&action=raw&ctype=text/json';
  const remoteColorsUrl = 'https://lordofthemysteries.fandom.com/vi/index.php?title=Diagram_Power_data/colors&action=raw&ctype=text/json';
  // Parent local path
  const parentPath = 'https://lordofthemysteries.fandom.com/vi';
  // Graph data holder (declared explicitly to avoid implicit global)
  let graphData = null;
  let zoneData = null;
  let colors = null;
  // Page theme dark/light mode check
  function getThemeByDataAttribute(defaultTheme = 'dark') {
    return (
      document.documentElement.getAttribute('data-theme')
      || (document.body && document.body.getAttribute('data-theme'))
      || defaultTheme
    );
  }
  const currentTheme = getThemeByDataAttribute();
  console.log('currentTheme detected:', currentTheme);

  // Get blocks
  const $blocks = $('.ECharts-PowerMap, .Echarts-Powermap, .echarts-powermap');
  console.log('[PowerMap] Found blocks:', $blocks.length);
  
  if ($blocks.length > 0) {
    // Load dependencies trusted official CDN
    console.log('[PowerMap] Loading ECharts and JSON5 libraries...');
    $.when(
      // Apache ECharts
      loadScript('https://cdn.jsdelivr.net/npm/echarts'),
      // JSON5: https://github.com/json5/json5
      loadScript('https://cdn.jsdelivr.net/npm/json5')
    ).then(function () {
      console.log('[PowerMap] ECharts and JSON5 loaded successfully');
      console.log('[PowerMap] echarts available:', typeof echarts !== 'undefined');
      console.log('[PowerMap] JSON5 available:', typeof JSON5 !== 'undefined');
      
      function fetchRemoteGraphData() {
        // Fetch all three data sources in parallel
        const graphDataPromise = $.ajax({
          url: remoteDataUrl + '&_=' + Date.now(),
          method: 'GET',
          dataType: 'text',
          cache: false
        }).then(function (txt) {
          // Process graph data inline
          try {
            let parsed;
            try { parsed = JSON.parse(txt); } catch (e) { parsed = JSON5.parse(txt); }
            if (!parsed.nodes || !parsed.links) throw new Error('Remote data missing nodes/links');
            graphData = parsed;
            console.log('[PowerMap] Remote graphData loaded:', graphData);
          } catch (parseErr) {
            console.warn('[PowerMap] Failed to parse graph data, using fallback.', parseErr);
          }
        }, function (err) {
          console.warn('[PowerMap] Graph data request failed, using fallback.', err);
        });

        const zoneDataPromise = $.ajax({
          url: remoteZoneDataUrl + '&_=' + Date.now(),
          method: 'GET',
          dataType: 'text',
          cache: false
        }).then(function (txt) {
          // Process zone data inline
          try {
            let parsed;
            try { parsed = JSON.parse(txt); } catch (e) { parsed = JSON5.parse(txt); }
            if (!Array.isArray(parsed)) throw new Error('Zone data should be an array');
            zoneData = parsed;
            console.log('[PowerMap] Remote zoneData loaded:', zoneData);
          } catch (parseErr) {
            console.warn('[PowerMap] Failed to parse zone data, using fallback.', parseErr);
          }
        }, function (err) {
          console.warn('[PowerMap] Zone data request failed, using fallback.', err);
        });

        const colorsPromise = $.ajax({
          url: remoteColorsUrl + '&_=' + Date.now(),
          method: 'GET',
          dataType: 'text',
          cache: false
        }).then(function (txt) {
          // Process colors data inline
          try {
            let parsed;
            try { parsed = JSON.parse(txt); } catch (e) { parsed = JSON5.parse(txt); }
            if (!Array.isArray(parsed)) throw new Error('Colors should be an array');
            colors = parsed;
            console.log('[PowerMap] Remote colors loaded:', colors);
          } catch (parseErr) {
            console.warn('[PowerMap] Failed to parse colors, using fallback.', parseErr);
          }
        }, function (err) {
          console.warn('[PowerMap] Colors request failed, using fallback.', err);
        });

        // Return a promise that resolves when ALL processing is done
        return $.when(graphDataPromise, zoneDataPromise, colorsPromise);
      }

      // Load remote first, then render blocks
      console.log('[PowerMap] Starting to fetch remote data...');
      fetchRemoteGraphData().always(function () {
        console.log('[PowerMap] Remote fetch completed (success or fail), starting render...');
        console.log('[PowerMap] graphData:', graphData);
        console.log('[PowerMap] zoneData:', zoneData);
        console.log('[PowerMap] colors:', colors);
        console.log('[PowerMap] $blocks.length:', $blocks.length);
        
        $blocks.each(function (index, item) {
          console.log('[PowerMap] Processing block #' + index);
          const $this = $(item);
          $this.html('');

          // Basic HTML escaper to avoid unintended HTML injection in tooltip
          function escapeHTML(str) {
            return String(str)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          }

          // Circle-first, batch upgrade after all loads complete.
          function enrichNode(node, loadJobs) {
            // Use link field if available, otherwise fallback to name
            const linkPath = node.link || node.name.replace(/\s+/g, '_');
            const safeLink = encodeURIComponent(linkPath);
            node.url = `${parentPath}/wiki/${safeLink}`;
            if (!node.symbolSize) {
              node.symbolSize = Math.min(72, Math.max(24, (node.value || 1) * 4));
            }
            node.tooltip = {
              formatter: function () {
                const img = node.image ? `<img src="${node.image.startsWith('http') ? node.image : (parentPath + '/wiki/Special:FilePath/' + encodeURIComponent(node.image.replace(/\s+/g, '_')))}" width=\"48\" height=\"48\" style=\"object-fit:contain;display:block;\"/>` : '';
                const safeDesc = node.description ? escapeHTML(node.description) : '';
                const safeName = escapeHTML(node.name);
                return `\
                        <div style=\"display:flex;align-items:flex-start;gap:8px;max-width:320px;\">\
                          <div style=\"flex:0 0 auto;\">${img}</div>\
                          <div style=\"flex:1 1 auto;line-height:1.25;white-space:normal;\">\
                            <div style=\"font-weight:600;margin:0 0 4px 0;font-size:14px;\">${safeName}</div>\
                            <div style=\"font-size:12px;word-wrap:break-word;overflow-wrap:anywhere;white-space:normal;max-width:260px;\">${safeDesc}</div>\
                          </div>\
                        </div>`;
              }
            };
            node.symbol = 'circle'; // initial circle
            if (!node.image) return;
            const fileURL = node.image.startsWith('http')
              ? node.image
              : `${parentPath}/wiki/Special:FilePath/` + encodeURIComponent(node.image.replace(/\s+/g, '_'));
            loadJobs.push(new Promise(resolve => {
              const img = new Image();
              img.onload = function () { node.symbol = 'image://' + fileURL; resolve(); };
              img.onerror = function () { console.warn('[PowerMap] Image failed (stay circle):', node.name, node.image); resolve(); };
              img.src = fileURL;
            }));
          }

          // Enrich nodes (circle first) & collect async image jobs; immediate render; batch upgrade later.
          let loadJobs = [];
          if (typeof graphData !== 'undefined' && graphData && !graphData.__enriched && Array.isArray(graphData.nodes)) {
            try {
              graphData.nodes.forEach(n => enrichNode(n, loadJobs));
              Object.defineProperty(graphData, '__enriched', { value: true, enumerable: false });
              console.log('[PowerMap] Nodes initialized as circles. Pending image loads:', loadJobs.length);
            } catch (e) {
              console.warn('[PowerMap] Enrichment failed (circle-first batch)', e);
            }
          }

          // Guard: ensure graphData has structure (fallback empty)
          const categoriesNames = (graphData && Array.isArray(graphData.categories)) ? graphData.categories.map(c=>c.name) : []; 
          console.log('categoriesNames: ', categoriesNames);
          const nodesData = (graphData && Array.isArray(graphData.nodes)) ? graphData.nodes : [];
          console.log('nodesData: ', nodesData);
          const linksData = (graphData && Array.isArray(graphData.links)) ? graphData.links : [];
          console.log('linksData: ', linksData);

          // Fallback defaults if data not loaded
          const safeZoneData = zoneData || [
            { name: '', value: 25, children: [{ name: 'Nội thần', value: 62.5 }] },
            { name: 'Trụ IV', value: 12.5, children: [] },
            { name: 'Trụ III', value: 12.5, children: [] },
            { name: 'Trụ II', value: 12.5, children: [] },
            { name: 'Trụ I', value: 12.5, children: [{ name: 'Ngoại thần', value: 37.5 }] }
          ];
          console.log('safeZoneData: ', safeZoneData);
          const safeColors = colors || ['#F78D02', '#888888', 'rgba(234, 81, 81, 1)', '#CC3F57', 'rgba(52, 235, 213, 0.8)', 'rgba(248, 213, 15, 0.1)', 'rgba(207, 207, 206, 0.1)'];
          console.log('safeColors: ', safeColors);

          const zoneSunburstData = [
           {
             name: (safeZoneData[0] && safeZoneData[0].name) || '',
             value: (safeZoneData[0] && safeZoneData[0].value) || 25,
             itemStyle: {
                 color: 'transparent'
               },
             children: [
               {
                 name: '',
                 value: (safeZoneData[0] && safeZoneData[0].value) || 25,
                 itemStyle: {
                   color: 'transparent'
                 },
                 children: [
                   {
                     name: (safeZoneData[0] && safeZoneData[0].children && safeZoneData[0].children[0] && safeZoneData[0].children[0].name) || 'Nội thần',
                     value: (safeZoneData[0] && safeZoneData[0].children && safeZoneData[0].children[0] && safeZoneData[0].children[0].value) || 62.5,
                     itemStyle: {
                       color: safeColors[5] || 'rgba(248, 213, 15, 0.1)'
                     }
                   }
                 ]
               }
             ]
           },
           {
             name: (safeZoneData[1] && safeZoneData[1].name) || 'Trụ IV',
             value: (safeZoneData[1] && safeZoneData[1].value) || 12.5,
             itemStyle: {
               color: safeColors[2] || 'rgba(234, 81, 81, 1)'
             },
             label:{
               fontWeight: 'bold'
             },
             children: [
               {
                 name: (safeZoneData[1] && safeZoneData[1].name) || 'Trụ IV',
                 value: (safeZoneData[1] && safeZoneData[1].value) || 12.5,
                 itemStyle: {
                   color: safeColors[2] || 'rgba(234, 81, 81, 1)'
                 },
                 children: []
               }
             ]
           },
           {
             name: (safeZoneData[2] && safeZoneData[2].name) || 'Trụ III',
             value: (safeZoneData[2] && safeZoneData[2].value) || 12.5,
             itemStyle: {
               color: safeColors[4] || 'rgba(52, 235, 213, 0.8)'
             },
             label:{
               fontWeight: 'bold'
             },
             children: [
               {
                 name: (safeZoneData[2] && safeZoneData[2].name) || 'Trụ III',
                 value: (safeZoneData[2] && safeZoneData[2].value) || 12.5,
                 itemStyle: {
                   color: safeColors[4] || 'rgba(52, 235, 213, 0.8)'
                 },
                 children: []
               }
             ]
           },
           {
             name: (safeZoneData[3] && safeZoneData[3].name) || 'Trụ II',
             value: (safeZoneData[3] && safeZoneData[3].value) || 12.5,
             itemStyle: {
               color: safeColors[4] || 'rgba(52, 235, 213, 0.8)'
             },
             label:{
               fontWeight: 'bold'
             },
             children: [
               {
                 name: (safeZoneData[3] && safeZoneData[3].name) || 'Trụ II',
                 value: (safeZoneData[3] && safeZoneData[3].value) || 12.5,
                 itemStyle: {
                   color: safeColors[4] || 'rgba(52, 235, 213, 0.8)'
                 },
                 children: []
               }
             ]
           },
           {
             name: (safeZoneData[4] && safeZoneData[4].name) || 'Trụ I',
             value: (safeZoneData[4] && safeZoneData[4].value) || 12.5,
             itemStyle: {
               color: safeColors[4] || 'rgba(52, 235, 213, 0.8)'
             },
             label:{
               fontWeight: 'bold'
             },
             children: [
               {
                 name: (safeZoneData[4] && safeZoneData[4].name) || 'Trụ I',
                 value: (safeZoneData[4] && safeZoneData[4].value) || 12.5,
                 itemStyle: {
                   color: safeColors[4] || 'rgba(52, 235, 213, 0.8)'
                 },
                 children: [
                   {
                     name: (safeZoneData[4] && safeZoneData[4].children && safeZoneData[4].children[0] && safeZoneData[4].children[0].name) || 'Ngoại thần',
                     value: (safeZoneData[4] && safeZoneData[4].children && safeZoneData[4].children[0] && safeZoneData[4].children[0].value) || 37.5,
                     itemStyle: {
                       color: safeColors[6] || 'rgba(207, 207, 206, 0.1)'
                     }
                   }
                 ]
               }
             ]
           },
           {
             name: '',
             value: 25,
             itemStyle: {
               color: 'transparent'
             },
             children: [
               {
                 name: '',
                 value: 25,
                 itemStyle: {
                   color: 'transparent'
                 },
                 children: []
               }
             ]
           }
          ];

          // 4. Set chart option (immediate circle render; later batch upgrade)
          const option = {
           darkMode: (currentTheme === 'dark'),
           textStyle: {
             fontFamily: 'inherit'
           },
           title: {
             text: 'Power Map',
             subtext: 'Interactive Diagram',
             top: 'bottom',
             left: 'right'
           },
           tooltip: {},
           legend: [
             {
               data: categoriesNames
             }
           ],
           animationDuration: 1500,
           animationEasingUpdate: 'quinticInOut',
           roam: false,
           emphasis: {
             blurScope: 'global'
           },
           series: [
             {
               name: 'Power Map',
               type: 'graph',
               z: 2,
               center: [0, 0],
               legendHoverLink: false,
               layout: 'none',
               emphasis: {
                 focus: 'adjacency',
                 lineStyle: {
                   width: 10
                 },
                 blurScope: 'series'
               },
               data: nodesData,
               links: linksData,
               categories: (graphData && graphData.categories) ? graphData.categories : [],
               roam: false,
               label: {
                 show: true,
                 formatter: '{b}'
               },
               lineStyle: {
                 color: 'source',
                 curveness: 0.3
               },
               labelLayout: {
                 hideOverlap: true
               }
             },
             {
               type: 'sunburst',
               z: 1,
               center: ['50%', '50%'],
               data: zoneSunburstData,
               itemStyle: {
                 borderWidth: 0.5
               },
               nodeClick: false,
               tooltip: {
                 formatter: function (params) {
                   if (params.name) {
                     return params.marker + ' ' + params.name;
                   }
                   return '';
                 }
               },
               emphasis: {
                 focus: 'none',
                 blurScope: 'global'
               },
               sort: null,
               levels: [
                 {},
                 {
                   r0: '11.75%',
                   r: '12.5%',
                   label: {
                     rotate: 'tangential',
                     position:'inside',
                     align: 'center'
                   }
                 },
                 {
                   r0: '12.5%',
                   r: '30%',
                   label: {
                     show: false,
                   },
                   emphasis: {
                     label: {
                       show: false,
                     }
                   }
                 },
                 {
                   r0: '30%',
                   r: '1000%',
                   label: {
                     textShadowBlur: 5,
                     textShadowColor: '#333'
                   }
                 }
               ]
             }
           ]
          };
          console.log('Parsed ECharts option (initial circles):', option);

         // Init chart
         const thisChart = echarts.init($this.get(0));
         window._powerMapChart = thisChart;
         console.log('Chart Init (circles)');
         thisChart.setOption(option);
         thisChart.on('click', function (params) {
           if (params.seriesType === 'graph') {
             // Graph node navigation
             const node = params.data;
             if (node.url) window.open(node.url, '_blank');
           } else if (params.seriesType === 'sunburst') {
             // Sunburst zone navigation
             const zoneName = params.data.name;
             if (zoneName && zoneName.trim()) {
               const zonePath = zoneName.replace(/\s+/g, '_');
               const zoneUrl = `${parentPath}/wiki/${encodeURIComponent(zonePath)}`;
               window.open(zoneUrl, '_blank');
             }
           }
         });
         console.log('Chart option set (circles)');
         thisChart.resize();
         $(window).on('resize', function () { thisChart.resize(); });
         $('.mw-collapsible-toggle, .pi-section-tab').click(function () { thisChart.resize(); });

         // After all image jobs finish, batch upgrade successful ones
         if (loadJobs.length) {
           Promise.all(loadJobs).then(function () {
             try {
               thisChart.setOption({ 
                 series: [
                   { data: graphData.nodes },  // Update graph series (index 0)
                   {}  // Leave sunburst unchanged (index 1)
                 ] 
               });
               console.log('[PowerMap] Batch image upgrade complete');
             } catch (e) { console.warn('[PowerMap] Batch upgrade failed', e); }
           });
         }
        });
      }); // end remote fetch always
    }).fail(function(error) {
      console.error('[PowerMap] Failed to load ECharts or JSON5 libraries:', error);
      $blocks.each(function(index, item) {
        $(item).html('<div style="color:red;padding:20px;border:1px solid red;">Failed to load ECharts libraries. Check console for details.</div>');
      });
    });
  } else {
    console.log('[PowerMap] No .ECharts blocks found on this page');
  }
})(window, jQuery);