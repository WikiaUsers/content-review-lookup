var elementsWorthCopying = document.querySelectorAll(".helpersheet .thelper");

// Add click event listener for clicking the text
var styleSheetWrapperEl = document.getElementById('js-helpersheet');
styleSheetWrapperEl.addEventListener('click', function (e) {
  if (e.target.className !== 'thelper') return;
  var element = e.target;
  copyText(element);
});

// Main functionality
function copyText(element) {
  var textToCopy = element.innerText;
  var myTemporaryInputElement = document.createElement("input");
  myTemporaryInputElement.type = "text";
  myTemporaryInputElement.value = textToCopy;
  document.body.appendChild(myTemporaryInputElement);
  myTemporaryInputElement.select();
  document.execCommand("Copy");
  document.body.removeChild(myTemporaryInputElement);
}