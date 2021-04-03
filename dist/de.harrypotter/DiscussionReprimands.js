importArticle({
    type: "style",
    article: "MediaWiki:DiscussionReprimands.css"
});
 
if(!window.hasOwnProperty('dev')) {
    window.dev = {};
}
if(!window.dev.hasOwnProperty('discussions')) {
    window.dev.discussions = {};
}
if(!window.dev.discussions.hasOwnProperty('reprimands')) {
    window.dev.discussions.reprimands = {};
}
if(!window.dev.discussions.reprimands.hasOwnProperty('page')) {
    window.dev.discussions.reprimands.page = mw.config.get('wgFormattedNamespaces')[4] + ':Reprimands';
}
if(mw.config.get('wgPageName') === window.dev.discussions.reprimands.page.replace(/ /g, '_') && mw.config.get('wgAction') === 'view') {
    $.getJSON(mw.util.wikiScript('api'),{
    	action: 'query',
    	prop: 'revisions',
    	rvprop: 'content',
    	titles: 'MediaWiki:Custom-DiscussionReprimands.json',
    	format: 'json',
    	indexpageids: true,
    	q: Math.random()
    }, function(res) {
		window.dev.discussions.reprimands.reprimands = JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']);
    	displayReprimands();
    });
}
 
function displayReprimands() {
	//var reprimands = window.dev.discussions.reprimands.reprimands.map(function(a) { return Object.assign({}, a)});
	var reprimands = JSON.parse(JSON.stringify(window.dev.discussions.reprimands.reprimands));
	console.log('reprimands', reprimands);
    mw.util.$content.empty().append(
    	$('<table />', { class: 'wikitable' }).append(
    		$('<thead />').append(
    			$('<tr />').append(
                	$('<th />', { text: 'Username' }),
                	$('<th />', { text: 'Reprimand' }),
                	$('<th />', { text: 'Date' }),
                	$('<th />', { text: 'Reason' }),
                	$('<th />', { text: 'Actions' })
    			)
    		),
    		$('<tbody />', { class: 'reprimand-list' })
    	)
    );
	reprimands.forEach(function(reprimand, idx) {
	    var count = reprimand.reprimands.length;
	    var sum = reprimand.reprimands.reduce(function(a,b) {
	        return a + b.level;
	    },0);
	    var tr = $('<tr />').append(
            $('<td />', { rowspan: count }).append(
                $('<a />',{
                    href: mw.util.getUrl('User:' + reprimand.username),
                    text: reprimand.username
                })    
            ),
            $('<td />', { rowspan: count, text: sum }),
            $('<td />'),
            $('<td />'),
            $('<td />')
        ).appendTo($('.reprimand-list'));
        if(count >= 1) {
            tr.find('> :nth-child(3)').append(
				$('<time />', {
					class: 'discussions-reprimand-date',
					text: reprimand.reprimands[0].date,
					datetime: reprimand.reprimands[0].date
				})
			);
            tr.find('> :nth-child(4)').text(reprimand.reprimands[0].reason);
			actionDropdown(tr,reprimand.reprimands[0].id,reprimand.name);
            reprimand.reprimands.shift();
        } 
        if(count > 1) {
            reprimand.reprimands.forEach(function(entry, idx) {
                tr = $('<tr />').append(
                    $('<td />').append(
                        $('<time />', { class: 'discussions-reprimand-date', text: entry.date, datetime: entry.date })
                    ),
                    $('<td />', { text: entry.reason }),
					$('<td />')
                ).appendTo($('.reprimand-list'));
				actionDropdown(tr, entry.id, reprimand.name);
            });
        }
    });
	$('.discussions-reprimand-date').timeago();
}
 
function actionDropdown(tr, id, username) {
	if(mw.config.get('wgUserGroups').includes('sysop') || mw.config.get('wgUserGroups').includes('threadmoderator')) {
        tr.find('> :last-child').append(
            $('<div />', { class: 'wds-dropdown' }).append(
                $('<button />', { class: 'wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle' }).append(				
                    $('<span />', { text: 'Actions' }),
                    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg>'
                ),
                $('<div />', { class: 'wds-dropdown__content' }).append(
                    $('<ul />', { class: 'wds-list' }).append(
                        $('<li />').append(
                            $('<a />', { text: 'Edit' }).click(editReprimand.bind(this, id))
                        ),		
                        $('<li />').append(
                            $('<a />', { text: 'Delete' }).click(deleteReprimand.bind(this, id))
                        ),		
                        $('<li />').append(
                            $('<a />', { text: 'Add' }).click(addReprimand.bind(this, username))
                        )
                    )
                )
            )
        );
    }
}
 
