function randomlist() {
 
 if (document.getElementsByClass('randomlist') &&
     document.getElementsByClass('randomcontent') &&
     document.getElementsByClass('randomtext')) {
  var listNumber = document.getElementsByClass('randomlist').length;
  for (var k = 0; k < listNumber; k++) {
   var max = parseInt(document.getElementsByClass('randomlist')[k].title);
   var List = document.getElementsByClass('randomcontent')[k].getElementsByTagName('li');
   var Text = document.getElementsByClass('randomtext')[k];
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