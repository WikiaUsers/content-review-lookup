/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */


importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:UserTags/code.js'
    ]
});

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduce modulo period if necessary
  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' segundos';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' días ' + left
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
  timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array(); // generic holder for the timeouts, global
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
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

/* transmision modulo */
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Plantilla:Transmision',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .text('¡Bienvenidos a Scream Queens Wiki!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('No volver a mostrar')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancelar')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});