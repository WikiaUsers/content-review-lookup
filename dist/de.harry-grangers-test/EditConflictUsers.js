$('#ca-edit, #ca-ve-edit').click(function(e) {
	var isVE = $(this).attr('id') === 'ca-ve-edit';
	e.preventDefault();
	currentEditors = {};
	$.get(mw.util.getUrl(wgPageName + '/editlog',{action:'raw'}),function(res) {
		res.split('\n').forEach(function(entry) {
			curr = entry.split(': ');
			currentEditors[curr[0]] = parseInt(curr[1]);
        });
		editorCount = Object.keys(currentEditors).length;
		if(!!editorCount) {
			console.log(editorCount,'editors','\nload modal...');
			require(['jquery', 'wikia.ui.factory'], function ($, uiFactory) {
                'use strict';

                var modalContent;

                function getModalConfig() {
                    return {
                        type: 'default',
                        vars: {
                            id: 'discussionsbiomodal',
                            size: 'small',
                            content: getModalContent(),
                            class: 'styleguide-example-content-size',
                            title: 'Possible Edit conflict',
                            buttons: [
                                {
                                    vars: {
                                        value: 'OK',
                                        classes: ['normal', 'primary'],
                                        data: [
                                            {
                                                key: 'event',
                                                value: 'ok'
                                            }
                                        ]
                                    }
                                },
                                {
                                    'vars': {
                                        value: 'Cancel',
                                        data: [
                                            {
                                                key: 'event',
                                                value: 'close'
                                            }
                                        ]
                                    }

                                }
                            ]
                        }
                    };
                }

                function getModalContent() {
                    if (modalContent == null) {
                        modalContent = $('<div />').html(
                            editorCount + ' user(s) currently editing this article. This may cause edit conflicts when saving it.'
                        );
                    }
                    return '<p>' + modalContent.html() + '</p>';
                }

                function showModal(uiModal, modalConfig, callback) {
                    if (typeof callback !== 'function') {
                        callback = function (demoModal) {
                            demoModal.bind('ok', function (event) {
								$.post(mw.util.wikiScript('api'),{
                                    action: 'edit',
                                    title: wgPageName + '/editlog',
                                    summary: 'log edit start',
                                    appendtext: wgUserName + ': ' + Date.now() + '\n',
                                    token: mw.user.tokens.get('editToken'),
                                    format: 'json'
                                },function(res) {
                                    if(res.edit.result === 'Success') {
                                        var params = {};
                                        params[(isVE ? 've' : '') + 'action'] = 'edit';
                                        window.location.href = mw.util.getUrl(wgPageName,params);
                                    }
                                },'json');
                            });
                            demoModal.show();
                        };
                    }
                    uiModal.createComponent(modalConfig, callback);
                }

                uiFactory.init('modal').then(function (uiModal) {
                    showModal(uiModal, getModalConfig());
                });
            });
        }
		console.log(currentEditors);
    });
});