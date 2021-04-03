/**
 * @name WikiAdoptionTool 领养社区申请表
 * @author 机智的小鱼君
 * @logs
 ** 2018年5月7日 (一) 04:23 (UTC)：post到common.js测试效果
 ** 2018年5月8日 (二) 02:29 (UTC)：正在测试monobook的支持 ×
 ** 2018年5月9日 (三) 06:46 (UTC)：增加取消功能，是的，终于可以取消了，妈妈再也不用担心我手滑了
 ** 2018年5月9日 (三) 09:21 (UTC)：成功后提示并打开页面，非常厉害吧
 ** 2018年5月10日 (四) 10:33 (UTC)：允许中途取消，妈妈再也不用担心我手滑了还要点一堆取消了
 ** 2018年12月14日 (五) 06:36 (UTC)：全面升级为表单
 ** 2018年12月14日 (五) 07:03 (UTC)：在特殊页面增加表单 ×
 ** 2018年12月21日 (五) 17:55 (UTC)：更新url过滤器 ×
 ** 2019年2月28日 (四) 07:39 (UTC)：重写加载方式为oasis弹窗
 ** 2019年3月1日 (五) 11:31 (UTC)：响应式设计
 ** 2019年3月1日 (五) 13:34 (UTC)：重写过滤器，修复了“提交”按钮的事件处理器绑定BUG
 ** 2020年1月4日 (六) 09:09 (UTC)：由 Winston Sung 加入繁簡與地區詞轉換
 ** 2020年1月4日 (六) 10:25 (UTC)：Fandomlized
 ** 2020年1月7日 (二) 08:55 (UTC)：將語言代碼欄位從輸入文字改為下拉選單
 ** 2020年1月7日 (二) 17:56 (UTC)：新增过滤器，阻止非法字符
 ** 2021年2月11日：基于UCP进行了重构
 ** 2021年3月9日 (二) 13:02 (UTC)：Minor fix
 */

