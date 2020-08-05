/* Any JavaScript here will be loaded for all users on every page load. */
 if (mwCustomEditButtons) {
//Преусмеравање
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png", 
    "speedTip": "Преусмеравање", 
    "tagOpen": "#redirect [[", 
    "tagClose": "]]", 
    "sampleText": "Име чланка"} 
//Шаблон
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Име шаблону"}
//Шаблон "Број чланака"
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Да убаците шаблон Број чланака",
    "tagOpen": "{{Број чланака|",
    "tagClose": "}}",
    "sampleText": "Линк на вики (пун)"}
}