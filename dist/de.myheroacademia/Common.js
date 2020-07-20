/* Anpassungen für AjaxRC */
window.ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
        'klasse1a': {
            u: 'Klasse 1-A',
            order: 1e101,
            link:'My Hero Academia Wiki:Teams#Team:_Klasse_1-A'
        },
        'ligaderboesen': { 
            u: 'Liga der Bösen',
            order: 1e101,
            link:'My Hero Academia Wiki:Teams#Team:_Liga_der_B.C3.B6sen'
        },
        'oneforall': { 
            u: 'One For All',
            order: 1e101,
            link:'My Hero Academia Wiki:Teams#Team:_One_For_All'
        },
        'sysop': {
            u: 'Profiheld',
            f: 'Profiheldin',
            link:'My Hero Academia Wiki:Administratoren'
        },
        'content-moderator': {
            u: 'Sidekick'
        }
    }
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'threadmoderator',
    'content-moderator',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'vanguard',
    'vstf',
    'wiki-manager',
    'content-team-member',
    'global-discussions-moderator',
    'staff'
];

UserTagsJS.modules.custom = {
	'RainA': ['klasse1a'],
	'DarkBarbarian': ['ligaderboesen']
};

UserTagsJS.modules.metafilter = {
	'bureaucrat': ['sysop'],
	'chatmoderator': ['sysop'],
	'content-moderator': ['sysop'],
	'threadmoderator': ['sysop'],
	'content-volunteer': ['vanguard','global-discussions-moderator','vstf','helper','wiki-manager','content-team-member'],
	'vanguard': ['global-discussions-moderator','vstf','helper','wiki-manager','content-team-member'],
	'global-discussions-moderator': ['vstf','helper','wiki-manager','content-team-member']
};

UserTagsJS.modules.userfilter = {
    'RainA': ['vstf']
};

// Entferne auf [[Spezial:Hochladen]] „keine Vorauswahl“
 function remove_no_license_special_upload() {
   if (wgPageName != "Spezial:Hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
addOnloadHook(remove_no_license_special_upload);
 
// Entferne auf [[Spezial:Mehrere_Dateien_hochladen]] „keine Vorauswahl“
 function remove_no_license_special_multipleupload() {
   if (wgPageName != "Spezial:Mehrere_Dateien_hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
 addOnloadHook(remove_no_license_special_multipleupload);