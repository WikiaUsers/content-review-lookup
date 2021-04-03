$.when( mw.loader.using( 'mediawiki.util' ), $.ready ).then( function () { 
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Patrol All 2', 'ca-patrol-all2', 'Patrol & accept all revisions of this page')).click(function() {
		var max = prompt('How many revisions?');
		if (! max) {
			console.log('user terminated process');
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
			return a.get({action:"query",prop:"revisions",titles:fulltitle,rvprop:"ids",rvlimit:max}).then(function (data){
				for (p in data.query.pages) {
					page = data.query.pages[p]
					for (r in page.revisions) {
						revIDs.push(page.revisions[r].revid);
					}
				}
				return;
			}, function (data){
				console.log("Failed to get revisions");
				return;
			});
		}
		
		function patrol() {
			if (rev == revIDs.length) {
				console.log("Done!");
				return $.Deferred().resolve();
			}
			return a.postWithToken("patrol",{action:"patrol",revid:revIDs[rev]}).done(function (data){
				rev++;
				return patrol();
			}).fail(function (code, data){
				console.log("Failed to patrol revision " + revIDs[rev] + "; moving on without attempting to accept. Reason: " + code);
				rev++;
				return patrol();
			});
		}
		getRevisions().then(patrol).then(function() {
			alert('Done!');
		});
	});
});