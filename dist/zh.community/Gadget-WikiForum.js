/** Localization support is not yet complete */

'use strict'

/**
 * @name WikiForum
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @description Provide the forum similar to the Community Feed, and support wikitext!!!
 *
 * @license CC BY-SA
 */

!(function() {
  // 缓存变量
  var conf = mw.config.get()
  if (conf.wgNamespaceNumber !== 3000 && conf.wgNamespaceNumber !== 110)
    return console.log('Not Forum Namespace')
  // if (conf.wgNamespaceNumber % 2 !== 1) return console.log('Not Talk page')

  mw.loader
    .using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user'])
    .then(main)

  /**
   * @function dateFormat
   */
  function dateFormat(fmt, date) {
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    return fmt
  }

  /**
   * @function initAll
   */
  function initAll() {
    return new mw.Api()
      .get({
        format: 'json',
        action: 'parse',
        prop: 'wikitext|text',
        page: conf.wgPageName,
      })
      .then(function(data) {
        var $wikitext = $('<div>' + data.parse.wikitext['*'] + '</div>')
        var $html = $('<div>' + data.parse.text['*'] + '</div>')

        function parseStruc(obj, prefix) {
          if (prefix) {
            prefix += '-'
          } else {
            prefix = ''
          }
          obj.find('> .forum-thread').each(function(index, thread) {
            var threadId = prefix + (index + 1)
            $(thread).attr('data-postid', threadId)
            $(thread).attr('id', 'forum-id-' + threadId)

            if ($(thread).find('> .forum-thread').length > 0) {
              parseStruc($(thread), threadId)
            }
          })
        }

        // 处理源代码结构
        $wikitext.find('[data-postid]').removeAttr('data-postid')
        parseStruc($wikitext.find('> div'))
        window.WikiForum.cache.wikitext = $wikitext.html()

        $html.find('[data-postid]').removeAttr('data-postid')
        parseStruc($html.find('> div'))
        // $html.find('script, style').remove() // xss
        $('#mw-content-text')
          .html('')
          .removeClass('forum-loading')
          .append($html)
      })
  }

  /**
   * @function initPost
   * @param {*} post
   */
  function initBasic($root) {
    $.each($root.find('.forum-thread'), function(index, post) {
      var util = mw.util

      var $post = $(post)
      var id = $post.data('postid')
      var user = $post.data('user')
      var release = $post.data('release')
      release = new Date(release)

      $post.find('> .forum-before').append(
        $('<div>', { class: 'forum-author' }).append(
          $('<img>', {
            class: 'forum-avatar',
            src:
              'https://vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg/revision/latest?cb=20191203083420',
            'data-user': user,
          }),
          $('<a>', { text: user, href: util.getUrl('User:' + user) })
        ),
        $('<span>', { class: 'forum-id-link' }).append(
          $('<a>', { text: '#' + id, href: '#forum-id-' + id })
        )
      )

      $post.find('> .forum-after').append(
        $('<i>', {
          class: 'post-date',
          text: dateFormat('yyyy年M月d日 hh:mm:ss', release),
        })
      )
    })
  }

  /**
   * @function getAvatar
   * @param {*} item
   */
  function initAvatar($root) {
    $.each($root.find('.forum-avatar'), function(index, item) {
      var $item = $(item)
      var user = $item.data('user')

      window.WikiForum.cache.avatar = window.WikiForum.cache.avatar || {}

      if (window.WikiForum.cache.avatar[user] === null) {
        return
      } else if (typeof window.WikiForum.cache.avatar[user] === 'string') {
        $item.attr('src', window.WikiForum.cache.avatar[user])
        return
      }

      $.get('https://community.fandom.com/api/v1/User/UsersByName', {
        query: user,
      }).then(
        function(data) {
          if (data.users.length > 0) {
            var avatar = data.users[0].avatarUrl
            window.WikiForum.cache.avatar[user] = avatar
            $item.attr('src', avatar)
          }
        },
        function(err) {
          console.warn('Get avatar failed', err)
        }
      )
    })
  }

  /**
   * @function initInput
   * @param {*} thread
   */
  function initInput($root) {
    function generageInput(id) {
      var $textArea = $('<textarea>', {
        class: 'forum-textarea',
      })
      var $container = $('<label>', {
        class: 'forum-input-container',
      }).append(
        $('<div>').append($textArea),
        $('<div>').append(
          $('<button>', {
            'data-replyid': id || '1',
            class: 'forum-send-btn',
            text: '发送',
          }).click(function() {
            submitReply($(this), $textArea, $container)
          })
        )
      )
      return $container
    }

    // 处理回帖
    $.each($root.find('.forum-thread'), function initInput(_, thread) {
      var $thread = $(thread)

      var id = $thread.data('postid')

      if (id === 1 || isComplex(id)) return

      var $inputArea = generageInput(id)

      var $modifyContainer = $('<div>', {
        class: 'forum-modify-container',
      }).append(
        $('<a>', {
          class: 'forum-reply-link',
          text: '回复',
          href: 'javascript:;',
        }).click(function() {
          $(this).hide()
          $inputArea.addClass('show')
        })
      )

      $thread.find('> .forum-after').append($modifyContainer, $inputArea)
    })

    // 处理新帖
    $root.append(
      $('<div>', { class: 'forum-add-reply' }).append(
        $('<h3>', { class: '回复楼主' }),
        generageInput('1')
      )
    )
  }

  /**
   * @function submitReply
   * @param {Object} ctx
   */
  function submitReply($this, $textArea, $container) {
    var replyid = String($this.data('replyid')) || '1'
    var content = $textArea.val()
    var $wikitext = $(window.WikiForum.cache.wikitext)

    if (!content) return

    console.log('submit reply', replyid, content)
    $container.addClass('forum-loading')
    content = newThread({ content: content })

    /**
     * 
     * 这是低版本 jQuery 的 bug
     * 无法正常在 jq-Element 中插入 script
     * 即使转义也一样
     */
    content.replace(/<script>(.+?)<\/script>/gi, '')

    if (replyid === '1') {
      $wikitext.append(content)
    } else {
      $wikitext.find('[id=forum-id-' + replyid + ']').append(content)
    }

    $wikitext.find('[data-postid]').removeAttr('data-postid')

    new mw.Api()
      .post({
        format: 'json',
        action: 'edit',
        token: mw.user.tokens.get('editToken'),
        text: $wikitext.prop('outerHTML'),
        title: conf.wgPageName,
        summary:
          '[WikiForum] 回复帖子 [[' +
          conf.wgPageName +
          '#forum-id-' +
          replyid +
          '|#' +
          replyid +
          ']]',
      })
      .then(
        function(data) {
          main()
        },
        function(err) {
          $container.removeClass('forum-loading')
          console.error('WikiForum submit failed', err)
        }
      )
  }

  /**
   * @function isComplex
   * @param {String} id
   */
  function isComplex(id) {
    var depthMax = window.WikiForum.depthMax || 3
    if (String(id).split('-').length > depthMax) {
      return true
    } else {
      return false
    }
  }

  /**
   * @function initEmpty
   */
  function initEmpty() {
    var $root = $('#mw-content-text')

    if (conf.wgArticleId !== 0) {
      console.log('页面内存在内容')
      return
    }

    var $title = $('<input>', {
      class: 'forum-create-title',
      placeholder: '填写主题',
      value: conf.wgPageName.split(':')[1],
    })
    var $textArea = $('<textarea>', { class: 'forum-textarea' })

    $root.html('').append(
      $('<div>', { class: 'wiki-forum forum-create' }).append(
        $('<h3>', { text: '新建帖子' }),
        $('<div>', { class: 'forum-thread' }).append(
          $title,
          $('<label>', {
            class: 'forum-input-container',
          }).append(
            $('<div>').append($textArea),
            $('<div>').append(
              $('<button>', {
                class: 'forum-send-btn',
                text: '发送',
              }).click(function() {
                var $this = $(this)
                var title = $title.val() || conf.wgPageName.split(':')[1]
                title = title.trim()
                var content = $textArea.val()

                if (!content || !title) return

                $this
                  .parent()
                  .parent()
                  .addClass('forum-loading')

                var $content = $('<div>').append(
                  $('<div>', { class: 'wiki-forum' }).append(
                    newThread({ content: content, className: 'forum-first' })
                  )
                )

                new mw.Api()
                  .post({
                    format: 'json',
                    action: 'edit',
                    createonly: 1,
                    token: mw.user.tokens.get('editToken'),
                    text: $content.html(),
                    title: 'Forum:' + title,
                    summary: '[WikiForum] 新建帖子',
                  })
                  .then(
                    function(data) {
                      location.href = mw.util.getUrl('Forum:' + title)
                    },
                    function(err) {
                      $this
                        .parent()
                        .parent()
                        .removeClass('forum-loading')
                      console.error('WikiForum submit failed', err)
                    }
                  )
              })
            )
          )
        )
      )
    )
  }

  /**
   * @function newThread
   * @param {Object} ctx
   */
  function newThread(ctx) {
    var release = ctx.release || new Date().toISOString()
    var modified = ctx.modified || release
    var content = ctx.content || ''
    var className = ctx.className || ''

    return $('<div>', {
      class: 'forum-thread ' + className,
      'data-user': conf.wgUserName,
      'data-release': release,
      'data-modified': modified,
    })
      .append($('<div>', { class: 'forum-content', html: content }))
      .prop('outerHTML')

    // return (
    //   '<div class="forum-thread ' +
    //   className +
    //   '" data-release="' +
    //   release +
    //   '" data-modifiled="' +
    //   modified +
    //   '">' +
    //   '<div class="content">' +
    //   content +
    //   '</div>' +
    //   '</div>'
    // )
  }

  /**
   * @function main
   */
  function main() {
    // 变量
    window.WikiForum = window.WikiForum || {}
    // if (WikiForum.loaded) return console.log('WikiForum already loaded')
    window.WikiForum.loaded = true
    window.WikiForum.cache = window.WikiForum.cache || {}

    if ($('.wiki-forum').length < 1 || conf.wgArticleId === 0) {
      initEmpty()
      console.log('No forum root')
      return
    }

    $('#mw-content-text').addClass('forum-loading')

    // 请求源代码
    initAll().then(function() {
      var $root = $('.wiki-forum')

      // 设置 depthMax
      window.WikiForum.depthMax = $root.data('depthMax') || 3

      // 添加前后块
      $root.find('.forum-content').each(function(_, item) {
        $(item).before($('<div>', { class: 'forum-before' }))
        $(item).after($('<div>', { class: 'forum-after' }))
      })

      $root.each(function(_, root) {
        var $root = $(root)
        // 处理发帖信息
        initBasic($root)
        // 处理头像
        initAvatar($root)
        // 处理回复框
        initInput($root)
      })
    })

    // end
  }
})()