function deleteReprimand(id) {
	console.log('delete', id);
}
 
function editReprimand(id) {
	var reprimand = _.filter(window.dev.discussions.reprimands.reprimands, function(rep) {
		console.log(rep,rep.reprimands,id,_.some(rep.reprimands, { id: id }));
        return _.some(rep.reprimands, { id: id });
    });
	if(typeof id === 'undefined' || !!reprimand.length) {
		openModal(typeof id === 'undefined' ? null : reprimand[0]);
    }
}
 
function addReprimand(user) {
	console.log('add new reprimand for', user);
}
 
function saveReprimand(id) {
	var isNew = typeof id === 'undefined';
	console.log(isNew ? 'new' : 'existing');
}

function getReprimand() {
	var reprimand = _.filter(window.dev.discussions.reprimands.reprimands, function(rep) {
		console.log(rep.reprimands, id);
        return _.some(rep.reprimands, { id: id });
    });
}

function reprimandCount(username) {
	var match = _.findWhere(window.dev.discussions.reprimands.reprimands, username);
	reprimand.reprimands.reduce(function(a,b) {
        return a + b.level;
    },0);
}
 
function openModal(reprimand) {
    require(['jquery', 'wikia.ui.factory'], function ($, uiFactory) {
        'use strict';
 
        function getModalConfig() {
            return {
                type: 'default',
                vars: {
                    id: 'discussions-reprimand-modal',
                    size: 'small',
                    content: getModalContent(),
                    class: 'styleguide-example-content-size',
                    title: 'Edit ',
                    buttons: [
                        {
                            vars: {
                                value: 'Submit',
                                classes: ['normal', 'primary'],
                                data: [
                                    {
                                        key: 'event',
                                        value: 'ok'
                                    }
                                ]
                            }
                        },{
                            vars: {
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
            var modalContent = $('<div />').append(
				$('<form />', { class: 'discussions-reprimand-form' }).append(
                    $('<div />', { class: 'form-field' }).append(
                        $('<label />', { for: 'reprimand-username', text: 'Username' }),
                        $('<input />', { type: 'text', id:'reprimand-username' })
                    ),
                    $('<div />', { class: 'form-field'}).append(
                        $('<label />', { for: 'reprimand-level', text: 'Level' }),
                        $('<input />', { type: 'number', id:'reprimand-level' })
                    ),
                    $('<div />', { class: 'form-field' }).append(
                        $('<label />', { for: 'reprimand-reason', text: 'Reason' }),
                        $('<input />', { type: 'text', id:'reprimand-reason' })
                    ),
                    $('<div />', { class: 'form-field' }).append(
                        $('<input />', { type: 'hidden', id: 'reprimand-id', value: null })
                    ),
                    $('<div />', { class: 'form-field' }).append(
                        $('<input />', { type: 'hidden', id: 'reprimand-by', value: mw.config.get('wgUserName') })
                    ),
                    $('<div />', { class: 'form-field' }).append(
                        $('<input />', { type: 'hidden', id: 'reprimand-date', value: (new Date()).toISOString() })
                    )
				)
            );
            return '<p>' + modalContent.html() + '</p>';
        }

		function formToJSON() {
			return _.indexBy($('.discussions-reprimand-form > .form-field').map(function() {
                var res = {};
                res.label = $(this).find('label').text();
				var input = $(this).find('input');
                res.id = input.attr('id').split('-')[1];
                res.val = input.val();
				if(input.attr('type') === 'number') {
					res.val = parseInt(res.val);
                }
                return res;
            }).get(), 'id');
        }

		function fillForm(reprimand) {
			$('.discussions-reprimand-form > .form-field').each(function() {
				//var input = 
				//if($(this).find('input').val(reprimand
            });
        }
 
        function showModal(uiModal, modalConfig, callback) {
            if (typeof callback !== 'function') {
                callback = function (demoModal) {
                    demoModal.show();

					if(reprimand != null) {
						console.log('THESE VALUES', reprimand);
                    }

                    demoModal.bind('ok', function (event) {
                        event.preventDefault();
                        var fields = formToJSON();
                        console.log(fields);
                        //saveReprimand();
                    });
                };
            }
            uiModal.createComponent(modalConfig, callback);
        }
 
        uiFactory.init('modal').then(function(uiModal) {
            showModal(uiModal, getModalConfig());
        });
    });
}