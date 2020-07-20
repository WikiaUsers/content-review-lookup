/**
 * Standard Edit Summaries
 *
 * Modified from Dev Wiki (http://dev.wikia.com/wiki/Standard_Edit_Summary/code.js)
 *
 * Originally written by User:Sikon for Wookiepedia
 * Rewritten by User:Quarenon for RuneScape Wiki
 * Updated by User:Eladkse for Casualty Wiki (defunct)
 * Updated to handle comments and tabindexes by User:452
 * Updated to handle wide-screen mode and slightly optmized by User:Pecoes
 * Modified by User:Eladkse for Holby Wiki
 */
 
//

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true*/

$(function() {
 
    'use strict';
 
    var $textarea = $('#wpSummary');
 
    if (!$textarea.length || document.getElementById('stdSummaries')) return;
 
    var templateLoader = $.get('/wiki/MediaWiki:Edit-summaries?action=raw');
 
    $textarea.attr('tabindex', '3'); //set tabindex for summaries text area
    $('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
    $('#wpSave').attr('tabindex', '5'); //set tabindex for publish button
 
    var $summary = $('#wpSummaryEnhanced');
    if (!$summary.length) $summary = $textarea;
 
    var $combo = $('<select id="stdSummaries" tabindex="2"></select>')
    .prepend('<option style="display:none;" selected>(Choose default summary)</option>')
    .insertAfter($textarea)
    .change(function() {
        var val = $summary.val();
        $summary.val(val + (val.length ? '; ' : '') + $(this).val());
    });
 
    templateLoader
    .done(function (data) {
        var lines = data.split(/\r\n|\n|\r/),
            options = '',
            ignore = { ':': 1, '*': 1,  '<': 1 };
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i].length || ignore[lines[i][0]]) {
                continue; // lines beginning with these characters: : * < are ignored
            }
            if (lines[i].substring(0, 3) === '-- ') {
                var contents = lines[i].substring(3);
                options += '<option value="' + contents + '">&nbsp;&nbsp;' + contents + '</option>';
            } else {
                options += '<option value="" disabled>' + lines[i] + '</option>';
            }
        }
        $combo.append(options);
    });
});