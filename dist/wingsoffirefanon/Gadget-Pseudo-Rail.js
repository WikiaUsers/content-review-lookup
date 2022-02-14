// Adds an imitation rail to the right-hand side of the
// page to let you see how your code will interact with 
// the rail properly in place when previewing an edit.

mw.hook('wikipage.content').add(function () {
	const currentAction = mw.config.get("wgAction");

	// Make sure the user is using the real source editor
	if (mw.user.options.get("editortype") !== "4") return;
	// Make sure the user is actually editing a page
	if (currentAction !== "edit" && currentAction !== "submit") return;
	// Don't run on the main page or in the mediawiki namespace where the rail doesn't show up
	if (
		mw.config.get("wgMainPageTitle") === mw.config.get("wgMainPageTitle") ||
		mw.config.get("wgNamespaceNumber") === 8
	) return;
	// Make sure the script hasn't already run
	if (document.body.dataset.hasPseudoRail === "true") return;

	const page = document.querySelector(".page");
	page.classList.add("has-right-rail");

	const rail = document.createElement("aside");
	rail.classList.add("page__right-rail");

	const railToggle = document.createElement("button");
	railToggle.classList.add("right-rail-toggle");
	railToggle.textContent = "toggle";
	railToggle.addEventListener("click", function() {
		if (rail.classList.contains("is-rail-hidden")) {
			rail.classList.remove("is-rail-hidden");
		} else {
			rail.classList.add("is-rail-hidden");
		}
	});

	rail.append(railToggle);
	page.append(rail);

	document.body.dataset.hasPseudoRail = "true";
});