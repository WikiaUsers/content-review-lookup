if ( wgCanonicalNamespace != 'Special' && wgArticleId > 0 ) addOnloadHook(function () {
   addPortletLink('p-cactions', wgScript + '?title=' + encodeURIComponent( wgPageName ) + '&action=purge', 'purge', 'ca-purge', 'Purge cache', '*');
});