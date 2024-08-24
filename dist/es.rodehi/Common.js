/* Any JavaScript here will be loaded for all users on every page load. */

/* "Back to top" button
 * Obtained from Wikia Developers Wiki @ w:c:dev:BackToTopButton
 */
importScriptPage('MultiWordmark.js', 'es.rodehi');
importScriptPage('BackToTopButton/code.js', 'dev');
 
 
// Show username
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").text(mw.config.get('wgUserName'));
}
addOnloadHook(userNameReplace);
 
// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: { 
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        imagecontrol: {
    u: 'imagecontrol',
    link: 'Special:ListUsers/imagecontrol'
},
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};
 

// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: ['u:dev:ArchiveTool/code.js', 'u:dev:Countdown/code.js', 'u:dev:FloatingToc/code.js', 'u:dev:PurgeButton/code.js', 'u:dev:ReferencePopups/code.js', '', 'u:dev:SignatureCheck/code.js', 'u:dev:UserTags/code.js', 'u:dev:WallGreetingButton/code.js']
});
 
importScriptPage('AjaxRC/code.js', 'dev');
 

 
window.LockForums = {
    expiryDays: 15,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!",
    forumName: "Forum" 
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockForums/code.js"
    ]
});

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

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// 1. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

 
/* Show/Hide Config */
var ShowHideConfig = { 
    brackets: '[]'
};
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]
/* Fin */
 
 

importScriptPage('Countdown/code.js', 'dev');
 

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});


// BOTONES DE EDICIÓN PERSONALIZADOS
// Esto esta basado en el código original: Wikipedia:Tools/Editing tools

/* For greatest security, please make sure all images are hosted here on Fandom

 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirijir Articulo",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insertar texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/f/f0/BotonDegradado.png",
     "speedTip": "Insertar Degradado en Tablas",
     "tagOpen": " background:-moz-linear-gradient(top, COLOR ARRIBA 0%, COLOR ABAJO 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,COLOR ARRIBA), color-stop(100%,COLOR ABAJO)); ",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/0/0d/Box-shadow.png",
     "speedTip": "Insertar Sombra en Tablas",
     "tagOpen": "-moz-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA; -webkit-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA;",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/d/d3/En_construccion.png",
     "speedTip": "Advertir de que este articulo esta en contrucción",
     "tagOpen": "{{En construcción|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Texto Tachado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Texto a tachar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Subrayar",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Texto a Subrayar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
     "speedTip": "texto Grande",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Texto Grande"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/8/89/Letra_Peque%C3%B1a.png",
     "speedTip": "Texto Pequeño",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Texto Pequeño"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Centrar",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Centrar Texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Plantilla",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nombre de la Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020123837/central/images/c/ce/Button_no_include.png",
     "speedTip": "No Incluir",
     "tagOpen": "<noinclude>",
     "tagClose": "</noinclude>",
     "sampleText": "No Incluir"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Espacio en Fuente",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/3/31/Mensaje_oculto.png",
     "speedTip": "Insertar Comentario Oculto",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Comentario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"}; 
 
} 
*/ 

//emm el coso de los logos
/* Randomize wiki word-marks */
$(function() {
    var images = [
        'https://vignette.wikia.nocookie.net/lady-bug/images/e/ee/Ladybug_Logo.png/revision/latest?cb=20190524070545',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/12/Chat_Logo.png/revision/latest?cb=20190524070620',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/4a/Fox_Logo.png/revision/latest?cb=20190524072049',
        'https://vignette.wikia.nocookie.net/lady-bug/images/1/1a/Bee_Logo.png/revision/latest?cb=20190524154346',
        'https://vignette.wikia.nocookie.net/lady-bug/images/8/80/Turtle_Logo.png/revision/latest?cb=20190524154414',
        'https://vignette.wikia.nocookie.net/lady-bug/images/4/43/Butterfly_Logo.png/revision/latest?cb=20190524072147'
      ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});