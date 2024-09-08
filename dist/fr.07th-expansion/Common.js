
// Les éléments li correspondent aux items.
var items = document.querySelectorAll('li');

// Les éléments h3 correspondent aux titres de mois.
var months = document.querySelectorAll("div.mw-parser-output h3");

// Les éléments h2 correspondent aux titres d'année.
var years = document.querySelectorAll("div.mw-parser-output h2");


// Affiche tous les items et titres, sauf ceux de classe '.mw-empty-elt'.
function showAll () {    
    for (var i = 0; i < items.length; i++) {
        if (!items[i].classList.contains('mw-empty-elt')) {
            items[i].style.display = 'list-item';
        }
    }
    for (var i = 0; i < months.length; i++) months[i].style.display = '';
    for (var i = 0; i < years.length; i++) years[i].style.display = '';
}

// Affiche uniquement les éléments d'une langue donnée.
// Tous les autres éléments seront masqués.
function showOnlyLanguage (language) {
    for (var i = 0; i < months.length; i++) {
        var month = months[i];
        var items = month.nextElementSibling.children;
        var willHide = true;
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            if (item.classList.contains(language)) {
                item.style.display = 'list-item';
                willHide = false;
            } else {
                item.style.display = 'none';
            }
        }
        month.style.display = willHide ? 'none' : '';
    }
}

// Change la visibilité d'une catégorie donnée.
// Les éléments n'appartenant pas à cette catégorie ne seront pas touchés.
function toggleCategory (category) {
  console.debug('toggleCategory', category);
  try {
    category.visible = !category.visible;

    for (var i = 0; i < months.length; i++) {
        var month = months[i];
        var willHide = true;
        var items = month.nextElementSibling.children;

        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            if (item.classList.contains(category.name)) {
                item.style.display = category.visible ? 'list-item' : 'none';
            }
            if (item.style.display !== 'none') willHide = false;
        }
        month.style.display = willHide ? 'none' : '';
    }
  } catch (err) {
    console.error(err);
  }
}

mw.hook('wikipage.content').add(function() {
    $(function() {
        // Configure les boutons.
        document.getElementById('toggle-japonais').addEventListener('click', function () {
            showOnlyLanguage('japonais');
        });
        document.getElementById('toggle-anglais').addEventListener('click', function () {
            showOnlyLanguage('anglais');
        });
        document.getElementById('toggle-francais').addEventListener('click', function () {
            showOnlyLanguage('francais');
        });

        var categories = [
            { name: 'chapitre', visible: true },
            { name: 'anthologie', visible: true },
            { name: 'mei', visible: true }
        ];

        document.getElementById('toggle-chapitre').addEventListener('click', function () {
            toggleCategory(categories[0]);
        });
        document.getElementById('toggle-anthologie').addEventListener('click', function () {
            toggleCategory(categories[1]);
        });
        document.getElementById('toggle-mei').addEventListener('click', function () {
            toggleCategory(categories[2]);
        });

        document.getElementById('toggle-tous').addEventListener('click', function () {
            showAll();
        });

	// Assure que tout soit affiché par défaut.
        showAll();
    });
});