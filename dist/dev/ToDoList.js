/**
 * @title ToDoList
 * @version v2.1
 * @author DarkBarbarian
 * @description Lets you edit and view your local to do page without leaving the current page
 * The init and preload functions are inspired by https://dev.fandom.com/wiki/MediaWiki:AjaxBatchDelete.js?oldid=120334
 */

mw.loader.using('mediawiki.api', function() {
	"use strict";
	
	if (window.toDoListLoaded) {
		return;
	}
	window.toDoListLoaded = true;
	
	var api = new mw.Api(),
		i18n,
		placement,
		preloads = 3,
		user = mw.config.get('wgUserName');
		
	var toDoList = $.extend({
		page: 'User:' + user + '/To do',
		height: '35em',
		width: 400
	}, window.toDoList);
	
	function preload() {
		if (--preloads === 0) {
			placement = window.dev.placement.loader;
			window.dev.i18n.loadMessages('ToDoList').then(init);
		}
	}
	
	function init(i18nData) {
		i18n = i18nData;
		placement.script('ToDoList');
		$(placement.element('toolbar'))[placement.type('append')](
			$('<li>').append(
				$('<a>', {
					click: showToDoModal,
					id: 'toDoButton',
					style: 'cursor: pointer !important;',
					text: i18n.msg('toolbarTitle').plain()
				})
			)
		);
	}
	
	function notification(type, text) {
		mw.hook('dev.banners').add(function(BannerNotification) {
			new BannerNotification(text, type, undefined, 3000).show();
		});
	}
	
	function showToDoModal () {
		dev.showCustomModal(i18n.msg('title').escape(), {
			content: '<textarea id="toDoText" style="height:' + toDoList.height + '; width: 100%;"></textarea>',
			buttons: [
				{
					message: i18n.msg('updateButton').escape(),
					defaultButton: true,
					handler: updateToDoList
				},{
					message: i18n.msg('refreshButton').escape(),
					defaultButton: true,
					handler: getToDoList
				},{
					message: i18n.msg('linkButton').escape(),
					defaultButton: false,
					id: 'toDoLinkButton',
					handler: function() {
						window.location.href = mw.util.getUrl(toDoList.page);
					}
				}
			],
			id: 'toDoModal',
			width: toDoList.width
		});
		
		$('#toDoLinkButton')[0].title = i18n.msg('linkDesc', toDoList.page).plain();
		getToDoList();
	}
	
	function getToDoList() {
		api.get({
			action: 'query',
			titles: toDoList.page,
			prop: 'revisions',
			rvslots: '*',
			rvprop: 'content'
		}).done(function(d) {
			if (!d.error) {
				var data = d.query;
				for (var i in data.pages) {
					if (data.pages[i].missing !== undefined) {
						notification('error', i18n.msg('pageDoesNotExist', toDoList.page).plain());
						return;
					}
					
					$('#toDoText').val(data.pages[i].revisions[0].slots.main['*']);
					notification('confirm', i18n.msg('retrievedContents').plain());
					break;
				}
			} else {
				notification('error', i18n.msg('errorWhileRetrieving').plain());
			}
		}).fail(function() {
			notification('error', i18n.msg('errorWhileRetrieving').plain());
		});
	}
	
	function updateToDoList() {
		if ($('#toDoText').val().length === 0) {
			if (!confirm(i18n.msg('emptyThePage').plain())) {
				return;
			}
		}
		
		var token = mw.user.tokens.get('csrfToken');
		api.post({
			action: 'edit',
			title: toDoList.page,
			text: $('#toDoText').val(),
			token: token
		}).done(function(d) {
			if (!d.error) {
				notification('confirm', i18n.msg('updatedPage').plain());
			} else {
				notification('error', i18n.msg('errorWhileUpdating').plain());
			}
		}).fail(function() {
			notification('error', i18n.msg('errorWhileUpdating').plain());
		});
	}
	
	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.showCustomModal').add(preload);
	mw.hook('dev.placement').add(preload);
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:ShowCustomModal.js',
			'u:dev:MediaWiki:Placement.js',
			'u:dev:MediaWiki:BannerNotification.js'
		]
	});
});