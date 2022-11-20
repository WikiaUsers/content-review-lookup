// Adds an imitation rail to the right-hand side of the page to let you see how
// your code will interact with the rail properly in place when previewing an
// edit.

// NOTE: 
// This script originally used a custom event listener to toggle the rail's
// visibility.  This caused issues with Fandom's built in toggle & Firefox, so
// it was removed.  This script now relies on running early enough that Fandom's
// built-in toggle notices our button and attaches an event listener to it.
// If this ever ends up causing an issue you might want to re-add the custom
// event listener.  You can copy it from here: [[Special:Permalink/3035169]]

mw.hook('wikipage.content').add(function () {
	const currentAction = mw.config.get("wgAction");

	// Make sure the user is using the real source editor
	if (mw.user.options.get("editortype") !== "4") return;
	// Make sure the user is actually editing a page
	if (currentAction !== "edit" && currentAction !== "submit") return;
	// Don't run on the main page or in the mediawiki namespace where the rail doesn't show up
	if (
		mw.config.get("wgPageName") === mw.config.get("wgMainPageTitle") ||
		mw.config.get("wgNamespaceNumber") === 8
	) return;
	// Make sure the script hasn't already run
	if (document.body.dataset.hasPseudoRail === "true") return;

	const page = document.querySelector(".page");
	page.classList.add("has-right-rail");

	const rail = document.createElement("aside");
	rail.classList.add("page__right-rail");
	// Get user settings and hide the rail by default if that's their preference
	if (mw.user.options.get("rightrailvisible") === "hidden") {
		rail.classList.add("is-rail-hidden");
	}

	const railToggle = document.createElement("button");
	railToggle.classList.add("right-rail-toggle");
	railToggle.textContent = "toggle";

	rail.append(railToggle);
	page.append(rail);

	document.body.dataset.hasPseudoRail = "true";
});