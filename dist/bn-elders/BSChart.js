<script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Hour', 'Actual points', 'Required points'],
          ['1',  100000,      50000],
          ['4',  200170,      200000],
          ['5',  365756,      250000],
          ['9',  670850,      450000]
        ]);

        var options = {
          title: 'Company Performance',
          hAxis: {title: 'Boss Strike Progress',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('bs6_chart'));
        chart.draw(data, options);
      }
 </script>