/* Any JavaScript here will be loaded for all users on every page load. */

/* Template:Pre */
 $(document).ready(function(){
   $('.pre').on('click',function(){
       if($(this).height() < 21){
         $(this).animate({height:$(this).get(0).scrollHeight});
         $(this).children('.pre-notice').css({"visibility":"hidden"});
       }else{
         $(this).animate({height:'20'},400, "linear", function() {
           $(this).children('.pre-notice').css({"visibility":"visible"})
         });
       };
   });
 });