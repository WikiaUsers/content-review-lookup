/**
 * Standard edit summaries
 *
 * see http://dev.wikia.com/wiki/Standard_Edit_Summary
 * for documentation and examples
 *
 * Originally written by User:Sikon for Wookiepedia
 * Rewritten by User:Quarenon for RuneScape Wiki
 * Updated by User:Eladkse for Casualty Wiki
 * Updated to handle comments and tabindexes by User:452
 * Updated to handle wide-screen mode and slightly optmized by User:Pecoes
 * Updated to handle source mode and slightly optmized by User:StrawberryMaster
 */
 
// __NOWYSIWYG__ <source lang="javascript">
 
/* global mw */
 
/* jshint bitwise:true, browser:true, camelcase:true, curly:false, devel:true,
         eqeqeq:true, es5:true, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:false, plusplus:false, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/
 
$(function() {
 
    'use strict';
 
    var $textarea = $('#wpSummary');
 
    if (!$textarea.length || document.getElementById('Stdsummaries')) return;
 
    var presets = (window.dev && window.dev.editSummaries) || {},
    css = 'css' in presets ? presets.css :
        '#stdSummaries { border-color: #cfcfcf; border-radius: 3px; padding: 1px 2px; width: 260px; } ' +
        '.editpage-sourcewidemode-on.mode-source #stdSummaries { left: -285px; position: relative; bottom: 2.5em; width: 278px }',
    select = presets.select || 'Template:Custom-summaries';
 
    $textarea.attr('tabindex', '3'); //set tabindex for summaries text area
    $('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
    $('#wpSave').attr('tabindex', '5'); //set tabindex for publish button
 
    var $summary = $('#wpSummaryEnhanced');
    if (!$summary.length) $summary = $textarea;
 
    if (css) $('head').append('<style type="text/css">' + css + '</style>');
 
    var $combo = $('<select id="Stdsummaries" tabindex="2"></select>')
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
 
//</source>