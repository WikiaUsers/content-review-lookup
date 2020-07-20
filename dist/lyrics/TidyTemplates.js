/* LW editor tools - Tidy Templates */
// Used files: [[File:Lw Button TemplateTidy.png]]

/*jslint browser, long */
/*global jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    function tidyTemplatesHandler(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;
        var selection = pageText.slice(lw.editbox.selectionStart, lw.editbox.selectionEnd);

        var defaultTemplates = Object.keys(lw.defaultParameters || {});
        var newPageText = pageText;

        if (selection !== "") {
            // tidy selected template
            newPageText = newPageText.replace(lw.templateMatch(selection), lw.tidyTemplate);
        } else if (lw.tidyTemplatesLW) {
            // tidy templates using a custom function
            newPageText = lw.tidyTemplatesLW(newPageText);
        } else if (defaultTemplates.length) {
            // tidy templates with defaults set
            defaultTemplates.forEach(function (template) {
                newPageText = newPageText.replace(lw.templateMatch(template), lw.tidyTemplate);
            });
        } else {
            // nothing to do
            lw.setButtonIcon($button, "notdone", 3000);
            return;
        }

        if (pageText !== newPageText) {
            lw.editbox.value = newPageText;
            lw.setButtonIcon($button, "done", 3000);
        } else {
            lw.setButtonIcon($button, "nochange", 3000);
        }
    }

    mw.hook("lw.loadEditorTools").add(function () {
        lw.addEditorButton("Tidy templates", tidyTemplatesHandler, "/lyricwiki/images/8/87/Lw_Button_TemplateTidy.png");
    });
}(jQuery, mediaWiki));