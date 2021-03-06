/* <pre> */
// Shamelessly little changed from Quarenon's script.
// Add links to compare templates

$('.cioCompareLink').each(function() {
    var props = ($(this).attr('title')||'').split('|');
    var linkText = (props[0] != '') ? props[0] : 'Comparar objetos';
    var items = (props.length >= 2) ? props.slice(1) : [ wgPageName ];
    var $link = $('<a />').attr({href: '#', title: 'Compara estos objetos con otros objetos.'}).click(function() { cioOpen(items) }).text(linkText);
    $(this).empty().append($link);
});
 
var $cioImgDelete = $('<img />').attr({src: 'http://img200.imageshack.us/img200/7898/transdelrow.png', width: 14, height: 13, alt: '[X]'});
var $cioImgLoading = $('<img />').attr({src: 'http://www.wikia.com/skins/common/progress-wheel.gif', width: 16, height: 16, alt: '...'});
var $cioImgError = $('<img />').attr({src: 'http://img12.imageshack.us/img12/508/1248624996error.png', width: 16, height: 16, alt: '!!'});
 
/** Open the compare items overlay */
function cioOpen(items) {
    // Darken the page
    $('<div />').attr('id', 'overlay').appendTo('body').show();
 
    // Build the initial table
    var html = ' \
<div id="cioTitle"> \
 <div id="modalClose" onclick="cioClose();" title="Cerrar esta superposición."><img src="http://img693.imageshack.us/img693/9906/closes.png" width="48" height="24" alt="[X]" /></div> \
 Comparar Objetos \
</div> \
<form name="cioCompare" id="cioCompare" onsubmit="cioSubmit(this.cioItem.value); return false;" action="#"> \
    <table> \
        <tr> \
            <td><label for="cioItem">Comparar <b>' + wgTitle + '</b> con:</label></td> \
            <td><input type="input" type="text" name="cioItem" id="cioItem" value="" /> <input type="submit" value="Agregar" /></td> \
        </tr> \
        <tr> \
            <td>&nbsp;</td> \
            <td id="cioStatus"></td> \
        </tr> \
    </table> \
</form> \
<table class="wikitable" id="cioItems"> \
    <thead> \
        <tr> \
            <th rowspan="2">Nombre</th> \
                <th colspan="3">Mano principal</th> \
                <th colspan="3">Mano secundaria</th> \
                <th colspan="3">Estadísticas defensivas</th> \
                <th colspan="3"><span style="font-size:80%">Crítico</span></th> \
                <th width="30"><small>Velocidad</small></th> \
                <th width="30">Peso</th> \
            <th width="30">GM</th> \
        </tr> \
        <tr> \
            <th width="35">Estilo</th> \
            <th width="35"><span style="font-size:80%">Daño</span></th> \
            <th width="35"><span style="font-size:80%">Precisión</span></th> \
            <th width="35">Estilo</th> \
            <th width="35"><span style="font-size:80%">Daño</span></th> \
            <th width="35"><span style="font-size:80%">Precisión</span></th> \
            <th width="35" title="Bonificación de armadura"><img src="https://images.wikia.nocookie.net/runescape/images/thumb/d/d8/Defence-icon.png/18px-Defence-icon.png"" alt="Arm" /></th> \
            <th width="35" title="Puntos de vida"><img src="https://images.wikia.nocookie.net/runescape/images/thumb/1/1d/Constitution-icon.png/21px-Constitution-icon.png" alt="Lif" /></th> \
            <th width="35" title="Modificador de plegaria"><img src="https://images.wikia.nocookie.net/runescape/images/2/24/Prayer-icon.png" width="20" height="20" alt="Pra" /></th> \
            <th width="35" title="Daño crítico cuerpo a cuerpo"><img src="https://images.wikia.nocookie.net/runescape/images/9/90/Stab_Attack_Style.png" width="11" height="20" alt="Dam" /></th> \
            <th width="35" title="Daño crítico de alcance"><img src="https://images.wikia.nocookie.net/runescape/images/7/72/Ranged-icon.png" width="20" height="20" alt="Rng" /></th> \
            <th width="35" title="Daño crítico de magia"><img src="https://images.wikia.nocookie.net/runescape/images/7/77/Magic-icon.png" width="20" height="19" alt="Mag" /></th> \
            <th title="Velocidad"><img src="https://images.wikia.nocookie.net/runescape/images/a/a9/Energy.png" width="17" height="20" alt="Spd" /></th> \
            <th title="Peso (kg)"><img src="https://images.wikia.nocookie.net/runescape/images/f/fc/Weight-icon.png" width="20" height="20" alt="Wgt" /></th> \
            <th title="Precio en el Gran Mercado"><img src="https://images.wikia.nocookie.net/runescape/images/6/65/Coins_25.png" width="20" height="15" alt="GE" /></th> \
        </tr> \
    </thead> \
    <tbody> \
        <tr id="cioTotals"> \
        </tr> \
    </tbody> \
</table>';
 
    // Create the modal box
    $('<div />').html(html).attr('id', 'modal').appendTo('body');
 
    // Center
    $('#modal').css('left', $(window).width() / 2 - ($('#modal').width() / 2));
 
    //os_enableSuggestionsOn('cioItem', 'cioCompare');
 
    // Initial item(s)
    // TODO: Fold multiple item calls into one API query
    for (var i = 0; i < items.length && i < 5; i++) {
        cioSubmit(items[i]);
    }
}
 
