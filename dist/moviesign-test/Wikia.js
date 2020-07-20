importScriptPage("MediaWiki:Chart.js", "dev");  // Manually load the script because ImportJS fails
;(function( $, mw, Chart ) {                    // Wait for huge script to load
    setTimeout(function() {
        clearInterval(interval);
    }, 30000);                                  // But don't wait more than 30 seconds
    
    function startCharts() {
        var ctx = document.getElementById('myChart');
        var ctx2 = document.createElement('canvas');  // Manually create a <canvas> tag from the div with id="myChart"
        ctx.appendChild(ctx2).getContext('2d');
        ctx = ctx2.getContext('2d');

        var chart = new window.Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
           // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },

            // Configuration options go here
            options: {}
        });
    }
    interval = setInterval(function() {
        if (window.Chart && $("#myChart").length) {
            startCharts();
            clearInterval(interval);
        }
    }, 500);
})(jQuery, mediaWiki, window.Chart);