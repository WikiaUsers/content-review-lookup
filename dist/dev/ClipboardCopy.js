// <nowiki>
// Adds a "Clipboard Copy" to the "My Tools" menu for Special:Images
// Special:UnusedFiles and Special:ListFiles, which allows files
// to be selected and their file names copied to the clipboard.
// Some of the code in this came from https://dev.fandom.com/wiki/MultipleFileDelete
// @author Aspallar
(function ($) {
    /*global mw*/
    'use strict';

    var pageName = mw.config.get('wgCanonicalSpecialPageName');

    if (!['Unusedimages', 'Images', 'Listfiles'].includes(pageName))
        return;

    function selectAll() {
        /*jshint -W040 */ // allow old school jquery this
        var btn = $(this);
        if (btn.text() === 'Deselect All') {
            $('.clipboard-check').each(function() {
                this.checked = false;
            });
            btn.text('Select All');
        } else {
            $('.clipboard-check').each(function() {
                this.checked = true;
            });
            btn.text('Deselect All');
        }
    }

    var noClipboard;
    var appendDisabled;

    function setButtonDisabledState(state) {
        $('#btn-clipboard-copy').prop('disabled', state || noClipboard);
        $('#btn-clipboard-append').prop('disabled', state || appendDisabled);
    }

    function selectedFileNames() {
        var selected = $('.clipboard-check:checked');
        var fileNames = [];
        if (pageName === 'Images') {
            selected.each(function () {
                var href = $(this).closest('.wikia-gallery-item')
                    .find('a').attr('href');
                var nameMatch = /File:([^"]+)/.exec(href);
                fileNames.push(nameMatch[1]);
            });
        }
        else
        {
            selected.each(function() {
                var page = 
                    $(this).parent().find('a').first().attr('title') ||
                    $(this).parent().find('a').first().text();
                fileNames.push(page.substring(5)); // strip "File:"
            });
        }
        return fileNames.join('\n');
    }

    function copyToClipboard() {
        setButtonDisabledState(true);
        navigator.clipboard.writeText(selectedFileNames()).then(function () {
            setButtonDisabledState(false);
        });
    }

    function appendToClipboard() {
        setButtonDisabledState(true);
        navigator.clipboard.readText().then(function (clipText) {
            var fileNames = selectedFileNames();
            var text = clipText ? [clipText, fileNames].join('\n') : fileNames;
            navigator.clipboard.writeText(text).then(function () {
                setButtonDisabledState(false);
            });
        });
    }

    var lastChecked = null;

    function checkboxClick(event)
    {
        /*jshint -W040 */ // allow old school jquery this
        if (lastChecked && event.shiftKey) {
            var checkBoxes = $('.clipboard-check');
            var start = checkBoxes.index(this);
            var end = checkBoxes.index(lastChecked);
            var checkedState = lastChecked.checked;
            for (var k = Math.min(start, end), last = Math.max(start, end); k < last; k++) {
                checkBoxes[k].checked = checkedState;
            }
        }
        lastChecked = this;
    }

    function addCkeckboxes() {
        var checkbox = '<input class="clipboard-check" type="checkbox" />';
        if (pageName === 'Unusedimages') {
            $('.gallerytext > a').each(function() {
                $(this).before($(checkbox).click(checkboxClick));
            });
        } else if (pageName === 'Images') {
            $('.lightbox-caption').each(function () {
                $(this).prepend($(checkbox).click(checkboxClick));
            });
        } else {
            $('.TablePager_col_img_name').each(function () {
                $(this).prepend($(checkbox).click(checkboxClick));
            });
        }
    }

    function addButtons() {
        var buttonCommon = {
            'class': 'button',
            css: {
                cursor: 'pointer',
                height: 'initial',
                'margin-left': 3,
            }
        };
        var buttons = [
            $('<button>', $.extend({
                text: 'Select All',
                click: selectAll,
            }, buttonCommon)),
            $('<button>', $.extend({
                id: 'btn-clipboard-copy',
                text: 'Copy',
                click: copyToClipboard,
            }, buttonCommon)),
            $('<button>', $.extend({
                id: 'btn-clipboard-append',
                text: 'Append',
                click: appendToClipboard,
            }, buttonCommon))
        ];

        $('<span>')
            .append(buttons)
            .css({
                position: 'fixed',
                'z-index': 9999,
                bottom: 30,
                left: 0
            })
            .appendTo('body');

        setButtonDisabledState(false);
    }

    var started = false;

    function start(event) {
        event.preventDefault();
        if (!started) {
            addCkeckboxes();
            addButtons();
            started = true;
        }
    }

    function addMyToolsOption() {
        var link = $('<li>')
            .append($('<a>').attr({href: '#'}).text('Clipboard Copy'))
            .click(start);
         $('#my-tools-menu').prepend(link);
    }

    function checkCapabilities() {
        appendDisabled = true;
        noClipboard = true;

        if (!navigator || !navigator.clipboard || !navigator.clipboard.writeText)
            return;

        noClipboard = false;

        if (navigator.clipboard.readText && navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({name:'clipboard-read'}).then(function (perm) {
                appendDisabled = perm.state !== 'granted';
            });
        }
    }

    function initialize() {
        checkCapabilities();
        addMyToolsOption();
    }

    $(initialize);

}(jQuery));
// </nowiki>