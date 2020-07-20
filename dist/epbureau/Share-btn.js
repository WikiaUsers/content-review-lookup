/* 分享按钮 */
$('.page-header__title').after('<div id="share-this-page">' +
'<span class="wds-is-secondary wds-button start-a-chat-button" id="shareQQ-btn">分享到QQ</span>&nbsp;' +
'<span class="wds-is-secondary wds-button start-a-chat-button" id="QR-btn" >分享二维码</span>&nbsp;' +
'<span class="wds-is-secondary wds-button start-a-chat-button" id="purge-btn" title="强刷新(purge)">强刷新页面</span>' +
'</div>'
);
/* 刷新按钮 */
$('#purge-btn').on('click', function () {
  location.href = '/index.php/' + wgPageName + '?action=purge';
});
/* QQ空间 */
$('#shareQQ-btn').click(function () {
  //ZONE
  var zoneurl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://wjghj.fandom.com/wiki/' + wgPageName + '&sharesource=qzone&title=【' + wgPageName + '】-来自万界规划局&summary=快来看看来自粉丝们的故事吧&pics=https://wjghj.cn/images/b/bc/Wiki.png';
  //FRIEND
  var friendurl = 'http://connect.qq.com/widget/shareqq/index.html?url=https://wjghj.fandom.com/wiki/' + wgPageName + '&sharesource=qzone&title=【' + wgPageName + '】-来自万界规划局&summary=快来看看来自粉丝们的故事吧&pics=https://wjghj.cn/images/b/bc/Wiki.png';
  $.showCustomModal('分享到QQ',
  '<center>' +
  '<a href="' + friendurl + '" target="_blank"><img src="https://vignette.wikia.nocookie.net/dragonfish/images/1/16/Qq-logo.png/revision/latest?cb=20190227185424&format=original&path-prefix=zh" style="height:50px;width:50px;border-radius:50%;border:1px solid gray;"></a>' +
  '<a href="' + zoneurl + '" target="_blank"><img style="height:50px;width:50px;border-radius:50%;border:1px solid orange;" src="https://vignette.wikia.nocookie.net/dragonfish/images/0/08/Qzone-logo.png/revision/latest?cb=20190227185423&format=original&path-prefix=zh"></a>' +
  '<br clear="all">' +
  '<a href="' + friendurl + '" target="_blank">分享给好友</a> | <a href="' + zoneurl + '" target="_blank">分享到空间</a>' +
  '</center></div>'
  );
});
/* 二维码 */
$('#QR-btn').click(function () {
  var QRurl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wjghj.fandom.com/wiki/' + wgPageName;
  var QRimg = '<img id="QR-code" src="' + QRurl + '" alt="二维码服务失效！"/>';
  $.showCustomModal('分享QR code',
  '<center>' +
  QRimg +
  '<div>扫描或长按保存，然后分享给你的小伙伴吧！<br/><span style="color:gray;font-size:70%;">你也可以<a href="' + QRurl + '" target="_blank">直接下载</a>二维码</span></div>' +
  '</center>'
  );
});