articles = [
        'w:c:boombeach:MediaWiki:Common.js/calc.js',
        'w:c:de.boombeach:MediaWiki:Common.js/CalcForms.js'
    ];
 
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
window.UserTagsJS = {
	modules: {},
	tags: {
        'vstf': { u: 'VSTF', link:'Hilfe:VSTF',},
        'bot': { u: 'Bot-Konto', link:'Hilfe:Bots',},
        'bannedfromchat': { u: 'Aus dem Chat verbannt',},
        'founder': { u: 'Gründer', link:'Hilfe:Gründer',},
        'bureaucrat': { 
            u: 'Bürokrat',
            m: 'Bürokrat',
            f: 'Bürokratin',
            order: 1, 
            link:'Boom Beach Wiki:Bürokraten'
        },
        'sysop': { 
            u: 'Administrator',
            m: 'Administrator',
            f: 'Administratorin',
            order: 2,
            link:'Hilfe:Administratoren'
        },
        'content-moderator': { 
            u: 'Wiki-Moderator',
            m: 'Wiki-Moderator',
            f: 'Wiki-Moderatorin',
            order: 2,
            link:'Hilfe:Moderatoren#Inhalts-Moderatoren'
        },
        'threadmoderator': { 
            u: 'Forum-Moderator',
            m: 'Forum-Moderator',
            f: 'Forum-Moderatorin',
            order: 2,
            link:'Hilfe:Moderatoren#Diskussions-Moderatoren'
        },
        'rollback': { 
            u: 'Rollback-Benutzer',
            m: 'Rollback-Benutzer',
            f: 'Rollback-Benutzerin',
            order: 3,
            link:'Hilfe:Zurücksetzen'
        },
        'chatmoderator': { 
            u: 'Chat-Moderator',
            m: 'Chat-Moderator',
            f: 'Chat-Moderatorin',
            order: 4, 
            link:'Hilfe:Chat'
        }
    }
};
UserTagsJS.modules.mwGroups = [
   'chatmoderator',
   'content-moderator',
   'threadmoderator',
   'rollback',
   'sysop',
   'bannedfromchat',
   'bot',
   'bot-global',
   'vstf'
];

window.ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';

/* Nachrichten */
var messageWallUserTags = {
    'Brini': 'Administrator',
    'IchMachMucke': 'Administrator'
};

$(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span class="messageWallUserTags" style="padding:1px 5px;margin-left:1px;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
});

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
$(function replaceusername() {
    var spantags = document.getElementsByTagName("span");
    for (i=0; i<spantags.length; i++) {
        if (spantags[i].className=="insertusername") {
            if (wgUserName==null) {
                spantags[i].innerHTML="Beacher";
            } else {
                spantags[i].innerHTML=wgUserName;
            }
        }
    }
});

var TogglerAktiv=1;
 
function Toggler(ToggleID) {
  if (ToggleID) TogglerAktiv = ToggleID;
  var TogglerSPAN = document.getElementById("WikiaArticle").getElementsByTagName('span');
  for (i=0; i<TogglerSPAN.length; i++) {
    // Nach SPAN-Togglern suchen (das sind die, die alles steuern)
    if (TogglerSPAN[i].className.search("Toggler") >= 0) {
      // Jetzt wird geguckt, ob der vorliegende Toggler der aktive Toggler ist
      // Damit wird verhindert, dass zufällig 2 Toggler aktiv sind. (Der letzte ist der dominante)
      if (TogglerSPAN[i].getAttribute('data-Toggle') == TogglerAktiv) 
        TogglerSPAN[i].className="Toggler aktiv";
      else
        TogglerSPAN[i].className="Toggler";
    }
  }
  var TogglerDIV = document.getElementById("WikiaArticle").getElementsByTagName('div');
  for (i=0; i<TogglerDIV.length; i++) {
    // Nach DIV-Togglern suchen (das sind die, die versteckt / gezeigt werden)
    if (TogglerDIV[i].getAttribute('data-Toggle')) {
      // Wenn TogglerDIV-ID mit der aktiven ID überein stimmt, wird es angezeigt, sonst nicht
      if (TogglerDIV[i].getAttribute('data-Toggle') == TogglerAktiv) 
        TogglerDIV[i].style.display='';
      else
        TogglerDIV[i].style.display='none';
    }
  }
  return true;
}
 
