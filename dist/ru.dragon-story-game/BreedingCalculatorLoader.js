$(document).ready(function()
{     
   if (skin == "oasis")
   {                  
        eval(document.getElementById("breedingcalculatordata").innerHTML);
        (1,eval)(document.getElementById("breedingcalculatorcode").innerHTML);
  	setMenuOptions();
        $('form#breeddragons').toggle();	
        $('form#findparents').toggle(); 
   }        
});