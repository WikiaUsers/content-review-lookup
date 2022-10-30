/* Custom Tooltips for use with the Tooltips/code.js */
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

/********************************* Prueba *********************************/

/*********************** Zeri ***********************/

/*** En las 4 mayores regiones y torneos internacionales ***/

/* 2022 */
mw.hook('dev.chart').add(function() {
	const zeriEn2022_1 =  document.getElementById('Zeri_en_2022');
	zeriEn2022_1.innerHTML = '<canvas id="myChart"></canvas>';

	const data = {
		labels: [
    		'Victorias',
    		'Derrotas'
			],
			
		datasets: [{
    		label: 'Zeri obtuvo una tasa de victorias del 56.1% en un total de 462 juegos.',
    		data: [259, 203],
    		backgroundColor: [
    			'#63FF74',
    			'#63BAFF'
    			],
    		hoverOffset: 4
		}]
	};

	const config = {
		type: 'doughnut',
		data: data,
		options: {}
	};
  
	new Chart(
		document.getElementById('myChart'),
		config
	);
})

/* DO NOT ADD CODE BELOW THIS LINE */