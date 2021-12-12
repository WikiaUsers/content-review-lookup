/**
 * Name:        MultiUploadJS
 * Author:      Fujimaru-kun
 * Based on:    MultiUpload (by Gguigui1 and KhangND), Gadget-multiupload.js (by Pcj)
 * Description: Allows upload of multiple files at the same time
 */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    'use strict';
    var config = mw.config.get([
            'wgCanonicalSpecialPageName',
            'wgUserLanguage',
            'wgUserGroups',
            'wgVersion'
        ]);

        if (
            window.MultiUploadJSLoaded ||
            config.wgCanonicalSpecialPageName !== "Upload" ||
            $("#wpForReUpload").val() || //Disabling for Reupload
            !/autoconfirmed/.test(config.wgUserGroups.join())
        ) {
            return;
        }
        window.MultiUploadJSLoaded = true;

        var api = new mw.Api(),
            i18n,
            preloads = 1,
            token = mw.user.tokens.get('editToken'),
            files = [],
            stdmsgs = ['filedesc', 'license-header', 'fileexists-no-change', 'fileexists-duplicate-version', 'verification-error', 'fileexists-shared-forbidden', 'permissiondenied', 'watchthisupload', 'ignorewarnings'].join('|'),
            limit = (window.MultiUploadoption && window.MultiUploadoption.max) ? window.MultiUploadoption.max : -1,
            defaultlicense = (window.MultiUploadoption && window.MultiUploadoption.defaultlicense) ? window.MultiUploadoption.defaultlicense : '',
            curFile = 0
            ;

        function preload() {
            if (--preloads === 0) {
                window.dev.i18n.loadMessages('MultiUpload').then(init);
            }
        }

        function init(i18nData) {
            i18n = i18nData;
            setLimit();

            getMessages();
            $("#wpUploadFile").parent().parent().addClass("regularFileSelect");
            $("tr.regularFileSelect").after('<tr class="multipleFileSelect"><td class="mw-label">&nbsp</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
            $("#mw-htmlform-source > tbody > tr.mw-htmlform-field-UploadSourceField.regularFileSelect").remove();
            $("#mw-upload-form > fieldset:nth-child(3)").remove();
            $("#mw-upload-form > span > input.mw-htmlform-submit").remove();
            $("#mw-upload-form > fieldset:nth-child(2)").hide();
            $("span.mw-htmlform-submit-buttons").append('<input type="button" value="' + i18n.msg('uploadfiles').escape() + '" class="multipleFileSelect" id="multiFileSubmit" />');
            $("span.mw-htmlform-submit-buttons").append('<input type="button" value="' + i18n.msg('reset').escape() + '" class="multipleFileSelect" id="multiFileReset" />');
            $("#multiupload").change(addFields);
            $("#multiFileSubmit").click(uploadFiles);
            $("#multiFileReset").click(reset);
        }
        
        /*
        * Set Maximum number of file the user can import at one time (can be overriden by a config var but its value is capped at 100)
        */
        function setLimit() {
            if (limit < 0 ||
                limit > 101 ||
                typeof limit !== 'number') {
                if (/staff|helper|util|bot-global|wiki-representative|wiki-specialist/.test(config.wgUserGroups.join())) {
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
                for (var index = 0; index < files.length; index++) {
                    var element = files[index];
                    var filedesc = $("#mw-upload-form > fieldset:nth-child(2)").clone();
                    filedesc.attr("id", "file-" + index);
                    filedesc.children("legend").text(i18n.msg('imagename').escape() + index);
                    filedesc.find("#mw-htmlform-description > tbody > tr.mw-htmlform-field-HTMLTextField > td.mw-label > label").attr("for", "wpDestFile" + index);
                    filedesc.find("#mw-htmlform-description > tbody > tr.mw-htmlform-field-HTMLTextAreaField > td.mw-label > label").attr("for", "wpUploadDescription" + index);
                    filedesc.find("#wpDestFile").attr("name", "wpDestFile" + index).attr("id", "wpDestFile" + index).val(element.name);
                    filedesc.find("#wpUploadDescription").attr("name", "wpUploadDescription" + index).attr("id", "wpUploadDescription" + index);
                    filedesc.find("#wpLicense").attr("name", "wpLicense" + index).attr("id", "wpLicense" + index).val(defaultlicense);
                    filedesc.append("<hr />");
                    filedesc.append("<td class=\"mw-input\"><input name=\"wpWatchthis" + index + "\" type=\"checkbox\" value=\"1\" checked=\"checked\" id=\"wpWatchthis" + index + "\">&nbsp;<label for=\"wpWatchthis" + index + "\">" + i18n.msg('watchthisupload').escape() + "</label></td>");
                    filedesc.append("<td class=\"mw-input\"><input name=\"wpIgnoreWarning" + index + "\" type=\"checkbox\" value=\"1\" id=\"wpIgnoreWarning" + index + "\">&nbsp;<label for=\"wpIgnoreWarning" + index + "\">" + i18n.msg('ignorewarnings').escape() + "</label></td>");
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
            $("#mw-upload-form > fieldset:nth-child(2) ~ fieldset").remove();
        }

        /*
        * Get standard messages for supported errors 
        */
        function getMessages() {
            api.get({
                action: 'query',
                meta: 'allmessages',
                amlang: config.wgUserLanguage,
                ammessages: stdmsgs
            }).then(function (data) {
                var msg = data.query.allmessages;
                msg.forEach(function (message) {
                    i18n['_messages'][config.wgUserLanguage][message.name] = message['*'];
                });
            });
        }

        /* 
        * Initiate uploading process
        */
        function uploadFiles() {

            if (files.length === 0) {
                alert(i18n.msg('nofile').plain());
                return false;
            } else if (files.length > limit) {
                alert(i18n.msg('limit').plain());
                return false;
            }

            $("#firstHeading").text(i18n.msg('uploading').escape());
            $("#mw-content-text").hide();
            $("<h3>" + i18n.msg('successful').escape() + "</h3><ul id='multiUploadDone'></ul><div style='display:none;' id='multiUploadFailed'><h3>" + i18n.msg('failed').escape() + "</h3><ul></ul></div>").prependTo("#content");
            apiUpload();
        }
        
        /*
        * Make API Requests to upload files
        */
        function apiUpload() {
            if (curFile > files.length) {
                $("<h3>" + i18n.msg('done').escape() + "</h3>").appendTo("#content");
                return;
            }
            if (files[curFile] === undefined) {
                curFile++;
                apiUpload();
                return;
            }
            var filename = $("#wpDestFile" + curFile).val() || files[curFile].name;
            var license = $("#wpLicense" + curFile + " option:selected").prop("title") !== "{{}}" ? "== " + i18n.msg('license-header').plain() + " ==\n" + $("#wpLicense" + curFile + " option:selected").prop("title") : "";
            var description = $("#wpUploadDescription" + curFile).val() ? "== " + i18n.msg('filedesc').plain() + " ==\n" + $("#wpUploadDescription" + curFile).val() : "";
            var watch = $("#wpWatchthis" + curFile).is(":checked") ? 'watch' : 'nochange';
            var warning = $("#wpIgnoreWarning" + curFile).is(":checked");
            var params = {
                token: token,
                filename: filename,
                text: description + "\n" + license,
                watchlist: watch,
                ignorewarnings: '1',
                format: 'json'
            }
            if (!warning) {
                delete params.ignorewarnings;
            }

            api.upload(files[curFile], params).done(function (d) {
                console.log(d);
                $("#multiUploadDone").append('<li><a href="' + d.upload.imageinfo.descriptionurl + '" target="_blank">' + d.upload.filename + '</a></li>');
                curFile++;
                apiUpload();
            }).fail(function (d) {
                if (!warning || stdmsgs.includes(d)) {
                    $("#multiUploadFailed ul").append('<li>' + filename + ': ' + i18n.msg(d,"File:"+filename).parse() + '</li>');
                    $("#multiUploadFailed").show();
                } else {
                    $("#multiUploadDone").append('<li>' + filename + ': ' + i18n.msg(d).escape() + '</li>');
                }
                curFile++;
                apiUpload();
            });
        }
        mw.hook('dev.i18n').add(preload);
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
            ]
        });
});