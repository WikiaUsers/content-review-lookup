//   Tratto da https://onepiece.fandom.com/it
// ========================================
//              Elenchi random
// ========================================

function randomlist() {
 
 if ((document.getElementsByClassName('randomlist').length > 0) &&
     (document.getElementsByClassName('randomcontent').length > 0) &&
     (document.getElementsByClassName('randomtext').length > 0)) {
  var listNumber = document.getElementsByClassName('randomlist').length;
  for (var k = 0; k < listNumber; k++) {
   var max = parseInt(document.getElementsByClassName('randomlist')[k].title);
   var List = document.getElementsByClassName('randomcontent')[k].getElementsByTagName('li');
   var Text = document.getElementsByClassName('randomtext')[k];
   var N = new Array();
 
   Text.innerHTML = '';
   for (var i = 0; i < max; i++) {
    do {
     n = Math.round(Math.random() * (List.length - 1));
     for (var j = 0; j < i && n != -1; j++) {
      if (N[j] == n) n = -1;
     }
    } while (n == -1)
    N[i] = n;
    var Item = document.createElement('div');
    Item.innerHTML = List[n].innerHTML;
    Text.appendChild(Item);
   }
  }
 }
}

addOnloadHook(randomlist);