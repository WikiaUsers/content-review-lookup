// Function to remove target="_blank" from anchor tags
function removeBlankTargets() {
  let anchorTags = document.querySelectorAll('a');
  anchorTags.forEach(anchor => {
    if (anchor.getAttribute('target') === '_blank') {
      anchor.removeAttribute('target');
    }
  });
}

// Initial run to handle already existing links
removeBlankTargets();

// Create a MutationObserver to watch for changes in the DOM
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // Check if the added node is an anchor tag
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
        if (node.getAttribute('target') === '_blank') {
          node.removeAttribute('target');
        }
      }
    });
  });
});

// Start observing the DOM for added nodes
observer.observe(document.body, { childList: true, subtree: true });

console.log('All target="_blank" attributes have been removed.');
console.log('Observer is now watching for new links to remove target="_blank".');


// Latin -> Cyrillic -----------------------------------------------------------
document.querySelectorAll('.page-Test-Project_Cyrillic p').forEach(p => {
	p.innerHTML = p.innerHTML
		.replace(/Sch/g, 'Ш')
		.replace(/sch/g, 'ш')
		.replace(/Ch/g, 'Х')
		.replace(/ch/g, 'х')
		.replace(/Q/g, 'К')
		.replace(/q/g, 'к')
		.replace(/W/g, 'В')
		.replace(/w/g, 'в')
		.replace(/E/g, 'Е')
		.replace(/e/g, 'е')
		.replace(/R/g, 'Р')
		.replace(/r/g, 'р')
		.replace(/T/g, 'Т')
		.replace(/t/g, 'т')
		.replace(/Z/g, 'Ц')
		.replace(/z/g, 'ц')
		.replace(/U/g, 'У')
		.replace(/u/g, 'у')
		.replace(/I/g, 'И')
		.replace(/i/g, 'и')
		.replace(/O/g, 'О')
		.replace(/o/g, 'о')
		.replace(/P/g, 'П')
		.replace(/p/g, 'п')
		.replace(/Ü/g, 'Ÿ')
		.replace(/ü/g, 'ÿ')
		.replace(/A/g, 'А')
		.replace(/a/g, 'а')
		.replace(/S/g, 'З')
		.replace(/s/g, 'з')
		.replace(/ẞ/g, 'С')
		.replace(/ß/g, 'с')
		.replace(/D/g, 'Д')
		.replace(/d/g, 'д')
		.replace(/F/g, 'Ф')
		.replace(/f/g, 'ф')
		.replace(/G/g, 'Г')
		.replace(/g/g, 'г')
		.replace(/H/g, 'Х')
		.replace(/h/g, 'х')
		.replace(/J/g, 'Й')
		.replace(/j/g, 'й')
		.replace(/K/g, 'К')
		.replace(/k/g, 'к')
		.replace(/L/g, 'Л')
		.replace(/l/g, 'л')
		.replace(/Ä/g, 'Э')
		.replace(/ä/g, 'э')
		.replace(/Y/g, 'Ÿ')
		.replace(/y/g, 'ÿ')
		.replace(/X/g, 'Кс')
		.replace(/x/g, 'кс')
		.replace(/C/g, 'С')
		.replace(/c/g, 'с')
		.replace(/V/g, 'В')
		.replace(/v/g, 'в')
		.replace(/B/g, 'Б')
		.replace(/b/g, 'б')
		.replace(/N/g, 'Н')
		.replace(/n/g, 'н')
		.replace(/M/g, 'М')
		.replace(/m/g, 'м');
});