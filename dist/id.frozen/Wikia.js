/*---------------------- Framekiller ----------------------------------*/
 // Additional UserRights Icons in profile mastheads
 importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 // END Additional UserRights Icons in profile mastheads
if (parent.frames.length > 0) { 
  var file = document.referrer.match(/imgurl=(.*?)&/);
  if ( file.length > 0 ){
    top.location.href =  document.location.href + '?file=' + file[1].split('/').pop();
  } else {
    top.location.href =  document.location.href
  }
}
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');
/*--------------------------------------------------------------------*/
 
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Apa yang Baru?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});
 
// Randomize wiki logo
$(function() {
    var images = [
      'https://vignette.wikia.nocookie.net/frozen/images/8/89/Wiki-wordmark.png/revision/latest?cb=20141108011737',
      'https://vignette.wikia.nocookie.net/frozen/images/d/dd/Frozen_Wiki_Word-mark_1.png/revision/latest?cb=20141108012008',
      'https://vignette.wikia.nocookie.net/frozen/images/a/a1/Frozen_Wiki_Word-mark_2.png/revision/latest?cb=20141108012008',
      'https://vignette.wikia.nocookie.net/frozen/images/c/c7/Frozen_Wiki_Word-mark_3.png/revision/latest?cb=20141108012008',
      'https://vignette.wikia.nocookie.net/frozen/images/0/07/Frozen_Wiki_Word-mark_4.png/revision/latest?cb=20141108012009',
      'https://vignette.wikia.nocookie.net/frozen/images/2/2f/Frozen_Wiki_Word-mark_5.png/revision/latest?cb=20141108012009',
      'https://vignette.wikia.nocookie.net/frozen/images/d/df/Frozen_Wiki_Word-mark_6.png/revision/latest?cb=20141108012010',
      'https://vignette.wikia.nocookie.net/frozen/images/a/a4/Frozen_Wiki_Word-mark_7.png/revision/latest?cb=20141108012011'
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});