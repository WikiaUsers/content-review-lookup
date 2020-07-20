/**
 * 领养社区申请表-插件 (Wiki Adoption Tool)
 * 作者：机智的小鱼君
 * 日志：
 **2018年5月7日 (一) 04:23 (UTC): post到common.js测试效果
 **2018年5月8日 (二) 02:29 (UTC): 正在测试monobook的支持 ×
 **2018年5月9日 (三) 06:46 (UTC): 增加取消功能，是的，终于可以取消了，妈妈再也不用担心我手滑了
 **2018年5月9日 (三) 09:21 (UTC): 成功后提示并打开页面，非常厉害吧
 **2018年5月10日 (四) 10:33 (UTC): 允许中途取消，妈妈再也不用担心我手滑了还要点一堆取消了
 **2018年12月14日 (五) 06:36 (UTC): 全面升级为表单
 **2018年12月14日 (五) 07:03 (UTC): 在特殊页面增加表单 ×
 **2018年12月21日 (五) 17:55 (UTC): 更新url过滤器 ×
 **2019年2月28日 (四) 07:39 (UTC): 重写加载方式为oasis弹窗
 **2019年3月1日 (五) 11:31 (UTC): 响应式设计
 **2019年3月1日 (五) 13:34 (UTC): 重写过滤器，修复了“提交”按钮的事件处理器绑定BUG
 **2020年1月4日 (六) 09:09 (UTC): 由 Winston Sung 加入繁簡與地區詞轉換功能
 **2020年1月4日 (六) 10:25 (UTC)：Fandomlized
 **2020年1月7日 (二) 08:55 (UTC): 將語言代碼欄位從輸入文字改為下拉選單
 **2020年1月7日 (二) 17:56 (UTC): 新增过滤器，阻止非法字符
 **/

/* 繁簡與地區詞轉換：MediaWiki:Gadget-site-lib.js */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
  var ret = {
    'zh': zh || hans || hant || tw || cn || hk || sg || mo || my,
    'zh-hans': hans || cn || sg || my,
    'zh-hant': hant || tw || hk || mo,
    'zh-cn': cn || hans || sg || my,
    'zh-sg': sg || hans || cn || my,
    'zh-tw': tw || hant || hk || mo,
    'zh-hk': hk || hant || mo || tw,
    'zh-mo': mo || hant || hk || tw
  }
  return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; //保證每一語言有值
}

