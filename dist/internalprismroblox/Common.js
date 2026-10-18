/* Any JavaScript here will be loaded for all users on every page load. */

      // parse dropdown sections
      /* Any JavaScript here will be loaded for all users on every page load. */
// Wait for MediaWiki to be fully loaded and ready
mw.hook('wikipage.content').add(function ($content) {

    const pagePart = document.querySelector("#mw-content-text") || document.querySelector(".mw-body-content");
    if (!pagePart) return;

    const dropdown_opt_sections = pagePart.querySelectorAll(".DropdownSection");

    for (let section of dropdown_opt_sections) {

        if (section.querySelector(".DropdownSButton")) continue;

        const firstChild = section.children[0];
        if (!firstChild) continue;

        let isdropped = section.classList.contains("show");
        const initialText = isdropped ? 'Hide' : 'Show';

        firstChild.insertAdjacentHTML(
            "afterEnd",
            `<button class='DropdownSButton' type='button'>[<span style="color: var(--theme-accent-color)">${initialText}</span>]</button>`
        );
        
        const button = section.querySelector(".DropdownSButton");
		// Guardcheckdesign
		if (initialText == "Hide") {
			button.innerHTML = `[<span style="color: var(--theme-accent-color--hover)">${initialText}</span>]`
		}
		// rest
        
        button.addEventListener("click", function dropdownclick() {
            if (isdropped) {
                section.className = "DropdownSection";
                button.innerHTML = `[<span style="color: var(--theme-accent-color) ">Show</span>]`;
                isdropped = false;
            } else {
                section.className = "DropdownSection show";
                button.innerHTML = `[<span style="color: var(--theme-accent-color--hover)">Hide</span>]`;
                isdropped = true;
            }
        });
    }
});