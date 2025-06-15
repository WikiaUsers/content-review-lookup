/* Any JavaScript here will be loaded for sysops only */

/*
-- Script information can be found on these pages respectively --
https://dev.fandom.com/wiki/UploadMultipleFiles
https://dev.fandom.com/wiki/QuickDiff
https://dev.fandom.com/wiki/PortableCSSPad
https://dev.fandom.com/wiki/PreloadFileDescription
https://dev.fandom.com/wiki/AjaxBatchDelete
*/

if (mw.config.get('wgUserGroups').includes('sysop')) {
	PFD_license = 'Fairuse';
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:UploadMultipleFiles.js',
			'u:dev:MediaWiki:QuickDiff/code.js',
			'u:dev:MediaWiki:PortableCSSPad/code.js',
			'u:dev:MediaWiki:PreloadFileDescription.js',
			'u:dev:MediaWiki:AjaxBatchDelete.js'
		]
	});
}