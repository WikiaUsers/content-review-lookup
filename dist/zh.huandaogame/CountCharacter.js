function countCharacters() {
  var text = document.getElementById('textInput').value;
  var characterCount = text.length;
  document.getElementById('characterCountDisplay').innerText = characterCount;
}