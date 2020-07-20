/*
{
    (ID of script): {
        sitewide: (number of wikis with the script installed),
        personal: (number of users on all wikis with the script installed in personal JS),
    }
}
*/

importArticle({
    type: "style",
    article: "w:bniceshottest:User:Blaster_Niceshot/wikia.js"
});

function getUsageStats() {
    var wikis = [
        'http://de.harry-grangers-test.wikia.com',
        'https://harrypotter.fandom.com/de'
    ];

    var stats = [];

    wikis.forEach(function(wiki) {
        var wikiStats = {};

        var api = new mw.Api();
        /*api.get({
            action: 'opensearch',
            search: '',
            limit: 10,
            namespace: 8,
            format: 'json'
        });*/
        api.get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            titles: 'MediaWiki:ImportJS',
            limit: 10,
            format: 'json',
	    indexpageids: 1
        }).then(function(res) {
            var content = res.query.pages[res.query.pageids[0]].revisions[0]['*'];
            // only currently active scripts
            var scripts = content.split(/\n/g).filter(function(script) {
                return !script.startsWith('//') && script.endsWith('.js');
            });
            var devScripts = scripts.filter(function(script) {
                return script.startsWith('dev:');
            });
            console.log('scripts', getScriptIDSlugs(scripts), 'devScripts', getScriptIDSlugs(devScripts));
        });

        stats.push(wikiStats);
    });

    console.log('getUsageStats', stats);
} 

function countSidewide() {

}

function countPersonal() {

}

function getScriptIDSlugs(scripts) {
    return scripts.map(function(val) {
        var val = val.toLowerCase();
        if (/^dev:(.*)\.js$/.test(val)) {
            var path = /^dev:(.*)\.js$/.exec(val)[1].replace(/[-.]/, '');
            if (!path.includes('/')) {
                return path;
            }
            else {
                var pathParts = path.split('/');
                if (pathParts.length === 2) {
                     if (pathParts[1] === 'code') {
                         return pathParts[0];
                     }
                     else {
                         return path;
                     }
                }
            }
        }
    });
}

getUsageStats();