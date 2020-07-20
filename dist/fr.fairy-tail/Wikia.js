/* Bouton pour ajouter le modèle Documentation Image - Par Hulothe */
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
    "speedTip": "Insérer le modèle {{Documentation Image}}",
    "tagOpen": "",
    "tagClose": "\r\{\{Documentation Image \r|Description  =\r|Source  =\r|Vu  =\r|Information  =\r\}\}",
    "sampleText": ""
};

//Ajout du calendrier en haut de l'activité du wiki
window.AddRailModule = [{prepend: true}];

//Profile Tags config
(window.dev = window.dev || {}).profileTags = {
    noHideTags: true
};

/* Ajout de la classe activetab  à l'onglet actif de la ParentTab Portable */
$( '.pi-theme-parenttab .pi-header .selflink').parent().addClass('activetab');