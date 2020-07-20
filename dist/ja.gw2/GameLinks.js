/**** GameLinks.js
 * by Dr ishmael
 *
 * Rudimentary functions for encoding game IDs into base-64 game links.
 * Eventually this will be functionalized into Widgets, so we can apply it
 * directly to the ID without having to scan the entire page.
 *
 * Should work for everything except complex Item IDs, like dyes.
 */

// Event functions to ease copying the game link
function focusGameLink() {
  var x = this.previousSibling;
  x.style.display = 'inline-block';
  
  this.style.visiblity = 'hidden';
  
  x.focus();
  x.select();
}

function blurGameLink() {
  var y = this.nextSibling;
  
  y.style.visiblity = 'visible';
  this.style.display = 'none';
}

// The main object
var Base64 = {

  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode : function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  }

}

function BEtoLE(be)
{
  var le = String.fromCharCode(be.charCodeAt(0) & 255) + String.fromCharCode(be.charCodeAt(0) >> 8);
  return le;
}

function encodeIds()
{
  var pad = String.fromCharCode(0) + String.fromCharCode(0);
  var spans = document.getElementsByTagName('span');

  for (i in spans) {
    if (spans[i].innerHTML == '') { continue; }

    var typeId = "0";

    // Item ids
    if((' ' + spans[i].className + ' ').indexOf(' itemId ') > -1)
      typeId = String.fromCharCode(2) + String.fromCharCode(1);

    // Map ids
    if((' ' + spans[i].className + ' ').indexOf(' mapId ') > -1)
      typeId = String.fromCharCode(4);

    // Skill ids
    if((' ' + spans[i].className + ' ').indexOf(' skillId ') > -1)
      typeId = String.fromCharCode(7);

    // Trait ids
    if((' ' + spans[i].className + ' ').indexOf(' traitId ') > -1)
      typeId = String.fromCharCode(8);

    // Recipe ids
    if((' ' + spans[i].className + ' ').indexOf(' recipeId ') > -1)
      typeId = String.fromCharCode(10);

    if(typeId !== '0') {

      var id = BEtoLE(String.fromCharCode(parseInt(spans[i].innerHTML)));

      var chatLink = "[&" + Base64.encode(typeId + id + pad) + "]";

      // Replace the game ID with the generated game link
      spans[i].innerHTML = chatLink;

      // Create an input element with the same content
      var a = document.createElement('input');
      a.type = 'text';
      a.value = chatLink;

      // Make it overlay the plaintext, but hidden by default
      a.className        = 'chatlink';
      a.style.position   = 'absolute';
      a.style.marginTop  = '-2px';
      a.style.marginLeft = '-2px';
      a.style.display    = 'none';
      
      spans[i].parentNode.insertBefore(a,spans[i]);

      // Event handlers to make the input box appear (and focus it and select the contents) when the plaintext is clicked...
      spans[i].onclick = focusGameLink;

      // ...and to hide the input box when the user clicks away from it.
      a.onblur = blurGameLink;

    }
  }
}

// A simpler function for direct-writing the game link during document load, used in Widget:Game_link
function encodeId(type, id)
{
  if (type.match(/(1|2|4|7|8|10)/)) {
    
    var typeId = String.fromCharCode(type);
  
    if (type == 2)
      typeId += String.fromCharCode(1);

    id = BEtoLE(String.fromCharCode(parseInt(id)));

    var pad = String.fromCharCode(0) + String.fromCharCode(0);
    
    var chatLink = "[&" + Base64.encode(typeId + id + pad) + "]";

    // Create an input element with the same content
    var a = '<input class="chatLink" style="position:absolute;margin-top:-2px;margin-left:-2px;display:none;" type="text" value="' + chatLink + '" />';

    document.write(a);
    
    var b = '<span class="chatLink" onclick="focusGameLink();" onblur="blurGameLink();">' + chatLink + '</span>';
    
    document.write(b);

  } else {
    document.write('Error: unknown game link type: ' + type);
  }
}