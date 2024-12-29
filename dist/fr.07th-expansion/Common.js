var btnAll = document.getElementById("toggle-tous")

// Boutons de langue.
var btnEnglish = document.getElementById('toggle-anglais')
// Note: pas de cédille.
var btnFrench = document.getElementById('toggle-francais')
var btnJapanese = document.getElementById('toggle-japonais')

// Boutons de catégorie.
var btnAnthology = document.getElementById('toggle-anthologie')
var btnChapter = document.getElementById('toggle-chapitre')
var btnMei = document.getElementById('toggle-mei')

// Pas de filtre de langue par défaut.
var activeLanguageButton = null

var categoriesByName = {
    'anthologie': { visible: true, items: [] },
    'chapitre': { visible: true, items: [] },
    'mei': { visible: true, items: [] }
}
var catAnthology = categoriesByName.anthologie
var catChapter = categoriesByName.chapitre
var catMei = categoriesByName.mei

// Le caractère à ajouter pour "cocher" un bouton.
var checkMark = '\u2714'

var items = []
var months = []
var years = []

function hide (element) {
    element.style.display = 'none'
}

function hideItem (item) {
    if (!item.visible) return;
    item.visible = false
    item.parentMonth.numVisibleItems--
    item.parentYear.numVisibleItems--
    hide(item.element)
    if (item.parentMonth.numVisibleItems === 0) {
        hide(item.parentMonth.header)
        hide(item.parentMonth.header.nextElementSibling)
    }
    if (item.parentYear.numVisibleItems === 0) hide(item.parentYear.header)
}

function loadItems () {
    var currentMonth = null
    var currentYear = null
    var headlines = document.getElementsByClassName("mw-headline")
    try {
        for (var i = 0; i < headlines.length; i++) {
            var header = headlines[i].parentElement
            switch (header.tagName.toLowerCase()) {
                case 'h2': {
                    // Sauvegarde l'objet `year` courant, si défini.
                    if (currentYear) {
                        if (currentYear.numVisibleItems === 0) hide(currentYear.header)
                        years.push(currentYear)
                    }
                    currentYear = { header: header, id: header.firstElementChild.id, items: [], numVisibleItems: 0 }
                    break
                }
                case 'h3': {
                    // Sauvegarde l'objet `month` courant, si défini.
                    if (currentMonth) {
                        if (currentMonth.numVisibleItems === 0) {
                            hide(currentMonth.header)
                            hide(currentMonth.header.nextElementSibling)
                        }
                        months.push(currentMonth)
                    }
                    currentMonth = { header: header, id: header.querySelector("span.mw-headline").id, items: [], numVisibleItems: 0 }
                    var ul = header.nextElementSibling
                    var lis = ul.children
                    for (var j = 0; j < lis.length; j++) {
                        var li = lis[j]
                        var classList = li.classList
                        if (classList.contains('mw-empty-elt')) {
                            hide(li)
                            continue
                        }
                        var item = { element: li, visible: true, parentMonth: currentMonth, parentYear: currentYear }
                        currentMonth.items.push(item)
                        currentMonth.numVisibleItems++
                        currentYear.items.push(item)
                        currentYear.numVisibleItems++
                        // Ajoute l'item dans les catégories adéquates selon sa `classList`.
                        for (var k = 0; k < classList.length; k++) {
                            if (classList[k] in categoriesByName) categoriesByName[classList[k]].items.push(item)
                        }
                        items.push(item)
                    }
                    break
                }
                default: break
            }
        }
    } catch (err) {
        console.error(err)
    }
}

// Coche un bouton.
function markButton (btn) {
    // Si le bouton est déjà coché, ne rien faire.
    if (btn.textContent.slice(-1) === checkMark) return;
    btn.textContent += (' ' + checkMark)
}

// Commande
function reset () {
    showAll()
    setActiveLanguageButton(null)
    markButton(btnAll)
    markButton(btnAnthology)
    markButton(btnChapter)
    markButton(btnMei)
}

// L'argument `languageButton` peut être nul.
function setActiveLanguageButton (languageButton) {
    // Si le bouton donné est déjà actif, ne rien faire.
    if (languageButton === activeLanguageButton) return
    // Décoche l'ancien bouton actif si nécessaire.
    if (activeLanguageButton) unmarkButton(activeLanguageButton)
    activeLanguageButton = languageButton
    // Coche le nouveau bouton actif si nécessaire.
    if (activeLanguageButton) markButton(activeLanguageButton)
    // Décoche le bouton Afficher tout si nécessaire.
    unmarkButton(btnAll)
}

// Commande
function setLanguageFilter (language) {
    var btn = document.getElementById('toggle-' + language)
    if (btn === activeLanguageButton) return;
    showOnlyLanguage(language)
    setActiveLanguageButton(btn)
}

function show (element) {
    element.style.display = ''
}

// Affiche tous les items et titres, sauf ceux de classe '.mw-empty-elt'.
function showAll () {    
    for (var i = 0; i < items.length; i++) {
        showItem(items[i])
    }
}

function showItem (item) {
    if (item.visible) return;
    item.visible = true
    item.parentMonth.numVisibleItems++
    item.parentYear.numVisibleItems++
    show(item.element)
    if (item.parentMonth.numVisibleItems === 1) {
        show(item.parentMonth.header)
        // Affiche aussi l'élément 'ul'.
        show(item.parentMonth.header.nextElementSibling)
    }
    if (item.parentYear.numVisibleItems === 1) show(item.parentYear.header)
}

// Affiche uniquement les éléments d'une langue donnée.
// Tous les autres éléments seront masqués.
function showOnlyLanguage (language) {
    console.debug('showOnlyLanguage', language);
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (!item.element.classList.contains(language)) {
            hideItem(item)
        }
    }
}

// Coche ou décoche un bouton.
function toggleButtonMark (btn) {
    if (btn.textContent.slice(-1) === checkMark) unmarkButton(btn);
    else markButton(btn);
}

// Change la visibilité d'une catégorie donnée.
// Les éléments n'appartenant pas à cette catégorie ne seront pas touchés.
function toggleCategory (category) {
    console.debug('toggleCategory', category);
    try {
        category.visible = !category.visible;
        for (var i = 0; i < category.items.length; i++) {
            var item = category.items[i];
            if (category.visible) {
                // Un filtre de langue a priorité sur un filtre de catégorie.
                if (!activeLanguageButton || item.element.classList.contains(activeLanguageButton.id.slice(7))) {
                    showItem(item)
                }
            } else {
                hideItem(item)
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// Décoche un bouton.
function unmarkButton (btn) {
    if (btn.textContent.slice(-1) === checkMark) {
        btn.textContent = btn.textContent.slice(0, -2);
    }
}

mw.hook('wikipage.content').add(function() {
    $(function() {
        loadItems()
        // Configure les boutons de langue.
        btnJapanese.onclick = function () {
            setLanguageFilter('japonais')
        }
        btnEnglish.onclick = function () {
            setLanguageFilter('anglais')
        }
        btnFrench.onclick = function () {
            setLanguageFilter('francais')
        }
        // Configure les boutons de catégorie.
        btnChapter.onclick = function () {
            toggleCategory(catChapter)
            toggleButtonMark(btnChapter)
        }
        btnAnthology.onclick = function () {
            toggleCategory(catAnthology)
            toggleButtonMark(btnAnthology)
        }
        btnMei.onclick = function () {
            toggleCategory(catMei)
            toggleButtonMark(btnMei)
        }
        // Configure le bouton de réinitialisation.
        btnAll.onclick = function () {
            reset()
        }
        // Assure que tout soit affiché par défaut.
        reset()
    })
})