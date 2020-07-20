/* 此处的JavaScript将加载于所有用户每一个页面。 */

$(document).ready(function(){
  $("tr:odd").addClass("odd");
  $("tr:even").addClass("even");
});

/**********************/
/* collapsible script */
/**********************/
 
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 3 };

/****************************/
/* spoilers by User:Tierrie */
/****************************/
$(document).ready(function(){
  console.log("DAWiki: Spoilers script loaded");
 
  if(typeof($.cookie) === undefined) {
    mw.loader.using(['jquery.cookie']);
  }
 
  var cookie_id = 'splr_';
  function removeCookie(key) {
    setCookie(key);
  }
 
  function setCookie(key, value) {
    if(value=="undefined" || value == "null") value = null;
    $.cookie(cookie_id + key, value, { expires: 150, path: '/' });
  }
 
  function getCookie(key) {
    return $.cookie(cookie_id + key);
  }
 
  $('.sp_banner').click( function() {
    var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
 
    if( $('.sp_id_'+id+' .sp_wrn').css('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').fadeIn(200, function() {
        $(this).show(200);
      });
      $('.sp_id_'+id+' .sp_txt').hide(0);
      setCookie(id, 'hide');
    } else {
      $('.sp_id_'+id+' .sp_wrn').fadeOut(200, function() {
        $(this).hide(200);
      });
      $('.sp_id_'+id+' .sp_txt').delay(200).show(0);
      setCookie(id, 'show');
    }
  });

 function jmpnew(){
window.open('https://toaru.huijiwiki.com');
}

 
  var sp_on_page = {};
  $('.sp').each( function() {
    var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
    sp_on_page[id] = undefined;
  });
  for (var id in sp_on_page) {
    if (getCookie(id) === 'show') {
      $('.sp_id_'+id+' .sp_wrn').hide(0);
      $('.sp_id_'+id+' .sp_txt').show(0);
    } else if (getCookie(id) === 'hide') {
      $('.sp_id_'+id+' .sp_wrn').show(0);
      $('.sp_id_'+id+' .sp_txt').hide(0);
 
    // if no cookies are set, check to see if the warning is displayed by default
    } else if ($('.sp_id_'+id+' .sp_wrn').attr('display') == 'none') {
      $('.sp_id_'+id+' .sp_wrn').hide(0);
      $('.sp_id_'+id+' .sp_txt').show(0);
    } else {
      $('.sp_id_'+id+' .sp_wrn').show(0);
      $('.sp_id_'+id+' .sp_txt').hide(0);
    }
  }
});
 var progressbar={
     init:function(){
         var fill=document.getElementById('fill');
         var count=0;
     //通过间隔定时器实现百分比文字效果,通过计算CSS动画持续时间进行间隔设置
         var timer=setInterval(function(e){
             count++;
             fill.innerHTML=count+'%';
             if(count===100) clearInterval(timer);
         },17);
     }
 };
 progressbar.init();