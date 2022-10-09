$(function () { 
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Move To User', 'ca-move-to-user', 'Move to user ns of article creator & null edit', 'z', '#ca-patrol-all')).click(function() {
		clearDisplayColor();
		var reason = prompt("Enter reason for move","This page doesn't meet our notability guidelines or quality standards. Please join our Discord linked in the sidebar if you have any questions!");
		
		if (!reason) {
			return;
		}

		var fulltitle = mw.config.get('wgPageName');
		var a = new mw.Api();
		var subpages = [
			'Tooltip:%s',
			'%s/Tournament Results',
			'%s/Schedule History',
			'%s/Pick-Ban History',
		];
		subpages = subpages.map(function(p) {
			return p.replace('%s', fulltitle);
		});
		
		function getRevisions() {
			return a.get({action:"query",prop:"revisions",titles:fulltitle,rvprop:"ids",rvlimit:"50"}).then(function (data){
				var page = "";
				for (p in data.query.pages) {
					page = data.query.pages[p];
				}
				var revs = page.revisions.map(function(rev) {
					return rev.revid
				});
				return revs;
			}, function (data){
				console.log("Failed to get revisions");
			});
		}
		
		function patrolAndAccept(revs) {
			var patrols = revs.map(function(rev) {
				a.postWithToken("csrf",{action:"patrol",revid:rev});
			});
			var reviews = revs.map(function(rev) {
				a.postWithToken("csrf",{action:"review",revid:rev});
			});
			return Promise.all(patrols)
				.then(Promise.all(reviews))
				.then(function() { console.log('patrolled & accepted!'); });
		}
		
		function getUser() {
			return a.get({action:"query",prop:"revisions",titles:fulltitle,rvprop:"ids|timestamp|user",rvlimit:"1",rvdir:"newer"}).then(function (data) {
				var page = "";
				for (p in data.query.pages) {
					page = data.query.pages[p];
				}
				var user = page.revisions[0].user;
				console.log('user: ', user);
				return "User:" + user + "/" + fulltitle;	
			}, function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to get data");
			});
		}
			
		function checkTarget(title, n) {
			if (!n) n = 0;
			var newTitle = n > 0 ? title + '/' + n : title;
			return a.get({action:"query",prop:"pageprops",titles:newTitle}).then(function (data){
				if (data.query.pages["-1"] == undefined) {
					return checkTarget(title, n + 1);
				}
				return newTitle;
			}, function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to check if target exists");
			});
		}
		
		function movePage(newTitle) {
			return a.postWithToken("csrf",{action:"move",from:fulltitle,to:newTitle,reason:reason,noredirect:"1"}).then(function (data){
				return a.postWithToken("csrf",{action:"edit",title:newTitle,appendtext:"",summary:"blank edit"}).then(function (data){
					displayColor("gadget-action-success");
					console.log("Done!");
				}, function (data){
					displayColor("gadget-action-incomplete");
					console.log("Failed to refresh");
				});
			}, function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to move");
			});
		}
		
		function getContent() {
			return a.get({action:"query",prop:"revisions",titles:fulltitle,rvprop:"ids|timestamp|user",rvlimit:"1",rvdir:"newer"}).then(function (data) {
				var page = "";
				for (p in data.query.pages) {
					page = data.query.pages[p];
				}
				var user = page.revisions[0].user;
				console.log('user: ', user);
				return "User:" + user + "/" + fulltitle;	
			}, function (data){
				displayColor("gadget-action-fail");
				console.log("Failed to get data");
			});
		}
		
		function deleteRedirect() {
			return a.postWithToken('delete', { action:"delete", title:fulltitle })
		}
		
		function findSubpages() {
			return a.get({
				action: "query",
				prop: "pageprops",
				titles: subpages.join('|')
			}).then(function(data) {
				var pagesToDelete = [];
				for (p in data.query.pages) {
					if (p !== "-1") {
						pagesToDelete.push(data.query.pages[p].title);
					}
				}
				console.log(pagesToDelete);
				return pagesToDelete;
			});
		}
		
		function deleteSubpages(pages) {
			var deletions = pages.map(function(p) {
				return a.postWithToken('delete', { action:"delete", title:p });
			});
			return Promise.all(deletions);
		}
		
		return getRevisions()
			.then(patrolAndAccept)
			.then(getUser)
			.then(checkTarget)
			.then(movePage)
			.then(findSubpages)
			.then(deleteSubpages);
	});
});