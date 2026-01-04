// Skrypt na liczenie edycji – nowa wersja Użytkownika Miesiąca od stycznia 2026 roku
mw.loader.using( 'mediawiki.api', function () {
	// Variables and constants
	var api = new mw.Api();
	var umDane=document.getElementById('um-dane');
	var users={};

	// List of users excluded from the contest (mainly bots)
	const excludedUsers=["AkodoneBot", "FoxinneBot"];
	
	umDane.textContent='Praca w toku…';

	var startDateTemplate=umDane.dataset.start;
	var endDateTemplate=umDane.dataset.end;
	
	// Function for points
	function points (bytes) {
		var points=0;
		switch(true) {
			case (bytes<50):
				points=0;
				break;
			case (bytes>=50 && bytes<500):
				points=Math.floor(bytes/50);
				break;
			case (bytes>=500 && bytes<5000):
				points=Math.floor((bytes*19-5000)/450);
				break;
			case (bytes>=5000 && bytes<50000):
				points=Math.floor((bytes*8-25000)/75);
				break;
			case (bytes>=50000 && bytes<500000):
				points=Math.floor((bytes*19-500000)/90);
				break;
			case (bytes>=500000 && bytes<1000000):
				points=Math.floor((bytes*4-1500000)/5);
				break;
			default:
				points=Math.floor(bytes/2);
		}
		return points;
	}
	
	// insertion sort for sorting all arrays using the keys from the first one
	function insertionSortAll(arr1, arr2, arr3) {
		for (var i = 1; i < arr1.length; i++) {
			var key1 = arr1[i];
			var key2 = arr2[i];
			var key3 = arr3[i];
			var j = i - 1;

			while (j >= 0 && arr1[j] > key1) {
				arr1[j + 1] = arr1[j];
				arr2[j + 1] = arr2[j];
				arr3[j + 1] = arr3[j];
				j = j - 1;
			
			}
			arr1[j + 1] = key1;
			arr2[j + 1] = key2;
			arr3[j + 1] = key3;
		}
	}
	
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
			arvnamespace: "0|6|10|14",
			arvprop: "ids|timestamp|flags|comment|user|size|tags",
			arvstart: startDate,
			arvend: endDate,
			arvlimit:"1",
			arvcontinue: editcontinue,
		}).done( function ( allrevisionsresult ) {
			allrevisionsresult.query.allrevisions.forEach( function (result) {
				result.revisions.forEach( function (rev) {
					if (!rev.anon && !(rev.tags.includes('mw-reverted')) && !excludedUsers.includes(rev.user)) { //if edit was reverted, we don't count it, we also don't count anons and excluded accounts
						
						// helpful variables for later
						var currentSize=rev.size;
						var oldSize=0;
						var sizeDiff;
						var pointsToGive=0;
						
						if (rev.tags.includes('mw-rollback') || rev.tags.includes('mw-undo') || rev.tags.includes('mw-manual-revert')) { //if edit IS a revert
						// we give 5 points
							if (users.hasOwnProperty(rev.user)) {
									users[rev.user].numberofedits++;
									users[rev.user].numberofpoints+=5;
							} else {
								users[rev.user]={
									numberofedits: 1,
									numberofpoints: 5
								}
							}	
						} else if (result.ns!=0) { //if edit is not from an article
						// we give 1 point
							if (users.hasOwnProperty(rev.user)) {
									users[rev.user].numberofedits++;
									users[rev.user].numberofpoints+=1;
							} else {
								users[rev.user]={
									numberofedits: 1,
									numberofpoints: 1
								}
							}
						} else if (rev.parentid!==0) { //if a parent page exists
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
								sizeDiff=currentSize-oldSize; //added bytes, base value for counting
								pointsToGive=points(sizeDiff); //base points calculated by bytes
								
								/* points bonuses for achievements */
								// completing article
								if (rev.tags.includes('Dopracowanie artykułu')) {
									pointsToGive+=50;
								}
								
								// adding content to very short articles
								if (sizeDiff>0 && oldSize<2000) {
									pointsToGive+=10;
								}
								
								// making articles min. 15 000 bytes long
								if (currentSize>=15000 && oldSize<15000) {
									pointsToGive+=20;
								}
								
								// using source editor
								if (rev.tags.includes('wikieditor') || rev.tags.includes('visualeditor-wikitext')) {
									pointsToGive+=1;
								}
								
								console.log(result.title + ': ' + rev.revid + '; ' + rev.parentid + '; ' + rev.user + '; ' + rev.timestamp + ' – ' + currentSize + ' (' + oldSize + '; ' + sizeDiff + '); points: ' + pointsToGive);
								
								if (users.hasOwnProperty(rev.user)) {
									users[rev.user].numberofedits++;
									users[rev.user].numberofpoints+=pointsToGive;
								} else {
									users[rev.user]={
										numberofedits: 1,
										numberofpoints: pointsToGive
									}
								}
							});
						} else {
							sizeDiff=currentSize;
							
							//points base (with 50 points bonus for creating a new article)
							pointsToGive=points(sizeDiff)+50;
							
							/* points bonuses for achievements */
							// making articles min. 15 000 bytes long
							if (currentSize>=15000) {
								pointsToGive+=20;
							}
								
							// using source editor
							if (rev.tags.includes('wikieditor') || rev.tags.includes('visualeditor-wikitext')) {
								pointsToGive+=1;
							}
							
							console.log(result.title + ': ' + rev.revid + '; ' + rev.parentid + '; ' + rev.user + '; ' + rev.timestamp + ' – ' + currentSize + ' (' + oldSize + '; ' + sizeDiff + '); points: ' + pointsToGive);
							
							if (users.hasOwnProperty(rev.user)) {
									users[rev.user].numberofedits++;
									users[rev.user].numberofpoints+=pointsToGive;
							} else {
								users[rev.user]={
									numberofedits: 1,
									numberofpoints: pointsToGive
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
				
				var usernames=[];
				var editsnumbers=[];
				var pointsnumbers=[];

				for (const [key, value] of Object.entries(users)) {
					usernames.push(key);
					editsnumbers.push(value.numberofedits);
					pointsnumbers.push(value.numberofpoints)
				}
				
				insertionSortAll(editsnumbers,pointsnumbers,usernames);
				insertionSortAll(pointsnumbers,editsnumbers,usernames);

				console.log(usernames);
				console.log(editsnumbers);
				console.log(pointsnumbers);

				var mystring="{|class=\"wikitable custom-table\" width=\"100%\"\n!Miejsce\n!Nazwa użytkownika\n!Liczba edycji\n!Liczba punktów";
				var j=1;

				for (var i=usernames.length; i>=1; i--) {
					mystring+="\n|-\n|"+j+".\n|[[Użytkownik:"+usernames[i-1]+"|"+usernames[i-1]+"]]\n|"+editsnumbers[i-1]+"\n|"+pointsnumbers[i-1];
					j++;
				}

				mystring+="\n|}";
				
				var preUM=document.createElement('pre');
				preUM.innerHTML=mystring;
				umDane.appendChild(preUM);
				
			}

		}); //Close main api call
	}
	
	getEdits(endDateTemplate, startDateTemplate);
});