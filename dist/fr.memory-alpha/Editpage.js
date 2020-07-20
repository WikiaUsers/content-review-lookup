/**
* Insertion de nouveaux boutons dans la barre d'outils d'édition
*/

// Add Insert Buttons
function addInsertButton( img, speedTip, tagOpen, tagClose, sampleText ){
mwCustomEditButtons[mwCustomEditButtons.length] = {
'imageFile': img,
'speedTip': speedTip,
'tagOpen': tagOpen,
'tagClose': tagClose,
'sampleText': sampleText
};
}

addInsertButton('https://images.wikia.nocookie.net/memoryalpha/fr/images/7/77/Bouton_redirection.png',
'Redirection',
'#REDIRECTION[[',
']]',
'nom de la destination',
'mw-editbutton-redir');