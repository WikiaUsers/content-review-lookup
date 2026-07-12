mw.loader.using( 'mediawiki.api', function () {
	// get all filenames of the page
	var api = new mw.Api();
	var foundImages=[];
	var linesAndFiles={};
	const altTemplateRegex=/\{\{(Szablon:|Template:)??Alt\|(.*?)\}\}/gi;
	
	//main function
	function getImages(imagescontinue) {
		if (typeof(imagescontinue)=='undefined') {
			mw.notify('Lista obrazów generuje się…');
		}
		
		api.get({
			action: "query",
			format: "json",
			prop: "images",
			titles: mw.config.get('wgPageName'),
			imcontinue: imagescontinue,
			formatversion: "2",
			imlimit: "max",
		}).done(function (result) {
			if (!result.query.pages[0].images) {
				mw.notify('Na tej stronie nie ma obrazów!');
				return;
			}
			result.query.pages[0].images.forEach(function (img) {
				foundImages.push(img.title.replace("Plik:",""));
			});
			
			if (result.continue) {
				//call the function again to show all results
				getImages(result.continue.imcontinue);
			} else {
				// sort images by length (we need this to avoid a bug)
				foundImages=foundImages.sort(function (a, b) {
					return b.length - a.length;
				});
				
				//get lines
				api.get({
					action: "query",
					format: "json",
					prop: "revisions",
					titles: mw.config.get('wgPageName'),
					formatversion: "2",
					rvprop: "content"
				}).done( function ( contentresult ) {
					// get all lines
					var lines=contentresult.query.pages[0].revisions[0].content.split('\n');
					
					//get files for each line (use for loop because we need indices)
					for (var i=0; i<lines.length; i++) {
						//create copy of the line
						lineCopy=lines[i];
						
						//empty array for files found in the line
						files=[];
						
						foundImages.forEach(function (img) {
							if (lineCopy.includes(img)) {
								files.push(img);
								lineCopy=lineCopy.replace(img,"");
							}
						});
						
						if (files.length>0) {
							linesAndFiles[i+1]=[];
							files.forEach(function (f) {
								linesAndFiles[i+1].push({title: f});
							});
						}
					}
					
					// here we're gonna get descriptions of the files	
					var keysLen=Object.keys(linesAndFiles).length;
					
					if (keysLen==0) {
						mw.notify('Na tej stronie nie ma obrazów!');
						return;
					}
					
					it=1;
					
					for (const [key, value] of Object.entries(linesAndFiles)) {
						jt=1;
						
						isLastKey=(it===keysLen);
						
						if (isLastKey) {
							var valLen=value.length;
						}
						
						value.forEach(function (v) {
							setTimeout(function () {
								api.get({
									action: "query",
									format: "json",
									prop: "revisions",
									titles: "Plik:"+v.title,
									formatversion: "2",
									rvprop: "content"
								}).done( function ( contentresult ) {
									if (contentresult.query.pages[0].missing) {
										v.desc=false;
									} else {
										if (contentresult.query.pages[0].revisions[0].content.match(altTemplateRegex) !==null) {
											v.desc=altTemplateRegex.exec(contentresult.query.pages[0].revisions[0].content)[2];
										} else {
											v.desc=false;
										}
									}
									
									if (isLastKey) {
										if (jt===valLen) {
											
											// here we are gonna show the eventual result
											setTimeout(function () {
												showContent(linesAndFiles);
											}, 1000);
											
											
											
										}
									}
									
									jt++;
								});
							}, 1000);
						});
						
						it++;
					}
				});
			}
		});
	}
	
	//show content
	function showContent(content) {
		// create the content div
		const contentDiv=document.createElement('div');
		contentDiv.id='alts-container';
		
		// create the heading
		const contentHeading=document.createElement('div');
		contentHeading.id='alts-heading';
		contentHeading.innerHTML='<p>Obrazy na stronie</p><p><span class="fa fa-x" id="alt-close"></span></p>';
		contentDiv.appendChild(contentHeading);
		
		//create the search
		const contentSearch=document.createElement('div');
		contentSearch.id='alts-search';
		contentSearch.innerHTML='<p>Szukaj linii: <input type="number" id="alts-input"></p>';
		contentDiv.appendChild(contentSearch);
		
		// create the body
		
		const contentBody=document.createElement('div');
		contentBody.id='alts-body';
		contentDiv.appendChild(contentBody);

		for (const [key, value] of Object.entries(content)) {
			// create the container for each line
			const altContainer=document.createElement('div');
			altContainer.classList.add('alt-container');
			altContainer.dataset.line=key;
			
			// create the heading for the line container
			const altContainerHeading=document.createElement('div');
			altContainerHeading.classList.add('alt-container-heading');
			altContainerHeading.innerHTML='<p>Linia '+Number(key)+'</p>';
			altContainer.appendChild(altContainerHeading);
			
			value.forEach(function (v) {
				// create value body
				const altContainerBody=document.createElement('div');
				altContainerBody.classList.add('alt-container-body');
				
				//create image field
				const altImg=document.createElement('div');
				altImg.classList.add('alt-img');
				altImg.innerHTML='<a href="/pl/wiki/Special:Filepath/'+mw.html.escape(v.title)+'" target="_blank"><img src="/pl/wiki/Special:Filepath/'+mw.html.escape(v.title)+'"></a>';
				altContainerBody.appendChild(altImg);
				
				//create description field
				const altDesc=document.createElement('div');
				altDesc.classList.add('alt-desc');
				var desc="";
				if (v.desc) {
					desc=mw.html.escape(v.desc)+'&nbsp;<span class="fa fa-copy copy-alt" data-desc="'+mw.html.escape(v.desc)+'"></span>';
				} else {
					desc="Brak sugerowanego alta.";
				}
				altDesc.innerHTML='<p><b>'+mw.html.escape(v.title)+': </b>'+desc+'</p><p><a href="/pl/wiki/Plik:'+mw.html.escape(v.title)+'" target="_blank">Strona pliku</a></p>';
				
				altContainerBody.appendChild(altDesc);
				
				altContainer.appendChild(altContainerBody);
				
			});
			
			contentBody.appendChild(altContainer);
		}
		
		document.getElementsByClassName('main-container')[0].appendChild(contentDiv);
		
		// add event listeners to all copy icons
		const copyIcons=document.getElementsByClassName('copy-alt');
		
		for (var i=0; i<copyIcons.length; i++) {
			copyIcons[i].addEventListener('click', function () {
				 navigator.clipboard.writeText(this.dataset.desc);
				 mw.notify('Skopiowano alt!');
			});
		}
		
		// add even listener to close
		document.getElementById('alt-close').addEventListener('click', closeAltWindow);
		
		// add search mechanism
		const altContainers=document.getElementsByClassName('alt-container'); // get all class containers
		
		document.getElementById('alts-input').addEventListener('input', function () {
			if (isNaN(parseInt(this.value)) || parseInt(this.value)<0) {
				for (var i=0; i<altContainers.length; i++) {
					altContainers[i].style.display='block';
				}
			} else {
				for (var i=0; i<altContainers.length; i++) {
					if (altContainers[i].dataset.line.includes(this.value)) {
						altContainers[i].style.display='block';
					} else {
						altContainers[i].style.display='none';
					}
				}
			}
		});
		
	}
	
	function closeAltWindow () {
		document.getElementById('alts-container').remove();
		foundImages=[];
	    linesAndFiles={};
	}
	
	// Add the button to my tools
	mw.hook('dev.placement').add(function (placement) {
		placement.script('AltSuggestion');
		$(placement.element('tools'))[placement.type('prepend')](
			$('<li>').append(
				$('<a>', {
					text: 'Sugestie altów',
					click: function (e) {
						e.preventDefault();
						getImages();
					}
				})
			)
		);
	});
	
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:Placement.js'
	});
});