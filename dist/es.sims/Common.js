/* AjaxPages */

ajaxPages = ["Especial:CambiosRecientes","Especial:Seguimiento","Especial:Registro","Especial:Contribuciones","Especial:WikiActivity"]; AjaxRCRefreshText = 'Auto-actualizar'; AjaxRCRefreshHoverText = 'Automáticamente refresca la página'; importScriptPage('AjaxRC/code.js', 'dev');

/* Cuenta Regresiva */

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = 'T plus ';
    } else {
        var tpm = '';
    }
 
    // calcuate the diff
    var left = (diff % 60) + ' segundos';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutos ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' horas ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' días ' + left
    var diffing = count = Math.floor((then.getTime() - now.getTime()) / 1000);
    if (diffing < 0) {
        timers[i].firstChild.nodeValue = 'Timer has expired';
    } else {
        timers[i].firstChild.nodeValue = tpm + left;
    }
 
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// UserTags
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});