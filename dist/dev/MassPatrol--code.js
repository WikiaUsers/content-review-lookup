/*
 * Name:         MassPatrol
 * Description:  Allows to massively patrol edits
 * Author:       Rendann
 * Support:      Aenn, BertH, Your Own Waifu
 * Files used:   [[File:Facebook throbber.gif]]
 * Scripts used:
 * https://dev.wikia.com/wiki/MediaWiki:AjaxPatrol/code.js
 */
(function ($, mw) {
	'use strict';
	//Load Protection
	if (window.MassPatrolLoaded) return;
	window.MassPatrolLoaded = true;

	//Load I18n-js
	importArticle({
		type:'script',
		article:'u:dev:MediaWiki:I18n-js/code.js'
	});
	var preloads = 2;
	//Prepare PageCfg
	var pageConfig = mw.config.get(['wgDiffOldId','wgDiffNewId','wgPageName','wgAction']);

	function init(i18n) {
		var api = new mw.Api();
		var MassPatrol = {
			revids:[],
			patroltoken:'',
			total:0,
			init: function () {
				//Not on Diff page or History Page
				if (pageConfig.wgDiffNewId===null && pageConfig.wgAction!=='history') { return; }

				//Load API
				api.get({
					format: 'json',
					action: 'query',
					list: 'recentchanges',
					rcprop: 'ids|patrolled',
					rcdir: 'newer',
					rclimit: 'max',
					rctitle: pageConfig.wgPageName,
					meta: 'tokens',
					type: 'patrol'
				}).then(MassPatrol.apiLoad);
			},
			apiLoad: function(data) {
				//Grab RC into array
				var rcArray = data.query.recentchanges;
				//If history page, fork off
				if (pageConfig.wgAction==='history') {
					return MassPatrol.history(rcArray.filter(function(e){
						return !('patrolled' in e);
					}));
				}
				
				//Bulk of Mass Patrol Code
				MassPatrol.patroltoken = data.query.tokens.patroltoken;
				var capture = false;
				for (var i = 0; i < rcArray.length; i++) {
					var each = rcArray[i];

					if (each.revid >= (pageConfig.wgDiffOldId || 0))
						capture = true; //Start Capture
					if (capture && !('patrolled' in each)) //Capturing starts, and unpatrolled
						MassPatrol.revids.push(each.revid);
					if (each.revid >= pageConfig.wgDiffNewId)
						break; //End Early
				}

				//Set max patrol length (for end counter: will be shift-ing this array)
				MassPatrol.total = MassPatrol.revids.length;

				//Build HTML For Mass Patrol Button
				var button = $('<span>', {
					id: 'massPatrol'
				}).append('[',$('<a>',{
					href:'#',
					text:i18n.msg('patrol').plain()
				}),']');
				
				// Cannot be added directly to the button as it will not render in new page edits
				document.addEventListener('click', function(event){
					if (event.target && event.target.closest('#massPatrol') && document.querySelector('#massPatrol a')){
						event.preventDefault();
						document.querySelector('#massPatrol a').outerHTML = '<img src="//images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif"' +
							'style="vertical-align: baseline;" border="0" alt=' + i18n.msg('patrolling').escape() + '/>';
						MassPatrol.patrolRecursive();
					}
				});

				//Can Patrol, and Has at least 1 Patrol, apply built HTML
				if (MassPatrol.patroltoken.length>2 && MassPatrol.total >= 1)
					$('#mw-diff-ntitle4').append(' ',button);
			},
			history:function(data){
				var unpatrolled = $('<abbr>',{
					class:'unpatrolled',
					title:'This edit has not yet been patrolled',
					text:'\xa0!\xa0'
				});
				var obj = $('li[data-mw-revid]').filter(function(i,obj){
					return data.find(function(e){
					    return e.revid == $(obj).data('mw-revid');
					});
				}).prepend(unpatrolled);
			},
			patrolRecursive: function() {
				if (MassPatrol.revids.length === 0) {
					return $('#massPatrol').text('['+i18n.msg('patrolled',MassPatrol.total).plain()+']');
				}
				api.post({
					action: 'patrol',
					format: 'json',
					revid: MassPatrol.revids.shift(),
					token: MassPatrol.patroltoken
				}).then(MassPatrol.patrolRecursive);
			}
		};
		MassPatrol.init();
	}
	function preload() {
		if (--preloads > 0) return;
		window.dev.i18n.loadMessages('MassPatrol').done(init);
	}
	// Add Hook when finish loading I18n-js and API is ready for use
	mw.loader.using('mediawiki.api').then(preload);
	mw.hook('dev.i18n').add(preload);

})(window.jQuery, window.mediaWiki);