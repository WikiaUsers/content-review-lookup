/**
 * @name Verify-QQ-number
 * @desc The form that help users add SHA-1 QQ number hash with salt
 *       to User:Username/qq-hash page for join Fandom QQ Group.
 * @author 机智的小鱼君, 米斯蒂娅
 */

// this javascript file must write in es3 syntax

(function () {
  // Variables
  var config = mw.config.get(),
    pageName = config.wgPageName.replace(/\s+/g, '_'),
    userName = config.wgUserName.replace(/\s+/g, '_'),
    mwApi = new mw.Api({ parameters: { format: 'json', formatversion: 2 } }),
    verifyPage = 'User:' + config.wgUserName + '/qq-hash',
    appRoot = $('#VERIFY_QQ_APP')

  // Utils
  function SHA1(str) {
    return crypto.subtle
      .digest('SHA-1', new TextEncoder('utf-8').encode('' + str))
      .then(function (buf) {
        return Array.prototype.map
          .call(new Uint8Array(buf), function (x) {
            return x.toString(16).padStart(2, '0')
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
          if (data.edit && data.edit.result === 'Success') {
            return hash
          } else {
            return Promise.reject(data.error.code)
          }
        })
    })
  }

  // UI
  function createVerifyBox() {
    var input = new OO.ui.TextInputWidget({ validate: 'integer' })
    var button = new OO.ui.ButtonWidget({
      label: '保存',
      required: true,
      flags: ['primary', 'progressive'],
    })
    var result = $('<div>')
    button.on('click', function () {
      var qqNumber = input.getValue()
      result.empty()
      if (!validateQQNumber(qqNumber)) {
        result.empty().append(
          new OO.ui.MessageWidget({
            type: 'error',
            inline: true,
            label: '请输入正确的QQ号码',
          }).$element
        )
        return
      }
      button.setDisabled(true).setLabel('正在保存')
      saveQQHashToPage(qqNumber)
        .then(function () {
          button.setLabel('保存')
          result.empty().append(
            new OO.ui.MessageWidget({
              type: 'success',
              inline: true,
              label: '保存成功',
            }).$element
          )
          setTimeout(function () {
            if (pageName === verifyPage) location.reload()
          }, 1500)
        })
        .catch(function (errorCode) {
          result.empty().append(
            new OO.ui.MessageWidget({
              type: 'error',
              label: new OO.ui.HtmlSnippet(
                [
                  '保存失败：',
                  $('<code>', { text: errorCode }),
                  '<br>请将以下内容手动保存到',
                  $('<a>', {
                    text: verifyPage,
                    href: mw.util.getUrl(verifyPage),
                    target: '_blank',
                  }),
                  '：',
                  $('<code>', { text: hash }),
                ].join('')
              ),
            }).$element
          )
          button.setDisabled(false).setLabel('保存')
        })
    })
    var fieldset = new OO.ui.FieldsetLayout({
      label: '',
      classes: ['container'],
    })
    fieldset.addItems([
      new OO.ui.ActionFieldLayout(input, button, {
        label: '保存QQ号验证数据',
        align: 'top',
      }),
    ])
    tips = $('<ol>').append(
      $('<li>', { text: '在上方输入框内输入您的QQ号' }),
      $('<li>', { text: '点击确定按钮' }),
      $('<li>', {
        text: '您的QQ号将被混淆加密后保存在wiki中',
      }),
      $('<li>').append(
        '保存成功，申请加群，请填写该内容作为验证答案：',
        $('<code>', { text: userName })
      )
    )
    return $('<div>').append(fieldset.$element, tips, result)
  }

  if (pageName === '社区中心:交流群/QQ群') {
    if (!userName) {
      appRoot.empty().append(
        new OO.ui.MessageWidget({
          type: 'notice',
          label: '请先登录后再使用该功能。',
        }).$element
      )
      return
    }
    appRoot.empty().append(createVerifyBox())
  } else if (pageName === verifyPage) {
    $('#mw-content-text').prepend(createVerifyBox())
  } else if (
    config.wgNamespaceNumber === 2 &&
    config.wgTitle.endsWith('/qq-hash') &&
    userName &&
    !config.wgTitle.startsWith(userName)
  ) {
    OO.ui.alert('警告：请勿修改他人的QQ验证数据！', { size: 'large' })
  }
})()