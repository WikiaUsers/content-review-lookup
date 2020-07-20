/* Any JavaScript here will be loaded for all users on every page load. */
/* This script supports the translator function on zh.asoiaf.wikia.com */
/* data source (MAIN_DICT, etc.) must be present before this script. */
/* @see HELP:翻译姬 for how this script works */
/* This is an original script by http://zh.asoiaf.wikia.com */
var text = "";
var json = "";
var count = 0;
var expanded = false;
/* insert an edit button */
if (wgAction == 'submit' || wgAction == 'edit')  {
    importArticles({
      type: "script",
      articles: [
        "MediaWiki:Common.js/dict",
        "Help:翻译姬/dict",
        "MediaWiki:Common.js/general",
        "MediaWiki:Common.js/redirect"
      ]
    });
  var $save = $('#wpSave');
  var $combo = $('<a id="translate"  style = "width:90px;" href="javascript:Button1_onclick();"  tabindex="2"><span class ="button translate control-button secondary">自动翻译</span></a>')
  .insertAfter($save);

}
/* 自动翻译按钮 click event handler */
function Button1_onclick() {
  translateStart();
}

function zh_en(){
  if ( !MAIN_DICT || !USER_DICT || !REDIRECT_DICT ||!GENERAL_DICT){
    importArticles({
      type: "script",
      articles: [
        "MediaWiki:Common.js/dict",
        "Help:翻译姬/dict",
        "MediaWiki:Common.js/general",
        "MediaWiki:Common.js/redirect"
      ]
    });

  }
  zh_en_go();
  
}
function en_zh(){
  if (  !MAIN_DICT || !USER_DICT || !REDIRECT_DICT ||!GENERAL_DICT){
    importArticles({
      type: "script",
      articles: [
        "MediaWiki:Common.js/dict",
        "Help:翻译姬/dict",
        "MediaWiki:Common.js/general",
        "MediaWiki:Common.js/redirect"
      ]
    });

  }
  en_zh_go();
}
/* zh to en helper */
function zh_en_go(){
  if( !MAIN_DICT || !USER_DICT || !REDIRECT_DICT ||!GENERAL_DICT){
    alert("词典下载不完全，请重试");
    return;
  }
  text = $('#textinput').val();
  var temp = '';
  for (var key in USER_DICT){
    if (text.trim() == USER_DICT[key]){
      temp = key;
      break;
    }
  }
  for (var key in REDIRECT_DICT){
    if (text.trim() == REDIRECT_DICT[key]){
      temp = key;
      break;
    }
  }
  for (var key in MAIN_DICT){
    if (text.trim() == MAIN_DICT[key]){
      temp = key;
      break;
    }
  }
if (temp == ''){
  $( "<p class=\"TranslatorExpand\">翻译失败，你可以在下面的输入框教给翻译姬这个词的译法。</p>" ).insertBefore( "#translation_result" );
  $("#translation_result").attr("placeholder", "在这里提供一个英文翻译").blur();
  $("<button class=\"TranslatorExpand\" id=\"addTranslation\" class=\"btn btn-default\" onclick=\"addZhEnTranslation()\">提交</button>").insertAfter("#translation_result" );
  $('#translation_result').val("");
  expanded = true;

}else{
  $('#translation_result').val(temp);
  $('.TranslatorExpand').remove();
  expanded = false;
}
addNewSectionForTranslator("翻译姬", (mw.config.get('wgUserName')?mw.config.get('wgUserName'):'匿名用户')+"使用了汉译英："+text+"->"+temp);
}
/* en to zh helper */
function en_zh_go(){
  if( !MAIN_DICT || !USER_DICT || !REDIRECT_DICT ||!GENERAL_DICT ){
     alert("词典下载不完全，请重试");
     return;
  }
  text = $('#textinput').val();
  var temp = '';
  for (var key in USER_DICT){
    if (key.toUpperCase() == text.trim().toUpperCase()){
      temp = USER_DICT[key];
      break;
    }
  }
  for (var key in REDIRECT_DICT){
    if (key.toUpperCase() == text.trim().toUpperCase()){
      temp = REDIRECT_DICT[key];
      break;
    }
  }
  for (var key in MAIN_DICT){
    if (key.toUpperCase() == text.trim().toUpperCase()){
      temp = MAIN_DICT[key];
      break;
    }
  }
  if (temp ==''){
    if (!expanded){
      $( "<p class=\"TranslatorExpand\">翻译失败，你可以在下面的输入框教给翻译姬这个词的译法。</p>" ).insertBefore( "#translation_result" );
      $('#translation_result').val("");
      $("#translation_result").attr("placeholder", "在这里提供一个中文翻译").blur();
      $("<button class=\"TranslatorExpand\" id=\"addTranslation\" class=\"btn btn-default\" onclick=\"addEnZhTranslation()\">提交</button>").insertAfter("#translation_result" );
      expanded = true;
    }
  }else{
    $('#translation_result').val(temp);
    $('.TranslatorExpand').remove();
    expanded = false;
  }
  addNewSectionForTranslator("翻译姬", (mw.config.get('wgUserName')?mw.config.get('wgUserName'):'匿名用户')+"使用了英译汉："+text+"->"+temp);

}
/* this function add new en-zh pair to the dictionary. */
function addEnZhTranslation(){
  if(USER_DICT){
    USER_DICT[$('#textinput').val()] = $('#translation_result').val();
    editDictForTranslator("提交了一个新的翻译","var USER_DICT = "+JSON.stringify(USER_DICT));
  }
}
/* this function add new zh-en pair to the dictionary. */
function addZhEnTranslation(){
  if(USER_DICT ){
    USER_DICT[$('#translation_result').val()] = $('#textinput').val();
    editDictForTranslator("提交了一个新的翻译","var USER_DICT = "+JSON.stringify(USER_DICT));
  }
}
/* this function only means to gather translator usage feedback. Purly optional. */
function addNewSectionForTranslator( summary, content ) {
  $.ajax({
    url: mw.util.wikiScript( 'api' ),
    data: {
      format: 'json',
      action: 'edit',
      title: 'Portal:Usage',
      section: 'new',
      summary: summary,
      text: content,
      token: mw.user.tokens.get('editToken')
    },
    dataType: 'json',
    type: 'POST',
    success: function( data ) {
      if ( data && data.edit && data.edit.result == 'Success' ) {
                    //window.location.reload(); // reload page if edit was successful
                  } else if ( data && data.error ) {
                    //alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                  } else {
                    //alert( 'Error: Unknown result from API.' );
                  }
                },
                error: function( xhr ) {
                //alert( 'Error: Request failed.' );
              }
            });
}
/* this function adds new translation pairs into Common.js/redirect, which serves as our secondary dictionary */
function editDictForTranslator( summary, content ) {
  $.ajax({
    url: mw.util.wikiScript( 'api' ),
    data: {
      format: 'json',
      action: 'edit',
      title: 'Help:翻译姬/dict',
      summary: summary,
      text: content,
      token: mw.user.tokens.get('editToken')
    },
    dataType: 'json',
    type: 'POST',
    success: function( data ) {
      if ( data && data.edit && data.edit.result == 'Success' ) {
                    alert("提交成功，10分钟后刷新页面可用。");//window.location.reload(); // reload page if edit was successful
                  } else if ( data && data.error ) {
                    //alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                  } else {
                    //alert( 'Error: Unknown result from API.' );
                  }
                },
                error: function( xhr ) {
                //alert( 'Error: Request failed.' );
              }
            });
}
/* this function is for the translator button in classic editor page. */
function translateStart(){
  if(!MAIN_DICT || !USER_DICT || !REDIRECT_DICT ||!GENERAL_DICT ){
     alert("词典下载不完全，请重试");
     return;
  }
  text = $('#wpTextbox1').val();
  for (var key in MAIN_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp("\\[\\["+temp+"\\|","ig"),"[["+MAIN_DICT[key]+"|");
  }
  for (var key in MAIN_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp("\\[\\["+temp+"\\]\\]","ig"),"[["+MAIN_DICT[key]+"]]");

  }
/* contents in general dict are not dict */
  for (var key in GENERAL_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp(temp,"ig"), GENERAL_DICT[key]);

  }
  for (var key in REDIRECT_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp("\\[\\["+temp+"\\|","ig"),"[["+REDIRECT_DICT[key]+"|");
  }
  for (var key in REDIRECT_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp("\\[\\["+temp+"\\]\\]","ig"),"[["+REDIRECT_DICT[key]+"]]");

  }
  for (var key in USER_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp("\\[\\["+temp+"\\|","ig"),"[["+USER_DICT[key]+"|");
  }
  for (var key in USER_DICT){
    var temp = escapeRegExp(key);
    text = text.replace(new RegExp("\\[\\["+temp+"\\]\\]","ig"),"[["+USER_DICT [key]+"]]");

  }

  $('#wpTextbox1').val(text);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}