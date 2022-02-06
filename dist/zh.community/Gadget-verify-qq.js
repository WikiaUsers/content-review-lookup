/**
 * @name Verify-QQ-number
 * @desc The form that help users add md5 QQ number
 *       to User:Username/verify-qq page for join
 *       Fandom QQ Group.
 * @author 机智的小鱼君
 */
import('https://unpkg.com/hash-wasm@4.9.0/dist/index.esm.js?module').then(
  function (hash) {
    console.log(hash)
    // 变量
    var config = mw.config.get(),
      pageName = config.wgPageName.replace(/_/g, ' '),
      userName = config.wgUserName,
      verifyPage = 'User:' + config.wgUserName + '/verify-qq',
      mwApi = new mw.Api({ parameters: { format: 'json', formatversion: 2 } })
    var $verifyArea = $('<div>', { id: 'verifyQqBox' }).append(
      $('<h2>', { text: '验证您的QQ号' }),
      $('<label>', {
        for: 'qqInput',
        style: 'display: block; font-style: italic',
        text: '在下面的输入框内输入您的QQ号，然后点击确定按钮。该信息将被加密保存，用于验证加入QQ群。',
      }),
      $('<input>', {
        id: 'qqInput',
        style:
          'margin: 0 8px 0 0;padding: 4px 8px;line-height: 1;font-size: 1rem;border: none;border-bottom: 2px solid;',
        placeholder: 'QQ号',
      }).on('click', function () {
        $(this).css({
          'border-color': '',
          'background-color': '',
        })
      }),
      $('<span>', {
        class: 'wds-button wds-primary',
        style: 'font-size: 1rem;margin: 0;padding: 4px 12px;cursor: pointer',
        text: '确定',
      }).on('click', function () {
        var $button = $(this)
        var qqInput = $verifyArea.find('#qqInput')
        var qqNumber = qqInput.val()
        // 验证数据 → QQ号是5-11位纯数字
        if (/^[1-9][0-9]{4,10}$/gim.test(qqNumber) !== true) {
          qqInput.css({
            'border-color': 'red',
            'background-color': 'pink',
          })
          return
        } else {
          qqInput.css({
            'border-color': '',
            'background-color': '',
          })
        }
        $button.attr('disabled', '').text('正在保存')
        hash
          .md5(qqNumber)
          .then(function (encodeNumber) {
            return mwApi.postWithEditToken({
              action: 'edit',
              title: verifyPage,
              text: encodeNumber,
              summary: '保存QQ号验证数据',
            })
          })
          .then(function (data) {
            $button.text('保存成功')
            if (pageName === verifyPage) location.reload()
          })
          .catch(function (errorCode) {
            $verifyArea
              .find('#errMsgArea')
              .empty()
              .append(
                $('<div>').append(
                  $('<div>', {
                    html: '保存失败：<code>' + errorCode + '</code>',
                  }),
                  $('<div>').append(
                    '请将以下内容手动保存到',
                    $('<a>', {
                      text: verifyPage,
                      href: mw.util.getUrl(verifyPage),
                      target: '_blank',
                    }),
                    ': <code>' + encodeNumber + '</code>'
                  )
                )
              )
            $button.removeAttr('disabled').text('再试一次')
          })
      }),
      $('<div>', { id: 'errMsgArea' })
    )

    // 用户是否登录
    if (!userName) return

    /** Self Verify Page */
    // 判断是否为为用户页且页面深度为2
    if (config.wgNamespaceNumber === 2 && pageName.split('/').length === 2) {
      // 缓存页面名解析数据
      var pageUser = pageName.split('/')[0].split(':')[1],
        subName = pageName.split('/')[1]
      // 判断是否为本人的验证页面
      if (userName === pageUser && subName === 'verify-qq') {
        $verifyArea.prependTo('#mw-content-text')
      } else if (userName !== pageUser && subName === 'verify-qq') {
        $('#mw-content-text').prepend(
          $('<h2>', { text: '这是' + pageUser + '的QQ号验证页' }),
          $('<strong>', {
            class: 'error',
            text:
              '请不要编辑他人的QQ号验证页面，本页面的最后编辑者不是' +
              pageUser +
              '将导致其加群申请被拒绝！',
          }),
          '<br>',
          $('<em>').append(
            '您的QQ号验证页面在',
            $('<a>', { href: mw.util.getUrl(verifyPage), text: '这里' }),
            '。'
          )
        )
      }
    }

    /** Verify Container */
    $('#verifyQqContainer').empty().append($verifyArea)
  }
)