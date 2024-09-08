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
			arvnamespace: "0|6",
			arvprop: "ids|timestamp|flags|comment|user|size|tags",
			arvstart: startDate,
			arvend: endDate,
			arvlimit:"1",
			arvcontinue: editcontinue,
		}).done( function ( allrevisionsresult ) {
			allrevisionsresult.query.allrevisions.forEach( function (result) {
				result.revisions.forEach( function (rev) {
					if (!rev.anon && !(rev.tags.includes('mw-undo'))) {
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