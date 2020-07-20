/* List images */
var WikiaRailImageArray = new Array();
    WikiaRailImageArray[0] ='<div id="mosbox"><a href="http://sonako.wikia.com/wiki/Mahouka_Koukou_no_Rettousei">Mahouka Koukou no Rettousei</a></div><div style="margin-top:0px; align:center"><a href="http://sonako.wikia.com/wiki/Mahouka_Koukou_no_Rettousei"><img src="https://images.wikia.nocookie.net/__cb20131203035513/sonako/images/thumb/8/83/Mahouka_72.jpg/300px-Mahouka_72.jpg" title="Click vào hình" alt="Emi"><a></div>';
    WikiaRailImageArray[1] ='<div id="mosbox"><a href="http://sonako.wikia.com/wiki/Mahouka_Koukou_no_Rettousei">Mahouka Koukou no Rettousei</a></div><div style="margin-top:0px; align:center"><a href="http://sonako.wikia.com/wiki/Mahouka_Koukou_no_Rettousei"><img src="https://images.wikia.nocookie.net/__cb20131203035513/sonako/images/thumb/8/83/Mahouka_72.jpg/300px-Mahouka_72.jpg" title="Click vào hình" alt="Emi"><a></div>';
    WikiaRailImageArray[2] ='<div id="mosbox"><a href="http://sonako.wikia.com/wiki/Mahouka_Koukou_no_Rettousei">Mahouka Koukou no Rettousei</a></div><div style="margin-top:0px; align:center"><a href="http://sonako.wikia.com/wiki/Mahouka_Koukou_no_Rettousei"><img src="https://images.wikia.nocookie.net/__cb20131203035513/sonako/images/thumb/8/83/Mahouka_72.jpg/300px-Mahouka_72.jpg" title="Click vào hình" alt="Emi"><a></div>';
 
/* Select image */
var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));

/* Insert image */
$(window).load(function() {
      $('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);
});