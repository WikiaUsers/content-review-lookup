// Remove spoiler class for all paragraphs
function removeSpoilerClasses(){
	spoilerParagraphs = document.getElementsByClassName("spoiler");
	for(var i = spoilerParagraphs.length - 1; i >= 0; i--){
	    spoilerParagraphs[i].classList.remove("spoiler");
	}
}

// Add onclick listener to spoiler spans
spoilerButtons = document.getElementsByClassName("hideSpoilerButton");
for(var i = 0; i < spoilerButtons.length; i--){
    var a = document.createElement('a');
    a.href = "#";
    a.addEventListener( 'click', function(){removeSpoilerClasses()});
    spoilerButtons[i].appendChild(a).appendChild(a.previousSibling);
}