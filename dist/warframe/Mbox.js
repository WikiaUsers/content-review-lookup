$(function() {
	closeBox();
	setInterval(closeBox, 100);
});

function closeBox() {
	var boxes = document.getElementsByClassName("mbox");
 
	for (i = 0; i < boxes.length; i++) {
		if (!boxes[i].classList.contains("fixed-close")) {
			var id = boxes[i].id;
			boxes[i].classList.add("fixed-close");
			var close = boxes[i].getElementsByClassName("mbox__close")[0];
			/* ×xΧхХ᙭ */
			close.innerHTML = '<span onclick="$(\'#' + id + '\').css(\'display\', \'none\');">×</span>';
		}
	}
}