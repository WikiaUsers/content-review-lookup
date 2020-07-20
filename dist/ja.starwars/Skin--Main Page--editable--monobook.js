 function loadFunc2()
 {
     loadFunc();
   
     var nodes = document.getElementById("column-one").getElementsByTagName("div");

     for (var i = 0; i < nodes.length; i++)
     {
         nodes[i].onmouseover = function()
         {
             this.className += " over";
         }
     
         nodes[i].onmouseout = function()
         {
             this.className = this.className.replace(new RegExp(" over\\b"), "");
         }
     }
 }

 window.onload = loadFunc2;