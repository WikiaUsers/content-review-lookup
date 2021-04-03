// Difficulty System Image Box [http://scpcb.gamepedia.com/SCP_-_Containment_Breach#Difficulty_System]]
// Provided by the Maple Clan (Juanjpro)
function findSwappingImageBoxes() {
   var elems = document.getElementsByClassName("swappingimagebox");
   for(var i=0; i<elems.length; i++) {
      elems[i].id = "imgBox"+i;
      var newArea = document.createElement("map");
      newArea.name = "mapImgBox"+i;
      elems[i].appendChild(newArea);
      var lastImg = null;
      var childrn = elems[i].childNodes;
      var scroll = 0;
      for (var k=0; k<childrn.length;k++) {
         if ((childrn[k].tagName || "").toLowerCase()==="p") {
            childrn[k].style.margin = "0";
            childrn[k].style.padding = "0";
            var children = childrn[k].childNodes;
            for (var j=0; j<children.length;j++) {
               if ((children[j].tagName || "").toLowerCase()==="img") {
                  lastImg = children[j];
                  lastImg.useMap = "#mapImgBox"+i;
                  scroll+=344;
               } else if ((children[j].tagName || "").toLowerCase()==="span") {
                  if (children[j].innerHTML!="nan") {
                     newArea.innerHTML += "<area shape=\"rect\" coords=\""+children[j].innerHTML+"\" href=\"#\" onclick=\"document.getElementById('imgBox"+i+"').scrollTop="+(scroll-344)+"; return false;\" />";
                  }
                  children[j].innerHTML = "";
               }
            }
         }
      }
   }
}

findSwappingImageBoxes();