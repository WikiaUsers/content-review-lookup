/* Purge caption button */
addOnloadHook(function () {
   var hist; var url;
   if (!(hist = document.getElementById('ca-history') )) return;
   if (!(url = hist.getElementsByTagName('a')[0] )) return;
   if (!(url = url.href )) return;
   addPortletLink('p-cactions', url.replace(/([?&]action=)history([&#]|$)/, '$1purge$2'),
                  '*', 'ca-purge', 'Purge cache', '*');
});