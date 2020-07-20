var currImg=0;

//When a tag is clicked start the swap function based on the designated tag.
$("#Tag0").click(function(){changeImage(0);});
$("#Tag1").click(function(){changeImage(1);});
$("#Tag2").click(function(){changeImage(2);});
   
function changeImage(img){
   //If this is already our active image, no need to swap anything.
   if(isNaN(img)||img==currImg){
      return;
   }
   //Swap the images and active tags.
   document.getElementById("Image" + img).style.display = "block";
   document.getElementById("Tag" + img).color = "#02A7C7";
   document.getElementById("Image" + currImg).style.display = "none";
   document.getElementById("Tag" + currImg).color = "#FFFFFF";
   currImg = img;
   return;
}