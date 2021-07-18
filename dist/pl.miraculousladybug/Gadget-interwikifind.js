mw.loader.using( 'mediawiki.api', function () {
	//Variables
	var api = new mw.Api(); //Create new api
	var lista=document.getElementById('bezinterwikilista'); //Get the ol on a page
	var chosenLanguage; //variable for chosen language

	//create Select
	var selectField=document.getElementById('polewyborujezykow');
	var select=document.createElement('select');
	select.setAttribute('id', 'languagechange');
	select.setAttribute('name', 'languagechange');
	selectField.appendChild(select);
	//create first option of the select
	var firstOption=document.createElement('option');
	firstOption.setAttribute( 'value', 'none' );
	firstOption.textContent='Wybierz język!';
	select.appendChild(firstOption)

	//create list of languages
	api.get({
		action: "query",
		meta: "siteinfo",
		formatversion: "2",
		siprop: "interwikimap"
	}).done( function ( siteinforesult ) {
		//create list of options
		siteinforesult.query.interwikimap.forEach( function ( siresult ) {
			if ( siresult.language ) {
				var option=document.createElement('option');
				option.setAttribute( 'value', siresult.prefix );
				option.textContent=siresult.language;
				select.appendChild(option)
			}
		})
		//add Event listener to the select
		select.addEventListener('change', function (e) {
			if (e.target.value!=='none') {
				chosenLanguage=e.target.value;
				cleanLi();
				getLinksWithoutIW(chosenLanguage);
			}
		})
	})

	//Main function
	function getLinksWithoutIW (langToCheck, interwikicontinue) {
		//get list of all pages
		api.get({
			action: "query",
			list: "allpages",
			formatversion: "2",
			aplimit: "max",
			apcontinue: interwikicontinue
		}).done( function ( allpagesresult ) {
			//get langlinks for each page
			allpagesresult.query.allpages.forEach( function ( apresult ) {		
				api.get({
					action: "query",
					prop: "langlinks",
					titles: apresult.title,
					formatversion: "2",
					lllimit: "max"
				}).done( function ( interwikiresult ) {			
					var iwarticle=interwikiresult.query.pages[0];			
					if(!(iwarticle.langlinks)) {
						//if there are no langlinks, log the page
						createLi( iwarticle.title );
					} else {
						//check if chosen language is in interwikis
						var hasChosenLanguage;				
						iwarticle.langlinks.forEach( function ( iwresult ) {
							if ( iwresult.lang === langToCheck ) {
								hasChosenLanguage=true;
							}
						})
						//if the article has interwikis, but not in chosen language, log it					
						if (!hasChosenLanguage) {
							createLi( iwarticle.title );
						}	
					}
				})//close second api call
			})//close forEach for allpagesresult.query.allpages
			if (allpagesresult.continue) {
				//call the function again to show all results
				getLinksWithoutIW(chosenLanguage, allpagesresult.continue.apcontinue);
			} else {
				//Inform about updated list
				mw.notify( 'Lista zaktualizowana pomyślnie!' );
			}
		})//close first api call
	}

	//create li
	function createLi (pagetitle) {
		var li=document.createElement('li');
		li.setAttribute('class', 'bezinterwikilistitem');
		li.innerHTML='<a href="' + mw.util.getUrl(pagetitle) + '">' + pagetitle + '</a>';
		lista.appendChild(li);
	}

	//function for removing li
	function cleanLi () {
		var listItem=document.getElementsByClassName('bezinterwikilistitem');
		Array.from( listItem ).forEach( function ( i ) {
			i.remove();
		});
	}
} );