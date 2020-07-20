/* Создание кнопки действия (вроде "Вандализировать", "Журнал откатов") */
function addActionButton(id, text, link, title)
{
  var actions = document.getElementById('p-cactions');
  if(!actions) return;
  var list = actions.getElementsByTagName('ul');
  if(!list) return;
  if(!list[0]) return;
 
  var b = document.createElement('li');
  b.id = id;
 
  var l = document.createElement('a');
  l.href = link;
  l.title = title;
 
  l.appendChild(document.createTextNode(text));
  b.appendChild(l);
  list[0].appendChild(b);
}
 
/* Добавляет в верхний ряд действий кнопку "Опубликовать ВКонтакте".
   Только на статьях. Только для незарегистрированных пользователей.
*/
function share_vkontakte()
{
  if(wgIsArticle && wgNamespaceNumber == 0 && !wgIsLogin)
  {
    var body = document.getElementById('bodyContent');
    if(!body) return;
 
    var pre_title, article;
    if(wgTitle.match("^Как правильно:"))
    {
      pre_title = 'Руководство';
      article = wgTitle.replace(/^Как правильно:/, '');
      article = 'Как правильно ' + article.substr(0,1).toLowerCase() + article.substr(1);
    }
    else
    {
      pre_title = 'Статья';
      article = wgTitle;
    }
 
    var url = 'http://vkontakte.ru/share.php?noparse=true&url=http://absurdopedia.wikia.com/wiki/' + encodeURIComponent(wgPageName) + 
      '&title=' + encodeURIComponent(pre_title + ' «' + article + '»');
 
    var img = body.getElementsByTagName('img');
    if(img)
    {
      for(var i = 0; i < img.length; i ++)
      {
        var par = img[i].parentNode;
        if(!par) continue;
        par = par.parentNode;
        if(!par) continue;
 
        if(par.className.match(/^(thumbinner|float(right|left))$/))
        {
          url += '&image=' + encodeURIComponent(img[i].src);
          break;
        }
      }
    }
 
    var txt = body.getElementsByTagName('p');
    if(txt && txt[0])
      url += '&description=' + txt[0].innerHTML.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
 
    addActionButton('sharevk', 'Опубликовать ВКонтакте', url, 'Создать заметку ВКонтакте про эту статью');
  }
}
addOnloadHook(share_vkontakte);