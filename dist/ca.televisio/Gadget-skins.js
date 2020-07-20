$(function() {
  var series = [
    'Bola de Drac'
  ];
  var diffs = [];
  var match = [];
  jQuery.grep(series, function(el) {
    if (jQuery.inArray(el, wgCategories) == -1) diffs.push(el);
  });
  jQuery.grep(series, function(el) {
    if (jQuery.inArray(el, diffs) ==-1) match.push(el);
  });
  if (match) {
    $('head').append('<style>@import url("http://tvskins.wikia.com/index.php?title=MediaWiki:' + encodeURI(match) + '/ca.css&action=raw&ctype=text/css");</style>');
  } else {
    $('head').append('<style>@import url("http://ca.televisio.wikia.com/wiki/MediaWiki:Noskin.css?action=raw&ctype=text/css");</style>');
  }
});