var insertIframe = function() {
	var iframeDiv = document.querySelector('.iframe');
	if (iframeDiv) {
		// Prendi il valore del data-link
		var link = iframeDiv.getAttribute('data-link');
		if (link) {
			// Crea un nuovo elemento <iframe>
			var iframe = document.createElement('iframe');
			// Imposta l'attributo src dell'iframe
			iframe.src = link;
			// Imposta gli attributi di dimensione dell'iframe (opzionale)
			iframe.width = iframeDiv.style.width; // Imposta la larghezza desiderata
			iframe.height =  iframeDiv.style.height; // Imposta l'altezza desiderata
			// Pulisce il contenuto corrente del div
			iframeDiv.innerHTML = '';
            
			// Inserisce l'iframe all'interno del div
			iframeDiv.appendChild(iframe);
		var addlink = iframeDiv.getAttribute('data-addlink');
		    if (addlink === "true") {
		    	var divlink = document.createElement('div');
		    	divlink.innerHTML = 'Link: <a href="' + link + '">' + link + '</a>' ;
		    	iframeDiv.appendChild(divlink);
		    }
		}
		else {
			iframeDiv.innerHTML = 'Link mancante';
		}
	}
};


if (document.readyState === "complete" || document.readyState === "interactive") {
    // Attendi il completamento di tutte le operazioni asincrone di Fandom
    $.when(mw.loader.using('mediawiki.util')).done(function() {
        // Qui puoi inserire il tuo codice che dipende dal caricamento dei template
        insertIframe();
    });
} else {
    // Attendi il caricamento completo del documento
    document.addEventListener('DOMContentLoaded', function() {
        // Attendi il completamento di tutte le operazioni asincrone di Fandom
        $.when(mw.loader.using('mediawiki.util')).done(function() {
            // Qui puoi inserire il tuo codice che dipende dal caricamento dei template
            insertIframe();
        });
    });
}