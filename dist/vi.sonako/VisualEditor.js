//Visual Editor Replace
//Translations
mw.messages.set({
	've-SearchAndReplaceDialog-title': 'Search and replace',
	've-SearchAndReplaceDialog-from-label': 'From:',
	've-SearchAndReplaceDialog-to-label': 'To:',
	've-SearchAndReplaceDialog-from-placeholder': 'From text',
	've-SearchAndReplaceDialog-to-placeholder': 'To text',
	've-SearchAndReplaceDialog-replaceAll': 'Replace all',
	've-SearchAndReplaceDialog-replace': 'Replace',
	've-SearchAndReplaceDialog-matchcase': 'Match case',
	've-SearchAndReplaceDialog-replace-complete': 'Found and replaced $1 occurrences',
	've-ReplaceTool-ToolbarButton': 'Replace'
});
//end of translations
mw.loader.using( 'ext.visualEditor.desktopArticleTarget.init', function(){
	mw.libs.ve.addPlugin( function() { 
		return $.getScript('https://en.wikipedia.org/w/index.php?title=User:ערן/veReplace.js&action=raw&ctype=text/javascript'); 
	} );
});

mw.loader.load('//en.wikipedia.org/w/index.php?title=User:Eran/refToolbarVeLoader.js&action=raw&ctype=text/javascript');