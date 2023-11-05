// Получает название страницы в URL.
var this_page_name = decodeURI(window.location.href).match("wiki/([^#]+)")[1];
var code_blocks = document.getElementsByClassName('mw-highlight-lines');
var code_block_collapsed = 'mw-highlight-lines_collapsed';

for (var i = 0; i < code_blocks.length; i++) {
	// Если больше 30 строк в коде.
	if (code_blocks[i].getElementsByClassName('linenos').length > 30) {
		code_blocks[i].classList.add(code_block_collapsed);
	}
}

document.addEventListener('click', function(e) {
	if (e.target.nodeName == 'A') smooth_scroll_to_anchor(e);
	else if (e.target.nodeName == 'PRE' && is_collapsed(e.target.parentNode)) expand_code(e.target.parentNode);
});

function smooth_scroll_to_anchor(click_event) {
	var page = decodeURI(click_event.target.href).match("wiki/(.+)#")[1];
	var anchor = decodeURI(click_event.target.href).match('#(.+)')[1];
	var element_to_scroll = document.getElementById(anchor);
	/* Если у ссылки нет якоря или она ссылается на другую страницу или
	элемента на который ссылается якорь не существует */
	if (!anchor || page != this_page_name || !element_to_scroll) return;
	click_event.preventDefault(); // отменяем переход по ссылке

	// Если ссылка - это отрезок кода
	if (anchor == 'Скрипт' && click_event.target.parentNode.nodeName == 'CODE') {
		var code_block = code_blocks[0].getElementsByTagName('PRE')[0];

		if (code_block) {
			// Сохраняем весь код в массив
			var code_elements = code_block.children;
			var lines_array = [];

			var line_string = '';
			var last_element = code_block.lastChild;
			for (var i = 0; i < code_elements.length; i++) {
				if (code_elements[i].classList.contains('linenos') || code_elements[i] == last_element) {
					if (code_elements[i] == last_element) {
						line_string += code_elements[i].innerText;
					}
					lines_array.push(line_string);
					line_string = '';
					continue;
				}

				line_string += code_elements[i].innerText;
			}

			// Ищем нужную строчку в скрипте
			var line_number = lines_array.indexOf(lines_array.find(function(text) {
				return text.indexOf(click_event.target.innerText) != -1;
			}));

			if (line_number) {
				element_to_scroll = code_block.querySelector('[data-line="'+line_number+'"]');
				element_to_scroll.classList.add('linenos_active');
				// Разворачиваем код, если он был свёрнут.
				if (is_collapsed(code_block)) {
					expand_code(code_block);
				}
			}
		}
	}

	var viewport_pos = element_to_scroll.getBoundingClientRect().top;
	var viewport_offset = document.documentElement.scrollTop;
	window.scrollTo({
		top: (viewport_pos + viewport_offset) - 52,
		behavior: "smooth"
	});
}

function is_collapsed(element) {
	return element.classList.contains(code_block_collapsed);
}

function expand_code(element) {
	element.classList.remove(code_block_collapsed);
}