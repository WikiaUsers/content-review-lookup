// Autor: Jesús Martínez Novo (Ciencia Al Poder)
// Licencia/License: http://www.gnu.org/copyleft/gpl.html GNU General Public Licence 2.0 or later
// Para agregar conjuntos de caracteres especiales, agregar nuevos identificadores a charInsert.groups como elementos de arrays. Si el elemento es otro array, será un "elemento doble"
// ejemplo: charInsert.groups["Nombre del grupo"] = ['a','b','c', ['d','e'], ['f','g'] ];
// Para deshabilitar cookie al cambiar grupo de caracteres:
// charInsert.disableCookie = true;

charInsert.groups["MediaWiki"] = [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], '\x7B{PAGENAME}}', '\x7B{SITENAME}}'];
charInsert.groups["HTML"] = [ ['<span class="plainlinks">','</span>'], ['<blockquote>','</blockquote>'], ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['<code>','</code>'], ['<ref>','</ref>'], '<references />'];

charInsert.version = '1.1';

charInsert.bindId = 'charinsert-blocks'; // ID del elemento donde se insertará la utilidad. Cambiar si es necesario

charInsert.activaCaracteresEspeciales = function (){
  if (!document.createTextNode)
    return; // No es DOM compatible
  var divSC = document.getElementById(charInsert.bindId);
  if (!divSC) return;
  // 1. Añadimos una caja de selección segn los conjuntos de caracteres que hay
  var select = document.createElement('select');
  select.id = 'chargroup-select';
  // 1.1 Conjuntos de caracteres que ya haya en el código
  var listaCharGrp = divSC.getElementsByTagName('div');
  for (var i = 0; i < listaCharGrp.length; i++){
    var p = listaCharGrp[i];
    if ((' chargroup ').indexOf(' '+p.className+' ') != -1){
      var option = document.createElement('option');
      option.value = p.title;
      option.groupRef = p;
      option.appendChild(document.createTextNode(p.title));
      select.appendChild(option);
      p.title = ''; // Borramos el título para que no aparezca al pasar el mouse por encima
      // IE Fix: la selección actual en el textarea se pierde si se hace clic en un elemento que no sea un 'a' o un elemento de formulario ('input', etc)
      if (document.selection  && !is_gecko){
        var el = p.firstChild;
        if (el) {
          do {
            if (el.nodeType == 1 && el.tagName.toLowerCase() == 'span') {
              var inel = el.firstChild;
              if (!inel) continue;
              var a = document.createElement('a');
              a.href = '#';
              do {
                var refinel = inel;
                inel = inel.nextSibling
                a.appendChild(refinel);
              } while (inel);
              el.appendChild(a);
            }
          } while (el = el.nextSibling);
        }
      }
      // Fin IE Fix
    }
  }
  // 1.2 Conjuntos de caracteres definidos en charInsert.groups (custom)
  if (typeof charInsert.groups == typeof {}){
    for (grupo in charInsert.groups){
      var option = document.createElement('option');
      option.value = grupo;
      option.groupRef = null;
      option.groupArray = charInsert.groups[grupo];
      option.appendChild(document.createTextNode(grupo));
      select.appendChild(option);
    }
  }

  if (select.options.length > 1){
    divSC.insertBefore(select, divSC.firstChild);
    // 2. Capturamos el evento de cambio
    charInsert.addEvent(select, 'change', charInsert.eSelectChanged);
    // 3. Seleccionamos grupo por defecto
    var selectedGrp = select.options[0].value;
    if (charInsert.disableCookie == undefined || charInsert.disableCookie != true){
      var cookie = document.cookie;
      var cookiePos = cookie.indexOf('chargroup=');
      if (cookiePos > -1) {
        cookiePos += 10;
        var endPos = cookie.substring(cookiePos,cookie.length).indexOf(';');
        if (endPos == -1)
          endPos = cookie.length;
        selectedGrp = decodeURIComponent(document.cookie.substr(cookiePos,endPos));
      }
    }
    select.value = selectedGrp;
    charInsert.selectChargroup(select.options[select.selectedIndex]);
  }else{
    delete select;
  }

  // 4. Asignamos un evento para todo el area
  charInsert.addEvent(divSC, 'click', charInsert.specialCharClick);
};

