//  ____________________________________________________________________________________________
// |                                                                                            |
// |                    Основано на версии 264413579 гаджета refToolbar.js                      |
// | (http://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-refToolbar.js&oldid=264413579) |
// |____________________________________________________________________________________________|
//
// Imported from revision 264412998 as of 2009-01-16T05:53:39 from [[User:Mr.Z-man/refToolbar.js]]
// For a description, see [[User:Mr.Z-man/refToolbar]]

var numforms = 0;
var wikEdAutoUpdateUrl;
function refbuttons() {
  if (mwCustomEditButtons && document.getElementById('toolbar') ) {
    button = document.createElement('a');
    button.href = "javascript:easyCiteMain()";
    button.title = "Добавить шаблон цитирования";
    buttonimage = document.createElement('img');
    buttonimage.src = "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_easy_cite.png";
    buttonimage.alt = "Вставить шаблон цитирования";
    button.appendChild(buttonimage);
    var toolbar = document.getElementById('toolbar');
    if (navigator.userAgent.indexOf('MSIE') == -1) {
      if (toolbar.style != null) {
        toolbar.style.height = 'auto';
      }
      else {
      	toolbar.setAttribute('style', 'margin-bottom: 6px; height: auto;');
      }
      toolbar.appendChild(button);
      citemain = document.createElement('div');
      citemain.style.display = 'none';
      citemain.style.margin = '0.2em 0 -0.2em 0';
      citemain.setAttribute('Id', 'citeselect');
      citemain.appendChild( addOption("citeWeb()", "Web") );
      citemain.appendChild( addOption("citeNews()", "News") );
      citemain.appendChild( addOption("citeBook()", "Книга") );
      citemain.appendChild( addOption("citeJournal()", "Статья") );
      citemain.appendChild( addOption("citeNamedRef()", "Именованные сноски") );
      citemain.appendChild( addOption("dispErrors()", "Поиск ошибок") );
      citemain.appendChild( addOption("hideInitial()", "Отмена") );
      toolbar.appendChild(citemain);
    }
    else {
      toolbar.appendChild(button);
      selection = '<div id="citeselect" style="display:none"><input type="button" value="Web" onclick="citeWeb()" />'+
      '<input type="button" value="News" onclick="citeNews()" />'+
      '<input type="button" value="Книга" onclick="книга()" />'+
      '<input type="button" value="Статья" onclick="статья()" />'+
      '<input type="button" value="Именованные сноски" onclick="citeNamedRef()" />'+
      '<input type="button" value="Поиск ошибок" onclick="dispErrors()" />'+
      '<input type="button" value="Отмена" onclick="hideInitial()" /></div>';
      document.getElementById('editform').innerHTML = selection + document.getElementById('editform').innerHTML;
    }
  }
}

function addOption(script, text) {
  option = document.createElement('input');
  option.setAttribute('type', 'button');
  option.setAttribute('onclick', script);
  option.setAttribute("value", text);
  return option;
}

function hideInitial() {
  document.getElementById('citeselect').style.display = 'none';
  oldFormHide();
}

function oldFormHide() {
  if (numforms != 0) {
    document.getElementById('citediv'+numforms).style.display = 'none';
  }
  if (document.getElementById('errorform') != null) {
    document.getElementById('citeselect').removeChild(document.getElementById('errorform'));
  }
}

function easyCiteMain() {
  document.getElementById('citeselect').style.display = '';
}

function getTime() {
  var time = new Date();
  var nowdate = time.getUTCDate();
  if (nowdate<10) { nowdate = "0"+ nowdate.toString(); }
  var nowmonth = time.getUTCMonth()+1;
  if (nowmonth<10) { nowmonth = "0"+ nowmonth.toString(); }
  var nowyear = time.getUTCFullYear();
  newtime =  nowyear + '-' + nowmonth + '-' + nowdate;
  return (newtime);
}

function citeWeb() {
  citeNewsWeb("cite web");
}
function citeNews() {
  citeNewsWeb("cite news");
}

