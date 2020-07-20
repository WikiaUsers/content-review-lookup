/* <pre> */ 

/* Расширенный поиск */
 var extSearchMode = 1; //Режим просмотра: 1 - в новом окне, 0 - в текущем. 

 function addExtSearchPanel()
 {
     var d = document;
     var ptb = d.getElementById('p-search').getElementsByTagName('div')[0];

     ptb.innerHTML = '<FORM action="http://ru.wikipedia.org/wiki/Служебная:Search" id="searchform"><DIV><INPUT id="searchInput" name="search" type="text" accesskey="f" value=""/><INPUT type="submit" name="go" class="searchButton" id="searchGoButton" value="Перейти"/><INPUT type="submit" name="fulltext" class="searchButton" value="Поиск"/> <br /> <INPUT type="button" name="google" value="Я" onclick="openW(yURL());" class="searchButton" /> <INPUT type="button" class="searchButton" name="google" value="Gru" onclick="openW(gURL());"/> <INPUT type="button" name="google" value="Gint" class="searchButton" onclick="openW(gaURL());"/></DIV></FORM>';
 }

 function gURL() {
   return 'http://www.google.ru/search?q=site:ru.farm-frenzy.wikia.com&q=' + document.getElementById('searchInput').value;
 }
 
 function gaURL() {
   return 'http://www.google.ru/search?q=site:farm-frenzy.wikia.com&q=' + document.getElementById('searchInput').value;
 }
 
 function yURL() {
   return 'http://www.yandex.ru/yandsearch?site=http://ru.farm-frenzy.wikia.com&site_manually=true&ras=1&text=' + document.getElementById('searchInput').value;
 }

 function openW(url) {
   if (extSearchMode == 0) window.open(url, "_self");
   else window.open(url, "_blank");
 }

 $(addExtSearchPanel);

/* </pre> */