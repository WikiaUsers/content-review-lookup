/* 此处的JavaScript将在所有用户加载每一个页面时运行。 */
/* 剧透页面的提示信息 */
window.SpoilerAlertJS = {
    question: '此部分内容包含剧透，可能影响您的正常体验，您确定要阅读吗？',
    yes: '确定',
    no: '算了',
    fadeDelay: 1600
}

/* 刷新按钮 
$('.page-header__title').after(
  '<div id="ext-buttons">' +
  '<span class="wds-is-secondary wds-button start-a-chat-button" id="purge-btn" title="强刷新(purge)">强刷新页面</span>' +
  '</div>'
); */
$('#ext-buttons #purge-btn').click(function () {
  var $this = $(this);
  $this.html('正在刷新&nbsp;<img src="https://vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg" style="height:14px;width:auto" />').attr('disabled', 'disabled');
  new mw.Api().post({
    action: 'purge',
    titles: mw.config.get('wgPageName'),
  }).done(function () {
    $this.html('刷新成功!');
    window.location.reload();
  }).fail(function () {
    $this.html('刷新失败，请重试').attr('disabled', false);
  });
});

/* 修复bilibili视频iframe长宽比例 */
$(function(){
  $('.mw-collapsible-toggle').click(function(){
    $('.bili-show').height(function(){
      var $this = $(this);
      return $this.width() / 4 * 3;
    });
  });
});