//Создано на Call of Duty Wikia. 
/* Подстроил под Just Cause Вики Shadow of the Corporation eDEN */
$('#ChatHeader').append('<form style="display:inline-block;position:absolute;top:7px;right:190px;z-index:9001;" method="get" action="http://https://justcause.fandom.com/ru/wiki/Special:Search?title=Special:Search" class="WikiaSearch" id="WikiaSearch" target="_blank"><input type="text" accesskey="f" autocomplete="off" placeholder="Quick search" name="search"><input type="hidden" value="0" name="fulltext"><button class="secondary"><img height="14px" class="sprite search" src="https://vignette.wikia.nocookie.net/justcause/images/b/b6/Chat_Search_icon.png/revision/latest?cb=20190302064643&path-prefix=ru"></button></form>');
 
$('.ChatHeader form.WikiaSearch').submit(function() {setTimeout("$('form.WikiaSearch input[name=\"search\"]').attr('value', '')", 500)});

/* Конец Подстроил под Just Cause Вики Shadow of the Corporation eDEN */