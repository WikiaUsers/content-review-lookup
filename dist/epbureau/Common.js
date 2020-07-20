/** Site Scripts **/
!(function () { // 匿名函数，防止抑郁

/**
 * ECharts
 * Put ECharts on wiki pages
 * Apache licenses https://www.echartsjs.com
 **/
 
$(function () {
  if ($('.echarts, .ECharts, .Echarts').length > 0) {
    $('body').apend(
      $('<script>',{ src: 'https://cdn.bootcss.com/echarts/4.4.0-rc.1/echarts.min.js' })
      .load(()=>{
        $('.echarts, .ECharts, .Echarts').each(function () {
          var $this = $(this),
            option = eval("(" + $this.text() + ")"),
            echartsElement = 'echartsElement-' + $this.index();
          $this.attr({ 'id': echartsElement });
          echarts.init($('#' + echartsElement)[0]).setOption(option);
        });
      })
    );
  }
});

/** In page dialog **/
$(function () {
  var DialogId,
  BtnId,
  NextId,
  LastId;
  $('.ipd').html(function () {
    DialogId = this.dataset.dialogid;
    if (DialogId != '1') {
      $(this).hide();
    }
  });
  $('.ipd-next-btn').click(function () {
    BtnId = this.dataset.btnid;
    LastId = this.dataset.lastid;
    if (LastId === 'last') {
      $('#game-selector').show(300);
      $(this).css('color', 'green');
    } else {
      BtnId = parseInt(BtnId);
      NextId = ++BtnId;
      $(this).css('color', 'green');
      $('.ipd[data-dialogid=' + NextId + ']').show(300);
    }
  });
});

/** Game saver **/
$('.GameSaver').html(function(){
  var game,time,user,title,page;
  if ( wgUserName =='' || wgUserName == null ) {
    unlogin = true ;
  } else {
    user = 'User:'+wgUserName ;
}
  game = this.dataset.game;
  time = this.dataset.time;
  title = this.dataset.title;
  page = this.dataset.page;
  $(this).html('<input type=button class="save" value="保存游戏"/>&nbsp;&nbsp;<input type=button class="load" value="读取存档"/>');
  if ( unlogin ) {
    $('.GameSaver .load').click(function(){alert('无法读取存档，请登录后再试');});
  } else {
    $('.GameSaver .load').click(function(){location.href='/wiki/'+user+'/gamesave/'+game});
  }
  $('.GameSaver .save').click(function() {
    if ( unlogin ) {
      $('.GameSaver .save').unbind().attr({'value':'存档失败，请登录后再试','disabled':''});
      return;
    }
    var note = prompt('有什么要备注的吗？','无');
    if (note === null||note === 'null') {
      return;
    }
    $('.GameSaver .save').attr('value','SILI努力帮你存档中…');
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
      alert('啊哦，存档失败了！\n1)请检查您的网络连接？\n2)您是否没有登录？\n3)刷新页面再试？');
      $('.GameSaver .save').attr('value','重试');
    });
  });
});

/** RailWAM Config **/
window.railWAM = {
  logPage: 'Project:WAM Log',
  autoLogForUsers: 'Sara Lindery',
  botUsers: 'Sara Lindery'
};

//ALL CLEAR
}());