!(function() {
  // 变量
  var conf = mw.config.get()

  // 申请按钮
  var $adoptBtn = function() {
    return $('<a>', {
      href: 'javascript:;',
      class: 'adoption-start-btn'
    })
      .click(showModal)
      .append(
        $('<span>')
          .addClass('wds-is-secondary wds-button wds-is-squished')
          .text(wgULS('填写领养表格', '填寫領養表單'))
          .css({
            cursor: 'pointer'
          })
      )
  }

  // 插♂入
  $('.adopt-wiki, .wiki-adoption-start-container').html($adoptBtn)

  // 已完成弹窗
  if (conf.wgNamespaceNumber === 112 || conf.wgArticleId === 20821) {
    //添加按钮
    $('.page-header__contribution-buttons').append($adoptBtn)
    //提示已收到申请
    if (mw.util.getParamValue('newrequest')) {
      ssi_modal.notify('success', {
        title: '成功',
        content: wgULS(
          '我们已经收到了您的领养申请，请关注此页面并耐心等待工作人员审核，谢谢！',
          '我們已經收到了您的領養申請，請關注此頁面並耐心等候工作人員審核，謝謝!'
        )
      })
    }
  }

  // 调出弹窗
  function showModal() {
    // 拒绝未登录用户
    if (!conf.wgUserName) {
      ssi_modal.dialog({
        center: 1,
        title: '功能不可用',
        content: wgULS('对不起，请登录后再试', '對不起，請登入後再試'),
        okBtn: {
          className: 'btn btn btn-single',
          label: '好的'
        }
      })
      return
    }

    // 拒绝重复按键
    if ($('#adoption-form').length > 0) {
      return
    }

    // 表格标题
    var modalTitle = wgULS('领养wiki申请表', '領養wiki申請表')
    // 表格内容
    var modalContent = $('<section>', { id: 'adoption-form' }).append(
      $('<h2>', { text: wgULS('社区名称', '社區名稱') }),
      $('<div>', {
        text: wgULS('要领养社区的名称', '要領養社區的名稱'),
        style: 'font-size: small'
      }),
      '<input id="wikiName" placeholder="鱼香肉丝wiki"></input>' +
        '<h2>' +
        wgULS('社区域名', '社區域名') +
        '*</h2>' +
        '<small>' +
        wgULS(
          '只写子域名不要填完整网址，一般中文社区语言路径为zh，可以不用修改',
          '只寫子域名不要填完整網址，一般中文社區語言路徑為zh，可以不用修改'
        ) +
        '</small><br>',
      $('<span>').append(
        'https://<input placeholder="example" id="wikiUrl" style="width:5em"></input>.fandom.com/',
        $('<select>', {
          id: 'wikiLang',
          style:
            'width:5em;height:20px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box'
        })
          .append(
            '<option value="">(' +
              wgULS('留空', '留空') +
              ')</option>' +
              '<option value="lzh">lzh</option>' +
              '<option value="nan">nan</option>' +
              '<option value="yue">yue</option>' +
              '<option value="zh" selected>zh</option>' +
              '<option value="zh-tw">zh-tw</option>' +
              '<option value="zh-hk">zh-hk</option>' +
              '<option value="more-lang">其他</option>'
          )
          .change(function() {
            var $this = $(this)
            if ($this.val() === 'more-lang')
              $this.replaceWith($('<input>', { id: 'wikiLang' }))
          })
      ),
      '<h2>' +
        wgULS('编辑次数', '編輯次數') +
        '*</h2>' +
        '<small>' +
        wgULS('您在此社区的编辑次数', '您在此社區的編輯次數') +
        '</small><br>' +
        '<input id="editCounts" placeholder="xx次"></input>' +
        '<h2>' +
        wgULS('编辑天数', '編輯天數') +
        '*</h2>' +
        '<small>' +
        wgULS(
          '您已经在此社区编辑多长时间了，我们建议您至少连续编辑7天。注意：我们会确认您填写的天数是否正确',
          '您已經在此社區編輯多長時間了，我們建議您至少連續編輯7天。注意：我們會確認您填寫的天數是否正確'
        ) +
        '</small><br>' +
        '<input id="editTime" placeholder="xx天"></input>' +
        '<h2>' +
        wgULS('最后操作', '最後操作') +
        '*</h2>' +
        '<small>' +
        wgULS(
          '最后有过操作的管理员，最后一次操作是什么时候',
          '最後有過操作的管理員，最後一次操作是什麼時候'
        ) +
        '</small><br>' +
        '<input id="lastSysop" placeholder="xx天前/xxxx年x月x日"></input>' +
        '<h2>其他留言</h2>' +
        '<small>' +
        wgULS(
          '其他要说明的，例如您为什么觉得自己可以胜任新管理员的职位。若wiki存在其他的活跃编辑者，你们之间是否有过交流？留下你们之间交流的链接。',
          '其他要說明的，例如您為什麽覺得自己可以勝任新管理員的職位。若wiki存在其他的活躍編輯者，你們之間是否有過交流？留下你們之間交流的連結。'
        ) +
        '</small><br>' +
        '<textarea id="another" placeholder="' +
        wgULS('其他要说明的，没有请留空', '其他要說明的，沒有請留空') +
        '" style="width:100%"></textarea><br>' +
        '<div style="color:gray;font-size:75%;margin:1.2rem 0">Powerd by <a target="_blank" htarget="_blank" href="https://community.fandom.com/zh/wiki/MediaWiki:Gadget-WikiAdoptionTool.js">Wiki Adoption Tool</a> | 作者：<a target="_blank" href="/zh/wiki/User:机智的小鱼君">机智的小鱼君</a></div>'
    )

    // 创建模态框
    var $modal = ssi_modal.createObject({
      center: 1
    })
    // 初始化
    $modal.init()
    // 配置
    $modal.setTitle(modalTitle)
    $modal.setContent(modalContent)
    $modal.setOptions('sizeClass', 'small')
    // 按钮
    $modal.setButtons([
      {
        side: 'left',
        label: '提交',
        className: 'btn btn-primary',
        method: function(_, modal) {
          makeSubmit(modalContent)
        }
      },
      {
        label: '取消',
        className: 'btn btn-danger',
        method: function(_, modal) {
          modal.close()
        }
      }
    ])
    // 防止误关闭
    $modal.setOptions('outSideClose', false)
    $modal.setOptions('beforeClose', function() {
      ssi_modal.confirm(
        {
          title: wgULS('确定要放弃吗？', '確定要放棄嗎？'),
          content: '已填写的内容不会被保存！',
          center: 1,
          okBtn: {
            className: 'btn'
          },
          cancelBtn: {
            className: 'btn'
          }
        },
        function(ret) {
          if (ret) {
            $modal.setOptions('beforeClose', '')
            $modal.close()
          }
        }
      )
      return false
    })
    // 走你！
    $modal.show()
  }

  function makeSubmit(ctx) {
    //变量
    var $this = $(ctx)

    // 缓存并规范参数
    var answer = {}
    $.each(
      [
        'wikiName',
        'wikiUrl',
        'wikiLang',
        'lastSysop',
        'editCounts',
        'editTime',
        'another'
      ],
      function(index, item) {
        var value = $this.find('#' + item).val() || ''
        if (typeof value === 'string') value = value.trim()
        answer[item] = value
      }
    )

    // 阻止不合格的内容
    if (
      !answer.wikiName ||
      !answer.wikiUrl ||
      !answer.lastSysop ||
      !answer.editCounts ||
      !answer.editTime ||
      /^[a-zA-Z0-9\-\_]+$/g.test(wikiUrl) // URL 不能包含奇怪的字符
    ) {
      ssi_modal.dialog({
        center: 1,
        content: wgULS(
          '还有项目未正确填写哦，です～',
          '還有項目未正確填寫哦，です～'
        ),
        okBtn: {
          label: '好的',
          className: 'btn btn-single'
        }
      })
      return false
    }

    // 调整URL
    answer.fullUrl = 'https://' + answer.wikiUrl + '.fandom.com'
    if (answer.wikiLang) answer.fullUrl += '/' + answer.wikiLang
    answer.fullUrl += '/wiki/'

    // 创建覆盖层
    var progress = ssi_modal.createObject({ center: 1 }).init()
    progress.show()
    progress.setTitle('正在提交')
    progress.setContent('(这是一个进度条，转啊转……)')
    progress.setOptions('outSideClose', false)
    progress.get$icons().hide()

    // 提交编辑！
    $.post(mw.util.wikiScript('api'), {
      format: 'json',
      errorformat: 'plaintext',
      action: 'edit',
      token: mw.user.tokens.get('csrfToken'),
      createonly: 'true',
      title: '领养:' + answer.wikiName,
      summary:
        '领养申请:' +
        answer.wikiName +
        ' // Powered by [[MediaWiki:Gadget-WikiAdoptionTool.js|Wiki Adoption Tool]]',
      text:
        '{{Wiki Adoption\n|wikiurl=' +
        answer.fullUrl +
        '\n|editnumber=' +
        answer.editCounts +
        '\n|edittime=' +
        answer.editTime +
        '\n|lastsysop=' +
        answer.lastSysop +
        '\n|another=' +
        answer.another +
        '\n|username=' +
        conf.wgUserName +
        '\n|usersign=~~' +
        '~~\n}}\n\n== 领养状态 ==\n{{领养状态\n|待处理\n|说明=\n|处理人=\n}}'
    }).then(
      // 干得漂亮
      function(data) {
        if (data.errors && data.errors.length > 0) {
          progress.close()
          var code = data.errors[0].code
          var desc = data.errors[0]['*']

          switch (code) {
            case 'articleexists':
              ssi_modal.dialog({
                center: 1,
                title: wgULS('提交失败', '提交失敗'),
                content: wgULS(
                  '页面已存在，请尝试在页面名后添加数字，例如：' +
                    answer.wikiName +
                    '(1)',
                  '頁面已存在，請嘗試在頁面名稱後加入數字，例如：' +
                    answer.wikiName +
                    '(1)'
                )
              })
              break
            default:
              ssi_modal.dialog({
                center: 1,
                title: wgULS('提交失败', '提交失敗'),
                content: desc
              })
              break
          }
        } else {
          // $('#adopt-tool-popup-cancel, #adopt-tool-popup-submit').hide()
          // new BannerNotification(
          //   wgULS('提交成功！正在跳转页面……', '提交成功！正在跳轉頁面……'),
          //   'confirm'
          // ).show()
          //打开填写的页面
          progress.setTitle('提交成功！')
          progress.setContent(wgULS('正在跳转页面……', '正在跳轉頁面……'))
          setTimeout(function() {
            window.location.href = mw.util.getUrl('领养:' + answer.wikiName, {
              newrequest: 1
            })
          }, 500)
        }
      },
      // 哎呀糟糕
      function(error) {
        // 提交失败了之类的……
        progress.close()
        ssi_modal.dialog({
          center: 1,
          title: wgULS('提交失败', '提交失敗'),
          content: error
        })
      }
    )
  }
})();