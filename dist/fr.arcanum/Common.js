/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================

function dice_roll(die, dice,number) {
var roll = 0;
for (loop=0; loop < dice; loop++) {
// random number fix by George Johnston (cali_scripter@yahoo.com)
roll = roll + Math.round(Math.random() * die) % die + 1;
}
div_resultat = document.getElementById('div_resultat_de_'+number);
resultat=document.getElementById('resultat_de_'+number);
if (!resultat) return false;
resultat.innerHTML = roll;
div_resultat.style.visibility = "visible";
}


function reallyChangeInput(e){
  
  var targ = e.target.id;
  var num= targ.substr(targ.lastIndexOf('_')+1);
  

  var nb_de= document.getElementById('nb_de_'+num).innerHTML;
  var nb_faces = document.getElementById('nb_faces_'+num).innerHTML;
   dice_roll(nb_faces,nb_de,num);
}
function changeInput() {
   for (var i=1;i<=20;i++){
     span= document.getElementById('lancer_de_'+i);
     if (span) addHandler(span,'click',reallyChangeInput);
   }
}
addOnloadHook(changeInput);