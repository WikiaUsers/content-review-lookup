/* Any JavaScript here will be loaded for all users on every page load. */

(function () {

function fixCardPopup(e) {
	var elem;
	if (e.target) {
		elem = e.target.nextElementSibling;
	} else {
		elem = e;
	}
	if (elem.offsetWidth && elem.previousElementSibling && elem.previousElementSibling.offsetWidth) {
		if (elem.getBoundingClientRect().x > window.innerWidth / 2) {
			elem.style.left = '-' + (elem.offsetWidth - elem.previousElementSibling.offsetWidth + 20) + 'px';
		} else {
			elem.style.left = '20px';
		}
	}
}

function fixCardPopups() {
	var elems = document.querySelectorAll('.hoverpopup > a');
	for (var i = 0; i < elems.length; i++) {
		elems[i].title = '';
		elems[i].addEventListener('mouseover', fixCardPopup);
	}
	elems = document.querySelectorAll('.popuponhover img');
	for (i = 0; i < elems.length; i++) {
		fixCardPopup(elems[i].parentElement);
	}
}

function initCommon() {
	fixCardPopups();
}

try {
	initCommon();
} catch (error) {
	$(document).ready(initCommon);
}

})();