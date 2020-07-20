$(function() {

   $.get('http://topgun.wikia.com/wiki/Quotes/One_Liners?action=render', function(data) {

      var $quotes = $(data).filter('p');
      var length = $quotes.length;
      var random = Math.floor(Math.random() * length);
      var quote = $($quotes[random]).html();

      $('#WikiaRail .WikiaActivityModule').before('<section class="TopGunQuotesModule module"><h1>Top Gun Quotes</h1><p>' + quote + '</p><a href="http://topgun.wikia.com/wiki/Quotes/One_Liners" class="more">See more &gt;</a></section>');

   });

});