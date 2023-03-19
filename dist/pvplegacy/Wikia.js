InactiveUsers = { months: 6 };

importScriptPage("MediaWiki:Chart.js", "dev"); // Manually load the script because ImportJS fails
;(function( $, mw, Chart ) {                   // Wait for huge script to load
    setTimeout(function() {
        clearInterval(interval);
    }, 10000);                                 // But don't wait more than 10 seconds
    
    function startCharts() {
        if ($("#expByRank").length) {
            var xbr = document.getElementById('expByRank');
            var xbr2 = document.createElement('canvas'); // Manually create a <canvas> tag from the div with id="expByRank"
            xbr.appendChild(xbr2).getContext('2d');
            xbr = xbr2.getContext('2d');

            var xbrChart = new window.Chart(xbr, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                   labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70'],
                  datasets: [ {
                     label: 'Current - EXP required to level up',
                        borderColor: 'rgb(55,213,190)',
                        showLine: true,
                        data: [45, 49, 52, 56, 59, 63, 66, 70, 73, 77, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 256, 264, 272, 280, 288, 296, 304, 312, 320, 327, 328, 330, 331, 333, 334, 336, 337, 339, 340, 342, 343, 345, 346, 348, 349, 351, 352, 354, 355, 357, 358, 360, 361, 363, 364, 366, 367, 369, 370],
                        fill: false,
                 },
                      {
                       label: 'Original - EXP required to level up',
                       borderColor: 'rgb(68, 85, 90)',
                       showLine: true,
                       data: [35, 37, 40, 42, 45, 47, 50, 52, 55, 57, 60, 62, 65, 68, 70, 72, 75, 78, 80, 83, 85, 88, 90, 93, 95, 98, 100, 103, 105, 108, 110, 112, 115, 117, 120, 122, 125, 127, 130, 132, 135, 137, 140, 143, 145, 147, 150, 152, 155, 157, 160, 162, 165, 167, 170, 172, 175, 177, 180, 182, 185, 187, 190, 192, 195, 197, 200, 202, 205, 207, 210],
                      fill: false,
                   },]
              },

              // Configuration options go here
               options: {}
          });
        }
        
        if ($("#expByRank2").length) {
            var ybr = document.getElementById('expByRank');
            var ybr2 = document.createElement('canvas'); // Manually create a <canvas> tag from the div with id="expByRank2"
            ybr.appendChild(ybr2).getContext('2d');
            ybr = ybr2.getContext('2d');

            var ybrChart = new window.Chart(ybr, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                   labels: ['71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135'],
                  datasets: [ {
                     label: 'Current EXP required to level up',
                        borderColor: 'rgb(55,213,190)',
                        showLine: true,  data: [372, 373, 375, 376, 378, 379, 381, 382, 384, 385, 387, 388, 390, 391, 393, 394, 396, 397, 399, 400, 402, 403, 405, 406, 408, 409, 411, 412, 414, 415, 417, 418, 420, 421, 423, 424, 426, 427, 429, 430, 432, 433, 435, 436, 438, 439, 441, 442, 444, 445, 447, 448, 450, 451, 453, 454, 456, 457, 459, 460, 462, 463, 465, 466, 468],
                        fill: false,
                 },
                      {
                       label: 'Original -  EXP required to level up',
                       borderColor: 'rgb(68, 85, 90)',
                       showLine: true,
                       data: [212, 215, 217, 220, 222, 225, 227, 230, 232, 235, 237, 240, 242, 245, 247, 250, 252, 255, 257, 260, 262, 265, 267, 270, 272, 275, 277, 280, 282, 285, 287, 290, 292, 295, 297, 300, 302, 305, 307, 310, 312, 315, 317, 320, 322, 325, 327, 330, 332, 335, 337, 340, 342, 345, 347, 350, 352, 355, 357, 360, 362, 365, 367, 370, 372],
                      fill: false,
                   },]
              },

              // Configuration options go here
               options: {}
          });
        }

    }
    interval = setInterval(function() {
        if (window.Chart && ($("#expByRank").length)) {
            clearInterval(interval);
            startCharts();
        }
    }, 500);
})(jQuery, mediaWiki, window.Chart);