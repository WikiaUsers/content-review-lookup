/* global require, console, alert */
/**
 * <nowiki>
 * FormToDiscussions
 * A way of creating a form that posts to Discussions. 
 * Designed to be easy to create your own special form for your custom needs!
 * 
 * Please test this script on a test wiki before implementing it on your own.
 * @author Noreplyz
 */

require([
    'wikia.window',
    'jquery',
    'mw',
    'wikia.mustache'
], function (window, $, mw, Mustache) {
    'use strict';

    // Load form in places where it is required
    var ftd = {};
    ftd.options = window.formToDiscussions;
    if (!ftd.options || ftd.options.length === 0) return;

    /**
     * Configuration data
     */
    ftd.config = {
        siteId: mw.config.get('wgCityId')
    };

    // Helper variables for form template
    ftd.mustacheFormElements = {
        // {{#input}}id|placeholder{{/input}}
        input: function () {
            return function(text) {
                text = text.trim();
                if (text === '')
                    return 'Parse error: &lt;input&gt; tag had no ID.<br/>';

                var params = text.split('|'),
                    id = mw.html.escape(params[0]),
                    placeholder = '';
                
                if (params.length === 2)
                    placeholder = mw.html.escape(params[1]);
                
                return '<input class="FTD-data FTD-input" id="' + id + '" placeholder="' + placeholder + '" />';
            };
        },

        // {{#textarea}}id|placeholder{{/textarea}}
        textarea: function () {
            return function (text) {
                text = text.trim();
                if (text === '')
                    return 'Parse error: &lt;textarea&gt; tag had no ID.<br/>';

                var params = text.split('|'),
                    id = mw.html.escape(params[0]),
                    placeholder = '';

                if (params.length === 2)
                    placeholder = mw.html.escape(params[1]);

                return '<textarea class="FTD-data FTD-textarea" id="' + id + '" placeholder="' + placeholder + '" />';
            };
        },

        // {{#submit}}buttonText{{/submit}}
        submit: function () {
            return function (text, render) {
                return '<button class="FTD-button" id="submit">' + render(text) + '</button>';
            };
        }
    };

    /**
     * Posts contents directly into Discussions, into a particular category
     * @param {String} category the category ID
     * @param {String} title    the title text for the post
     * @param {String} content  the body text for the post
     */
    ftd.postContent = function (category, title, content) {
        return $.ajax({
            url: 'https://services.fandom.com/discussion/' + ftd.config.siteId + '/forums/' + category + '/threads',
            type: 'POST',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                title: title,
                body: content,
                source: 'UNCATEGORIZED',
                funnel: 'TEXT',
                siteId: ftd.config.siteId
            }),
            contentType: 'application/json'
        });
    };

    /**
     * Parses the raw form template
     * @param {String} rawForm      the raw form
     * @param {Object} extraOptions external variables supplied by the user
     * @return a HTML string containing the form contents. Content is not sanitised automatically
     */
    ftd.parseForm = function(rawForm, extraOptions) {
        return Mustache.render(rawForm, 
            Object.assign({}, ftd.mustacheFormElements, extraOptions));
    };

    /**
     * Enables the form buttons
     * @param {Object} options the options for the particular form
     */
    ftd.enableButtons = function(options) {
        $('#FormToDiscussions-' + options.id).on('click', '#submit', function() {
            var formVariables = {
                username: mw.config.get('wgUserName')
            };

            $('#FormToDiscussions-' + options.id + ' .FTD-data ').each(function (i, item) {
                formVariables[item.id] = $(item).val();
            });
            var title = Mustache.render(options.discussionsTitle, formVariables);
            var content = Mustache.render(options.discussionsContent, formVariables);
            if (title.length > 70) {
                options.submitFailCallback();
                return $.Deferred().reject({ error: 'Title is too long' });
            }
            ftd.postContent(options.discussionsCategory, title, content).then(function () {
                options.submitCallback();
                $('#FormToDiscussions-' + options.id + ' .FTD-data ').each(function (i, item) {
                    $(item).val('');
                });
            }, options.submitFailCallback);
        });
    };

    /**
     * Embeds a form into the div, and allows the form to work
     * @param {Object} options options for the form to be placed
     */
    ftd.initForm = function (options) {
        var location = $('#FormToDiscussions-' + options.id);
        console.log(options);
        var parsedForm = ftd.parseForm(options.form, options.customMustache);
        location.append(parsedForm);
        ftd.enableButtons(options);
    };
    
    /**
     * Start the script - calls loadForm on all forms that 
     * should exist on the current page
     */
    ftd.init = function () {
        // Only load the form on the page when the div (with ID) exists
        // If it isn't a special page, insert multiple forms
        ftd.options.forEach(function (formOptions) {
            if (!formOptions.id || !formOptions.form) {
                console.warn('FormToDiscussions: You must provide an ID and the form code to use this script.');
                return;
            }
            // For special pages, make some interface changes
            if (formOptions.specialPage) {
                if (mw.config.get('wgCanonicalNamespace') === 'Special' && mw.config.get('wgTitle') === formOptions.specialPage) {
                    if (!formOptions.specialPageTitle) {
                        formOptions.specialPageTitle = 'Post to Discussions';
                    }
                    $('h1.page-header__title').text(formOptions.specialPageTitle);
                    document.title = formOptions.specialPageTitle + ' | ' + mw.config.get('wgSiteName') + ' | FANDOM powered by Wikia';
                    $('#WikiaArticle').empty().append($('<div/>', {
                        id: 'FormToDiscussions-' + formOptions.id
                    }));
                }
            }
            // Cleanup optional submit callbacks
            if (typeof formOptions.submitCallback !== 'function')
                formOptions.submitCallback = function() {};
            if (typeof formOptions.submitFailCallback !== 'function')
                formOptions.submitFailCallback = function() {};
            // Load the (latest) form
            if ($('#FormToDiscussions-' + formOptions.id).length !== 0) {
                ftd.initForm(formOptions);
            }
        });
    };

    ftd.init();
});
//