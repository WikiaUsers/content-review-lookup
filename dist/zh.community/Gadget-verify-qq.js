/**
 * @name Verify-QQ-number
 * @desc The form that help users add SHA-1 QQ number hash with salt
 *       to User:Username/qq-hash page for join Fandom QQ Group.
 * @author 机智的小鱼君
 */

// this javascript file must write in es3 syntax

$(function () {
  // Variables
  var config = mw.config.get(),
    pageName = config.wgPageName.replace(/\s+/g, '_'),
    userName = config.wgUserName.replace(/\s+/g, '_'),
    mwApi = new mw.Api({ parameters: { format: 'json', formatversion: 2 } }),
    verifyPage = 'User:' + config.wgUserName + '/qq-hash',
    appRoot = document.getElementById('VERIFY_QQ_APP')

  // Utils
  function SHA1(str) {
    return crypto.subtle
      .digest('SHA-1', new TextEncoder('utf-8').encode('' + str))
      .then(function (buf) {
        return Array.prototype.map
          .call(new Uint8Array(buf), function (x) {
            return ('00' + x.toString(16)).slice(-2)
          })
          .join('')
      })
  }
  function validateQQNumber(str) {
    return /^[1-9][0-9]{4,10}$/gi.test(str)
  }
  function generateQQHash(qq) {
    var now = Date.now()
    return SHA1([now, userName, qq].join('#')).then(function (hash) {
      return [now, userName, hash].join('#')
    })
  }
  function saveQQHashToPage(qq) {
    return generateQQHash(qq).then(function (hash) {
      return mwApi
        .postWithEditToken({
          action: 'edit',
          title: verifyPage,
          text: hash,
          summary: '保存QQ号验证数据',
        })
        .then(function (data) {
          return hash
        })
    })
  }

  // UI
  function VerifyBox() {
    var $container = $('<div>', {
      id: 'verify-qq-container',
    })
    var $input = $('<input>', {
      id: 'verify-qq-input',
      type: 'number',
      placeholder: 'QQ号',
      style: 'display: block; width: 20em; padding: 0.2em 0.5em;',
    })
    var $submitButton = $('<button>', {
      id: 'verify-qq-button',
      text: '确定',
      class: 'wds-button wds-primary',
    })
    var $errorMsg = $('<div>', { id: 'verify-qq-error', class: 'error' })
    var $tips = $('<ol>').append(
      $('<li>', { text: '在上方输入框内输入您的QQ号' }),
      $('<li>', { text: '点击确定按钮' }),
      $('<li>', {
        text: '您的QQ号将被混淆加密后保存在wiki中',
      }),
      $('<li>').append(
        '保存成功，申请加群，请填写该内容作为验证答案: ',
        $('<code>', { text: userName })
      )
    )

    $submitButton.on('click', function (e) {
      e.preventDefault()
      var qqNumber = $input.val().trim()

      $errorMsg.empty()
      if (!validateQQNumber(qqNumber)) {
        $errorMsg.append($('<div>', { text: '请输入正确的QQ号码' }))
        return
      }

      $submitButton.attr('disabled', '').text('正在保存')

      saveQQHashToPage(qqNumber)
        .then(function (hash) {
          $submitButton.text('保存成功')
          if (pageName === verifyPage) location.reload()
        })
        .catch(function (errorCode) {
          $errorMsg.empty().append(
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
                ': <code>' + hash + '</code>'
              )
            )
          )
          $submitButton.removeAttr('disabled').text('再试一次')
        })
    })
    $input.on('change', function () {
      $errorMsg.empty()
    })

    $container.append(
      $('<h2>', { text: '验证您的QQ号' }),
      $('<label>', {
        for: 'verify-qq-input',
        style: 'display: block;',
        text: '保存QQ号验证数据',
      }),
      $('<div>', { style: 'display:flex;gap:1em' }).append(
        $input,
        $submitButton
      ),
      $errorMsg,
      $tips
    )

    this.App = $container
    this.mount = function (target) {
      $(target).empty().append(this.App)
    }
  }

  // Main
  var verifyBox = new VerifyBox()
  if (
    pageName.startsWith('User:') &&
    pageName.endsWith('/qq-hash') &&
    pageName.split('/').shift().split(':').pop() !== userName
  ) {
    $('#mw-content-text').prepend(
      $('<div>', {
        id: 'verify-qq-container',
        class: 'error',
        text: '警告：请勿修改他人的QQ验证数据！',
      })
    )
    return
  }
  if (!userName) {
    verifyBox = $('<div>', {
      id: 'verify-qq-container',
      text: '请先登录后再使用该功能。',
    })
  }
  if (pageName === verifyPage) {
    $('#mw-content-text').prepend(verifyBox.App)
    return
  }

  verifyBox.mount(appRoot)
})