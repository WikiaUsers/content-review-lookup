// Делает вкладку «Оригинал» открытой по умолчанию в [[Шаблон:Translation]]
// Makes the "Original" tab open by default in [[Template:Translation]]
function hoverTabShift() {
	document.querySelectorAll('.HoverTabTranslation').forEach(function(hoverTab) {
		hoverTab.firstElementChild.classList.remove('HoverTabDefault');
		hoverTab.lastElementChild.classList.add('HoverTabDefault');
	});
}

hoverTabShift();