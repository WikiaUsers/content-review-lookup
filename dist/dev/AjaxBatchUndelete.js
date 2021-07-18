/*
* Ajax Batch Undelete
* @description unDelete listed multiple pages
* @author Ozuzanna of AjaxBatchDelete
* modified by Noreplyz & Nerfmaster8
*/
 
mw.loader.using('mediawiki.api', function() {
    'use strict';
 
  if (
    window.AjaxBatchUndeleteLoaded ||
    !/sysop|content-moderator|staff|helper|wiki-representative|wiki-specialist|soap/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
  }
  window.AjaxBatchUndeleteLoaded = true;
 
    var i18n,
        placement,
        preloads = 3,
        undeleteModal,
        paused = true;
        
    function preload() {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            window.dev.i18n.loadMessages('AjaxBatchUndelete').then(init);
        }
    }
 
    function init(i18nData) {
        i18n = i18nData;
        placement.script('AjaxBatchUndelete');
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>').append(
                $('<a>', {
                    id: 't-bud',
                    text: i18n.msg('toolsTitle').plain(),
                    click: click
                })
            )
        );        
    }
    
    function click() {
        if (undeleteModal) {
            undeleteModal.show();
            return;
        }
        undeleteModal = new window.dev.modal.Modal({
            content: formHtml(),
            id: 'form-batch-undelete',
            size: 'medium',
            title: i18n.msg('modalTitle').escape(),
            buttons: [
                {
                    id: 'abu-start',
                    text: i18n.msg('initiate').escape(),
                    primary: true,
                    event: 'start'
                },
                {
                    id: 'abu-pause',
                    text: i18n.msg('pause').escape(),
                    primary: true,
                    event: 'pause',
                    disabled: true
                },
                {
                    text: i18n.msg('close').escape(),
                    event: 'close'
                }
            ],
            events: {
                pause: pause,
                start: start
            }
        });
        undeleteModal.create();
        undeleteModal.show();
    }
    
    function formHtml() {
        return $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>').append(
                    $('<label>', {
                        'for': 'undelete-reason',
                        text: i18n.msg('inputReason').plain()
                    }),
                    $('<input>', {
                        type: 'text',
                        name: 'undelete-reason',
                        id: 'undelete-reason'
                    })
                ),
                $('<p>', {
                    text: i18n.msg('inputPages').plain() + ':'
                }),
                $('<textarea>', {
                    id: 'text-batch-undelete'
                }),
                $('<p>', {
                    text: i18n.msg('errorsForm').plain() + ':'
                }),
                $('<div>', {
                    id: 'text-error-output'
                })
            )
        ).prop('outerHTML');
    }
 
    function pause() {
        paused = true;
        document.getElementById('abu-pause').setAttribute('disabled', '');
        document.getElementById('abu-start').removeAttribute('disabled');
    }
 
    function start() {
        if (!document.getElementById('undelete-reason').value) {
            alert(i18n.msg('stateReason').plain());
            return;
        }
        paused = false;
        document.getElementById('abu-start').setAttribute('disabled', '');
        document.getElementById('abu-pause').removeAttribute('disabled');
        process();
    }
 
    function process() {
        if (paused) {
            return;
        }
        var txt = document.getElementById('text-batch-undelete'),
            pages = txt.value.split('\n'),	
            currentPage = pages[0];
        if (!currentPage) {
            $('#text-error-output').append(
                i18n.msg('endMsg').escape() +
                '<br/>'
            );
            pause();
        } else {
            undelete(currentPage, document.getElementById('undelete-reason').value);  
        }
        pages = pages.slice(1, pages.length);
        txt.value = pages.join('\n');
   }
 
    function undelete(page, reason) {
        new mw.Api().post({
            format: 'json',
            action: 'undelete',
            watchlist: 'preferences',
            timestamps: '',
            title: page,
            reason: reason,
            token: mw.user.tokens.get('editToken')
        }).done(function(d) { 
            if (!d.error) {
                console.log(i18n.msg('success', page).escape());
            } else {
                console.log(i18n.msg('failure').escape()+' '+page+': '+ d.error.code);
                $('#text-error-output').append(i18n.msg('failure').escape()+' '+page+': '+d.error.code+'<br/>');
            }
        })
        .fail(function() {
            console.log(i18n.msg('failure').escape()+' '+page);
            $('#text-error-output').append(i18n.msg('failure').escape()+' '+page+'<br/>');
        });
        setTimeout(process, window.batchUndeleteDelay || 1000);
    }
    
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
    mw.hook('dev.placement').add(preload);
 
    importArticles(
        {
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:Placement.js'
            ]
        },
        {
            type: 'style',
            articles: ['u:dev:MediaWiki:AjaxBatchUndelete.css']
        }
    );
    
});