/* sidebar */
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'What is New?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

//Wordmarks
$(function() {
    var images = [
      'https://vignette.wikia.nocookie.net/wildkratts/images/7/70/Martin_Wordmark.png/revision/latest?cb=20170619160348',
      'https://vignette.wikia.nocookie.net/wildkratts/images/4/4f/Chris_Wordmark.png/revision/latest?cb=20170619160246',
      'https://vignette.wikia.nocookie.net/wildkratts/images/d/d3/Aviva_Wordmark.png/revision/latest?cb=20170619160228',
      'https://vignette.wikia.nocookie.net/wildkratts/images/1/1a/Koki_Wordmark.png/revision/latest?cb=20170619160332',
      'https://vignette.wikia.nocookie.net/wildkratts/images/5/59/Jimmy_Wordmark.png/revision/latest?cb=20170619160311'
    ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

//Backgrounds
var wallpaper = [
      'http://pbskids.org/wildkratts/img/bgs/bg_main.jpg',
      'http://pbskids.org/wildkratts/img/bgs/bg_games.png',
      'http://pbskids.org/wildkratts/img/bgs/bg_habitat.png',
      'http://pbskids.org/wildkratts/img/bgs/bg_video.png',
      'http://pbskids.org/wildkratts/img/bgs/bg_creaturepedia.png',
      'http://pbskids.org/wildkratts/img/bgs/bg_yourroom.png'
      ];
var bg = wallpaper[Math.floor(Math.random() * wallpaper.length)];
 
$('.mediawiki').css({
   'background-image' : 'url("'+bg+'")',
   'background-color' : '#000',
   'background-size' : 'cover',
   'background-attachment' : 'fixed',
   'background-repeat' : 'no-repeat'
});