var importScript = document.createElement('script');
var importScriptB = document.createElement('script');
importScript.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
importScriptB.src = '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js';
document.body.appendChild(importScript);
document.body.appendChild(importScriptB);

var intervalhandle = setInterval(reload, 2000)
function reload() {
$('#accordion').accordion({ 
    collapsible: true, 
    autoHeight: false, 
    active: false 
});
clearInterval(intervalhandle);
}