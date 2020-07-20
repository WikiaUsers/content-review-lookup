//Botonera//
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/papermario/es/images/1/1f/TOC_Derecha_button.png",
     "speedTip": "Poner TOC en la derecha",
     "tagOpen": "{{TOC Derecha",
     "tagClose": "}}",
     "sampleText": "Example"};
}


// Autor: Jesús Martínez Novo (Ciencia Al Poder)
// Licencia/License: http://www.gnu.org/copyleft/gpl.html GNU General Public Licence 2.0 or later
// Para agregar conjuntos de caracteres especiales, agregar nuevos identificadores a charInsert.groups como elementos de arrays. Si el elemento es otro array, será un "elemento doble"
// ejemplo: charInsert.groups["Nombre del grupo"] = ['a','b','c', ['d','e'], ['f','g'] ];
// Para deshabilitar cookie al cambiar grupo de caracteres:
// charInsert.disableCookie = true;

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
      //<pre>
      {{MediaWiki:Common.js/Clases/UtilityTools.js}}
      var $UT = UtilityTools;
      if (!window.$G){
              window.$G = $UT.get;
      }
      // Datos para scripts que se cargan de forma as�ncrona:
      var postloadFunctionData = {
              'charinsert': {
                      "MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categor�a:',']]'], ['#REDIRECCI�N [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['<gallery>','</gallery>'], ['<tt>','</tt>'], '\x7B{PAGENAME}}', ['\x7B{subst:t|','}}'] ],
                      "Japon�s - Katakana": ['&#12450;','&#12449;','&#12452;','&#12451;','&#12454;','&#12532;','&#12453;','&#12456;','&#12455;','&#12458;','&#12457;','&#12459;','&#12460;','&#12461;','&#12462;','&#12463;','&#12464;','&#12465;','&#12466;','&#12467;','&#12468;','&#12469;','&#12470;','&#12471;','&#12472;','&#12473;','&#12474;','&#12475;','&#12476;','&#12477;','&#12478;','&#12479;','&#12480;','&#12481;','&#12482;','&#12484;','&#12485;','&#12483;','&#12486;','&#12487;','&#12488;','&#12489;','&#12490;','&#12491;','&#12492;','&#12493;','&#12494;','&#12495;','&#12496;','&#12497;','&#12498;','&#12499;','&#12500;','&#12501;','&#12502;','&#12503;','&#12504;','&#12505;','&#12506;','&#12507;','&#12508;','&#12509;','&#12510;','&#12511;','&#12512;','&#12513;','&#12514;','&#12516;','&#12515;','&#12518;','&#12517;','&#12520;','&#12519;','&#12521;','&#12522;','&#12523;','&#12524;','&#12525;','&#12527;','&#12535;','&#12528;','&#12536;','&#12529;','&#12537;','&#12530;','&#12538;','&#12531;','&#12289;','&#12290;',['&#12300;','&#12301;'],['&#12302;','&#12303;'],'&#12445;','&#12446;','&#12293;','&#12541;','&#12542;'],
                      "Japon�s - R\u014Dmaji": ['&#256;','&#257;','&#274;','&#275;','&#298;','&#299;','&#332;','&#333;','&#362;','&#363;'],
                      "Alfabeto fon�tico": ['&#616;','&#649;','&#623;','&#618;','&#655;','&#650;','�','&#600;','&#629;','&#612;','&#601;','&#603;','�','&#604;','&#606;','&#652;','&#596;','�','&#592;','&#630;','&#593;','&#594;','&#602;','&#605;','&#688;','&#689;','&#690;','&#692;','&#695;','&#734;','&#736;','&#740;','&#700;','&#712;','&#716;','&#720;','&#721;','.','&#648;','&#598;','&#607;','&#610;','&#660;','&#625;','&#627;','&#626;','&#331;','&#628;','&#665;','&#640;','&#638;','&#637;','&#632;','&#946;','&#952;','�','&#643;','&#658;','&#642;','&#656;','&#669;','&#611;','&#967;','&#641;','&#295;','&#661;','&#614;','&#620;','&#622;','&#651;','&#633;','&#635;','&#624;','&#621;','&#654;','&#671;','&#653;','&#613;','&#668;','&#674;','&#673;','&#597;','&#657;','&#634;','&#615;','&#609;','&#619;'],
              }
      };
      $(function() {
              if ($UT.get('editform') || $UT.get('mw-upload-form')){
                      importScript('MediaWiki:Common.js/Clases/CharInsert.js');
     }
      });
      //</pre>