var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $('.mediawiki').css('background-size', '100%'); //Scroll Down
   } else {
       $('.mediawiki').css('background-size', '125%'); //Scroll Up
   }
   lastScrollTop = st;
});