function citeNewsWeb(templatename) {
  oldFormHide();
  template = templatename;
  var legend;
  if (template == "cite web") {
    legend = "Ссылка на источник из интернета";
  } else {
    legend = "Ссылка на новостной источник";
  }
  newtime = getTime();
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>'+legend+'</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="url">&nbsp;URL: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="url"></td>'+
    '<td width="120"><label for="title">&nbsp;Заголовок: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="title"></td></tr>'+
    '<tr><td width="120"><label for="last">&nbsp;Фамилия: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="last"></td>'+
    '<td width="120"><label for="first">&nbsp;Имя: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="first"></td></tr>'+
    '<tr><td width="120"><label for="author">&nbsp;Автор: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="author"></td>'+
    '<td width="120"><label for="coauthors">&nbsp;Соавторы: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="coauthors"></td></tr>'+
    '<tr><td width="120"><label for="quote">&nbsp;Цитата: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="quote"></td>'+
    '<td width="120"><label for="date">&nbsp;Дата публикации: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="date"></td></tr>'+
    '<tr><td width="120"><label for="work">&nbsp;Работа: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="work"></td>'+
    '<td width="120"><label for="publisher">&nbsp;Издатель: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="publisher"></td></tr>'+
    '<tr><td width="120"><label for="format">&nbsp;Формат: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="format"></td>'+
    '<td width="120"><label for="description">&nbsp;Описание: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="description"></td></tr>'+
    '<tr><td width="120"><label for="pages">&nbsp;Страницы: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="pages"></td>'+
    '<td width="120"><label for="lang">&nbsp;Язык: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="lang"></td></tr>'+
    '<tr><td width="120"><label for="accessdate">&nbsp;Дата проверки: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="accessdate" value="'+ newtime +'"></td>'+
    '<td width="120"><label for="refname">&nbsp;Имя сноски: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="refname"></td></tr>'+
    '<tr><td width="120"><label for="archiveurl">&nbsp;Архивная копия: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="archiveurl"></td>'+
    '<td width="120"><label for="archivedate">&nbsp;Дата архивной копии: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="archivedate"></td></tr>'+
    '</table>'+
    '<input type="button" value="Добавить" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}

function citeBook() {
  oldFormHide();
  template = "книга";
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>Ссылка на книгу</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="автор">&nbsp;Автор: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="автор"></td>'+
    '<td width="120"><label for="часть">&nbsp;Часть: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="часть"></td></tr>'+
    '<tr><td width="120"><label for="заглавие">&nbsp;Заглавие: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="заглавие"></td>'+
    '<td width="120"><label for="оригинал">&nbsp;Оригинал: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="оригинал"></td></tr>'+
    '<tr><td width="120"><label for="ссылка">&nbsp;Ссылка: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="ссылка"></td>'+
    '<td width="120"><label for="ответственный">&nbsp;Ответственный: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="ответственный"></td></tr>'+
    '<tr><td width="120"><label for="издание">&nbsp;Издание: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="издание"></td>'+
    '<td width="120"><label for="место">&nbsp;Место: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="место"></td></tr>'+
    '<tr><td width="120"><label for="издательство">&nbsp;Издательство: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="издательство"></td>'+
    '<td width="120"><label for="год">&nbsp;Год: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="год"></td></tr>'+
    '<tr><td width="120"><label for="том">&nbsp;Том: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="том"></td>'+
    '<td width="120"><label for="серия">&nbsp;Серия: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="серия"></td></tr>'+
    '<tr><td width="120"><label for="страницы">&nbsp;Страницы: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="страницы"></td>'+
    '<td width="120"><label for="страниц">&nbsp;Страниц всего: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="страниц"></td></tr>'+
    '<tr><td width="120"><label for="pages">&nbsp;Pages: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="pages"></td>'+
    '<td width="120"><label for="allpages">&nbsp;All Pages: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="allpages"></td></tr>'+
    '<tr><td width="120"><label for="isbn">&nbsp;ISBN: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="isbn"></td>'+
    '<td width="120"><label for="тираж">&nbsp;Тираж: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="тираж"></td></tr>'+
    '<td width="120"><label for="refname">&nbsp;Имя сноски: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Добавить" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}

function citeJournal() {
  oldFormHide();
  template = "статья";
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>Ссылка на статью</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="автор">&nbsp;Автор: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="автор"></td>'+
    '<td width="120"><label for="заглавие">&nbsp;Заглавие: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="заглавие"></td></tr>'+
    '<tr><td width="120"><label for="оригинал">&nbsp;Оригинал: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="оригинал"></td>'+
    '<td width="120"><label for="ссылка">&nbsp;Ссылка: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="ссылка"></td></tr>'+
    '<tr><td width="120"><label for="язык">&nbsp;Язык: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="язык"></td>'+
    '<td width="120"><label for="автор издания">&nbsp;Автор издания: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="автор издания"></td></tr>'+
    '<tr><td width="120"><label for="издание">&nbsp;Издание: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="издание"></td>'+
    '<td width="120"><label for="тип">&nbsp;Тип: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="тип"></td></tr>'+
    '<tr><td width="120"><label for="место">&nbsp;Место: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="место"></td>'+
    '<td width="120"><label for="издательство">&nbsp;Издательство: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="издательство"></td></tr>'+
    '<tr><td width="120"><label for="год">&nbsp;Год: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="год"></td>'+
    '<td width="120"><label for="том">&nbsp;Том: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="том"></td></tr>'+
    '<tr><td width="120"><label for="выпуск">&nbsp;Выпуск: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="выпуск"></td>'+
    '<td width="120"><label for="страницы">&nbsp;Страницы: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="страницы"></td></tr>'+
    '<tr><td width="120"><label for="issn">&nbsp;ISSN: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="issn"></td>'+
    '<td width="120"><label for="isbn">&nbsp;ISBN: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="isbn"></td></tr>'+
    '<tr><td width="120"><label for="doi">&nbsp;DOI: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="doi"></td>'+
    '<td width="120"><label for="refname">&nbsp;Имя сноски: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Добавить" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}

function addcites(template) {
  cites = document.getElementById('citediv'+numforms).getElementsByTagName('input');
  var citebegin = '<ref';
  var citename = '';
  var citeinner = '';
  for (var i=0; i<cites.length-1; i++) {
    if (cites[i].value != '' && cites[i].id != "refname" && cites[i].id != "template") {
      citeinner += "|" + cites[i].id + "=" + cites[i].value.replace(/\|/g, '{{!}}');
    }
    else if (cites[i].value != '' && cites[i].id == "refname" && cites[i].id != "template") {
      citebegin += ' name="' + cites[i].value + '"';
    }
    else if (cites[i].value != '' && cites[i].id != "refname" && cites[i].id == "template") {
      citename = '>{{' + cites[i].value;
    }
  }
  cite = citebegin + citename + citeinner + "}}</ref>";
  insertTags(cite, '', '');
  document.getElementById('citediv'+numforms).style.display = 'none';
}

function getNamedRefs(calls) {
  if (typeof(wikEdUseWikEd) != 'undefined') {
    if (wikEdUseWikEd == true) {
      WikEdUpdateTextarea();
    }
  }
  text = document.getElementById('wpTextbox1').value;
  var regex;
  if (calls) {
    regex = /< *?ref +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)) *?\/ *?>/gi //'
  } else {
    regex = /< *?ref +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)) *?>/gi //'
  }
  var namedrefs = new Array();
  var i=0;
  var nr=true;
  do {
    ref = regex.exec(text);
    if(ref != null){
      if (ref[5]) {
        namedrefs[i] = ref[5];
      } else if (ref[3]) {
        namedrefs[i] = ref[3];
      } else {
        namedrefs[i] = ref[6];
      }
      i++;
    } else {
      nr=false;
    }
  } while (nr==true);
  return namedrefs;
}

