/* Enable *.json-Pages */
if(/\.(json|less)/.test(wgPageName)) {
    addOnloadHook(function() {
        v = Math.random() * 10;
        $.getJSON('/api.php?action=query&titles=' + wgPageName + '&prop=revisions&rvprop=content&format=json&v=' + v,function(data) {
            code = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*'].replace(/\r|\n|\r\n/gm,'%0A').replace(/#/gm,'%23');
            syntaxhighlight(code,function(data) {
                content = data.parse.text['*'].replace(/%0A/g,'\r\n');
                console.log('syntaxhighlight',content);
                $('.mw-content-text').html(content);
            });
            $('.mw-content-text').html(syntaxhighlightPrism(code));
            Prism.highlightAll();
        });
    });
}

/* Syntaxhighlight */
function syntaxhighlight(code, callback) {
    $.getJSON('/api.php?action=parse&text=<syntaxhighlight lang=%22JavaScript%22>' + code + '</syntaxhighlight>&format=json').always(function(data) {
        if(!data.hasOwnProperty('error')) {
            callback(data);
        }
        else {
            console.error(data);
        }
    });
}

function syntaxhighlightPrism(code) {
    return $('<div />')$('<pre />').append($('<code />').class('language-json').html(code))).html();
}

/* Extend content-review-module */
addOnloadHook(function() {
    if(wgNamespaceNumber == 8 && !!$('.module.content-review-module').length) {
        console.info('content-review-module extend');
        $('.module.content-review-module').find('h2').after(
            $('<h4 />').addClass('content-review-module-header').text('Seit der letzten Änderung'),
            $('<div />').addClass('content-review-status content-review-status-diff')
        );
        if($('.content-review-status-').length == 3) {
            $('.content-review-status-diff').append(
                $('<div />').text('Die Seite ist noch leer.').append(
                    $('<a />').attr('href','/wiki/' + wgPageName + '?action=edit').text('Erstelle sie')
                )
             );
        }
        else if($('.content-review-status.content-review-status-none').length == 2) {
            $('.content-review-status-diff').append(
                $('<div />').text('Es wurde noch keine Version geprüft!')
             );
        }
        else if($('.content-review-status.content-review-status-live').length == 1 || $('.content-review-status.content-review-status-rejected').length == 1) {            
            diffContainer = $('.content-review-status-awaiting, .content-review-status-unsubmitted, .content-review-status-rejected').first();
            console.log('diffContainer',diffContainer);
            diffurl = diffContainer.find('a').attr('href');
            diffnum = diffContainer.find('a').text();
            oldid = (/oldid=([0-9]+)/.exec(diffurl))[1];

            $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=query&titles=' + wgPageName + '&prop=revisions&rvprop=ids&rvlimit=50&rvstartid=' + oldid + '&rvdir=newer&format=json',function(data) {
                diffContainer.prepend(
                    $('<span />').text(diffnum)
                );
                diffContainer.find('a').detach();
                $('.content-review-status-diff').append(
                    $('<div />').text((data.query.pages[Object.keys(data.query.pages)[0]].revisions.length - 2) + ' dazwischenliegende Versionen'),
                    $('<a />').attr('href', diffurl).text('Unterschied')
                );
            });
        }
        else {
            $('.content-review-status-diff').append(
                $('<div />').text('Die aktuelle Version ist live!')
            );
        }
    }
});