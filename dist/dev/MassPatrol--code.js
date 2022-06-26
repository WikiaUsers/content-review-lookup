/*
 * Name:         MassPatrol
 * Description:  Allows to massively patrol edits
 * Author:       Rendann
 * Support:      Aenn, BertH, Your Own Waifu
 * Files used:   [[File:Facebook throbber.gif]]
 * Scripts used:
 * https://dev.wikia.com/wiki/MediaWiki:AjaxPatrol/code.js
 */
(function (window, $, mw) {
	'use strict';
	//Load Protection
	if (window.MassPatrolLoaded) return;
	window.MassPatrolLoaded = true;

	//Load I18n-js
	importArticle({type:'script',article:'u:dev:MediaWiki:I18n-js/code.js'});
	//Prepare PageCfg
	var pageConfig = mw.config.get(["wgScriptPath","wgDiffOldId","wgDiffNewId","wgPageName","wgAction"]);

	function init(i18n) {
		var MassPatrol = {
			rcids:[],
			patroltoken:"",
			total:0,
			init: function () {
				//Not on Diff page or History Page
				if (pageConfig.wgDiffNewId===null && pageConfig.wgAction!=='history') return;

				//Load API
				$.get(pageConfig.wgScriptPath+"/api.php",{
					format:"json",
					action:"query",
					list:"recentchanges",
					rcprop:"ids|patrolled",
					rcdir:"newer",
					rclimit:"max",
					rctitle:pageConfig.wgPageName,
					meta:"tokens",
					type:"patrol"
				},MassPatrol.apiLoad);
			},
			apiLoad: function(data) {
				//Grab RC into array
				var rcArray = data.query.recentchanges;
				//If history page, fork off
				if (pageConfig.wgAction==='history')
					return MassPatrol.history(rcArray.filter(function(e){
						return !("patrolled" in e);
					}));

				//Bulk of Mass Patrol Code
				MassPatrol.patroltoken = data.query.tokens.patroltoken;
				var curr_patrol = false;
				var capture = false;
				for (var i = 0; i < rcArray.length; i++) {
					var each = rcArray[i];

					if (each.revid >= pageConfig.wgDiffOldId)
						capture = true; //Start Capture
					if (capture && !("patrolled" in each)) //Capturing starts, and unpatrolled
						MassPatrol.rcids.push(each.rcid);
					if (each.revid >= pageConfig.wgDiffNewId)
						break; //End Early
				}

				//Set max patrol length (for end counter: will be shift-ing this array)
				MassPatrol.total = MassPatrol.rcids.length;

				//Build HTML For Mass Patrol Button
				var button = $('<span>', {
					id: 'massPatrol'
				}).append('[',$('<a>',{
					href:'#',
					text:i18n.msg('patrol').plain(),
					click:function(event){
						event.preventDefault();
						$(this).replaceWith('<img src="//images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif"' +
							'style="vertical-align: baseline;" border="0" alt=' + i18n.msg('patrolling').escape() + '/>');
						MassPatrol.patrolRecursive();
					}
				}),']');

				//Can Patrol, and Has at least 1 Patrol, apply built HTML
				if (MassPatrol.patroltoken.length>2 && MassPatrol.total >= 1)
					$("#mw-diff-ntitle4").append(' ',button);
			},
			history:function(data){
				var unpatrolled = $('<abbr>',{
					class:"unpatrolled",
					title:"This edit has not yet been patrolled",
					text:"\xa0!\xa0"
				});
				var obj = $('li[data-mw-revid]').filter(function(i,obj){
					return data.find(function(e){
					    return e.revid == $(obj).data('mw-revid');
					});
				}).prepend(unpatrolled);
			},
			patrolRecursive: function() {
				if (MassPatrol.rcids.length === 0)
					return $("#massPatrol").text("["+i18n.msg('patrolled',MassPatrol.total).plain()+"]");
				$.post(pageConfig.wgScriptPath+"/api.php?format=json&action=patrol",{
					rcid:MassPatrol.rcids.shift(),
					token:MassPatrol.patroltoken
				},MassPatrol.patrolRecursive);
			}
		};
		MassPatrol.init();
	}
	//Add Hook when finish loading I18n-js
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('MassPatrol').then(init);
	});
})(this,jQuery, mediaWiki);