function createTestChart() {
   var randomScalingFactor = function() { return Math.round(Math.random() * 100); };
   var lineChartData = {
      labels: [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
      ],
      datasets: [
         {
            label: 'Dataset 1',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor()
            ]
         },
         {
            label: 'Dataset 2',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor(),
               randomScalingFactor()
            ]
         }
      ]
   };

   var ctx = document.getElementById("canvas").getContext("2d");
   window.myLine = new Chart(ctx).Line(lineChartData, {
      responsive: true;
   });
}

window.onload = createTestChart();