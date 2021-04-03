/* Any JavaScript here will be loaded for all users on every page load. */

/* Edit Wall Greeting Button */

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
/* These are the new custom edit buttons.   */
 
 
if (mwCustomEditButtons.length) {
 
//Custom edit button for Comments
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images.wikia.com/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
    "speedTip": "Comment visible only for editors",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Insert comment here"
};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/empireearth/images/5/58/Fruit_bowl.jpg",
    "speedTip": "Resources",
    "tagOpen": "\{\{Resources\|wood= \|food= \|gold= ",
    "tagClose": "\|stone= \|iron= \}\}",
    "sampleText": ""
};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/empireearth/images/0/0e/Scenario_Infobox_Button.png",
    "speedTip": "Scenario Infobox",
    "tagOpen": "\{\{Scenario Infobox \r| Game		        = ",
    "tagClose": "\r| Campaign	        = \r| Preceding Scenario	= \r| Following Scenario	= \r| Civ Points	        = \r| Civilizations         = \r| Heroes		= \r\}\}",
    "sampleText": ""
};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/empireearth/images/8/8c/Button_building.png",
    "speedTip": "Building Infobox",
    "tagOpen": "\{\{Building Infobox \r|Name           = ",
    "tagClose": "\r|Image          = \r|Game1          = \r|Game2          = \r|Epoch          = \r|Type           = \r|RPS            = \r|HP             = \r|Attack         = \r|Range          = \r|LOS            = \r|Cost           = \r|Build Time     = \r|Upgrades from  = \r|Upgrades to    = \r\}\}",
    "sampleText": ""
};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/empireearth/images/c/c6/Button_unit.png",
    "speedTip": "Unit Infobox",
    "tagOpen": "\{\{Unit Infobox \r|Name           = ",
    "tagClose": "\r|Image          = \r|Game1          = \r|Game2          = \r|Epoch          = \r|Trained At     = \r|Built At       = \r|Type           = \r|Attack Type    = \r\r|HP             = \r|Attack         = \r|Armor          = \r|Arrow          = \r|Pierce         = \r|Shock          = \r|Area Effect    = \r|Gun            = \r|Laser          = \r|Transport      = \r|Speed          = \r|Power/Mana     = \r|Range          = \r\r|LOS            = \r|Cost           = \r|Pop Count      = \r|Build Time     = \r|Upgrades From  = \r|Upgrades To    = \r\}\}",
    "sampleText": ""
};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/empireearth/images/9/96/Button_character.jpg",
    "speedTip": "Character Infobox",
    "tagOpen": "\{\{Character Infobox \r|Name               = ",
    "tagClose": "\r|Image              = \r|Game               = \r|Campaign           = \r|Scenarios          = \r|Unit Appearance    = \r|Hero Type          = \r|Hit Points         = \r|Attack Points      = \r|Armor              = \r|Range              = \r|Speed              = \r|LOS                = \r|Attack Type        = \r|Power/Mana         = \r|Pop Count          = \r|Epoch              = \r|Build Time         = \r|Cost               = \r|Upgrades From      = \r|Upgrades To        = \r\}\}",
    "sampleText": ""
};
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/empireearth/images/5/5f/Button_epoch.png",
    "speedTip": "Epoch Infobox",
    "tagOpen": "\{\{Epoch Infobox \r|Name           = ",
    "tagClose": "\r|Icon           = \r|Image          = \r|Caption        = \r|Game1          = \r|Game2          = \r|Time Period    = \r|PrevEpoch      = \r|NextEpoch      = \r|Resources      = \r\}\}",
    "sampleText": ""
};
}