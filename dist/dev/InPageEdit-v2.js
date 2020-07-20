/**
 * MediaWiki JS Plugin: In Page Edit
 * Author: 机智的小鱼君
 * Url: https://github.com/Dragon-Fish/InPageEdit-v2
 **/
; (function () {
  'use strict';
  // 创建全局函数
  if (typeof(InPageEdit) !== 'undefined' && typeof(InPageEdit.version) !== 'undefined') throw '[InPageEdit] 已经有一个IPE插件在执行了';
  window.InPageEdit = window.InPageEdit || {};
  InPageEdit.isCanary = false;
  /*=version*/InPageEdit.version = '2.13.0(build_2795)';/*version=*/

  /** 处理依赖 **/
  importArticles({
    type: 'script',
    articles: [
      'u:dev:MediaWiki:I18n-js/code.js',
      'u:dev:MediaWiki:Ssi-modal.js'
    ]
  });
  importArticles({
    type: 'style',
    articles: [
      'u:dev:MediaWiki:Ssi-modal.css',
      'u:dev:MediaWiki:InPageEdit-v2.css'
    ]
  });

  /*** BOT FLAG ***/
  /** 导入 i18n 组件 **/
  mw.hook('dev.i18n').add(function (i18no) {
    i18no.loadMessages('InPageEdit-v2').then(init);
  });

  /** InPageEdit主框架 **/
  function init(i18n) {
    // i18n
    function msg(i) {
      return i18n.msg(i).parse();
    };
    /** HTML 组件 **/
    const $br = $('<br/>'),
      $clear = $('<div>', { style: 'clear:both' }),
      $hr = $('<hr/>'),
      $progress = $('<div>', { class: 'ipe-progress', style: 'width: 100%' }).append($('<div>', { class: 'ipe-progress-bar' }));

    /** 快速编辑模块 **/
    InPageEdit.edit = InPageEdit.quickEdit = function (option) {
      mw.hook('InPageEdit.quickEdit').fire();
      // 变量
      var option = option || {};
      var preference = localStorage.InPageEditPreference || '{}';
      preference = JSON.parse(preference);
      var editPage = option.page || mw.config.get('wgPageName');
      editPage = decodeURIComponent(editPage);
      var
        editSection = option.section || false,
        editRevision = option.revision || false,
        summaryRevision = '',
        editText,
        editSummary = preference.editSummary || msg('preference-summary-default'),
        editMinor = preference.editMinor || false,
        editNotice = '',
        outSideClose = preference.outSideClose;
      if (outSideClose === undefined) outSideClose = true;
      var jsonGet = {
        action: 'parse',
        page: editPage,
        prop: 'wikitext|langlinks|categories|templates|images|sections',
        format: 'json'
      },
        pageId,
        jsonPost = {},
        protection = '',
        pageDetail,
        basetimestamp,
        jumpTo = '#';
      var
        date = new Date(),
        timestamp = date.getTime(),
        now = date.toUTCString(); // 缓存时间戳
      var reloadPage = option.reload;
      if (reloadPage === undefined) reloadPage = true;

      InPageEdit.analysis({ type: 'functionCount', function: '快速编辑' });
      InPageEdit.analysis({ type: 'siteCount' });
      InPageEdit.analysis({ type: 'dateCount' });

      if (editRevision !== false && editRevision !== '' && editRevision !== mw.config.get('wgCurRevisionId')) {
        ssi_modal.notify('warning', {
          className: 'in-page-edit',
          content: msg('notify-editing-history'),
          title: msg('notify-info')
        });
        delete jsonGet.page;
        jsonGet.oldid = editRevision;
        summaryRevision = '(' + msg('editor-summary-rivision') + '[[Special:Diff/' + editRevision + ']])';
      } else {
        if (editSection !== false && editSection !== '') {
          jsonGet.section = editSection;
        }
      }
      if (typeof (InPageEdit.myPreference) !== 'undefined') {
        if (typeof (InPageEdit.myPreference.editSummary) === 'string')
          editSummary = InPageEdit.myPreference.editSummary;
        if (typeof (InPageEdit.myPreference.editMinor) === 'boolean')
          editMinor = InPageEdit.myPreference.editMinor;
        if (typeof (InPageEdit.myPreference.outSideClose) === 'boolean')
          outSideClose = InPageEdit.myPreference.outSideClose;
      }

      // Debug
      console.time('[InPageEdit] 获取页面源代码');

      // 显示主窗口
      ssi_modal.show({
        title: msg('editor-title-editing') + ': <u class="editPage">' + editPage.replace(/\_/g, ' ') + '</u>',
        content:
          $('<div>').append(
            $progress,
            $('<section>', { class: 'editForm' }).append(
              // 编辑工具条
              $('<div>', { class: 'editTools' }).append(
                $('<div>', { class: 'btnGroup' }).append(
                  $('<select>', { class: 'formatSelect' }).append(
                    $('<option>', { value: 'default', 'data-open': '', 'data-middle': '', 'data-close': '', text: msg('editor-edittool-header') }),
                    $('<option>', { value: 'h2', 'data-open': '\n== ', 'data-middle': msg('editor-edittool-header-text'), 'data-close': ' ==\n', text: 'H2' }),
                    $('<option>', { value: 'h3', 'data-open': '\n=== ', 'data-middle': msg('editor-edittool-header-text'), 'data-close': ' ===\n', text: 'H3' }),
                    $('<option>', { value: 'h4', 'data-open': '\n==== ', 'data-middle': msg('editor-edittool-header-text'), 'data-close': ' ====\n', text: 'H4' }),
                    $('<option>', { value: 'h5', 'data-open': '\n===== ', 'data-middle': msg('editor-edittool-header-text'), 'data-close': ' =====\n', text: 'H5' })
                  )
                ),
                $('<div>', { class: 'btnGroup' }).append(
                  $('<span>', { class: 'label', text: msg('editor-edittool-format-label') }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': "'''", 'data-middle': msg('editor-edittool-bold'), 'data-close': "'''", text: 'format_bold' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': "''", 'data-middle': msg('editor-edittool-italic'), 'data-close': "''", text: 'format_italic' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '\n* ', 'data-middle': msg('editor-edittool-list-bulleted'), 'data-close': '\n', text: 'format_list_bulleted' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '\n# ', 'data-middle': msg('editor-edittool-list-numbered'), 'data-close': '\n', text: 'format_list_numbered' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '<' + 'nowiki>', 'data-middle': msg('editor-edittool-nowiki'), 'data-close': '</nowiki>', text: 'format_clear' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '<br>\n', 'data-middle': '', 'data-close': '', text: 'keyboard_return' })
                ),
                $('<div>', { class: 'btnGroup' }).append(
                  $('<span>', { class: 'label', text: msg('editor-edittool-insert-label') }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '[' + '[', 'data-middle': msg('editor-edittool-internal-link'), 'data-close': ']]', text: 'insert_link' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '[' + '[File:', 'data-middle': 'Example.png', 'data-close': '|thumb]]', text: 'image' }),
                  $('<button>', { class: 'editToolBtn material-icons btn', 'data-open': '\n<' + 'gallery>\n', 'data-middle': 'Example1.jpg|Description\nExample2.png|Description', 'data-close': '\n</gallery>\n', text: 'collections' })
                ),
                $('<div>', { class: 'btnGroup extra', style: 'display: none' }).append(
                  $('<span>', { class: 'label', text: msg('editor-edittool-custom-label') })
                ),
                $('<div>', { class: 'btnGroup special-tools', style: 'float: right' }).append(
                  $('<button>', { class: 'material-icons btn', onclick: "InPageEdit.findAndReplace($('.ipe-editor.timestamp-" + timestamp + " .editArea'))", text: 'find_in_page' })
                )
              ),
              // 编辑框
              $('<textarea>', { class: 'editArea', style: 'margin-top: 0;' }),
              // 页面分析
              $('<div>', { class: 'editOptionsLabel editForm' }).append(
                $('<aside>', { class: 'detailArea' }).append(
                  $('<label>', { class: 'detailToggle', text: msg('editor-detail-button-toggle') }),
                  $('<div>', { class: 'detailBtnGroup' }).append(
                    $('<a>', { href: 'javascript:;', class: 'detailBtn', id: 'showTemplates', text: msg('editor-detail-button-templates') }),
                    $('<span>', { text: ' | ' }),
                    $('<a>', { href: 'javascript:;', class: 'detailBtn', id: 'showImages', text: msg('editor-detail-button-images') })
                  )
                ),
                // 摘要&小编辑
                $('<label>', { for: 'editSummary', text: msg('editSummary') }),
                $('<br>'),
                $('<input>', { class: 'editSummary', id: 'editSummary', placeholder: 'Edit via InPageEdit~', value: editSummary.replace(/\$oldid/ig, summaryRevision) }),
                $('<br>'),
                $('<label>').append(
                  $('<input>', { type: 'checkbox', class: 'editMinor', id: 'editMinor', checked: editMinor }),
                  $('<span>', { text: msg('markAsMinor') })
                )
              )
            )
          ).prop("outerHTML"),
        outSideClose: outSideClose,
        className: 'in-page-edit ipe-editor timestamp-' + timestamp,
        sizeClass: 'large',

        /* 按钮 */
        buttons: [{
          label: msg('editor-button-save'),
          className: 'btn btn-primary leftBtn editForm',
          method: function (e, modal) {
            var modal = modal;
            ssi_modal.confirm({
              className: 'in-page-edit',
              center: true,
              content: msg('editor-confirm-save'),
              okBtn: {
                className: 'btn btn-primary',
                label: msg('confirm')
              },
              cancelBtn: {
                className: 'btn btn-secondary',
                label: msg('cancel')
              },
            },
              function (result) {
                if (result) {
                  var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(),
                    minor = $('.ipe-editor.timestamp-' + timestamp + ' .editMinor').prop('checked'),
                    section = option.section,
                    summary = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
                  postArticle({
                    text: text,
                    page: editPage,
                    minor: minor,
                    section: section,
                    summary: summary
                  }, modal);
                }
              });
          }
        }, {
          label: msg('editor-button-preview'),
          className: 'btn btn-secondary leftBtn editForm',
          method: function () {
            InPageEdit.analysis({ type: 'functionCount', function: 'previewEdit' });
            var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
            InPageEdit.quickPreview({
              action: 'parse',
              title: editPage,
              text: text,
              prop: 'text',
              preview: true,
              format: 'json'
            });
          }
        }, {
          label: msg('editor-button-diff'),
          className: 'btn btn-secondary leftBtn editForm',
          method: function () {
            InPageEdit.analysis({ type: 'functionCount', function: '快速差异Edit' });
            var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
            var diffJson = {};
            diffJson.fromtext = editText;
            diffJson.totext = text;
            diffJson.hideBtn = true;
            diffJson.pageName = editPage;
            diffJson.isPreview = true;
            InPageEdit.quickDiff(diffJson);
          }
        }, {
          label: msg('cancel'),
          className: 'btn btn-danger',
          method: function (e, modal) {
            modal.close();
          }
        }
        ],

        /* 预加载 */
        beforeShow: function () {
          // 设置样式
          $('.ipe-editor.timestamp-' + timestamp + ' .editForm').hide();
          $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').css('margin', Number($(window).height() / 3 - 50) + 'px 0');
          $('.ipe-editor.timestamp-' + timestamp + ' .editArea').css('height', $(window).height() / 3 * 2 - 100);
          $('.ipe-editor.timestamp-' + timestamp + ' .editOptionsLabel').prependTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-buttons');
          $('.ipe-editor.timestamp-' + timestamp + ' .leftBtn').appendTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-leftButtons');

          /** Edit-Tool 扩展 **/
          function insertText(strings, obj) {
            var strings = strings,
              textarea = obj || $('.in-page-edit.ipe-editor .editArea')[0],
              start = textarea.selectionStart,
              stop = textarea.selectionEnd,
              selectedText = textarea.value.slice(start, stop);
            textarea.value =
              textarea.value.slice(0, start) +
              (strings.open || '') +
              (selectedText || strings.middle || '') +
              (strings.close || '') +
              textarea.value.slice(stop);
            var selectStart = start + (strings.open.length || 0);
            textarea.setSelectionRange(selectStart, selectStart + (selectedText.length || strings.middle.length || 0));
            textarea.focus();
          }
          // 用户自定义按钮
          if (InPageEdit.buttons) {
            var btns = InPageEdit.buttons;
            $('.ipe-editor.timestamp-' + timestamp + ' .btnGroup.extra').show();
            function addBtn(open, middle, close, text) {
              var open = open || '',
                middle = middle || '',
                close = close || '',
                text = text || '<span class="material-icons">all_inclusive</span>';
              $('.ipe-editor.timestamp-' + timestamp + ' .btnGroup.extra').append(
                $('<button>', { class: 'editToolBtn btn', 'data-open': open, 'data-middle': middle, 'data-close': close, html: text })
              );
            }
            for (var i = 0; i < btns.length; i++) {
              var btn = btns[i];
              addBtn(btn.open, btn.middle, btn.close, btn.text);
            }
          }
          $('.ipe-editor.timestamp-' + timestamp + ' .editToolBtn').click(function (e) {
            e.preventDefault();
            var $this = $(this),
              $open = $this.attr('data-open') || '',
              $middle = $this.attr('data-middle') || '',
              $close = $this.attr('data-close') || '';
            insertText({
              open: $open,
              middle: $middle,
              close: $close
            }, $('.ipe-editor.timestamp-' + timestamp + ' .editArea')[0]);
          });
          $('.ipe-editor.timestamp-' + timestamp + ' .formatSelect').change(function () {
            var $this = $(this),
              val = $this.val(),
              $open = $this.find('[value="' + val + '"]').attr('data-open') || '',
              $middle = $this.find('[value="' + val + '"]').attr('data-middle') || '',
              $close = $this.find('[value="' + val + '"]').attr('data-close') || '';
            insertText({
              open: $open,
              middle: $middle,
              close: $close
            }, $('.ipe-editor.timestamp-' + timestamp + ' .editArea')[0]);
            $this.val('default');
          });
        },
        /* 模态框显示后 */
        onShow: function (a, modal) {
          mw.hook('InPageEdit.quickEdit.modal').fire();
          // 绑定事件，在尝试离开页面时提示
          $('.ipe-editor.timestamp-' + timestamp + ' .editArea').change(function () {
            $(this).attr('data-modifiled', 'true');
            $(window).bind('beforeunload', function () {
              return msg('window-leave-confirm');
            });
          });
          // 获取权限
          if (InPageEdit.hasRight('edit') === false) {
            ssi_modal.notify('dialog', {
              className: 'in-page-edit',
              position: 'center bottom',
              title: msg('notify-no-right'),
              content: msg('editor-no-right'),
              okBtn: {
                label: msg('ok'),
                className: 'btn btn-primary',
                method: function (e, modal) {
                  modal.close();
                }
              }
            });
            $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('readonly', 'readonly');
            $('.ipe-editor.timestamp-' + timestamp + ' button.editForm').attr('disabled', 'disabled');
          }

          // 解析页面内容
          new mw.Api().get(jsonGet).done(function (data) {
            var data = data;
            console.timeEnd('[InPageEdit] 获取页面源代码');
            contentDone(data);
          }).fail(function (a, b, errorThrown) {
            console.timeEnd('[InPageEdit] 获取页面源代码');
            console.warn('[InPageEdit]警告：无法获取页面内容');
            var data = errorThrown;
            contentDone(data);
          });

          // 页面内容获取完毕，后续工作
          function contentDone(data) {
            var data = data;
            pageDetail = data;

            if (data.hasOwnProperty('error')) {
              console.warn('[InPageEdit]警告：无法获取页面内容');
              editText = '<!-- ' + data.error.info + ' -->';
              pageId = -1;
              $('.ipe-editor.timestamp-' + timestamp + ' .detailArea').hide();
            } else {
              editText = data.parse.wikitext['*'];
              pageId = data.parse.pageid;
            }
            // 设定一堆子样式
            $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').hide();
            $('.ipe-editor.timestamp-' + timestamp + ' .editForm').fadeIn(500);
            $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(editText + '\n');
            console.info('editSection: ' + editSection);
            if (editSection !== false) {
              var val = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
              val = val.replace(/\$section/ig, '/* ' + data.parse.sections[0].line + ' */');
              $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val(val);
              $('.ipe-editor.timestamp-' + timestamp + ' .editPage').after('<span class="editSection">→' + data.parse.sections[0].line + '</span>');
              jumpTo = '#' + data.parse.sections[0].anchor;
            } else {
              var val = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
              val = val.replace(/\$section/ig, '');
              $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val(val);
              jumpTo = '#';
            }
            if (editRevision !== false && editRevision !== '' && editRevision !== mw.config.get('wgCurRevisionId')) {
              $('.ipe-editor.timestamp-' + timestamp + ' .editPage').after('<span class="editRevision">(' + msg('editor-title-editRevision') + '：' + editRevision + ')</span>');
            }

            // 获取页面基础信息
            console.time('[InPageEdit] 获取页面基础信息');
            var queryJson = {
              action: 'query',
              prop: 'revisions|info',
              inprop: 'protection',
              format: 'json'
            }
            if (pageId !== -1) {
              queryJson.pageids = pageId;
            } else {
              queryJson.titles = editPage;
            }
            new mw.Api().get(queryJson).done(function (data) {
              var data = data;
              console.info('[InPageEdit] 获取页面基础信息成功');
              console.timeEnd('[InPageEdit] 获取页面基础信息');
              $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp', data.query.pages[pageId].touched);
              queryDone(data);
            }).fail(function (a, b, errorThrown) {
              var data = errorThrown;
              console.timeEnd('[InPageEdit] 获取页面基础信息');
              console.warn('[InPageEdit] 获取页面基础信息失败');
              $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp', now);
              queryDone(data);
            });

            // 页面保护等级和编辑提示等
            function queryDone(data) {
              var data = data;
              if (data.query.pages[pageId]['protection'].length > 0) {
                var protection = data.query.pages[pageId].protection[0].level;
                if (
                  (protection === 'autoconfirmed' && !InPageEdit.hasRight('autoconfirmed')) ||
                  (protection === 'sysop' && !InPageEdit.hasRight('editprotected')) ||
                  (mw.config.get('wgNamespaceNumber') === 8 && !InPageEdit.hasRight('editinterface'))
                ) {
                  ssi_modal.notify('dialog', {
                    className: 'in-page-edit',
                    position: 'center bottom',
                    title: msg('notify-no-right'),
                    content: msg('editor-no-right'),
                    okBtn: {
                      label: msg('ok'),
                      className: 'btn btn-primary',
                      method: function (e, modal) {
                        modal.close();
                      }
                    }
                  });
                  $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('readonly', 'readonly');
                  $('.ipe-editor.timestamp-' + timestamp + ' button.editForm').attr('disabled', 'disabled');
                }
              }
              // 获取编辑提示
              $.get(mw.config.get('wgScript'), {
                action: 'raw',
                title: 'MediaWiki:Editnotice-' + data.query.pages[pageId].ns
              }, function (data) {
                var data = data;
                new mw.Api().post({
                  action: 'parse',
                  title: editPage,
                  contentmodel: 'wikitext',
                  preview: true,
                  text: data
                }).done(function (data) {
                  var data = data;
                  editNotice = '<section class="editNotice">' + data.parse.text['*'] + '</section>';
                  $('.ipe-editor.timestamp-' + timestamp + ' .ssi-modalTitle').append(
                    $('<a>')
                      .attr({
                        id: 'showEditNotice',
                        href: 'javascript:;'
                      })
                      .click(function () {
                        ssi_modal.show({
                          className: 'in-page-edit',
                          center: true,
                          title: msg('editor-title-editNotice'),
                          content: editNotice
                        });
                      })
                      .html('<i class="material-icons">info</i> ' + msg('editor-has-editNotice'))
                  );
                });
              });
            }
          }
        },

        /* 确认是否取消 */
        beforeClose: function (modal) {
          if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-modifiled') !== 'true') {
            close();
            return;
          } else if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-confirmclose') === 'true') {
            closeNoReload();
            return;
          }
          ssi_modal.confirm({
            className: 'in-page-edit',
            center: true,
            content: msg('editor-leave-confirm'),
            okBtn: {
              className: 'btn btn-danger',
              label: msg('confirm')
            },
            cancelBtn: {
              className: 'btn btn-secondary',
              label: msg('cancel')
            }
          },
            function (result) {
              if (result === true) {
                close();
              }
            });
          function close() {
            $(window).unbind('beforeunload');
            modal.options.keepContent = false;
            modal.options.beforeClose = '';
            modal.close();
            ssi_modal.notify('info', {
              className: 'in-page-edit',
              position: 'right top',
              title: msg('cancel'),
              content: msg('notify-no-change')
            });
          }
          function closeNoReload() {
            modal.options.keepContent = false;
            modal.options.beforeClose = '';
            modal.close();
          }
          return false;
        }
      });

      // 页面详情模块
      $('.ipe-editor.timestamp-' + timestamp + ' .detailBtnGroup .detailBtn').click(function () {
        var $this = $(this),
          id = $this.attr('id'),
          content = '';
        switch (id) {
          case 'showTemplates':
            var templates = pageDetail.parse.templates,
              templateName;
            for (var i = 0; i < templates.length; i++) {
              templateName = templates[i]['*'];
              content = content + '<li><a href="' + mw.util.getUrl(templateName) + '" target="_blank">' + templateName + '</a> (<a href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:\'' + templateName + '\', reload: false});">' + msg('quick-edit') + '</a>)</li>';
            }
            ssi_modal.show({
              className: 'in-page-edit quick-edit-detail',
              sizeClass: 'dialog',
              title: msg('editor-detail-title-templates'),
              content: '<ul>' + content + '</ul>'
            });
            break;
          case 'showImages':
            var images = pageDetail.parse.images,
              imageName;
            for (var i = 0; i < images.length; i++) {
              imageName = images[i];
              content = content + '<li><a href="' + mw.util.getUrl('File:' + imageName) + '" target="_blank">' + imageName + '</a> (<a href="javascript:void(0);" class="quickViewImages" id="' + imageName + '">' + msg('editor-detail-images-quickview') + '</a> | <a href="' + mw.config.get('wgScript') + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1" target="_blank">' + msg('editor-detail-images-upload') + '</a>)</li>';
            }
            ssi_modal.show({
              className: 'in-page-edit quick-edit-detail',
              sizeClass: 'dialog',
              title: msg('editor-detail-title-images'),
              content: '<ul>' + content + '</ul>'
            });
            $('.quickViewImages').click(function () {
              var $this = $(this),
                image = $this.attr('id');
              ssi_modal.show({
                className: 'in-page-edit quick-view-image',
                center: true,
                title: image,
                content: $('<center>').append(
                  $('<image>', { src: mw.config.get('wgScript') + '?title=Special:Filepath/' + image, style: 'max-width: 80%; max-height: 60vh' })
                ).prop('outerHTML'),
                buttons: [{
                  label: msg('editor-detail-images-upload'),
                  className: 'btn btn-primary',
                  method: function (a, modal) { window.open(mw.config.get('wgScript') + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1') }
                }, {
                  label: msg('close'),
                  className: 'btn btn-secondary',
                  method: function (a, modal) { modal.close() }
                }]
              });
            });
            break;
        }
      });

      // 发布编辑模块
      function postArticle(pValue, modal) {
        var pValue = pValue;
        var modal = modal;
        InPageEdit.analysis({ type: 'functionCount', function: '保存编辑' });
        InPageEdit.progress(msg('editor-title-saving'));
        jsonPost = {
          action: 'edit',
          basetimestamp: $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp'),
          starttimestamp: now,
          text: pValue.text,
          title: pValue.page,
          minor: pValue.minor,
          summary: pValue.summary,
          errorformat: 'plaintext'
        }
        if (pValue.section !== undefined && pValue.section !== '' && pValue.section !== null) {
          jsonPost.section = pValue.section;
          delete jsonPost.basetimestamp;
        }

        new mw.Api().postWithToken('csrf', jsonPost).then(function (data) {
          InPageEdit.progress(true);

          if (reloadPage) {
            var content;
            $(window).unbind('beforeunload');
            content = msg('notify-save-success');
            setTimeout(function () {
              if (pValue.page === mw.config.get('wgPageName')) {
                window.location = mw.util.getUrl(pValue.page) + jumpTo;
                window.location.reload();
              } else {
                window.location.reload();
              }
            }, 500);
          } else {
            console.info('[InPageEdit] 将不会重载页面！');
            content = msg('notify-save-success-noreload');
            setTimeout(function () {
              InPageEdit.progress(false);
              $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-confirmclose', 'true');
              modal.close();
            }, 1500);
          }

          ssi_modal.notify('success', {
            className: 'in-page-edit',
            position: 'right top',
            title: msg('notify-success'),
            content: content
          });

        }).fail(function (errorCode, feedback, errorThrown) {
          InPageEdit.progress(false);
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            position: 'right top',
            closeAfter: {
              time: 15
            },
            title: msg('notify-error'),
            content: msg('editor-save-error') + '：<br/><span style="font-size:amall">' + errorThrown.errors[0]['*'] + '(<code>' + errorThrown.errors[0]['code'] + '</code>)</span>'
          });
          console.error('[InPageEdit] Submit failed: \nCode: ' + errorThrown.errors[0]['code'] + '\nDescription: ' + errorThrown.errors[0]['*']);
        });
      }
    };

    /** 查找替换模块 **/
    InPageEdit.findAndReplace = function (contengut) {
      if (contengut === this.undefined) contengut = $('.in-page-edit.ipe-editor .editArea');
      var origin = contengut.val();

      ssi_modal.show({
        className: 'in-page-edit',
        sizeClass: 'dialog',
        center: true,
        outSideClose: false,
        // position: 'right bottom',
        title: msg('fAndR-title'),
        content:
          $('<div>', { class: 'module far-module' }).append(
            $('<div>', { class: 'module_content', id: 'findfielddiv' }).append(
              $('<section>').append(
                $('<h4>', { text: msg('fAndR-find-text') }),
                $('<textarea>', { id: 'find_this', style: 'margin: 0', rows: 4 }),
                $('<h4>', { text: msg('fAndR-replace-text') }),
                $('<textarea>', { id: 'replace_with', style: 'margin: 0', rows: 4 })
              ),
              $('<section>', { style: 'padding: 7px 0' }).append(
                $('<label>').append(
                  $('<input>', { type: 'checkbox', id: 'globl', checked: '' }),
                  $('<span>', { text: msg('fAndR-globl') })
                ),
                $('<br>'),
                $('<label>').append(
                  $('<input>', { type: 'checkbox', id: 'case_sen' }),
                  $('<span>', { text: msg('fAndR-case-sen') })
                ),
                $('<br>'),
                $('<label>').append(
                  $('<input>', { type: 'checkbox', id: 'regex_search' }),
                  $('<span>', { text: msg('fAndR-enable-regex') })
                ),
              )
            )
          ).prop('outerHTML'),
        buttons: [
          {
            label: msg('fAndR-button-undo'),
            className: 'btn btn-danger',
            method: function (e, modal) {
              contengut.val(origin);
              ssi_modal.notify('info', {
                className: 'in-page-edit',
                title: msg('notify-info'),
                content: msg('notify-fAndR-undo')
              });
              // modal.close();
            }
          },
          {
            className: 'btn btn-primary',
            label: msg('fAndR-button-replace'),
            method: function (a, modal) {
              /**
               * 查找替换主函数
               * 借鉴：https://dev.fandom.com/wiki/MediaWiki:FindAndReplace/code.js
               **/
              if ($('#find_this').val() === '') return;
              var searchfor = '',
                searchexp,
                $textarea = contengut,
                replacewith = $('#replace_with').val().replace(/\r/gi, ''),
                text = $textarea.val().replace(/\r/gi, ''),
                flagg = 'g',
                flagi = 'i',
                enableregex = 0;

              if ($('#globl').prop('checked') === false) {
                flagg = '';
              }
              if ($('#case_sen').prop('checked') === true) {
                flagi = '';
              }
              if ($('#regex_search').prop('checked') === true) {
                enableregex = 1;
              }
              var flags = flagg + flagi + 'm';
              if (enableregex === 1) {
                searchfor = $('#find_this').val();
              } else {
                searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
              }
              searchexp = new RegExp(searchfor, flags);
              var rcount = 0;
              var matched = text.match(searchexp);
              if (matched !== null) {
                rcount = matched.length;
              }
              text = text.replace(searchexp, replacewith);
              $textarea.val(text);
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                title: msg('notify-success'),
                content: msg('notify-fAndR-done').replace('$1', rcount)
              });
              // modal.close();
            }
          }
        ]
      });
    };

    /** 快速重定向模块 **/
    InPageEdit.redirect = InPageEdit.quickRedirect = function (type) {
      mw.hook('InPageEdit.quickRedirect').fire();
      InPageEdit.analysis({ type: 'functionCount', function: '查找替换' });
      var text = '#REDIRECT [[:$1]]',
        question,
        target,
        json = {
          action: 'edit',
          minor: JSON.parse(localStorage.getItem('InPageEditPreference')).editMinor,
          token: mw.user.tokens.get('editToken'),
          errorformat: 'plaintext'
        },
        summary;

      switch (type) {
        case 'to':
          json.title = mw.config.get('wgPageName');
          question = msg('redirect-question-to').replace('$1', '<b>' + mw.config.get('wgPageName').replace(/\_/g, ' ') + '</b>');
          break;
        case 'from':
          question = msg('redirect-question-from').replace('$1', '<b>' + mw.config.get('wgPageName').replace(/\_/g, ' ') + '</b>');
          json.text = text.replace('$1', mw.config.get('wgPageName'));
          break;
      }
      ssi_modal.show({
        outSideClose: false,
        className: 'in-page-edit quick-redirect',
        center: true,
        sizeClass: 'dialog',
        title: msg('redirect-title'),
        content: $('<div>').append(
          $('<section>').append(
            $('<span>', { html: question }),
            $('<br>'),
            $('<input>', { id: 'redirect-page', style: 'width:96%', onclick: "$(this).css('box-shadow', '')" }),
            $('<br>'),
            $('<label>', { for: 'redirect-reason', text: msg('editSummary') }),
            $('<input>', { id: 'redirect-reason', style: 'width:96%' })
          ),
          $progress.css('display', 'none')
        ).prop('outerHTML'),
        buttons: [{
          label: msg('confirm'),
          className: 'btn btn-primary btn-single okBtn',
          method: function (a, modal) {
            target = $('.in-page-edit.quick-redirect #redirect-page').val();
            if (target === '' || target === mw.config.get('wgPageName') || target === mw.config.get('wgPageName').replace(/\_/g, ' ')) {
              $('.in-page-edit.quick-redirect #redirect-page').css('box-shadow', '0 0 4px #f00');
              return;
            }

            InPageEdit.analysis({ type: 'functionCount', function: '快速重定向' });
            InPageEdit.analysis({ type: 'dateCount' });
            InPageEdit.analysis({ type: 'siteCount' });

            summary = msg('redirect-summary') + ' → [[:' + target + ']]';
            if ($('.in-page-edit.quick-redirect #redirect-reason').val() !== '') {
              summary = summary + ' (' + $('.in-page-edit.quick-redirect #redirect-reason').val() + ')';
            }
            json.summary = summary;

            $('.in-page-edit.quick-redirect .ipe-progress').show();
            $('.in-page-edit.quick-redirect section').hide();
            $('.in-page-edit.quick-redirect .okBtn').attr('disabled', 'disabled');
            switch (type) {
              case 'to':
                json.text = text.replace('$1', target);
                break;
              case 'from':
                json.title = target;
                break;
            }

            new mw.Api().post(json).done(function () {
              $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                content: msg('notify-redirect-success'),
                title: msg('notify-success')
              });
              if (type === 'to') {
                window.location.reload();
              } else {
                $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
                setTimeout(function () { modal.close() }, 2000);
              }
            }).fail(function () {
              $('.in-page-edit.quick-redirect .ipe-progress').hide();
              $('.in-page-edit.quick-redirect section').show();
              $('.in-page-edit.quick-redirect .okBtn').attr('disabled', false);
              $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
              ssi_modal.notify('error', {
                className: 'in-page-edit',
                content: msg('notify-redirect-error'),
                title: msg('notify-error')
              });
            });
          }
        }
        ]
      });
    };

    /** 删除页面模块 **/
    InPageEdit.deletepage = InPageEdit.quickDelete = function (page) {
      mw.hook('InPageEdit.quickDelete').fire();
      var reason,
        page = page || mw.config.get('wgPageName');

      ssi_modal.show({
        outSideClose: false,
        className: 'in-page-edit quick-delete',
        center: true,
        sizeClass: 'dialog',
        title: msg('delete-title'),
        content: $('<div>').append(
          $('<section>', { id: 'InPageEditDeletepage' }).append(
            $('<span>', { html: msg('delete-reason').replace('$1', '<b>' + page.replace(/\_/g, ' ') + '</b>') }),
            $('<br>'),
            $('<label>', { for: 'delete-reason', text: msg('editSummary') }),
            $('<input>', { id: 'delete-reason', style: 'width:96%', onclick: "$(this).css('box-shadow', '')" })
          )
        ).prop('outerHTML'),
        beforeShow: function () {
          if (!InPageEdit.hasRight('delete')) {
            ssi_modal.dialog({
              title: msg('notify-no-right'),
              content: msg('delete-no-right'),
              className: 'in-page-edit quick-deletepage',
              center: true,
              okBtn: {
                className: 'btn btn-primary btn-single'
              }
            });
            return false;
          }
        },
        buttons: [
          {
            label: msg('cancel'),
            className: 'btn btn-primary',
            method: function (e, modal) {
              modal.close();
            }
          }, {
            label: msg('confirm'),
            className: 'btn btn-danger',
            method: function (e, modal) {
              reason = $('#InPageEditDeletepage #delete-reason').val();
              if (reason === '') {
                $('#InPageEditDeletepage #delete-reason').css('box-shadow', '0 0 4px #f00');
                return;
              }
              InPageEdit.analysis({ type: 'functionCount', function: '快速删除' });

              ssi_modal.confirm({
                center: true,
                className: 'in-page-edit',
                title: msg('delete-confirm-title'),
                content: msg('delete-confirm-content'),
                okBtn: {
                  label: msg('confirm'),
                  className: 'btn btn-danger'
                },
                cancelBtn: {
                  label: msg('cancel'),
                  className: 'btn'
                }
              }, function (result) {
                if (result) {
                  reason = msg('delete-title') + ' (' + reason + ')';
                  new mw.Api().postWithToken('csrf', {
                    action: 'delete',
                    title: page,
                    reason: reason,
                    format: 'json'
                  }).then(function (data) {
                    ssi_modal.notify('success', {
                      className: 'in-page-edit',
                      title: msg('notify-success'),
                      content: msg('notify-delete-success').replace('$1', page)
                    });
                  }).fail(function (errorCode, feedback, errorThrown) {
                    ssi_modal.notify('error', {
                      className: 'in-page-edit',
                      title: msg('notify-error'),
                      content: msg('notify-delete-error') + ': <br/><span style="font-size:amall">' + errorThrown.error['*'] + '(<code>' + errorThrown.error['code'] + '</code>)</span>'
                    });
                  });
                  modal.close();
                } else {
                  return false;
                }
              });
            }
          }
        ]
      });
    };

    /** 重命名模块 **/
    InPageEdit.renamepage = InPageEdit.quickRename = function (from, to) {
      mw.hook('InPageEdit.quickRename').fire();
      var from = from || mw.config.get('wgPageName'),
        to = to || '',
        reason,
        movetalk,
        movesubpages,
        noredirect,
        ignorewarnings;

      ssi_modal.show({
        outSideClose: false,
        className: 'in-page-edit quick-rename',
        center: true,
        sizeClass: 'dialog',
        title: msg('rename-title'),
        content:
          $('<section>').append(
            $('<label>', { for: 'move-to', html: msg('rename-moveTo').replace('$1', '<b>' + from.replace(/\_/g, ' ') + '</b>') }),
            $('<br>'),
            $('<input>', { id: 'move-to', style: 'width:96%', onclick: "$(this).css('box-shadow','')" }),
            $('<br>'),
            $('<label>', { for: 'move-reason', text: msg('editSummary') }),
            $('<br>'),
            $('<input>', { id: 'move-reason', style: 'width:96%' }),
            $('<br>'),
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'movetalk', checked: 'checked' }),
              $('<span>', { text: msg('rename-movetalk') })
            ),
            $('<br>'),
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'movesubpages', checked: 'checked' }),
              $('<span>', { text: msg('rename-movesubpages') })
            ),
            $('<br>'),

            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'noredirect' }),
              $('<span>', { text: msg('rename-noredirect') })
            ),
          ).prop('outerHTML'),
        buttons: [{
          label: msg('cancel'),
          className: 'btn btn-secondary',
          method: function (a, modal) {
            modal.close();
          }
        }, {
          label: msg('confirm'),
          className: 'btn btn-primary',
          method: function () {
            to = $('.in-page-edit.quick-rename #move-to').val();
            if (to === '' || to === mw.config.get('wgPageName') || to === mw.config.get('wgPageName').replace(/\_/g, ' ')) {
              $('.in-page-edit.quick-rename #move-to').css('box-shadow', '0 0 4px #f00');
              return;
            }

            InPageEdit.analysis({ type: 'functionCount', function: '快速重命名' });
            InPageEdit.analysis({ type: 'dateCount' });
            InPageEdit.analysis({ type: 'siteCount' });

            InPageEdit.progress(msg('editor-title-saving'));
            movetalk = $('.in-page-edit.quick-rename #movetalk').prop('checked');
            movesubpages = $('.in-page-edit.quick-rename #movesubpages').prop('checked');
            noredirect = $('.in-page-edit.quick-rename #noredirect').prop('checked');
            reason = $('.in-page-edit.quick-rename #move-reason').val();

            if (reason === '') {
              reason = msg('rename-summary') + ' → [[:' + to + ']]';
            } else {
              reason = msg('rename-summary') + ' → [[:' + to + ']] (' + reason + ')';
            }
            new mw.Api().postWithToken('csrf', {
              action: 'move',
              from: from,
              to: to,
              reason: reason,
              movetalk: movetalk,
              movesubpages: movesubpages,
              noredirect: noredirect
            }).done(function () {
              InPageEdit.progress(true);
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                content: msg('notify-rename-success'),
                title: msg('notify-success')
              });
              location.href = mw.config.get('wgArticlePath').replace('$1', to);
            }).fail(function (errorCode, feedback, errorThrown) {
              InPageEdit.progress(false);
              ssi_modal.notify('error', {
                className: 'in-page-edit',
                content: msg('notify-rename-error') + ': ' + errorThrown.error.info + '<code>' + errorThrown.error.code + '</code>',
                title: msg('notify-error')
              });
              if (errorThrown.error.code === 'articleexists') {
                ssi_modal.dialog({
                  className: 'in-page-edit',
                  title: msg('rename-articleexists-title'),
                  center: true,
                  content: msg('rename-articleexists'),
                  okBtn: {
                    label: msg('ok'),
                    className: 'btn btn-primary only-btn'
                  }
                });
              }
            });
          }
        }],
        beforeShow: function () {
          if (!InPageEdit.hasRight('move')) {
            ssi_modal.dialog({
              title: msg('notify-no-right'),
              content: msg('rename-no-right'),
              className: 'in-page-edit quick-deletepage',
              center: true,
              okBtn: {
                className: 'btn btn-primary btn-single'
              }
            });
            return false;
          }
        }
      });
    };

    /** 个人设置模块 **/
    InPageEdit.preference = function () {
      mw.hook('InPageEdit.preference').fire();
      InPageEdit.analysis({ type: 'functionCount', function: '插件设置' });
      var settings = JSON.parse(localStorage.getItem('InPageEditPreference')),
        minor = settings.editMinor,
        summary = settings.editSummary,
        outSideClose = settings.outSideClose;

      ssi_modal.show({
        outSideClose: false,
        title: msg('preference-title') + ' - ' + InPageEdit.version,
        content:
          $('<section>', { id: 'InPageEditSettingBox', class: 'ipe-preference' }).append(
            $('<h4>', { text: msg('preference-editor-label') }),
            $('<label>').append(
              $('<input>', { id: 'ipeSetoutSideClose', type: 'checkbox' }),
              $('<span>', { text: msg('preference-outSideClose') })
            ),
            $('<br>'),
            $('<label>').append(
              $('<input>', { id: 'ipeSetMinor', type: 'checkbox' }),
              $('<span>', { text: msg('preference-setMinor') })
            ),
            $('<br>'),
            $('<h4>', { text: msg('preference-summary-label') }),
            $('<label>', { for: 'ipeSetSummary', style: 'padding-left: 0; font-size: small', html: msg('preference-editSummary').replace('%br%', '<br/>').replace('$1', '<code>$oldid</code>').replace('$2', '<code>' + msg('editor-summary-rivision') + ' [[Special:Diff/oldid]]</code>').replace('$3', '<code>$section</code>').replace('$4', '<code>/* SECTION TITLE */</code>') }),
            $('<br>'),
            $('<input>', { id: 'ipeSetSummary', style: 'width: 96%', value: summary, placeholder: 'Edit via InPageEdit, yeah~' }),
            $('<h4>', { text: msg('preference-analysis-label') }),
            $('<span>', { style: 'font-size: small; line-height: 0.9em', html: msg('preference-analysis-view').replace('$1', '<a href="https://doc.wjghj.cn/InPageEditAnalysis/" to="_blank">https://doc.wjghj.cn/InPageEditAnalysis/</a>') }),
            $('<h4>', { text: msg('preference-about-label') }),
            $('<button>', { class: 'btn btn-secondary', onclick: "InPageEdit.about()", text: msg('preference-aboutAndHelp') }),
            $('<button>', { class: 'btn btn-secondary', style: 'margin-left: 1em;', onclick: "InPageEdit.versionInfo()", text: msg('preference-updatelog') }),
            $hr,
            $('<strong>', { style: 'font-size: small; line-height: 0.9em', text: msg('preference-savelocal-label') }),
            $('<br>'),
            $('<span>', { style: 'font-size: small; line-height: 0.9em', text: msg('preference-savelocal') }).append(
              $('<a>', { href: 'javascript:;', id: 'ipeSaveLocalShow', text: msg('preference-savelocal-btn') })
            )
          ).prop('outerHTML'),
        sizeClass: 'dialog',
        className: 'in-page-edit ipe-preference',
        center: true,
        buttons: [{
          label: msg('preference-reset'),
          className: 'btn btn-danger',
          method: function () {
            $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked', true);
            $('#InPageEditSettingBox #ipeSetMinor').prop('checked', false);
            $('#InPageEditSettingBox #ipeSetSummary').val(msg('preference-summary-default'));
          }
        }, {
          label: msg('preference-save'),
          className: 'btn btn-primary',
          method: function (a, modal) {
            localStorage.setItem('InPageEditPreference', JSON.stringify({
              outSideClose: $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked'),
              editMinor: $('#InPageEditSettingBox #ipeSetMinor').prop('checked'),
              editSummary: $('#InPageEditSettingBox #ipeSetSummary').val()
            }));

            modal.close();
          }
        }
        ]
      });
      $('#ipeSaveLocalShow').click(function () {
        ssi_modal.dialog({
          className: 'in-page-edit',
          center: true,
          title: msg('preference-savelocal-popup-title'),
          content: '<section id="ipeSaveLocal"><b>' + msg('preference-savelocal-popup-notrecommended') + '</b><br/>' + msg('preference-savelocal-popup') + '<br/><pre style="font-size: small;word-break: break-all;font-family: monospace;"></pre><br/>' + msg('preference-savelocal-popup-notice') + '</section>',
          okBtn: {
            className: 'btn btn-primary btn-single',
            label: msg('ok')
          }
        });
        $('#ipeSaveLocal pre').text('window.InPageEdit = window.InPageEdit || {}; // Keep this line\nInPageEdit.myPreference = ' + JSON.stringify({
          outSideClose: $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked'),
          editMinor: $('#InPageEditSettingBox #ipeSetMinor').prop('checked'),
          editSummary: $('#InPageEditSettingBox #ipeSetSummary').val()
        }) + '; // InPageEdit preference');
      });
      if (outSideClose) {
        $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked', true);
      }
      if (minor) {
        $('#InPageEditSettingBox #ipeSetMinor').prop('checked', true);
      }

      if (typeof (InPageEdit.myPreference) !== 'undefined') {
        $('.ipe-preference .ssi-buttons .ssi-modalBtn').attr('disabled', '');
        if (typeof (InPageEdit.myPreference.editMinor) === 'boolean') {
          $('#InPageEditSettingBox #ipeSetMinor').prop('checked', InPageEdit.myPreference.editMinor).attr('disabled', '');
        }
        if (typeof (InPageEdit.myPreference.outSideClose) === 'boolean') {
          $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked', InPageEdit.myPreference.outSideClose).attr('disabled', '');
        }
        if (typeof (InPageEdit.myPreference.editSummary) === 'string') {
          $('#InPageEditSettingBox #ipeSetSummary').attr('disabled', '').val(InPageEdit.myPreference.editSummary);
        }
        ssi_modal.dialog({
          content: msg('preference-savelocal-popup-haslocal').replace('$1', '<a href="' + mw.util.getUrl('Special:Mypage/common.js') + '">' + msg('preference-savelocal-popup-yourjspage') + '</a>'),
          className: 'in-page-edit',
          center: true,
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
      }
    };

    /** 快速页面差异模块 **/
    InPageEdit.quickDiff = function (param) {
      mw.hook('InPageEdit.quickDiff').fire();
      InPageEdit.analysis({ type: 'dateCount' });
      InPageEdit.analysis({ type: 'siteCount' });
      // InPageEdit.analysis({ type: 'functionCount', function: '快速差异' });
      if ($('[href*="mediawiki.diff.styles"]').length < 1) {
        mw.loader.load(mw.util.wikiScript('load') + '?modules=mediawiki.legacy.shared|mediawiki.diff.styles&only=styles', 'text/css');
      }
      if ($('.quick-diff').length > 0) {
        console.info('[InPageEdit] Quick diff 正在加载新内容');
        $('.in-page-edit.quick-diff .diffArea').hide().html(msg('diff-loading'));
        if (param.isPreview) {
          $('.quick-diff').appendTo('body');
        }
      } else {
        ssi_modal.show({
          className: 'in-page-edit quick-diff',
          sizeClass: 'large',
          fixedHeight: true,
          fitScreen: true,
          title: '<span class="pageName">' + msg('diff-loading') + '</span>',
          content: '<div class="ipe-progress" style="width:100%"><div class="ipe-progress-bar"></div></div><div class="diffArea"></div>',
          buttons: [{
            label: msg('diff-button-todiffpage'),
            className: 'btn btn-secondary toDiffPage',
            method: function () {
              // Placeholder
            }
          }]
        });
      }
      $('.in-page-edit.quick-diff .ipe-progress').show().css('margin-top', $('.in-page-edit.quick-diff .ipe-progress').parent().height() / 2);
      $('.quick-diff button.toDiffPage').unbind();
      param.action = 'compare';
      param.prop = 'diff|diffsize|rel|ids|title|user|comment|parsedcomment|size';
      param.format = 'json';
      new mw.Api().post(param).then(function (data) {
        var diffTable = data.compare['*'];
        $('.in-page-edit.quick-diff .ipe-progress').hide();
        if (param.pageName === undefined) {
          var toTitle = data.compare.totitle;
        } else {
          var toTitle = param.pageName;
        }
        var userlink = function (user) {
          return '<a class="diff-user" href="' + mw.util.getUrl('User:' + user) + '">' + user + '</a> (<a href="' + mw.util.getUrl('User_talk:' + user) + '">' + msg('diff-usertalk') + '</a> | <a href="' + mw.util.getUrl('Special:Contributions/' + user) + '">' + msg('diff-usercontrib') + '</a> | <a href="' + mw.util.getUrl('Special:Block/' + user) + '">' + msg('diff-userblock') + '</a>)';
        }
        $('.quick-diff .pageName').html(msg('diff-title') + ': <u>' + toTitle + '</u>');
        $('.quick-diff .diffArea').show().html(
          '<table class="diff diffTable">' +
          '<colgroup>' +
          '<col class="diff-marker">' +
          '<col class="diff-content">' +
          '<col class="diff-marker">' +
          '<col class="diff-content">' +
          '</colgroup>' +
          '<tbody>' +
          '<tr class="diff-title">' +
          '<td colspan="2" class="diff-otitle">' +
          '<a class="" href="' + mw.config.get('wgScript') + '?oldid=' + data.compare.fromrevid + '">' + data.compare.fromtitle + '</a> (<span class="diff-version">' + msg('diff-version') + data.compare.fromrevid + '</span>) (<a class="editLink" href="' + mw.config.get('wgScript') + '?action=edit&title=' + data.compare.fromtitle + '&oldid=' + data.compare.fromrevid + '">' + msg('diff-edit') + '</a>)<br/>' + userlink(data.compare.fromuser) + '<br/>(<span class="diff-comment">' + data.compare.fromparsedcomment + '</span>)<br/><a class="prevVersion" href="javascript:void(0);" onclick="InPageEdit.quickDiff({fromrev:' + data.compare.fromrevid + ',torelative:\'prev\'});InPageEdit.analysis({type:\'functionCount\',function:\'快速差异History\'});">←' + msg('diff-prev') + '</a>' +
          '</td>' +
          '<td colspan="2" class="diff-ntitle">' +
          '<a class="" href="' + mw.config.get('wgScript') + '?oldid=' + data.compare.torevid + '">' + data.compare.totitle + '</a> (<span class="diff-version">' + msg('diff-version') + data.compare.torevid + '</span>) (<a class="editLink" href="' + mw.config.get('wgScript') + '?action=edit&title=' + data.compare.totitle + '&oldid=' + data.compare.torevid + '">' + msg('diff-edit') + '</a>)<br/>' + userlink(data.compare.touser) + '<br/>(<span class="diff-comment">' + data.compare.toparsedcomment + '</span>)<br/><a class="nextVersion" href="javascript:void(0);" onclick="InPageEdit.quickDiff({fromrev:' + data.compare.torevid + ',torelative:\'next\'});InPageEdit.analysis({type:\'functionCount\',function:\'快速差异History\'});">' + msg('diff-nextv') + '→</a>' +
          '</td>' +
          '</tr>' +
          diffTable +
          '<tr class="diffSize" style="text-align: center;"><td colspan="2">' + data.compare.fromsize + msg('diff-bytes') + '</td><td colspan="2">' + data.compare.tosize + msg('diff-bytes') + '</td></tr>' +
          '</tbody>' +
          '</table>'
        );
        $('.quick-diff button.toDiffPage').click(function () {
          location.href = mw.config.get('wgScript') + '?oldid=' + data.compare.fromrevid + '&diff=' + data.compare.torevid;
        });
        InPageEdit.articleLink($('.quick-diff .editLink'));
        if (param.isPreview === true) {
          $('.quick-diff button.toDiffPage').hide();
          $('.quick-diff .diff-otitle').html('<b>' + msg('diff-title-original-content') + '</b>');
          $('.quick-diff .diff-ntitle').html('<b>' + msg('diff-title-your-content') + '</b>');
        }
        if (data.compare.fromsize === undefined || data.compare.tosize === undefined) {
          $('.quick-diff .diffSize').hide();
        }
        if (data.compare.fromrevid === undefined && param.isPreview !== true) {
          $('.quick-diff .diff-otitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
        } else if (data.compare.torevid === undefined && param.isPreview !== true) {
          $('.quick-diff .diff-ntitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
        }
        // GitHub@issue#5 修复被隐藏版本的问题
        if (data.compare.fromtexthidden !== undefined) {
          $('.quick-diff .diff-otitle .diff-version').addClass('diff-hidden-history');
        }
        if (data.compare.totexthidden !== undefined) {
          $('.quick-diff .diff-ntitle .diff-version').addClass('diff-hidden-history');
        }
        if (data.compare.fromuserhidden !== undefined) {
          $('.quick-diff .diff-otitle .diff-user').addClass('diff-hidden-history');
        }
        if (data.compare.touserhidden !== undefined) {
          $('.quick-diff .diff-ntitle .diff-user').addClass('diff-hidden-history');
        }
        if (data.compare.fromcommenthidden !== undefined) {
          $('.quick-diff .diff-otitle .diff-comment').addClass('diff-hidden-history');
        }
        if (data.compare.tocommenthidden !== undefined) {
          $('.quick-diff .diff-ntitle .diff-comment').addClass('diff-hidden-history');
        }
        if (data.hasOwnProperty('error')) {
          console.warn('[InPageEdit] 快速差异获取时系统告知出现问题');
          $('.diffArea').html(msg('diff-error') + ': ' + data.error.info + '(<code>' + data.error.code + '</code>)');
        }
      }).fail(function (errorCode, feedback, errorThrown) {
        console.warn('[InPageEdit] 快速差异获取失败');
        $('.in-page-edit.quick-diff .ipe-progress').hide();
        $('.diffArea').show().html(msg('diff-error') + ': ' + errorThrown.error['info'] + '(<code>' + errorThrown.error['code'] + '</code>)');
      });
    };
    // 加载预设的快速最近更改模块
    InPageEdit.loadQuickDiff = function () {
      // 最近更改
      function addLink(origin) {
        $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').unbind('click', ipeDiffLink);
        var ipeDiffLink = $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').click(function (e) {
          e.preventDefault();
          InPageEdit.analysis({ type: 'functionCount', function: '快速差异RC' });
          var $this = $(this),
            href = $this.attr('href'),
            diff = mw.util.getParamValue('diff', href),
            curid = mw.util.getParamValue('curid', href),
            oldid = mw.util.getParamValue('oldid', href);
          if (diff === '0') {
            InPageEdit.quickDiff({ fromrev: oldid, toid: curid });
          } else if (diff === 'prev' || diff === 'next' || diff === 'cur') {
            InPageEdit.quickDiff({ fromrev: oldid, torelative: diff });
          } else {
            InPageEdit.quickDiff({ fromrev: oldid, torev: diff });
          }
        });
      }
      if ($('.mw-rcfilters-enabled').length > 0) {
        setInterval(addLink, 500);
        $('.mw-rcfilters-enabled').addClass('ipe-continuous-active');
      } else {
        addLink();
      }
      // 查看历史页面的比较按钮与快速编辑
      if (mw.config.get('wgAction') === 'history') {
        $('.historysubmit.mw-history-compareselectedversions-button').after(
          $('<button>').text(msg('quick-diff')).click(function (e) {
            e.preventDefault();
            InPageEdit.analysis({ type: 'functionCount', function: '快速差异History' });
            var before = $('.selected.before').attr('data-mw-revid'),
              after = $('.selected.after').attr('data-mw-revid');
            InPageEdit.quickDiff({ fromrev: after, torev: before });
          })
        );
        $('[data-mw-revid]').each(function () {
          var $this = $(this),
            oldid = $this.attr('data-mw-revid');
          $this.find('.mw-history-undo').after(
            $('<span>').html(' | <a class="in-page-edit-article-link" href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:mw.config.get(\'wgPageName\'),revision:' + oldid + '});">' + msg('quick-edit') + '</a>')
          );
        });
      }
    };

    /** 获取段落编辑以及编辑链接 **/
    InPageEdit.articleLink = function (element) {
      if (element === undefined)
        element = $('#mw-content-text a:not(.new)');
      element.each(function (i) {
        if ($(this).attr('href') === undefined)
          return;
        var url = $(this).attr('href'),
          title = mw.util.getParamValue('title', url),
          section = mw.util.getParamValue('section', url),
          revision = mw.util.getParamValue('oldid', url);

        // 不是本地编辑链接
        if (url.split('/')['2'] !== location.href.split('/')['2'] && url.substr(0, 1) !== '/')
          return;

        // 不是 index.php?title=FOO 形式的url
        if (title === null) {
          var splitStr = mw.config.get('wgArticlePath').replace('$1', '');
          if (splitStr === '/') {
            splitStr = mw.config.get('wgServer').substring(mw.config.get('wgServer').length - 4) + '/';
          }
          title = url.split(splitStr).pop().split('?')['0'];
        }

        if (mw.util.getParamValue('action', url) === 'edit' && title !== undefined && section !== 'new') {
          $(this).after(
            $('<span>', {
              'class': 'in-page-edit-article-link-group'
            }).append(
              $('<a>', {
                'href': 'javascript:void(0)',
                'class': 'in-page-edit-article-link'
              })
                .text(msg('quick-edit'))
                .click(function () {
                  if (revision !== null) {
                    InPageEdit.quickEdit({
                      page: title,
                      revision: revision
                    });
                  } else {
                    InPageEdit.quickEdit({
                      page: title,
                      section: section
                    });
                  }
                })));
        }
      });
    };

    /** 快速预览文章页 **/
    InPageEdit.quickPreview = function (params) {
      mw.hook('InPageEdit.quickPreview').fire();
      var timestamp = new Date().getTime();
      console.time('[InPageEdit] Request preview');
      ssi_modal.show({
        sizeClass: 'large',
        className: 'in-page-edit previewbox',
        title: msg('preview-title'),
        content: $('<section>').append(
          $progress,
          $('<div>', { id: 'InPageEditPreview', 'data-timestamp': timestamp, style: 'display:none', text: msg('preview-placeholder') })
        ).prop('outerHTML'),
        fixedHeight: true,
        fitScreen: true,
        buttons: [{ label: '', className: 'hideThisBtn' }],
        onShow: function (modal) {
          $('.previewbox .ipe-progress').css('margin-top', $('.previewbox .ipe-progress').parent().height() / 2);
          $('.previewbox .hideThisBtn').hide();
          new mw.Api().post(params).then(function (data) {
            console.timeEnd('[InPageEdit] Request preview');
            var content = data.parse.text['*'];
            $('.previewbox .ipe-progress').hide(150);
            $('#InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(content);
          }).fail(function () {
            console.timeEnd('[InPageEdit] Request preview');
            console.warn('[InPageEdit] 预览失败');
            $('.previewbox .ipe-progress').hide(150);
            $('#InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(msg('preview-error'));
          });
        }
      });
    };

    /** 载入中模块 **/
    InPageEdit.progress = function (title) {
      if (title === true) {
        $('.in-page-edit.loadingbox .ssi-modalTitle').html(msg('done'));
        $('.in-page-edit.loadingbox .ipe-progress').addClass('done');
      } else if (title === false) {
        if ($('.in-page-edit.loadingbox').length > 0) {
          $('.in-page-edit.loadingbox').appendTo('body');
          ssi_modal.close();
        }
      } else {
        if ($('.in-page-edit.loadingbox').length > 0) return;
        if (typeof (title) === 'undefined') {
          title = 'Loading...'
        }
        ssi_modal.show({
          title: title,
          content:
            $('<div>', { class: 'ipe-progress', style: 'width: 100%' }).append(
              $('<div>', { class: 'ipe-progress-bar' })
            ).prop('outerHTML'),
          className: 'in-page-edit loadingbox',
          center: true,
          sizeClass: 'dialog',
          closeIcon: false,
          outSideClose: false
        });
      }
    };

    /** 提交统计信息模块 **/
    InPageEdit.analysis = function (params) {
      var type = params.type;
      switch (type) {
        case 'siteCount':
          $.ajax({
            url: 'https://doc.wjghj.cn/InPageEditAnalysis/site/log.php',
            data: {
              'sitename': mw.config.get('wgSiteName')
            },
            dataType: 'json'
          });
          break;
        case 'dateCount':
          var now = new Date(),
            y = now.getFullYear(), m = Number(now.getMonth() + 1), d = Number(now.getDate());
          if (m < 10) m = '0' + m;
          if (d < 10) d = '0' + d;
          var time = y + '-' + m + '-' + d;
          $.ajax({
            url: 'https://doc.wjghj.cn/InPageEditAnalysis/date/log.php',
            data: {
              'date': time
            },
            dataType: 'json'
          });
          break;
        case 'functionCount':
          $.ajax({
            url: 'https://doc.wjghj.cn/InPageEditAnalysis/function/log.php',
            data: {
              'function': params.function
            },
            dataType: 'json'
          });
          break;
      }
    };

    /** 获取用户权限信息 **/
    (function () {
      mw.user.getRights().then(function (rights) {
        console.info('[InPageEdit] 成功获取用户权限信息');
        mw.config.set('wgUserRights', rights);
      }).fail(function () {
        console.warn('[InPageEdit] 警告：无法获取用户权限信息');
        mw.config.set('wgUserRights', '');
      });
      if (mw.user.getName() !== null) {
        new mw.Api().get({
          action: 'query',
          list: 'users',
          usprop: 'blockinfo',
          ususers: mw.user.getName()
        }).then(function (data) {
          if (data.query.users[0].hasOwnProperty('blockid')) {
            mw.config.set('wgUserIsBlocked', true);
          } else {
            mw.config.set('wgUserIsBlocked', false);
          }
        });
      }
    }());

    InPageEdit.hasRight = function (right) {
      if (mw.config.get('wgUserIsBlocked') === true) {
        return false;
      }
      if (mw.config.get('wgUserRights').indexOf(right) > -1) {
        return true;
      } else {
        return false;
      }
    };

    /** 版本信息模块 **/
    if (InPageEdit.isCanary) {
      InPageEdit.specialNotice = {
        id: msg('noticeid-canary'),
        title: msg('version-notice-canary-title'),
        content: msg('version-notice-canary')
      };
    } else {
      InPageEdit.specialNotice = {
        id: msg('noticeid'),
        title: msg('version-notice-title'),
        content: msg('version-notice')
      };
    }
    InPageEdit.versionInfo = function () {
      var curVersion = InPageEdit.version;
      ssi_modal.show({
        className: 'in-page-edit version-info',
        title: msg('updatelog-title') + ' - <span id="yourVersion">' + msg('updatelog-loading') + '</span>',
        content: '<div id="IPEversionInfoPlaceholder" class="ipe-progress" style="margin: calc(30% - 1em) auto;"><div class="ipe-progress-bar"></div></div><section style="display:none" id="IPEversionInfo"></section>',
        fitScreen: true,
        fixedHeight: true,
        buttons: [{
          label: msg('close'),
          className: 'btn btn-danger',
          method: function (a, modal) {
            modal.close();
          }
        }, {
          label: 'GitHub',
          className: 'btn btn-secondary',
          method: function () {
            location.href = 'https://github.com/Dragon-Fish/InPageEdit-v2';
          }
        }, {
          label: msg('updatelog-about'),
          className: 'btn btn-secondary',
          method: function () {
            location.href = 'https://common.wjghj.cn/wiki/InPageEdit-v2';
          }
        }]
      });
      $.ajax({
        url: 'https://common.wjghj.cn/api.php',
        dataType: 'jsonp',
        type: 'get',
        data: {
          page: 'InPageEdit-v2/version-info',
          action: 'parse',
          prop: 'text',
          format: 'json'
        },
        success: function (data) {
          var info = data.parse.text['*'];
          $('#IPEversionInfoPlaceholder').addClass('done').delay(800).fadeOut(200);
          $('#IPEversionInfo').html(info);
          $('#yourVersion').html(localStorage.InPageEditVersion);
          $('#IPEversionInfo .mw-headline').each(function () {
            var $this = $(this),
              text = $this.text();
            if (text === curVersion) {
              $this.html('<em class="curVersion" style="background: lightyellow; font-weight: bold">★ ' + $this.text() + '</em>');
            }
          });
          setTimeout('$("#IPEversionInfo").fadeIn(800)', 1000);
        }
      });
    };

    /** 关于插件 **/
    InPageEdit.about = function () {
      ssi_modal.show({
        title: '关于InPageEdit',
        className: 'in-page-edit in-page-edit-about',
        sizeClass: 'dialog',
        content: '<iframe style="margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;" src="https://dev.fandom.com/wiki/InPageEdit-v2?useskin=mercury&amp;mobile-app=true"></iframe>'
      });
    };

    /** 获取版本提示 **/
    $(function () {
      var version = InPageEdit.version;
      // 版本更新
      if (localStorage.InPageEditVersion === null || localStorage.InPageEditVersion !== version) {
        ssi_modal.notify('', {
          title: msg('updatelog-update-success-title'),
          content: msg('updatelog-update-success').replace('$1', version),
          className: 'in-page-edit',
          buttons: [{
            className: 'btn btn-primary',
            label: msg('updatelog-button-versioninfo'),
            method: function (a, modal) {
              localStorage.InPageEditVersion = version;
              InPageEdit.versionInfo();
              modal.close();
            }
          }],
          closeAfter: {
            time: 30,
            resetOnHover: true
          },
          onClose: function () {
            ssi_modal.notify('', {
              className: 'in-page-edit',
              content: msg('updatelog-after-close').replace('$1', '<a href="' + msg('updatelog-url') + '" to="_blank">' + msg('updatelog-url') + '</a>').replace('$2', '<a href="https://github.com/Dragon-Fish/InPageEdit-v2">' + msg('updatelog-file-issue') + '</a>'),
              closeAfter: {
                time: 10
              }
            });
            localStorage.InPageEditVersion = version;
          }
        });
      }
      // 特殊提示
      if (localStorage.InPageEditNoticeId !== InPageEdit.specialNotice.id) {
        ssi_modal.notify('dialog', {
          className: 'in-page-edit ipe-special-notice',
          title: InPageEdit.specialNotice.title,
          content: InPageEdit.specialNotice.content,
          okBtn: {
            label: msg('updatelog-dismiss'),
            className: 'btn btn-primary'
          }
        }, function (e, modal) {
          localStorage.InPageEditNoticeId = InPageEdit.specialNotice.id;
          modal.close();
        });
      }
    });

    /** 页面载入完成，自动加载某些模块 **/
    (function () {
      /** 额外的模块 **/
      // 快速页面差异模块
      InPageEdit.loadQuickDiff();
      /** 读取设定 **/
      if (localStorage.getItem('InPageEditPreference') === null) {
        // 没有保存任何设置
        var ipePreference = {};
        ipePreference.outSideClose = true;
        ipePreference.editMinor = false;
        ipePreference.editSummary = msg('preference-summary-default');
        localStorage.setItem('InPageEditPreference', JSON.stringify(ipePreference));
      }
      // 加载段落编辑模块
      InPageEdit.articleLink();
    }());

    /** Toolbox模块 **/
    mw.hook('InPageEdit').add(function () {
      // 检测是否为文章页
      if (mw.config.get('wgIsArticle') === false) {
        console.warn('%c[InPageEdit] 不是文章页面，未载入工具盒。', 'color:orange;font-size:1.2em;font-weight:bold');
        return;
      }

      /** IPE工具盒 **/
      $('<div>', { id: 'ipe-edit-toolbox' }).append(
        $('<ul>', { class: 'btn-group group1' }).append(
          $('<li>', { class: 'btn-tip-group' }).append(
            $('<div>', { class: 'btn-tip', text: msg('quick-edit') }),
            $('<button>', { id: 'edit-btn', class: 'ipe-toolbox-btn material-icons', text: 'edit' })
          ),
          $('<li>', { class: 'btn-tip-group' }).append(
            $('<div>', { class: 'btn-tip', text: msg('redirect-from') }),
            $('<button>', { id: 'redirectfrom-btn', class: 'ipe-toolbox-btn material-icons', text: 'flight_land' })
          ),
          $('<li>', { class: 'btn-tip-group' }).append(
            $('<div>', { class: 'btn-tip', text: msg('redirect-to') }),
            $('<button>', { id: 'redirectto-btn', class: 'ipe-toolbox-btn material-icons', text: 'flight_takeoff' })
          )
        ),
        $('<ul>', { class: 'btn-group group2' }).append(
          $('<div>', { style: 'display: flex;' }).append(
            $('<li>', { class: 'btn-tip-group' }).append(
              $('<div>', { class: 'btn-tip', text: msg('quick-delete') }),
              $('<button>', { id: 'deletepage-btn', class: 'ipe-toolbox-btn material-icons', text: 'delete_forever' })
            ),
            $('<li>', { class: 'btn-tip-group' }).append(
              $('<div>', { class: 'btn-tip', text: msg('quick-rename') }),
              $('<button>', { id: 'renamepage-btn', class: 'ipe-toolbox-btn material-icons', text: 'format_italic' })
            ),
            $('<li>', { class: 'btn-tip-group' }).append(
              $('<div>', { class: 'btn-tip', text: msg('ipe-preference') }),
              $('<button>', { id: 'preference-btn', class: 'ipe-toolbox-btn material-icons', text: 'settings' })
            )
          )
        ),
        $('<button>', { class: 'ipe-toolbox-btn material-icons', id: 'toolbox-toggle', text: 'add' })
      ).appendTo('body');
      $('#ipe-edit-toolbox #toolbox-toggle').click(function () {
        $('#ipe-edit-toolbox #toolbox-toggle, #ipe-edit-toolbox .btn-group').toggleClass('opened');
      });
      $('body > *:not(#ipe-edit-toolbox)').click(function () {
        $('#ipe-edit-toolbox #toolbox-toggle, #ipe-edit-toolbox .btn-group').removeClass('opened');
      });
      $('#ipe-edit-toolbox .btn-group .ipe-toolbox-btn').click(function () {
        InPageEdit.analysis({ type: 'functionCount', function: '工具盒' });
        switch ($(this).attr('id')) {
          case 'edit-btn':
            InPageEdit.quickEdit({
              page: mw.config.get('wgPageName'),
              revision: mw.config.get('wgRevisionId')
            });
            break;
          case 'redirectfrom-btn':
            InPageEdit.quickRedirect('from');
            break;
          case 'redirectto-btn':
            InPageEdit.quickRedirect('to');
            break;
          case 'preference-btn':
            InPageEdit.preference();
            break;
          case 'deletepage-btn':
            InPageEdit.quickDelete();
            break;
          case 'renamepage-btn':
            InPageEdit.quickRename();
            break;
        }
      });
      mw.hook('InPageEdit.toolbox').fire();
    });

    // Init End
  }

  // 花里胡哨的加载提示
  mw.hook('InPageEdit').fire();
  console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');
}());