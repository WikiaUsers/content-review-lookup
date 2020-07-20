var WikiaNotificationMessage = "<a href='/wiki/Usuario_Blog:Csuarezllosa/El_Portal_de_Escritores_del_mundo_Wiki_al_servicio_de_todos!!!'>¿Quieres ayudar a la wiki? ¡Lea este artículo para saber más!</a>";
var WikiaNotificationexpiry = 0;

window.MessageWallUserTags = {
    users: {
        'Csuarezllosa': 'Burocrata  • Administrador',
    }
};

// Ultima edición - CONFIGURACIÓN.
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    lang: 'es',
};

// Actividad que se actualiza sola
AjaxRCRefreshText = 'Actividad automatizada';
AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:PáginasNuevas",
    "Especial:Seguimiento"
    "Special:Contributions",
    "Special:Log",
    "Special:Log/move",
    "Special:AbuseLog",
    "Special:NewFiles",
    "Special:NewPages",
    "Special:Watchlist",
    "Special:Statistics",
    "Special:ListFiles",
];


// Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Inactivo' };

 UserTagsJS.modules.inactive = {
     days: 30,
     // namespaces: [0, 'Talk', 'User', 'User talk', 'Forum'], // Only articles, talk pages, user pages, user talk pages or forums edits count, other Wikia namespace edits don't count
     zeroIsInactive: true // 0 edits = inactive
 };
 UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');
 UserTagsJS.modules.autoconfirmed = true; // Switch on Autoconfirmed User check
 UserTagsJS.modules.newuser = {
     computation: function(days, edits) {
         // If the expression is true then they will be marked as a new user
         // If the expression is false then they won't.
         // In this instance, newuser is removed as soon as the user gets 30 edits, OR as soon as they have been present for 10 days, whichever happens first.
         return days < 10 && edits < 30;
     }
 };
 
 UserTagsJS.modules.metafilter = {
     'inactive': ['sysop', 'bureaucrat', 'bot', 'bot-global', 'staff', 'util', 'vstf'], // Remove inactive from all bureaucrats, sysops, bots, global bots, staff, wikia utility and vstf
     'sysop': ['bot', 'bot-global'], // Remove "Administrator" tag from bots and global bots
     'content-moderator': ['bureaucrat', 'sysop'], // Remove "Content Moderator" tag from bureaucrats and administrators
     'threadmoderator': ['bureaucrat', 'sysop'], // Remove "Discussions Moderator" tag from bureaucrats and administrators
     'chatmoderator': ['bureaucrat', 'sysop'], // Remove "Chat Moderator" tag from bureaucrats and administrators
     'rollback': ['bureaucrat', 'sysop'] // Remove "Rollback" tag from bureaucrats and administrators
 };


// Referencias en globos
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Este foro se considera archivado ya que no se ha respondido en <expiryDays> días.",
};

// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
    'summary': 'mantenimiento',
    'label': 'mantenimiento'
};
fdButtons[fdButtons.length] = {
    'summary': '[[Ayuda:Vandalismo|vandalismo]]',
    'label': 'vandalismo'
};
fdButtons[fdButtons.length] = {
    'summary': '[[Ayuda:Spam|spam]]',
    'label': 'spam'
};
fdButtons[fdButtons.length] = {
    'summary': '[[Escritores del mundo Wikia:Políticas|Políticas]]',
    'label': 'Incump. artículos'
};
fdButtons[fdButtons.length] = {
    'summary': 'A petición del mismo autor',
    'label': 'a petición'
};
fdButtons[fdButtons.length] = {
    'summary': 'Duplicado',
    'label': 'duplicado'
};
fdButtons[fdButtons.length] = {
    'summary': 'Irrelevante/Innecesario',
    'label': 'irrelevante'
};
 
// NOMBREUSUARIO
 
$(function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
});

// 7. Botones extras
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Insertar plantilla",
        "tagOpen": "\{\{",
        "tagClose": "\}\}",
        "sampleText": "Plantilla"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
        "speedTip": "Proponer el artículo para ser borrado",
        "tagOpen": "\{\{borrar|",
        "tagClose": "\}\}",
        "sampleText": "Motivo"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_user.png",
        "speedTip": "Usuario",
        "tagOpen": "\{\{usuario|",
        "tagClose": "\}\}",
        "sampleText": "nombre"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
        "speedTip": "Artículo existente en Wikipedia",
        "tagOpen": "\{\{WP|",
        "tagClose": "\}\}",
        "sampleText": "artículo"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
        "speedTip": "Marcar el artículo en construcción",
        "tagOpen": "\{\{Construccion|Usuario:",
        "tagClose": "\}\}",
        "sampleText": "tu nombre de usuario"
    };
 
}

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/DupImageList.js',
        'MediaWiki:Parallax.js',
        
        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:FastDelete/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:VisualSpellCheck/code.js',
        'u:dev:WikiaNotification/code.js',

        'u:es.pokemon:MediaWiki:Common.js/Clases/PlantillaPlegable.js',
    ]
});

 /* **************************************************
  * Experimental javascript countdown timer (Splarka)
  * Version 0.0.3
  *
  * Usage example:
  *  <span class="countdown" style="display:none;">
  *  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
  *  </span>
  *  <span class="nocountdown">Javascript disabled.</span>
  *
  * If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
  */
 
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
 	if(diff > 0) left = diff + ' días ' + left;
 	timers[i].firstChild.nodeValue = tpm + left;
 	
 	// a setInterval() is more efficient, but calling setTimeout()
 	// makes errors break the script rather than infinitely recurse
 	timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 };
 
 function checktimers() {
 	//hide 'nocountdown' and show 'countdown'
 	var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
 	for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
 	var countdowns = getElementsByClassName(document, 'span', 'countdown');
 	for(var i in countdowns) countdowns[i].style.display = 'inline';
 	
 	//set up global objects timers and timeouts.
 	timers = getElementsByClassName(document, 'span', 'countdowndate');
 	timeouts = new Array(); // generic holder for the timeouts, global
 	if(timers.length == 0) return;
 	for(var i in timers) {
 		var str = timers[i].firstChild.nodeValue;
 		var j = str.indexOf('|');
 		if(j == -1) timers[i].period = 0;
 		else {
 			timers[i].period = parseInt(str.substr(0, j));
 			if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
 			str = str.substr(j + 1);
 		}
 		timers[i].eventdate = new Date(str);
 		updatetimer(i);  //start it up
 	}
 };
 
 addOnloadHook(checktimers);
 /* - end -  Experimental javascript countdown timer */