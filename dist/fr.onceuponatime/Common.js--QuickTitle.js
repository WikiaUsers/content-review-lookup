// Allows a user to change the displayed title of a page without pressing the Edit button
// Original author: KCCreations (http://community.wikia.com/wiki/Message_Wall:KCCreations)
// Revised version author: KockaAdmiralac (http://community.wikia.com/wiki/Message_Wall:KockaAdmiralac)
$(function() {
    // Limiting the scope of the script
    if (!mw.config.get('wgIsArticle')) return;
 
    // Location of the title
    var titleLocation = $((mw.config.get("skin") === "oasis") ? '.wikia-page-header .header-column h1' : '.firstHeading, #firstHeading'),
    // Add more stuff, maybe move to a separate script (MediaWiki:QuickTitle/i18n.js)?
    i18n = {
        "en": {
            defaultSummary: "Changed displayed title",
            changeTitle: "Change title",
            cancel: "Cancel",
            error: "An error occurred while changing title"
        },
        "es": {
            defaultSummary: "Cambiado el título mostrado",
            changeTitle: "Cambiar título",
            cancel: 'Cancelar',
            error: 'Un error ha ocurrido mientras se cambiaba el título'
        }
    };
    i18n = i18n[i18n[mw.config.get('wgUserLanguage')] ? mw.config.get('wgUserLanguage') : "en"];
 
    // This caches the page data so it doesn't load the data every time the page loads
    // It also ensures the page exists before being able to rename it
    $.get(mw.util.wikiScript('index'), {action: "raw", title: mw.config.get('wgPageName')}, function(data) {
        titleLocation.click(function() {
            if( $('#QuickTitleField').length > 0) return;
            var title = $(this).text();
            $(this).html(
                $('<input></input>').attr({
                    'type': 'text',
                    'id': 'QuickTitleField',
                    'size': '50',
                    'value': title
                }).prop('outerHTML')
                + "<br/>" +
                $('<input></input>').attr({
                    'type': 'text',
                    'id': 'QuickTitleSummary',
                    'value': i18n.defaultSummary
                }).prop('outerHTML')
                + "<br/>" + 
                $("<button></button>").attr('id', 'QuickTitleChange').text(i18n.changeTitle).prop('outerHTML')
                + $("<button></button>").attr('id', 'QuickTitleCancel').text(i18n.cancel).prop('outerHTML')
            );
            $('#QuickTitleField').focus();
            $('#QuickTitleChange').click(function() {
                var newTitle = $('#QuickTitleField').val().replace(/}}/ig, ""),
                displayTitle = "{{DISPLAYTITLE:" + newTitle + "}}",
                text,
                regex = /{{DISPLAYTITLE:.+?(?!(\r|\n))}}/ig;
                if(data.match(regex)) text = data.replace(regex, displayTitle);
                new mw.Api().post($.extend({
                    action: 'edit',
                    minor: true,
                    bot: true,
                    summary: $("#QuickTitleSummary").val(),
                    title: mw.config.get("wgPageName"),
                    token: mw.user.tokens.get("editToken")
                }, text ? {"text": text} : {prependtext: displayTitle})).done(function(d) {
                    if(d.error) new BannerNotification(i18n.error + ": " + d.error.code, 'error').show();
                    else {
                        titleLocation.text(newTitle);
                        window.location.reload();
                    }
                }).fail(function(){ new BannerNotification(i18n.error, 'error').show(); });
            });
            $('#QuickTitleCancel').click(function() { setTimeout(function() { titleLocation.text(title); }, 100); });
        });
    });
});