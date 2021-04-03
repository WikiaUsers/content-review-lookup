/* 分享按钮 */
$('.page-header__title').after('<div id="share-this-page">' +
'<span class="wds-is-secondary wds-button start-a-chat-button" id="shareQQ-btn">分享到QQ</span>&nbsp;' +
'<span class="wds-is-secondary wds-button start-a-chat-button" id="purge-btn" title="强刷新">刷新页面</span>' +
'</div>'
);
/* Aya */
$('#purge-btn').on('click', function () {
  location.href = 'https://terraria-calamity-mod.fandom.com/zh/wiki/' + wgPageName + '?action=purge';
});
/* Awa */
$('#shareQQ-btn').click(function () {
  //ZONE
  var zoneurl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://terraria-calamity-mod.fandom.com/zh/wiki/' + wgPageName + '&sharesource=qzone&title=【' + wgPageName + '】-我在灾基看夏沫酱写的页面';
  //FRIEND
  var friendurl = 'http://connect.qq.com/widget/shareqq/index.html?url=https://terraria-calamity-mod.fandom.com/zh/wiki/' + wgPageName + '&sharesource=qzone&title=【' + wgPageName + '】-我在灾基看夏沫酱写的页面';
  $.showCustomModal('分享到QQ',
  '<center>' +
  '<a href="' + friendurl + '" target="_blank"><img src="https://vignette.wikia.nocookie.net/dragonfish/images/1/16/Qq-logo.png/revision/latest?cb=20190227185424&format=original&path-prefix=zh" style="height:50px;width:50px;border-radius:50%;border:1px solid gray;"></a>' +
  '<a href="' + zoneurl + '" target="_blank"><img style="height:50px;width:50px;border-radius:50%;border:1px solid orange;" src="https://vignette.wikia.nocookie.net/dragonfish/images/0/08/Qzone-logo.png/revision/latest?cb=20190227185423&format=original&path-prefix=zh"></a>' +
  '<br clear="all">' +
  '<a href="' + friendurl + '" target="_blank">分享给好友</a> | <a href="' + zoneurl + '" target="_blank">分享到空间</a>' +
  '</center></div>'
  );
});
;
/* GL */
$(function () {
  var DialogId,
  BtnId,
  NextId,
  LastId;
  $('.op').html(function () {
    DialogId = this.dataset.dialogid;
    if (DialogId != '1') {
      $(this).hide();
    }
  });
  $('.op-next-c').click(function () {
    BtnId = this.dataset.btnid;
    LastId = this.dataset.lastid;
    if (LastId === 'last') {
      $('#game-selector').show(300);
      $(this).css('color', 'black');
    } else {
      BtnId = parseInt(BtnId);
      NextId = ++BtnId;
      $(this).css('color', 'black');
      $('.op[data-dialogid=' + NextId + ']').show(300);
    }
  });
});
/** epbureau **/
$('.GameSaver').html(function(){
  var game,time,user,title,page;
  if ( wgUserName =='' || wgUserName == null ) {
    Gap = true ;
  } else {
    user = 'User:'+wgUserName ;
}
  game = this.dataset.game;
  time = this.dataset.time;
  title = this.dataset.title;
  page = this.dataset.page;
  $(this).html('<input type=button class="save" value="保存游戏"/>&nbsp;&nbsp;<input type=button class="load" value="读取存档"/>');
  if ( Gap ) {
    $('.GameSaver .load').click(function(){alert('你没登录Fandom读个锤子档啊');});
  } else {
    $('.GameSaver .load').click(function(){location.href='/wiki/'+user+'/gamesave/'+game});
  }
  $('.GameSaver .save').click(function() {
    if ( Gap ) {
      $('.GameSaver .save').unbind().attr({'value':'不登录Fandom还想存档？','disabled':''});
      return;
    }
    var note = prompt('存档提示','无');
    if (note === null||note === 'null') {
      return;
    }
    $('.GameSaver .save').attr('value','少女祈祷中...');
    new mw.Api().post({
      action: 'edit',
      title: user+'/gamesave/'+game,
      summary: '\/*' + title+' | '+ time +'*\/新增游戏'+ game +'存档',
      appendtext: '\n== '+ title +' | '+ time +' ==\n*游戏：[[Game:'+ game +']]\n*时间：'+ time +'\n*[['+ page +'|继续游戏]]\n*备注：'+ note +'\n\n',
      token: mw.user.tokens.get('editToken')
    })
    .done(function(){
      $('.GameSaver .save').unbind().attr({'value':'存档完毕！','disabled':''});
    })
    .fail(function(){
      alert('满身疮痍！\n尝试下面的可能：\n1)网线被隙间了\n2)还没有登录？\n3)刷新页面再续关');
      $('.GameSaver .save').attr('value','重试');
    });
  });
});
/*AO*/
         window.onload = function(){
/*文文的制裁*/
             document.onkeydown = function (){
                 var e = window.event || arguments[0];
                 if(e.keyCode == 123){
                     return false;
                 }else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)){
                     return false;
                 }else if((e.shiftKey) && (e.keyCode == 121)){
                     return false;
                 }else if((e.ctrlKey) && (e.keyCode == 85)){
                     return false;
                 }
             };
         }