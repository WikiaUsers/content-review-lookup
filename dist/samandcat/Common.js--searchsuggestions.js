/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
(function () {
 
    'use strict';
 
    var MAX_RESULTS = 10;
 
    var results, input;
 
    if (window.wikiaPageType === 'search') {
        results = $('.SearchInput');
        input = $('#search-v2-input');
        if (!results.length || !input.length) return;
    } else return;
 
    $.getJSON('/api.php?action=opensearch&search=' + input.val())
    .done(function (data) {
        if ($.isArray(data[1]) && data[1].length) {
            var terms = data[1].slice(0, MAX_RESULTS);
            for (var i = 0; i < terms.length; i++) {
                terms[i] = '<a href="/wiki/index.php?search=' +
                     encodeURIComponent(terms[i]) +
                     '&fulltext=0">' +
                     terms[i].replace(/</g, '&lt;').replace(/>/g, '&gt;') +
                     '</a>';
            }
            results
            .append('<br /><p style="font-size: 80%; font-weight: normal; margin: 10px 10px 0 160px;">' +
                'Not what you were looking for? Try: ' +
                terms.join(', ') +
            '</p>');
        }
    });
}());