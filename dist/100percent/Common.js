/* Preload Format For Blank Articles */
if (mw.config.get('wgAction') === 'edit' &&
    !document.getElementById('wpTextbox1').value) {

    var title = mw.config.get('wgTitle');
    var namespace = mw.config.get('wgNamespaceNumber');
    var isNewPage = document.getElementById('wpMinoredit') === null;

    if (isNewPage) {
        if (namespace === 0) {
            var isSubpage = title.indexOf('/') !== -1;

            if (isSubpage) {
                document.getElementById('wpTextbox1').value =
                    "{{Infobox DLC\n" +
                    "|missable_objectives_warning = \n" +
                    "}}\n\n" +
                    "==100% Requirements==\n" +
                    "{{Tasks|\n" +
                    "}}\n\n" +
                    "==Gallery==\n" +
                    "<gallery></gallery>\n\n" +
                    "==Checklist==\n";
            } else {
                document.getElementById('wpTextbox1').value =
                    "{{Infobox Game\n" +
                    "|franchise = \n" +
                    "|consoles = \n" +
                    "|genre = \n" +
                    "|developer = \n" +
                    "|publisher = \n" +
                    "|saveless_warning = \n" +
                    "|missable_objectives_warning = \n" +
                    "}}\n\n" +
                    "==100% Requirements==\n" +
                    "{{Completion|\n" +
                    "}}\n\n" +
                    "==Gallery==\n" +
                    "<gallery></gallery>\n\n" +
                    "==Checklist==\n";
            }
        } else if (namespace === 112) {
            document.getElementById('wpTextbox1').value =
                "{{Infobox Guide}}\n\n" +
                    "==Guides==\n" +
                    "{{Guides\n" +
                    "|\n" +
                    "}}\n\n";
        }
    }
}