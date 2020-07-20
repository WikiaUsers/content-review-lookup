function updateObject(source,target) {
    for(i in source) {
	source[i] = target.hasOwnProperty(i) ? target[i] : source[i];
    }
}

function addLessPage(lesspage) {
    options = {
        target: 'MediaWiki:' + lesspage + '.css', //Compiled CSS
        source: 'MediaWiki:Custom-' + lesspage + '.less', //LESS files to compile
        load: [
            'MediaWiki:' + lesspage + '.css',
            'MediaWiki:Custom-' + lesspage + '.less'
        ],
        header: 'MediaWiki:Custom-CSS-header'
    }
    if(arguments.length >= 2 && typeof arguments[1] === 'object') {
        updateObject(options,arguments[1]);
    }
    window.lessOpts.push(options);
}

function addLessPages(lesspages) {
    for(i in lesspages) {
        addLessPage(lesspages[i]);
    }
}

lesspagesURL = '/api.php?' + $.param({
    action: 'query',
    titles: 'MediaWiki:Custom-Less-Pages',
    prop: 'revisions',
    rvprop: 'content',
    indexpageids: 1,
    v: Math.round(Math.random() * 10),//prevent caching
    format: 'json'
});
$.getJSON(lesspagesURL,function(data) {
    addLessPages(data.query.pages[data.query.pageids[0]].revisions[0]['*'].split('\n'));
});