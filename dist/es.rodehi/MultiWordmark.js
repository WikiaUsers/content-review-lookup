/* Randomize wiki word-marks */
$(function() {
    var images = [
        'https://vignette.wikia.nocookie.net/lady-bug/images/e/ee/Ladybug_Logo.png/revision/latest?cb=20190524070545',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/12/Chat_Logo.png/revision/latest?cb=20190524070620',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/4a/Fox_Logo.png/revision/latest?cb=20190524072049',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/1a/Bee_Logo.png/revision/latest?cb=20190524154346',
        'https://vignette.wikia.nocookie.net/lady-bug/images/8/80/Turtle_Logo.png/revision/latest?cb=20190524154414',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/43/Butterfly_Logo.png/revision/latest?cb=20190524072147'
      ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});