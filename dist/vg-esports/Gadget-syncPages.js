window.allWikis = ['lol', 'cod-esports', 'fortnite-esports', 'teamfighttactics', 'smite-esports', 'halo-esports', 'rl-esports', 'vg-esports', 'gears-esports', 'pubg-esports', 'paladins-esports', 'siege-esports', 'nba2k-esports', 'default-loadout-esports', 'esports', 'commons-esports', 'fifa-esports', 'apexlegends-esports'];

window.syncPages = function(sourcePages) {
	var a = new mw.Api();
	var fa;
	var cp = 0; // current page
	var cw = 0; // current wiki
	var sourcePageInfo = [];
	var editsummary = 'Automatically syncing global gadgets across wikis';
	
	function getPage() {
		if (cp==sourcePages.length) { 
			cp = 0;
			console.log('Done fetching pages');
			nextWiki();
			return;
		}
		var thispage = sourcePages[cp];
		a.get({action:"query",prop:"info|revisions",inprop:"protection",rvprop:"content",rvlimit:1,titles:thispage}).done(function (data) {
			if (data.query.pages["-1"] != undefined) {
				console.log("Page "+thispage+" not found.");
				cp++;
				getPage();
				return;
			}
			cont = "";
			prot = [];
			for (p in data.query.pages) {
				cont = data.query.pages[p].revisions[0]["*"];
				prot = data.query.pages[p].protection;
			}
			sourcePageInfo.push({name:thispage,content:cont,protection:prot});
			cp++;
			getPage();
		}).fail(function(code, result) {
			console.log("Could not load data for page " + thispage);
			cp++;
			getPage();
		});
	}
	
	function nextWiki() {
		if (cw == allWikis.length) {
			console.log("Done!");
			return $.Deferred().resolve();
		}
		if (allWikis[cw]+".gamepedia.com" == mw.config.get("wgServerName")) { 
			cw++;
			nextWiki();
			return;
		}
		console.log("Starting next wiki: " + allWikis[cw]);
		fa = new mw.ForeignApi("https://"+allWikis[cw]+".gamepedia.com/api.php");
		editPage();
		return;
	}
	
	function editPage() {
		if (cp == sourcePageInfo.length) {
			cw++;
			cp = 0;
			nextWiki();
			return;
		}
		
		if (sourcePageInfo[cp].content == "") {
			console.log("Content for page "+sourcePageInfo[cp].name+" was not stored correctly from the source wiki; skipping");
			cp++;
			editPage();
			return;
		}
		
		fa.postWithToken('csrf',{action:"edit",title:sourcePageInfo[cp].name,text:sourcePageInfo[cp].content,summary:editsummary,minor:1}).done(function(data) { 
			if (sourcePageInfo[cp].protection.length>0) {
				prot = "";
				expr = "";
				for (i=0;i<sourcePageInfo[cp].protection.length;i++) {
					if (i>0) {
						prot += "|";
						expr += "|"; 
					}
					prot += sourcePageInfo[cp].protection[i].type+"="+sourcePageInfo[cp].protection[i].level;
					expr += sourcePageInfo[cp].protection[i].expiry;
				}
				fa.postWithToken('csrf',{action:"protect",title:sourcePageInfo[cp].name,protections:prot,expiry:expr,reason:editsummary}).done(function(d){
					cp++;
					editPage();
				}).fail(function(code, result){
					console.log("Could not protect page "+sourcePageInfo[cp].name+" on wiki "+allWikis[cw] + ", code: " + code);
					cp++;
					editPage();
				});			
			}
			else {
				cp++;
				editPage();
			}
		}).fail(function(code, result) {
			console.log("Could not edit page "+sourcePageInfo[cp].name+" on wiki "+allWikis[cw] + ", code: " + code);
			cp++;
			editPage();
		});
	}
	getPage();
}