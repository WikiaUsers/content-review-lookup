(function () {
  $('#stat-graph').append(
    $('<canvas>', {
      id: 'graph',
      width: 400,
      height: 300
    })
  );
  const ctx = document.getElementById('graph');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
})();