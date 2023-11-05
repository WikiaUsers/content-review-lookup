/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen.*/

/* BACK TO TOP */
window.BackToTopModern = true;



/* LINKPREVIEW */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

/* Enthaelt eine Seite kein Bild, wird dies in der Vorschau angezeigt. */
window.pPreview.noimage = 'https://static.wikia.nocookie.net/ghibli/images/0/05/Leer.jpg/revision/latest/scale-to-width-down/400?cb=20210828181625&path-prefix=de';