function citeNamedRef() {
  namedrefs = getNamedRefs(false);
  if (namedrefs == '') {
    oldFormHide();
    numforms++;
    out = '<div id="citediv'+numforms+'"><fieldset>'+
      '<legend>Сноски в тексте</legend>В тексте отстутствуют именованные сноски (<tt>&lt;ref name="Name"&gt;</tt>)</fieldset></div>';
    document.getElementById('citeselect').innerHTML += out;
  }
  else {
    oldFormHide();
    numforms++;
    form = '<div id="citediv'+numforms+'">'+
      '<fieldset><legend>Сноски в статье</legend>'+
      '<table cellspacing="5">'+
      '<tr><td><label for="namedrefs">&nbsp;Именованные сноски:</label></td>'+
            '<td><select name="namedrefs" id="namedrefs">';
    for (var i=0;i<namedrefs.length;i++) {
      form+= '<option value="'+namedrefs[i]+'">'+namedrefs[i]+'</option>';
    }
    form+= '</select>'+
      '</td></tr></table>'+
      '<input type="button" value="Добавить" onClick="addnamedcite()">'+
      '</fieldset></div>';
     document.getElementById('citeselect').innerHTML += form;
  }
}

function addnamedcite() {
  name = document.getElementById('citediv'+numforms).getElementsByTagName('select')[0].value;
  ref = '<ref name="'+name+'"/>';
  insertTags(ref, '', '');
  document.getElementById('citediv'+numforms).style.display = 'none';
}

