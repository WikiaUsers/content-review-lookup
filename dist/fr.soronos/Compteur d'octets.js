(function() {
  // Sélectionne tous les éléments ayant la classe ".mw-plusminus-neg"
  const elements = document.querySelectorAll('.mw-plusminus-neg');
  
  // Initialisation de la variable pour stocker la somme
  let sum = 0;
  
  // Parcours des éléments et extraction des valeurs pour les additionner
  elements.forEach(element => {
    const value = element.textContent.trim(); // Récupère le contenu texte et retire les espaces
    if (value.startsWith('−')) {
      const numericValue = parseInt(value.substring(1).replace(/\s+/g, '')); // Retire les espaces avant de convertir en nombre
      if (!isNaN(numericValue)) {
        sum += numericValue; // Ajoute à la somme si c'est un nombre valide
      }
    }
  });
  
  // Sélectionne l'élément <span> avec la classe "soustraction-octets"
  const soustractionOctetsElement = document.querySelector('.soustraction-octets');
  
  // Affiche la somme dans l'élément <span>
  if (soustractionOctetsElement) {
    soustractionOctetsElement.textContent = sum;
  } else {
    console.log('Élément .soustraction-octets non trouvé.');
  }
})();

(function() {
  // Sélectionne tous les éléments ayant la classe ".mw-plusminus-pos"
  const elements = document.querySelectorAll('.mw-plusminus-pos');
  
  // Initialisation de la variable pour stocker la somme
  let sum = 0;
  
  // Parcours des éléments et extraction des valeurs pour les additionner
  elements.forEach(element => {
    const value = element.textContent.trim(); // Récupère le contenu texte et retire les espaces
    if (value.startsWith('+')) {
      const numericValue = parseInt(value.substring(1).replace(/\s+/g, '')); // Retire les espaces avant de convertir en nombre
      if (!isNaN(numericValue)) {
        sum += numericValue; // Ajoute à la somme si c'est un nombre valide
      }
    }
  });
  
  // Sélectionne l'élément <span> avec la classe "somme-octets"
  const sommeOctetsElement = document.querySelector('.somme-octets');
  
  // Affiche la somme dans l'élément <span>
  if (sommeOctetsElement) {
    sommeOctetsElement.textContent = sum;
  } else {
    console.log('Élément .somme-octets non trouvé.');
  }
})();