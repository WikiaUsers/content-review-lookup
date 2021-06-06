/**
 * @name WikiGame
 * @author 机智的小鱼君
 *
 * @license CC-BY-SA
 */
!(function(window, $) {
  /**
   * @module InPageDialog
   */
  $('.ipd').each(function() {
    var $this = $(this)
    var dialogId = $this.data('dialogid')
    dialogId = parseInt(dialogId)
    if (dialogId !== 1) {
      $(this).hide()
    }
  })
  $('.ipd-next-btn').on('click', function() {
    var $this = $(this)
    var btnId = $this.data('btnid')
    var lastId = $this.data('lastid')
    if (lastId === 'last') {
      $('#game-selector').show(300)
      $(this).css('color', 'green')
    } else {
      btnId = parseInt(btnId)
      var nextId = btnId + 1
      $(this).css('color', 'green')
      $('.ipd[data-dialogid=' + nextId + ']').show(300)
    }
  })

  /**
   * @module GameSaver
   */
  $('.GameSaver')
    .html('')
    .append(function() {
      var $container = $(this)
      var wgUserName = mw.config.get('wgUserName')
      if (!wgUserName) {
        return $('<div>').append(
          '您需要',
          $('<a>', { text: '登录', href: mw.util.getUrl('Special:Login') }),
          '以保存游戏！'
        )
      }
      var gameName = $container.data('game'),
        timeNow = new Date().toISOString(),
        gameTitle = $container.data('title'),
        pageName = mw.config.get('wgPageName'),
        userPage = 'User:' + wgUserName,
        savesPage = userPage + '/gamesaves/' + gameName

      var $saveBtn = $('<button>')
        .text('保存游戏')
        .addClass('wds-button wds-primary')
        .css('margin-right', '1rem')
      var $loadBtn = $('<button>')
        .text('读取游戏')
        .addClass('wds-button wds-is-secondary')

      $saveBtn.on('click', function() {
        var $btn = $(this)
        var note = prompt('有什么要备注的吗？', '无')
        if (note === null) {
          return
        }

        $btn.attr('disabled', '')
        $btn.text('存档中…')

        new mw.Api()
          .postWithToken('csrf', {
            action: 'edit',
            title: savesPage,
            summary:
              '/*' +
              gameTitle +
              ' | ' +
              timeNow +
              '*/新增游戏' +
              gameName +
              '存档',
            appendtext:
              '\n== ' +
              gameTitle +
              ' | ' +
              timeNow +
              ' ==\n*游戏：[[Game:' +
              gameName +
              ']]\n*时间：' +
              timeNow +
              '\n*[[' +
              pageName +
              '|继续游戏]]\n*备注：' +
              note +
              '\n\n',
          })
          .then(
            function() {
              $btn.text('存档完毕！')
              setTimeout(function() {
                $btn.text('再次保存').removeAttr('disabled')
              }, 5000)
            },
            function() {
              $btn.text('存档失败，点击重试').removeAttr('disabled')
            }
          )
      })

      $loadBtn.on('click', function() {
        location.href = mw.util.getUrl(savesPage)
      })

      return $('<div>', { class: 'game-saver' })
        .css({
          'text-align': 'center',
        })
        .append($saveBtn, $loadBtn)
    })
})(window, jQuery)