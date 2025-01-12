/* Додає дві кнопки на панель редактора:
Перша - для швидкого сортування виділеного списку
Друга - відкриває модальне вікно в якому можна ввести потрібний текст для сортування,
	натискання другої кнопки з виділеним текстом відразу скопіює його в модальне вікно;
	має налаштування розділювача між елементами для сортування;
	має налаштування порядку сортування
*/
$(function() {
"use strict";

if (mw.config.get('wgAction') == "edit" || mw.config.get('wgAction') == "submit") {
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
	
		wds.render('#mw-editbutton-sortlist');
		wds.render('#mw-editbutton-sortlistModal');
	});

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
// заміняє виділений текст на відсортовний
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
});