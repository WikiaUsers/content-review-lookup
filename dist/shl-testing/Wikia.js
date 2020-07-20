// Edit screen: Add "history" and "what links here"
if (mw.config.get('wgAction') === "edit" || mw.config.get('wgAction')=== "submit") {
			$('#wpDiff').parent().after('<li><a href="/index.php?title=' + encodedPagename + '&action=history">' + msg('history') + '</a></li><li><a href="/wiki/Special:WhatLinksHere/' + encodedPagename + '">' + msg('whatLinksHere') + '</a></li>' + '</a></li><li><a href="/wiki/Special:Log/' + encodedPagename + '">' + msg('Logs') + '</a></li>');
		}