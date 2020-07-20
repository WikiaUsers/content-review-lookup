//Loading the Korz plugin to allow a cross-origin requests
var Korz = document.createElement('script');
Korz.src = 'http://tomodo-tools.s3.amazonaws.com/tomodo.korz-0.5.js'
document.documentElement.appendChild(Korz);
Korz.onload = function () {
    getWikiStatistics('.outwikistats-articles', 'articles');
    getWikiStatistics('.outwikistats-activeusers', 'activeusers');
    getWikiStatistics('.outwikistats-admins', 'admins');
    getWikiStatistics('.outwikistats-edits', 'edits');
    getWikiStatistics('.outwikistats-images', 'images');
}

// ============================================================
// Начало: Быстрое описание правки (Standard Edit Summary)
// ============================================================
 
$(function() {
    'use strict';
    var $textarea = $('#wpSummary');
 
    if (!$textarea.length || document.getElementById('stdSummaries')) return;
 
    var templateLoader = $.get('/wiki/Шаблон:Stdsummaries?action=raw');
 
    $textarea.attr('tabindex', '3'); //set tabindex for summaries text area
    $('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
    $('#wpSave').attr('tabindex', '5'); //set tabindex for publish button
 
    var $summary = $('#wpSummaryEnhanced');
    if (!$summary.length) $summary = $textarea;
 
    $('head').append('<style type="text/css">#stdSummaries { padding: 1px 2px; width: 289px; } .editpage-sourcewidemode-on.mode-source #stdSummaries { left: -17px; position: relative; top: 25px; width: 278px; }</style>');
 
    var $combo = $('<select id="stdSummaries" tabindex="2"></select>')
    .insertAfter($textarea)
    .change(function() {
        var val = $summary.val();
        $summary.val(val + (val.length ? '; ' : '') + $(this).val());
    });
 
    templateLoader
    .done(function (data) {
        var lines = data.split(/\r\n|\n|\r/),
            options = '', selected = ' selected',
            ignore = { ':': 1, '*': 1,  '<': 1 };
        for (var i = 0; i < lines.length; i++, selected = '') {
            if (!lines[i].length || ignore[lines[i][0]]) {
                continue; // lines beginning with these characters: : * < are ignored
            }
            if (lines[i].substring(0, 3) === '-- ') {
                var contents = lines[i].substring(3);
                options += '<option value="' + contents + '"' +
                    selected + '>&nbsp;&nbsp;' + contents + '</option>';
            } else {
                options += '<option value="" disabled' +
                    selected + '>' + lines[i] + '</option>';
            }
        }
        $combo.append(options);
    });
});
 
// ============================================================
// Конец: Быстрое описание правки (Standard Edit Summary)
// ============================================================


// Тут что-то
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});