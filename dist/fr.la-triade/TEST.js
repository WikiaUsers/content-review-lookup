/*** Module de progression ***/
setTimeout(function () {
  document.querySelectorAll('.progressmodifs').forEach(function (item) {
    var modifs = parseInt(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', '')),
      palier;
      console.log(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', ''));
    if (modifs < 20) {
      palier = 20;
    } else if (modifs < 50) {
      palier = 50;
    } else if (modifs < 100) {
      palier = 100;
    } else if (modifs < 200) {
      palier = 200;
    } else if (modifs < 350) {
      palier = 350;
    } else if (modifs < 500) {
      palier = 500;
    } else if (modifs < 750) {
      palier = 750;
    } else if (modifs < 1000) {
      palier = 1000;
    } else if (modifs < 1500) {
      palier = 1500;
    } else if (modifs < 2000) {
      palier = 2000;
    } else if (modifs < 2500) {
      palier = 2500;
    } else if (modifs < 3000) {
      palier = 3000;
    } else if (modifs < 4000) {
      palier = 4000;
    } else {
      palier = 10000;
    }
    var calc = (modifs / palier) * 100,
      color;
    if (calc <= 25) {
      color = 'red';
    } else if (calc <= 50) {
      color = 'orange';
    } else if (calc <= 75) {
      color = 'yellow';
    } else {
      color = 'green';
    }
    item.innerHTML =
      '<center>' +
      Math.round(calc) +
      '% de ' +
      palier +
      '</center>\n<center><div style="width: 75%; height: 20px; background-image: linear-gradient(to right, ' +
      color +
      ' ' +
      calc +
      '%, #FFF 0%); border: 3px solid #3A3A3A"></div></center>';
  });
}, 5000);