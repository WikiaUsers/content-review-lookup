/* 
 * Fluid Button
 * @description Adds buttons that allow users to view articles using the Fluid layout
 * @author Lythronax
 */
(function () {
    if(!$('#ca-skins').exists()) {
        var url = new mw.Uri(window.location.href),
            xl = Boolean(url.query.oasisbreakpoints);
        if(xl) {
            delete url.query.oasisbreakpoints;
            delete url.query.oasistypography;
        } else {
            url.query.oasisbreakpoints = '0';
            url.query.oasistypography = '0';
            }
        $('<a>', {
            'class': 'wds-button wds-is-squished wds-is-secondary',
            href: url.toString(),
            text: xl ? 'XL' : 'Fluid',
        }).appendTo('.page-header__contribution-buttons');
    }
})();