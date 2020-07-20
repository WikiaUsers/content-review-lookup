/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/

$(document).ready(function() {
    var namespace = mw.config.get('wgNamespaceNumber');
    if (-1 < [1,3,5,7,9,11,13,15,110].indexOf(namespace)) { 
        var editMenu = $('#WikiaPageHeader')
        .find('nav.wikia-menu-button')
        .find('ul.WikiaMenuElement');
  
        $('<li><a>Unsigned</a></li>')
        .appendTo(editMenu)
        .click(function() {
            var pageid = mw.config.get('wgArticleId');
            $.getJSON("/api.php", {action: "query", prop: "revisions", titles: wgPageName, rvprop: "user", format: "json", indexpageids: 1}, 
            function(json) {
                var user = json.query.pages[pageid].revisions[0].user;
                var reason = "Adding unsigned template for: "+user;
                var template = '{{Unsigned|'+user+'}}';
                $.post("/api.php", {action: "edit", title: wgPageName, token: mw.user.tokens.values.editToken, appendtext: template, summary: reason});
                });
            });
        });
    }
);