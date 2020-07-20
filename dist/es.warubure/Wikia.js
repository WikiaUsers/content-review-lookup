$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20141227220859/warubure/es/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20141227224225/warubure/es/images/2/24/Seiken_Tsukai_no_World_Break_Wiki_2.png',
      'https://images.wikia.nocookie.net/__cb20141227224226/warubure/es/images/6/68/Seiken_Tsukai_no_World_Break_Wiki_3.png',
      'https://images.wikia.nocookie.net/__cb20141227224226/warubure/es/images/e/e3/Seiken_Tsukai_no_World_Break_Wiki_4.png',
      'https://images.wikia.nocookie.net/__cb20141227224235/warubure/es/images/6/6b/Seiken_Tsukai_no_World_Break_Wiki_5.png',
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});