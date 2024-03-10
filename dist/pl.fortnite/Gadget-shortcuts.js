var api = new mw.Api;
var dpl;
var currentUser = mw.config.get('wgUserName');

function getDPL() {
    return api.get({
        action: "parse",
        text: "{{#dpl:titleregexp="+currentUser+"/.*|namespace=User|ordermethod=title|redirects=include|format=,*[[%PAGE%|²{#titleparts:%PAGE%||2}²]]¶,,}}",
        contentmodel: "wikitext",
        disablelimitreport: "true",
        wrapoutputclass: "nav-shortcuts-body"
    }).then(function(data) {
        dpl = data.parse.text['*'];
    });
}

$.when(mw.loader.using('mediawiki.api'), $.ready).then(function() {
    getDPL().then(function(data) {
        $("<div class='nav-shortcuts'><div class='nav-shortcuts-title'>Shortcuts</div>"+dpl+"</div>").appendTo(document.getElementById("mw-page-base"));
    }).fail(function(error, code) {
        console.log(code);
    });
});