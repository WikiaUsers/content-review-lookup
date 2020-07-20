/*<nowiki>
To dev wiki users :
This javascript is from https://community.fandom.com/zh/wiki/MediaWiki:Adopt-tool.js
Initially, it was only used to help Chinese users submit adoption applications.
But as an author, I'm not very good at javascript.
The script wasn't written very well.I hope more experienced people can help me improve it.
If you have a better idea, no need leave me a message, just edit it directly.
If you'd like to, I'd be very, very grateful to you!
*/
/*******************************************************
* 领养社区申请表-插件 (Adopt wiki tool)
* 作者：机智的小鱼君
* 日志：
**2018年5月7日 (一) 04:23 (UTC)：post到common.js测试效果
**2018年5月8日 (二) 02:29 (UTC)：正在测试monobook的支持 ❌
**2018年5月9日 (三) 06:46 (UTC)：增加取消功能，是的，终于可以取消了，妈妈再也不用担心我手滑了
**2018年5月9日 (三) 09:21 (UTC)：成功后提示并打开页面，非常厉害吧
**2018年5月10日 (四) 10:33 (UTC)：允许中途取消，妈妈再也不用担心我手滑了还要点一堆取消了
**2018年12月14日 (五) 06:36 (UTC)：全面升级为表单
**2018年12月14日 (五) 07:03 (UTC)：在特殊页面增加表单 ❌
**2018年12月21日 (五) 17:55 (UTC)：更新url过滤器 ❌
**2019年2月28日 (四) 07:39 (UTC)：重写加载方式为oasis弹窗
**2019年3月1日 (五) 11:31 (UTC)：响应式设计
**2019年3月1日 (五) 13:34 (UTC)：重写过滤器，修复了“提交”按钮的事件处理器绑定BUG
*******************************************************/
$(function () {
  //表格内容
  var adoptform = '<div id="adopt-form">' +
  '<h2>社区名称</h2><small>要领养社区的名称</small><br><input id="wikiname" placeholder="鱼香肉丝wiki"></input>' +
  '<h2>社区域名</h2><small>只写子域名不要填完整网址，一般中文社区语言路径为zh，可以不用修改</small><br><span>https://<input placeholder="example" value="example" id="wikiurl" style="width:5em"></input>.fandom.com/<input placeholder="zh" value="zh" id="wikilang" style="width:2em"></input></span>' +
  '<h2>编辑次数</h2><small>您在此社区的编辑次数</small><br><input id="editnumber" placeholder="xx次"></input>' +
  '<h2>编辑天数</h2><small>您已经在此社区编辑多长时间了</small><br><input id="edittime" placeholder="xx天"></input>' +
  '<h2>最后操作</h2><small>最后有过操作的管理员，最后一次操作是什么时候</small><br><input id="lastsysop" placeholder="xx天前"></input>' +
  '<h2>其他留言</h2><textarea id="another" placeholder="其他要说明的，没有请留空" style="width:100%"></textarea><br>' +
  '<span id="submit-note"><span style="color:red">还有项目未正确填写哦，DESU～</span></span><br><br>' +
  '<span style="color:gray;font-size:75%">Powerd by <a target="_blank" href="/wiki/Project:技术备份/领养表单">Adopt wiki tool</a><br>作者：<a target="_blank" href="/wiki/User:机智的小鱼君">过气的小鱼君</a> | 来自：<a target="_blank" href="http://zh.c.wikia.com/wiki/MediaWiki:Adopt-tool.js">社区中心</a></span>' +
  '</div>';
  //添加申请按钮
  var adoptstart = '<a href="#adopt-tool-popup" class="adopt-btn" >' +
  '<span class="wds-is-secondary wds-button wds-is-squished" style="cursor:pointer;">填写领养表格</span>' +
  '</a>';
  if (wgNamespaceNumber == '112' || wgPageName == 'MediaWiki:Adopt-tool.js' || wgPageName == 'MediaWiki:AdoptWikiTool/code.js') {
    $('.page-header__contribution-buttons').append(adoptstart);
  }
  $('.adopt-wiki').html(adoptstart);
  //弹窗设置
  var CustomModalHeader = '领养wiki申请表';
  var CustomModalBody = adoptform;
  //调出弹窗
  $('.adopt-btn').click(function () {
    //拒绝重复按键
    if ($('#adopt-form').length > 0) {
      location.href = '#adopt-tool-popup'
    } else {
      //变量
      var wikiname,
      wikiurl,
      wikilang,
      lastsysop,
      editnumber,
      edittime,
      another;
      $.showCustomModal(CustomModalHeader, CustomModalBody, {
        id: 'adopt-tool-popup',
        width: 600,
        buttons: [
          {
            id: 'adopt-tool-popup-cancel',
            message: '取消',
            handler: function () {
              var cancelconfirm = confirm('确定要放弃吗？');
              if (cancelconfirm) {
                $('#adopt-tool-popup').closeModal();
                $('#modal-bg').remove();
              }
            }
          },
          {
            defaultButton: true,
            id: 'adopt-tool-popup-submit',
            message: '提交'
          },
        ]
      });
      //移除原生背景，新增蒙版
      $('.blackout').remove();
      $('body').prepend($('<div>').css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '5000200',
        'background': 'rgba(255,255,255,0.7)'
      }).attr('id', 'modal-bg')
      );
      //移除原生关闭按钮
      $('#adopt-tool-popup').prepend('<button id="adopt-tool-popup-close" class="wikia-chiclet-button">' +
      '<img src="https://slot1-images.wikia.nocookie.net/__cb8150048150012/common/skins/oasis/images/icon_close.png">' +
      '</button>'
      );
      $('#adopt-tool-popup-close').click(function () {
        var cancelconfirm = confirm('确定要放弃吗？');
        if (cancelconfirm) {
          $('#adopt-tool-popup').closeModal();
          $('#modal-bg').remove();
        }
      });
      //针对手机或者低分辨率屏幕调整
      if ($(window).width() < 850) {
        $('#adopt-tool-popup').css({
          'width': $(document).width() * 0.8,
          'height': 'auto'
        }).offset({
          left: $(document).width() / 10
        });
      };
      //开始监控表单
      $('#adopt-tool-popup-submit').unbind().attr('disabled', '');
      $('#adopt-form').keyup(function () {
        wikiname = $('#adopt-form #wikiname').val();
        wikilang = $('#adopt-form #wikilang').val();
        if (wikilang == '') {
          wikiurl = 'https://' + $('#adopt-form #wikiurl').val() + '.fandom.com';
        } else {
          wikiurl = 'https://' + $('#adopt-form #wikiurl').val() + '.fandom.com/' + wikilang;
        }
        edittime = $('#adopt-form #edittime').val();
        editnumber = $('#adopt-form #editnumber').val();
        lastsysop = $('#adopt-form #lastsysop').val();
        another = $('#adopt-form #another').val();
        //过滤器
        if (wikiname === '' || wikiurl === '' || wikiurl === 'https://example.fandom.com/zh' || lastsysop === '' || edittime === '' || editnumber === '') {
          $('#adopt-tool-popup-submit').unbind().attr('disabled', '');
          $('#adopt-form #submit-note').html('<span style="color:red">还有项目未正确填写哦，DESU～</span>');
        } else {
          $('#adopt-form #submit-note').html('<span style="color:green">确认信息无误就可以选择提交啦，DESU！</span>');
          //提交数据，开始创建页面
          $('#adopt-tool-popup #adopt-tool-popup-submit').attr('disabled', false).click(function () {
            new mw.Api().post({
              action: 'edit',
              createonly: 'true',
              title: '领养:' + wikiname,
              summary: '领养申请:' + wikiname + '//Powered by [[MediaWiki:Adopt-tool.js|Adopt wiki tool]]',
              text: '<div class="forumheader">[[领养维基申請頁面]] <b>→</b> {{PAGENAME}}</div>\n\n==申请信息==\n<b>请输入这个维基的链接：</b>' + wikiurl + '\n\n<b>请问您在这个维基上编辑了多少次？</b>' + editnumber + '\n\n<b>请问您在这个维基上编辑了多少天？</b>' + edittime + '\n\n<b>在特殊页面 → [' + wikiurl + '/Special:ListUsers 用户列表] 中，距离最近一次的管理员编辑是什么时候？</b>' + lastsysop + '\n\n<b>其他信息：</b>' + another + '\n\n<b>申请者：</b>~~' + '~~ \n\n<b>申请者查核:</b>{{用户信息查询|user=' + wgUserName + '|url=' + wikiurl + '}}\n\n==领养状态==\n:{{领养状态|待处理|说明=|处理人=}}', //页面内容
              token: mw.user.tokens.get('editToken')
            }).done(function () {
              alert('提交成功DESU！\n请等待FANDOM员工处理哦DESU！'); //成功后提示
              window.location.href = '/wiki/领养:' + wikiname; //打开填写的页面
            }).fail(function () {
              alert('提交失败！可能原因:\n 1.您未登录账号或您还不是自动确认用户。这种情况下您将没有资格领养社区\n 2.您创建的页面已存在。请尝试在页面名后添加数字，例如:' + wikiname + '(1)\n 3.网络出现问题或脚本出现问题。请使用传统方法手动创建页面');
            });
          });
        }
      });
    }
  });
});
//import css
importArticles({
    type: 'style',
    articles: [
        'u:dev:AdoptWikiTool/code.css'
    ]
});