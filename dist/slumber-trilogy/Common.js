/* Makes the collapse button on notice boxes work. */
/* Will need to make it permanent until the cache is refreshed, but this works for now. */
document.addEventListener("click", function (e) {
	if (!e.target.classList.contains("notice-close")) {
		return;
	}

	const box = e.target.closest(".notice-box");

	if (box) {
		box.classList.add("notice-hidden");
	}
});