charInsert.eSelectChanged = function(event){
  var targetElement = charInsert.eventTargetElement(event);
  charInsert.selectChargroup(targetElement.options[targetElement.selectedIndex]);
  if (charInsert.disableCookie == undefined || charInsert.disableCookie != true)
    document.cookie = 'chargroup='+encodeURIComponent(targetElement.options[targetElement.selectedIndex].value);
};

charInsert.selectChargroup = function(item){
  var divSC = document.getElementById(charInsert.bindId);
  if (!divSC) return;

  var listaCharGrp = divSC.getElementsByTagName('div');
  for (var i = 0; i < listaCharGrp.length; i++){
    var p = listaCharGrp[i];
    if ((' '+p.className+' ').indexOf(' chargroup ') != -1){
      if ((p.isSameNode && p.isSameNode(item.groupRef)) || p == item.groupRef){ //DOM || IE
        p.style.display = 'inline';
      }else{
        p.style.display = 'none';
      }
    }
  }
  if (!item.groupRef && item.groupArray){
    var p = charInsert.addGroup(item.groupArray);
    item.groupRef = p;
    p.style.display = 'inline';
  }
};

charInsert.addGroup = function(group){
  var divSC = document.getElementById(charInsert.bindId);
  if (!divSC) return;
  var bloque = document.createElement('div');
  bloque.className = 'chargroup';
  for (var i = 0; i < group.length; i++){
    // IE Patch
    if (document.selection  && !is_gecko){
      var car = document.createElement('a');
      car.href = "#";
    } else // END IE Patch
      var car = document.createElement('span');
    if (typeof group[i] == typeof ''){
      car.appendChild(document.createTextNode(group[i]));
    }else if(typeof group[i] == typeof [] && group[i].length == 2){
      var c1 = document.createElement('span');
      c1.appendChild(document.createTextNode(group[i][0]));
      car.appendChild(c1);
      var c2 = document.createElement('span');
      c2.appendChild(document.createTextNode(group[i][1]));
      car.appendChild(c2);
    }
    // IE Patch
    if (document.selection  && !is_gecko){
      var ospan = document.createElement('span');
      ospan.appendChild(car);
      bloque.appendChild(ospan);
    } else // END IE Patch
      bloque.appendChild(car);
    bloque.appendChild(document.createTextNode(' '));
  }
  divSC.appendChild(bloque);
  return bloque;
};

charInsert.specialCharClick = function(event){
  var charEl = charInsert.eventTargetElement(event);
  // Obtenemos el span más externo posible, pero que descienda directamente del div de class 'chargroup'
  // Si lo capta un textNode (no debería), buscamos su span.
  if (charEl.nodeType == 3){ // text node.
    if (charEl.parentNode.nodeType == 1 && charEl.parentNode.tagName.toLowerCase() == 'span')
      charEl = charEl.parentNode;
    else
      return;
  }
  // For IE patch
  if (charEl.parentNode.tagName.toLowerCase() == 'a')
    charEl = charEl.parentNode;
  if (charEl.tagName.toLowerCase() == 'a'){
    charEl = charEl.parentNode;
    event.returnValue = false;
  }
  // End IE
  if (charEl.nodeType != 1 || charEl.tagName.toLowerCase() != 'span')
    return;

  if ((' '+charEl.parentNode.className+' ').indexOf(' chargroup ') == -1){ // span interno?
    if ((' '+charEl.parentNode.parentNode.className+' ').indexOf(' chargroup ') == -1)
      return;
    else
      charEl = charEl.parentNode;
  }

  var spans = charEl.getElementsByTagName('span');
  if (spans.length < 2)
    insertTags(charInsert.getElementText(charEl), '', '');
  else
    insertTags(charInsert.getElementText(spans[0]), charInsert.getElementText(spans[1]), '');
};

charInsert.getElementText = function(element){
  if (element.textContent)
    return element.textContent;
  else if (element.innerText)
    return element.innerText;
};

charInsert.eventTargetElement = function(event){
  if (event.target)
    return event.target;
  else if(event.srcElement) //IE
    return event.srcElement;
  else // ??
    return null;
}

charInsert.addEvent = function(element, hookName, hookFunct) {
  if (element.addEventListener)
    element.addEventListener(hookName, hookFunct, false);
  else if (element.attachEvent)
    element.attachEvent('on' + hookName, hookFunct);
}