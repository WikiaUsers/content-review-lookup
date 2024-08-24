$(function() {
  var jsSkins = [
    'Bleach',
    'Mekakucity Actors',
    'Naruto',
    'Phineas y Ferb',
    'Sword Art Online'
  ];
  var cssSkins = [
    'Bleach',
    'Dragon Ball',
    'El Increíble Mundo de Gumball',
    'Hora de Aventura',
    'Mekakucity Actors',
    'Naruto',
    'Phineas y Ferb',
    'Sword Art Online'
  ];
  var encodedSkin = encodeURI(wgCategories[0]);
  var jsmatch = $.inArray(wgCategories[0], jsSkins) > -1;
  var cssmatch = $.inArray(wgCategories[0], cssSkins) > -1;
  if (cssmatch) {
    $('head').append('<style>@import url("http://tvskins.wikia.com/wiki/MediaWiki:' + encodedSkin + '/es.css?action=raw&ctype=text/css");</style>')
  }
  else {
    $('head').append('<style>@import url("http://es.television.wikia.com/wiki/MediaWiki:Noskin.css?action=raw&ctype=text/css");</style>')
  };
  if (jsmatch) {
    $('head').append('<script src="http://tvskins.wikia.com/wiki/MediaWiki:' + encodedSkin + '/es.js?action=raw&ctype=text/javascript"></script>')
  };
});