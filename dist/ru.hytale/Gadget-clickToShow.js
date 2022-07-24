var explainElements = document.getElementsByClassName("explain");
var explainElementsLength = explainElements.length;
for (var i=0; i<explainElementsLength; i++) {
	explainElements[i].addEventListener("click",function(){
		var text = this.getElementsByClassName("title-text")[0];
		text.style.display = (text.style.display != "none" ? "none" : "inline");
	});
}