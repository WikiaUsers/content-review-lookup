if ($("#naechste").length > 0) {

}
else 
{
$a_pagename = wgPageName.replace('Geschichte:','');
$story = $a_pagename.substring(0,$a_pagename.indexOf('/'));
$subpagename = $a_pagename.substring($a_pagename.indexOf('/')+1);
$subpagename_num = $subpagename.substring($subpagename.search(/\d/));
$subpagename_title = $subpagename.substring(0,$subpagename.search(/\d/));
$subpagename_num_minus = $subpagename_num - 1;
$subpagename_num_plus = $subpagename_num - (-1);

function removeUnderscores() {
naechste_nounderscore = $("#naechste a").text().replace(/_/g,' ');
$("#naechste a").html(naechste_nounderscore);

vorherige_nounderscore = $("#vorherige a").text().replace(/_/g,' ');
$("#vorherige a").html(vorherige_nounderscore);

aktuell_nounderscore = $("#aktuell").text().replace(/_/g,' ');
$("#aktuell").html(aktuell_nounderscore);
}

$.get( "http://de.fanfictions.wikia.com/wiki/Geschichte:" + $story + "/" + $subpagename_title + $subpagename_num_minus + "?action=render" )
  .done(function() {

// nothing

  })
  .fail(function() {

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

var length_subpagename = $subpagename_num.length;
if (length_subpagename === 3) {
$subpagename_num_minus = pad($subpagename_num_minus, 3);
$subpagename_num_plus  = pad($subpagename_num_plus,  3);
}
if (length_subpagename === 2) {
$subpagename_num_minus = pad($subpagename_num_minus, 2);
$subpagename_num_plus  = pad($subpagename_num_plus,  2);
}

  });

setTimeout(function() {
if ($subpagename_title === "") {
if (isNaN($subpagename_num) == true) {
//return what happens if string is no number
console.log("no numeric string");
} else {

   $("#storyfooter").before('<div id="empty_div_nav" />');
   var empty_div_nav = $("div#empty_div_nav");
   empty_div_nav.load("http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichten-Navigation?action=render", null, function() {
 //   var box = $(this).find('#geschichten-navigation')
//    $("#geschichten-navigation + #geschichten-navigation").remove();
   });

//fill in data
setTimeout(function () {

$("#aktuell").text($subpagename);

// naechste geschichte
$.get( "http://de.fanfictions.wikia.com/wiki/Geschichte:" + $story + "/" + $subpagename_title + $subpagename_num_plus + "?action=render" )
  .done(function() {

$("#naechste").append('<a href="/wiki/Geschichte:' + $story + '/'  + $subpagename_num_plus + '?ref=storynav_vorherige_geschichte" title="Nächste Geschichte">' + $subpagename_num_plus + ' →</a>');

  })
  .fail(function() {

$("#naechste").append('Noch keine bislang');

  });

// vorherige geschichte
$.get( "http://de.fanfictions.wikia.com/wiki/Geschichte:" + $story + "/" + $subpagename_title + $subpagename_num_minus + "?action=render" )
  .done(function() {

$("#vorherige").append('<a href="/wiki/Geschichte:' + $story + '/' +  $subpagename_num_minus + '?ref=storynav_folgende_geschichte" title="Vorherige Geschichte">← ' +  $subpagename_num_minus + '</a>');

  })
  .fail(function() {

$("#vorherige").append('Keine');

  });

}, 1000);
setTimeout(function() {
removeUnderscores();
}, 2000);


}
} else {

   $("#storyfooter").before('<div id="empty_div_nav" />');
   var empty_div_nav = $("div#empty_div_nav");
   empty_div_nav.load("http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichten-Navigation?action=render", null, function() {
 //   var box = $(this).find('#geschichten-navigation')
//    $("#geschichten-navigation + #geschichten-navigation").remove();
   });

//fill in data
setTimeout(function () {

$("#aktuell").text($subpagename);

// naechste geschichte
$.get( "http://de.fanfictions.wikia.com/wiki/Geschichte:" + $story + "/" + $subpagename_title + $subpagename_num_plus + "?action=render" )
  .done(function() {

$("#naechste").append('<a href="/wiki/Geschichte:' + $story + '/' + $subpagename_title + $subpagename_num_plus + '" title="Nächste Geschichte">' + $subpagename_title + $subpagename_num_plus + ' →</a>');

  })
  .fail(function() {

$("#naechste").append('Noch keine bislang');

  });

// vorherige geschichte
$.get( "http://de.fanfictions.wikia.com/wiki/Geschichte:" + $story + "/" + $subpagename_title + $subpagename_num_minus + "?action=render" )
  .done(function() {

$("#vorherige").append('<a href="/wiki/Geschichte:' + $story + '/' + $subpagename_title + $subpagename_num_minus + '" title="Vorherige Geschichte">← ' + $subpagename_title + $subpagename_num_minus + '</a>');

  })
  .fail(function() {

$("#vorherige").append('Keine');

  });

}, 500);
setTimeout(function() {
removeUnderscores();
}, 2000);

}
}, 1000);
}