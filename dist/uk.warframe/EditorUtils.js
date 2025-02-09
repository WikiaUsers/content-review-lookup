/* Додає декілька кнопок на панель редактора:
Перша - для швидкого сортування виділеного списку
Друга - відкриває модальне вікно в якому можна ввести потрібний текст для сортування,
	натискання другої кнопки з виділеним текстом відразу скопіює його в модальне вікно;
	має налаштування розділювача між елементами для сортування;
	має налаштування порядку сортування
Третя - відкриває вікно, в якому відображаєтся вміст блока #parse з сторінки користувача
*/
$(function() {
"use strict";

if (mw.config.get('wgAction') == "edit" || mw.config.get('wgAction') == "submit") {
	setTimeout(function() {
		mw.hook('dev.wds').add(function(wds) {
			// додає кнопки на панель редагування
			$("#wikiEditor-section-main").append($("<div>", {
				class: "group",
				rel:"misc",
				append: [
					$('<span class="tool oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement oo-ui-buttonWidget" id="mw-editbutton-sortlist">' + 
					'<a class="oo-ui-buttonElement-button" role="button" title="Швидке сортування виділеного списку">'+
					'<div class="wds-icon dev-wds__icon" id="dev-wds-icons-bullet-list-small" style="width: 20px, height: 20px;"></div>'+
					'</a></span>'),
					$('<span class="tool oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement oo-ui-buttonWidget" id="mw-editbutton-sortlistModal">' + 
					'<a class="oo-ui-buttonElement-button" role="button" title="Відкрити вікно сортування списку. Виділений текст відразу скопіюється в поле.">'+
					'<div class="wds-icon dev-wds__icon" id="dev-wds-icons-more-small" style="width: 20px, height: 20px;"></div>'+
					'</a></span>'),
					$('<span class="tool oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement oo-ui-buttonWidget" id="mw-editbutton-openWindowParse">' + 
					'<a class="oo-ui-buttonElement-button" role="button" title="Відкрити вікно сортування списку. Виділений текст відразу скопіюється в поле.">'+
					'<div class="wds-icon dev-wds__icon" id="dev-wds-icons-toc-small" style="width: 20px, height: 20px;"></div>'+
				'</a></span>')
				]
				})
			);
		// обробник подій натискання на кнопки панелі редагування
			$("#mw-editbutton-sortlist > a").on("click", function() {
				sortSelection();
			});
			$("#mw-editbutton-sortlistModal > a").on("click", function() {
				openModal();
			});
			$("#mw-editbutton-openWindowParse > a").on("click", function() {
				openWindowParse();
			});
		
			wds.render('#mw-editbutton-sortlist');
			wds.render('#mw-editbutton-sortlistModal');
			wds.render('#mw-editbutton-openWindowParse');
		});
	}, 2000);
	importArticles({
		type: 'script',
		articles: [ 'u:dev:MediaWiki:WDSIcons/code.js', "u:dev:MediaWiki:ShowCustomModal.js" ]
	}, {
		type: 'style',
		article: 'MediaWiki:ListSorter.css'
	});
}

// сортує виділений текст
	function sortSelection() {
		var divider = "\n",
			text = window.getSelection().toString(),
			rText = text
				.split(divider)
				.sort(function(a, b) { return a.localeCompare(b, undefined, { sensitivity: "base" }); })
				.join(divider);
		replaceSelection(rText);
	}

// сортує текст в модальному вікні	
	function sortInModal() {
		var dividerId = $(".sortlist.divider.active").data("setting-value"),
			divider = ["\n", ",", ";", " "][parseInt(dividerId)-1] || "\n",
			text    = $("#sortListModal textarea").val(),
			rText   = text
				.split(divider)
				.sort(function(a, b) {
					if ($(".sortlist.order.active").data("setting-value") == "1") 
						return b.localeCompare(a, undefined, { sensitivity: "base" });
					return a.localeCompare(b, undefined, { sensitivity: "base" });
				})
				.join(divider);
		$("#sortListModal textarea").val(rText);
	}

// замінює виділений текст на відсортовний
	function replaceSelection(replacementText) {
		var sel, range;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				var start = sel.getRangeAt(0).startContainer.parentNode.parentNode;
				var end = sel.getRangeAt(0).endContainer.parentNode.parentNode;
				range = document.createRange();
				range.setStartBefore($(start)[0]);
				range.setEndAfter($(end)[0]);
				range.deleteContents();
				range.insertNode(document.createTextNode(replacementText));
			}
		} else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			range.text = replacementText;
		}
	}
	
