$( function () {
	if(mw.config.get('wgTitle') != 'Gadgets-definition') {
		return;
	}
	
	var splitText = '\n<!-- START SYNC -->';
	var newText;
	var cw = 0;
	var thisWiki = mw.config.get('wgServerName');
	var pages = []; // will be actual page list
	
	var getGDContents = function(apipath) {
		return apipath.get({
			action:'query',
			prop:'revisions',
			rvprop:'content',
			rvlimit:1,
			titles:'MediaWiki:Gadgets-definition'
		}).then(function(data){
			var gdtext;
			if (data.query.pages['-1'] != undefined) {
				gdtext = '';
			}
			else {
				for (p in data.query.pages) { // loop of one thing
					gdtext = data.query.pages[p].revisions[0]['*'];
				}
			}
			return gdtext;
		}, function(code, data) {
			return 'Could not get data. Reason: ' + code;
		});
	}
	
	var updateGDPage = function() {
		if (cw == allWikis.length) {
			cw = 0;
			return $.Deferred().resolve();
		}
		if (allWikis[cw]+".gamepedia.com" == thisWiki) { 
			cw++;
			return updateGDPage();
		}
		var fa = new mw.ForeignApi("https://"+allWikis[cw]+".gamepedia.com/api.php");
		return getGDContents(fa).then(function(gdtext) {
			var oldtext = gdtext.split(splitText)[0];
			return fa.postWithToken('csrf', {
				action:'edit',
				title:'MediaWiki:Gadgets-definition',
				text:oldtext + splitText + newText
			}).then(function() {
				console.log('Saved gadget definition page on wiki ' + allWikis[cw]);
				cw++;
				return updateGDPage();
			}, function(code, data) {
				console.log('Saving gadget page failed on wiki ' + allWikis[cw] + ', reason: ' + code);
				cw++;
				return updateGDPage();
			});
		}, function(error) {
			console.log(error);
			cw++;
			return updateGDPage();
		});
	}
	
	$(mw.util.addPortletLink(
		'p-cactions',
		'javascript:;',
		'!Sync Gadgets',
		'ca-sync-gadgets',
		'Sync Gadgets'
	)).click(function() {
		if (! confirm('Proceed? Check console to see progress. It will take a while.')) {
			return;
		}
		var gadgets = []; // gadgets without Mediawiki:Gadget- prefix
		var a = new mw.Api();
		getGDContents(a).then(function(gdtext) {
			newText = gdtext.split(splitText)[1];
			lines = newText.split('\n');
			for (l in lines) {
				line = lines[l];
				// ignore lines that are comments or headings
				if (line.charAt(0) == '*') {
					gadgets.push(line.match(/\* (\w+)/)[1]);
					var regex = /\|(\w*\.(?:css|js))/g;
					while (matches = regex.exec(line)) {
						gadgets.push(matches[1]);
					}
				}
			}
			for (g in gadgets) {
				pages.push('MediaWiki:Gadget-' + gadgets[g]);
			}
		})
		.then(updateGDPage)
		.then(function() {
			syncPages(pages, 'Automatically syncing global gadgets across wikis');
		})
		.fail(function(error) {
			console.log(error);
		});
	});
	return;
});