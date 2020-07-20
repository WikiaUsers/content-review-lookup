$('.chart').each(function() {
    $(this).append('<canvas id="canvas' + $(this).data('n') + '"></canvas>');
});

var rcsomething = {
    'Bertunio': 56,
    'Duckey Detective': 37,
    'FANDOM': 4,
    'Mira Laime': 1,
    'Nanaki': 1,
    'NewWorld2016': 1,
    'Tragolipus': 380,
    'Tydeus 2000': 13
};
var mylabels = [];
var mydata = [];
$.each(rcsomething, function(key, value) {
  mylabels.push(key);
  mydata.push(value);
});


var myChart = new Chart($('#canvas1')[0].getContext('2d'), {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            ],
            borderColor: [
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var pieChart = new Chart($('#canvas2')[0].getContext('2d'), {
    type: 'doughnut',
    data: {
        datasets: [{
            data: mydata,
            backgroundColor: [
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            ],
            borderColor: [
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            ]
        }],
        labels: mylabels
    }
});