/** Close the overlay. */
function cioClose() {
		//os_disableSuggestionsOn('cioItem');
		$('#modal').fadeOut('normal', function() {
				$('#modal').remove();
				$('#overlay').remove();
		});
}
 
/** Submit an AJAX request to add a new item */
function cioSubmit(itemName) {
		// http://www.mredkj.com/javascript/numberFormat.html#addcommas
		function addCommas(nStr) {
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
		}
 
		/** Calculate bonus totals */
		function calcTotals() {
				var totals = [];
				for (var i = 0; i < 15; i++) {
						totals[i] = 0;
				}
 
				// Iterate over each row and col
				$('#cioItems tbody tr').not('#cioTotals').each(function() {
						var i = 0;
						$(this).children('td').each(function() {
								var num = $(this).text().replace(/,/g, '');
								totals[i++] += (isNaN(num) ? 0 : parseInt(num));
						});
				});
 
				$('#cioTotals').empty().append($('<th />').text('Total'));
                for (var i in totals) {
	               // Don't total weapon speeds
	               $('#cioTotals').append(format((/(1?2|5)/.test(i)) ? null : (addCommas(totals[i]) + '')));
	               }
                }
 
		/** Format a template number and return a (jQuery) table cell */
		function format(str) {
				if (str == null || /no|^\s*<!--.*-->\s$/i.test(str)) {
						return $('<td />').attr('class', 'cioEmpty').text('--');
				} else {
						// Prepend + sign to numbers without any sign
						str = str.replace(/<!--.*?-->/g); //remove comments
						if (/\d/.test(str.substring(0, 1))) {
								str = '+' + str;
						}
 
						if(/\w/.test(str.substring(0, 1))) return $('<td />').text(str);
						else return $('<td />').attr('class', (str.substring(0, 1) == '-') ? 'cioNeg' : 'cioPos').text(str);
				}
		}
 
		/** Parse the parameters in a given template.  */
		function parsePlantilla(text, tpl) {
				tpl = tpl.replace(/[_ ]/g, '[_ ]');
				var re = new RegExp('{{\\s*(Plantilla:)?' + tpl + '\\s*\\|([\\w\\W]+?)[^!]}}', 'gi');
 
				var data = [];
				var match;
 
				while (match = re.exec(text)) {
						var params = match[2].split('|');
						var j = 1; // Unnamed parameter index
						var tplData = new Array();
						for (var k in params) {
								var t = params[k].split('=');
								var name = null;
								var value = null;
								if (t.length == 1) { // Unnamed params
										name = (j++) + ''; // Cast to string
										value = t[0];
								} else {
										name = t[0];
										value = t[1];
								}
 
								tplData[$.trim(name)] = $.trim(value);
						}
						data.push(tplData);
				}
 
				return data;
		}
 
		/** Error message */
		function showError(str) {
				$('#cioStatus').empty().attr('class', 'cioError').append($cioImgError.clone()).append(' ' + str);
		}
 
		/** Ajax error handler */
		function ajaxError(xhr, error) {
				showError('Error: ' + error);
		}
 
		/** Ajax success handler */
		function ajaxSuccess(data) {
				// TODO Handle error messages from the API
 
				// List of template params to display within each column.
				var bonusCols = [
						'Tipo principal', 'Daño principal', 'Precisión principal',
						'Tipo secundario', 'Daño secundario', 'Precisión secundaria',
						'Defensa', 'LP', 'Prayer',
						'Crítico Melee', 'Crítico Ranged', 'Crítico Magic', 'Velocidad'
				];
 
		var pages = data.query.pages;
		var exchangePageId = null;
		var pageId = null;
 
		for (var i in pages) {
			if (pages[i].ns == '116') {
				exchangePageId = pages[i].pageid;
			} else {
				pageId = pages[i].pageid;
			}
		}
 
		if (pageId == null) {
			showError('No se pudo encontrar el objeto.');
		} else {
			var page = data.query.pages[pageId];
			var exchangePage = data.query.pages[exchangePageId];
 
			var pageTitle = page.title;
			var pageContent = page.revisions[0]['*'];
 
			var bonusData = parsePlantilla(pageContent, 'Infobox Arma');
			var itemData = parsePlantilla(pageContent, 'Infobox Item');
 
			var exchangeData = [];
			if (exchangePage) {
				var exchangeContent = exchangePage.revisions[0]['*'].replace('{{{Ver}}}', '');
				exchangeData = parsePlantilla(exchangeContent, 'ExchangeObjeto');
			}
 
			for (var i in bonusData) {
				var $row = $('<tr />');
				var $th = $('<th />');
				var $delLink = $('<a />').attr({href: '#', title: 'Remover esta fila.'}).click(function() {
					$(this).closest('tr').fadeOut('slow', function() { $(this).remove(); calcTotals(); } );
				});
				var $itemLink = $('<a />').attr({href: wgArticlePath.replace('$1', encodeURI(pageTitle)), title: pageTitle}).text(pageTitle);
 
				$delLink.append($cioImgDelete.clone());
				$th.append($delLink).append(' ').append($itemLink);
				$row.append($th);
 
				for (var j in bonusCols) {
					$row.append(format(bonusData[i][bonusCols[j]]));
 
				}
 
				$row.append(format(itemData.length ? itemData[0]['Peso'] : null));
				$row.append(format(exchangeData.length ? exchangeData[0]['Precio'] : null));
 
				$('#cioTotals').before($row);
			}
 
			if (!bonusData.length) {
				showError('No se encontraron estadísticas de este objeto.');
			} else {
				calcTotals();
				$('#cioStatus').empty();
			}
		}
	}
 
	$('#cioStatus').empty().attr('class', 'cioLoading').append($cioImgLoading.clone()).append(' Cargando...');
 
	$.ajax({
		data: {
			'action': 'query',
			'prop': 'revisions',
			'titles': itemName + '|Exchange:' + itemName,
			'rvprop': 'content',
			'redirects': '',
			'format': 'json'
		},
		dataType: 'json',
		success: ajaxSuccess,
		error: ajaxError,
		url: wgScriptPath + '/api.php',
		timeout: 10000 // millisec
	});
}
/* </pre> */