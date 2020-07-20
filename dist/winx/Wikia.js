//Wordmarks
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/winx/images/0/08/Bloom_Wordmark.png',
      'https://images.wikia.nocookie.net/winx/images/7/78/Stella_Wordmark.png',
      'https://images.wikia.nocookie.net/winx/images/6/6b/Flora_Wordmark.png',
      'https://images.wikia.nocookie.net/winx/images/5/5c/Musa_Wordmark.png',
      'https://images.wikia.nocookie.net/winx/images/9/93/Tecna_Wordmark.png',
      'https://images.wikia.nocookie.net/winx/images/5/5b/Aisha_Wordmark.png'
    ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});