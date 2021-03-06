//
// Any JavaScript here will be loaded for all users using the Wikia skin on every page load
//

//
// Format for multiple scripts
//

//
// importArticles({
//  type: "script",
//  articles: [
//    "MediaWiki:Common.js",
//    "MediaWiki:FloatingToc/code.js"     // popout TOC. static as is used nearly all pages but portals, etc...
//    ]
// });
//

//
// Import the scripts located in MediaWiki:Common.js
//
 importArticle({
     type: "script",
     article: "MediaWiki:Common.js"     // Loads the MediaWiki:Common.js file
 });
 
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
			if(timeInSecs>0) { retarr.push('<span style=\'color:'+(p!=6?'grey':colors[f])+'\'>'+FrmtNumToStr(timeInSecs)+' '+l[f][k===0?k:(timeInSecs===1?2:1)]+'</span>'); }
			pt = timeInSecs===0 ? pt : (pt-1);
		}
	}
	return retarr.join(s);
}
function FrmtNumToStr(inputNum,outputSign,precision) // number, show + or -, precision
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
	return FrmtNumToStr(n,false,0)+'<sup>'+(Array.isArray(s)?(s[(v-20)%10]||s[v]||s[0]):s)+'</sup>';
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
			dvtxt[2] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td class="title3" style="font-size: 110%; white-space: nowrap;" colspan="2">'+FrmtNumToStr(data[res].wambro[n])+' '+icon(0)+' for 1 '+icon(5,16,22)+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Number of cities<br/>that are on the island">Cities</th><th class="ikariam-tooltip" data-tooltip="Cost distribution<br/>per city that is on the island">Cost</th></tr></thead><tbody>';
			dvtxt[3] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td class="title3" style="font-size: 110%; white-space: nowrap;" colspan="2">'+FrmtNumToStr(data[res].wambro[n])+' '+icon(0)+' for 1 '+icon(5,16,22)+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Number of cities<br/>that are on the island">Cities</th><th class="ikariam-tooltip" data-tooltip="Accumulative Cost distribution<br/>per city that is on the island">Cost</th></tr></thead><tbody>';
			dvtxt[4] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip title3" rowspan="2" colspan="2" data-tooltip="Maximum basic production<br />with no other effect">'+img('Saw mill worker small.png','Saw mill','Saw mill','image',15,20,'Saw mill')+'</th><th class="title3">'+FrmtNumToStr(data[res].workers[n+1])+'</th><th class="ikariam-tooltip title3" colspan="16" data-tooltip="All possible combinations<br />to accumulate effects">Combinations</th></tr><tr><td>100 %</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Cinetheater gives<br /><b>20 %</b> more production for <b>12</b> hours.">'+img('Cinetheater.gif','Cinetheater','Cinetheater','image',23,20,'Building:Cinetheater')+'</th><td>20 %</td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Helios tower gives<br /><b>10 %</b> more production<br />for the period it is activated.">'+img('Helios_Tower.png','Helios Tower','Helios Tower','image',11,20,'Building:Helios_Tower')+'</th><td>10 %</td><td></td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="'+plus[jsn.name][0]+'">'+img(plus[jsn.name][2]+'34px.png',plus[jsn.name][1],plus[jsn.name][1],'image',20,20,plus[jsn.name][1])+'</th><td>20 %</td><td></td><td></td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="The building <b>'+plus[jsn.name][3]+'</b> gives<br />up to <b>64 %</b> more production.">'+img(plus[jsn.name][4],plus[jsn.name][3],plus[jsn.name][3],'image',25,20,'Building:Forester%27s_House')+'</th><td></td><td></td><td>+</td><td></td><td></td><td></td><td>+</td><td>+</td><td>+</td><td></td><td></td><td></td><td>+</td><td>+</td><td>+</td><td></td><td>+</td></tr></thead><tbody><tr><th class="title3" rowspan="34">P<br>r<br>o<br>d<br>u<br>c<br>t<br>i<br>o<br>n<br> <br>B<br>u<br>i<br>l<br>d<br>i<br>n<br>g<br> <br>L<br>e<br>v<br>e<br>l<br>s</th><td class="ikariam-tooltip title3" data-tooltip="The building <b>'+plus[jsn.name][3]+'</b>.">Level</td><td class="ikariam-tooltip title3" data-tooltip="The production increase percentage that causes<br />each level of the building <b>'+plus[jsn.name][3]+'</b>.">(%)</td><td class="ikariam-tooltip title3" colspan="16" data-tooltip="The final production after implementing<br />the respective combinations.">Production{0}</td></tr>';
			for(var i=0;i<17;i++)
			{
				dvtxt[0] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+FrmtNumToStr(data[res].wood[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+FrmtNumToStr(Math.ceil(data[res].wood[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(data[res].wood[n]/(i+1)))+' '+icon(0)+'</td></tr>';
				dvtxt[1] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+FrmtNumToStr(accwood[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+FrmtNumToStr(Math.ceil(accwood[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(accwood[n]/(i+1)))+' '+icon(0)+'</td></tr>';
				dvtxt[2] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+FrmtNumToStr(data[res].wambro[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+FrmtNumToStr(Math.ceil(data[res].wambro[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(data[res].wambro[n]/(i+1)))+' '+icon(5,16,22)+'</td></tr>';
				dvtxt[3] += '<tr class="ikariam-tooltip" data-tooltip="With <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island'+(i==16?', with use of Ambrosia':'')+', each player requires to contribute:<br/><b>'+FrmtNumToStr(accambro[n])+'</b> crates of wood ÷ <b>'+(i+1)+'</b> '+(i+1==1?'city':'cities')+' on the island = <b>'+FrmtNumToStr(Math.ceil(accambro[n]/(i+1)))+'</b> crates of wood."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(accambro[n]/(i+1)))+' '+icon(5,16,22)+'</td></tr>';
			}
			dvtxt[0] += '</tbody></table>';
			dvtxt[1] += '</tbody></table>';
			dvtxt[2] += '</tbody></table>';
			dvtxt[3] += '</tbody></table>';
			for(var q=0;q<4;q++)
			{
				dvtxt[q+5] = prntf(dvtxt[4],[HH[q]]);
				for(var y=0;y<33;y++)
				{
					dvtxt[q+5] += '<tr>';
					dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="'+(y==0 ? 'The building <b>'+plus[jsn.name][3]+'</b> has not been constructed.' : 'The <b>'+Nth(y)+'</b> level of the building <b>'+plus[jsn.name][3]+'</b> .')+'">'+y+'</td>';
					dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="'+(y==0 ? 'The building <b>'+plus[jsn.name][3]+'</b> does not increase production<br />because it has not been constructed.' : 'The building <b>'+plus[jsn.name][3]+'</b><br>increase production<br />by <b>'+(y*2)+' %.')+'">'+(y*2)+'</b> %</td>';
					for(var x=0;x<16;x++)
					{
						dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><th colspan=&quot;3&quot;>Effect</th></tr><tr><th>Type</th><th>Percentage</th><th>Production</th></tr><tr><td style=&quot;text-align:left&quot;>Basic</td><td>100 %</td><td>'+FrmtNumToStr(data[res].workers[n+1])+'</td></tr>'+([2,5,8,9,11,12,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>Cinetheater</td><td>20 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*20/100)+'</td></tr>' : '')+([3,6,8,10,11,13,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>Helios Tower</td><td>10 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*10/100)+'</td></tr>' : '')+([4,7,9,10,12,13,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>'+plus[jsn.name][1]+'</td><td>20 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*20/100)+'</td></tr>' : '')+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 && y>0 ? '<tr><td style=&quot;text-align:left&quot;>'+plus[jsn.name][3]+'</td><td>'+FrmtNumToStr(y*2)+' %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*y*2/100)+'</td></tr>' : '')+(HHv[q]!=0 ? '<tr><td style=&quot;text-align:left&quot;>Helping Hands</td><td>12.5 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*12.5/100)+'</td></tr>' : '')+(HHv[q]==15 ? '<tr><td style=&quot;text-align:left&quot;>Technocracy</td><td>2.5 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*2.5/100)+'</td></tr>' : '')+(HHv[q]==13.75 ? '<tr><td style=&quot;text-align:left&quot;>Xenocracy</td><td>1.25 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*1.25/100)+'</td></tr>' : '')+(coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q]>0 ? '<tr><th>Sum</th><th>'+FrmtNumToStr((100+coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q]))+' %</th><th>'+FrmtNumToStr(data[res].workers[n+1]*(100+coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q])/100)+'</th></tr>' : '')+'</table>">'+FrmtNumToStr(data[res].workers[n+1]*(100+coef[x]+(y*2)+HHv[q])/100)+'</td>';
					}
					dvtxt[q+5] += '</tr>';
				}
				dvtxt[q+5] += '</tbody></table>';
			}
			rows += '<tr><th>'+(n+1)+'</th><td>'+(n===0?'<span style="color:gray;">-</span>':'<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><td'+(data[res].wood[n] === 0 ? '' : ' colspan="2"')+'>'+icon(0)+'</td><td'+(data[res].wambro[n] === 0 ? '' : ' colspan="2"')+'>'+icon(5,16,22)+'</td></tr><tr><td class="'+(data[res].wood[n] === 0 && accwood === 0 ? 'ikariam-tooltip" data-tooltip="There is no resources cost for this level!">'+FrmtNumToStr(data[res].wood[n]) : (data[res].wood[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no wood donation cost!">'+FrmtNumToStr(data[res].wood[n]) : '">'+FrmtNumToStr(data[res].wood[n])))+'</td>'+(data[res].wood[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[0]+'</div></td>')+'<td class="'+(data[res].wambro[n] === 0 && accambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There is no option the buy wood with Ambrosia!">'+FrmtNumToStr(data[res].wambro[n]) : (data[res].wambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no Ambrosia cost data!">'+FrmtNumToStr(data[res].wambro[n]) : '">'+FrmtNumToStr(data[res].wambro[n])))+'</td>'+(data[res].wambro[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[2]+'</div></td>')+'</tr><tr><td class="'+(data[res].wood[n] === 0 && accwood === 0 ? 'ikariam-tooltip" data-tooltip="There is no resources cost for this level!">('+FrmtNumToStr(accwood[n])+')' : (data[res].wood[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no wood donation cost data!">('+(data[res].wood[n] === 0 ? 0 : FrmtNumToStr(accwood[n]))+')' : '">('+FrmtNumToStr(accwood[n])+')'))+'</td>'+(data[res].wood[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[1]+'</div></td>')+'<td class="'+(data[res].wambro[n] === 0 && accambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There is no option to buy wood with Ambrosia!">('+(data[res].wambro[n] === 0 ? 0 : FrmtNumToStr(accambro[n]))+')' : (data[res].wambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="There are no Ambrosia cost data!">('+(data[res].wambro[n] === 0 ? 0 : FrmtNumToStr(accambro[n]))+')' : '">('+FrmtNumToStr(accambro[n])+')'))+'</td>'+(data[res].wambro[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[3]+'</div></td>')+'</tr></table>')+'</td><td style="white-space:nowrap">'+(n===0?'<span style="color:gray;">-</span>':'<span class="ikariam-tooltip" data-tooltip="The real building time<br />(Form of government has no effect)<br /><b>'+BT(durs[n],1)+'</b>">'+BT(durs[n])+'</span><br>(<span class="ikariam-tooltip" data-tooltip="The accumulative building time<br />(Form of government has no effect)<br /><b>'+BT(accdurs[n],1)+'</b>">'+BT(accdurs[n])+'</span>)')+'</td><td style="white-space:nowrap"><div class="expandcollapsetable">'+FrmtNumToStr(data[res].workers[n+1])+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[5]+'</div></div><div class="expandcollapsetable">('+FrmtNumToStr(data[res].workers[n+1]*1.125)+')<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[6]+'</div></div><div class="expandcollapsetable">With '+lnk('Technocracy','Technocracy','Technocracy')+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[7]+'</div></div><div class="expandcollapsetable">With '+lnk('Xenocracy','Xenocracy','Xenocracy')+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[8]+'</div></div></td><td><div class="ikariam-tooltip" style="display:inline-block;margin:auto;text-align:right" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><th colspan=2>Workers</th></tr><tr><th>Type</th><th>Quantity</th></tr><tr><td style=text-align:left>Skilled</td><td style=text-align:right>'+FrmtNumToStr(data[res].workers[n+1])+'</td></tr><tr><td style=text-align:left>Unskilled</td><td style=text-align:right>'+FrmtNumToStr(data[res].workers[n+1]/2)+'</td></tr><tr><th>Sum</th><th style=text-align:right>'+FrmtNumToStr(data[res].workers[n+1]*3/2)+'</th></tr></table>">'+FrmtNumToStr(data[res].workers[n+1])+'<br>'+FrmtNumToStr(data[res].workers[n+1]/2)+'<hr>'+FrmtNumToStr(data[res].workers[n+1]*3/2)+'</div></td></tr>';
		}
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody').append(rows);
	}
}
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