/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

/*Consente di creare dei messaggi della pagina personalizzati (Importato da Nonciclopedia)*/
var disablealertLoad = 0;
 function alertLoad() {
  if (disablealertLoad) return;
  for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
   if(Elem.getAttribute('id') == "alert-load") {
    var Testo = Elem.innerText || Elem.textContent;
    alert(Testo);
   }
  }
 }

addOnloadHook(alertLoad);

/*Consente di utilizzare il Template Username*/
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/*Utilizzo dello Script "UserTags"*/
window.UserTagsJS = {
	modules: {},
	tags: {
	    absent: { u:'Assente', order:1/0, title:'Questo utente è momentaneamente assente e questa targhetta è stata aggiunta al suo profilo per sottolineare il fatto che non è ancora del tutto inattivo' },
		'content-moderator': { u:'Moderatore dei Contenuti' },
		emerito: { u:'Utente Emerito', title:'Questo utente ha svolto grandi lavori e compiuto alcune imprese nella Wiki, allo scopo di migliorarla. Questo titolo gli viene offerto come ringraziamento' },
		founder: { u:'Fondatore', order:-1/0 },
	}
};

//Utenti
UserTagsJS.modules.custom = {
	'Emanuele89': ['emerito'],
	'Tda': ['founder'],
};

//Gruppi MediaWiki
UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'rollback', 'content-moderator'];

//Filtro Meta
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat', 'bot'],
	'inactive': ['emerito', 'bot', 'absent', 'helper', 'staff', 'vstf'],
};

//Utenti Inattivi
UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: false
};

/*Aggiunge due pulsanti al Pannello Admin (riadattato da AdminDashboard JS-Button)*/
if (wgCanonicalSpecialPageName == 'AdminDashboard') { 
    $('section.wiki ul.controls').append('<li class="control" data-tooltip="Personalizza la tua wiki con il Javascript locale."><a href="/wiki/MediaWiki:Common.js?action=edit" class="set"><span class="representation"><div style="background: #0c77b6; top: 13px; width: 34px; position: absolute; height: 22px; left: 8px; border-radius: 3px"><span style="color: white; top: 25%; position: absolute; left: 25%">JS_</span></div></span>JS</a></li>');
    $('section.wiki ul.controls').append('<li class="control" data-tooltip="Gestisci il Filtro Anti-Abusi."><a href="/wiki/Speciale:FiltroAntiAbusi" class="set" style="text-decoration: none"><span class="representation"><div style="background: #000066; width: 34px; height: 24px; border-radius: 3px; padding: 2px"><span style="color: white; text-align:center; vertical-align:center; text-size:10px">AbuseFilter</span></div></span>Filtro<br>Anti-Abusi</a></li>');
}

/*Aggiunge una sezione di navigazione nell'editor delle pagine CSS*/
$(function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgTitle',
        'wgAction'
    ]);

    if ((config.wgNamespaceNumber != 8) || (config.wgAction != 'edit')) {
    return;
    }

    function button(x) {
        return '<a class="wikia-menu-button secondary cssNavButton" title="' + x + '" href="/wiki/MediaWiki:' + x + '?action=edit">' + x + '</a>';
    }

    function buttonList() {
        switch(config.wgTitle) {
            case 'Common.css': return button('Wikia.css') + button('Styles.css');
            case 'Wikia.css': return button('Common.css') + button('Styles.css');
            case 'Styles.css': return button('Common.css') + button('Wikia.css');
        }
    }

    $('div.module_content').append('<div class="cssNavHeader">Navigazione</div>' + buttonList());
});