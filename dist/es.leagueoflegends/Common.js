/* Scripts which are imported via [[MediaWiki:ImportJS]]
dev:InactiveUsers/code.js
dev:InputUsername/code.js
dev:OggPlayer.js
dev:Tooltips.js
//dev:DiscordModule/code.js //not working yet
dev:EditorColorPicker.js
Common.js/OggPlayerDownload.js
*/

/* Custom Tooltips for use with the Tooltips/code.js */
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

/* Gráficas */

const texto =  document.querySelector('prueba');
prueba.innerHTML = "<canvas id='myChart' width='400' height='400'></canvas>";

const Chart = require('chart.js');

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

/* DO NOT ADD CODE BELOW THIS LINE */