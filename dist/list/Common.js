/* Any JavaScript here will be loaded for all users on every page load. */
addOnloadHook(function () { 
var t = document.getElementById('t-whatlinkshere');
if (!t) return;
var li = document.createElement('li');
var a = document.createElement('a');
a.setAttribute('href', 'http://list.wikia.com/wiki/Special:Import');
a.appendChild(document.createTextNode('Import page'));
li.appendChild(a);
t.parentNode.appendChild(li);
});