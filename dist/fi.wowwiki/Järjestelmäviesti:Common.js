/* Tämän sivun koodi liitetään jokaiseen sivulataukseen */
document.write('<script src="http://www.wowhead.com/widgets/power.js"></script>');

/* func */
function ToggleVisibility(el,anc) {
 if (document.getElementById(el).style.display == "none")
   {
    document.getElementById(el).style.display = "block";
    anc.innerHTML = "piilota";
   } else {
    document.getElementById(el).style.display = "none";
    anc.innerHTML = "näytä";
   }
}

/* loop through anchors */
var allAnchors = document.getElementsByTagName("a");// get all anchors in the document.
for(i=0; i < allAnchors.length; i++) { //start looping
    hrst = allAnchors[i].href;
    a = hrst.indexOf("#toggle:");
       if (a != -1) {
            element = hrst.substring(a+8);
            allAnchors[i].setAttribute('onclick',"ToggleVisibility('"+element+"',this);");
              if (document.getElementById(element).style.display == "none")
                  {
                     allAnchors[i].innerHTML = "näytä";
                  } else {
                     allAnchors[i].innerHTML = "piilota";
                  }
       }
    }
/* end */