/**
 * This is a unstable script. We suggest you to use [[AjaxEdit]] instead.
 * MediaWiki JS Plugin: In Page Edit
 * Author: 机智的小鱼君
 * Url: https://github.com/Dragon-Fish/wjghj-wiki/edit/master/Gadgets/in-page-edit
 * Description: Let you edit page or section without open new tab. And edit Navbox via navbar link, edit another page in the wiki with the edit link etc.
 **/
$(function(){
function InPageEditI18n(i18n) {
  function InPageEdit(option) {
    // 只能存在一个窗口
    if ($('#InPageEdit').length > 0) {
      $('#InPageEdit').remove();
    }
    // 开始执行任务
    $('body').addClass('action-in-page-edit');
 
    // Variables
    var origintext,
        titleSection,
        inPageEditTarget = option.target,
        inPageEditSection = option.section,
        inPageEditReason = option.reason,
        inPageEditTags = option.tags,
        inPageEditRefresh = option.refresh;
    if (inPageEditTarget === undefined || inPageEditTarget === '') {
      inPageEditTarget = mw.config.get('wgPageName')
    } else {
      inPageEditTarget = decodeURIComponent(inPageEditTarget)
    }
    if (inPageEditSection === undefined || inPageEditSection === '') {
      inPageEditSection = 'none'
    }
    if (inPageEditReason === undefined || inPageEditReason === '') {
      inPageEditReason = ''
    }
    if (inPageEditRefresh === undefined || inPageEditRefresh == 'true' || inPageEditRefresh == '1') {
      inPageEditRefresh = true;
    }
    if (inPageEditTags === undefined || inPageEditTags === '') {
      inPageEditTags = ''
    }
 
    if (inPageEditSection === 'none') {
      varGet = {
        action: "parse",
        page: inPageEditTarget,
        prop: "wikitext",
        format: "json"
      }
      titleSection = ''
    } else {
      varGet = {
        action: "parse",
        page: inPageEditTarget,
        section: inPageEditSection,
        prop: "wikitext",
        format: "json"
      }
      titleSection = i18n.msg('titleSection').escape().replace('$1',inPageEditSection)
    }
 
    new mw.Api().get(varGet).then(function(data) {
      if (data.parse === undefined) {
        origintext = '<!-- ' + i18n.msg('errorNoContent').escape() + ' -->\n';
      } else {
        origintext = data.parse.wikitext['*'];
      }
      ajaxArea()
    });
    function ajaxArea() {
      // Create area & hide article
      $('#mw-content-text').hide();
      $('#mw-content-text').before(
      '<div id="InPageEdit">' +
 
      '<h1 id="edit-title">in-page-edit-title</h1>' + '<textarea id="newcontent" style="width:100%;min-height:300px;max-height:1200px"></textarea>' +
 
      '<div id="button-area">' + '<div id="normal"><button id="cancle-btn">' + i18n.msg('btnCancel').escape() + '</button> <button id="preview-btn">' + i18n.msg('btnPreview').escape() + '</button> <label><input type="checkbox" id="is-minor"/> ' + i18n.msg('minorEdit').escape() + '</label> <div style="float:right"><input id="reason" placeholder="' + i18n.msg('editSummary').escape() + '" value="' + inPageEditReason + '"> <button id="submit-btn">' + i18n.msg('btnSubmit').escape() + '</button></div></div>' +
 
      '<center id="confirm" style="display:none;clear:both"><span id="code"></span><br/><button id="no">' + i18n.msg('btnNo').escape() + '</button> <button id="yes">' + i18n.msg('btnYes').escape() + '</button></center>' +
 
      '</div>' +
 
      '<center id="info-area" style="display:none;"></center>' +
 
      '<h1>' + i18n.msg('btnPreview').escape() + '</h1>' + '<div id="preview-area" style="padding:8px; border:2px dotted #aaa"></div>' +
 
      '</div>'
);
      $('#InPageEdit #newcontent').val(origintext);
      $('#InPageEdit #edit-title').html(i18n.msg('labelEditing').escape().replace('$1',decodeURIComponent(inPageEditTarget)).replace('$2',titleSection));
 
      // Cancle
      $('#InPageEdit #cancle-btn').click(function() {
        $('#InPageEdit #button-area #normal').hide();
        $('#InPageEdit #confirm').show();
        $('#InPageEdit #confirm button').unbind();
        $('#InPageEdit #confirm #code').text(i18n.msg('confirmCancel').escape());
        $('#InPageEdit #confirm #no').click(function() {
          $('#InPageEdit #button-area #normal').show();
          $('#InPageEdit #confirm').hide();
        });
        $('#InPageEdit #confirm #yes').click(function() {
          $('body').removeClass('action-in-page-edit');
          $('#InPageEdit').remove();
          $('#mw-content-text').show();
        });
      });
 
      // Preview
      $('#InPageEdit #preview-btn').click(function() {
        new mw.Api().post({
          action: "parse",
          text: $('#InPageEdit #newcontent').val(),
          prop: "text",
          preview: true,
          format: "json"
        }).then(function(data) {
          var previewcontent = data.parse.text['*'];
 
          $('#InPageEdit #preview-area').html(previewcontent);
        });
      });
 
      // Submit
      $('#InPageEdit #submit-btn').click(function() {
        $('#InPageEdit #button-area #normal').hide();
        $('#InPageEdit #confirm').show();
        $('#InPageEdit #confirm button').unbind();
        $('#InPageEdit #confirm #code').text(i18n.msg('confirmSubmit').escape());
        $('#InPageEdit #confirm #no').click(function() {
          $('#InPageEdit #button-area #normal').show();
          $('#InPageEdit #confirm').hide();
        });
        $('#InPageEdit #confirm #yes').click(function() {
          // Hide elements
          $('#InPageEdit #newcontent').attr('readonly', 'readonly');
          $('#InPageEdit #button-area').hide();
          $('#InPageEdit #info-area').show().html(i18n.msg('msgSubmit').escape() + '&nbsp;<span id="spinner"></span>');
 
          // Do post request
          var isMinor = $('#InPageEdit #is-minor').prop('checked');
          if (inPageEditSection === 'none') {
            varSubmit = {
              action: 'edit',
              text: $('#InPageEdit #newcontent').val(),
              title: inPageEditTarget,
              minor: isMinor,
              tags: inPageEditTags,
              summary: $('#InPageEdit #reason').val(),
              token: mw.user.tokens.get('editToken')
            }
          } else {
            varSubmit = {
              action: 'edit',
              text: $('#InPageEdit #newcontent').val(),
              title: inPageEditTarget,
              section: inPageEditSection,
              minor: isMinor,
              tags: inPageEditTags,
              summary: $('#InPageEdit #reason').val(),
              token: mw.user.tokens.get('editToken')
            }
          }
          new mw.Api().post(varSubmit).done(function() {
            $('#InPageEdit #info-area').html(i18n.msg('msgSuc').escape());
            window.location.href = window.location.href;
          }).fail(function() {
            // Show elements
            $('#InPageEdit #submit-btn').html(i18n.msg('btnRetry').escape());
            $('#InPageEdit #newcontent').attr('readonly', false);
            $('#InPageEdit #button-area, #InPageEdit #button-area #normal').show();
            $('#InPageEdit #confirm').hide();
            $.showCustomModal('InPageEdit Error', '<span class="error">Error post your request.</span>');
            $('#InPageEdit #info-area').hide().html('');
          });
        });
      });
    }
  }
 
  /** Add button **/
  $(function() {
    if (wgIsArticle === false) {
      console.info('[InPageEdit] Not article page, plugin shut down.');
      return;
    }
    $('.page-header__contribution-buttons .wds-dropdown__content ul').append($('<li>').append($('<a>').addClass('in-page-edit-btn-link').attr('href', 'javascript:void(0)').text(i18n.msg('btnQuickedit').escape()).click(function() {
      InPageEdit({
        target: mw.config.get('wgPageName'),
        reason: ' //InPageEdit'
      })
    })));
  });
  /** Get links in ariticle **/
  $(function() {
    $('#mw-content-text a:not(.new)').each(function(i) {
      if ($(this).attr('href') === undefined) return;
      var url = $(this).attr('href');
      params = {};
      var vars = url.split('?').pop().split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = pair[1];
      }
 
      // Not edit link of this wiki
      if (url.split('/')['2'] !== location.href.split('/')['2'] && url.substr(0, 1) !== '/') return;
      // Not url start with 'index.php?title=FOO'
      if (params.title === undefined) params.title = url.split('/wiki/')['1'].split('?')['0'];
      if (params.section === undefined) params.section = 'none';
 
      var target = params.title,
      section = params.section;
 
      if (params.action === 'edit' && target !== undefined && section !== 'new') {
        $(this).after($('<a>').attr({
          'href': 'javascript:void(0)',
          'class': 'in-page-edit-article-link',
          'data-target': target,
          'data-section': section
        }).text(i18n.msg('btnQuickeditS').escape()).click(function() {
          if (section === 'none') {
            InPageEdit({
              target: target,
              reason: ' //InPageEdit'
            });
          } else {
            InPageEdit({
              target: target,
              reason: ' //InPageEdit',
              section: section
            });
          }
        }));
      }
    });
  });
}
mw.hook('dev.i18n').add(function(i18no) {
  i18no.loadMessages('In-page-edit').then(InPageEditI18n);
});
importArticles({
  type: 'script',
  article: 'u:dev:MediaWiki:I18n-js/code.js'
},
{
  type: 'style',
  article: 'u:dev:MediaWiki:In-page-edit.css'
});
});