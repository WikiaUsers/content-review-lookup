/**
 * @source https://mediawiki.org/wiki/Snippets/Open_external_links_in_new_window
 * @version 2018-09-15
 */
mw.hook("wikipage.content").add(
    function () {
        document.querySelectorAll("a.external, a[rel='mw:ExtLink']").forEach(
            function (el) {
                if (el.href.indexOf(location.protocol + "//" + location.hostname) !== 0) {
                    if (el.rel.indexOf("noopener") < 0) {
                        el.rel += " noopener";
                    }

                    if (el.rel.indexOf("noreferrer") < 0) {
                        el.rel += " noreferrer";
                    }

                    el.target = "_blank";
                }
            }
        );
    }
);