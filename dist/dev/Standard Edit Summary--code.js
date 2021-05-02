/**
 * Standard edit summaries
 *
 * see https://dev.wikia.com/wiki/Standard_Edit_Summary
 * for documentation and examples
 *
 * Originally written by User:Sikon for Wookiepedia
 * Rewritten by User:Quarenon for RuneScape Wiki
 * Updated by User:Eladkse for Casualty Wiki
 * Updated to handle comments and tabindexes by User:452
 * Updated to handle wide-screen mode and slightly optimized by User:Pecoes
 */

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false*/
/*global mw, importArticle */

(function($, document) {

    'use strict';
    function StandardEditSummary() {

        var $textarea = $('#wpSummary');

        if (!$textarea.length || document.getElementById('stdSummaries')) return;

        var presets = (window.dev && window.dev.editSummaries) || {},
            select = presets.select || 'Template:Stdsummaries';

        $textarea.attr('tabindex', '3'); //set tabindex for summaries text area
        $('#wpMinoredit').attr('tabindex', '4'); //set tabindex for minor edit checkbox
        $('#wpSave').attr('tabindex', '5'); //set tabindex for publish button
    
        var $summary = $('#wpSummaryEnhanced');
        if (!$summary.length) $summary = $textarea;
    
        if ('css' in presets) {
            mw.util.addCSS(presets.css);
        } else {
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:Standard_Edit_Summary.css'
            });
        }

        var $combo = $('<select id="stdSummaries" tabindex="2"></select>')
        .insertAfter($textarea.closest('div')) // Some Fandom script removed <select> at $textarea. Use closest parent.
        .change(function() {
            var val = $summary.val();
            $summary.val(val + (val.length ? '; ' : '') + $(this).val());
            // $summary.val($(this).val());
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
            $.get(mw.util.getUrl(select, {action: 'raw'}))
            .done(function (data) {
                render(data.split(/\r\n|\n|\r/));
            });
        } else if (Array.isArray(select)) {
            render(flatten(select));
        }
    }

    mw.hook('wikipage.content').add(StandardEditSummary);

})(window.jQuery, document);