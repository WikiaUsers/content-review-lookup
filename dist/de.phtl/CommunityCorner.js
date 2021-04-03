/**
 * Script for adding the community corner to UCP wikis
 * 
 * @author Professor Hershel Theodore Layton
 */
mw.loader.using('mediawiki.api', function() {
    var api = new mw.Api();
    
    api.get({
        action: 'parse',
        page: mw.config.get('wgFormattedNamespaces')[4] + ":" + "Gemeinschaftsecke",
        contentmodel: 'wikitext',
        wrapoutputclass: 'script-community-corner',
        disabletoc: true,
        disableeditsection: true,
        format: 'json'
    }).done(function(data) {
        if (data.hasOwnProperty('error')) return false;
        
        var content = data.parse.text['*'];
        
        $('#WikiaRail').append(
            $('<section>', {
                id: 'CcsModule',
                class: 'rail-module ccs-module'
            }).append(
                $('<h2>').text('Community corner')
            ).append(
                $('<div>', {
                    id: 'CcsContent'
                }).html(
                    content
                )
            )
        );
    });
});