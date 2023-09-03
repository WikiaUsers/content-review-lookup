// UWAGA! Z tego gadżetu korzystają także inne projekty (Wikisłownik, Wikiźródła)
// Author: [[pl:User:Beau]]
 
var di$message = 'Ten użytkownik używa dynamicznego adresu IP <span style="white-space:nowrap">($1)</span>';
var di$blockExpiry = '2 hours';
 
var dynamicIpsGadget = {};
 
dynamicIpsGadget.list = new Array(
        1593769983,     32767,  'Play', // 94.254.128.0/17
        1500315647,     16383,  'Play', // 89.108.192.0/18
        -1138622465,    65535,  'Play', // 188.33.0.0/16
        1394409471,     65535,  'Telekomunikacja Polska, Neostrada, Lublin', // 83.28.0.0/16
        1394343935,     65535,  'Telekomunikacja Polska, Neostrada, Wrocław', // 83.27.0.0/16
        1394163711,     16383,  'Telekomunikacja Polska, Neostrada, Rzeszów', // 83.25.63.0/18
        -711015353,     7,      'EraNet', // 213.158.196.64/29
        -711015329,     15,     'EraNet', // 213.158.196.88/28
        -711015297,     7,      'EraNet', // 213.158.196.120/29
        1465942015,     32767,  'Orange', // 87.96.0.0/17
        1532952575,     65535,  'Orange', // 91.94.0.0/16
        -646680577,     4095,   'Orange', // 217.116.96.0/20
        1336147967,     131071, 'Orange', // 79.162.0.0/15
        1394180095,     16383,  'Telekomunikacja Polska, Neostrada, Gdańsk', // 83.25.64.0/18
        1394212863,     32767,  'Telekomunikacja Polska, Neostrada, Gdańsk', // 83.25.128.0/17
        1393164287,     65535,  'Telekomunikacja Polska, Neostrada, Olsztyn', // 83.9.0.0/16
        1394016255,     65535,  'Telekomunikacja Polska, Neostrada, Katowice', // 83.22.0.0/16
        1394540543,     65535,  'Telekomunikacja Polska, Neostrada, Katowice', // 83.30.0.0/16
        403701759,      1048575,        'Comcast', // 24.0.0.0/12
        1204813823,     1048575,        'Comcast', // 71.192.0.0/12
        -738040689,     15,     'iPlus', // 212.2.100.128/28
        -738040641,     15,     'iPlus', // 212.2.100.176/28
        -738040545,     15,     'iPlus', // 212.2.101.16/28
        -738041041,     15,     'iPlus', // 212.2.99.32/28
        -738040993,     15,     'iPlus', // 212.2.99.80/28
        -738041073,     15,     'iPlus', // 212.2.99.0/28
        1299447807,     262143, 'PlusNet', // 77.112.0.0/14
        1476128767,     4095,   'PlusNet', // 87.251.224.0/20
        1476129791,     1023,   'PlusNet', // 87.251.240.0/22
        1393950719,     65535,  'Telekomunikacja Polska, Neostrada, Szczecin', // 83.21.0.0/16
        1392836607,     65535,  'Telekomunikacja Polska, Neostrada', // 83.4.0.0/16
        1392902143,     65535,  'Telekomunikacja Polska, Neostrada', // 83.5.0.0/16
        1392967679,     65535,  'Telekomunikacja Polska, Neostrada', // 83.6.0.0/16
        1393033215,     65535,  'Telekomunikacja Polska, Neostrada', // 83.7.0.0/16
        1393229823,     65535,  'Telekomunikacja Polska, Neostrada', // 83.10.0.0/16
        1393295359,     65535,  'Telekomunikacja Polska, Neostrada', // 83.11.0.0/16
        1597112319,     65535,  'Telekomunikacja Polska, Neostrada', // 95.49.0.0/16
        1393885183,     65535,  'Telekomunikacja Polska, Neostrada, Poznań', // 83.20.0.0/16
        1394081791,     65535,  'Telekomunikacja Polska, Neostrada, Poznań', // 83.23.0.0/16
        1337655295,     65535,  'Telekomunikacja Polska, Neostrada, Poznań', // 79.186.0.0/16
        1337524223,     65535,  'Telekomunikacja Polska, Neostrada, Poznań', // 79.184.0.0/16
        1337589759,     65535,  'Telekomunikacja Polska, Neostrada, Poznań', // 79.185.0.0/16
        1394278399,     65535,  'Telekomunikacja Polska, Neostrada, Łódź', // 83.26.0.0/16
        1393098751,     65535,  'Telekomunikacja Polska, Neostrada, Bydgoszcz', // 83.8.0.0/16
        1394475007,     65535,  'Telekomunikacja Polska, Neostrada, Kraków', // 83.29.0.0/16
        1394147327,     65535,  'Telekomunikacja Polska, Neostrada, Warszawa', // 83.24.0.0/16
        1394606079,     65535,  'Telekomunikacja Polska, Neostrada, Warszawa', // 83.31.0.0/16
        1473110015,     8191,   'Netia', // 87.205.192.0/19
        1473114111,     4095,   'Netia', // 87.205.224.0/20
        1045938175,     255,    'Dialog, Bielsko', // 62.87.191.0/24
        1309171967,     255,    'Dialog, Bielsko', // 78.8.96.0/24
        1309172223,     255,    'Dialog, Bielsko', // 78.8.97.0/24
        1309172479,     255,    'Dialog, Bielsko', // 78.8.98.0/24
        1466527999,     255,    'Dialog, Bielsko', // 87.105.112.0/24
        1466528255,     255,    'Dialog, Bielsko', // 87.105.113.0/24
        1045933823,     255,    'Dialog, Elbląg', // 62.87.174.0/24
        1045947391,     255,    'Dialog, Elbląg', // 62.87.227.0/24
        1309151487,     255,    'Dialog, Elbląg', // 78.8.16.0/24
        1309151743,     255,    'Dialog, Elbląg', // 78.8.17.0/24
        1309151999,     255,    'Dialog, Elbląg', // 78.8.18.0/24
        1309152255,     255,    'Dialog, Elbląg', // 78.8.19.0/24
        1466524927,     255,    'Dialog, Elbląg', // 87.105.100.0/24
        1466524671,     255,    'Dialog, Elbląg', // 87.105.99.0/24
        1466516223,     255,    'Dialog, Jelenia Góra', // 87.105.66.0/24
        1466516479,     255,    'Dialog, Jelenia Góra', // 87.105.67.0/24
        1309176063,     255,    'Dialog, Łódź', // 78.8.112.0/24
        1309176319,     255,    'Dialog, Łódź', // 78.8.113.0/24
        1309176575,     255,    'Dialog, Łódź', // 78.8.114.0/24
        1309176831,     255,    'Dialog, Łódź', // 78.8.115.0/24
        1309177087,     255,    'Dialog, Łódź', // 78.8.116.0/24
        1309177343,     255,    'Dialog, Łódź', // 78.8.117.0/24
        1309177599,     255,    'Dialog, Łódź', // 78.8.118.0/24
        1309177855,     255,    'Dialog, Łódź', // 78.8.119.0/24
        1370012159,     255,    'Dialog, Łódź', // 81.168.185.0/24
        1370012415,     255,    'Dialog, Łódź', // 81.168.186.0/24
        1466520575,     255,    'Dialog, Łódź', // 87.105.83.0/24
        1466520831,     255,    'Dialog, Łódź', // 87.105.84.0/24
        1045942015,     255,    'Dialog, Lubin', // 62.87.206.0/24
        1045944063,     255,    'Dialog, Lubin', // 62.87.214.0/24
        1045944319,     255,    'Dialog, Lubin', // 62.87.215.0/24
        1045945087,     255,    'Dialog, Lubin', // 62.87.218.0/24
        1045945343,     255,    'Dialog, Lubin', // 62.87.219.0/24
        1309163775,     255,    'Dialog, Lubin', // 78.8.64.0/24
        1309164031,     255,    'Dialog, Lubin', // 78.8.65.0/24
        1309164287,     255,    'Dialog, Lubin', // 78.8.66.0/24
        1309164543,     255,    'Dialog, Lubin', // 78.8.67.0/24
        1309164799,     255,    'Dialog, Lubin', // 78.8.68.0/24
        1370007807,     255,    'Dialog, Lubin', // 81.168.168.0/24
        1370008063,     255,    'Dialog, Lubin', // 81.168.169.0/24
        1466558975,     255,    'Dialog, Lubin', // 87.105.233.0/24
        1466559231,     255,    'Dialog, Lubin', // 87.105.234.0/24
        1466559487,     255,    'Dialog, Lubin', // 87.105.235.0/24
        1466559743,     255,    'Dialog, Lubin', // 87.105.236.0/24
        1466559999,     255,    'Dialog, Lubin', // 87.105.237.0/24
        1466560255,     255,    'Dialog, Lubin', // 87.105.238.0/24
        1466560511,     255,    'Dialog, Lubin', // 87.105.239.0/24
        1466508031,     255,    'Dialog, Lubin', // 87.105.34.0/24
        1466508287,     255,    'Dialog, Lubin', // 87.105.35.0/24
        1045931263,     255,    'Dialog, Wałbrzych', // 62.87.164.0/24
        1045932031,     255,    'Dialog, Wałbrzych', // 62.87.167.0/24
        1309159679,     255,    'Dialog, Wałbrzych', // 78.8.48.0/24
        1309159935,     255,    'Dialog, Wałbrzych', // 78.8.49.0/24
        1309160191,     255,    'Dialog, Wałbrzych', // 78.8.50.0/24
        1309160447,     255,    'Dialog, Wałbrzych', // 78.8.51.0/24
        1309160703,     255,    'Dialog, Wałbrzych', // 78.8.52.0/24
        1309160959,     255,    'Dialog, Wałbrzych', // 78.8.53.0/24
        1309161215,     255,    'Dialog, Wałbrzych', // 78.8.54.0/24
        1309161471,     255,    'Dialog, Wałbrzych', // 78.8.55.0/24
        1370018303,     255,    'Dialog, Wałbrzych', // 81.168.209.0/24
        1466512127,     255,    'Dialog, Wałbrzych', // 87.105.50.0/24
        1466512383,     255,    'Dialog, Wałbrzych', // 87.105.51.0/24
        1370001407,     255,    'Dialog, Wrocław', // 81.168.143.0/24
        1045926655,     255,    'Dialog, Wrocław', // 62.87.146.0/24
        1045926911,     255,    'Dialog, Wrocław', // 62.87.147.0/24
        1045951231,     255,    'Dialog, Wrocław', // 62.87.242.0/24
        1045951487,     255,    'Dialog, Wrocław', // 62.87.243.0/24
        1045952511,     255,    'Dialog, Wrocław', // 62.87.247.0/24
        1045952767,     255,    'Dialog, Wrocław', // 62.87.248.0/24
        1309147391,     255,    'Dialog, Wrocław', // 78.8.0.0/24
        1309147647,     255,    'Dialog, Wrocław', // 78.8.1.0/24
        1309147903,     255,    'Dialog, Wrocław', // 78.8.2.0/24
        1309148159,     255,    'Dialog, Wrocław', // 78.8.3.0/24
        1309148415,     255,    'Dialog, Wrocław', // 78.8.4.0/24
        1466532863,     255,    'Dialog, Wrocław', // 87.105.131.0/24
        1466533119,     255,    'Dialog, Wrocław', // 87.105.132.0/24
        1466533375,     255,    'Dialog, Wrocław', // 87.105.133.0/24
        1466533631,     255,    'Dialog, Wrocław', // 87.105.134.0/24
        1466533887,     255,    'Dialog, Wrocław', // 87.105.135.0/24
        1466534143,     255,    'Dialog, Wrocław', // 87.105.136.0/24
        1466534399,     255,    'Dialog, Wrocław', // 87.105.137.0/24
        1466534655,     255,    'Dialog, Wrocław', // 87.105.138.0/24
        1466534911,     255,    'Dialog, Wrocław', // 87.105.139.0/24
        1466535167,     255,    'Dialog, Wrocław', // 87.105.140.0/24
        1466535423,     255,    'Dialog, Wrocław', // 87.105.141.0/24
        1466535679,     255,    'Dialog, Wrocław', // 87.105.142.0/24
        1466546431,     255,    'Dialog, Wrocław', // 87.105.184.0/24
        1466546687,     255,    'Dialog, Wrocław', // 87.105.185.0/24
        1466546943,     255,    'Dialog, Wrocław', // 87.105.186.0/24
        1466547967,     255,    'Dialog, Wrocław', // 87.105.190.0/24
        1466548223,     255,    'Dialog, Wrocław', // 87.105.191.0/24
        1466561791,     255,    'Dialog, Wrocław', // 87.105.244.0/24
        1466562047,     255,    'Dialog, Wrocław', // 87.105.245.0/24
        1466501119,     255,    'Dialog, Wrocław', // 87.105.7.0/24
        1466501375,     255,    'Dialog, Wrocław', // 87.105.8.0/24
        1045935615,     255,    'Dialog, Zielona Góra', // 62.87.181.0/24
        1466504703,     255,    'Dialog, Zielona Góra', // 87.105.21.0/24
        1466504959,     255,    'Dialog, Zielona Góra' // 87.105.22.0/24
);
 
