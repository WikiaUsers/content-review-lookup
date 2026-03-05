mw.loader.using( 'mediawiki.api', function () {
	if ( !(mw.config.get('wgNamespaceNumber')==4 && mw.config.get('wgTitle') == 'Wyszukiwarka tekstów alternatywnych') ) {
		return;
	}

	// Złapanie odpowiednich pól HTMLa
	const altSearchField=document.getElementById('alt-search-field');
	const altSearchResult=document.getElementById('alt-search-result');
	
	// Zmienna na api
	var api = new mw.Api();
	
	// Utworzenie inputu (bo wikitekst nie daje możliwości utworzenia inputu)
	altSearchField.innerHTML='<p>Wpisz nazwy stron, dla których chcesz sprawdzić alty: <textarea id="alt-search-pagename"></textarea> <input type="submit" id="alt-search-submit" value="Sprawdź"></p>'
	// Styl rezultatu
	altSearchResult.style.fontFamily='monospace';
	
	// Złapanie inputów i utworzenie event listenera
	const altSearchPagename=document.getElementById('alt-search-pagename');
	const altSearchSubmit=document.getElementById('alt-search-submit');
	
	altSearchSubmit.addEventListener('click', searchMissingAlts);
	
	// Funkcja na szukanie i wyświetlanie brakujących altów
	function searchMissingAlts() {
		// Reset pola z rezultatem
		altSearchResult.innerHTML="";
		
		searchValues=altSearchPagename.value.split("\n");

		searchValues.forEach(function(v) {
			searchValue=v.trim();
		
			// Trim wyszukiwania
			// Jeśli jest pusty input, to zwracamy błąd
			if (searchValue=='') {
				alert('Niepoprawny tytuł strony!');
				return;
			}
			
			// Jak jest poprawna nazwa, to wyszukujemy jej treść w api
			api.get({
				action: "query",
				format: "json",
				prop: "revisions",
				titles: searchValue,
				formatversion: "2",
				rvprop: "content"
			}).done( function ( contentresult ) {
				// Po wpisaniu tytułu nieistniejącej strony zwraca błąd
				if (contentresult.query.pages[0].missing) {
					alert('Taka strona nie istnieje!');
					return;
				}
				
				// Osobne zmienne na samą treść artykułu i na treść rozdzieloną według linijek
				pageContent=contentresult.query.pages[0].revisions[0].content;
				pageContentSplit=pageContent.split('\n');

				// Wyszukiwanie altów dla [[Plik:]]
				regexFiles=/\[\[(Plik|File):(.*?)\]\]/gi;
				regexFilesAlt=/\|(\s*?)alt(\s*?)=(\s*?)\S(.*?)(\||\]\])/;
				normalFiles=pageContent.match(regexFiles);
				normalFilesWithoutAlt=[];
				
				if (!(normalFiles===null)) {
					normalFiles.forEach(function(f) {
						if (!regexFilesAlt.test(f)) {
							normalFilesWithoutAlt.push(f);
						}
					});
				}
				
				//Wyszukiwanie altów dla infoboksów
				regexInfobox=/\{\{Infoboks([\s\S]*?)\}\}/gi;
				
				regexInfoboxImageParameters=/\|\s*?obraz(\S*?)\s*?=\s*?\S[\S\s]*?(\||\}\})/gi;
				infoboxes=pageContent.match(regexInfobox);
				
				infoboxFilesWithoutAlt=[]
				
				if (!(infoboxes===null)) {
					infoboxes.forEach(function(i) {
						imageParameters=pageContent.match(regexInfoboxImageParameters);

						imageParameters.forEach(function(x) {
							if (!x.includes('<gallery>')) {
								editedString=x.replaceAll(" ","");
								editedString=editedString.replace("|obraz","");
								editedString=editedString.split("=")[0];
								editedStringSplit=editedString.split("+");
								editedString=editedStringSplit.join("\\+");
								
								altRegex=new RegExp("\\s*?\\|\\s*?alt"+editedString+"\\s*?=\\s*?\\S[\\S\\s]*?\\|");
								if (i.match(altRegex)===null) {
									console.log('nie ma alta');
									infoboxFilesWithoutAlt.push(x.substring(0, x.length - 1).replace("\n",""));
								}
							}
						});
					});
				}
				
				//Wyszukiwanie altów dla <gallery>
				regexGallery=/<gallery>[\s\S]*?<\/gallery>/gi;
				regexGalleryAlt=/\|(\s*?)alt(\s*?)=(\s*?)\S(.*?)(\||$)/;
				galleryFilesWithoutAlt=[];
				galleries=pageContent.match(regexGallery);

				if (!(galleries===null)) {
					galleries.forEach(function(g){
						gCopy=g.replace("<gallery>","").replace("</gallery>","").trim(2,-2);
						gItems=gCopy.split("\n");
						gItems.forEach(function(gi){
							if (!regexGalleryAlt.test(gi)) {
								galleryFilesWithoutAlt.push(gi);
							}
						});
					});
				}

				// Wspólna tablica na wszystkie braki altów
				allImagesWithoutAlts=normalFilesWithoutAlt.concat(infoboxFilesWithoutAlt).concat(galleryFilesWithoutAlt);
				
				if (allImagesWithoutAlts.length>0) {
					linesWithoutAlts=[]
					
					// Znalezienie indeksów linijek, w których brakuje altów
					allImagesWithoutAlts.forEach(function(iwa){
						splitCopy=pageContent.split(iwa)[0];
						countNewlines=splitCopy.match(/\n/g);
						if (countNewlines===null) {
							linesWithoutAlts.push(0);
						} else {
							linesWithoutAlts.push(countNewlines.length);
						}
					});
					
					// Posortowanie indeksów
					linesWithoutAlts.sort();
					altSearchResult.innerHTML+='<h3><a href="/pl/wiki/'+encodeURIComponent(contentresult.query.pages[0].title)+'">'+contentresult.query.pages[0].title+'</a> – obrazy bez altów:</h3><ul>';
					for (var k=0; k<linesWithoutAlts.length; k++) {
						altSearchResult.innerHTML+='<li>Linia '+(linesWithoutAlts[k]+1)+": "+pageContentSplit[linesWithoutAlts[k]]+'</li>';
					}
					altSearchResult.innerHTML+='</ul>';
				} else {
					altSearchResult.innerHTML+='<h3><a href="/pl/wiki/'+encodeURIComponent(contentresult.query.pages[0].title)+'">'+contentresult.query.pages[0].title+'</a> – brak obrazów bez altów.</h3><ul>';
				}
			});
		});
	}
});