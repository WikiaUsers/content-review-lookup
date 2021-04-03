/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('MediaWiki:Chart.js', 'dev');

switch (mw.config.get('wgPageName')) {
    case 'Analytics/Chart':
        var ctx = document.getElementById('myChart').getContext('2d');
        var Chart = require('Chart.js');
		var analytics = new Chart(ctx, {
			
		    type: 'line',
		
		    data: {
		        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		        datasets: [{
		            label: 'Total Members',
		            backgroundColor: 'rgb(255, 99, 132)',
		            borderColor: 'rgb(255, 99, 132)',
		            data: [833, 1598, 2090, 2437, 2853, 3189],
		            
		            yAxisID: 'left-y-axis'
		        }, {
		        	label: 'Messages per Month',
		        	data: [248276, 367950, 318723, 217872, 196602, 226820],
		        	
		        	yAxisID: 'right-y-axis'
		        }]
		    },
		
		    options: {
		        scales: {
		            yAxes: [{
		                id: 'left-y-axis',
		                type: 'linear',
		                position: 'left'
		            }, {
		                id: 'right-y-axis',
		                type: 'linear',
		                position: 'right'
		            }]
		        }
		    }
		});
}