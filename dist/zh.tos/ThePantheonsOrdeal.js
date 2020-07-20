$('<div style="float: right; font-weight: bold;">第<input type="number" min="1" id="the_pantheons_ordeal" value="1" max="9999" />次通關</div>').appendTo('#thepantheonsordeal_tag');

	var monsterArray=[{"boss":0,"HP":100000},{"boss":0,"HP":200000},{"boss":0,"HP":300000},{"boss":0,"HP":400000},{"boss":0,"HP":500000},{"boss":0,"HP":600000},{"boss":0,"HP":700000},{"boss":0,"HP":800000},{"boss":0,"HP":900000},{"boss":0,"HP":1000000},{"boss":1,"HP":1200000},{"boss":1,"HP":1400000},{"boss":1,"HP":1600000},{"boss":1,"HP":1800000},{"boss":1,"HP":2000000},{"boss":1,"HP":2200000},{"boss":1,"HP":2400000},{"boss":1,"HP":2600000},{"boss":1,"HP":2800000},{"boss":1,"HP":3000000},{"boss":1,"HP":3400000},{"boss":1,"HP":3800000},{"boss":1,"HP":4200000},{"boss":1,"HP":4600000},{"boss":1,"HP":5000000},{"boss":1,"HP":5400000},{"boss":1,"HP":5800000},{"boss":1,"HP":6200000},{"boss":1,"HP":6600000},{"boss":1,"HP":7000000},{"boss":2,"HP":7400000},{"boss":2,"HP":7800000},{"boss":2,"HP":8200000},{"boss":2,"HP":8600000},{"boss":2,"HP":9000000},{"boss":2,"HP":9400000},{"boss":2,"HP":9800000},{"boss":2,"HP":10200000},{"boss":2,"HP":10600000},{"boss":2,"HP":11000000},{"boss":2,"HP":11600000},{"boss":2,"HP":12200000},{"boss":2,"HP":12800000},{"boss":2,"HP":13400000},{"boss":2,"HP":14000000},{"boss":2,"HP":14600000},{"boss":2,"HP":15200000},{"boss":2,"HP":15800000},{"boss":2,"HP":16400000},{"boss":2,"HP":17000000},{"boss":3,"HP":17600000},{"boss":3,"HP":18200000},{"boss":3,"HP":18800000},{"boss":3,"HP":19400000},{"boss":3,"HP":20000000},{"boss":3,"HP":20600000},{"boss":3,"HP":21200000},{"boss":3,"HP":21800000},{"boss":3,"HP":22400000},{"boss":3,"HP":23000000},{"boss":3,"HP":24000000},{"boss":3,"HP":25000000},{"boss":3,"HP":26000000},{"boss":3,"HP":27000000},{"boss":3,"HP":28000000},{"boss":3,"HP":29000000},{"boss":3,"HP":30000000},{"boss":3,"HP":31000000},{"boss":3,"HP":32000000},{"boss":3,"HP":33000000},{"boss":3,"HP":34000000},{"boss":3,"HP":35000000},{"boss":3,"HP":36000000},{"boss":3,"HP":37000000},{"boss":3,"HP":38000000},{"boss":3,"HP":39000000},{"boss":3,"HP":40000000},{"boss":3,"HP":41000000},{"boss":3,"HP":42000000},{"boss":3,"HP":43000000},{"boss":3,"HP":45000000},{"boss":3,"HP":47000000},{"boss":3,"HP":49000000},{"boss":3,"HP":51000000},{"boss":3,"HP":53000000},{"boss":3,"HP":55000000},{"boss":3,"HP":57000000},{"boss":3,"HP":59000000},{"boss":3,"HP":61000000},{"boss":3,"HP":63000000},{"boss":3,"HP":65000000},{"boss":3,"HP":67000000},{"boss":3,"HP":69000000},{"boss":3,"HP":71000000},{"boss":3,"HP":73000000},{"boss":3,"HP":75000000},{"boss":3,"HP":77000000},{"boss":3,"HP":79000000},{"boss":3,"HP":81000000},{"boss":3,"HP":83000000},{"boss":3,"HP":88000000}];
	
	function number_format(a) {
a=(a+"").split(".");return a[0].replace(/0{4}$/,"萬");
	}
	
	function get_exp(boss) {
		var exp;
		switch(boss) {
			case 0:
				exp = 1600;
				break;
			case 1:
				exp = 1800;
				break;
			case 2:
				exp = 2000;
				break;
			default:
				exp = 2500;
		}
		return exp;
	}
	
	$('.stageData').hide();
	$('.stageData').eq(0).show();
	
	$('#the_pantheons_ordeal').on('input',function() {
		var times = parseInt($(this).val())-1;
		if(times < 0||isNaN(times)) return;
		var stage = $('#mw-content-text .stageData').children().children('tr:last-child');
		var HP, boss;
		if (monsterArray[times]) {HP=monsterArray[times].HP;boss=monsterArray[times].boss;}
		else {HP=(times-100)*5000000+88000000;boss=3;}
		stage.children('td:nth-child(5)').text(number_format(HP));
		var title = $('#\\.E6\\.93\\.8A\\.E5\\.80\\.92\\.E6\\.B0\\.B8\\.E6\\.81\\.86\\.E4\\.B9\\.8B\\.E6\\.A7\\.8D');
		title.parent().next().find('td[title="經驗值"]').html(get_exp(boss)+'&nbsp;<span style="font-size:9pt">（'+Math.round(get_exp(boss))+' / 體）</span>');
		$('.stageData').css('display', 'none').eq(boss).css('display', 'table');
	});