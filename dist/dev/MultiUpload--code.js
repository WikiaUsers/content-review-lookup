/**
 * @name        MultiUpload
 * @author      Gguigui1, KhangND, Universal Omega
 * @desc        Allows selecting multiple files directly from the dialog box and upload them
 * <nowiki>
 */
 
mw.loader.using([
    'mediawiki',
    'mediawiki.user',
    'mediawiki.api',
    'jquery.client',
    'jquery.spinner',
    'ext.wikia.LinkSuggest'
], function() {
    //License preview added by Universal Omega
 //License preview will only be enabled if window.MultiUploadLicensePreview is set to true in JS
wgAjaxLicensePreview=true;
function getLicensePreview(num) {
    window.licenseSelectorCheck = function () {
        var selector = document.getElementById("license" + num);
        var selection = selector.options[selector.selectedIndex].value;
        if (selector.selectedIndex > 0) {
            if (selection == "") {
                // Option disabled, but browser is broken and doesn't respect this
                selector.selectedIndex = 0;
            }
        }
        var wgUploadLicenseObj = {

        'responseCache': {
            '': ''
        },

        'fetchPreview': function (license) {
            if (!mw.config.get('wgAjaxLicensePreview'))
                return;
            for (cached in this.responseCache) {
                if (cached == license) {
                    this.showPreview(this.responseCache[license]);
                    return;
                }
            }
            $('#license' + num).injectSpinner('license' + num);

            var title = document.getElementById('imagename' + num).value;
            if (!title)
                title = 'File:Sample.jpg';

            var url = mw.util.wikiScript('api')
                 + '?action=parse&text={{' + encodeURIComponent(license) + '}}'
                 + '&title=' + encodeURIComponent(title)
                 + '&prop=text&pst&format=json';

            var req = sajax_init_object();
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    wgUploadLicenseObj.processResult(eval('(' + req.responseText + ')'), license);
                }
            };
            req.open('GET', url, true);
            req.send('');

        },

        'processResult': function (result, license) {
            $.removeSpinner('license' + num);
            this.responseCache[license] = result['parse']['text']['*'];
            this.showPreview(this.responseCache[license]);
        },

        'showPreview': function (preview) {
            var previewPanel = document.getElementById('mw-license-preview' + num);
            if (previewPanel.innerHTML != preview)
                previewPanel.innerHTML = preview;
        }

    };
        // We might show a preview
        wgUploadLicenseObj.fetchPreview(selection);
    };
    var wpLicense = document.getElementById('license' + num);

    if (mw.config.get('wgAjaxLicensePreview') && wpLicense) {
        // License selector check
        wpLicense.onchange = licenseSelectorCheck;

        // License selector table row
        var wpLicenseRow = wpLicense.parentNode.parentNode;
        var wpLicenseTbody = wpLicenseRow.parentNode;

        var row = document.createElement('tr');
        var td = document.createElement('td');
        row.appendChild(td);
        td = document.createElement('td');
        td.id = 'mw-license-preview' + num;
        row.appendChild(td);

        wpLicenseTbody.insertBefore(row, wpLicenseRow.nextSibling);
    }

    
}
    var groups  = mw.config.get('wgUserGroups').join(),
        config = mw.config.get([
            'wgCanonicalSpecialPageName',
            'wgNamespaceNumber',
            'wgTitle',
            'wgUserLanguage',
            'wgUserName'
        ]);

    // load protections
    if(window.MultiUploadLoaded
    || config.wgUserName === null
    || !/autoconfirmed/.test(groups)) {
        return;
    } window.MultiUploadLoaded = true;

    var storage = 'MultiUploadLicenses';
    var content = $('#mw-content-text');
    var allowTypes = $.map( mw.config.get("wgFileExtensions"), function(file_extensions) {
 return('.' + file_extensions)
});
    var style = {
        block: {
            display: 'inline-block',
            margin: '0 8px'
        },
        textarea: {
            width: '100%',
            height: 150,
            boxSizing: 'border-box',
            resize: 'none'
        }
    };

    function loadMWMessagesIfMissing(messages) {
        var deferred = $.Deferred(),
            missingMessages = messages.filter(function (message) { return !mw.messages.exists(message); });
        if (!missingMessages.length) {
            deferred.resolve();
        } else {
            $.get(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'query',
                meta: 'allmessages',
                ammessages: missingMessages.join('|'),
                amlang: config.wgUserLanguage
            }).then(function (data) {
                if ($.isArray(data.query.allmessages)) {
                    $.each(data.query.allmessages, function (_, message) {
                        if (message.missing !== '') {
                            mw.messages.set(message.name, message['*']);
                        }
                    });
                }
                deferred.resolve();
            }, function () {
                // Silently swallow failures; we don't want error reporting to stall just because we failed to fetch some messages.
                deferred.resolve();
            });
        }
        return deferred;
    }

    var MultiUpload = {
        input: $(),  // available on init
        editor: $(), // available on init
        button: $(), // available on init
        fileCount: 0,// available on create
        preload: function(i18n) {
            $.extend(this, window.MultiUploadoption || {});
            this.i18n = i18n;

            // prepends a link in My Tools menu
            $('<li>', {
                'class': 'custom',
                prependTo: '#my-tools-menu',
                append: $('<a>', {
                    href: mw.util.getUrl('Special:MultiUpload'),
                    text: this.i18n.msg('title').plain()
                })
            });

            // creates Special page
            if(
                (config.wgNamespaceNumber === -1 && config.wgTitle === 'MultiUpload') ||
                (config.wgCanonicalSpecialPageName === 'Blankpage' && /MultiUpload/.test($.getUrlVar('blankspecial')))
            ) {
                $('.page-header__title').text(this.i18n.msg('title').plain());
                $('title').text(this.i18n.msg('title').plain());
                this.init();
                content.after(
                    $('<div>', {
                        id: 'mu-footer',
                        css: {
                            textAlign: 'center',
                            fontSize: 10,
                            borderTop: '1px solid',
                            marginTop: 10
                        },
                        text: this.i18n.msg('poweredby').plain() + ' ',
                        append: $('<a>', {
                            href: '//dev.fandom.com/wiki/MultiUpload',
                            text: 'MultiUpload'
                        })
                    })
                );
            }
        },
        init: function() {
            content.empty().append([
                $('<input>', {
                    id: 'fileinput',
                    type: 'file',
                    multiple: true,
                    accept: allowTypes.join(),
                }),
                $('<div>', {
                    id: 'editor',
                    css: { display: 'none' },
                }),
                $('<button>', {
                    id: 'go',
                    text: this.i18n.msg('update').plain(),
                    click: $.proxy(this.getLicenses, this)
                })
            ]);
            this.input = $('#fileinput');
            this.editor = $('#editor');
            this.button = $('#go');
        },
        notify: function(message, type) {
            new BannerNotification(message, type, null).show();
        },
        getLicenses: function() {
            var data = localStorage.getItem(storage);
            if(data !== null) {
                this.create(data);
                 if(window.MultiUploadLicensePreview === true){
              var limit = this.max < this.fileCount ? this.max : this.fileCount;
        for (i = 1; i <= limit; i++) {
                   getLicensePreview(i);
              }
                 }
      return;
                
            }

            $.get(mw.util.wikiScript('api'), {
                action: 'query',
                meta: 'allmessages',
                ammessages: 'Licenses',
                format: 'json'
            }).success(
                $.proxy(this.create, this)
            ).error($.proxy(function(data) {
                this.notify(this.i18n.msg('errorapi').plain() + ' : ' + data.error.info, 'error');
            }), this);
        },
        create: function(data) {
            // conditions
            var formatError = false;
            this.fileCount = this.input[0].files.length;

            $(this.input[0].files).each(function(i, file) {
                if(!new RegExp(allowTypes.join('|\\'), 'i').test(file.name)) {
                    formatError = true;
                    return;
                }
            });
            if (formatError) {
                this.notify(this.i18n.msg('fileformat').plain(), 'warn');
                return;
            }
            if (!this.input[0].files) {
                this.notify(this.i18n.msg('browsersupport').plain(), 'notify');
                return;
            }
            if (this.fileCount === 0) {
                this.notify(this.i18n.msg('nofile').plain(), 'warn');
                return;
            }
            if(!this.max
            ||  this.max < 0
            ||  this.max > 101
            || typeof this.max !== 'number') {
                if (/staff|helper|util|bot-global/.test(groups)) {
                    this.max = 200;
                } else if (/bureaucrat|bot/.test(groups)) {
                    this.max = 70;
                } else if (/sysop/.test(groups)) {
                    this.max = 50;
                } else if (/rollback/.test(groups)) {
                    this.max = 30;
                } else {
                    this.max = 20;
                }
            }
            if (!this.max) {
                this.notify(this.i18n.msg('problem').plain(), 'error');
                return;
            }

            // creates form
            data = typeof data === 'object'
                ? data.query.allmessages[0]['*'].trim()
                : data;
            localStorage.setItem(storage, data); // retrieves licenses 1 time only
            var licenses = data.split('\n');
            var limit = this.max < this.fileCount ? this.max : this.fileCount;
            for (i = 1; i <= limit; i++) {
                $('<fieldset>', {
                    id: 'field' + i,
                    appendTo: this.editor,
                    append: [
                        $('<legend>', {
                            text: this.i18n.msg('imagename').plain() + ' ' + i
                        }),
                        $('<div>', {
                            css: style.block,
                            text: this.i18n.msg('filename').plain(),
                            append: $('<input>', {
                                type: 'text',
                                id: 'imagename' + i,
                                'class': 'imagename',
                                val: this.input[0].files[i - 1].name
                            })
                        }),
                        $('<div>', {
                            css: style.block,
                            text: this.i18n.msg('licensetext').plain(),
                            append: $('<select>', {
                                id: 'license' + i,
                                'class': 'license',
                                append: $('<option>', {
                                    val: 'none',
                                    text: this.i18n.msg('nolicense').plain()
                                })
                            })
                        }),

                        $('<div>', {
                            id: 'progress' + i,
                            css: style.block
                        }),
                    ]
                                    
                });
                  
            }
            for (i = 0; i < licenses.length; i++) {
                if (licenses[i].indexOf('**') === 0) {
                    var name = licenses[i].split('|')[0].replace('**', '').trim(),
                        text = licenses[i].split('|')[1];
                    $('<option>', {
                        val: name,
                        text: text,
                        selected: name == this.defaultlicense || this.defaultlicence,
                        appendTo: $('.license').find('optgroup:last-child')
                    });
                } else {
                    $('<optgroup>', {
                        label: licenses[i].replace('*', '').trim(),
                        appendTo: $('.license')
                    });
                }
            }
            $('<div>', {
                appendTo: this.editor,
                text: this.i18n.msg('filedescription').plain()
            }),
            $('<textarea>', {
                appendTo: this.editor,
                id: 'UploadDescription',
                css: style.textarea,
            }).linksuggest();
        $('.license option[value="none"').attr("disabled", "true");
            $('<button>', {
                'class': 'secondary',
                id: 'reset',
                css: style.block,
                text: this.i18n.msg('reset').plain(),
                click: $.proxy(this.init, this),
                appendTo: content
            }),
            $('<input>', {
                type: 'checkbox',
                id: 'ignorewarnings',
                name: 'ignorewarnings',
                appendTo: content
            }),
            $('<label>', {
                'for': 'ignorewarnings',
                text: this.i18n.msg('ignorewarnings').plain(),
                appendTo: content
            });
            jQuery(function ($) {
        'use strict';
        
            if(window.defaultMultiUploadDescription){
                if ($('#UploadDescription').val()) {
            return;
        } 
            var params = {
	action: 'parse',
	page: window.defaultMultiUploadDescription,
	format: 'json',
    prop: 'wikitext'
};
var api = new mw.Api();

api.get(params).done(function(data) {
	$('#UploadDescription').val(data.parse.wikitext['*']);
});
}
        $('.license option[value="none"').attr("disabled", "true");
            });

            license = $('#license' + i).find('option:selected').val(),

            this.input.attr('disabled', true);
            this.editor.show();
            this.button
                .unbind('click')
                .click($.proxy(this.upload, this))
                .text(this.i18n.msg('uploadfiles').plain());
        },
        upload: function() {
            content.find('*').attr('disabled', true);
            $('#reset').removeAttr('disabled');
            
            var obj = this;
            
            var loop = function (i) {
                if (i <= obj.fileCount) {
                    var file = obj.input[0].files[i - 1],
                        filename = $('#imagename' + i).val() || file.name,
                        license = $('#license' + i).find('option:selected').val(),
                        text = $('#UploadDescription').val();
                if(license == "none" && window.requireMultiUploadLicensing === true){
                    alert('Licensing must be complete.');
                    $('*').removeAttr('disabled');
                    return;
                }
                
if(license !== "none") text = '== Summary ==\n' + text + '\n\n== Licensing ==\n{{' + license + '}}\n';
                    obj.uploadFile(file, filename, text, i).always(function(){
                        loop(i+1);
                    });
                }
            };
            loop(1);
        },
        uploadFile: function(fileToUpload, fileName, text, index) {
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
            formdata = new FormData(); 
            formdata.append('action', 'upload');
            formdata.append('format', 'json');
            formdata.append('filename', fileName);
            formdata.append('token', mw.user.tokens.get('editToken'));
            formdata.append('file', fileToUpload);
            formdata.append('text', text);
            formdata.append(
                $('#ignorewarnings').prop('checked') ? 'ignorewarnings' : '', ''
            );

            // https://stackoverflow.com/a/8244082
            return $.ajax({
                url: mw.util.wikiScript('api'),
                contentType: false,
                processData: false,
                type: 'POST',
                data: formdata,
                dataType: 'json',
                xhr: function() { // https://stackoverflow.com/a/27030092
                    myXhr = $.ajaxSettings.xhr();
                    myXhr.upload.addEventListener('progress', function(e) {
                        MultiUpload.progress(index, e);
                    });
                    return myXhr;
                },
                success: $.proxy(function(data) {
                    this.success(index, data);
                }, this),
                error: $.proxy(function(_, __, error) {
                    this.notify(error, 'error');
                }, this)
            });
        },
        progress: function(index, e) {
            var progress = e.loaded / e.total * 100;
            $('#progress' + index).text(progress.toFixed(0) + '%');
        },
        success: function(index, data) {
            // Error
            if (data.error) {
                var errorInfo, errorDetails;

                function displayError() {                
                    $('#progress' + index).html([
                        $('<strong/>').text(errorInfo),
                        (errorDetails === undefined) ? null : $('<br/>'),
                        (errorDetails === undefined) ? null : $('<div/>').text(errorDetails)
                    ]);
                }

                // Excluding variants of `unknownerror`, we're going to ignore `error.info` since it mightn't be localized.
                // See <https://github.com/Wikia/app/blob/release-886.001/includes/upload/UploadBase.php> for special cases.
                if (data.error.code.startsWith('unknownerror')) {
                    errorInfo = data.error.info;
                    displayError();
                } else {
                    var messages = [data.error.code];
                    if (data.error.code === 'verification-error') {
                        messages.push(data.error.details[0]);
                    }
                    loadMWMessagesIfMissing(messages).then(function () {
                        errorInfo = mw.msg(data.error.code);
                        if (data.error.code === 'verification-error') {
                            errorDetails = mw.msg.apply(null, data.error.details);
                        } else if (data.error.code === 'hookaborted') {
                            errorDetails = data.error.error;  // TODO: Determine whether it's safe to assume this'll always be properly escaped HTML.
                        }
                        displayError();
                    });
                }
                return;
            }

            // Success
            if(data.upload.result === 'Success') {
                $('#progress' + index).text(this.i18n.msg('success').plain());
                return;
            }

            // Warnings
            var msg;
            if(data.upload.warnings.hasOwnProperty('was-deleted')) {
                msg = this.i18n.msg('deleted').plain();
            } else if(data.upload.warnings.hasOwnProperty('duplicate')) {
                msg = this.i18n.msg('duplicate').plain();
            } else if(data.upload.warnings.hasOwnProperty('exists')) {
                msg = this.i18n.msg('exist').plain();
            } else {
                msg = this.i18n.msg('success').plain();
            }

            $('#progress' + index).text(msg);
        }
    };

    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('MultiUpload').then(
            $.proxy(MultiUpload.preload, MultiUpload)
        );
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
  });