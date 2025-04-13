/**
 * @title ToDoList
 * @version v3
 * @authorv1-2 DarkBarbarian
 * @authorv3 AnAmanLyetNye
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
        content: `
            <button id="toggleView" style="margin-bottom: 5px;">${i18n.msg('switchToRaw').escape()}</button>
            <div id="toDoDisplay" style="height:${toDoList.height}; width: 100%; overflow:auto; border:1px solid #ccc; padding:5px;"></div>
            <textarea id="toDoText" style="display:none; height:${toDoList.height}; width: 100%;"></textarea>
        `,
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
    
    let isRawMode = false; // Track the current view mode

    $('#toggleView').on('click', function() {
        isRawMode = !isRawMode; // Toggle mode

        if (isRawMode) {
            $(this).text(i18n.msg('switchToRendered').plain()); // Change button text
            $('#toDoDisplay').hide();
            $('#toDoText').show();
            getRawText(); // Fetch raw text
        } else {
            $(this).text(i18n.msg('switchToRaw').plain()); // Change button text
            $('#toDoText').hide();
            $('#toDoDisplay').show();
            getToDoList(); // Fetch rendered content
        }
    });

    getToDoList(); // Load initial rendered view
}

function getToDoList() {
    api.get({
        action: 'parse',
        page: toDoList.page,
        prop: 'text',
        format: 'json'
    }).done(function(d) {
        if (!d.error) {
            $('#toDoDisplay').html(d.parse.text['*']); // Show rendered content
            notification('confirm', i18n.msg('retrievedContents').plain());
        } else {
            notification('error', i18n.msg('errorWhileRetrieving').plain());
        }
    }).fail(function() {
        notification('error', i18n.msg('errorWhileRetrieving').plain());
    });
}

function getRawText() {
    api.get({
        action: 'query',
        prop: 'revisions',
        titles: toDoList.page,
        rvprop: 'content',
        rvslots: '*',
        format: 'json'
    }).done(function(d) {
        let pages = d.query.pages;
        let pageId = Object.keys(pages)[0];
        
        if (pages[pageId].missing !== undefined) {
            notification('error', i18n.msg('pageDoesNotExist', toDoList.page).plain());
            return;
        }
        
        $('#toDoText').val(pages[pageId].revisions[0].slots.main['*']); // Set text area content
        notification('confirm', i18n.msg('retrievedContents').plain());
    }).fail(function() {
        notification('error', i18n.msg('errorWhileRetrieving').plain());
    });
}

function updateToDoList() {
    let newText = $('#toDoText').val().trim();
    
    if (newText.length === 0 && !confirm(i18n.msg('emptyThePage').plain())) {
        return;
    }

    api.post({
        action: 'edit',
        title: toDoList.page,
        text: newText,
        token: mw.user.tokens.get('csrfToken')
    }).done(function(d) {
        if (!d.error) {
            notification('confirm', i18n.msg('updatedPage').plain());
            getToDoList(); // Reload rendered content after updating
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