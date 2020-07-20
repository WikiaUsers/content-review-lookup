/*<pre><nowiki>*/
 
// Randomize wiki logo Thread578801
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20141107060913/starfighter/images/8/85/Abellogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060913/starfighter/images/2/20/Cainlogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060913/starfighter/images/1/1b/Cainabellogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060914/starfighter/images/1/18/Deimoslogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060914/starfighter/images/2/23/Enckelogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060914/starfighter/images/4/4a/Cainlogo2.png',
      'https://images.wikia.nocookie.net/__cb20141107060916/starfighter/images/8/87/Keelerlogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060916/starfighter/images/f/f6/Ethoslogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060917/starfighter/images/7/7d/Praxislogo.png',
      'https://images.wikia.nocookie.net/__cb20141107060917/starfighter/images/9/98/Phoboslogo.png',
    
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
 
/*</nowiki></pre>*/