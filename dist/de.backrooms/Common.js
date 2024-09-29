/* Das folgende JavaScript wird für alle Benutzer geladen. */
// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        mw.util.addCSS($(this).attr("data-css"));
    });
});

$('.keymaster-redirect').append('<script> window.location.href = "https://backrooms-convergence.fandom.com/wiki/The_Keymaster/de" </script>')