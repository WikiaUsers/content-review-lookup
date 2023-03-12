function replaceMessageSystem(messageName, newText) {
  var elements = document.querySelectorAll('.' + messageName);
  if (elements.length > 0) {
    elements.forEach(function(element) {
      var message = mw.message(messageName);
      element.textContent = newText;
    });
  } else {
    replaceMessageSystemLinks(messageName, newText);
  }
}

function replaceMessageSystemLinks(messageName, newText) {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var linkText = link.textContent.trim();
    if (linkText === mw.message(messageName).plain()) {
      link.textContent = newText;
    }
  }
}

/** Exemples :
replaceMessageSystem('noarticletext', 'Test1');
replaceMessageSystem('edit', 'Test2');
replaceMessageSystem('license-description', 'Test3'); **/