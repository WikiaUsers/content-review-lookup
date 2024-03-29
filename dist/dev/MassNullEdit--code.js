/**
 * Mass Null Edit
 * @description Null edit listed multiple pages.
 * @author Ozuzanna
 */

(function ($, mw) {
    'use strict';

    if (window.loadedMassNullEdit) {
        return;
    }
    window.loadedMassNullEdit = true;

    var apiModeData = {
        backlinks: {
            name: 'backlinks',
            limit: 'bllimit',
            value: 'bltitle'
        },
        transclusions: {
            name: 'embeddedin',
            limit: 'eilimit',
            value: 'eititle'
        },
        fileusage: {
            name: 'imageusage',
            limit: 'iulimit',
            value: 'iutitle'
        },
        prefix: {
            // actual prefixsearch API is MW 1.23+
            name: 'allpages',
            limit: 'aplimit',
            value: 'apprefix'
        },
        category: {
            name: 'categorymembers',
            limit: 'cmlimit',
            value: 'cmtitle'
        },
        namespace: {
            name: 'allpages',
            limit: 'aplimit',
            value: 'apnamespace'
        }
    };
    var config = mw.config.get([
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgFormattedNamespaces',
        'wgNamespaceIds',
        'wgRelevantPageName'
    ]);
    var editApi = {
        action: 'edit',
        summary: 'Null edit (this edit should not be visible)',
        notminor: true,
        prependtext: '',
        nocreate: true
    };
    var i18n;
    // Media, Special, Message Wall, Thread, Board
    var nsBlacklist = ['-2', '-1', '1200', '1201', '2000'];
    var nsCategory = config.wgFormattedNamespaces[14] + ':';
    var nsFile = config.wgFormattedNamespaces[6] + ':';

    var failedPages = [];
    var input;
    var modalMain;
    var modalAddPages;
    var paused = true;
    var rateLimited = false;
    var rateLimitTimeoutId;
    var stopAddPages = null;

    function log(i18nMsg) {
        $('#mne-output').prepend(i18nMsg.parse(), '<br>');
    }

    function pageToNamespaceIdAndTitle(page) {
        var colonPos = page.indexOf(':');
        var nsText = page.slice(0, colonPos).toLowerCase().replace(/ /g, '_');
        var title = page.slice(colonPos + 1);
        var ns = config.wgNamespaceIds[nsText];

        return {
            namespaceId: ns || 0,
            title: ns ? title : page
        };
    }

    function addToInput(pages) {
        var currentPages = input.value.split('\n');

        pages = pages.filter(function (page) {
            return currentPages.indexOf(page) === -1;
        });

        if (pages.length) {
            input.value += pages.join('\n') + '\n';
        }

        return pages.length;
    }

    function nullEdit(page) {
        var query = {
            title: page
        };
        var editReq = editApi.post(query);

        editReq.always(function (result, resultIfRejected) {
            if (editReq.state() === 'rejected') {
                result = resultIfRejected;
            }

            var error = (result.error && result.error.code) || 'unknown';

            if (result.edit && result.edit.result === 'Success') {
                return;
            }

            if (error === 'ratelimited') {
                rateLimited = true;
                input.value = page + '\n' + input.value;
            } else {
                failedPages.push(page);
                log(i18n('fail', page, error));
            }
        });
    }

    function pause() {
        paused = true;
        rateLimited = false;
        modalMain.$element.removeClass("processing");
    }

    function start() {
        paused = false;
        modalMain.$element.addClass("processing");
        process();
    }

    function process() {
        if (rateLimited) {
            log(i18n('notice-ratelimit'));
            pause();
            rateLimitTimeoutId = setTimeout(start, 30000);
        }

        if (paused || input === null) {
            return;
        }

        var delay = Number(window.nullEditDelay) || 1000;

        // assume extremely low custom delays (less than 0.1 seconds) are
        // meant to be seconds, to avoid being repeatedly rate-limited
        if (delay < 100) {
            delay *= 1000;
        }

        var pages = input.value.split('\n');
        var page;

        do {
            page = pages.shift();
        } while (page === '');

        input.value = pages.join('\n');

        if (page) {
            nullEdit(page.trim());
            setTimeout(process, delay);
        } else {
            log(i18n('notice-finished'));
            addToInput(failedPages);
            failedPages = [];
            pause();
        }
    }

    function addPages(query, mode, displayValue) {
        var pages = [];
        var queryApi = new mw.Api({parameters: query});

        function complete(error) {
            if (error) {
                log(i18n('notice-error-' + mode, displayValue, error));
            }

            // show success message if either no error (a successful result may be 0 pages)
            // or error (in which case a multi-request query might still have some results)
            if (!error || pages.length) {
                var addedCount = addToInput(pages);
                log(i18n('notice-success-' + mode, displayValue, addedCount));
            }

            // reset "add pages" modal if it was used
            modalAddPages.$element.removeClass("processing");
            modalAddPages.hide();
        }

        function collect(more) {
            var queryReq = queryApi.get(more);
            queryReq.always(function (result, resultIfRejected) {
                if (queryReq.state() === 'rejected') {
                    result = resultIfRejected;
                }

                var error = (result.error && result.error.code) || 'unknown';
                var data = result.query && result.query[query.list];
                var continueData = result['query-continue'];

                if (data) {
                    data.forEach(function (entry) {
                        pages.push(entry.title);
                    });
                } else {
                    complete(error);
                    return;
                }

                if (continueData && stopAddPages === null) {
                    stopAddPages = !confirm(i18n('confirm-big-request', result.limits[query.list]).parse());
                }

                if (continueData && !stopAddPages) {
                    collect(continueData[query.list]);
                } else {
                    complete();
                }
            });
        }

        modalAddPages.$element.addClass("processing");
        collect();
    }

    function addPagesProcess(mode, value) {
        var modeData = apiModeData[mode];
        var query = {rawcontinue: ''};

        // cancel if unknown mode or empty/undefined value
        if (!modeData || !value) {
            return;
        }

        // normalise underscore to space
        value = value.replace(/_/g, ' ');
        var displayValue = value;

        // mode-specific adjustments
        switch (mode) {
        case 'namespace':
            // use namespace name for displaying namespace requests
            displayValue = value === '0'
                ? i18n('namespace-main').escape()
                : config.wgFormattedNamespaces[value];
            break;
        case 'category':
            // add namespace to category value if not included,
            // else remove it from display for brevity
            if (value.indexOf(nsCategory) !== 0) {
                value = nsCategory + value;
            } else {
                displayValue = displayValue.slice(nsCategory.length);
            }
            break;
        case 'fileusage':
            // add namespace to file value if not included,
            // else remove it from display for brevity
            if (value.indexOf(nsFile) !== 0) {
                value = nsFile + value;
            } else {
                displayValue = displayValue.slice(nsFile.length);
            }
            break;
        case 'prefix':
            // separate namespace id
            var nsAndTitle = pageToNamespaceIdAndTitle(value);
            query.apnamespace = nsAndTitle.namespaceId;
            value = nsAndTitle.title;
            break;
        }

        query.list = modeData.name;
        query[modeData.value] = value;
        query[modeData.limit] = 'max';

        addPages(query, mode, displayValue);
    }

    function addPagesCreateModalRow(mode) {
        var $row = $('<p>').attr('class', 'mne-addpages-row');
        var $radio = $('<input>').attr({
            type: 'radio',
            name: 'mode',
            value: mode
        });
        var $input = $('<input>').attr({
            type: 'text',
            name: mode
        });

        if (mode === 'namespace') {
            $input = $('<select>').attr('name', mode);

            Object.keys(config.wgFormattedNamespaces).forEach(function (ns) {
                if (nsBlacklist.indexOf(ns) !== -1) {
                    return;
                }

                var opt = document.createElement('option');
                opt.value = ns;
                opt.textContent = ns === '0'
                    ? i18n('namespace-main').plain()
                    : config.wgFormattedNamespaces[ns];

                $input.append(opt);
            });
        }

        // select a mode if its value is changed
        $input.on('change', function () {
            $radio.prop('checked', true);
        });

        $row.append(
            $('<label>').append(
                $radio,
                document.createTextNode(i18n('addpages-' + mode).plain())
            ),
            $input
        );

        return $row;
    }

    function addPagesOpenModal() {
        var formData;
        var $modalContent = $('<form>').attr('id', 'mne-mode');

        Object.keys(apiModeData).forEach(function (mode) {
            $modalContent.append(addPagesCreateModalRow(mode));
        });

        modalAddPages.show({
            title: i18n('addpages').plain(),
            content: $modalContent,
            onShow: function () {
                stopAddPages = null;
                formData = document.forms['mne-mode'].elements;
                modalAddPages.$footer.append(
                    $('<span>').attr('id', 'mne-processing-msg').text(i18n('processing').plain()),
                    mw.libs.QDmodal.getSpinner()
                );
            },
            onHide: function () {
                stopAddPages = true;
            },
            buttons: [{
                text: i18n('addpages').plain(),
                attr: {id: 'mne-addpages-start'},
                handler: function () {
                    // formData.mode.value would be better, but not available in IE 11
                    var mode = modalAddPages.$content.find('[name=mode]:checked').val();
                    var value = formData[mode] && formData[mode].value;
                    addPagesProcess(mode, value);
                }
            }, {
                text: i18n('cancel').plain(),
                handler: modalAddPages.hide.bind(modalAddPages)
            }]
        });
    }

    function autoFillPages() {
        var relevantPage = config.wgRelevantPageName.replace(/_/g, ' ');

        if (config.wgCanonicalNamespace === 'Category') {
            addPagesProcess('category', relevantPage);
        }

        if (config.wgCanonicalSpecialPageName === 'Whatlinkshere') {
            addPagesProcess('backlinks', relevantPage);
            addPagesProcess('transclusions', relevantPage);

            // relevant page is in the file namespace?
            if (relevantPage.indexOf(nsFile) === 0) {
                addPagesProcess('fileusage', relevantPage);
            }
        }

        if (config.wgCanonicalSpecialPageName === 'Allpages') {
            addPagesProcess(
                'namespace',
                $('form [name="namespace"]').val()
            );
        }

        if (config.wgCanonicalSpecialPageName === 'Prefixindex') {
            var prefix = $('form [name="prefix"]').val();
            var prefixNs = $('form [name="namespace"]').val();
            var page = '';

            if (prefixNs !== '0') {
                page += config.wgFormattedNamespaces[prefixNs] + ':';
            }

            page += prefix;
            addPagesProcess('prefix', page);
        }
    }

    function openModal(ev) {
        ev.preventDefault();

        var modalContents = (
            '<p>' + i18n('instructions').escape() + '</p>' +
            '<textarea id="mne-input"></textarea>' +
            '<div id="mne-output">' +
                '<i>' + i18n('notice-output').escape() + '</i>' +
            '</div>'
        );

        modalMain.show({
            title: i18n('title').plain(),
            content: modalContents,
            onShow: function () {
                input = document.getElementById('mne-input');
                pause();
                modalMain.$footer.append(
                    $('<span>').attr('id', 'mne-processing-msg').text(i18n('processing').plain()),
                    mw.libs.QDmodal.getSpinner()
                );
            },
            onHide: function () {
                pause();
                input = null;
                clearTimeout(rateLimitTimeoutId);
            },
            buttons: [{
                text: i18n('initiate').plain(),
                attr: {id: 'mne-main-start'},
                handler: start
            }, {
                text: i18n('pause').plain(),
                attr: {id: 'mne-main-pause'},
                handler: pause
            }, {
                text: i18n('addpages').plain(),
                handler: addPagesOpenModal
            }, {
                text: i18n('cancel').plain(),
                handler: modalMain.hide.bind(modalMain)
            }]
        });

        mw.loader.using([
            'mediawiki.api',
            'mediawiki.user'
        ]).then(function () {
            if (!(editApi instanceof mw.Api)) {
                editApi.token = mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken');
                editApi = new mw.Api({parameters: editApi});
            }

            autoFillPages();
        });
    }

    function main() {
        modalMain = new mw.libs.QDmodal('mne-main');
        modalAddPages = new mw.libs.QDmodal('mne-addpages');

        modalMain.$element.addClass("mne-modal");
        modalAddPages.$element.addClass("mne-modal");

        var $link = $('<li>').append(
            $('<a>').attr({
                href: '#',
                id: 't-mne'
            }).text(i18n('title').plain())
        ).click(openModal);

        $('#my-tools-menu, #p-tb ul').prepend($link);

        mw.hook('dev.placement').add(function (placement) {
            placement.script('MassNullEdit');
            $(placement.element('tools'))[placement.type('prepend')]($link);
        });
    }

    function initDependencies() {
        var devLoadUrl = 'https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:';
        var i18nMsgs = new $.Deferred();
        var waitFor = [i18nMsgs];

        mw.loader.load(devLoadUrl.replace('script', 'style') + 'MassNullEdit.css', 'text/css');

        if (!mw.libs.QDmodal) {
            waitFor.push($.ajax({
                cache: true,
                dataType: 'script',
                url: devLoadUrl + 'QDmodal.js'
            }));
        }

        if (!(window.dev && dev.i18n && dev.i18n.loadMessages)) {
            mw.loader.load(devLoadUrl + 'I18n-js/code.js&*');
        }

        mw.hook('dev.i18n').add(function (i18njs) {
            i18njs.loadMessages('MassNullEdit').done(function (i18nData) {
                i18n = i18nData.msg;
                i18nMsgs.resolve();
            });
        });

        $.when.apply($, waitFor).done(main);
    }

    initDependencies();
}(jQuery, mediaWiki));