dynamicIpsGadget.ip2long = function(ip) {
        var ip_array = ip.split('.');
        return Number(ip_array[3]) + 256 * (Number(ip_array[2]) + 256 * (Number(ip_array[1]) + 256 * ip_array[0]));
}
 
dynamicIpsGadget.isDynamic = function(ip) {
        var ip_long = this.ip2long(ip);
        for (var i = 0; i < this.list.length; i += 3) {
                if (this.list[i] == (ip_long | this.list[i+1]))
                        return this.list[i+2];
        }
        return false;
}
 
dynamicIpsGadget.createFmbox = function(text) {
        var table = document.createElement('table');
        table.className = 'fmbox fmbox-content';
        table.style.marginTop = '5px';
        table.style.marginBottom = '5px';
        var tr = document.createElement('tr');
        var td_image = document.createElement('td');
        td_image.className = 'mbox-image';
        var td_text = document.createElement('td');
        td_text.className = 'mbox-text';
        var image = document.createElement('img');
        image.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Emblem-important.svg/40px-Emblem-important.svg.png';
        image.height = 40;
        image.width = 40;
        td_image.appendChild(image);
        tr.appendChild(td_image);
        td_text.innerHTML = text;
        tr.appendChild(td_text);
        table.appendChild(tr);
        return table;
}
 
