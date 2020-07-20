//Adds hide button for templates
/*importScriptPage('ShowHide/code.js', 'dev');*/
importScriptPage('InactiveUsers/code.js', 'dev');


//Enables template sidebar to work properly
/*$(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      '' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});
*/


$(function() {
    var headerBackgroundImages = [
      'https://vignette.wikia.nocookie.net/onehundredpercentorangejuice/images/a/a3/Suguri_Swimsuit_Art.png/revision/latest/scale-to-width-down/195?cb=20180808062810',
      'https://vignette.wikia.nocookie.net/onehundredpercentorangejuice/images/0/03/Hime_Swimsuit_Art.png/revision/latest/scale-to-width-down/195?cb=20180808062928',
      'https://vignette.wikia.nocookie.net/onehundredpercentorangejuice/images/3/3e/Sora_Swimsuit_Art.png/revision/latest/scale-to-width-down/195?cb=20180808062950',
    ];
$('.lowerimagesummer').css('background-image', 'url("' + headerBackgroundImages[Math.floor(Math.random() * headerBackgroundImages.length)] + '")');
});