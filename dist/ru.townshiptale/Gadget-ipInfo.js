// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: http://terraria-ru.gamepedia.com/User:Alex_Great

var wgRelevantUserName = mw.config.get( 'wgRelevantUserName' );

	if (typeof wgRelevantUserName !== 'undefined' && !isNaN(wgRelevantUserName.substr(0,1))){
		var torLinkTitle = 'Проверить, использует ли IP-адрес узел TOR';
		var mapLinkTitle = 'Координаты на карте Яндекс';
		var torLink = '<span class="ipInfoSubLink">(<a target="_blank" title="' + torLinkTitle + 
			'"href="https://www.dan.me.uk/torcheck?ip=' + wgRelevantUserName + '">проверить на tor</a>)</span>';
		var ipInfoField = '<fieldset class="ipInfoField"' + 
			'><legend>Информация об IP-адресе</legend><table class="ipInfoTable"></table></fieldset>';
		var $contentSub = $('.mw-contributions-form');
		$contentSub.after(ipInfoField);
		var $ipInfo = $('.ipInfoTable');

		$.getJSON('https://ipinfo.io/' + wgRelevantUserName + '/json', function(ipdata){
			$.each(ipdata, function(key, data){
				key = key.substr(0,1).toUpperCase() + key.slice(1);
				switch (key) {
					case 'Ip': 
						data += ' ' + torLink;
						key = 'IP';
					break;
					case 'Loc':
						data += ' <span class="ipInfoSubLink">(<a target="_blank" title="' + mapLinkTitle + 
							'" href="https://yand' + 'ex' + '.' + 'ru/maps/?text=' + data + '">карта</a>)</span>';
					break;
				}
				$ipInfo.append('<tr><td style="padding-right:10px;"><b>' + key + ': </b></td><td>' + data + '</td></tr>');
			});
		});
	}