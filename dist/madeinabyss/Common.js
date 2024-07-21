/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function(){
      $('.sblur-toggle').on('click', function(){
        $('.sblur, .no-sblur').toggleClass('sblur no-sblur');
        $('.miawiki-sblur-on, .miawiki-sblur-off').toggleClass('miawiki-sblur-on miawiki-sblur-off');
        $('.miawiki-sblur-on').text('On');
        $('.miawiki-sblur-off').text('Off');
  });
});