/* Modèle Icones */

$(function()
  {
      setInterval(function()
                  {
      $("div#thinkicon")
  .css({
    borderTopLeftRadius: 1, 
    borderTopRightRadius: 1, 
    borderBottomLeftRadius: 1, 
    borderBottomRightRadius: 1 })
  .animate({
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30}, 200);
                  },3000);
      
      $('.image1 img').mouseover(function()
                             {
                               $('p.image1').fadeIn("slow");
                                $('p.image2').fadeOut("slow");
                             });
      
      $('.image2 img').mouseover(function()
                             {
                               $('p.image2').fadeIn("slow");
                               $('p.image1').fadeOut("slow");
                             });
      
      
      

  });