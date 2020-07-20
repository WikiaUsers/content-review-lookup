/*****************************************
* 个人沙盒顶部提示
* 作者：机智的小鱼君
* CC BY-SA 3.0
* 部分修改：（只会复制粘贴的→）铁桶
* Update Log
** 2019年2月14日 (四) 16:04 (UTC) : Alpha test
** 2019年2月16日 (星期六) 14:40 (UTC) : i18n test
** 2019年7月16日 (星期二) 15:43 (UTC) : Fix Bug（铁桶）
******************************************/
$(function () {
 
//本人沙盒提示
  var UserSandboxHeaderSelf = 
    '<table style="font-size: 95%; width: 80%; margin: 0 auto; border: 1px #aaa solid; border-collapse: collapse; background-color: #eee;&nbsp;; border-left: 10px solid #b22222">' +
    '<tbody><tr>' +
    '<td style="width: 60px; padding: 2px 0px 2px 0.5em; text-align: center;"> <a href="https://vignette.wikia.nocookie.net/polandball/images/a/ab/%E6%B3%A2%E5%85%B0%E7%90%83wikia%E6%8F%90%E7%A4%BA%E6%B2%99%E7%9B%92.png/revision/latest?cb=20190716070851&amp;path-prefix=zh" class="image image-thumbnail"><img src="https://vignette.wikia.nocookie.net/polandball/images/a/ab/%E6%B3%A2%E5%85%B0%E7%90%83wikia%E6%8F%90%E7%A4%BA%E6%B2%99%E7%9B%92.png/revision/latest/scale-to-width-down/60?cb=20190716070851&amp;path-prefix=zh" alt="波兰球wikia提示"width="60" height="60"></a>' +
    '</td><td style="padding: 0.25em 0.5em; color:#000;"> <span style="font-weight:bold;font-size:120%">欢迎来到您的用户沙盒</span>' +
    '<div style="font-size: smaller; margin-top:0.5em; margin-left:0.8em;">' +
    '<p>您可以在这里测试一些代码，或者暂时保存一些内容，请注意<b>不允许出现违反<a href="/zh/wiki/Project:规定" title="规定页面">规定</a>的内容</b>' +
    '</p>' +
    '</div>' +
    '</td></tr></tbody></table>';
 
//他人沙盒警告
  var UserSandboxHeaderNormal = 
    '<table style="font-size: 95%; width: 80%; margin: 0 auto; border: 1px #aaa solid; border-collapse: collapse; background-color: #eee;&nbsp;; border-left: 10px solid #b22222">' +
    '<tbody><tr>' +
    '<td style="width: 60px; padding: 2px 0px 2px 0.5em; text-align: center;"> <a href="https://vignette.wikia.nocookie.net/polandball/images/a/ab/%E6%B3%A2%E5%85%B0%E7%90%83wikia%E6%8F%90%E7%A4%BA%E6%B2%99%E7%9B%92.png/revision/latest?cb=20190716070851&amp;path-prefix=zh" class="image image-thumbnail"><img src="https://vignette.wikia.nocookie.net/polandball/images/a/ab/%E6%B3%A2%E5%85%B0%E7%90%83wikia%E6%8F%90%E7%A4%BA%E6%B2%99%E7%9B%92.png/revision/latest/scale-to-width-down/60?cb=20190716070851&amp;path-prefix=zh" alt="波兰球wikia提示"width="60" height="60"></a>' +
    '</td><td style="padding: 0.25em 0.5em; color:#000;"> <span style="font-weight:bold;font-size:120%">这里是其他用户的沙盒</span>' +
    '<div style="font-size: smaller; margin-top:0.5em; margin-left:0.8em;">' +
    '<p>您不可以未经沙盒主人许可修改这个沙盒的内容。<br />您可以请前往<b>您自己的沙盒</b>（<a href="/zh/wiki/Special:Mypage/sandbox" title="您的个人sandbox">sandbox</a> • <a href="/zh/wiki/Special:Mypage/Sandbox" title="您的个人Sandbox">Sandbox</a> • <a href="/zh/wiki/Special:Mypage/沙盒" title="您的个人沙盒">沙盒</a>）</b>' +
    '</p>' +
    '</div>' +
    '</td></tr></tbody></table>';
 
//添加头部
  if (wgNamespaceNumber == '2' && wgPageName == 'User:' + wgUserName + '/sandbox' || wgPageName == 'User:' + wgUserName + '/沙盒' || wgPageName == 'User:' + wgUserName + '/Sandbox' ) {
    //本人
    $('#mw-content-text').prepend(UserSandboxHeaderSelf);
  } else if (wgNamespaceNumber == '2' && wgPageName.substring(wgPageName.length - 8) == '/sandbox' || wgPageName.substring(wgPageName.length - 3) == '/沙盒'  || wgPageName.substring(wgPageName.length - 8) == '/Sandbox' ) {
    //他人
    $('#mw-content-text').prepend(UserSandboxHeaderNormal);
  }
//END
});