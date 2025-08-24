/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
mw.loader.using('mediawiki.util', function() {
    console.log("Script MediaWiki chargé et prêt !");

    const collapsible = document.querySelector(".collapsible-section");
    if (collapsible && !collapsible.classList.contains("open-section")) {
        console.log("Collapsible trouvé, ouverture simulée.");

        collapsible.classList.add("open-section");
        collapsible.setAttribute("aria-pressed", "true");
        collapsible.setAttribute("aria-expanded", "true");

        const content = collapsible.querySelector(".collapsible-content");
        if (content) {
            content.style.display = "block";
            console.log("Contenu affiché.");
        }
    }
});