dynamicIpsGadget.init = function() {
	var address;
	// jeżeli to jest strona 'Blokuj'
	if (wgCanonicalSpecialPageName == "Blockip") {
		var blockip = document.getElementById('blockip');
		if (! blockip )
			return;
		address = blockip.wpBlockAddress.value;
	}
	else if (wgCanonicalNamespace == "User_talk") {
		address = wgTitle;
	}
	else if (wgCanonicalSpecialPageName == "Contributions") {
		var contentSub = document.getElementById('contentSub');
		if (!contentSub)
			return;
		var links = contentSub.getElementsByTagName('a');
		if (links.length) {
			var ip = links[0].href.match(/:(\d+\.\d+\.\d+\.\d+)(?:$|&)/);
			if (ip)
				address = ip[1];
		}
	}
 
	if (!address)
		return;
 
	if (!address.match(/^\d+\.\d+\.\d+\.\d+$/))
		return;
 
	var state = this.isDynamic(address);
	if (state) {
		var box = this.createFmbox(di$message.replace('$1', state));
		var bodyContent = document.getElementById('bodyContent');
		var jumptonav = document.getElementById('jump-to-nav');
		bodyContent.insertBefore(box, jumptonav);
		var wpBlockExpiry = document.getElementById('wpBlockExpiry');
		if (wpBlockExpiry) {
			wpBlockExpiry.value = di$blockExpiry;
			wpBlockExpiry.onchange();
		}
	}
}
 
addOnloadHook(function() {
	dynamicIpsGadget.init();
});