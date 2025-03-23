/* collapsible h3 (subheader level 1) */
document.querySelectorAll(".mw-body-content > .mw-parser-output > h3").forEach(function(h3)
{
	h3.collapsed = false;
	h3.addEventListener("click", function(e)
	{
		var next = h3.nextElementSibling;
		var collapse = h3.collapsed = !h3.collapsed;

		while (next != null && (next.nodeName != "H3" && next.nodeName != "H2" && next.nodeName != "H1"))
		{
			next.classList.toggle("mobile-hidden", collapse);
			next = next.nextElementSibling;
		}
	});
});

// ensure the page is fully loaded before running the script
$(document).ready(function() {
    // select the collapsible section
    var collapsibleSection = document.querySelector('.collapsible-section');

    if (collapsibleSection) {
        // opens the content by default
        collapsibleSection.classList.add('open-section');
        collapsibleSection.setAttribute('aria-expanded', 'true');
        collapsibleSection.setAttribute('aria-pressed', 'true');
    }
});