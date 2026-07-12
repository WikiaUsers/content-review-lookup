/* Any JavaScript here will be loaded for all users on every page load. */

/* Dogcheck */
$(document).ready(function() {
    
    if ($('.dogcheck, .flower, .flowerOG').length > 0) {
        
        var urlParams = new URLSearchParams(window.location.search);
        var isReloadState = sessionStorage.getItem('reload');

        
        if (!isReloadState) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (var registration of registrations) {
                        registration.unregister();
                    }
                });
            }
            if ('caches' in window) {
                caches.keys().then(function(names) {
                    for (var name of names) {
                        caches.delete(name);
                    }
                });
            }
            
            
            sessionStorage.setItem('reload', 'true');
            
            
            urlParams.set('purged', 'true');
            window.location.search = urlParams.toString();
            return;
        } 
        
        
        if (isReloadState) {
            

            sessionStorage.removeItem('reload');
            
            
            if (urlParams.has('purged')) {
                urlParams.delete('purged');
                var newSearch = urlParams.toString();
                var cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
                if (newSearch) {
                    cleanUrl += '?' + newSearch;
                }
                cleanUrl += window.location.hash;
                
                window.history.replaceState(null, document.title, cleanUrl);
            }
        }
    }
});