window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
  return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
  return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.importScriptCallback = function (page, ready) {
  importScriptURICallback(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
};

window.importScriptURICallback = jQuery.getScript;

/* 領養表單 */
$(function () {
  //表格内容
  var adoptform = '<div id="adopt-form">' +
    '<h2>' + wgULS('社区名称', '社區名稱') + '*</h2>' +
    '<small>' + wgULS('要领养社区的名称', '要領養社區的名稱') + '</small><br>' +
    '<input id="wikiname" placeholder="鱼香肉丝wiki"></input>' +
    '<h2>' + wgULS('社区域名', '社區域名') + '*</h2>' +
    '<small>' + wgULS('只写子域名不要填完整网址，一般中文社区语言路径为zh，可以不用修改', '只寫子域名不要填完整網址，一般中文社區語言路徑為zh，可以不用修改') + '</small><br>' +
    '<span>https://<input placeholder="example" id="wikiurl" style="width:5em"></input>.fandom.com/' +
    '<select id="wikilang" style="width:5em;height:20px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box">' +
    '<option value="">(' + wgULS('留空', '留空') + ')</option>' +
    '<option value="lzh">lzh</option>' +
    '<option value="nan">nan</option>' +
    '<option value="yue">yue</option>' +
    '<option value="zh" selected>zh</option>' +
    '<option value="zh-tw">zh-tw</option>' +
    '<option value="zh-hk">zh-hk</option>' +
    '<option value="more-lang">其他</option>' +
    '</select></span>' +
    '<h2>' + wgULS('编辑次数', '編輯次數') + '*</h2>' +
    '<small>' + wgULS('您在此社区的编辑次数', '您在此社區的編輯次數') + '</small><br>' +
    '<input id="editnumber" placeholder="xx次"></input>' +
    '<h2>' + wgULS('编辑天数', '編輯天數') + '*</h2>' +
    '<small>' + wgULS('您已经在此社区编辑多长时间了，我们建议您至少连续编辑7天。注意：我们会确认您填写的天数是否正确', '您已經在此社區編輯多長時間了，我們建議您至少連續編輯7天。注意：我們會確認您填寫的天數是否正確') + '</small><br>' +
    '<input id="edittime" placeholder="xx天"></input>' +
    '<h2>' + wgULS('最后操作', '最後操作') + '*</h2>' +
    '<small>' + wgULS('最后有过操作的管理员，最后一次操作是什么时候', '最後有過操作的管理員，最後一次操作是什麼時候') + '</small><br>' +
    '<input id="lastsysop" placeholder="xx天前/xxxx年x月x日"></input>' +
    '<h2>其他留言</h2>' +
    '<small>' + wgULS('其他要说明的，例如您为什么觉得自己可以胜任新管理员的职位。若wiki存在其他的活跃编辑者，你们之间是否有过交流？留下你们之间交流的链接。', '其他要說明的，例如您為什麽覺得自己可以勝任新管理員的職位。若wiki存在其他的活躍編輯者，你們之間是否有過交流？留下你們之間交流的連結。') + '</small><br>' +
    '<textarea id="another" placeholder="' + wgULS('其他要说明的，没有请留空', '其他要說明的，沒有請留空') + '" style="width:100%"></textarea><br>' +
    '<span style="color:gray;font-size:75%">Powerd by <a target="_blank" href="/zh/wiki/Project:技术备份/领养表单">Wiki Adoption Tool</a><br>作者：<a target="_blank" href="/zh/wiki/User:机智的小鱼君">过气的小鱼君</a> | ' + wgULS('来自', '來自') + '：<a target="_blank" href="https://community.fandom.com/zh/wiki/MediaWiki:Adopt-tool.js">社区中心</a></span>' +
    '</div>';
  //添加申请按钮
  var adoptstart = '<a href="#adopt-tool-popup" class="adopt-btn" >' +
    '<span class="wds-is-secondary wds-button wds-is-squished" style="cursor:pointer;">' + wgULS('填写领养表格', '填寫領養表單') + '</span>' +
    '</a>';
  if (wgNamespaceNumber == '112' || wgPageName == 'MediaWiki:Adopt-tool.js') {
    //添加按钮
    $('.page-header__contribution-buttons').append(adoptstart);
    //提示已收到申请
    if (mw.util.getParamValue('newrequest', location.href) === '1') {
      new BannerNotification(wgULS('我们已经收到了您的领养申请，请关注此页面并耐心等待工作人员审核，谢谢！', '我們已經收到了您的領養申請，請關注此頁面並耐心等候工作人員審核，謝謝!'), 'confirm').show();
    }
  }
  $('.adopt-wiki').html(adoptstart);
  //弹窗设置
  var CustomModalHeader = wgULS('领养wiki申请表', '領養wiki申請表');
  var CustomModalBody = adoptform;
  //调出弹窗
  $('.adopt-btn').click(function () {
    //拒绝未登录用户
    if (wgUserName == null) {
      alert(wgULS('对不起，请登录后再试', '對不起，請登入後再試'));
      return;
    }
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
              $('#adopt-tool-popup').closeModal();
            }
          },
          {
            defaultButton: true,
            id: 'adopt-tool-popup-submit',
            message: '提交'
          },
        ]
      });
      //解绑原生背景的函数防止误触
      $('.blackout').unbind();
      //移除原生关闭按钮
      $('#adopt-tool-popup').prepend('<button id="adopt-tool-popup-close" class="wikia-chiclet-button">' +
        '<img src="https://slot1-images.wikia.nocookie.net/__cb8150048150012/common/skins/oasis/images/icon_close.png">' +
        '</button>'
      );
      $('#adopt-tool-popup-close').click(function () {
        $('#adopt-tool-popup').closeModal();
      });
      //针对手机或者低分辨率屏幕调整
      if ($(window).width() < 850) {
        $('#adopt-tool-popup').css({
          'width': $(document).width() * 0.8,
          'height': 'auto'
        }).offset({
          left: $(document).width() / 10
        });
      }

      //更多语言
      $('#adopt-form select#wikilang').change(function () {
        if ($(this).val() === 'more-lang') {
          $(this).replaceWith('<input placeholder="lang" id="wikilang" style="width:5em"></input>');
        }
      });

      //开始创建页面
      $('#adopt-tool-popup #adopt-tool-popup-submit').click(function () {
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
        if (wikiname === '' || $('#adopt-form #wikiurl').val() === '' || $('#adopt-form #wikiurl').val() === 'example' || wikiurl === '' || lastsysop === '' || edittime === '' || editnumber === '') {
          //必填项目未填写完
          new BannerNotification(wgULS('带星号（*）的项目请认真填写哦，です～', '帶星號（*）的項目請填寫哦，です～'), 'warn').show();
          return;
        } else if (/(\/|@|#|\$|%|\?|&|\*|\.)/ig.test(wikilang) || /(\/|@|#|\$|%|\?|&|\*|\.)/ig.test($('#adopt-form #wikiurl').val())) {
          //非法字符
          new BannerNotification(wgULS('警告，wiki域名或语言代码含有非法字符！', '警告，wiki域名或語言代碼含有非法字符！'), 'warn').show();
          return;
        }
        //无误，开始提交编辑
        var postJson = {
          action: 'edit',
          createonly: 'true',
          title: '领养:' + wikiname,
          summary: wgULS('领养申请:', '領養申請：') + wikiname + ' //Powered by [[MediaWiki:Adopt-tool.js|Wiki Adoption Tool]]',
          text: '{{Wiki Adoption\n|wikiurl=' + wikiurl + '\n|editnumber=' + editnumber + '\n|edittime=' + edittime + '\n|lastsysop=' + lastsysop + '\n|another=' + another + '\n|username=' + wgUserName + '\n|usersign=~~' + '~~\n}}\n\n==领养状态==\n{{领养状态\n|待处理\n|说明=\n|处理人=\n}}', //页面内容
          token: mw.user.tokens.get('editToken'),
          format: 'json',
          errorformat: 'plaintext'
        }
        if (typeof(console.table) !== 'undefined') {
          console.table(postJson);
        }
        new mw.Api().post(postJson).done(function (data) {
          if (typeof (data.error) === 'undefined') {
            $('#adopt-tool-popup-cancel, #adopt-tool-popup-submit, #adopt-tool-popup-close').hide();
            new BannerNotification(wgULS('提交成功！正在跳转页面……', '提交成功！正在跳轉頁面……'), 'confirm').show();
            setTimeout(function () { window.location.href = mw.config.get('wgArticlePath').replace('$1', '领养:' + wikiname) + '?newrequest=1'; }, 3000); //打开填写的页面
          } else if (data.error.code === 'articleexists') {
            new BannerNotification(wgULS('提交失败！页面已存在，点击查看：<a href="/zh/领养:' + wikiname + '" target="_blank">领养:' + wikiname + '</a>。若您一定要提交表格，请尝试在页面名后添加数字，例如：' + wikiname + ' (1)', '提交失敗！頁面已存在，點擊查看：<a href="/zh/领养:' + wikiname + '" target="_blank">領養:' + wikiname + '</a>。若您一定要提交表單，請嘗試在頁面名稱後加入數字，例如：' + wikiname + ' (1)'), 'warn').show();
          }
        }).fail(function (errorCode, feedback, errorThrown) {
          new BannerNotification(wgULS('提交时遇到问题：', '提交時遇到問題：') + '<br/><span style="font-size:small">' + errorThrown.errors[0]['*'] + '(<code>' + errorThrown.errors[0]['code'] + '</code>)</span>', 'error').show();
        });
      });
    }
  });
});