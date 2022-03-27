/* Счётчик для числа цитат */

function citeNum() {
	var opts = document.getElementsByClassName("cite-table"),
		num = opts.length - 1,
		tag = document.getElementById("cite-num");
    tag.innerText = num;
}

citeNum();