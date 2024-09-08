/*Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página.*/
/*Importaciones de Wikia Developers*/
/**Configuración para resúmenes de edición predefinidos**/
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#stdSummaries { width: 264px }',
    select: 'MediaWiki:Standard Edit Summary'
};
/**Códigos**/
importArticles({
  type: 'script',
  articles: [
/***Resúmenes de edición predefinidos***/
    'u:dev:Standard_Edit_Summary/code.js',
/***Botón para editar la bienvenida del muro***/
    'u:dev:WallGreetingButton/code.js',
/***Ventanas emergentes de referencias***/
    'u:dev:ReferencePopups/code.js',
/***Generación de enlaces para encabezados**/
    'u:dev:HeaderLinks/code.js',
/***Botón de suscripción para canal de YouTube***/
    'u:dev:YouTubeButton/code.js',
/***Desactivar muro de mensajes para bots***/
    'u:dev:DisableBotMessageWalls/code.js'
  ]
});



/*Nombre de usuario, usado por Plantilla:NOMBREUSUARIO*/
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/*Contador regresivo/progresivo*/
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);

  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }

  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  var left = (diff%60) + ' segundos';
  diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos ' + left;
  diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas ' + left;
  diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' días ' + left
    timers[i].firstChild.nodeValue = tpm + left;
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
    timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array();
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
    updatetimer(i);
  }
}

addOnloadHook(checktimers);