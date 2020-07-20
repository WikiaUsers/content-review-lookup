/*
<pre>
*/

function purge() {//Here, we declare the function and it's parameters
	var hist; var url;//Here, we declare two variables
	if (!(hist = document.getElementById('ca-history') )) return;	//Try to set hist as the document's element
									//with id 'ca-history' - tha's the history tab
	if (!(url = hist.getElementsByTagName('a')[0] )) return;	//Try to set url as the history tab's first
									//element with the tag 'a'
	if (!(url = url.href )) return;	//Try to set url as the href of that element from line 3
	addPortletLink('p-cactions',	//add a PortletLink to the p-cactions area (the tabs at the top of the page)
			url.replace(/([?&]action=)history([&#]|$)/, '$1purge$2'),	//replace the ?action=history
											//part of the href we got from
											//the history tab with ?action=purge,
											//and set it as the destination
			'purge',				//set the text that will appear on the tab
			'ca-purge',				//set the internal id for the tab - this is useful for
								//referring to it, and positioning tabs relative to one another
			'Purge server cache for this page',	//set the mouseover text
			'0');					//I forget what this does

}
if ( wgCanonicalNamespace != "Special" ) addOnloadHook(purge);	//if it's not a special page then hook onto the page loading


/*
</pre>
*/