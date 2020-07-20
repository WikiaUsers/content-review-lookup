! function (mw, $) {
    "use strict";
 
    var $cc = $("#mw-content-text"),
        messages = {
            en: {
                text: "Null Edit",
                tooltip: "Null Edit this page",
                success: "Null Edit successful!",
                failed: "Null Edit failed!"
            },
            es: {
                text: "Edición vacía",
                tooltip: "Editar esta página sin hacer cambios",
                success: "Edición vacía exitosa!",
                failed: "Edición vacía fallado"
            },
            pl: {
                text: "Pusta edycja",
                tooltip: "Wykonaj pustą edycję na tej stronie",
                success: "Sukces!",
                failed: "Niepowodzenie!"
            },
            sv: {
                text: "Tom redigera",
                tooltip: "Tom redigera denna sid",
                success: "Tom redigera framgångsrik!",
                failed: "Tom redigera misslyckades!"
            }
        };
 
    // Localisation: User Lang > Wiki Lang > English
    messages = $.extend(messages.en, messages[mw.config.get("wgContentLanguage")], messages[mw.config.get("wgUserLanguage")]);
 
    // Add the button
    function addButton() {
        var $sel,
            $button = $('<li><a/>').find("a")
            .attr({
                href: "#",
                accesskey: "0",
                id: "ca-null-edit",
                title: messages.title
            }).text(messages.text).click(edit).end();
 
        $sel = mw.config.get("skin") === "oasis" ? $("a[data-id='history']").closest("ul") : $("#ca-edit").parent();
        $sel.append($button);
    }
 
    // Show results
    function showResult(message, result) {
        if (mw.config.get("skin") === "oasis")
            window.GlobalNotification.show(message, result);
        else window.alert(message);
    }
 
    // Get the page
    function getPage() {
        $('#ca-null-edit').html('<img id="null-edit-throbber" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" /> Getting page...');
        $cc.load(window.location.href + " #mw-content-text > *", function () {
            $("#ca-null-edit").parent().remove();
            addButton();
 
            // Fix collapsibles, sortables and tabber
            $cc.find(".mw-collapsible").makeCollapsible();
            if ($cc.find("table.sortable").length)
                $cc.find("table.sortable").tablesorter();
            if ($cc.find(".tabber").length)
                tabberAutomaticOnLoad();
 
            // Allow users to add custom callback functions if needed
            var neCallAgain = window.NullEditCallAgain || [];
            neCallAgain.forEach(function(v){
                v();
            });
 
            // Fade-in the page slowly
            $cc.fadeToggle(3000);
 
            // Success notification
            showResult(messages.success, "confirm");
        });
    }
 
    function onError() {
        $("#ca-null-edit").parent().remove();
        addButton();
        $cc.fadeIn();
        showResult(messages.failed, "error");
    }
 
    // Ajax edit the page
    function edit(e) {
        $cc.fadeToggle(1400);
        e.preventDefault();
        $('#ca-null-edit').html('<img id="null-edit-throbber" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" /> Editing...');
        new mw.Api().post({
            format: 'json',
            action: 'edit',
            title: mw.config.get('wgPageName'),
            token: mw.user.tokens.get('editToken'),
            prependtext: ''
        })
        .done(function() {
            getPage();
        })
        .fail(function() {
            onError();
        });
    }
 
    // Init
    $(function () {
        if (!$("#ca-null-edit").length && $("#ca-edit, a[data-id='editprofile'], a[data-id='leavemessage']").length)
            addButton();
    });
}(mediaWiki, jQuery);