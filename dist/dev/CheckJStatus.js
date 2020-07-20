/**
 * @name   CheckJStatus
 * @desc   Provides a tool that can check the status of the local JavaScript pages without leaving current page
 * @author Kofirs2634
 * @docs   [[w:c:dev:CheckJStatus]]
 */
$(function() {
    if (window.CheckJSPage || !$('#my-tools-menu').length) return;
    window.CheckJSPage = true;

    const statuses = {
        'live': '#76bf06',
        'approved': '#76bf06',
        'rejected': '#e1390b',
        'awaiting': '#008cce',
        'unsubmitted': '#ffad00',
        'none': '#aaa'
    }, lines = ['latestStatus', 'lastStatus', 'liveStatus'];
    var c = mw.config.get(['wgTitle', 'wgArticlePath']),
        checkJSmodal, i18n, target;

    function makeRequest() {
        $('#cjsm-result').empty();
        target = $('#cjsm-input').val();
        var basePath = 'MediaWiki:' + target + '.js';

        $.nirvana.getJson('ContentReviewApiController', 'renderStatusModal', {
            pageName: basePath
        }, function(data) {
            $('#cjsm-result').append($('<div>', { id: 'cjsm-nav' }));

            // navigation
            $('#cjsm-nav').append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath),
                text: target + '.js'
            })).append($('<span>', { text: ' (' }))
            .append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath + '?action=edit'),
                text: i18n.msg('links-edit').plain()
            })).append($('<span>', { text: ' | ' }))
            .append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath + '?action=raw'),
                text: i18n.msg('links-raw').plain()
            })).append($('<span>', { text: ' | ' }))
            .append($('<a>', {
                href: c.wgArticlePath.replace('$1', basePath + '?action=history'),
                text: i18n.msg('links-history').plain()
            })).append($('<span>', { text: ')' }))

            // lines of status
            for (i = 0; i < 3; i++) {
                var version, type;

                if (!$(data[lines[i]]).find('a').length) version = ''
                else version = $(data[lines[i]]).find('a')[0].innerText;

                type = $(data[lines[i]])[0].className.substr(44);
                if (!type) type = 'none';

                $('#cjsm-result').append($('<div>').css({
                    'border-left': '22px solid ' + statuses[type],
                    'padding-left': '5px',
                    'margin-top': '5px'
                })
                .append($('<span>', { text: i18n.msg(type).plain().split('$1')[0] }))
                .append($('<a>', {
                    text: version,
                    href: c.wgArticlePath.replace('$1', 'Special:Diff/' + version.substr(1))
                })).append($('<span>', { text: i18n.msg(type).plain().split('$1')[1] })))
            }
        })
    }

    function createModal() {
        checkJSmodal = new window.dev.modal.Modal({
            title: i18n.msg('modal-title').plain(),
            content: '<div id="cjsm-container"></div>',
            size: 'small',
            id: 'checkJSmodal',
            buttons: [{
                primary: true,
                text: i18n.msg('check').plain(),
                id: 'cjsm-get',
                event: 'req'
            }, {
                text: i18n.msg('cancel').plain(),
                id: 'cjsm-cancel',
                event: 'close'
            }],
            events: { req: makeRequest }
        })
        checkJSmodal.create();
    }

    $('#my-tools-menu').prepend($('<li>', { 'class': 'custom' })
    .append($('<a>', {
        href: '#',
        text: 'Check JStatus'
    })
    .click(function() {
        checkJSmodal.show();
        $('#cjsm-container').append($('<a>', {
            href: c.wgArticlePath.replace('$1', 'Special:JSPages'),
            text: i18n.msg('all-pages').plain(),
            style: 'float: right'
        }))
        .append($('<span>', {
            text: 'MediaWiki:',
            style: 'font-weight: bold'
        }))
        .append($('<input>', { id: 'cjsm-input' }))
        .append($('<span>', {
            text: '.js',
            style: 'font-weight: bold'
        }))
        .append($('<div>', { id: 'cjsm-result' }))
    })))

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    })
    mw.hook('dev.i18n').add(function(i18np) {
        i18np.loadMessages('CheckJStatus').then(function(i18np) {
            i18n = i18np;
            i18n.useUserLang();
            mw.hook('dev.modal').add(function() { createModal() })
        })
    })
})