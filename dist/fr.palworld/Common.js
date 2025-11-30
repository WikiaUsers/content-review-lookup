/* =====================================================================
			RECHERCHES DYNAMIQUES : COMPÉTENCES PASSIVES
===================================================================== */
$(document).ready(function () {

	function sanitizeInput(str) {
	    return String(str)
	        .replace(/&/g, "&amp;")
	        .replace(/</g, "&lt;")
	        .replace(/>/g, "&gt;")
	        .replace(/"/g, "&quot;")
	        .replace(/'/g, "&#039;");
	}

    var container = $("#passiveTable");
    if (!container.length) return;

    /* --- Création de la barre principale --- */
    var wrapper = $('<div>', {
        id: 'passiveFilterBar',
        style: 'position: relative;'
    });

    // --- Barre de recherche ---
    var searchInput = $('<input>', {
        type: 'text',
        id: 'passiveSearch',
        placeholder: 'Rechercher un passif...',
        style: ''
    });

    wrapper.append(searchInput);

    /* --- Bouton "Filtrer par niveau" --- */
    var toggleBtn = $('<button>', {
    	id: 'toggleRarityMenu',
    	html: '<i class="fa-solid fa-gear"></i>',
    	style: ''
	});

    wrapper.append(toggleBtn);

    /* --- Menu déroulant des icônes de niveaux --- */
    var rarityMenu = $('<div>', {
        id: 'rarityMenu',
        style: 'display: none;'
    });

    var rarityGroup = $('<div>', {
        id: 'rarityCheckboxGroup',
        style: ''
    });

    rarityMenu.append(rarityGroup);
    wrapper.append(rarityMenu);

    /* --- Création des cases à cocher avec icônes --- */
    var levels = [-3, -2, -1, 1, 2, 3, 4];

    levels.forEach(function (lvl) {
	    var id = "rarity_" + lvl;
	
	    // URL du fichier via Fandom
	    var imgUrl = mw.config.get('wgServer') + mw.config.get('wgScriptPath') +
	        "/images/thumb/" + encodeURIComponent("Compétence passive - Niveau " + lvl + ".png") +
	        "/16px-" + encodeURIComponent("Compétence passive - Niveau " + lvl + ".png");
	
	    // Checkbox cachée
	    var checkbox = $('<input>', {
	        type: 'checkbox',
	        id: id,
	        value: lvl,
	        class: 'rarity-checkbox'
	    });
	
	    // Label visuel cliquable
	    var label = $('<label>', {
	        for: id,
	        class: 'rarity-label',
	        style: ''
	    });
	
	    var img = $('<img>', {
	        src: imgUrl,
	        width: 24,
	        height: 24,
	        style: ""
	    });
	
	    label.append(checkbox);
	    label.append(img);
	    rarityGroup.append(label);
	
	    // === Gestion visuelle du label selon case cochée ===
	    checkbox.on("change", function () {
	        label.toggleClass("selected", checkbox.is(":checked"));
	        applyFilters();
	    });
	});
    
    /* --- Bouton RESET --- */
    var resetBtn = $('<button>', {
	    id: 'passiveReset',
	    html: '<i class="fa-solid fa-circle-xmark"></i>',
	    style: ''
	});

    wrapper.append(resetBtn);

    /* --- Insertion de la barre avant la grille --- */
    container.before(wrapper);

    /* --- Fonction de filtrage --- */
    function applyFilters() {
        var query = sanitizeInput(searchInput.val().toLowerCase().trim());

        // Niveaux cochés
        var activeLevels = [];
        rarityGroup.find('input:checked').each(function () {
            activeLevels.push($(this).val());
        });

        container.children().each(function () {
            var box = $(this);
            var text = box.text().toLowerCase();
            var level = String(box.data("level") || "");

            var matchSearch = (query === "" || text.includes(query));
            var matchLevel =
                activeLevels.length === 0 ||
                activeLevels.includes(level);

            box.toggle(matchSearch && matchLevel);
        });
    }

    /* --- Événements --- */
    // Ouverture / Fermeture du menu
    toggleBtn.on("click", function () {
        var menu = $("#rarityMenu");
        var isOpen = menu.is(":visible");

        menu.toggle(!isOpen);
        toggleBtn.html(isOpen
		    ? '<i class="fa-solid fa-gear"></i>'
		    : '<span class="active"><i class="fa-solid fa-gear"></i></span>'
		);
    });
    
    searchInput.on("input", applyFilters);
    rarityGroup.find("input").on("change", applyFilters);
    
    resetBtn.on("click", function () {
	    searchInput.val("");
	
	    // Décocher toutes les cases
	    rarityGroup.find("input").prop("checked", false);
	
	    // Retirer la classe "selected" de TOUS les labels
	    rarityGroup.find("label").removeClass("selected");
	
	    applyFilters();
	});

});