/* Any JavaScript here will be loaded for all users on every page load. */

function handleSpoilerBox(event) {
	target = event.target
	if (target.classList.contains('toggle') && target.parentElement.classList.contains('spoiler-box'))
		target.parentElement.classList.toggle('collapsed')
	if (target.classList.contains('remote-spoiler-toggle')) {
		target.classList.toggle('active')
		if (!target.classList.contains('section-toggle'))
			document.getElementById(target.dataset.bind).classList.toggle('collapsed')
		else {
			children = document.getElementById(target.dataset.bind).children
			isActive = target.classList.contains('active')
			for (var i = 0; i < children.length; i++) {
				subSection = document.getElementById(children[i].dataset.bind)
				if (isActive) {
					children[i].classList.add('active')
					subSection.classList.remove('collapsed')
				} else {
					children[i].classList.remove('active')
					subSection.classList.add('collapsed')					
				}
			}
		}
	}
}

$(function () {

	if (document.querySelector('.spoiler-box') != undefined)
		document.getElementById('mw-content-text').addEventListener('click', handleSpoilerBox)

}());