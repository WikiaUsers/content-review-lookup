/**
 * @name Verify-QQ-number
 * @desc The form that help users add SHA-1 QQ number hash with salt
 *       to User:Username/qq-hash page for join Fandom QQ Group.
 * @author 机智的小鱼君
 */

// this javascript file must write in es3 syntax

$(function () {
  // Config
  var QQ_HASH_SUFFIX = '/qq-hash', // user subpage that stores the hash
    ADMIN_GROUP = 'sysop', // user group allowed to verify other users
    QQ_NUMBER_PATTERN = /^[1-9][0-9]{4,10}$/, // note: no /g (stateful .test)
    FRESHNESS_WINDOW_MS = 2 * 60 * 60 * 1000, // admin-verify freshness hint
    FRESHNESS_WINDOW_LABEL = '2 小时'

  // Variables
  var config = mw.config.get(),
    pageName = config.wgPageName.replace(/\s+/g, '_'),
    userName = config.wgUserName.replace(/\s+/g, '_'),
    mwApi = new mw.Api({ parameters: { format: 'json', formatversion: 2 } }),
    verifyPage = 'User:' + config.wgUserName + QQ_HASH_SUFFIX,
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
    return QQ_NUMBER_PATTERN.test(str)
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

  // Admin verification: recompute the stored hash from an admin-supplied QQ
  // number and compare it against the value already rendered on the target
  // user's page (passed in as pageText, no extra API round-trip needed).
  function AdminVerifyBox(targetPage, pageText) {
    var $container = $('<div>', { id: 'verify-qq-admin-container' })
    var $input = $('<input>', {
      id: 'verify-qq-admin-input',
      type: 'number',
      placeholder: 'QQ号',
      style: 'display: block; width: 20em; padding: 0.2em 0.5em;',
    })
    var $submitButton = $('<button>', {
      id: 'verify-qq-admin-button',
      text: '校验',
      class: 'wds-button wds-primary',
    })
    var $result = $('<div>', { id: 'verify-qq-admin-result' })

    function showResult(node) {
      $result.empty().append(node)
    }
    function showError(text) {
      showResult($('<div>', { class: 'error', text: text }))
    }

    // Parse the stored verification data from the page content.
    // { timestamp: string, username: string, hash: string }
    var stored = null
    var trimmed = ('' + pageText).trim()
    var parts = trimmed.split('#')
    if (parts.length >= 3 && parts[0] && parts[1] && parts[2]) {
      stored = { timestamp: parts[0], username: parts[1], hash: parts[2] }
    } else {
      $submitButton.attr('disabled', '')
      showError(trimmed ? '验证数据格式无法识别' : '该用户尚未保存 QQ 验证数据')
    }

    $submitButton.on('click', function (e) {
      e.preventDefault()
      if (!stored) return
      var qqNumber = $input.val().trim()

      $result.empty()
      if (!validateQQNumber(qqNumber)) {
        showError('请输入正确的QQ号码')
        return
      }

      $submitButton.attr('disabled', '').text('校验中')
      SHA1([stored.timestamp, stored.username, qqNumber].join('#'))
        .then(function (hash) {
          var matched = hash === stored.hash
          var ageMs = Date.now() - Number(stored.timestamp)
          var withinWindow = ageMs <= FRESHNESS_WINDOW_MS
          var minutes = Math.max(0, Math.floor(ageMs / 60000))

          showResult(
            $('<div>').append(
              $('<div>', {
                style:
                  'font-weight:bold;color:' + (matched ? 'green' : 'red'),
                text: matched ? '✓ QQ号与记录匹配' : '✗ QQ号与记录不匹配',
              }),
              $('<div>', {
                text: withinWindow
                  ? '数据保存于 ' + minutes + ' 分钟前（' +
                    FRESHNESS_WINDOW_LABEL + '内）'
                  : '提示：数据保存于 ' + minutes + ' 分钟前，已超过 ' +
                    FRESHNESS_WINDOW_LABEL,
              })
            )
          )
          $submitButton.removeAttr('disabled').text('校验')
        })
        .catch(function (errorCode) {
          showError('校验失败：' + errorCode)
          $submitButton.removeAttr('disabled').text('校验')
        })
    })
    $input.on('change', function () {
      $result.empty()
    })

    $container.append(
      $('<h2>', { text: '校验用户 QQ 号' }),
      $('<div>').append('正在校验页面：', $('<code>', { text: targetPage })),
      $('<label>', {
        for: 'verify-qq-admin-input',
        style: 'display: block;',
        text: '输入待校验的 QQ 号',
      }),
      $('<div>', { style: 'display:flex;gap:1em' }).append(
        $input,
        $submitButton
      ),
      $result
    )

    this.App = $container
  }

  // Main
  var verifyBox = new VerifyBox()
  if (
    pageName.startsWith('User:') &&
    pageName.endsWith(QQ_HASH_SUFFIX) &&
    pageName.split('/').shift().split(':').pop() !== userName
  ) {
    var userGroups = config.wgUserGroups || []
    if (userGroups.indexOf(ADMIN_GROUP) !== -1) {
      // Admins verify other users' QQ numbers instead of editing the page.
      // Read the rendered page content before injecting our own box into it.
      var $content = $('#mw-content-text .mw-parser-output')
      var pageText = ($content.length ? $content : $('#mw-content-text')).text()
      $('#mw-content-text').prepend(
        new AdminVerifyBox(config.wgPageName, pageText).App
      )
    } else {
      $('#mw-content-text').prepend(
        $('<div>', {
          id: 'verify-qq-container',
          class: 'error',
          text: '警告：请勿修改他人的QQ验证数据！',
        })
      )
    }
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