//<nowiki>

function callAPI(data, method, callback) {
	data['format'] = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: wgScriptPath + '/api.php',
		type: method,
		cache: false,
		success: function(response) {
			if (response.error)
				alert('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) { alert('AJAX error: ' + error); }
	});
}

//--------------Charm logs--------------//
//To disable charm log submissions on the monster page itself, add    var onPage = false;   just before the import.
function isInt(n) {
	return parseInt(n) % 1 == 0;
}
function diff(x,y,z) {
	z=z?z:1;
	x=parseFloat(x)/z, y=parseFloat(y)/z
	var diff = Math.abs(x-y);
	return Math.round(diff*100)/100;
}

var onPage = onPage?onPage:true;
var waterfiend = wgPageName=='Diablejo de agua'
var submitTable = '<table class="wikitable" style="margin-left:25px;" id="charmLogSubmit"><tr><th>Total de muertes</th>'+
	'<th><img alt="Gold charm.png" src="https://images.wikia.nocookie.net/runescape/images/4/43/Gold_charm.png"></th>'+
	'<th><img alt="Green charm.png" src="https://images.wikia.nocookie.net/runescape/images/f/f4/Green_charm.png"></th>'+
	'<th><img alt="Crimson charm.png" src="https://images.wikia.nocookie.net/runescape/images/b/b1/Crimson_charm.png"></th>'+
	'<th><img alt="Blue charm.png" src="https://images.wikia.nocookie.net/runescape/images/0/06/Blue_charm.png"></th></tr>'+
	'<tr><td><input type="text" id="chTotalKills" style="width:60px;"></td><td><input type="text" id="chGold" style="width:30px;"></td><td><input type="text" id="chGreen" style="width:30px;"></td><td><input type="text" id="chCrimson" style="width:30px;"></td><td><input type="text" id="chBlue" style="width:30px;"></td></tr>'+
	'<tr><td colspan="5" style="text-align:center;"><button id="clSubmit">Enviar</button></td></tr></table>'

if (onPage && !wgPageName.match('/Registro_de_amuletos') && $('.charmtable').length) {
	if (waterfiend) {
		$(document).ready(function(){
			$('#charmLogSubmit').attr('id','charmLogSubmit'+$('a[href$="action=edit&section=new&preload=Plantilla:Registro_de_amuletos/precarga&editintro=Plantilla:RegistroDeAmuletosGuíaDeActualización&useeditor=mediawiki"]').parents('.charmpage').attr('class').split(' ')[1])
		})
	}
	$(function() {
	$('a[href$="action=edit&section=new&preload=Plantilla:Registro_de_amuletos/precarga&editintro=Plantilla:RegistroDeAmuletosGuíaDeActualización&useeditor=mediawiki"]').attr('href', function(i, val) {
		return val.replace(/.*\/wiki\/([^\?\&]*).*/, '/wiki/$1')
	}).click(function(e) {
		e.preventDefault();
		var wfiendadd = waterfiend?$(this).parents('.charmpage').attr('class').split(' ')[1]:''
	if (!$('table#charmLogSubmit'+(waterfiend?'-':'')+wfiendadd).length) {
		var charmpage = wgPageName+(waterfiend?(wfiendadd=='ghorrock'?' (Ghorrock)':''):'')+'/Charm log'
		waterfiend?$('*[id^="charmLogSubmit"]:not([id$="'+wfiendadd+'"]), hr.chHr').remove():''
		$(this).parent().after(submitTable+'<hr class="chHr"/>')
		waterfiend?$(this).parent().next().attr('id', $(this).parent().next().attr('id')+'-'+wfiendadd):''
		$('button#clSubmit').click(function() {
			if (parseInt($('#chTotalKills').val())<50) {
				alert('La cantidad total de asesinatos que ingresaste está por debajo de los 50 requeridos.Por favor, subir una data de amuletos para 50 asesinatos o más.')
			} else if (parseInt($('#chTotalKills').val())>10000) {
				alert('La cantidad total de asesinatos que ingresaste está por encima de los valores permitidos.Por favor, no intente subir resultados hechos/inventados.');
			} else {
				var total=$('#chTotalKills'), gold=$('#chGold'), green=$('#chGreen'), crimson=$('#chCrimson'), blue=$('#chBlue');
				if (gold.val().length==0||green.val().length==0||crimson.val().length==0||blue.val().length==0) {
					if (confirm('Las entradas que fueron dejadas vacías serán 0 por defecto. ¿Continuar?')) {
						gold.val()||gold.val('0');
						green.val()||green.val('0');
						crimson.val()||crimson.val('0');
						blue.val()||blue.val('0');
						if (parseInt(gold.val())+parseInt(green.val())+parseInt(crimson.val())+parseInt(blue.val()) == 0) {
							alert('La cantidad total de amuletos que obtuviste fue 0. Por favor, solo actualiza el registro cuando hayas obtenido amuletos en tus asesinatos (incrementando el tamaño de la muestra mediante más asesinatos de monstruos).');
							return false;
						}
						$(this).attr('disabled','disabled').html('Cargando...').after('<i id="loadmsg">Cargando data actual del registro de amuletos para comparación</i>')
						submitCharmLog(charmpage)
					}
				} else {
					$(this).attr('disabled','disabled').html('Cargando...').after('<i id="loadmsg">Cargando data actual del registro de amuletos para comparación</i>')
					submitCharmLog(charmpage)
				}
			}
		})
	}
	})
	})
} else if (wgPageName.match('/Registro_de_amuletos') && $('#charmguide').length) {
	$(document).ready(function() {
		$('#charmguide').html('Enviar data de amuletos:<br/>'+submitTable)
		var charmpage = wgPageName;
		$('button#clSubmit').click(function() {
			if (parseInt($('#chTotalKills').val())<50||$('#chTotalKills').val()=='') {
				alert('TLa cantidad total de asesinatos que ingresaste está por debajo de los 50 requeridos.Por favor, subir una data de amuletos para 50 asesinatos o más.')
			} else {
				var total=$('#chTotalKills'), gold=$('#chGold'), green=$('#chGreen'), crimson=$('#chCrimson'), blue=$('#chBlue')
				if (gold.val().length==0||green.val().length==0||crimson.val().length==0||blue.val().length==0) {
					if (confirm('Las entradas que fueron dejadas vacías serán 0 por defecto. ¿Continuar?')) {
						gold.val().length==0?gold.val('0'):'';
						green.val().length==0?green.val('0'):'';
						crimson.val().length==0?crimson.val('0'):''
						blue.val().length==0?blue.val('0'):'';
						$(this).attr('disabled','disabled').html('Cargando...').after('<i id="loadmsg">Cargando data actual del registro de amuletos para comparación</i>')
						submitCharmLog(charmpage)
					}
				} else {
					$(this).attr('disabled','disabled').html('Cargando...').after('<i id="loadmsg">Cargando data actual del registro de amuletos para comparación</i>')
					submitCharmLog(charmpage)
				}
			}
		})
	})
}

