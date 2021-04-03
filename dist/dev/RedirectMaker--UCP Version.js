(function(){
    'use strict';
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Modal.js'
    });
    importScriptPage('MediaWiki:RedirectMaker/utils.js', 'dev');
    mw.hook('redirectMakerUtils').add(function(utils){
        const makeRedirectMakerConsole = function(i18nd){
            const makeButton = function(label){
                return [
                    '<label for="',
                    label,
                    '" class="RedirectMakerBinaryLabel">',
                    i18nd.msg(label).plain(),
                    '<input type="checkbox" id="',
                    label,
                    '"></label>'
                ].join('');
            };
            const makeTextArea = function(label, id){
                const a =  i18nd.msg(label).plain();
                return [
                    '<span class="RedirectMakerForms"><p>',
                    a,
                    '</p><textarea id="RedirectMaker',
                    id,
                    '"></textarea></span>'
                ].join('');
            };
            const makeTextLine = function(label, id){
                return [
                    '<div><label>',
                    i18nd.msg(label).plain(),
                    ':</label><input class="RedirectMakerMainInput" type="text" id="',
                    id,
                    '"></div>'
                ].join('');
            };
            return [
                '<p>',
                utils.optionStrings.map(makeButton).join(''),
                '</p>',
                '<p id="RedirectMakerMain">',
                makeTextLine('DestinationPage', 'RedirectMakerTarget'),
                makeTextLine('Filler', 'RedirectMakerFiller'),
                makeTextLine('TargetNamespace', 'RedirectMakerNamespace'),
                '</p>',
                makeTextArea('CoreForms', 'CoreForms'),
                makeTextArea('ProposedResults', 'ProposedResults'),
                '<span id="RedirectMakerButtons"><button type="button" id="RedirectMakerPropose">', 
                i18nd.msg('ProposeRedirects').plain(),
                '</button><button type="button" id="RedirectMakerAdd">', 
                i18nd.msg('AddRedirects').plain(),
                '</button></span>'
            ].join('');
        };
        const automaticOptions = {
            '#ßFilter': utils.germanEnabled, '#LegacyHangul': utils.enableHangulOptions, '#DecomposeHangul': utils.enableHangulOptions, '#RecomposeHangul': utils.enableHangulOptions, '#AlternateWidths': utils.shouldVaryWidths
        };
        const loadModal = function(i18nd, modalClass){
            const modal = new window.dev.modal.Modal({
                content: makeRedirectMakerConsole(i18nd),
                id: 'RedirectMakerConsole',
                size: 'content-size',
                title: i18nd.msg('Name').plain()
            });
            modal.create().then(function(created){
                modal.show(); 
                importArticle({
                    type: 'style',
                    article: 'u:dev:MediaWiki:RedirectMaker.css'
                });
                Object.keys(automaticOptions).forEach(function(key){
                  $( key ).prop( "checked", automaticOptions[key]);
                });
                $('#RedirectMakerPropose').click(function(){
                    const input = $('#RedirectMakerCoreForms').val().split('\r').join('').split('\n').filter(function(i){
                        return i.length > 0;
                    });
                    const enabledOptions = [].concat(utils.optionStrings.map(function(option){
                        const optionChecked = $( '#' + option ).is(":checked");
                        if (!optionChecked) {
                            return [];
                        }
                        switch (option) {
                            case 'AlternateWidths':
                                return [utils.convertToFullWidth, utils.convertToHalfWidth];
                            default:
                        }
                        return [utils.functionMap[option]];
                    })).filter(utils.isNotNull);
                    const result = (utils.performAllTransforms(input, enabledOptions));
                    const nameSpaceStringRaw = ($('#RedirectMakerNamespace').val() || '');
                    const nameSpaceString = nameSpaceStringRaw.length > 0 ? nameSpaceStringRaw + ':' : '';
                    $('#RedirectMakerProposedResults').text(utils.listToArray(result).map(function(entry){
                        return nameSpaceString + entry;
                    }).join('\r\n'));
                });
                $('#RedirectMakerAdd').click(function(){
                    const input = $('#RedirectMakerProposedResults').val().split('\r').join('').split('\n').filter(function(i){
                        return i.length > 0;
                    });
                    alert(i18nd.msg('Loading').plain());
                    utils.installRedirects(input, $('#RedirectMakerFiller').val(), i18nd.msg('automatedRedirect').plain(), function(){
                        alert(i18nd.msg('AllLoaded').plain());
                    });
                });
                /*$('#loadRedirectMaker').off();
                $('#loadRedirectMaker').click(modal.show);*/
                
            });
        };
        const init = function(i18nd, modal) {
            $('.toolbar .tools').prepend(
                $('<li>', {
                    'class': 'overflow'
                }).append(
                    $('<a>', {
                        id: 'loadRedirectMaker',
                        click: function(){
                            loadModal(i18nd, modal);
                        },
                        text: i18nd.msg('LoadRedirectMaker').plain()
                    })
                )
            );
        };
        mw.hook('dev.i18n').add(function(i18no) {
            mw.hook('dev.modal').add(function(modal) {
                i18no.loadMessages('RedirectMaker').then(function(i18nd){
                    init(i18nd, modal);
                });
            });
        });
    });
})();