document.write('<script type="text/javascript" src="' 
             + '/index.php?title=MediaWiki:Wikificator.js' 
             + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');

function marque_tab()
{
var toolbar = document.getElementById('toolbar');
if (!toolbar) return false;

var textbox = document.getElementById('wpTextbox1');
if (!textbox) return false;

if (!document.selection && textbox.selectionStart == null) return false;

var image2 = document.createElement('img');
image2.width = 69;
image2.height = 22;
image2.src = 'https://images.wikia.nocookie.net/rpg/ru/images/d/d1/Button-wikifikator.png';
image2.border = 0;
image2.alt = 'Викификатор';
image2.title = 'Викификатор';
image2.style.cursor = 'pointer';
image2.onclick = function() {
  Wikify();
  return false;
}
toolbar.appendChild(image2);
}

addOnloadHook(marque_tab);