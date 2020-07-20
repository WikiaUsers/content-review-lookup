/**
   Compact Delete Reason -- 15 Feb 2010.
   Автор: [[Участник:Edward Chernenko]].
 
   Вспомогательный инструмент для администраторов.
 
   Кратко указывает [[MediaWiki:Deletereason-dropdown|стандартную причину удаления]]
   в соответствующем поле. Проверяет, хватает ли в поле места для описания причины.
*/
 
function cdelreason()
{
  if(wgAction != "delete") return;
 
  var delrow = document.getElementById('wpDeleteReasonRow');
  if(delrow) delrow.innerHTML += "<a href='javascript:cdelreason_compress();'>Сжать</a>";
}
addOnloadHook(cdelreason);
 
function cdelreason_compress()
{
  d_code = document.getElementById('wpDeleteReasonList');
  if(d_code.value == 'other') return;
 
  d_reason = document.getElementById('wpReason');
 
  code = d_code.value.match("^-- [0-9].[0-9]");
  if(!code) return;
  code = new String(code);
  code = code.split(' ')[1];
  anchor = code.replace(".", "-");
  reason = d_reason.value;
 
  /* Дописываем ссылку на причину удаления */
  reason.replace('(/\s?\[\[АП:ПУС#.*?\]\]\s?/', "");
  reason = "[[АП:ПУС#" + anchor + "|" + code + "]] " + reason; 
 
  len = reason.length; utf_len = utf8_length(reason);
 
  if(len > 200 || utf_len > 250)
  {
      msg = "Слишком велика строка описания: лишние ";
 
      if(len > 200)
      {
        msg += (len - 200) +  " символов";
        if(utf_len > 250) msg += " и ";
      }
      if(utf_len > 250) msg += (utf_len - 250) + " байт (UTF8)";
 
      msg += ".\nВсё равно упаковать?"
      if(!confirm(msg)) return;
  }
 
  d_reason.value = reason;
  d_code.value = 'other';
}
 
function utf8_length(str)
{
  len = 0;
  for(i = 0; i < str.length; i ++)
  {
    c = str.charCodeAt(i);
    if (c < 128) len ++;
    else if((c > 127) && (c < 2048)) len += 2;
    else len += 3;
  }
  return len;
}