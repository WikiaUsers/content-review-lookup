$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20150401193707/buddyfight/es/images/5/50/Wiki-background',
      'https://images.wikia.nocookie.net/__cb20150401195205/buddyfight/es/images/a/a3/Background_2.jpg',
      'https://images.wikia.nocookie.net/__cb20150401195621/buddyfight/es/images/8/8c/Background_3.jpg',
      'https://images.wikia.nocookie.net/__cb20150401200022/buddyfight/es/images/6/69/Bakcground_4.jpg'
    ];
 
    $('background a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});