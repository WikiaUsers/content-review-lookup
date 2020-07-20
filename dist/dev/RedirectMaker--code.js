(function() {
    'use strict';
    /* global importScriptPage,
              templateExtraction,
              yieldRedirects,
              installRedirect
    */
    var contentLang = mw.config.get('wgPageContentLanguage');
    function langIsOf(list) {
        return list.indexOf(contentLang) !== -1;
    }
    var enableHangulOptions = langIsOf([ 'cia', 'ko', 'kor', 'jje', 'ko', 'okm', 'oko' ]),
    germanEnabled = langIsOf([ 'de', 'ger', 'deu', 'gmh', 'goh', 'gct', 'bar', 'cim', 'geh', 'ksh', 'nds', 'sli', 'ltz', 'vmf', 'mhn', 'pfl', 'pdc', 'pdt', 'deu', 'swg', 'gsw', 'uln', 'sxu', 'wae', 'wep', 'hrx', 'yec' ]),
    shouldVaryWidths = langIsOf([ 'ain', 'ja', 'jpn', 'kzg', 'ams', 'ryn', 'tkn', 'okn', 'hhjm', 'xuj', 'ryu', 'mvi', 'rys', 'yoi', 'ko', 'kor', 'jje', 'okm', 'oko', 'zh', 'chi', 'zho', 'cmn', 'yue', 'nan', 'cdo', 'cju', 'cmn', 'cpx', 'czh', 'czo', 'gan', 'hak', 'hsn', 'mnp', 'wuu', 'och', 'ltc', 'lzh', 'yyef', 'guzh' ]),
    formOptions = [
        ['diacriticFilter', 'DiacriticFilter', true],
        ['alternateWidths', 'AlternateWidths', shouldVaryWidths],
        ['RedirectMakerAutoExtract', 'ExtractCoreForms', false],
        ['ßFilter', 'ßFilter', germanEnabled],
        ['RedirectMakerLegacyHangul', 'LegacyHangul', enableHangulOptions],
        ['RedirectMakerDecomposeHangul', 'DecomposeHangul', enableHangulOptions],
        ['RedirectMakerRecomposeHangul', 'RecomposeHangul', enableHangulOptions],
        ['KanaRomanization', langIsOf(['ja', 'jpn']),
            ['NihonShiki', 'NihonShikiRomanization', false],
            ['KunreiShiki', 'KunreiShikiRomanization', false],
            ['KunreiShikiLegacy', 'KunreiShikiLegacyRomanization', false],
            ['JSLRomanji', 'JSLRomanization', false],
            ['Hepburn1', 'Hepburn1Romanization', false],
            ['Hepburn2', 'Hepburn2Romanization', false],
            ['Hepburn3', 'Hepburn3Romanization', false],
            ['HepburnMod', 'HepburnModifiedRomanization', false],
            ['HepburnPassport', 'HepburnPassportRomanization', false]
        ],
        ['CyrillicRomanization', langIsOf(['ru', 'be', 'sr', 'bg', 'bul', 'mk', 'mac', 'mkd', 'mn', 'mon', 'khk']),
            ['ISO9A', 'ISO9A', false],
            ['ISO9B', 'ISO9B', false],
            ['RussianTranscription', 'RussianTranscription', langIsOf(['ru'])],
            ['BelarusianTranscription', 'BelarusianTranscription', langIsOf(['be'])],
            ['SerbianTranscription', 'SerbianTranscription', langIsOf(['sh', 'scr', 'scc', 'sbs', 'srp', 'sr', 'hr', 'hrv', 'bs', 'bos', 'bun', 'svm', 'kjv', 'cnr' ])],
            ['BulgarianTranscription', 'BulgarianTranscription', langIsOf(['bg', 'bul'])],
            ['MacedonianTranscription', 'MacedonianTranscription', langIsOf(['mk', 'mac', 'mkd'])],
            ['MongolianTranscription', 'MongolianTranscription', langIsOf(['mn', 'mon', 'khk', 'mvf'])],
            ['UkrainianTranscription', 'UkrainianTranscription', langIsOf(['uk', 'ukr'])]
        ]
    ],
    inputOptions = {
        NihonShiki: 'NihonShiki',
        KunreiShiki: 'KunreiShiki',
        KunreiShikiLegacy: 'KunreiShikiLegacy',
        JSLRomanji: 'JSLRomanji',
        Hepburn1: 'Hepburn1',
        Hepburn2: 'Hepburn2',
        Hepburn3: 'Hepburn3',
        HepburnMod: 'HepburnMod',
        HepburnPassport: 'HepburnPassport',
        RedirectMakerLegacyHangul: 'legacyHangul',
        RedirectMakerDecomposeHangul: 'decomposeHangul',
        RedirectMakerRecomposeHangul: 'recomposeHangul',
        alternateWidths: 'alternateWidths',
        diacriticFilter: 'diacriticFilter',
        RedirectMakerTarget: 'target',
        RedirectMakerFiller: 'filler',
        RedirectMakerCoreForms: 'coreForms',
        RedirectMakerKanaForms: 'phoneticKanaForms',
        RedirectMakerNamespace: 'namespace',
        RedirectMakerAutoExtract: 'autoExtract',
        ISO9A: 'ISO9A',
        ISO9B: 'ISO9B',
        RussianTranscription: 'RussianTranscription',
        BelarusianTranscription: 'BelarusianTranscription',
        BCMSTranscription: 'BCMSTranscription',
        BulgarianTranscription: 'BulgarianTranscription',
        SerbianTranscription: 'SerbianTranscription',
        MacedonianTranscription: 'MacedonianTranscription',
        MongolianTranscription: 'MongolianTranscription',
        UkrainianTranscription: 'UkrainianTranscription',
        ßFilter: 'ßFilter'
    }, $form, i18n, adderInterval, queue, config;
    function showHide() {
        $(this).parent().find('span').slideToggle();
    }
    function makeBinaryOption(args) {
        if (args.length > 3) {
            var id = args.shift(),
                display = args.shift();
            return $('<span>').append(
                $('<button>', {
                    type: 'button',
                    id: id + 'ShowHide',
                    text: i18n.msg(id).plain()
                }),
                $('<span>', {
                    id: id + 'Block',
                    css: {
                        display: display ? 'inline' : 'none'
                    }
                }).append(args.map(makeBinaryOption))
            );
        }
        return $('<label>', {
            'for': args[0],
            'class': 'RedirectMakerBinaryLabel',
            'text': i18n.msg(args[1]).plain() + ':'
        }).append(
            $('<input>', {
                type: 'checkbox',
                id: args[0],
                checked: args[2] ? '' : undefined
            })
        );
    }
    function makeInput(msg, id) {
        return $('<div>').append(
            $('<label>', {
                text: i18n.msg(msg).plain() + ':'
            }),
            $('<input>', {
                'class': 'RedirectMakerMainInput',
                'type': 'text',
                'id': id
            })
        );
    }
    function makeForm(id, msg, text) {
        return $('<span>', {
            'class': 'RedirectMakerForms'
        }).append(
            $('<p>', {
                text: i18n.msg(msg).plain() + ':'
            }),
            $('<textarea>', {
                id: id,
                text: text
            })
        );
    }
    function makeButton(id, msg) {
        return $('<button>', {
            type: 'button',
            id: id,
            text: i18n.msg(msg).plain()
        });
    }
    function getInput() {
        var results = {};
        $('#RedirectMakerForm input, #RedirectMakerForm textarea')
        .each(function() {
            var $this = $(this),
                id = $this.attr('id'),
                val;
            if ($this.attr('type') === 'checkbox') {
                val = $this.prop('checked');
            } else {
                val = $this.val();
            }
            if (id === 'RedirectMakerKanaForms') {
                val = JSON.parse(val);
            } else if (id === 'RedirectMakerCoreForms') {
                val = val.split('\r').join('').split('\n');
            }
            results[inputOptions[id]] = val;
        });
        return results;
    }
    function propose() {
        templateExtraction(getInput(), function(input) {
            var result = yieldRedirects(input);
            var resultLines = result.ptr.val;
            var x = result.ptr;
            while (x !== null) {
                resultLines += '\r\n' + x.val;
                x = x.next;
            }
            $('#RedirectMakerProposals').val(resultLines);
        });
    }
    function interval() {
        var target = queue.shift();
        if (!target) {
            clearInterval(adderInterval);
            alert(i18n.msg('AllLoaded').plain());
            return;
        }
        if (target !== config.target) {
            installRedirect(target, config.filler, i18n.msg('automatedRedirect').plain());
        }
    }
    function add() {
        alert(i18n.msg('Loading').plain());
        queue = $('#RedirectMakerProposals').val().split('\r').join('').split('\n').sort();
        config = getInput();
        adderInterval = setInterval(interval, 1000);
    }
    function click() {
        // TODO: Change to importArticles once these get RL-compatible
        importScriptPage('MediaWiki:RedirectMaker/proposeRedirects.js', 'dev');
        importScriptPage('MediaWiki:RedirectMaker/addRedirects.js', 'dev');
        $.showCustomModal(i18n.msg('Name').escape(), $form, {
            id: 'RedirectMakerForm',
            width: '95%',
            buttons: []
        });
        $('#KanaRomanizationShowHide, #CyrillicRomanizationShowHide').click(showHide);
        $('#RedirectMakerPropose').click(propose);
        $('#RedirectMakerAdd').click(add);
    }
    function init(i18nd) {
        i18n = i18nd;
        $form = $('<form>', {
            'method': '',
            'name': 'RedirectMakerForm',
            'id': 'RedirectMakerForm',
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>').append(formOptions.map(makeBinaryOption)),
                $('<p>', {
                    id: 'RedirectMakerMain'
                }).append(
                    makeInput('DestinationPage', 'RedirectMakerTarget'),
                    makeInput('Filler', 'RedirectMakerFiller'),
                    makeInput('TargetNamespace', 'RedirectMakerNamespace')
                ),
                makeForm('RedirectMakerCoreForms', 'CoreForms', ''),
                makeForm('RedirectMakerKanaForms', 'PhoneticKanaForms', '[]'),
                makeForm('RedirectMakerProposals', 'ProposedResults'),
                $('<span>', {
                    id: 'RedirectMakerButtons'
                }).append(
                    makeButton('RedirectMakerPropose', 'ProposeRedirects'),
                    makeButton('RedirectMakerAdd', 'AddRedirects')
                )
            )
        );
        $('.toolbar .tools').prepend(
            $('<li>', {
                'class': 'overflow'
            }).append(
                $('<a>', {
                    id: 'loadRedirectMaker',
                    click: click,
                    text: i18n.msg('LoadRedirectMaker').plain()
                })
            )
        );
    }
    function preload(i18no) {
        i18no.loadMessages('RedirectMaker').then(init);
    }
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:RedirectMaker.css'
    });
    mw.hook('dev.i18n').add(preload);
})();