// відкриває модальне вікно
	function openModal() {
		dev.showCustomModal('Сортування списку', {
			id: "sortListModal",
			content: $("<div>", {
				append: [
					$("<textarea>", {
						val: window.getSelection().toString(),
						css: {
							width: "100%",
							height: "500px"
						}
					}),
					$('<div class = "sortlist group">').append(
						$('<span class="sortlist label">Розділювач</span>'),
						$('<input type="button" class="btn sortlist divider active" data-setting-value="1" value="Новий рядок"/>'),
						$('<input type="button" class="btn sortlist divider" data-setting-value="2" value="Кома"/>'),
						$('<input type="button" class="btn sortlist divider" data-setting-value="3" value="Крапка з комою"/>'),
						$('<input type="button" class="btn sortlist divider" data-setting-value="4" value="Пробіл"/>')
					),
					$("<div>", {
						class: "sortlist group",
						append: [
							$('<span class="sortlist label">Порядок сортування</span>'),
							$('<input type="button" class="btn sortlist order active" data-setting-value="0" value="А-Я"/>'),
							$('<input type="button" class="btn sortlist order" data-setting-value="1" value="Я-А"/>'),
							
						]
					}),
					$('<input type="button" class="btn sortlist sort" value="Сортувати"/>'),
					
				]
			})
		});
		
		$("#sortListModal textarea").focus();
// обробник подій натискання на клавіші налаштувань у вікні
		$("input.sortlist.divider, input.sortlist.order").on("click", function() {
			if (!$(this).hasClass("active")) {
				var lastClass = $(this).attr('class').split(' ').pop();
				$(this).siblings("." + lastClass).removeClass("active");
				$(this).addClass("active");
			}
		});
		$(".sortlist.sort").on("click", function() {
			sortInModal();
		});
	}

// Виводить вікно з вмістом блока #parse з сторінки користувача
	function openWindowParse() {
		const userName = mw.config.get("wgUserName");
		if ($("#openWindowParseDialog").length) { $("#openWindowParseDialog").show(); return; }
		$.get("https://warframe.fandom.com/uk/wiki/Користувач:"+ userName +"?action=render", function(response) {
			var content = $(response).find("#parse").length ? $(response).find("#parse").html() :
				'Додайте код, вказаний нижче на Вашу сторінку ('
				+ '<a target="_blank" href="https://warframe.fandom.com/uk/wiki/Користувач:' + userName + '">Користувач:' + userName + '</a>'
				+ ') за потреби.<br/>&lt;div id="parse"&gt;Тут вміст, який повинен '
				+ 'відображатись в цьому вікні.&lt;/div&gt;';

			var $window = $('<div id="openWindowParseDialog" class="ui-dialog ui-widget ui-widget-content" style="position:fixed;z-index:1005; left:500px;top:200px;min-width:100px;min-height:100px;"><div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix"><span class="ui-dialog-title">Вміст з власної сторінки</span><a href="#" class="ui-dialog-titlebar-close" role="button"><span class="ui-icon ui-icon-closethick">close</span></a></div><div class="ui-dialog-content ui-widget-content">'+ content +'</div></div>').draggable({cancel: ".ui-dialog-content"}).resizable({resize: function( event, ui ) { ui.element.css("position", "fixed")}});
			$("#mw-content-text").append($window);

			$window.find(".ui-dialog-titlebar-close").on("click", function() { 
				$window.hide();
			});
		});
	}
});