/* Das folgende JavaScript wird für alle Benutzer geladen. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});

function ändereText() {
  var element = document.getElementById('dynamischer-text2');
  var text = element.innerHTML;
  var aktuellesZeichen = text.charAt(textIndex);
  var nächstesZeichenIndex = (textIndex + 1) % wechselndeZeichen.length;
  var nächstesZeichen = wechselndeZeichen.charAt(nächstesZeichenIndex);

  text = text.replace(aktuellesZeichen, nächstesZeichen);
  element.innerHTML = text;
  textIndex = nächstesZeichenIndex;
}

setInterval(ändereText, 500);

document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('linkZ');
  var link = document.createElement('a');
  link.href = 'https://docs.google.com/';
  link.textContent = 'Viele Bunte Samarties';
  container.innerHTML = '';
  container.appendChild(link);
});