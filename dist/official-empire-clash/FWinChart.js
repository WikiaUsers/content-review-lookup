// Set the chart options
var chartOptions = {
  type: 'line',
  data: {
    labels: [], // labels for the x-axis
    datasets: [
      {
        label: 'Redcliff Republic',
        borderColor: 'rgba(255, 99, 71, 1)',
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        data: [] // data for the Redcliff Republic faction
      },
      {
        label: 'Kingdom of Korblox',
        borderColor: 'rgba(99, 84, 255, 1)',
        backgroundColor: 'rgba(99, 84, 255, 0.1)',
        data: [] // data for the Kingdom of Korblox faction
      },
      {
        label: 'Overseer Commune',
        borderColor: 'rgba(50, 205, 50, 1)',
        backgroundColor: 'rgba(50, 205, 50, 0.1)',
        data: [] // data for the Overseer Commune faction
      },
      {
        label: 'Empyrean Empire',
        borderColor: 'rgba(255, 192, 203, 1)',
        backgroundColor: 'rgba(255, 192, 203, 0.1)',
        data: [] // data for the Empyrean Empire faction
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
    	labels: {
    		fontColor: 'white'	
    	}
    },
    title: {
      display: true,
      text: 'Faction Wins Over Time',
      fontColor: 'white'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};

var canvas = document.createElement('canvas');
canvas.id = 'faction-chart';
canvas.width = 800;
canvas.height = 700;

// Insert the canvas element into the div with the class "faction-chart"
var container = document.querySelector('.faction-chart');
container.appendChild(canvas);

// Retrieve the data from the Google Spreadsheet
fetch('https://sheets.googleapis.com/v4/spreadsheets/1GRzBLaEcupb7zteSdO2GBtoxsPx13ertgCfrqpMfzRQ/values/Sheet1?alt=json&key=AIzaSyBU6S8iQzQRzSq7gtKuqgjZDBiQItod_9A')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Process the data and add it to the chart options
    var rows = data.values;
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var time = row[0];
      var redcliffRepublic = row[1];
      var kingdomOfKorblox = row[2];
      var overseerCommune = row[3];
      var empyreanEmpire = row[4];

      chartOptions.data.labels.push(time);
      chartOptions.data.datasets[0].data.push(parseInt(redcliffRepublic));
      chartOptions.data.datasets[1].data.push(parseInt(kingdomOfKorblox));
      chartOptions.data.datasets[2].data.push(parseInt(overseerCommune));
      chartOptions.data.datasets[3].data.push(parseInt(empyreanEmpire));
    }

    // Create the chart
    var ctx = document.getElementById('faction-chart').getContext('2d');
    new Chart(ctx, chartOptions);
  });