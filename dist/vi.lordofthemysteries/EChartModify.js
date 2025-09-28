$.getScript('https://cdn.jsdelivr.net/npm/echarts', function () {
	  mw.loader.using(['jquery'], function () {
	  $(function () {
	    var chartDom = document.getElementById('EChartModifyBox');
	    if (!chartDom) return;
	
	    var myChart = echarts.init(chartDom);
	    myChart.showLoading();
	
	    var data = {
	      name: 'flare',
	      children: [
	        {
	          name: 'analytics',
	          children: [
	            {
	              name: 'cluster',
	              children: [
	                { name: 'AgglomerativeCluster', value: 3938 },
	                { name: 'CommunityStructure', value: 3812 },
	                { name: 'HierarchicalCluster', value: 6714 },
	                { name: 'MergeEdge', value: 743 }
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
	
	    const iconMap = {
	      'analytics': 'rect',
	      'data': 'roundRect',
	      'default': 'image://https://echarts.apache.org/en/images/logo.png?_v_=20240226'
	    };
	
	    function assignIcons(node) {
	      if (node.name.toLowerCase().includes('analytics')) {
	        node.symbol = iconMap['analytics'];
	      } else if (node.name.toLowerCase().includes('data')) {
	        node.symbol = iconMap['data'];
	      } else {
	        node.symbol = iconMap['default'];
	      }
	
	      node.symbolSize = 20;
	      node.symbolOffset = [0, 0];
	
	      node.label = {
	        position: 'radial',
	        distance: 30,
	        verticalAlign: 'middle',
	        align: 'center',
	        formatter: function (params) {
	          return params.name;
	        }
	      };
	
	      if (node.children) {
	        node.children.forEach(assignIcons);
	      }
	    }
	
	    assignIcons(data);
	
	    myChart.hideLoading();
	    myChart.setOption({
	      tooltip: {
	        trigger: 'item',
	        triggerOn: 'mousemove'
	      },
	      series: [
	        {
	          type: 'tree',
	          data: [data],
	          layout: 'radial',
	          symbol: 'emptyCircle',
	          symbolSize: 7,
	          initialTreeDepth: 3,
	          expandAndCollapse: true,
	          animationDurationUpdate: 750,
	          emphasis: {
	            focus: 'descendant'
	          }
	        }
	      ]
	    });
	  });
	});
});