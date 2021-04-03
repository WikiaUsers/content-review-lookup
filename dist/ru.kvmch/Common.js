//назначение скрипта: показываем предупреждающее сообщение читателю, если текущая версия страницы не была отпатрулирована
//способ работы: получаем через get содержимое журнала патрулирования с поисковыми параметрами, соответствующими названию текущей страницы
//и проверяем, есть ли запись о патрулировании текущей просматриваемой версии, если нет - ставим на страницу плашку с сообщением

//изменения: теперь будем проверять и по location.search, чтобы шаблон не выскакивал где попало
	var test_hostname = document.location.pathname;
	var test_qu = document.location.search;
	var hostname_split = test_hostname.split('/');
	var page_urldecode_name = decodeURI(hostname_split[3]);
	var test_pttrn_pagename = new RegExp(/^[a-zA-Zа-яА-Я0-9_]+$/);
	var currentVersionPage = $('a[dir=ltr]').attr('href');
	currentVersionPage = currentVersionPage.split('=');
	currentVersionPage = currentVersionPage[1];
	if(hostname_split[2] == 'wiki' && test_pttrn_pagename.test(page_urldecode_name) === true && !test_qu){
		$.get('/ru/index.php?title=Служебная%3ALog&type=patrol&user=&page='+page_urldecode_name+'&year=&month=-1', function(data){
			if(data.indexOf('oldid='+currentVersionPage+'&amp;diff=prev') == '-1'){
				$('#mw-content-text').prepend('<center><table style="border: 3px #ff0000db solid; background: #2b4248;-moz-border-radius:5px;border-radius: 10px; margin: 7px 0px;"><tbody><tr><td style="text-align: center;"><table style="margin: 0 auto;"> <tbody><tr><td></td><td><span style="font-size:14px;">Эта версия страницы <a href="/ru/wiki/Справка:Проверка_страниц_и_правок">не проверялась</a> Модераторами Контента Википедии КвМЧ.</span><br>Информация, указанная здесь может быть неполной или неверной.<br><br><a href="/ru/wiki/Служебная:Журналы?type=patrol&user=&page='+page_urldecode_name+'&year=&month=-1">Просмотреть проверенные версии »</a></td></tr></tbody></table></td></tr></tbody></table></center>');
			}
		});
	}