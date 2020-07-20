/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Istimewa:Perubahan_terbaru","Istimewa:WikiActivity","Istimewa:Daftar_halaman","Istimewa:Berkas_baru"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Start --- importArticles coding */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js', /* Reference Pop-up tag */
	'u:dev:DisplayClock/code.js', /* Wikia Clock */
        // ...
    ]
});

/* End --- importArticles coding */