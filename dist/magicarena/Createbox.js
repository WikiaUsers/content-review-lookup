// ==========================================================================
// Createbox
//    Replacement for <createbox>, with a better interface and the ability
//    to specify 'use the source editor' (necessary for deck articles).
//
// Version 1.1.0
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    /*global mw */
    'use strict';

    if ($('.mdw-createbox').length === 0 || $('#mdw-disabled-js').attr('data-createbox-1-1-0'))
        return;

    function getConfig(createbox) {
        var config = createbox.data();
        config.prefix = config.prefix || '';
        config.buttontext = config.buttontext || 'Create';
        config.placeholder = config.placeholder || '';
        config.mustenter = config.mustenter || 'You must enter a page name';
        config.existserror = config.existserror || 'Page already exists';
        config.invalidtitle = config.invalidtitle || 'Invalid page name';
        config.error = config.error || 'Error';
        config.error += ' ';
        config.preloadfail = config.preloadfail || 'Failed to load preload template';
        config.editsummary = config.editsummary || 'Created via createbox';
        config.nospace = config.nospace === undefined ? false : config.nospace === true;
        config.spaceerror = config.spaceerror || 'Cannot start with a space';
        return config;
    }

    function invalidTitle(title) {
        return /#|\?/g.test(title);
    }

    function startsWithSpace(title) {
        return title[0] === ' ';
    }

    function getBaseUrl() {
        return mw.config.get('wgArticlePath').replace('$1', '');
    }

    function buildUrl(page, query) {
        return getBaseUrl() + page + (query ? '?' + $.param(query) : '');
    }

    function removeIncludes(contents) {
        return contents.replace(/<[\/]?noinclude>|<[\/]?includeonly>/g, '');
    }

    function getControls(createbox) {
        var children = createbox.children();
        return {
            text: $(children[0]),
            button: $(children[1]),
            status: $(children[3])
        };
    }

    function editPage(page, config) {
        var query = { action: 'edit' };
        if (config.useeditor) query.useeditor =  config.useeditor;
        if (config.editintro) query.editintro = config.editintro;
        var url = buildUrl(page, query);
        window.location = url;
    }

    function createAndEdit(page, content, config, controls) {
        mw.loader.using('mediawiki.api').then(function () {
            var api = new mw.Api();
            api.post({
                action: 'edit',
                title: page,
                summary: config.editsummary,
                text: content,
                createonly: 'yes',
                token: mw.user.tokens.get('editToken')
            }).done(function(result) {
                if (result.error) {
                    if (result.error.code === 'articleexists')
                        controls.status.html(config.existserror);
                    else if (result.error.code === 'invalidtitle')
                        controls.status.html(config.invalidtitle);
                    else
                        controls.status.html(result.error.info);
                    controls.button.prop('disabled', false);
                } else {
                    editPage(page, config);
                }
            }).fail(function(code, result) {
                controls.status.html(config.error + ' ' + code + (code === 'http' ? ' ' + result.textStatus : ''));
                controls.button.prop('disabled', false);
            });
        });
    }

    function buttonClick() {
        /*jshint -W040 */  // allow old school jquery use of this
        var createbox = $(this).parent();
        var controls = getControls(createbox);
        var config = getConfig(createbox);

        var pagename = controls.text.val();
        if (pagename.length === 0) {
            controls.status.html(config.mustenter);
            return;
        }
        if (invalidTitle(config.prefix + pagename)) {
            controls.status.html(config.invalidtitle);
            return;
        }
        if (config.nospace && startsWithSpace(pagename)) {
            controls.status.html(config.spaceerror);
            return;
        }

        controls.button.prop('disabled', true);
        controls.status.html($('<img>', {
            src: mw.config.get('stylepath') + '/common/images/ajax.gif'
        }));

        if (config.preload) {
            $.get(buildUrl(config.preload, {action: 'raw'})).done(function (preload) {
                preload = removeIncludes(preload);
                createAndEdit(config.prefix + pagename, preload, config, controls);
            }).fail(function () {
                controls.status.html(config.preloadfail);
                controls.button.prop('disabled', false);
            });
        } else {
            editPage(config.prefix + pagename, config);
        }
    }

    function initialize() {
        $('.mdw-createbox').each(function () {
            var createbox = $(this);
            var config = getConfig(createbox);
            var input = $('<input type="text">').attr('placeholder', config.placeholder);
            if (config.width) input.css('width', config.width);
            var button = $('<input>', {
                type: 'button',
                value: config.buttontext
            }).click(buttonClick);
            createbox.append(input)
                .append(button)
                .append('<br>')
                .append('<span class="mdw-createbox-error">');
        });
    }

    $(document).ready(initialize);

}(jQuery));