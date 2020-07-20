importScriptPage("MediaWiki:Chart.js", "dev"); // Manually load the script because ImportJS fails
;(function( $, mw, Chart ) {                   // Wait for huge script to load
    setTimeout(function() {
        clearInterval(interval);
    }, 10000);                                 // But don't wait more than 10 seconds
    
    function startCharts() {
        if ($("#expByRank").length) {
            var xbr = document.getElementById('expByRank');
            var xbr2 = document.createElement('canvas'); // Manually create a <canvas> tag from the div with id="expByRank"
            xbr.appendChild(xbr2).getContext('2d');
            xbr = xbr2.getContext('2d');

            var xbrChart = new window.Chart(xbr, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                   labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
                  datasets: [ {
                     label: 'Current EXP required for rank',
                        borderColor: 'rgb(55,213,190)',
                        showLine: true,
                        data: [165, 335, 660, 990, 1440, 2100, 2850, 3700, 4800, 5690, 6730, 7770, 8810, 9850, 10890, 11930, 12970, 14010, 15050, 16090, 17130, 18170, 19210, 20250, 21290, 22330, 23370, 24410, 25450, 26490, 27530, 28570, 29610, 30650, 31690, 32730, 33770, 34810, 35850, 36890, 37930, 38970, 40010, 41050, 42090, 43130, 44170, 45210, 46250, 47290, 48330, 49370, 50410, 51450, 52490, 53530, 54570, 55610, 56650, 57690],
                        fill: false,
                 },
                      {
                       label: 'Pre-v1.4.0 - EXP required for rank',
                       borderColor: 'rgb(68, 85, 90)',
                       showLine: true,
                       data: [165, 335, 660, 1490, 2645, 4130, 5950, 8000, 10100, 12200, 14300, 16400, 18500, 20600, 22700, 24800, 26900, 29000, 31100, 33200, 35300, 37400, 39500, 41600, 43700, 45800, 47900, 50000, 52100, 54200, 56300, 58400, 60500, 62600, 64700, 66800, 68900, 71000, 73100, 75200, 77300, 79400, 81500, 83600, 85700, 87800, 89900, 92000, 94100, 96200, 98300, 100400, 102500, 104600, 106700, 108800, 110900, 113000, 115100, 117200, 119300],
                      fill: false,
                   }, 
                   
                  {
                     label: 'Pre-v1.0.2 - EXP required for rank',
                        borderColor: 'rgb(100, 200, 104)',
                        showLine: true,
                        data: [165, 335, 660, 1490, 2645, 4130, 5950, 8000, 10100, 12200, 14400, 20000, 25000, 30000, 35500, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85500, 91000, 96500, 102000, 108000, 114000, 120000, 127000, 134000, 141000, 148000, 155000, 162000, 169000, 176000],
                        fill: false,
                 }]
              },

              // Configuration options go here
               options: {}
          });
        }

        if ($("#ZombieChart").length) {
            var zom = document.getElementById('ZombieChart');
            var zom2 = document.createElement('canvas'); // Manually create a <canvas> tag from the div with id="ZombieChart"
            zom.appendChild(zom2).getContext('2d');
            zom = zom2.getContext('2d');
    
            var zomchart = new window.Chart(zom, {
                // The type of chart we want to create
                type: 'line',
               // The data for our dataset
                data: {
                    labels: ['0s', '14s', '28s', '42s', '56s', '70s', '84s', '98s', '112s', '126s', '140s', '154s','168s','182s','196s','210s','224s','238s', '252s','266s','280s+'],
                    datasets: [{
                        label: 'Normal Zombie Spawnrate',
                        borderColor: 'rgb(68, 85, 90)',
                        showLine: true,
                        data: [57.14, 55.88, 54.54, 53.13, 51.61, 50, 48.28, 46.43, 44.44, 42.31, 40, 37.5, 34.78, 31.82, 28.57, 25, 21.05, 16.67, 11.76, 6.25, 0],
                        fill: false,
                    }, 
                    {
                        label: 'Brute & Swarmer Spawnrate',
                        borderColor: 'rgb(100, 200, 104)',
                        showLine: true,
                        data: [2.86, 2.94, 3.0, 3.125, 3.23, 3.33, 3.45, 3.57, 3.70, 3.85, 4, 4.17, 4.35, 4.55, 4.76, 5, 5.26, 5.56, 5.88, 6.25, 6.67],
                        fill: false,
                    },
                    {
                        label: 'Elemental & Leaper Spawnrate',
                        borderColor: 'rgb(0, 128, 128)',
                        showLine: true,
                        data: [5.71, 5.88, 6.06, 6.25, 6.45, 6.67, 6.90, 7.14, 7.41, 7.69, 8, 8.33, 8.70, 9.09, 9.52, 10, 10.53, 11.11, 11.76, 12.5, 13.3],
                        fill: false,
                    },
                    {
                        label: 'Ticker, Edgar & Digger Spawnrate',
                        borderColor: 'rgb(255, 165, 0)',
                        showLine: true,
                        data: [8.57, 8.82, 9.09, 9.375, 9.68, 10, 10.34, 10.71, 11.11, 11.54, 12, 12.5, 13.04, 13.64, 14.29, 15, 15.79, 16.67, 17.65, 18.75, 20],
                        fill: false,
                    }]
                },
    
                // Configuration options go here
                options: {}
            });
        }
    }
    interval = setInterval(function() {
        if (window.Chart && ($("#expByRank").length || $("#ZombieChart").length)) {
            clearInterval(interval);
            startCharts();
        }
    }, 500);
})(jQuery, mediaWiki, window.Chart);