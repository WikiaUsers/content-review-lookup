/* © Wiki Gardiens des Cités Perdues */

/*** Module de progression ***/
setTimeout(function () {
  document.querySelectorAll('.progressmodifs').forEach(function (item) {
    var modifs = parseInt(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', '')),
      palier;
      console.log(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', ''));
    if (modifs < 1) {
      palier = 1;
    } else if (modifs < 2) {
      palier = 2;
    } else if (modifs < 5) {
      palier = 5;
    } else if (modifs < 10) {
      palier = 10;
    } else if (modifs < 20) {
      palier = 20;
    } else if (modifs < 30) {
      palier = 30;
    } else if (modifs < 40) {
      palier = 40;
    } else if (modifs < 50) {
      palier = 50;
    } else if (modifs < 60) {
      palier = 60;
    } else if (modifs < 70) {
      palier = 70;
    } else if (modifs < 80) {
      palier = 80;
    } else if (modifs < 90) {
      palier = 90;
    } else if (modifs < 100) {
      palier = 100;
    } else if (modifs < 150) {
      palier = 150;
    } else if (modifs < 200) {
      palier = 200;
    } else if (modifs < 250) {
      palier = 250;
    } else if (modifs < 300) {
      palier = 300;
    } else if (modifs < 350) {
      palier = 350;
    } else if (modifs < 400) {
      palier = 400;
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
    } else if (modifs < 5000) {
      palier = 5000;
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