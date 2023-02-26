//Generates building information table in each building page
function escRegEx(str) { return str.replace(/[\[\]\/\{\}\(\)\-\?\$\*\+\.\\\^\|]/g, "\\$&"); }
function prntf(s,r)
{
	var k = Object.keys(r);
	var i = k.length;
	while(i--) { s = s.replace(new RegExp(escRegEx('{'+k[i]+'}'),'g'),r[k[i]]); }
	return s;
}
function BT(t,k,p,s) // Seconds, format, precision, space
{
	var units = {
		second:['s','seconds','second'],
		minute:['m','minutes','minute'],
		hour:['h','hours','hour'],
		day:['D','days','day'],
		month:['M','months','month'],
		year:['Y','years','year']
	};
	var colors = {'second':'blue','minute':'blue','hour':'blue','day':'green','month':'orange','year':'red'};
	t = t || 0;
	k = k || 0; // 0: Short format, 1: Full format
	p = p || 6;
	var pt = p;
	s = s || ' ';
	if(!isFinite(t)){return ' \u221E ';}
	if(t < 0) t *= -1;
	var a = {'second':1,'minute':60,'hour':60,'day':24,'month':30,'year':365};
	var b = {};
	var l = {};
	var c = 1;
	for(var d in Object.keys(a))
	{
		c *= a[Object.keys(a)[d]];
		b[Object.keys(a)[d]] = c/(d==Object.keys(a).length-1?30:1);
		l[Object.keys(a)[d]] = [];
		for(var g=0;g<4;g++) { l[Object.keys(a)[d]][g] = units[Object.keys(a)[d]][g]; }
	}
	var i = Object.keys(a).length;
	var z = {};
	while(i--){z[Object.keys(a)[i]] = b[Object.keys(a)[i]];}
	t = Math.ceil(t);
	var retarr = [];
	for(var f in z)
	{
		var timeInSecs=Math.floor(t/z[f]);
		if(isNaN(timeInSecs)) {return retarr.join(' ');}
		if(pt>0 && (timeInSecs>0 || retarr.length>0))
		{
			t = t-timeInSecs*z[f];
			if(timeInSecs>0) { retarr.push('<span style=\'color:'+(p!=6?'grey':colors[f])+'\'>'+NumToStr(timeInSecs)+' '+l[f][k===0?k:(timeInSecs===1?2:1)]+'</span>'); }
			pt = timeInSecs===0 ? pt : (pt-1);
		}
	}
	return retarr.join(s);
}
function NumToStr(inputNum,outputSign,precision) // number, show + or -, precision
{
	precision = precision ? "10e" + (precision - 1) : 1;
	var ret, val, sign, i, j;
	var tho = ',';
	var dec = '.';
	if(!isFinite(inputNum)) { return '\u221E'; }
	sign = inputNum > 0 ? 1 : inputNum === 0 ? 0 : -1;
	if(sign)
	{
		val = (( Math.floor(Math.abs(inputNum * precision)) / precision ) + '').split('.');
		ret = val[1] !== undefined ? [dec, val[1]] : [];
		val = val[0].split('');
		i = val.length;
		j = 1;
		while(i--)
		{
			ret.unshift(val.pop());
			if(i && j % 3 === 0)
			{
				ret.unshift(tho);
			}
			j++;
		}
		if(outputSign)
		{
			ret.unshift(sign == 1 ? '+' : '-');
		}
		return ret.join('');
	}
	else return inputNum;
}
function img(i,t,a,c,w,h,l) // image, toolitip, alternative text, class, width, height, link
{
	var s = ' style="width:'+(w&&w!==''?w+'px':'auto')+';height:'+(h&&h!==''?h+'px':'auto')+'"';
	var p = i&&i!==''?'<img src="https://ikariam.fandom.com/wiki/Special:Filepath/'+i+'"'+(t&&t!==''?' data-tooltip="'+t+'"':'')+(' alt="'+(a&&a!==''?a:i.replace('_',' '))+'"')+(c&&c!==''?' class="'+c+' ikariam-tooltip"':'')+' data-image-key="'+i+'" data-image-name="'+i.replace('_',' ')+'"'+s+'>':'';
	return (l&&l!==''?'<a href="'+(l!==''?l:'/wiki/Special:Filepath/'+i)+'">':'')+p+(l&&l!==''?'</a>':'');
}
function icon(r,w,h) // icon, width, height
{
	var res = ['wood_small.gif','wine_small.gif','marble_small.gif','crystal_small.gif','sulphur_small.gif','ambrosia.png','gold_small.gif','icon_citizen.gif'];
	var rel = ['wood','wine','marble','crystal','sulphur','ambrosia','gold','citizen'];
	return img(res[r][0].toUpperCase()+res[r].slice(1),rel[r][0].toUpperCase()+rel[r].slice(1),rel[r][0].toUpperCase()+rel[r].slice(1),'image image-thumbnail link-internal',w?w:25,h?h:20,'/wiki/'+rel[r][0].toUpperCase()+rel[r].slice(1));
}
function lnk(u,t,i) // url, tooltip, 
{
	return '<a href="https://ikariam.fandom.com/wiki/'+u+'" class="ikariam-tooltip" data-tooltip="'+(i?i:(t?t:u))+'">'+t+'</a>'; // (t?t:u)
}
function Nth(n)
{
	n = parseInt(n) || 0;
	var s = ['th','st','nd','rd'];
	var v=n%100;
	return NumToStr(n,false,0)+'<sup>'+(Array.isArray(s)?(s[(v-20)%10]||s[v]||s[0]):s)+'</sup>';
}
function mul(p)
{
	p = parseInt(p);
	switch(true)
	{
		case (p >= 1 && p <= 5):
			return 3-0.25*p;
		case (p >= 6 && p <= 10):
			return 2.25-0.125*p;
		case (p >= 11 && p <= 20):
			return 0.875;
		case (p >= 21 && p <= 30):
			return 0.75;
		case (p >= 31 && p <= 50):
			return 0.5;
		case (p >= 51 || p <= 0):
			return 0;
	}
}
function calc(rank,townhall,level,type)
{
	var rk = !isNaN(parseInt(rank))?parseInt(rank):0;
	var tw = townhall?true:false;
	var lv = !isNaN(parseInt(level))?parseInt(level):0;
	var types = ['safe','resource','rsum'];
	var tp = types.indexOf(type);
	var cf = tp==-1?0:(tp<2?1:(tp==2?5:(tp==3?12:0)));
	return ((tw?100:0)+lv*480)*(tp>=1?mul(rk):1)*(tp==2?5:1);
}
function FaithTableGenerator()
{
	if($('table#FaithCalc').length==1)
	{
		var tds = '';
		var LD = {wondernames:['Hephaistos&apos; Forge','Hades&apos; Holy Grove','Demeter&apos;s Gardens','Temple of Athene','Temple of Hermes','Ares&apos; Stronghold','Temple of Poseidon','Colossus']};
		var durs = [7,4,9,7,1,3,1,3];
		for(var x=0;x<4;x++)
		{
			var r1 = '', r2 = '', r3 = '', r4 = '';
			for(var i=0;i<6;i++)
			{
				r1 += '<td><input id="t_'+(2*(x+1)-1)+'_'+i+'" name="t_'+(2*(x+1)-1)+'" type="radio" value="'+i+'"'+(i===0?' checked="checked"':'')+'></td>';
				r2 += '<td><input id="t_'+(2*(x+1))+'_'+i+'" name="t_'+(2*(x+1))+'" type="radio" value="'+i+'"'+(i===0?' checked="checked"':'')+'></td>';
				r3 += '<td><input id="t_'+(2*(x+1)+5)+'_'+i+'" name="t_'+(2*(x+1)+5)+'" type="radio" value="'+i+'"'+(i===0?' checked="checked"':'')+'></td>';
				r4 += '<td><input id="t_'+(2*(x+1)+6)+'_'+i+'" name="t_'+(2*(x+1)+6)+'" type="radio" value="'+i+'"'+(i===0?' checked="checked"':'')+'></td>';
			}
			tds += '<tr style="border:1px solid black"><td '+(x<3?' rowspan="2"':'')+' style="border:1px solid black">'+img(LD.wondernames[2*x]+'.gif',LD.wondernames[2*x],LD.wondernames[2*x],'','',50,LD.wondernames[2*x])+'<br><i>'+lnk(LD.wondernames[2*x],LD.wondernames[2*x],LD.wondernames[2*x])+'</i></td><td id="cd_'+(2*(x+1)-1)+'" '+(x<3?' rowspan="2"':'')+' style="width:80px;border:1px solid black">'+BT(durs[2*x]*864e2)+'</td><td '+(x<3?' rowspan="2"':'')+'>'+img(LD.wondernames[2*x+1]+'.gif',LD.wondernames[2*x+1],LD.wondernames[2*x+1],'','',50,LD.wondernames[2*x+1])+'<br><i>'+lnk(LD.wondernames[2*x+1],LD.wondernames[2*x+1],LD.wondernames[2*x+1])+'</i></td><td id="cd_'+(2*(x+1))+'" '+(x<3?' rowspan="2"':'')+' style="width:80px;border:1px solid black">'+BT(durs[2*x+1]*864e2)+'</td><td style="border:1px solid black"'+(x<3?'':'')+'>'+(x<3?(2*(x+1)-1)+'<sup>'+(x==0?'st':(x==1?'rd':'th'))+'</sup>':img('crown.png','Μορφή πολιτεύματος','Form of Government','','','','Form of Government'))+'</td>'+(x<3?r1+'<td style="border:1px solid black">'+(2*(x+1)+5)+'<sup>th</sup></td>'+r3:'<td colspan="8" style="border:1px solid black"><label for="gov_theo"><input id="gov_theo" name="gov" type="radio" value="80"> Theocracy</label><br><label for="gov_rest"><input id="gov_rest" name="gov" type="radio" value="100" checked="checked"> Form of Government<br>except Theocracy</label></td><td colspan="5" style="border:1px solid black"><input id="btnClear" type="button" value="Reset"><br><input id="btnCalc" type="Button" value="Calculate"></td>')+'</tr>'+(x<3?'<tr style="border:1px solid black"><td style="border:1px solid black">'+(2*(x+1))+'<sup>'+(x==0?'nd':'th')+'</sup>'+'</td>'+(x<3?r2+'<td style="border:1px solid black">'+(2*(x+1)+6)+'<sup>th</sup></td>'+r4:'')+'</tr>':'')+'';
		}
		$('table#FaithCalc > tbody').append(tds);
		$('input#btnClear').on('click',function()
		{
			$('[id^="t_"][id$="_0"]').prop('checked',true);
			$('[id^="cd_"]').each(function(k,dr)
			{
				$(dr).html(BT(durs[(parseInt($(dr).attr('id').replace(/\D+/g,''))-1)]*864e2));
			});
			$('#gov_rest').prop('checked',true);
		});
		$('input#btnCalc').on('click',function()
		{
			var temple = 0;
			$('[id^="t_"]:checked').each(function(k,c)
			{
				temple += parseInt($(c).val());
			});
			temple = temple <= 5 ? 5 : temple;
			var gov = parseInt($('[id^="gov_"]:checked').val()!=undefined ? $('[id^="gov_"]:checked').val() : 100);
			$.each(durs,function(k,dr)
			{
				$('[id^="cd_"]:eq('+k+')').html(BT(4320*dr*gov/temple));
			});
		});
	}
}
var createForestMineTable = function(jsn)
{
	var res = '';
	switch(jsn.name)
	{
		case 'Saw mill':
			res = 'forest';
			break;
		case 'Vineyard':
		case 'Quarry':
		case 'Crystal mine':
		case 'Sulphur pit':
			res = 'mine';
			break;
	}
	var plus = {
		'Saw mill':['Steam Saw gives<br /><b>20 %</b> more production.','Steam Saw','SteamSaw','Forester&apos;s House','Foresters_house_l.png'],
		'Vineyard':['Steam Wine Press gives<br /><b>20 %</b> more production.','Steam Wine Press','SteamWinePress','Winery','Winegrower_l.png'],
		'Quarry':['Steam Hammer gives<br /><b>20 %</b> more production.','Steam Hammer','SteamHammer','Stonemason','Stonemason_l.png'],
		'Crystal mine':['Steam Crystal Drill gives<br /><b>20 %</b> more production.','Steam Crystal Drill','SteamCrystalDrill','Glassblower','Glassblower_l.png'],
		'Sulphur pit':['Steam Sulfur Paddle Wheel gives<br /><b>20 %</b> more production.','Steam Sulfur Paddle Wheel','SteamSulfurPaddleWheel','Alcemist&apos;s Tower','Alchemists tower l.png']
	};
	var data = {
		forest: {wood:jsn.wood,workers:jsn.workers,wambro:jsn.wambro,time:7200},
		mine: {wood:jsn.wood,workers:jsn.workers,wambro:jsn.wambro,time:14400}
	};
	if(res!=='')
	{
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).css({'width':jsn.tsize+'%','font-size':'100%'}).find('tbody').before('<thead></thead>').after('<tfoot></tfoot>');
		var rows = '';
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody > tr').each(function(k,row)
		{
			if(k<3)
			{
				if(k===0) { $(row).find('th').text('Levels '+jsn.range[0]+' to '+jsn.range[1]); }
				$(row).detach().appendTo('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' > thead');
			}
			else if(k>$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody > tr').length)
			{
				$(row).detach().appendTo('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' > tfoot');
			}
		});
		var durs = [];
		for(var a=0;a<60;a++)
		{
			durs[a] = a>0 ? Math.round(data[res].time*Math.pow(1.1,a+1)-data[res].time) : 0;
		}
		var accwood = [];
		var accwrk = [];
		var accambro = [];
		var accdurs = [];
		data[res].wood.reduce(function(a,b,i) { return accwood[i] = a+b; },0);
		data[res].workers.reduce(function(a,b,i) { return accwrk[i] = a+b; },0);
		data[res].wambro.reduce(function(a,b,i) { return accambro[i] = a+b; },0);
		durs.reduce(function(a,b,i) { return accdurs[i] = a+b; },0);
		var coef = [0,0,20,10,20,20,10,20,30,40,30,30,40,30,50,50];
		var HH = ['',' with '+lnk('Research:Helping_Hands','Helping Hands','Helping Hands'),' with '+lnk('Research:Helping_Hands','Helping Hands','Helping Hands')+' and '+lnk('Technocracy','Technocracy','Technocracy'),' with '+lnk('Research:Helping_Hands','Helping Hands','Helping Hands')+'<br> and '+lnk('Xenocracy','Xenocracy','Xenocracy')+' from '+lnk('Technocracy','Technocracy','Technocracy')];
		var HHv = [0,12.5,15,13.75];
		var dvtxt = [];
		for(var n=jsn.range[0]-1;n<jsn.range[1];n++)
		{
			dvtxt[0] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip" data-tooltip="Number of cities<br/>that are on the island">Cities</th><th class="ikariam-tooltip" data-tooltip="Cost distribution<br/>per city that is on the island">Cost</th></tr></thead><tbody>';
			dvtxt[1] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip" data-tooltip="Number of cities<br/>that are on the island">Cities</th><th class="ikariam-tooltip" data-tooltip="Accumulative Cost distribution<br/>per city that is on the island">Cost</th></tr></thead><tbody>';
			dvtxt[2] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td class="title3" style="font-size: 110%; white-space: nowrap;" colspan="2">'+NumToStr(data[res].wambro[n])+' '+icon(0)+' for 1 '+icon(5,16,22)+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Number of cities<br/>that are on the island">Cities</th><th class="ikariam-tooltip" data-tooltip="Cost distribution<br/>per city that is on the island">Cost</th></tr></thead><tbody>';
			dvtxt[3] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td class="title3" style="font-size: 110%; white-space: nowrap;" colspan="2">'+NumToStr(data[res].wambro[n])+' '+icon(0)+' for 1 '+icon(5,16,22)+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Number of cities<br/>that are on the island">Cities</th><th class="ikariam-tooltip" data-tooltip="Accumulative Cost distribution<br/>per city that is on the island">Cost</th></tr></thead><tbody>';
			dvtxt[4] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip title3" rowspan="2" colspan="2" data-tooltip="Maximum basic production<br />with no other effect">'+img('Saw mill worker small.png','Saw mill','Saw mill','image',15,20,'Saw mill')+'</th><th class="title3">'+NumToStr(data[res].workers[n+1])+'</th><th class="ikariam-tooltip title3" colspan="16" data-tooltip="All possible combinations<br />to accumulate effects">Combinations</th></tr><tr><td>100 %</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Cinetheater gives<br /><b>20 %</b> more production for <b>12</b> hours.">'+img('Cinetheater.gif','Cinetheater','Cinetheater','image',23,20,'Building:Cinetheater')+'</th><td>20 %</td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Helios tower gives<br /><b>10 %</b> more production<br />for the period it is activated.">'+img('Helios_Tower.png','Helios Tower','Helios Tower','image',11,20,'Building:Helios_Tower')+'</th><td>10 %</td><td></td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="'+plus[jsn.name][0]+'">'+img(plus[jsn.name][2]+'34px.png',plus[jsn.name][1],plus[jsn.name][1],'image',20,20,plus[jsn.name][1])+'</th><td>20 %</td><td></td><td></td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="The building <b>'+plus[jsn.name][3]+'</b> gives<br />up to <b>100 %</b> more production.">'+img(plus[jsn.name][4],plus[jsn.name][3],plus[jsn.name][3],'image',25,20,'Building:Forester%27s_House')+'</th><td></td><td></td><td>+</td><td></td><td></td><td></td><td>+</td><td>+</td><td>+</td><td></td><td></td><td></td><td>+</td><td>+</td><td>+</td><td></td><td>+</td></tr></thead><tbody><tr><th class="title3" rowspan="52">P<br>r<br>o<br>d<br>u<br>c<br>t<br>i<br>o<br>n<br> <br>B<br>u<br>i<br>l<br>d<br>i<br>n<br>g<br> <br>L<br>e<br>v<br>e<br>l<br>s</th><td class="ikariam-tooltip title3" data-tooltip="The building <b>'+plus[jsn.name][3]+'</b>.">Level</td><td class="ikariam-tooltip title3" data-tooltip="The production increase percentage that causes<br />each level of the building <b>'+plus[jsn.name][3]+'</b>.">(%)</td><td class="ikariam-tooltip title3" colspan="16" data-tooltip="The final production after implementing<br />the respective combinations.">Production{0}</td></tr>';
			for(var i=0;i<17;i++)
			{
				dvtxt[0] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+NumToStr(data[res].wood[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+NumToStr(Math.ceil(data[res].wood[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+NumToStr(Math.ceil(data[res].wood[n]/(i+1)))+' '+icon(0)+'</td></tr>';
				dvtxt[1] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+NumToStr(accwood[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+NumToStr(Math.ceil(accwood[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+NumToStr(Math.ceil(accwood[n]/(i+1)))+' '+icon(0)+'</td></tr>';
				dvtxt[2] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+NumToStr(data[res].wambro[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+NumToStr(Math.ceil(data[res].wambro[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+NumToStr(Math.ceil(data[res].wambro[n]/(i+1)))+' '+icon(5,16,22)+'</td></tr>';
				dvtxt[3] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+NumToStr(accambro[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+NumToStr(Math.ceil(accambro[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+NumToStr(Math.ceil(accambro[n]/(i+1)))+' '+icon(5,16,22)+'</td></tr>';
			}
			dvtxt[0] += '</tbody></table>';
			dvtxt[1] += '</tbody></table>';
			dvtxt[2] += '</tbody></table>';
			dvtxt[3] += '</tbody></table>';
			for(var q=0;q<4;q++)
			{
				dvtxt[q+5] = prntf(dvtxt[4],[HH[q]]);
				for(var y=0;y<51;y++)
				{
					dvtxt[q+5] += '<tr>';
					dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="'+(y==0 ? 'The building <b>'+plus[jsn.name][3]+'</b> has not been constructed.' : 'The <b>'+Nth(y)+'</b> level of the building <b>'+plus[jsn.name][3]+'</b> .')+'">'+y+'</td>';
					dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="'+(y==0 ? 'The building <b>'+plus[jsn.name][3]+'</b> does not increase production<br />because it has not been constructed.' : 'The building <b>'+plus[jsn.name][3]+'</b><br>increase production<br />by <b>'+(y*2)+' %.')+'">'+(y*2)+'</b> %</td>';
					for(var x=0;x<16;x++)
					{
						dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><th colspan=&quot;3&quot;>Effect</th></tr><tr><th>Type</th><th>Percentage</th><th>Production</th></tr><tr><td style=&quot;text-align:left&quot;>Basic</td><td>100 %</td><td>'+NumToStr(data[res].workers[n+1])+'</td></tr>'+([2,5,8,9,11,12,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>Cinetheater</td><td>20 %</td><td>'+NumToStr(data[res].workers[n+1]*20/100)+'</td></tr>' : '')+([3,6,8,10,11,13,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>Helios Tower</td><td>10 %</td><td>'+NumToStr(data[res].workers[n+1]*10/100)+'</td></tr>' : '')+([4,7,9,10,12,13,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>'+plus[jsn.name][1]+'</td><td>20 %</td><td>'+NumToStr(data[res].workers[n+1]*20/100)+'</td></tr>' : '')+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 && y>0 ? '<tr><td style=&quot;text-align:left&quot;>'+plus[jsn.name][3]+'</td><td>'+NumToStr(y*2)+' %</td><td>'+NumToStr(data[res].workers[n+1]*y*2/100)+'</td></tr>' : '')+(HHv[q]!=0 ? '<tr><td style=&quot;text-align:left&quot;>Helping Hands</td><td>12.5 %</td><td>'+NumToStr(data[res].workers[n+1]*12.5/100)+'</td></tr>' : '')+(HHv[q]==15 ? '<tr><td style=&quot;text-align:left&quot;>Technocracy</td><td>2.5 %</td><td>'+NumToStr(data[res].workers[n+1]*2.5/100)+'</td></tr>' : '')+(HHv[q]==13.75 ? '<tr><td style=&quot;text-align:left&quot;>Xenocracy</td><td>1.25 %</td><td>'+NumToStr(data[res].workers[n+1]*1.25/100)+'</td></tr>' : '')+(coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q]>0 ? '<tr><th>Sum</th><th>'+NumToStr((100+coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q]))+' %</th><th>'+NumToStr(data[res].workers[n+1]*(100+coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q])/100)+'</th></tr>' : '')+'</table>">'+NumToStr(data[res].workers[n+1]*(100+coef[x]+(y*2)+HHv[q])/100)+'</td>';
					}
					dvtxt[q+5] += '</tr>';
				}
				dvtxt[q+5] += '</tbody></table>';
			}
			rows += '<tr><th>'+(n+1)+'</th><td>'+(n===0?'<span style="color:gray;">-</span>':'<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><td'+(data[res].wood[n] === 0 ? '' : ' colspan="2"')+'>'+icon(0)+'</td><td'+(data[res].wambro[n] === 0 ? '' : ' colspan="2"')+'>'+icon(5,16,22)+'</td></tr><tr><td class="'+(data[res].wood[n] === 0 && accwood === 0 ? 'ikariam-tooltip" data-tooltip="There is no resources cost for this level!">'+NumToStr(data[res].wood[n]) : (data[res].wood[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no wood donation cost!">'+NumToStr(data[res].wood[n]) : '">'+NumToStr(data[res].wood[n])))+'</td>'+(data[res].wood[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[0]+'</div></td>')+'<td class="'+(data[res].wambro[n] === 0 && accambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There is no option the buy wood with Ambrosia!">'+NumToStr(data[res].wambro[n]) : (data[res].wambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no Ambrosia cost data!">'+NumToStr(data[res].wambro[n]) : '">'+NumToStr(data[res].wambro[n])))+'</td>'+(data[res].wambro[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[2]+'</div></td>')+'</tr><tr><td class="'+(data[res].wood[n] === 0 && accwood === 0 ? 'ikariam-tooltip" data-tooltip="There is no resources cost for this level!">('+NumToStr(accwood[n])+')' : (data[res].wood[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no wood donation cost data!">('+(data[res].wood[n] === 0 ? 0 : NumToStr(accwood[n]))+')' : '">('+NumToStr(accwood[n])+')'))+'</td>'+(data[res].wood[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[1]+'</div></td>')+'<td class="'+(data[res].wambro[n] === 0 && accambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There is no option to buy wood with Ambrosia!">('+(data[res].wambro[n] === 0 ? 0 : NumToStr(accambro[n]))+')' : (data[res].wambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no Ambrosia cost data!">('+(data[res].wambro[n] === 0 ? 0 : NumToStr(accambro[n]))+')' : '">('+NumToStr(accambro[n])+')'))+'</td>'+(data[res].wambro[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[3]+'</div></td>')+'</tr></table>')+'</td><td style="white-space:nowrap">'+(n===0?'<span style="color:gray;">-</span>':'<span class="ikariam-tooltip" data-tooltip="The real building time<br />(Form of government has no effect)<br /><b>'+BT(durs[n],1)+'</b>">'+BT(durs[n])+'</span><br>(<span class="ikariam-tooltip" data-tooltip="The accumulative building time<br />(Form of government has no effect)<br /><b>'+BT(accdurs[n],1)+'</b>">'+BT(accdurs[n])+'</span>)')+'</td><td style="white-space:nowrap"><div class="expandcollapsetable">'+NumToStr(data[res].workers[n+1])+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[5]+'</div></div><div class="expandcollapsetable">('+NumToStr(data[res].workers[n+1]*1.125)+')<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[6]+'</div></div><div class="expandcollapsetable">With '+lnk('Technocracy','Technocracy','Technocracy')+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[7]+'</div></div><div class="expandcollapsetable">With '+lnk('Xenocracy','Xenocracy','Xenocracy')+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[8]+'</div></div></td><td><div class="ikariam-tooltip" style="display:inline-block;margin:auto;text-align:right" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><th colspan=2>Workers</th></tr><tr><th>Type</th><th>Quantity</th></tr><tr><td style=text-align:left>Skilled</td><td style=text-align:right>'+NumToStr(data[res].workers[n+1])+'</td></tr><tr><td style=text-align:left>Unskilled</td><td style=text-align:right>'+NumToStr(data[res].workers[n+1]/2)+'</td></tr><tr><th>Sum</th><th style=text-align:right>'+NumToStr(data[res].workers[n+1]*3/2)+'</th></tr></table>">'+NumToStr(data[res].workers[n+1])+'<br>'+NumToStr(data[res].workers[n+1]/2)+'<hr>'+NumToStr(data[res].workers[n+1]*3/2)+'</div></td></tr>';
		}
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody').append(rows);
	}
}
function translate(lang)
{
	var arr = ['citytitle','citynum','wlvls','safeqnty','safewoodqnty','safewineqnty','safemarbleqnty','safecrystalqnty','safesulfurqnty','safesumqnty','sum','townsum','levelsum','safesum','woodsum','winesum','marblesum','glasssum','sulfursum','resqntysum'];
	$('#flags > img').each(function(x,i) { $(i).css({'cursor':'pointer','opacity':'1.0'}); });
	$('[id="'+lang+'"]').css({'cursor':'default','opacity':'0.5'});
	$('#rank').before(lg[lang].rnklbl+': ');
	$('#rewardtable > thead > tr:first > th').contents().first().each(function(){$(this).replaceWith(lg[lang].rcvdres)});
	$('#rank_v').text(NumToStr(mul($('#rank').val()),false,3).replace(/0+$/,'').replace(/[,.]$/,''));
	$('#rewardtable > thead > tr:last > th:first').attr('title',lg[lang].citytitle).text(lg[lang].city);
	$('#rewardtable > thead > tr:last > th').each(function(k,th)
	{
		$(th).attr('title',lg[lang][arr[k]]);
		switch(k)
		{
			case 0:
				$(th).text(lg[lang].city);
				break;
			case $('#rewardtable > thead > tr:last > th').length-1:
				$(th).text(lg[lang].sum);
				break;
		}
	});
	
	$('#rewardtable > tfoot > tr > th').each(function(k,th)
	{
		switch(k)
		{
			case 0:
				$(th).text(lg[lang].sum);
				break;
			default:
				$(th).attr('title',lg[lang][arr[k+10]]);
				break;
		}
	});
	
	$('#townsum').text($('input[id^="town"]:checked').length);
	var lsum = 0;
	var sfsum = 0;
	var ressum = 0;
	$('input[id^="town"]:checked').each(function()
	{
		$(this).parents('tr').css('opacity','1.0').find('input[type="number"]').prop('disabled',false);
		var lv = parseInt($(this).parents('tr').find('input[type="number"]').val());
		lsum += lv;
		sfsum += calc($('#rank').val(),true,lv,'safe');
		$(this).parents('tr').find('td[id^="safe"]').text(NumToStr(calc($('#rank').val(),true,lv,'safe'),false,0));
		$(this).parents('tr').find('td[id^="wood"],td[id^="wine"],td[id^="marble"],td[id^="glass"],td[id^="sulfur"]').text(NumToStr(calc($('#rank').val(),true,lv,'resource'),false,0));
		ressum += calc($('#rank').val(),true,lv,'resource');
		$(this).parents('tr').find('td[id^="citysum"]').text(NumToStr(calc($('#rank').val(),true,lv,'rsum'),false,0));
	});
	
	$('input[id^="town"]:not(:checked)').each(function()
	{
		$(this).parents('tr').css('opacity','0.5').find('input[type="number"]').prop('disabled',true).val(0).parents('tr').find('td:gt(2)').text('0');
	});
	
	$('#levelsum').text(NumToStr(lsum,false,0));
	$('#safesum').text(NumToStr(sfsum,false,0));
	$('#woodsum,#winesum,#marblesum,#glasssum,#sulfursum').text(NumToStr(ressum,false,0));
	$('#sum').text(NumToStr(ressum*5,false,0));
}

var lang = 'en';
var lg = {
		en: {
			flag: 'R0lGODlhGgASAPcAAMwKBMyGdMRSPOzGtAQOTPTi1ISGpERKdOTi7MQ+RNSmtKwqJCQqZGxqjPT27MxqVLQ6LMTC1LyinMxudKSmvOTq7LxaZNSapDQ6bNTS3BQeVLwyLMy2xOTq9IyGnJyWrIx6jPT2/Mx6ZMReVAwWVPTq5CwyZLxGNOSmjNR+hNza5KwaFFRahPz69LQ+PKyuxPTq7LQyNLSOjLxOVPTWxPTi5ISOrLyytLwqLPTy9MQ6LMzK1MxibDxCdOzS3Hx6nNR+bCw2bOSenNQaFMSuxMSSjOTGzAQSTExSfPTm7LRGTLwuJHRylMRqbLw+LMx2fOzu7MxiXMSetDQ+dCQmXLw2LOS6xPTu9JyivMR2bAwaVNR+jOS2pPT29MzK3NQmHNSOfNROPPTi3IyGpERKfOTm7LxCTLQqJCQuZGxulMxyXLw6LNSilMxufOzq7MRaZNyapDw+bNTW5BwiXMQyLLy+zOzu9JyarIR6lPz6/NR6ZMxmTPTu5DQ2ZOSmlNze5FxijNSKlNSWnJySrISCnNQmJLSyxOyinOy6pPTu7PTm5OzW3MSyxOTKzNSCjLwyNMROVNTK1DQ2bAwSTBQaVPz29AAAAAAAAJhKAOHTABIAAAAAADR0AADjAAASAMAAAJyFAPcrABKDAAB8ABgAaO4AnpEAgHwAfHAA/wUA/5IA/3wA//8AYP8Anv8AgP8AfG0ADwUBAJIAAHwAAErpD/QrAICDAHx8AACYAADj8BUSEgAAAADE/wAr/wCD/wB8/3AAADwAABUAAAAAAABQoAH25AAXEgAAAAA09gBkWACDTAB8AFf/gPT/5ID/Enz/AIScd+PkMBISTwAAAHBttDxk5BWDEgB8AAA0NABMZABPgwAAfF4gO+NV5RJPEgAAAAEA7wAB/wAA/wAAf8CYLOLj5RISEgAAAOYAUKYB9gEAFwAAAAWINABkZACDgwB8fPABUOEA9hIAFwAAAAMASgAw0wAwAAAAANj4AOKWABIXAABEABgAze4A/5EAR3wAACH5BAAAAAAALAAAAAAaABIABwj/AJvAcGCAEoGDBxkcAgBACBqEB+d8SLEigAAXRvLU6QMRzUIAhxggnHSAAyQdA7owAXMmUI4ODUgk/Hjo4aRJY+AsUVNCDhkCPSScmOGjywsqBDwyDEkAAxEeSxBVwjIHoQZCIhbAqfSHhVKQkggpePSgQAdACClR0kKJBZs1ExJVMiRkaSRHG/w48BJHixYSlMogKJMEQY5EYnLkyUOzkpgSLfJc+VNGUZkyhTJr3lxoCMMhnEMzHE26tOnTqFOj/lKItWvWmT0DGPK6dWvXCChTLrM4h6IcNHvDyFEhdxnKJNhqofIhhBElI27UBZkhj5gRbzj0AAwYYY8dXQQtacjSwMRHIZJsHAby6AJahCR+uKlhAYIMDAQULn2IREULLnS0MUhVfdSRhxUxqIGHQfnRJBIBc1AQQgF7JCBFHG5c8QQERRwAkX4gPXTQJICUUQkKS2yxiBl7gFBVRzSJiBAaL+RBQxgBAQA7',
			tho: ',',
			dec: '.',
			rnklbl: 'Select your current position in the piracy highscore list',
			rcvdres: 'Resources you can receive with piracy',
			city: 'City',
			citytitle: '# of cities',
			citynum: 'Select the number of cities you own',
			wlvls: 'Set the sum of your warehouse levels',
			safeqnty: 'Safe resource quantity per city',
			safewoodqnty: 'Safe wood quantity per city',
			safewineqnty: 'Safe wine quantity per city',
			safemarbleqnty: 'Safe marble quantity per city',
			safecrystalqnty: 'Safe crystal quantity per city',
			safesulfurqnty: 'Safe sulfur quantity per city',
			safesumqnty: 'Sum of Safe resource quantity per city',
			sum: 'Sum',
			townsum: 'Total number of cities',
			levelsum: 'Total number of warehouse levels',
			safesum: 'Total safe resources quantity',
			woodsum: 'Total wood quantity',
			winesum: 'Total wine quantity',
			marblesum: 'Total marble quantity',
			glasssum: 'Total crystal quantity',
			sulfursum: 'Total sulfur quantity',
			resqntysum: 'Total resources quantity',
		}
	};
	
$(document).ready(function()
{
	var createtableinterv = setInterval(function()
	{
		$.ajax(
		{
			success: function()
			{
				var callbacks = $.Callbacks();
				callbacks.empty();
				var tab = $('[id^="flytabs_"] > ul > li.selected > a > span');
				var tabs = $('[id^="flytabs_"] > ul.tabs > li').length;
				if($(tab).length==0)
				{
					var div = $('[id^="jsjson-"]').html();
				}
				else if($(tab).length==1)
				{
					var div = $('#jsjson-'+$(tab).text()).html();
				}
				var jsn = div?JSON.parse(div.substr(div.indexOf('{'),div.lastIndexOf('}')-2)):{};
				if($.isEmptyObject(jsn)===false)
				{
					if($('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).length==1 && $('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' > thead').length==0)
					{
						callbacks.add(createForestMineTable);
						callbacks.fire(jsn);
						callbacks.remove(createForestMineTable);
						$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' .expandcollapsetable .indicator').click(function(e)
						{
							var target = e.target;
							$(target).nextAll('div.info-div').slideToggle('fast','linear',function()
							{
								$(target).parent().toggleClass('active');
							});
						});
						$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' .ikariam-tooltip').hover(function(e)
						{
							var txt = '';
							var attrs = $(this).attr('data-tooltip').split('|');
							if(attrs.length==1)
							{
								txt = attrs[0];
							}
							$(this).removeAttr('title');
							$('body').appendTo('body');
							$('<div id="ikariam-tooltip-content" class="WikiaArticle" style="border:1px solid #F1D031;color:#444;background:#fbeecb;box-shadow:0 2px 2px #999;position:absolute;padding:2px;text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;z-index:6000000;margin:0px;min-height:0px;overflow:hidden;font-size:14px;display:none"></div>').html(txt).appendTo('body');
							$('#ikariam-tooltip-content').css('display','inline-block').fadeIn('fast');
						},function()
						{
							$('#ikariam-tooltip-content').remove();
						}).mousemove(function(e)
						{
							var o = 10;
							var cX = e.pageX;
							var cY = e.pageY;
							var wW = $(window).width();
							var wH = $(window).height();
							var t = $('#ikariam-tooltip-content');
							var tW = t.width()+parseInt(t.css('padding-left'))+parseInt(t.css('padding-right'));
							var tH = t.height()+parseInt(t.css('padding-top'))+parseInt(t.css('padding-bottom'));
							var tL = cX+o;
							if(tL+tW>$(window).scrollLeft()+wW) { tL = $(window).scrollLeft()+wW-tW*2; }
							else if(tL-tW<$(window).scrollLeft()) { tL = $(window).scrollLeft()+tW; }
							var tT = cY+o;
							if(tT+tH>$(window).scrollTop()+wH) { tT = $(window).scrollTop()+wH-tH; }
							else if(tT-tH<$(window).scrollTop()) { tT = $(window).scrollTop(); }
							$('#ikariam-tooltip-content').css({'top':tT+'px','left':tL+'px'})
						});
					}
				}
				if($('[id^="forestminetable-"]').length==tabs)
				{
					clearInterval(createtableinterv);
				}
			}
		});
	},1000);
});
// Global Tooltip customization
$(document).ready(function()
{
	mw.hook('wikipage.content').add(function($content)
	{
		try
		{
			if($('#firstHeading').text().trim()=='Pirate Fortress')
			{
				$('#rewardscalc').html('<form><label for="rank"><input type="number" id="rank" name="rank" min="1" max="50" value="1" step="1" style="width:40px"></label></form><table id="rewardtable" class="darktable zebra" style="display:inline;color:#000;font-weight:normal;font-size:11px;background-color:transparent;border:0px;overflow:auto"><thead><tr><th colspan="10" style="text-align:center">'+lg['en'].rcvdres+'<div style="font-weight:normal">(<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC"> × <span id="rank_v">2,75</span> = '+icon(0,13,10)+'+<img src="data:image/gif;base64,R0lGODlhGgAUAPZ9AA8KCScZFjY2FjslJFMzM0VAG3pIC0xzC15KNzNedXNIR2tWQnRgTXtoVYdUD5dlFaNyHIteK61+IolSUp5cXYFuW4VzYYh2Y415ZI58abRqasV4dlyJD2ibEHOtEnuPNHSlILeLLYWrN8qfNIfIFbuXXZOBbZmHdbGafMGWQdStQuG8Tc6sbd++YKHKT+3KU+/QbPXVY+zPefPWeEWGpV2TrE+Ut2ees2OrzmqszXqyzW2y1G+53ny20nK323a63Hu/4X/A4aCQgKqbi7mihbSnmIyoqZmuq5OytqWxpa2zpL+0pLu+q8qvidW4jNy+lMS7oMS5q7vHvePGi/XahejIl+XHnebInO/anv7kg9jEqNbKrM3Cs8LKvtPKvOzPpenRrfXlvYzA15TD2ITD4onH5o3J5pPK5JvN5ZXN6JbQ7qLQ5qTT667Z7bTa7Lrd7Lvh8s3QwcnUzc/YztvSxOXayenj2crg5s7p9tLr99bu+PXw6Pz37wAAAAAAAAAAACH5BAUAAH0ALAAAAAAaABQAAAf/gH2Cg3ZCKIOIfU4HHCBOiYhLdg0ZF02QHYwgLpCCWl51CxcNFZBEHIxEnWBeXEN2GA0NiU4EAQUHHR2QdEtFXnsNJhlPg04UAxMbAh0cHom9dkV7CycnJn1XA8kbEwAfzh0kglZ2UXVeXnYIGRXYVxrdAQEEJBwdHs9WdF4ZGSdR1jGoMMvJAAIEAGygkAvfLi+9KDGwQAcBAgYM+kwgoEyBggFONnAgsatTJydOFDwaRISECEhVXpQwSRMSFRgwSlQxuSVOzTAxwoSAEKHTER9l5pjkIwNLFhgPHjiYIojJGSlGyASpkQTSlykzZsQYkcLACgOCkKQx08MHkARyZhLxwTJjxIoXD1ZAkOBAkJI3QH6MoaFDDaK5VFqEqPtAxQoHDwbdYIMjjRs8QLoMwtIiRYgYKiQ8SPFCtCAoZ3LsgIMGTh4eg6pMqTLjRQoJLFjAUIFWkA0xevq0WdOmx52ayDsFAgA7" style="width:auto;height:10px">)</div></th></tr><tr><th style="text-align:center" title="'+lg['en'].citytitle+'">'+lg['en'].city+'</th><th style="text-align:center" title="'+lg['en'].citynum+'">'+img('Townhall l.png','','','image',15,15,'Town hall')+'</th><th style="text-align:center" title="'+lg['en'].wlvls+'">'+img('Warehouse l.png','','','image',15,15,'Warehouse')+'</th><th style="text-align:center" title="'+lg['en'].safeqnty+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC" style="width:auto;height:15px"></th><th style="text-align:center" title="'+lg['en'].safewoodqnty+'">'+icon(0,20,15)+'</th><th style="text-align:center" title='+lg['en'].safewineqnty+'">'+icon(1,20,15)+'</th><th style="text-align:center" title="'+lg['en'].safemarbleqnty+'">'+icon(2,20,15)+'</th><th style="text-align:center" title="'+lg['en'].safecrystalqnty+'">'+icon(3,20,15)+'</th><th style="text-align:center" title="'+lg['en'].safesulfurqnty+'">'+icon(4,20,15)+'</th><th style="text-align:center" title="'+lg['en'].safesumqnty+'">'+lg['en'].sum+'</th></tr></thead><tbody></tbody><tfoot><tr><th style="text-align:center;width:40px">'+lg['en'].sum+'</th><th id="townsum" style="text-align:center" title="'+lg['en'].townsum+'">0</th><th id="levelsum" style="text-align:center" title="'+lg['en'].levelsum+'">0</th><th id="safesum" style="text-align:center" title="'+lg['en'].safesum+'">0</th><th id="woodsum" style="text-align:center" title="'+lg['en'].woodsum+'">0</th><th id="winesum" style="text-align:center" title="'+lg['en'].winesum+'">0</th><th id="marblesum" style="text-align:center" title="'+lg['en'].marblesum+'">0</th><th id="glasssum" style="text-align:center" title="'+lg['en'].glasssum+'">0</th><th id="sulfursum" style="text-align:center" title="'+lg['en'].sulfursum+'">0</th><th id="sum" style="text-align:center" title="'+lg['en'].resqntysum+'">0</th></tr></tfoot></table>');
				var res = ['wood','wine','marble','glass','sulfur'];
				var bd = '';
				for(var y=0;y<21;y++)
				{
					bd += '<tr style="opacity:0.5"><td>'+(y+1)+'</td><td style="text-align:center"><label for="town'+y+'"><input type="checkbox" id="town'+y+'" name="town'+y+'"></label></td><td><label for="level'+y+'"><input type="number" id="level'+y+'" name="level'+y+'" min="0" max="425" value="0" step="1" style="width:50px" disabled></label></td><td id="safe'+y+'" style="width:70px">0</td>';
					$.each(res,function(k,r)
					{
						bd += '<td id="'+r+y+'" style="width:70px">0</td>';
					});
					bd += '<td id="citysum'+y+'" style="width:70px">0</td></tr>';
				}
				$('#rewardtable tbody').append(bd);
				$('#rewardtable').find('th').css({'border':'1px solid black','text-align':'center','padding':'2px','font-weight':'bold'});
				$('#rewardtable').find('td').css({'border':'1px solid black','text-align':'center','padding':'2px'});
				$('#rewardtable').find('tr > td:nth-child(2)').css({'text-align':'left'});
				translate(lang);
				$('#rank,input[id^="town"],input[id^="level"]').on('change input',function()
				{
					$('#rank').parent().contents().first().each(function(){$(this).replaceWith('')});
					translate(lang);
				});
			}
		}
		catch(e)
		{
			console.log(e);
		}
		FaithTableGenerator();
		$('[title], .ikariam-tooltip').hover(function(e)
		{
			var txt = '';
			var title = $(this).attr('title');
			if(title&&title!=='')
			{
				if(!$(this).hasClass('ikariam-tooltip')){$(this).addClass('ikariam-tooltip');}
				$(this).attr('data-tooltip',title);
			}
			var dtip = $(this).attr('data-tooltip');
			txt = dtip&&dtip!==''?dtip:'';
			if($(this).parents('.tabber').length === 0)
			{
				$(this).removeAttr('title');
			}
			$('<div id="ikariam-tooltip-content" class="WikiaArticle" style="border:1px solid #F1D031;color:#444;background:#fbeecb;box-shadow:0 2px 2px #999;position:absolute;padding:2px;text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;z-index:6000000;margin:0px;min-height:0px;overflow:hidden;font-size:14px;display:none"></div>').html(txt).appendTo('body');
			$('#ikariam-tooltip-content').css('display','inline-block').fadeIn('fast');
		},function()
		{
			$('#ikariam-tooltip-content').remove();
		}).mousemove(function(e)
		{
			var o = 10;
			var cX = e.pageX;
			var cY = e.pageY;
			var wW = $(window).width();
			var wH = $(window).height();
			var t = $('#ikariam-tooltip-content');
			var tW = t.width()+parseInt(t.css('padding-left'))+parseInt(t.css('padding-right'));
			var tH = t.height()+parseInt(t.css('padding-top'))+parseInt(t.css('padding-bottom'));
			var tL = cX+o;
			if(tL+tW>$(window).scrollLeft()+wW) { tL = $(window).scrollLeft()+wW-tW*2; }
			else if(tL-tW<$(window).scrollLeft()) { tL = $(window).scrollLeft()+tW; }
			var tT = cY+o;
			if(tT+tH>$(window).scrollTop()+wH) { tT = $(window).scrollTop()+wH-tH; }
			else if(tT-tH<$(window).scrollTop()) { tT = $(window).scrollTop(); }
			$('#ikariam-tooltip-content').css({'top':tT+'px','left':tL+'px'});
		});
	});
});