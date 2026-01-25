document.addEventListener("click", function (e) {
	const header = e.target.closest("[data-event-toggle]");
	if (!header) return;

	const event = header.closest(".eventstable-event");
	const body = event.querySelector(".eventstable-body");
	if (!event || !body) return;

	const isCollapsed = event.classList.contains("collapsed");

	if (isCollapsed) {
		/* expand */
		event.classList.remove("collapsed");
		body.style.maxHeight = body.scrollHeight + "px";

		body.addEventListener("transitionend", function handler() {
			body.style.maxHeight = "";
			body.removeEventListener("transitionend", handler);
		});
	} else {
		/* collapse */
		body.style.maxHeight = body.scrollHeight + "px";
		body.offsetHeight; // force reflow

		body.style.maxHeight = "0px";
		event.classList.add("collapsing");

		body.addEventListener("transitionend", function handler() {
			event.classList.remove("collapsing");
			event.classList.add("collapsed");
			body.removeEventListener("transitionend", handler);
		});
	}
});