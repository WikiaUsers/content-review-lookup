window.HTMLCSS = $.extend({}, window.HTMLCSS);
window.HTMLCSS.formattedNamespaces = mw.config.get("wgFormattedNamespaces");
window.HTMLCSS.namespaces = {};

Object.entries(window.HTMLCSS.formattedNamespaces).sort((a, b) => {
    let ai = parseInt(a[0]), bi = parseInt(b[0]);
    return ai - bi;
}).forEach((entry) => {
    let key = entry[0], value = entry[1];
    
    if (key in window.HTMLCSS.namespaces) return;
    
    window.HTMLCSS.namespaces[value] = parseInt(key);
});

window.HTMLCSS.generatePages = function(prefix){
    if (typeof prefix !== "string") return false;
    var namespace = 0, colonIdx = prefix.indexOf(":", 0),
        ns = prefix.slice(0, colonIdx), pg = prefix.slice(colonIdx + 1);
    
    if (ns in window.HTMLCSS.namespaces) namespace = window.HTMLCSS.namespaces[ns];
    else pg = prefix;
    
    return $.ajax({ 
        url: mw.util.wikiScript("api"),
        data: {
            action: "query",
            list: "allpages",
            apnamespace: namespace,
            apprefix: pg,
            format: "json"
        }
    });
};

window.HTMLCSS.generateRevisions = function(response){
    return $.when.apply($, response.query.allpages.map(page => {
        return $.ajax({
            url: mw.util.wikiScript("api"),
            data: {
                action: "query",
                prop: "revisions",
                rvprop: "content|user|timestamp",
                rvlimit: window.HTMLCSS.limit || 5,
                pageids: page.pageid,
                format: "json"
            }
        }).then(rev => rev);
    }));
};