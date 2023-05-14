/* Lock Comments moment */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;

// This code was written by ChatGPT lmao

// Check if the current page matches the desired URL
if (window.location.href === 'https://instruments.fandom.com/wiki/User:Eterhox') {
  // Create a new link element and set its attributes to load the new CSS file
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://community.fandom.com/load.php?mode=articles&articles=User:Eterhox/Dev.css&only=styles';
  // Append the link element to the head section of the document
  document.head.appendChild(link);
}