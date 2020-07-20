if (wgNamespaceNumber === 1201) {
	$('.page-header__title').dblclick(function() {
    	threadTitle = $('.page-header__title')
        threadTitle.hide();
        threadTitle.after(
            $('<input />',{class: 'page-header__title-edit', type: 'text', value: threadTitle.text()}).css('font-size','1.2em'),
            $('<button />',{class: 'wikia-button page-header__title-save', text: 'Save'}).click(function() {
                newTitle = $('.page-header__title-edit').val();
                threadId = $('.Wall.Thread > ul.comments > li.message').data('id');
                $.nirvana.postJson('WallExternal','editMessage',{
                    msgid: threadId,
                    pagetitle: wgTitle,
                    pagenamespace: 1201,
                    convertToFormat: 'wikitext'
                },function(res) {	
                    $.nirvana.postJson('WallExternal','editMessageSave',{
                        msgid: threadId,
                        newtitle: newTitle,
                        newbody: res.htmlorwikitext,
                        isreply: false,
                        pagetitle: wgTitle,
                        pagenamespace: 1201,
                        token: mw.user.tokens.get('editToken')
                    },function() {
						endEdit(newTitle);
                    });
                });
            }),
			$('<button />',{class: 'page-header__title-cancel wikia-button secondary', text: 'cancel'}).click(function() {
				endEdit(threadTitle.text());
            })
        );
    });
}

function endEdit(title) {
    threadTitle.text(title);
    threadTitle.show();
    $('.page-header__title-edit, .page-header__title-save, .page-header__title-cancel').remove();
}