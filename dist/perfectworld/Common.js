/* Any JavaScript here will be loaded for all users on every page load. */

/* misc */
function eventTargetElement(event){
  if (event.target)
    return event.target;
  else if(event.srcElement) //IE
    return event.srcElement;
  else // ??
    return null;
}

function addHookEvent(element, hookName, hookFunct) {
  if (element.addEventListener)
    element.addEventListener(hookName, hookFunct, false);
  else if (element.attachEvent)
    element.attachEvent('on' + hookName, hookFunct);
}

function parentElement(el, tagName){
  var parent = el.parentNode;
  if (parent.nodeName.toUpperCase() == tagName.toUpperCase())
    return parent;
  else if (parent.nodeName.toUpperCase() == 'HTML')
    return false;
  return this.parentElement(parent, tagName);
}

/*
== Acopla tablas ==

Para unir las filas en una sola tabla. [[MediaWiki:Mergetables.js]]
<pre> */

function acopla_tablas(){
  if (window.wgPageName){
    switch(window.wgPageName){
      case "NPC_List":
      case "Monster_List":
      case "Item_List":
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('defer', 'defer');
        script.setAttribute('src', '/index.php?title=MediaWiki:Mergetables.js&action=raw&ctype=text/javascript&usemsgcache=yes');
        document.getElementsByTagName('head').item(0).appendChild(script);
        break;
    }
  }
}

addOnloadHook(acopla_tablas);

/* </pre> */


/* 
== Image sorting == 

*/

window.ts_getInnerText = function(el){
  if (typeof el == "string") return el;
  if (typeof el == "undefined") return "";
  if (el.nodeType == 1 && el.getElementsByTagName('img').length == 0)
    if (el.textContent) return el.textContent; // DOM
    else if (el.innerText) return el.innerText; // IE
  var str = "";

  var cs = el.childNodes;
  for (var i = 0; i < cs.length; i++) {
    switch (cs[i].nodeType) {
      case 1: //ELEMENT_NODE
        if (cs[i].tagName.toLowerCase() == 'img')
          str += cs[i].alt;
        else
          str += ts_getInnerText(cs[i]);
        break;
      case 3: //TEXT_NODE
        str += cs[i].nodeValue;
        break;
    }
  }
  return str;
}