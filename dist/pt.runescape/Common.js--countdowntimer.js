// **************************************************
// Experimental javascript countdown timer (Splarka)
// Versão 0.0.3
// **************************************************
//
// Exemplo:
// <span class="countdown" style="display:none;">
// Apenas <span class="countdowndate">January 01 2012 00:00 PST</span> até o Ano Novo.
// </span>
// <span class="nocountdown">JavaScript desabilitado.</span>
//
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduz o módulo do período, se necessário
  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }
 
  // determina se já passaram ou se ainda faltam mais x dias
  if(diff<0) {
    diff = -diff;
    var tpm = 'passaram ';
  } else {
    var tpm = 'mais ';
  }
 
  // calcala a diferença
  var left = '';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas e ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' dias, ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // um setInterval() é mais eficiente, mas o chamado de setTimeout()
  // cria erros e para o script
  timeouts[i] = setTimeout('updatetimer(' + i + ')', 60000);
}
 
function checktimers() {
  //esconde o 'nocountdown' e mostra o 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //coloca os objetos globais: timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array(); // um holder genérico para os timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    var str = timers[i].firstChild.nodeValue;
    var j = str.indexOf('|');
    if(j == -1) timers[i].period = 0; else {
      timers[i].period = parseInt(str.substr(0, j));
      if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
      str = str.substr(j + 1);
    }
    timers[i].eventdate = new Date(str);
    updatetimer(i);  //inicia o script
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - fim -  Experimental javascript countdown timer
// **************************************************