function getAllRefs() {
  if (typeof(wikEdUseWikEd) != 'undefined') {
    if (wikEdUseWikEd == true) {
      WikEdUpdateTextarea();
    }
  }
  text = document.getElementById('wpTextbox1').value;
  regex = /< *?ref( +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)))? *?>((.|\n)*?)< *?\/? *?ref *?>/gim //"
  var allrefs = new Array();
  var i=0;
  var nr=true;
  do {
    ref = regex.exec(text);
    if(ref != null){
      if (ref[0].search(/[^\s]{150}/) != -1) {
        ref[0] = ref[0].replace(/\|([^\s])/g, "| $1");
      }
      ref[0] = ref[0].replace(/</g, "&lt;");
      ref[0] = ref[0].replace(/>/g, "&gt;");
      allrefs[i] = ref[0];
      i++;
    } else {
      nr=false;
    }
  } while (nr==true);
  return allrefs;
}

function NRcallError(namedrefs, refname) {
  for (var i=0; i<namedrefs.length; i++) {
    if (namedrefs[i] == refname) {
      return true;
    }
  }
  return false;
}

function errorCheck() {
  var allrefs = getAllRefs();
  var allrefscontent = new Array();
  var samecontentexclude = new Array();
  var sx=0;
  var templateexclude = new Array();
  var tx=0;
  var skipcheck = false;
  var namedrefcalls = getNamedRefs(true);
  for (var i=0; i<allrefs.length; i++) {
    allrefscontent[i] = allrefs[i].replace(/&lt; *?ref( +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)))? *?&gt;((.|\n)*?)&lt; *?\/? *?ref *?&gt;/gim, "$8");  //"
  }
  var namedrefs = getNamedRefs(false);
  var errorlist = new Array();
  var q=0;
  unclosed = document.getElementById('unclosed').checked;
  samecontent = document.getElementById('samecontent').checked;
  templates = document.getElementById('templates').checked;
  repeated = document.getElementById('repeated').checked;
  undef = document.getElementById('undef').checked;
  for (var i=0; i<allrefs.length; i++) {
    if (allrefs[i].search(/&lt; *?\/ *?ref *?&gt;/) == -1 && unclosed) {
      errorlist[q] = '<tr><td width="75%"><tt>'+allrefs[i]+'</tt></td>';
      errorlist[q] += '<td width="25%">Unclosed <tt>&lt;ref&gt;</tt> tag</td></tr>';
      q++;
    }
    if (samecontent) {
      for (var d=0; d<samecontentexclude.length; d++) {
        if (allrefscontent[i] == samecontentexclude[d]) {
          skipcheck = true;
        }
      }
      var p=0;
      while (p<allrefs.length && !skipcheck) {
        if (allrefscontent[i] == allrefscontent[p] && i != p) {
          errorlist[q] = '<tr><td width="75%"><tt>'+allrefscontent[i]+'</tt></td>';
          errorlist[q] += '<td width="25%">Несколько сносок имеют одинаковое содержание, вместо этого надо использовать <a href="http://ru.wikipedia.org/wiki/Википедия:Сноски#Повторное_использование_одной_и_той_же_сноски">именованные сноски</a></td></tr>';
          q++;
          samecontentexclude[sx] = allrefscontent[i]
          sx++;
          break;
        }
        p++;
      }
     skipcheck=false;
    }
    if (templates) {
      if (allrefscontent[i].search(/\{\{cite/i) == -1 && allrefscontent[i].search(/\{\{citation/i) == -1 && allrefscontent[i].search(/\{\{Comic (book|strip) reference/i) == -1 && allrefscontent[i].search(/\{\{Editorial cartoon reference/i) == -1 && allrefscontent[i].search(/\{\{harv/i) == -1) {
        for (var x=0; x<templateexclude.length; x++) {
          if (allrefscontent[i] == templateexclude[x]) {
            skipcheck = true;
          }
        }
        if (!skipcheck) {
          errorlist[q] = '<tr><td width="75%"><tt>'+allrefs[i]+'</tt></td>';
          errorlist[q] += '<td width="25%">Does not use a <a href="http://en.wikipedia.org/wiki/Wikipedia:Citation_templates">citation template</a></td></tr>';
          q++;
          templateexclude[tx] = allrefscontent[i];
          tx++;
        }
        skipcheck = false;
      }
    }
  }
  if (repeated) {
    var repeatnameexclude = new Array();
    var rx=0;
    for (var k=0; k<namedrefs.length; k++) {
      for (var d=0; d<repeatnameexclude.length; d++) {
        if (namedrefs[k] == repeatnameexclude[d]) {
          skipcheck = true;
        }
      }
      var z=0;
      while (z<namedrefs.length && !skipcheck) {
        if (namedrefs[k] == namedrefs[z] && k != z) {
          errorlist[q] = '<tr><td width="75%"><tt>'+namedrefs[k]+'</tt></td>';
          errorlist[q] += '<td width="25%">Повторяющиеся сноски с одинаковым <a href="http://ru.wikipedia.org/wiki/Википедия:Сноски#Повторное_использование_одной_и_той_же_сноски">именем</a></td></tr>';
          q++;
          repeatnameexclude[rx] = namedrefs[z];
          rx++;
          break;
        }
        z++;
      }
     skipcheck = false;
    }
  }
  if (undef) {
    var undefexclude = new Array();
    var ux=0;
    for (var p=0; p<namedrefcalls.length; p++) {
      for (var d=0; d<undefexclude.length; d++) {
        if (allrefscontent[i] == undefexclude[d]) {
          skipcheck = true;
        }
      }
      if (!skipcheck) {
        if (!NRcallError(namedrefs, namedrefcalls[p])) {
          errorlist[q] = '<tr><td width="75%"><tt>'+namedrefcalls[p]+'</tt></td>';
          errorlist[q] += '<td width="25%"><a href="http://ru.wikipedia.org/wiki/Википедия:Сноски#Повторное_использование_одной_и_той_же_сноски">Именованная сноска</a> используется, но её текст не задан</td></tr>';
          q++;
          undefexclude[ux] = namedrefs[p];
          ux++;
        }
      }
      skipcheck = false;
    }
 }
  if (q > 0) {
    return errorlist;
  } else {
    return 0;
  }
}

function dispErrors() {
  oldFormHide();
  form = '<div id="errorform"><fieldset>'+
    '<legend>Поиск ошибок</legend>'+
    '<b>Искать:</b><br/>'+
    '<input type="checkbox" id="unclosed" /> Незакрытые теги <tt>&lt;ref&gt;</tt><br/>'+
    '<input type="checkbox" id="samecontent" /> Сноски с одинаковым содержанием<br/>'+
    '<input type="checkbox" id="repeated" /> Множественные сноски с одинаковым именем<br/>'+
    '<input type="checkbox" id="undef" /> Пустые именнованные сноски<br/>'+
    '<input type="button" id="errorchecksubmit" value="Искать выбранные ошибки" onclick="doErrorCheck()"/>'+
    '</fieldset></div>';
  document.getElementById('citeselect').innerHTML += form;
}

function doErrorCheck() {
  var errors = errorCheck();
  document.getElementById('citeselect').removeChild(document.getElementById('errorform'));
  if (errors == 0) {
    if (numforms != 0) {
      document.getElementById('citediv'+numforms).style.display = 'none';
    }
    numforms++;
    out = '<div id="citediv'+numforms+'"><fieldset>'+
      '<legend>Поиск ошибок</legend>Ошибки не найдены.</fieldset></div>';
    document.getElementById('citeselect').innerHTML += out;
  }
  else {
    if (numforms != 0) {
      document.getElementById('citediv'+numforms).style.display = 'none';
    }
    numforms++;
    form = '<div id="citediv'+numforms+'">'+
      '<fieldset><legend>Поиск ошибок</legend>'+
      '<table border="1px">';
    for (var i=0; i<errors.length; i++) {
      form+=errors[i];
    }
    form+= '</table>'+
      '</fieldset></div>';
     document.getElementById('citeselect').innerHTML += form;
  }
}

//hookEvent("load", refbuttons);
addOnloadHook(refbuttons)