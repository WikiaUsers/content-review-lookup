/*      Adds links to a customized slider       */
/* Добавляет ссылки в кастомизированный слайдер */
(function() {
	var slider = document.querySelector('.fandom-slider');
	if (!slider) return;

	var slides = slider.querySelectorAll('.gallerybox');
	var labels = slider.querySelectorAll('.fandom-slider__nav__caption > div');
	var links = [];
    
	labels.forEach(function(label, index) {
		links.push(label.querySelector('.read-more-link').href);
		wrapInLink(label, index);
	});

	slides.forEach(wrapInLink);

	/*  Wraps an element in a link  */
	/* Оборачивает элемент в ссылку */
	function wrapInLink(element, index) {
		var content = element.innerHTML;
		var link = document.createElement('a');
		link.href = links[index];
		link.style.display = 'block';
		element.innerHTML = '';
		element.append(link);
		link.innerHTML = content;
	}
})()