if (document.getElementsByClassName('infobox')) {

document.getElementsByClassName('infobox')[0].addEventListener('mouseover', function(e) {
if (e.target.tagName == 'TD' || e.target.tagName == 'TH' && !e.target.hasAttribute('colspan')) {
e.target.parentNode.style.color = 'rgba(255, 255, 255, 1)';
e.target.parentNode.style.fontWeight = 'bold';
e.target.parentNode.style.backgroundColor = 'rgba(255, 41, 237, 1)';

	e.target.addEventListener('mouseout', function(f) {
	f.target.parentNode.removeAttribute('style');
	}, false);
	}
}, false);
}