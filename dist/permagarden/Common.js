/* Any JavaScript here will be loaded for all users on every page load. */

if (mwCustomEditButtons) {
 
   /* Add a custom edit button that inserts Category: boilerplate */
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2a/Button_category_plus.png",
     "speedTip": "Add a category",
     "tagOpen": "[[Category:",
     "tagClose": "]]\n",
     "sampleText": ""
  }

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0c/Button_P_template.png",
     "speedTip": "Insert a blank NewPlant template",
     "tagOpen": "{{subst:NewPlant",
     "tagClose": "}}\n",
     "sampleText": ""
  }
}