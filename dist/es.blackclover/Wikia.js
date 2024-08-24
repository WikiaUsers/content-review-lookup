$(function() {
    /*
        Add to each page a class for the CSS theme based on the Portable Infobox theme
        Helps to better customize pages accordingly to the specified theme, like
            adding a yellow-palette on pages from Golden Dawn/Amanecer Dorado members
    */
    if ($('.portable-infobox').length) {
        var theme = $('.portable-infobox').attr('class').match(/pi-theme-([A-Za-z\-αινσϊ]*)/)[1];
        if (theme !== 'wikia') $('.WikiaMainContent').addClass('theme-' + theme);
    }
});