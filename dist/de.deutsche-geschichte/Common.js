/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

   addOnloadHook(function () {
   addPortletLink ('p-cactions', 'http://de.wikipedia.org/wiki/' + wgPageName, 'WP');
   addPortletLink ('p-cactions', 'http://marjorie-wiki.org/wiki/' + wgPageName, 'MA');
   addPortletLink ('p-cactions', 'http://de.uniform.wikia.com/wiki/' + wgPageName, 'UW');
   addPortletLink ('p-cactions', 'http://de.bladeandarmour.wikia.com/wiki/' + wgPageName, 'WW');
});