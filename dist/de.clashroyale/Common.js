window.UserTagsJS = {
	modules: {},
	tags: {
        'bureaucrat': { 
            u: 'Bürokrat',
            m: 'Bürokrat',
            f: 'Bürokratin',
            order: 1,
            link:'Administration'
        },
        'sysop': { 
            u: 'Administrator',
            m: 'Administrator',
            f: 'Administratorin',
            order: 2,
            link:'Administration'
        },
        'vstf': { u: 'VSTF', link:'Hilfe:VSTF',},
        'vanguard': { u: 'Vanguard', link:'Hilfe:Vanguard',},
        'global-discussions-moderator': { u: 'Globaler Diskussions-Moderator', link:'Hilfe:Globale Diskussions-Moderatoren',},
        'bot': { u: 'Bot-Konto', link:'Hilfe:Bots',},
        'council2': { u: 'Council', order: 3, link:'Hilfe:Council',},
        'semiaktiv': { u: 'Sporadisch aktiv',},
        'bannedfromchat': { u: 'Aus dem Chat verbannt',},
        'helfer': { u: 'Helfer', order: 3,},
        'founder': { u: 'Wiki-Gründer',},
        'threadmoderator': { 
            u: 'Moderator',
            m: 'Moderator',
            f: 'Moderatorin',
            order: 3,
            link:'Administration'
        },
        'content-moderator': { 
            u: 'Super-Moderator',
            m: 'Super-Moderator',
            f: 'Super-Moderatorin',
            order: 4,
            link:'Administration'
        },
        'chatmoderator': { 
            u: 'Chat-Moderator',
            m: 'Chat-Moderator',
            f: 'Chat-Moderatorin',
            order: 5, 
            link:'Administration'
        },
        'rollback': { 
            u: 'Rollback-Benutzer',
            m: 'Rollback-Benutzer',
            f: 'Rollback-Benutzerin',
            order: 6, 
            link:'Administration'
        }
	}
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'content-moderator',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'vanguard',
    'vstf'
];
UserTagsJS.modules.userfilter = {
};
UserTagsJS.modules.metafilter = {
	'chatmoderator': ['wikimoderator'],
	'threadmoderator': ['wikimoderator'],
	'rollback': ['wikimoderator']
};
UserTagsJS.modules.custom = {
};
 
window.ajaxPages = ['Spezial:Letzte_Änderungen','Spezial:WikiActivity'];
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Automatische Aktualisierung der kompletten Seite';
 
//Zusammenfassungen
$(function() {
 
    'use strict';
 
    var $textarea = $('#wpSummary');
 
    if (!$textarea.length || document.getElementById('stdSummaries')) return;
 
    var presets = (window.dev && window.dev.editSummaries) || {},
    css = 'css' in presets ? presets.css :
        '#stdSummaries { border-color: #ccc; border-radius: 4px; padding: 1px 2px; width: 276px; } ' +
        '.editpage-sourcewidemode-on.mode-source #stdSummaries { left: -17px; position: relative; top: 25px; width: 270px; }',
    select = presets.select || 'Vorlage:StdsummariesCode1';
 
    $textarea.attr('tabindex', '3'); //Zusammenfassungen
    $('#wpMinoredit').attr('tabindex', '4'); //Kleine Änderungen
    $('#wpSave').attr('tabindex', '5'); //Seite speichern
 
    var $summary = $('#wpSummaryEnhanced');
    if (!$summary.length) $summary = $textarea;
 
    if (css) $('head').append('<style type="text/css">' + css + '</style>');
 
    var $combo = $('<select id="stdSummaries" tabindex="2"></select>')
    .insertAfter($textarea)
    .change(function() {
        //var val = $summary.val();
        //$summary.val(val + (val.length ? '; ' : '') + $(this).val());
        $summary.val($(this).val());
    });
 
    function flatten (options, indent) {
        var flattened = [];
        indent = indent || '';
        for (var i = 0; i < options.length; i++) {
            if ($.isArray(options[i])) {
                flattened = flattened.concat(flatten(options[i], '-- '));
            } else {
                flattened.push(indent + options[i]);
            }
        }
        return flattened;
    }
 
    function render (lines) {
        var options = '', selected = ' selected',
            ignore = { ':': 1, '*': 1,  '<': 1 };
        for (var i = 0; i < lines.length; i++, selected = '') {
            if (!lines[i].length || ignore[lines[i][0]]) {
                continue; // lines beginning with these characters: : * < are ignored
            }
            if (lines[i].substring(0, 3) === '-- ') {
                var contents = mw.html.escape( lines[i].substring(3) );
                options += '<option value="' + contents + '"' +
                    selected + '>&nbsp;&nbsp;' + contents + '</option>';
            } else {
                options += '<option value="" disabled' +
                    selected + '>' + mw.html.escape( lines[i] ) + '</option>';
            }
        }
        $combo.append(options);
    }
 
    if (typeof select === 'string') {
        $.get('/wiki/' + select + '?action=raw')
        .done(function (data) {
            render(data.split(/\r\n|\n|\r/));
        });
    } else if ($.isArray(select)) {
        render(flatten(select));
    }
});

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
$(function replaceusername() {
    var spantags = document.getElementsByTagName("span");
    for (i=0; i<spantags.length; i++) {
        if (spantags[i].className == "insertusername") {
            if (wgUserName === null) {
                spantags[i].innerHTML = "Herausforderer";
            } else {
                spantags[i].innerHTML = wgUserName;
            }
        }
    }
});

//Nachrichten
var messageWallUserTags = {
    //'Username': 'Administrator'
};
 
$(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span style="color:#FFFFFF;background:#6699ff;border-radius:1em;padding:1px 5px;margin-left:1px;font-size:85%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
});

//Template:Hauptseiteevent in right rail
mediaWiki.loader.using('mediawiki.api', function () {
	var api = new mediaWiki.Api();
 
	if (skin === 'oasis' && wgAction === 'view' && wgNamespaceNumber > -1) {
		api.get({
			action: 'parse',
			page: 'Vorlage:Hauptseiteevent',
			prop: 'text'
		}, {
			ok: function (json) {
				$('#WikiaRail').prepend('<section class="rail-module">' +  json.parse.text['*'] + '</section>');
			}
		});
	}
});