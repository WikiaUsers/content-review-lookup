/* Kod dla wszystkich skórek by Akodone */
// Działanie szablonu Edycja
mw.loader.using(['mediawiki.util', 'mediawiki.notification'], function() {
    mw.hook('wikipage.content').add(function(content) {
    	// Check if an article has the category and if the user is logged in
        if (mw.config.get('wgCategories').includes('Artykuły w edycji') && mw.config.get('wgUserId')!==null) {
            const editTemplate=document.getElementsByClassName('edit-template')[0];
            // Check if an article contains the template
            if(!!editTemplate) {
                // if contains, then create its content
                editTemplate.classList.add('komunikat');
                var editor=editTemplate.dataset.editor;
                if (editor!=='{{{1}}}' && editor.trim()!=='') {
                    var href=mw.util.getUrl('Użytkownik:' + editor);
                    editTemplate.innerHTML='Ten artykuł jest obecnie w czasie edycji. Pracuje nad nim użytkownik <a href="' + href + '">'+ editor +'</a>. Prosimy nie edytować artykułu, dopóki komunikat nie zniknie.';
                } else {
                    editTemplate.innerHTML='BŁĄD! Prosimy podać nazwę użytkownika, który edytuje artykuł, za pomocą składni: <code><nowiki>{{Edycja|NAZWA UŻYTKOWNIKA}}</nowiki></code>.';
                }
            } else {
                // if doesn't contain, show an alert to include the template
                mw.notify('Artykuł posiada kategorię „Artykuły w edycji”, lecz nie została ona wstawiona przez szablon Edycja. Prosimy o wstawienie kategorii poprzez szablon.');
            }
        }
    });
});

// Skrypt na liczenie edycji
mw.loader.using( 'mediawiki.api', function () {
	// Variables
	var api = new mw.Api();
	var umDane=document.getElementById('um-dane');
	var users={};
	
	umDane.textContent='Praca w toku…';

	var startDateTemplate=umDane.dataset.start;
	var endDateTemplate=umDane.dataset.end;
	// Main function
	function getEdits(start, end, editcontinue) {
		var startDate=start+"T23:59:59.000Z";
		var endDate=end+"T00:00:00.000Z";
		// Main api call
		api.get({
			action: "query",
			format: "json",
			list: "allrevisions",
			formatversion: "2",
			arvnamespace: "0",
			arvprop: "ids|timestamp|flags|comment|user|size",
			arvstart: startDate,
			arvend: endDate,
			arvcontinue: editcontinue,
		}).done( function ( allrevisionsresult ) {
			allrevisionsresult.query.allrevisions.forEach( function (result) {
				result.revisions.forEach( function (rev) {
					if (!rev.anon) {
						var currentSize=rev.size;
						var oldSize=0;
						var sizeDiff;
							
						if (rev.parentid!==0) {
							api.get({
								action: "query",
								format: "json",
								prop: "revisions",
								titles: result.title,
								formatversion: "2",
								rvprop: "ids|timestamp|flags|comment|user|size",
								rvlimit: "1",
								rvstartid: rev.parentid,
							}).done( function ( revresult ) {
								oldSize=revresult.query.pages[0].revisions[0].size;
								sizeDiff=currentSize-oldSize;
								console.log(result.title + ': ' + rev.revid + '; ' + rev.parentid + '; ' + rev.user + '; ' + rev.timestamp + ' – ' + currentSize + ' (' + oldSize + '; ' + sizeDiff + ')');
								
								if (users.hasOwnProperty(rev.user)) {
									users[rev.user].numberofedits++;
									users[rev.user].numberofbytes+=sizeDiff;
								} else {
									users[rev.user]={
										numberofedits: 1,
										numberofbytes: sizeDiff
									}
								}
							});
						} else {
							sizeDiff=currentSize;
							console.log(result.title + ': ' + rev.revid + '; ' + rev.parentid + '; ' + rev.user + '; ' + rev.timestamp + ' – ' + currentSize + ' (' + oldSize + '; ' + sizeDiff + ')');
							
							if (users.hasOwnProperty(rev.user)) {
									users[rev.user].numberofedits++;
									users[rev.user].numberofbytes+=sizeDiff;
							} else {
								users[rev.user]={
									numberofedits: 1,
									numberofbytes: sizeDiff
								}
							}
						}
					}
				});
			});
			if (allrevisionsresult.continue) {
				//call the function again to show all results
				getEdits(endDateTemplate, startDateTemplate, allrevisionsresult.continue.arvcontinue);
			} else {
				//Inform about updated list
				mw.notify( 'Lista zaktualizowana pomyślnie!' );
				
				umDane.textContent='';
				var list=document.createElement('ol');
				umDane.appendChild(list);
	
				for (const property in users) {
					var li=document.createElement('li');
					li.textContent=property + ' – liczba edycji: ' + users[property].numberofedits + '; liczba bajtów: ' + users[property].numberofbytes;
					list.appendChild(li);
				}
				
				umDane.appendChild(list);
			}

		}); //Close main api call
	}
	
	getEdits(endDateTemplate, startDateTemplate);
});