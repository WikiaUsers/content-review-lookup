if(wgPageName == 'MediaWiki:ImportJS') {
    console.info('ImportJS');
    scripts = $('#mw-content-text pre').html().split('\n');
    ul = $('<ul />');
    for(i in scripts) {
        script = scripts[i];
        if(/^dev:/.test(script)) {
            pageName = /dev:(.+)\.js/.exec(script)[1];
            page = 'w:c:dev:MediaWiki:' + pageName + '.js';
        }
        else {
            pageName = script;
            page = 'MediaWiki:' + script;
        }
        ul.append(
            $('<li />').append(
                $('<a />').attr('href','/wiki/' + page).text(pageName)
            )
        );
    }
    $('#mw-content-text pre').replaceWith(ul);
}