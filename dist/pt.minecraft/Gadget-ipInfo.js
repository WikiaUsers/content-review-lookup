// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

if (mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Contributions') {

	var wgRelevantUserName = mw.config.get( 'wgRelevantUserName' );

	if (typeof wgRelevantUserName !== 'undefined' && !isNaN(wgRelevantUserName.substr(0,1))){
		var torLinkTitle = 'Verifique se este IP é um nó TOR';
		var mapLinkTitle = 'Veja essas coordenadas no Google Maps';
		var torLink = '<span class="ipInfoSubLink">(<a target="_blank" title="' + torLinkTitle +
			'" href="https://ipduh.com/ip/tor-exit/?' + wgRelevantUserName + '">verificação de tor</a>)</span>';
		var ipInfoField = '<fieldset class="ipInfoField"' +
			'><legend>Informações de IP</legend><table class="ipInfo"></table></fieldset>';
		var $contentSub = $('.mw-contributions-form');
		$contentSub.after(ipInfoField);
		var $ipInfo = $('.ipInfo');
        var skip = 0;

		$.getJSON('https://ipinfo.io/' + wgRelevantUserName + '/json', function(ipdata){
			$.each(ipdata, function(key, data){
                skip = 0;
				key = key.substr(0,1).toUpperCase() + key.slice(1);
				switch (key) {
					case 'Ip':
						data += ' ' + torLink;
						key = 'IP';
					break;
					case 'Loc':
						data += ' <span class="ipInfoSubLink">(<a target="_blank" title="' + mapLinkTitle +
							'" href="https://www.go' + 'ogle' + '.' + 'com/maps/place/' + data + '">mapa</a>)</span>';
					break;
                    case 'Readme':
                        skip = 1;
                    break;
				}
				if (skip == 0) $ipInfo.append('<tr><td style="padding-right:10px;"><b>' + key + ': </b></td><td>' + data + '</td></tr>');
			});
		});
	}
}