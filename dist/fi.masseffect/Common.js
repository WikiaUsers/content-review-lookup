/* T�m�n sivun JavaScript-koodi liitet��n jokaiseen sivulataukseen */

/* ��kk�sten oikea tulkinta */
mw.config.set('tableSorterCollation', {'�':'ae', '�' : 'oe', '�': 'ss', '�':'ue'});

/* Korvaa mallinekutsun {{USERNAME}} sivua selaavan k�ytt�j�n nimell�. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});