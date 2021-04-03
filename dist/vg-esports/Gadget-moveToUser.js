$.when( mw.loader.using( 'mediawiki.util' ), $.ready ).then( function () { 
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Move To User', 'ca-move-to-user', 'Move to user ns of article creator & null edit', 'z', '#ca-patrol-all')).click(function() {
		clearDisplayColor();
		var reason = prompt("Enter reason for move","This page doesn't meet our notability guidelines or quality standards. Please join our Discord linked in the sidebar if you have any questions!");
		
		if (!reason) {
			return;
		}

		var ns = mw.config.get("wgCanonicalNamespace");
		if (ns != "") {
			ns = ns + ":"
		}
		var title = mw.config.get("wgTitle");
		var fulltitle = ns + title;
		var user = "";
		var revIDs = [];
		var rev = 0;
		var moveTo = "";
		var moveTo2 = "";
		var n = 2;
		var a = new mw.Api();
	
		function getUser() {
			a.get({action:"query",prop:"revisions",titles:fulltitle,rvprop:"ids|timestamp|user",rvlimit:"1",rvdir:"newer"}).done(function (data) {
				page = "";
				for (p in data.query.pages) {
					page = p;
				}
				user = data.query.pages[page].revisions[0].user;
				moveTo = "User:" + user + "/" + fulltitle;
				moveTo2 = moveTo;
				getRevisions();
				return;
				
			}).fail(function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to get data");
				return;
			});
		}
		
		function getRevisions() {
			a.get({action:"query",prop:"revisions",titles:fulltitle,rvprop:"ids",rvlimit:"50"}).done(function (data){
				for (p in data.query.pages) {
					page = data.query.pages[p]
					for (r in page.revisions) {
						revIDs.push(page.revisions[r].revid)
					}
				}
				patrolAndAccept();
				return;
			}).fail(function (data){
				console.log("Failed to get revisions");
				checkTarget();
				return;
			});
		}
		
		function patrolAndAccept() {
			if (rev == revIDs.length) {
				checkTarget();
				return;
			}
			a.postWithToken("patrol",{action:"patrol",revid:revIDs[rev]}).done(function (data){
				a.postWithToken("csrf",{action:"review",revid:revIDs[rev]}).done(function (data){
					rev++;
					patrolAndAccept();
					return;
				}).fail(function (data){
					console.log("Failed to accept revision " + revIDs[rev]);
					rev++;
					patrolAndAccept();
					return;
				});
			}).fail(function (data){
				console.log("Failed to patrol revision " + revIDs[rev] + "; moving on without attempting to accept.");
				rev++;
				patrolAndAccept();
				return;
			});
		}
			
		function checkTarget() {
			a.get({action:"query",prop:"pageprops",titles:moveTo}).done(function (data){
				if (data.query.pages["-1"] != undefined) {
					movePage();
					return;
				}
				moveTo = moveTo2 + "/" + n;
				n = n + 1 ;
				checkTarget();
			}).fail(function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to check if target exists");
				return;
			});
		}
		
		function movePage() {
			a.postWithToken("csrf",{action:"move",from:fulltitle,to:moveTo,noredirect:"1",reason:reason}).done(function (data){
				a.postWithToken("csrf",{action:"edit",title:moveTo,appendtext:"",summary:"blank edit"}).done(function (data){
					displayColor("gadget-action-success");
					console.log("Done!");
					return;
				}).fail(function (data){
					displayColor("gadget-action-incomplete");
					console.log("Failed to refresh");
					return;
				});
			}).fail(function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to move");
				return;
			});
	
		}
		getUser();
	});
});