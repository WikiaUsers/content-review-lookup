/* Tämän sivun JavaScript-koodi liitetään jokaiseen sivulataukseen */

/* Ääkkösten oikea tulkinta */
mw.config.set('tableSorterCollation', {'ä':'ae', 'ö' : 'oe', 'ß': 'ss', 'ü':'ue'});

/* Korvaa mallinekutsun {{USERNAME}} sivua selaavan käyttäjän nimellä. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});