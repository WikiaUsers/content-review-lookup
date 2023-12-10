$(document).ready(function(){
  $('div#content div.mw-parser-output').prepend('<div id="lede-start">');
  $('div#lede-start').nextUntil('h2').wrapAll('<div id="lede">');

  $('div#lede').after('<div id="body-start">');
  $('div#body-start').nextAll().wrapAll('<div id="body">');

  var findDuplicateLinksLede = function(){
    var href = $(this).attr('href');
    if (href != undefined && href.indexOf('#') != 0){
      if (seenLede[href]){
        $(this).addClass('duplicate-link');
      } else {
        seenLede[href] = true;
      }
    }
  };

  var findDuplicateLinksBody = function(){
    var href = $(this).attr('href');
    if (href != undefined && href.indexOf('#') != 0){
      if (seenBody[href]){
        $(this).addClass('duplicate-link');
      } else {
        seenBody[href] = true;
      }
    }
  };

  var seenLede = [];
  $('div#content div.mw-parser-output').find('div#lede p a').each(findDuplicateLinksLede);

  var seenBody = [];
  $('div#content div.mw-parser-output').find('div#body p a').each(findDuplicateLinksBody);
});