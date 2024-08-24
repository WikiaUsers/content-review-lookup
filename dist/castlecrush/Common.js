importScriptPage('ShowHide/code.js', 'dev');
 
var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "show",
	hide: "hide",
	showAll: "show all",
	hideAll: "hide all"
    }
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
        'bureaucrat': { u: 'Bureaucrat', m: 'Bureaucrat', f: 'Bureaucrat', order: 1 , },
        'sysop': { u: 'Administrator', m: 'Administrator', f: 'Administrator', order: 2 ,},
        'vstf': { u: 'VSTF',},
        'bot': { u: 'Bot-Account',},
        'inactive': { u: "Inactive-Wikians",},
        'semiaktiv': { u: 'semiaktiv',},
        'bannedfromchat': { u: 'Banted from the chat',},
        'founder': { u: 'Creator', order: 1 ,},
        'threadmoderator': { 
            u: 'Moderator',
            m: 'Moderator',
            f: 'Moderator',
            order: 3
        },
        'content-moderator': { 
            u: 'Super-Moderator',
            m: 'Super-Moderator',
            f: 'Super-Moderator',
            order: 4
        },
        'chatmoderator': { 
            u: 'Chat-Moderator',
            m: 'Chat-Moderator',
            f: 'Chat-Moderator',
            order: 5
        },
    	'rollback': { 
            u: 'Rollback-Wikian',
            m: 'Rollback-Wikian',
            f: 'Rollback-Wikian',
            order: 6
        },
        'communitymanager': { 
            u: 'Community-Manager',
            m: 'Community-Manager',
            f: 'Community-Manager',
            order: 7
        },
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
    'vstf'
];
UserTagsJS.modules.userfilter = {
       'Law of Royale': ['founder'],
       'Detective Wasabi': ['Admin'],
       'PanettoniTFG': ['bureaucrat','sysop']
    };
UserTagsJS.modules.metafilter = {
	'chatmoderator': ['Super-Moderator'],
	'threadmoderator': ['Super-Moderator'],
	'rollback': ['Super-Moderator']
	};

UserTagsJS.modules.custom = {
	'PanettoniTFG': ['communitymanager']
	};
 
window.ajaxPages = ['Special:WikiActivity','Special:RecentChanges'];
window.AjaxRCRefreshText = 'Auto-Updating...';
window.AjaxRCRefreshHoverText = 'Automatically update the complete page';
 
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
                spantags[i].innerHTML = "challenger";
            } else {
                spantags[i].innerHTML = wgUserName;
            }
        }
    }
});
 
//Nachrichten
var messageWallUserTags = {
    'ChristianClash': 'Administrator',
    'Law_of_Royale': 'Administrator',
    'Drunken_Sailors_TV': 'Administrator',
    'MattR1992': 'Administrator',
    'PanettoniTFG': 'Community-Manager',
};
 
$(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:#FFFFFF;background:#ff8450;border-radius:1em;padding:1px 5px;margin-left:1px;font-size:85%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
});

importArticles({
    type: 'script',
    articles: [
    'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:LastEdited/code.js'

    ]
});