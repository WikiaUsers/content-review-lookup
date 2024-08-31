mw.hook('wikipage.content').add(function() {
    $(function() {
        // S�lectionner les boutons
        var btnFrancais = document.getElementById('toggle-francais');
        var btnAnglais = document.getElementById('toggle-anglais');
        var btnJaponais = document.getElementById('toggle-japonais');
        var btnChapitre = document.getElementById('toggle-chapitre');
        var btnAnthologie = document.getElementById('toggle-anthologie');
        var btnMei = document.getElementById('toggle-mei');
        var btnTous = document.getElementById('toggle-tous');

        // Variables pour suivre l'�tat de visibilit�
        var francaisVisible = true;
        var anglaisVisible = true;
        var japonaisVisible = true;
        var chapitreVisible = true;
        var anthologieVisible = true;
        var meiVisible = true;

        // Fonction pour afficher uniquement les �l�ments d'une cat�gorie sp�cifique
        function showCategory(category) {
            var allItems = document.querySelectorAll('li');
            for (var i = 0; i < allItems.length; i++) {
                var item = allItems[i];
                if (item.classList.contains(category)) {
                    item.style.display = 'list-item';
                } else {
                    item.style.display = 'none';
                }
            }
        }

        // Fonction pour afficher/masquer les �l�ments par cat�gorie
        function toggleVisibility(className, visibilityState) {
            var items = document.querySelectorAll('li.' + className);
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = visibilityState ? 'list-item' : 'none';
            }
        }

        // Gestion des boutons
        btnFrancais.addEventListener('click', function() {
            showCategory('francais');
        });

        btnAnglais.addEventListener('click', function() {
            showCategory('anglais');
        });

        btnJaponais.addEventListener('click', function() {
            showCategory('japonais');
        });

        btnChapitre.addEventListener('click', function() {
            chapitreVisible = !chapitreVisible;
            toggleVisibility('chapitre', chapitreVisible);
        });

        btnAnthologie.addEventListener('click', function() {
            anthologieVisible = !anthologieVisible;
            toggleVisibility('anthologie', anthologieVisible);
        });

        btnMei.addEventListener('click', function() {
            meiVisible = !meiVisible;
            toggleVisibility('mei', meiVisible);
        });

        btnTous.addEventListener('click', function() {
            // Afficher ou masquer tout
            var allVisible = francaisVisible && anglaisVisible && japonaisVisible && chapitreVisible && anthologieVisible && meiVisible;
            francaisVisible = anglaisVisible = japonaisVisible = chapitreVisible = anthologieVisible = meiVisible = !allVisible;
            
            toggleVisibility('francais', francaisVisible);
            toggleVisibility('anglais', anglaisVisible);
            toggleVisibility('japonais', japonaisVisible);
            toggleVisibility('chapitre', chapitreVisible);
            toggleVisibility('anthologie', anthologieVisible);
            toggleVisibility('mei', meiVisible);
        });

        // Assurer que tout est affich� par d�faut
        var allItems = document.querySelectorAll('li');
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].style.display = 'list-item';
        }
    });
});