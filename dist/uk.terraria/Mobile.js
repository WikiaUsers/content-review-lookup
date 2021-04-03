/* Any JavaScript here will be loaded for users using the mobile site */

$(window).on('load', function(){
   //main page header.
   var $btn = $('#box-wikiheader #box-wikiheader-toggle-link');
   if($btn.length){
      var $box = $('#box-wikiheader');
      $btn.css('display', 'inline');
      if($box.innerHeight() > 180){
         $box.addClass('collapsed');
      }
      $btn.on('click', function(){
         $box.toggleClass('collapsed');
      });
   }
});