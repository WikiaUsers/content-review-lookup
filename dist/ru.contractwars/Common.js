/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
function bind_element(el, code) {
 if (document.getElementById(el)) {
  document.getElementById(el).innerHTML=code;
 }
}

function weapon_model(name, image, model) {
 bind_element(name+'_model', "<img src='"+image+"' class='model' onclick=\"document.getElementById(\'"+name+"_frame\').style.display=\'block\';this.style.display=\'none\'\" /><iframe id='"+name+"_frame' class='model' style='display:none;' src='"+model+"'></iframe>");
}

bind_element('skills', "<iframe src='http://deeps.hol.es/CW/' style='width:710px; height:557px; z-index:999; margin-top:-10px; margin-left:-5px;'><h3>Загрузка содержимого...</h3></iframe>");

weapon_model('acr', 'https://dl.dropboxusercontent.com/s/lfseqd0fl1tyupz/ACR.jpg', 'https://dl.dropboxusercontent.com/s/mp4apm4dmhx1pwo/ACR.swf');


function setcookie(a,b,c) {if(c){var d = new Date();d.setDate(d.getDate()+c);}if(a && b) document.cookie = a+'='+b+(c ? '; expires='+d.toUTCString() : '');else return false;}
function getcookie(a) {var b = new RegExp(a+'=([^;]){1,}');var c = b.exec(document.cookie);if(c) c = c[0].split('=');else return false;return c[1] ? c[1] : false;}

//setcookie("block","yes",10);

var block = getcookie( "block" );
/*
   if ( block != "yes")
  {
    console.log('q');
   $("#WikiaPageBackground").css("text-align", "center").html("<a href='http://vk.com/cwwiki'>Для беспричинных: вопросы сюда</a>");
    var child = document.getElementsByClassName("WikiaPageContentWrapper")[0];
    //var parent = document.getElementById(parentDiv);
   child.parentNode.removeChild(child);
  }
  else
  {
     //console.log('w');
     $(".WikiaPage").css("background", "none");
     $(".WikiaPage").css("height", "auto");
     $(".WikiaPage").css("margin-top", "0");
     $(".WikiaPageContentWrapper").css("display", "block");
  }*/

importScriptPage('ShowHide/code.js', 'dev');