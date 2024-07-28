mw.hook('wikipage.content').add(function() {
  var colors = ['#36a2eb', '#ff6384', '#ff9f40', '#4bc0c0', '#9966ff'];
  document.querySelectorAll('.datatable').forEach(function(table) {
    var canvas = document.createElement('canvas');
    var graphFile = table.previousElementSibling.querySelector('a');
    var imageContainer = table.previousElementSibling;
    imageContainer.replaceChildren(canvas);

    var labels = [];
    var datasets = [];

    table.querySelectorAll('tr').forEach(function(row, idx) {
      if (idx === 0) {
        row.querySelectorAll('th').forEach(function(th, idx) {
          if (idx === 0) return;

          datasets.push({
            label: th.innerText,
            data: [],
            borderWidth: 1,
            backgroundColor: colors[idx - 1],
          });
        });
        return;
      }

      row.querySelectorAll('td').forEach(function(td, idx) {
        if (idx === 0) {
          labels.push(td.innerText);
          return;
        }

        var values = td.innerText.split('-');
        if (values.length === 1) {
          datasets[idx - 1].data.push(parseInt(values[0]));
          datasets[idx - 1].type = 'bubble';
        } else {
          datasets[idx - 1].data.push([
            parseInt(values[0]),
            parseInt(values[1])
          ]);
          datasets[idx - 1].type = 'bar';
        }
      });
    });

    var chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    
    if (!mw.config.get('wgUserGroups').includes('sysop')) return;
    if (graphFile.classList.contains('new')) {
      imageContainer.append('The graph\'s image hasn\'t been uploaded to the wiki, it won\'t be shown in mobile skin.');
    }
    
	var button = document.createElement('button');
    button.classList.add('wds-button');
    button.classList.add('wds-is-full-width');
    button.innerText = 'Upload file';
    imageContainer.append(button);
    
    button.addEventListener('click', function() {
      this.disabled = true;
      this.parentElement.querySelector('canvas').toBlob(function(file) {
      	var filename = table.parentElement.dataset.filename;
        var api = new mw.Api();
        api.upload(file, {
          filename: filename,
          format: 'json',
          ignorewarnings: 1
        });
      });
    });
  });
});