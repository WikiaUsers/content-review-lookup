/**
 * Name:        MultiUploadJS
 * Author:      Fujimaru-kun
 * Based on:    MultiUpload (by Gguigui1 and KhangND), Gadget-multiupload.js (by Pcj)
 * Description: Allows upload of multiple files at the same time
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.confirmCloseWindow',
    'mediawiki.notification',
    'mediawiki.util',
    'oojs-ui-core',
    'ext.fandom.photoGallery.gallery.css',
]).then(function () {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgFormattedNamespaces',
        'wgNamespaceIds',
        'wgUserLanguage',
        'wgUserGroups'
    ]);

    var query = new URLSearchParams(document.location.search);

    if (
        window.MultiUploadJSLoaded ||
        config.wgCanonicalSpecialPageName !== "Upload" ||
        $("#wpForReUpload").val() || //Disabling for Reupload
        query.get('wpDestFile') || // Disabling when following a redlink
        !/autoconfirmed/.test(config.wgUserGroups.join())
    ) {
        return;
    }
    window.MultiUploadJSLoaded = true;

    var api = new mw.Api(),
        i18n,
        preloads = 1,
        allowCloseWindow,
        token = mw.user.tokens.get('csrfToken'),
        files = [],
        stdmsgs = [
            // General UI things
            'filedesc', 'license-header', 'watchthisupload', 'ignorewarnings',
            // Upload warnings
            'badfilename', 'file-exists-duplicate', 'fileexists', 'fileexists-no-change',
        ],
        limit = (window.MultiUploadoption && window.MultiUploadoption.max) ? window.MultiUploadoption.max : -1,
        defaultlicense = (window.MultiUploadoption && window.MultiUploadoption.defaultlicense) ? window.MultiUploadoption.defaultlicense : '',
        defaultdescription = (window.MultiUploadoption && window.MultiUploadoption.defaultdescription) ? window.MultiUploadoption.defaultdescription : '',
        curFile = 0,
        progressBarWidget,
        uploadResultCount = {
            warnings: 0,
            errors: 0,
        };

    function preload() {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('MultiUpload', {
                cacheVersion: 1,
            }).done(init);
        }
    }

    function init(i18nData) {
        i18n = i18nData;
        setLimit();

        api.loadMessagesIfMissing(stdmsgs).then(function() {
            $("#wpUploadFile").parent().parent().addClass("regularFileSelect");
            $("tr.regularFileSelect").after('<tr class="multipleFileSelect"><td class="mw-label">&nbsp;</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
            $("#mw-htmlform-source > tbody > tr.mw-htmlform-field-UploadSourceField.regularFileSelect").remove();
            $("#mw-upload-form > fieldset:nth-of-type(3)").remove();
            $("#mw-upload-form > span > input.mw-htmlform-submit").remove();
            $("#mw-upload-form > fieldset:nth-of-type(2)").hide();
            // The core MediaWiki JS registers a beforeUnload event handler that is removed on form submit.
            // If we used a button input with a click event handler (like you might intuitively do for this case),
            // we would get the popup telling us that there are unsaved changes even after all uploads succeed.
            // So instead we need to use a submit input with preventDefault() on the forms submit event.
            $("span.mw-htmlform-submit-buttons").append('<input type="submit" value="' + i18n.msg('uploadfiles').escape() + '" class="multipleFileSelect" id="multiFileSubmit" />');
            $("span.mw-htmlform-submit-buttons").append('<input type="button" value="' + i18n.msg('reset').escape() + '" class="multipleFileSelect" id="multiFileReset" />');
            $("#multiupload").change(addFields);
            $("#mw-upload-form").on('submit', uploadFiles);
            $("#multiFileReset").click(reset);

            allowCloseWindow = mw.confirmCloseWindow({
                test: function() {
                    return files.length !== 0;
                }
            });
        });
    }

    /*
     * Set Maximum number of file the user can import at one time (can be overriden by a config var but its value is capped at 100)
     */
    function setLimit() {
        if (limit < 0 ||
            limit > 100 ||
            typeof limit !== 'number') {
            if (/staff|util|bot-global|wiki-specialist/.test(config.wgUserGroups.join())) {
                limit = 200;
            } else if (/bureaucrat|bot/.test(config.wgUserGroups.join())) {
                limit = 70;
            } else if (/sysop/.test(config.wgUserGroups.join())) {
                limit = 50;
            } else if (/rollback|content-moderator/.test(config.wgUserGroups.join())) {
                limit = 30;
            } else {
                limit = 20;
            }
        }
    }

    /*
     * Add Fields to change the filename, description and license of each file to DOM
     */
    function addFields() {
        reset();
        files = $("#multiupload")[0].files;
        if (files.length <= limit) {
            var watchuploads = mw.user.options.get('watchuploads') == "1" ? 'checked=\"checked\"' : '';
            for (var index = 0; index < files.length; index++) {
                var element = files[index];
                var filedesc = $("#mw-upload-form > fieldset:nth-of-type(2)").clone();
                filedesc.attr("id", "file-" + index);
                filedesc.children("legend").text(i18n.msg('imagename').escape() + (index + 1));
                filedesc.find("#mw-htmlform-description > tbody > tr.mw-htmlform-field-HTMLTextField > td.mw-label > label").attr("for", "wpDestFile" + index);
                filedesc.find("#mw-htmlform-description > tbody > tr.mw-htmlform-field-HTMLTextAreaField > td.mw-label > label").attr("for", "wpUploadDescription" + index);
                filedesc.find("#wpDestFile").attr("name", "wpDestFile" + index).attr("id", "wpDestFile" + index).val(element.name);
                filedesc.find("#wpUploadDescription").attr("name", "wpUploadDescription" + index).attr("id", "wpUploadDescription" + index).val(defaultdescription);
                filedesc.find("#wpLicense").attr("name", "wpLicense" + index).attr("id", "wpLicense" + index).val(defaultlicense);
                filedesc.append("<hr />");
                filedesc.append("<td class=\"mw-input\"><input name=\"wpWatchthis" + index + "\" type=\"checkbox\" value=\"1\" " + watchuploads + " id=\"wpWatchthis" + index + "\">&nbsp;<label for=\"wpWatchthis" + index + "\">" + mw.message('watchthisupload').text() + "</label></td>");
                filedesc.append("<td class=\"mw-input\"><input name=\"wpIgnoreWarning" + index + "\" type=\"checkbox\" value=\"1\" id=\"wpIgnoreWarning" + index + "\">&nbsp;<label for=\"wpIgnoreWarning" + index + "\">" + mw.message('ignorewarnings').text() + "</label></td>");
                $("#mw-upload-form > span").before(filedesc.show());
            }
        } else {
            alert(i18n.msg('limit').plain());
            $("#multiupload").val("");
            reset();
        }
    }

    /*
     * Reset form to its initial state
     */
    function reset() {
        files = [];
        $("#mw-upload-form > fieldset:nth-of-type(2) ~ fieldset").remove();
    }

    /*
     * Initiate uploading process
     */
    function uploadFiles(event) {
        event.preventDefault();

        if (files.length === 0) {
            alert(i18n.msg('nofile').plain());
            return false;
        } else if (files.length > limit) {
            alert(i18n.msg('limit').plain());
            return false;
        }

        $("#mw-content-text").hide();
        $("<h3>" + i18n.msg('successful').escape() + "</h3><ul id='multiUploadDone'></ul><div style='display:none;' id='multiUploadWarnings'><h3>" + i18n.msg('warnings').escape() + "</h3><ul></ul></div><div style='display:none;' id='multiUploadFailed'><h3>" + i18n.msg('failed').escape() + "</h3><ul></ul></div>").prependTo("#content");
        progressBarWidget = new OO.ui.ProgressBarWidget();
        progressBarWidget.$element.prependTo('#content');
        document.body.scrollIntoView(true);
        apiUpload();
    }

    /*
     * Make API Requests to upload files
     */
    function apiUpload() {
        if (curFile > files.length) {
            allowCloseWindow.release();
            if (uploadResultCount.warnings === 0 && uploadResultCount.errors === 0) {
                showNotification('success');
            } else {
                if (uploadResultCount.warnings !== 0) {
                    showNotification('warning', uploadResultCount.warnings);
                }
                if (uploadResultCount.errors !== 0) {
                    showNotification('error', uploadResultCount.errors);
                }
            }
            progressBarWidget.setProgress(100);
            progressBarWidget.$element.hide();
            return;
        }
        if (files[curFile] === undefined) {
            curFile++;
            apiUpload();
            return;
        }

        var progress = 100 * curFile / files.length;
        progressBarWidget.setProgress(progress);
        var filename = $("#wpDestFile" + curFile).val() || files[curFile].name;
        var license = $("#wpLicense" + curFile + " option:selected").prop("title") !== "{{}}" ? "== " + mw.message('license-header').plain() + " ==\n" + $("#wpLicense" + curFile + " option:selected").prop("title") : "";
        var description = $("#wpUploadDescription" + curFile).val() ? "== " + mw.message('filedesc').plain() + " ==\n" + $("#wpUploadDescription" + curFile).val() : "";
        var watch = $("#wpWatchthis" + curFile).is(":checked") ? 'watch' : 'nochange';
        var ignoreWarnings = $("#wpIgnoreWarning" + curFile).is(":checked");
        var params = {
            action: 'upload',
            file: files[curFile],
            filename: filename,
            filesize: files[curFile].size,
            token: token,
            text: description + "\n" + license,
            watchlist: watch,
            format: 'json',
            formatversion: 2,
            errorformat: 'html',
            errorlang: config.wgUserLanguage,
        };
        if (ignoreWarnings) {
            params.ignorewarnings = 1;
        }

        var options = {
            contentType: 'multipart/form-data',
            // No timeout (copied from mw.Api.upload code)
            timeout: 0,
        };

        // Use `api.post()` manually instead of the `api.upload()` convenience wrapper. This is because:
        // a) `api.upload()` uses a parameter allowlist that is incomplete. In particular `errorformat` is filtered,
        //    which would prevent us from getting back human readable error message.
        // b) If you upload with `ignorewarnings` and the upload produced warnings, but succeeded,
        //    `api.upload()` will classify the call as failed, meaning we would need to add a special case for this.
        api.post(params, options).done(function (data) {
            console.log(data);
            if (data.upload.result === 'Warning') {
                uploadResultCount.warnings++;
                getUploadWarningTexts(data.upload.warnings, filename).done(function(warnings) {
                    $("#multiUploadWarnings > ul").append(makeFailureItem(filename, warnings));
                    $("#multiUploadWarnings").show();
                });
            } else if (data.upload.result === 'Success') {
                $("#multiUploadDone").append('<li><a href="' + data.upload.imageinfo.descriptionurl + '" target="_blank">' + data.upload.filename + '</a></li>');
            } else {
                console.warn('Unexpected success result', data);
            }
            curFile++;
            apiUpload();
        }).fail(function (code, data) {
            console.log(code);
            console.log(data);
            uploadResultCount.errors++;
            var failureItem;
            if (data.errors) {
                var errorReasons = data.errors.map(function(error) { return error.html; });
                failureItem = makeFailureItem(filename, errorReasons);
            } else if (code === 'http') {
                failureItem = makeFailureItem(filename, i18n.msg('network-error').escape());
            } else {
                failureItem = makeFailureItem(filename, i18n.msg('unknown-error').escape());
            }
            $("#multiUploadFailed > ul").append(failureItem);
            $("#multiUploadFailed").show();
            curFile++;
            apiUpload();
        });
    }

    function makeFailureItem(filename, reasons) {
        if (reasons && !Array.isArray(reasons)) {
            reasons = [reasons];
        }

        var item = $('<li>');
        if (!reasons || reasons.length === 0) {
            item.text(filename);
        } else if (reasons.length === 1) {
            item.text(filename + ': ').append(reasons[0]);
        } else {
            var reasonList = $('<ul>');
            reasons.forEach(function(reason) {
                reasonList.append($('<li>').html(reason));
            });
            item.text(filename + ':').append(reasonList);
        }
        return item;
    }

    function getUploadWarningTexts(warnings, filename) {
        var deferred = $.Deferred();

        var parseDataWrapper = $('<div>');
        var correctedFilename = warnings['badfilename'] || filename;
        for (var warningKey in warnings) {
            var warningData = warnings[warningKey];
            var message = getLocalizedWarningMessage(warningKey, warningData, correctedFilename);
            $('<div>').html(message).appendTo(parseDataWrapper);
        }

        api.parse(parseDataWrapper.html()).done(function(parsedData) {
            var parsedWarnings = $(parsedData).children().map(function() {
                return this.innerHTML;
            }).get();
            deferred.resolve(parsedWarnings);
        }).fail(function() {
            deferred.reject();
        });

        return deferred.promise();
    }

    function getLocalizedWarningMessage(key, args, filenameWithoutNamespace) {
        switch (key) {
            case 'badfilename': {
                var message = mw.message('badfilename', args).plain();
                return message;
            }
            case 'duplicate': {
                var filenames = args;
                var message = mw.message('file-exists-duplicate', filenames.length).plain();
                var gallery = '<gallery>\n';
                filenames.forEach(function(name) {
                    gallery += prependNamespace('file', name) + '\n';
                });
                gallery += '</gallery>';
                message += '\n' + gallery;
                return message;
            }
            case 'exists': {
                var filename = prependNamespace('file', args);
                var message = mw.message('fileexists', filename).plain();
                return message;
            }
            case 'nochange': {
                var filename = prependNamespace('file', filenameWithoutNamespace);
                var message= mw.message('fileexists-no-change', filename).plain();
                return message;
            }
            default: {
                // There is no exhaustive documentation on all possible warnings.
                // For now the (seemingly) most common ones are implemented.
                // For the rest we fall back to this generic message and wait for feedback.
                var warningKey = '<code>' + key + '</code>';
                var warningDetails = '<code>' + JSON.stringify(args) + '</code>';
                var message = i18n.msg('unknown-warning', warningKey, warningDetails).plain();
                return message;
            }
        }
    }

    function showNotification(type, count) {
        var text = i18n.msg(type + '-notification', count).parse();
        var messageWidget = new OO.ui.MessageWidget({
            type: type,
            inline: true,
            label: text
        });
        mw.notification.notify(messageWidget.$element);
    }

    function prependNamespace(canoncialNamespace, pageName) {
        var namespaceId = config.wgNamespaceIds[canoncialNamespace];
        var formattedNamespace = config.wgFormattedNamespaces[namespaceId];
        var fullPageName = formattedNamespace  + ':' + pageName;
        return fullPageName;
    }

    mw.hook('dev.i18n').add(preload);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});