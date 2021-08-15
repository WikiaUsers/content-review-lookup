$( function () { 
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Patrol All', 'ca-patrol-all', 'Patrol & accept all revisions of this page')).click(function() {
		clearDisplayColor();		
		if (!confirm("Patrol all revisions?")) {
			return;
		}

		var ns = mw.config.get("wgCanonicalNamespace");
		if (ns != "") {
			ns = ns + ":"
		}
		var title = mw.config.get("wgTitle");
		var fulltitle = ns + title;
		var revIDs = [];
		var rev = 0;
		var a = new mw.Api();
				
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
				displayColor("gadget-action-success");
				console.log("Done!");
				return;
			}
			a.postWithToken("patrol",{action:"patrol",revid:revIDs[rev]}).done(function (data){
				a.postWithToken("csrf",{action:"review",revid:revIDs[rev]}).done(function (data){
					rev++;
					patrolAndAccept();
					return;
				}).fail(function (code, data){
					console.log("Failed to accept revision " + revIDs[rev] + ". Reason: " + code);
					rev++;
					patrolAndAccept();
					return;
				});
			}).fail(function (code, data){
				console.log("Failed to patrol revision " + revIDs[rev] + "; moving on without attempting to accept. Reason: " + code);
				rev++;
				patrolAndAccept();
				return;
			});
		}
		getRevisions();
	});
});