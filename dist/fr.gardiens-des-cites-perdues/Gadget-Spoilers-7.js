function hideSpoilers() {
  // Récupération de toutes les sections de niveau 2, 3 et 4 (== Titre ==, === Titre ===, ==== Titre ====)
  const sections = document.querySelectorAll('h2, h3, h4');

  // Boucle sur chaque section
  for (let i = 0; i < sections.length; i++) {
    const sectionTitle = sections[i].textContent.trim(); // Récupération du texte du titre
    
    // Vérification si le titre de la section contient "[GDCP7]"
    if (sectionTitle.includes('[GDCP7]')) {
      let sectionContent = sections[i].nextElementSibling; 
      while (sectionContent && !sectionContent.matches('h2, h3, h4')) {
        sectionContent.style.display = 'none';
        sectionContent = sectionContent.nextElementSibling;
      }
      const spoilerLink = document.createElement('a');
      spoilerLink.textContent = 'Afficher le contenu (spoiler)';
      spoilerLink.style.cursor = 'pointer';
      spoilerLink.addEventListener('click', function() {
        let sectionContent = sections[i].nextElementSibling;
        while (sectionContent && !sectionContent.matches('h2, h3, h4')) { 
          sectionContent.style.display = ''; 
          sectionContent = sectionContent.nextElementSibling; 
        }
        spoilerLink.style.display = 'none'; 
      });
      sections[i].parentNode.insertBefore(spoilerLink, sections[i].nextSibling); 
    }
  }
}

$(document).ready(function() {
  hideSpoilers();
});