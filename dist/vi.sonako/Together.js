// Insert it into Edit Button (Oasis)
if (mw.config.get('wgUserName') !== null) {
    $('.page-header__contribution-buttons .wds-dropdown li:first-of-type').after('<li><a onclick="TogetherLauncher(); return false;" id="togetherjs">Edit Together!</a></li>');
    // TogetherJS rights belong to Mozilla Labs
    // Mozilla License 1.0, 2014
    // More information: https://togetherjs.com
    importScriptURI('https://togetherjs.com/togetherjs-min.js');
    //Import i18n configuration
    importScriptPage('MediaWiki:Together.js/i18n.js', 'sonako');

    //Next function provides quick tags insert for toolbar & edittools
    (function ($) {
        $.fn.wrapSelected = function (open, close, defaultText) {
            return this.each(function () {
                var textarea = $(this);
                var value = textarea.val();
                var start = textarea[0].selectionStart;
                var end = textarea[0].selectionEnd;
                if (value.substring(start, end) === '') {
                    textarea.val(value.substr(0, start) + open + defaultText + close + value.substring(end, value.length));
                } else {
                    textarea.val(value.substr(0, start) + open + value.substring(start, end) + close + value.substring(end, value.length));
                }
            });
        };
    })(jQuery);

    if (mw.config.get('wgAction') == 'view') {
        function insertTags(openTag, closeTag) {
            $("textarea#speedraw").wrapSelected(openTag, closeTag, '');
        }
    }

    function SpeedrawEditTools() {
        $('#speedraw-edittools-btn').hide(300);
        if (!($('#speedraw-edittools').length)) {
            $.get(wgServer + wgScriptPath + '/wiki/MediaWiki:Edittools', function (data) {
                $('body').append('<section class="modalWrapper" id="speedraw-edittools" style="margin-left: 10%; top: 70px; width: 80%; font-size: 16px; height: auto; z-index: 2000000002; position: fixed"><button class="speedraw-edittools-close wikia-chiclet-button" style="float:right"><img src="https://images.wikia.nocookie.net/__cb1395341051/common/skins/oasis/images/icon_close.png"></button></section>');
                $('#speedraw-edittools').append($(data).find('#editpage-specialchars'));
            }).done(function () {
                $('.speedraw-edittools-close').click(function () {
                    $('#speedraw-edittools').fadeOut(300);
                    $('#speedraw-edittools-btn').show(300);
                });
            });

        } else {
            $('#speedraw-edittools').fadeIn(300);
        }
    }

    function TogetherLauncher() {
        // Basic way to prevent editor from loading if the user have no permissions to edit the page 
        if (!$('#ca-viewsource').length) {
            $('#WikiaArticle').html('<p style="text-align: center"><img src="https://i.imgur.com/Y5seQcB.gif"><br />Đang tải...</p>');
            //TogetherJS configuration
            TogetherJSConfig_getUserName = function () {
                return mw.config.get('wgUserName');
            };
            TogetherJSConfig_getUserAvatar = function () {
                return $('img.wds-avatar__image').attr('src');
            };
            TogetherJSConfig_suppressJoinConfirmation = true;
            TogetherJSConfig_dontShowClicks = true;
            TogetherJSConfig_on_ready = function () {
                SpeedrawEditor();
            };
            if (!TogetherJS.running) {
                TogetherJS();
            }
        } else {
            alert(i18n['speedraw_permission_error']);
        }

    }

    function SpeedrawEditor() {
        importStylesheetPage('MediaWiki:Together.css', 'sonako');
        //Variables containing editor's body
        var speedraw_body = '<div class="speedraw-toolbar"></div>' + '<textarea id="speedraw-summary" placeholder="' + i18n['summary_placeholder'] + '" style="width: 98%;" class="ui-autocomplete-input" rows="3"></textarea>' +
            '<textarea id="speedraw" style="width: 98%;" class="ui-autocomplete-input" rows="40" autofocus></textarea>',
            speedraw_toolbar = '<img id="speedraw-et-bold" title="Chữ đậm"/>' +
            '<img id="speedraw-et-italic" title="Chữ nghiêng"/>' +
            '<img id="speedraw-et-internal" title="Liên kết"/>' +
            '<img id="speedraw-et-external" title="Liên kết ngoài (nhớ ghi http://)"/>' +
            '<img id="speedraw-et-headline" title="Đề mục cấp 2"/>' +
            '<img id="speedraw-et-file" title="Chèn hình"/>' +
            '<img id="speedraw-et-math" title="Công thức toán (LaTeX)"/>' +
            '<img id="speedraw-et-nowiki" title="Không theo định dạng wiki"/>' +
            '<img id="speedraw-et-sign" title="Chữ ký có ngày"/>' +
            '<a class="wikia-button secondary" onclick="SpeedrawEditTools(); return false" style="margin-left: 5px;" id="speedraw-edittools-btn">' + i18n['et_button_more'] + '</a>' +
            '<label class="speedraw-minor"><input type="checkbox" tabindex="21" name="speedraw-minoredit" id="speedraw-minoredit" accesskey="i">' + i18n['button_minor'] + '</label>' +
            '<div style="float: right">' +
            '<button id="speedraw-et-Diff" class="wikia-button secondary" title="Xem thay đổi" tabindex="6">Diff</button>\n' +
            '</div>',
            speedraw_alerts = '<span id="save-ok">' + i18n['notif_saved'] + '</span><span id="save-error">' + i18n['notif_error'] + '</span>',
            speedraw_buttons = '<div id="speedraw-buttons"><a class="wikia-button" id="speedraw-save" onclick="SpeedrawSaveText(); return false;">' + i18n['button_save'] + '</a>&nbsp;<a class="wikia-button secondary" id="speedraw-cancel togetherjs-end-session" class="togetherjs-destructive" onclick="SpeedrawRemoveEditor(); return false;">' + i18n['button_back'] + '</a>' + speedraw_alerts + '</div>';
        $('#WikiaArticle').html(speedraw_buttons + speedraw_body);
        $('.speedraw-toolbar').html(speedraw_toolbar);

        $('.speedraw-toolbar > img').attr({
            src: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D',
            style: 'width: 22px; height: 23px;'
        });

        //Toolbar tags inserting configuration
        $('#speedraw-et-bold').click(function () {
            $("textarea#speedraw").wrapSelected("'''", "'''", i18n['et_bold']);
        });
        $('#speedraw-et-italic').click(function () {
            $("textarea#speedraw").wrapSelected("''", "''", i18n['et_italic']);
        });
        $('#speedraw-et-internal').click(function () {
            $("textarea#speedraw").wrapSelected("[[", "]]", i18n['et_internal_link']);
        });
        $('#speedraw-et-external').click(function () {
            $("textarea#speedraw").wrapSelected("[http://", "]", i18n['et_external_link']);
        });
        $('#speedraw-et-headline').click(function () {
            $("textarea#speedraw").wrapSelected("== ", " ==", i18n['et_headline']);
        });
        $('#speedraw-et-file').click(function () {
            $("textarea#speedraw").wrapSelected("[[File:", "]]", i18n['et_file']);
        });
        $('#speedraw-et-math').click(function () {
            $("textarea#speedraw").wrapSelected("<math>", "</math>", i18n['et_math']);
        });
        $('#speedraw-et-nowiki').click(function () {
            $("textarea#speedraw").wrapSelected("<nowiki>", "</nowiki>", i18n['et_nowiki']);
        });
        $('#speedraw-et-sign').click(function () {
            $("textarea#speedraw").wrapSelected("", "\~\~\~\~", "");
        });
        $('#speedraw-et-Diff').on('click', function() {
            showdiff();
        });
        //Purging the page cache before obtaining a wikitext
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                'action': 'purge',
                'title': mw.config.get('wgPageName')
            },
            type: 'GET'
        });

        //Grabbing wikitext of the page
        $.ajax({
            url: mw.config.get('wgServer') + '/wiki/' + mw.config.get('wgPageName') + '?action=raw',
            type: 'GET',
            success: function (data) {
                $('textarea#speedraw').val(data);

            }
        });
        //Reinitializing TogetherJS to synchronize all the new elements
        TogetherJS.reinitialize();
    }

    function showdiff() {
        var request = {
          format: 'json',
          action: 'query',
          prop: "revisions",
          titles: mw.config.get('wgPageName'),
          token: mw.user.tokens.get("editToken")
        };
        if ($('#speedraw').val()) request.rvdifftotext = $('#speedraw').val();
        else request.rvdiffto="prev";

        new mw.Api().post(request).done(function(result) {
          diffhtml = result.query.pages[Object.keys(result.query.pages)].revisions[0].diff['*'];
          if (diffhtml.length === 0) {
            showResult("Không có thay đổi nào", "xác nhận");
          } else {
            $("<table>").css({'width':'100%','font-size':'16px'}).html(diffhtml).makeModal({
              id: "ModalDiff",
              width: $(window).width() - 100
            });
            $("#ModalDiff").css({
              top: 50,
              overflow: "auto",
              height: $(window).height() - 150
            });
            if ($('#speedraw').size()) {
              $(".modalWrapper > h1").css("margin-bottom",0).append(
                $("<button>", {
                  id:"diffButton",
                  style:"font-size: 14px;margin:0px 5px;float:right;",
                  html:"Lưu thay đổi"
                }).click(function(){ 
                  $('#ModalDiff .close').trigger('click');
                  $('#speedraw-save').trigger('click');
                })
              );
            }
          }
        });
    }

    function SpeedrawRemoveEditor() {
        $.get(mw.config.get('wgServer') + '/wiki/' + mw.config.get('wgPageName'), function (data) {
            $('#WikiaArticle').html($(data).find('#WikiaArticle'));
        });
        if (TogetherJS.running) {
            TogetherJS(); //closing TogetherJS if it's running
        }
    }

    /* Saving edits */
    function SpeedrawSaveText() {
        var CollArticleContent = $('textarea#speedraw').val();
        var CollArticleSummary = $('textarea#speedraw-summary').val();
        var CollEditPostData;
        if ($("#speedraw-minoredit").prop("checked")) {
            CollEditPostData = {
                format: 'json',
                action: 'edit',
                title: mw.config.get('wgPageName'),
                text: CollArticleContent,
                summary: CollArticleSummary,
                token: mw.user.tokens.get('editToken'),
                minor: true
            };
        } else {
            CollEditPostData = {
                format: 'json',
                action: 'edit',
                title: mw.config.get('wgPageName'),
                text: CollArticleContent,
                summary: CollArticleSummary,
                token: mw.user.tokens.get('editToken')
            };
        }
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: CollEditPostData,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data && data.edit && data.edit.result == 'Success') {
                    $('#save-ok').fadeIn(300).delay(2000).fadeOut(300);
                } else if (data && data.error) {
                    $('#save-error').fadeIn(100).delay(2000).fadeOut(100);
                    console.log('API error: "' + data.error.code + '": ' + data.error.info);
                } else {
                    $('#save-error').fadeIn(300).delay(2000).fadeOut(300);
                    console.log('Error: Unknown result from API.');
                }
            },
            error: function (xhr) {
                $('#save-error').fadeIn(300).delay(2000).fadeOut(300);
                console.log('Error: Request failure.');
            }
        });
    }
    TogetherJSConfig_getUserName = function () {
        return mw.config.get('wgUserName');
    };
    TogetherJSConfig_getUserAvatar = function () {
        return $('img.wds-avatar').attr('src');
    };
    TogetherJSConfig_suppressJoinConfirmation = true;
    TogetherJSConfig_dontShowClicks = true;
    TogetherJSConfig_on_ready = function () {
        SpeedrawEditor();
    };
    $(window).on('beforeunload', function () {
        SpeedrawRemoveEditor();
    });
}