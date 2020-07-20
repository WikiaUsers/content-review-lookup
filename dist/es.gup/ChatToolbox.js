//<syntaxhighlight lang="javascript">
/* ChatToolbox 1.0.5 */
/* @Author: Giovi (Benfutbol10) based on the script Standart Edit Summaries */
/* @Original authors: http://dev.wikia.com/wiki/Standard_Edit_Summary/code.js?action=history */
 
$(function() {
    var $chatheader = $('#ChatHeader');
    select = 'Plantilla:ChatToolbox';
 
    var $menu = $('<ul class="dropdown"></ul>')
    .insertAfter($chatheader);
 
    importStylesheetURI('http://dev.wikia.com/wiki/ChatToolbox/code.css?action=raw&ctype=text/css');
    importStylesheetPage('MediaWiki:Chat-toolbox.css');
 
    function flatten (options, indent) {
        var flattened = [];
        indent = indent || '';
        for (var i = 0; i < options.length; i++) {
            if ($.isArray(options[i])) {
                flattened = flattened.concat(flatten(options[i], '* '));
            } else {
                flattened.push(indent + options[i]);
            }
        }
        return flattened;
    }
 
    function render (lines) {
        var options = '', selected = ' selected',
            ignore = { '(': 1, ':': 1,  '<': 1 };
        for (var i = 0; i < lines.length; i++, selected = '') {
            if (!lines[i].length || ignore[lines[i][0]]) {
                continue;
            }
            var contents = mw.html.escape( lines[i].substring(2) );
            if (lines[i].substring(0, 2) === '* ') {
                var partes = contents.split('|');
 
                var clase = partes[0].replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
//              var clase = partes[0].toLowerCase().replace(/[^a-z0-9]|_\s/g, '');  ?
                var checksitiene = /\|/g.test(contents)
 
                if(checksitiene) {
                    var palitos = contents.match(/\|/g);
                    var cantidadpalos = palitos.length;
 
                    if(cantidadpalos == 1) {
                        var url = partes[0].replace(/[_\s]/g, '_');
                        var wachem = contents.replace(/\|/,'">');
                        options += '<li class="' + clase + '"><a target="_blank" href="/wiki/' + url + '">' + partes[1] + '</a></li>';
                    } else {
                        if(cantidadpalos == 2) {
                            var partes = contents.split('|');
                            var url = partes[1].replace(/[_\s]/g, '_');
 
                            options += '<li class="' + clase + '"><a onclick="' + partes[0] +'" href="#' + url + '">' + partes[2] + '</a></li>';
                        }
                    }
                } else {
                options += '<li class="' + clase + '"><a target="_blank" href="' + contents + '">' + contents + '</a></li>';
                }
            } else {
                options += '';
            }
        }
        $menu.append(options);
        $('ul.dropdown li:first-child').addClass('active').append(' <span>▼</span>')
        $('ul.dropdown li:first-child a').contents().unwrap();
    }
 
    if (typeof select === 'string') {
        $.get('/wiki/' + select + '?action=raw&ctype=text/raw')
        .done(function (data) {
            render(data.split(/\r\n|\n|\r/));
            importScriptPage('MediaWiki:Chat-toolbox.js');
        });
    } else if ($.isArray(select)) {
        render(flatten(select));
    }
});
//</syntaxhighlight>