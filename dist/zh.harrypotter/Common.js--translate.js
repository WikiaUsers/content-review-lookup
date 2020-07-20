/* Any JavaScript here will be loaded for all users on every page load. */
/* 以下代码来源于冰与火之歌中文维基 */
var text = "";
var json = "";
var obj = "";
var obj2 = "";
var obj3 = "";
var count = 0;
/* 增加编辑按钮 */
/*
if (wgAction == 'submit' || wgAction == 'edit')  {
    var $save = $('#wpSave');
    var $combo = $('<a id="translate"  style = "width:90px;" href="javascript:Button1_onclick();"  tabindex="2"><span class ="button translate control-button secondary">自动翻译</span></a>')
    .insertAfter($save);

}if (wgPageName == "冰与火之歌中文维基"){
    $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/dict', { action: "raw"}, function(data) {      
          obj  = $.parseJSON(data);
          console.log(obj); 
    $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/redirect', { action: "raw"}, function(data) {          
          obj3  = $.parseJSON(data);
          console.log(obj3);
    });
    });
}
function Button1_onclick() {
     $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/dict', { action: "raw"}, function(data) {     
          obj  = $.parseJSON(data);
          console.log(obj);
     $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/general', { action: "raw"}, function(data) {          
          obj2  = $.parseJSON(data);
          console.log(obj2);
     $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/redirect', { action: "raw"}, function(data) {         
          obj3  = $.parseJSON(data);
          console.log(obj3);
          translateStart();
        });
        });
        });
}
*/

function zh_en(){
    if (obj == "" || obj3 == ""){
        $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/dict', { action: "raw"}, function(data) {      
              obj  = $.parseJSON(data);
              console.log(obj); 
        $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/redirect', { action: "raw"}, function(data) {          
              obj3  = $.parseJSON(data);
              console.log(obj3);
              zh_en_go();
         });});
    }else{
    zh_en_go();
}
}
function en_zh(){
    if (obj == "" || obj3 == ""){
        $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/dict', { action: "raw"}, function(data) {      
              obj  = $.parseJSON(data);
              console.log(obj); 
        $.get('http://zh.harrypotter.wikia.com/wiki/MediaWiki:Common.js/redirect', { action: "raw"}, function(data) {          
              obj3  = $.parseJSON(data);
              console.log(obj3);
              en_zh_go();
         });});
    }else{
    en_zh_go();
}

}
function zh_en_go(){
    if(obj=="" || obj3=="" ){
             alert("词典下载不完全，请重试");
             return;
    }
    text = $('#textinput').val();
    var temp = '';
    for (var key in obj3){
        if (text.trim() == obj3[key]){
            temp = key;
            break;
        }
    }
    for (var key in obj){
        if (text.trim() == obj[key]){
            temp = key;
            break;
        }
    }
    if (temp == ''){
        $('#translation_result').val('翻译失败，您的中文名称有误，可参阅[?]');
    }else{
        $('#translation_result').val(temp);
    }
    addNewSectionForTranslator("翻译机", (mw.config.get('wgUserName')?mw.config.get('wgUserName'):'匿名用户')+"使用了汉译英："+text+"->"+temp);
}
function en_zh_go(){
    if(obj=="" || obj3=="" ){
             alert("词典下载不完全，请重试");
             return;
    }
    text = $('#textinput').val();
    var temp = '';
    for (var key in obj){
        if (key.toUpperCase() == text.trim().toUpperCase()){
            temp = obj[key];
            break;
        }
    }
    for (var key in obj3){
        if (key.toUpperCase() == text.trim().toUpperCase()){
            temp = obj3[key];
            break;
        }
    }
    if (temp ==''){
        $('#translation_result').val('翻译失败，请检查英文拼写');
    }else{
         $('#translation_result').val(temp);
    }
    addNewSectionForTranslator("翻译机", (mw.config.get('wgUserName')?mw.config.get('wgUserName'):'匿名用户')+"使用了英译汉："+text+"->"+temp);
   
}
function addNewSectionForTranslator( summary, content, editToken ) {
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
function translateStart(){
    if(obj=="" || obj2=="" || obj3=="" ){
             alert("词典下载不完全，请重试");
             return;
    }
    text = $('#wpTextbox1').val();
    console.log(text);
    for (var key in obj){
        var temp = escapeRegExp(key);
        text = text.replace(new RegExp("\\[\\["+temp+"\\|","ig"),"[["+obj[key]+"|");

    }
    for (var key in obj){
        var temp = escapeRegExp(key);
        text = text.replace(new RegExp("\\[\\["+temp+"\\]\\]","ig"),"[["+obj[key]+"]]");

    }
    for (var key in obj2){
        var temp = escapeRegExp(key);
        text = text.replace(new RegExp(temp,"ig"),obj2[key]);

    }
    for (var key in obj3){
        var temp = escapeRegExp(key);
        text = text.replace(new RegExp("\\[\\["+temp+"\\|","ig"),"[["+obj3[key]+"|");

    }
    for (var key in obj3){
        var temp = escapeRegExp(key);
        text = text.replace(new RegExp("\\[\\["+temp+"\\]\\]","ig"),"[["+obj3[key]+"]]");

    }
    $('#wpTextbox1').val(text);
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
/* 以上代码来源于冰与火之歌中文维基 */