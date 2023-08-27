/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

 
/**
 * Switch Infobox -- Allows multiple infoboxes to be seamlessly switched.
 * Required template: https://runescape.wikia.com/wiki/Template:Switch_infobox
 * Required stylesheet: https://runescape.wikia.com/wiki/User:Matthew2602/SwitchInfobox.css
 */
 
// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
    if ( $( this ).children( 'br' ).length ) {
        $( this ).remove();
    } else {
        $( this ).replaceWith( this.innerHTML );
    }
});
 
// Appends the switch triggers to every item
$( '.switch-infobox' ).each( function() {
        // The switch triggers
        var triggers = $( this ).children( '.switch-infobox-triggers' );
 
        $( this ).children( '.item' ).find( 'caption' ).append( triggers );
} );
 
// Does the actual switching
$( '.switch-infobox' ).find( '.switch-infobox-triggers' ).children( '.trigger' ).click( function() {
    // The parent .switch-infobox of the clicked trigger
    var parentSwitchInfobox = $( this ).parents( '.switch-infobox' );
    // Hides items showing
    parentSwitchInfobox.children( '.item.showing' ).removeClass( 'showing' );
    // Show the relevant item
    parentSwitchInfobox.children( '.item[data-id="' + this.getAttribute( 'data-id' ) + '"]' ).addClass( 'showing' );
} );
 
// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
 
//Debug
console.log('Initialised switch infoboxes', $( '.switch-infobox' ).length);


/* Динамически-подгружаемый контент с других страниц */
$("table.ajax").each(function (i) {
	var table = $(this).attr("id", "ajaxTable" + i);
	table.find(".nojs-message").remove();
	var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
	var cell = table.find("td").first();
	var needLink = true;
	cell.parent().show();
	if (cell.hasClass("showLinkHere")) {
		var old = cell.html();
		var rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
		if (rep !== old) {
			cell.html(rep);
			needLink = false;
		}
	}
	if (needLink){
		headerLinks.html('[<a href="javascript:;" class="ajax-load-link">Показать данные</a>]');
	}
	table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
		event.preventDefault();
		var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
		cell.text('Таблица загружается, пожалуйста, подождите.');
		$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
			if (!data) {
				return;
			}
			cell.html(data);
			cell.find('.ajaxHide').remove();
			if (cell.find("table.sortable").length) {
				mw.loader.using('jquery.tablesorter', function() {
					cell.find("table.sortable").tablesorter();
				});
			}
			headerLinks.text('[');
			headerLinks.append($('<a>Редактировать</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
			headerLinks.append(document.createTextNode(']\u00A0['));
			var shown = true;
			$("<a href='javascript:;'>Скрыть</a>").click(function() {
				shown = !shown;
				cell.toggle(shown);
				$(this).text(shown ? 'Скрыть' : 'Показать');
			}).appendTo(headerLinks);
			headerLinks.append(document.createTextNode(']'));
		}).error(function() {
			cell.text('Невозможно загрузить таблицу. Возможно, искомая страница не существует.');
		});
	});
});


/*
 * Калькулятор хп боссов
 * Скрипт написан [[Участник:Wormix Game]]
*/
var bossName = "";
var hpModuleInvokeResult = null;
var maxAsyncWaitForResultCount = 10;
var maxChecksForCalcSpan = 5;

function checkResult(currentRequestCount){
	var spanToWriteResult = $("#calcResult")[0];
	if (hpModuleInvokeResult == null){
		if (currentRequestCount != maxAsyncWaitForResultCount){
			setTimeout(checkResult, 1000, currentRequestCount + 1);
		}else{
			spanToWriteResult.innerHTML = "Время ожидания истекло, возможно у вас неустойчивое интернет соединение.";
		}
	}else{
		spanToWriteResult.innerHTML = hpModuleInvokeResult;
	}
}

window.getBossHp = function() {
	var spanToWriteResult = $("#calcResult")[0];
	var playersCount = Number($("#players-count-field")[0].value);
	var resultText = "ЕРРОР";
	if (!isNaN(playersCount)){
		if (0 < playersCount && playersCount <= 256){
			var api = new mw.Api();
			hpModuleInvokeResult = null;
			api.get({
				action: 'expandtemplates',
				text: '{{BossHpCalculator|' + bossName + '|players=' +  playersCount + '}}'
			}).done(function(data) {
				hpModuleInvokeResult = data.expandtemplates['*'];
			});
			resultText = "Ожидайте...";
			checkResult(1);
		}else{
			resultText = "Значение должно быть в диапазоне от 1 до 256";
		}
	}else{
		resultText = "Введите числовое значение.";
	}
	spanToWriteResult.innerHTML = resultText;
}
/*Right module discord */
window.AddRailModule = [
    {page: 'Template:Discord', prepend: true}];

var timeUntilNewCheck = 1000;
var currentCheck = 1;

function checkSpan(){
	var spanToInsertControls = $("#calc")[0];
	if (spanToInsertControls !== undefined){
		bossName = $("#calc")[0].innerText;
		if (bossName !== "") {
			spanToInsertControls.innerHTML = "";
		}
		$('<input id="players-count-field" type="text" placeholder="Кол-во игроков" value="2" maxlength="3">').appendTo(spanToInsertControls);
		$('<input id="calculate-hp-boss" onclick="getBossHp()" type="button" value="Рассчитать">').appendTo(spanToInsertControls);
	}else{
		timeUntilNewCheck += 2000;
		if (currentCheck != maxChecks){
			currentCheck += 1;
			setTimeout(checkSpan, timeUntilNewCheck);
		}
	}
}

checkSpan();