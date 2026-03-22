$(function () {
	if (!mw.user.options.get('gadget-ReducedColor')) return;
	
    $("span").each(function () {
        var el = this;
        var style = el.getAttribute("style");

        if (!style) return;

        if (
            style.includes("-webkit-background-clip:") &&
            style.includes("-webkit-text-fill-color:")
        ) {
            var bold = document.createElement("b");

            while (el.firstChild) {
                bold.appendChild(el.firstChild);
            }

            el.parentNode.replaceChild(bold, el);
        }
    });
});