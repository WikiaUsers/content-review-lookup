//назначение скрипта: показываем предупреждающее сообщение читателю, если текущая версия страницы не была отпатрулирована
//автор : Chernobylnik
//способ работы: получаем через get содержимое журнала патрулирования с поисковыми параметрами, соответствующими названию текущей страницы
//и проверяем, есть ли запись о патрулировании текущей просматриваемой версии, если нет - ставим на страницу плашку с сообщением
//когда объектная модель готова к использованию, запускаем выполнение
//описание внесенных изменений в скрипт от разработчика:
//Изменена очередность разбивки URL-адреса страницы всвязи с переходом ВИКИ на новый домен fandom и добавления в URL секции "/ru/" перед "/wiki/"
$( document ).ready(function() {
	var test_hostname = document.location.pathname;
	var hostname_split = test_hostname.split('/');
	var page_urldecode_name = decodeURI(hostname_split[3]);
	var test_pttrn_pagename = new RegExp(/^[a-zA-Zа-яА-Я0-9_]+$/);
	var currentVersionPage = $('.printfooter').html();
	currentVersionPage = $(currentVersionPage).attr('href');
	currentVersionPage = currentVersionPage.split('=');
	currentVersionPage = currentVersionPage[1];
	if(hostname_split[2] == 'wiki' && test_pttrn_pagename.test(page_urldecode_name) === true){
		$.get('/ru/index.php?title=Служебная%3ALog&type=patrol&user=&page='+page_urldecode_name+'&year=&month=-1', function(data){
			if(data.indexOf('Подходящие записи в журнале отсутствуют.') != '-1' || data.indexOf('oldid='+currentVersionPage+'&amp;diff=prev') == '-1'){
				$('#mw-content-text').prepend('<center><table style="padding: 0px; border: 1px #404649 solid; background: #070a0b; width:60%;-moz-border-radius:5px; box-shadow: 0 0 6px 3px #35431e; border-radius: 10px; margin: 7px 0px;"><tbody><tr><td style="text-align: center;"><table style="margin: 0 auto;"> <tbody><tr><td></td><td><span style="font-size:14px;">Эта версия страницы <a href="/ru/wiki/Справка:Проверка_страниц_и_правок">не проверялась</a> Модераторами Контента Википедии КвМЧ и имеет статус непроверенной.</span><br>Информация, указанная в этой статье может быть неполной или неверной.</td></tr></tbody></table></td></tr></tbody></table></center>');
			}
		});
	}
});