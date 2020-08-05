/***** 그림 정보 틀을 자동으로 불러옴 ********
 **  from commons.wikimedia.org
 *  Maintainers: [[User:Yonidebest]], [[User:Dschwen]]
 *  [[사용자:Kwj2772]]가 수정
 *  JSconfig items: bool 'loadAutoInformationTemplate'
 *                       (true=enabled (default), false=disabled)
 * JSConfig를 사용하지 않도록 수정함. --[[사용자:Klutzy|klutzy]] ([[사용자토론:Klutzy|토론]]) 2009년 9월 27일 (일) 20:32 (KST)
 * '그림 정보'를 '파일 정보'로 수정함. --[[User:Park4223|<span style="color:#994f00">Park4223</span>]] <small>([[User Talk:Park4223|<span style="color:#9acd32">토론</span>]] / [[Special:Contributions/Park4223|<span style="color:#32C6A6">기여]]</span><small>)</small></small> 2010년 4월 9일 (금) 00:12 (KST)
 ****/
 
function loadAutoInformationTemplate()
{
 if(document.location.href.toString().match("&wpDestFile=")) // 이미 존재하는 파일을 업로드할 경우 무시
  return;
 
 uploadDescription = document.getElementById('wpUploadDescription');
 var tripleTilda = '~~' + '~';
 var doubleBracket = '{' + '{';
 if(uploadDescription != null && uploadDescription.value == '' ) {
  switch(wgUserLanguage) {
   case "ownwork":
    uploadDescription.value = doubleBracket + '파일 정보\n|설명=\n|출처=자작\n|날짜=\n|만든이= [[사용자:' + wgUserName + '|' + wgUserName + ']]\n|저작권=\n|기타=\n}}\n';
    break;
    default:
    uploadDescription.value = doubleBracket + '파일 정보\n|설명=\n|출처=\n|날짜=\n|만든이=\n|저작권=\n|기타=\n}}\n';
    break;
  }
 
 }
}
addOnloadHook(loadAutoInformationTemplate);