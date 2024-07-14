$(document).ready(function() {
    var inputBox = document.createElement("div");
    var input = document.createElement("input");
    input.type = "text";
    input.style.display = "inline-block";
    input.style.width = "200px";
    input.style.height = "25px";
    input.placeholder = "异想体编号/名称";

    var textParagraph = document.createElement("p");
     textParagraph.style.display = "inline-block";
    textParagraph.id = "textParagraph";

    inputBox.appendChild(textParagraph);
    inputBox.appendChild(input);
    document.getElementById("Abnormality-search-input").appendChild(inputBox);

    input.addEventListener('input', function(e) {
        var inputValue = e.target.value.toLowerCase();
        var items = document.getElementsByClassName('Abnormality-search-item');

        for (var i = 0; i < items.length; i++) {
            if (items[i].textContent.toLowerCase().indexOf(inputValue) !== -1) {
                items[i].classList.remove('hidden');
            } else {
                items[i].classList.add('hidden');
            }
        }
    });
});
$(document).ready(function() {
            var loadingDiv = document.getElementById('Abnormality-search-loading');
            loadingDiv.style.display = 'none';
});