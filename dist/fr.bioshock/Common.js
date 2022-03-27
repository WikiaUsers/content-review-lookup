/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 
 // END import Onlyifediting-functions
 // ============================================================

// ============================================================
// BEGIN Template:Games (source: The Vault)
// ============================================================

function addTitleGames()
{
    var titleDiv = document.getElementById("title-games");
    if (titleDiv != null && titleDiv != undefined)
    {
       var content = document.getElementById('article');
       if (!content) 
       {
         var content = document.getElementById('content');
       }

       if (content) 
       {
          var hs = content.getElementsByTagName('h1');
          var firstHeading;
          for (var i = 0; i < hs.length; i++){
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
              firstHeading=hs[i];
              break;
            }
          }
   
          var cloneNode = titleDiv.cloneNode(true);
          firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
          cloneNode.style.display = "block";
          cloneNode.style.visibility = "visible";
          if (skin != "monaco")
          {
            cloneNode.style.marginTop = "-11px";
          }
       }
    }
}

addOnloadHook( addTitleGames );

// ============================================================
// END Template:Games
// ============================================================