function submitCharmLog(charmpage) {
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'intoken': 'edit',
		'titles': charmpage.replace(/(.*)\/Registro[ _]de[ _]amuletos/, 'Amuleto:$1')+'|'+charmpage,
		'rvprop': 'content',
		'indexpageids': 'true',
	}, 'GET', function(response) {
console.log('test')
		var summary = 'Actualizando data de amuletos usando la caja en el '+(wgPageName.match('/Registro_de_amuletos')?'submission ':'')+'.'
		var submitpage = response.query.pages[response.query.pageids[0]]
		var datapage = response.query.pages[response.query.pageids[1]]
		var curdata = datapage.revisions[0]['*'].replace(/(.|\n)*\|Amuletos=/i, '|Amuletos=').replace(/\n\}\}(.|\n)*/, '').split('\n')
		datapage = datapage.title=='Amuleto:'+wgPageName.replace('_',' ')?submitpage:datapage
		submitpage = datapage.title=='Amuleto:'+wgPageName.replace('_',' ')?submitpage:datapage
		var total=$('#chTotalKills').val(), gold=$('#chGold').val(), green=$('#chGreen').val(), crimson=$('#chCrimson').val(), blue=$('#chBlue').val()
		var total=parseInt(total), gold=parseInt(gold), green=parseInt(green), crimson=parseInt(crimson), blue=parseInt(blue)
		var perkill = parseInt(curdata[0].replace('|charms=',''))
		var ea = perkill;
		var curtot=curdata[1].replace('|Asesinatos=',''), curgold=curdata[2].replace('|Oro=',''), curgreen=curdata[3].replace('|Verde=',''), curcrimson=curdata[4].replace('|Carmesí=',''), curblue=curdata[5].replace('|Azul=','')
		curtot=parseInt(curtot), curgold=parseInt(curgold), curgreen=parseInt(curgreen), curcrimson=parseInt(curcrimson), curblue=parseInt(curblue)
		if (!isInt(gold/perkill)||!isInt(green/perkill)||!isInt(crimson/perkill)||!isInt(blue/perkill)||(gold+green+crimson+blue)/perkill>total) {
			alert('Es imposible obtener esa cantidad de amuletos. Usted '+((gold+green+crimson+blue)/perkill>total?'ha enviado más amuletos que asesinatos':"ha subido una cantidad de amuletos que no es divisible entre "+perkill+', la cantidad de amuletos que obtuviste por asesinato'))
			$('button#clSubmit').removeAttr('disabled').html('Submit').next().remove()
		} else {
			if (curtot>500&&(diff(curgold/curtot,gold/total,ea)>0.1 || diff(curgreen/curtot,green/total,ea)>0.1 || diff(curcrimson/curtot,crimson/total,ea)>0.1 || diff(curblue/curtot,blue/total,ea)>0.1)) {
				if (curtot>500&&(diff(curgold/curtot,gold/total,ea)>0.25 || diff(curgreen/curtot,green/total,ea)>0.25 || diff(curcrimson/curtot,crimson/total,ea)>0.25 || diff(curblue/curtot,blue/total,ea)>0.25) || (gold+green+crimson+blue == 0)) {
					alert('Por favor, no intente usar este script para vandalizar la Wiki. Si así lo hace, será bloqueado.');
					return false;
				} else {
					summary += ' /*(Posible vandalismo/spamm)*/'
				}
			}
			var template = '{{Registro de amuletos\n|Asesinatos='+total+'\n|Oro='+gold+'\n|Verde='+green+'\n|Carmesí='+crimson+'\n|Azul='+blue+'\n\}\}'
			if (submitpage.revisions[0]['*'].match(new RegExp(template))) {
				alert('Gracias por su contribución. Esta página ahora se recargará.')
				document.location.replace(wgArticlePath.replace('$1', wgPageName))
				return false;
			}
			$('#loadmsg').html('Enviando edición...')
			callAPI({
				'minor': 'yes',
				'summary': summary,
				'action': 'edit',
				'title': charmpage,
				'basetimestamp': submitpage.revisions[0].timestamp,
				'startimestamp': submitpage.starttimestamp,
				'token': submitpage.edittoken,
				'appendtext': template
			}, 'POST', function(response) {
				alert('Gracias por su contribución. Esta página ahora se recargará.')
				$('button#clSubmit').removeAttr('disabled').html('Submit').next().remove()
				document.location.replace(wgArticlePath.replace('$1', wgPageName))
			});
		}
	})
}