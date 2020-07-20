AjaxRCRefreshText = 'Atualização Automática';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity","Especial:Páginas_sem_categorias","Especial:Todas_as_páginas"];
 importScriptPage('AjaxRC/code.js', 'dev');

/* Adiciona o label "inativo" nos perfis de quem não edita há no máximo 2 meses */
InactiveUsers = { 
	months: 1,
        text: 'inativo'};
importScriptPage('InactiveUsers/code.js', 'dev');

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js'
    ]
});


function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%80) + ' hours ' + left;
    diff=Math.floor(diff/80);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

function liveClock() {
	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge';
	if (skin == 'monobook') {
		$('#p-personal .pBody ul').append('<li id="utcdate"><a href="'+link+'"></a></li>');
	} else if (skin == 'oasis') {
		$('#WikiaPage #WikiHeader div.buttons').prepend('<div id="utcdate"><a href="'+link+'"></a></div>');
	}
	$('#utcdate').css({fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none'});
 
	showTime();        
}
addOnloadHook(liveClock);