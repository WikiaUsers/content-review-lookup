a = document.getElementById("fontInput");
if (a != null) {
	a.outerHTML = "<input id='fontInput' data-output='" + a.getAttribute("data-output") + "' value='" + a.innerHTML + "'/>";
	a = document.getElementById("fontInput");
	a.addEventListener("keyup", function() {document.getElementById(a.getAttribute("data-output")).innerHTML = a.value});
	a.addEventListener("keydown", function() {document.getElementById(a.getAttribute("data-output")).innerHTML = a.value.slice(0, a.value.length - 2) + "&#981555554;"});
}