//onclick-Funktion für SPAN-Toggler setzen (damit wird es gangbar gemacht)
var TogglerObjekt = document.getElementById("WikiaArticle").getElementsByTagName('span');
for (i=0; i<TogglerObjekt.length; i++) {
  // Nach SPAN-Togglern suchen (das sind die, die alles steuern)
  if (TogglerObjekt[i].className.search("Toggler") >= 0) {
    TogglerObjekt[i].onclick = function(){ Toggler(this.getAttribute('data-Toggle')) };
    // Wenn dieser Toggler als "aktiv" markiert ist, dann wird dies in der Variable gespeichert.
    // (Es kann nur einen aktiven Toggler geben)
    if (TogglerObjekt[i].className.search("aktiv") >= 0) 
      TogglerAktiv = TogglerObjekt[i].getAttribute('data-Toggle');
  }
}
// Erster Funktionsaufruf, damit nach Laden der Seite die entsprechenden Toggler versteckt sind
Toggler();

// Fügt eine mache einen Account Notiz hinzu, wenn der Leser nicht registriert ist
$(window).load(function() {
    if (wgUserName === null) {
        $('section#WikiaRecentActivity').before('<section class="module" id="sidebarReaderNotice"><h2>Hey, Leser!</h2><p>Magst du das Wiki und hasst aber Werbung? <a href="http://de.boombeach.wikia.com/wiki/Special:UserSignup">Account erstellen</a> es ist schnell und einfach, und es entfernt Werbung im gesamten Wikia!</p></section>');
    }
});


/**************** Functions for calculators ****************/

/* Use this function to round a number or result of an equation to a 
certain digit. */
function roundNum(digit, num) {
    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
}
 
/* Use this function to find the sum of two values. It is used in 
the function, arrayAverage, below. */
function addNums(addValueA, addValueB) {
    return addValueA + addValueB;
}
 
/* Use this function to find the average of the numbers in an array. */
function arrayAverage(array) {
    return array.reduce(addNums, 0) / array.length;
}
 
// Find the max level of a troop
function findMaxTroopLevel(unit) {
    var troopIdArray = ["Rifleman", "Heavy", "Zooka", "Warrior", "Tank", "Medic", "Grenadier", "Scorcher"];
    var maxTroopLevelArray = [22, 22, 21, 20, 17, 13, 12, 9];
    return maxTroopLevelArray[troopIdArray.indexOf(unit)];
}
 
// Find the size of a troop
function findTroopSize(unit) {
    var troopIdArray = ["Rifleman", "Heavy", "Zooka", "Warrior", "Tank", "Medic", "Grenadier", "Scorcher"];
    var troopSizeArray = [1, 4, 2, 3, 8, 5, 6, 21];
    return troopSizeArray[troopIdArray.indexOf(unit)];
}
 
// Find the max level of a building
function findMaxBuildingLevel(unit) {
    var buildingIdArray = ["Headquarters", "Outpost", "Power Core", "Sniper Tower", "Machine Gun", "Mortar", "Cannon", "Flamethrower", "Boom Cannon", "Rocket Launcher", "Shock Launcher", "MMG 9000", "Super Mortar 3000", "Lazor Beam", "Doom Cannon", "Shock Blaster", "Damage Amplifier", "Shield Generator"];
    var maxBuildingLevelArray = [22, 22, 1, 22, 22, 22, 22, 19, 16, 14, 10, 5, 4, 3, 3, 3, 3, 3];
    return maxBuildingLevelArray[buildingIdArray.indexOf(unit)];
}