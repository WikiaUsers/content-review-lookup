/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        speedTip: "Redirect",
        tagOpen: "#REDIRECT [[",
        tagClose: "]]",
        sampleText: "Insert text"
    };

}