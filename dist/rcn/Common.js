/* Any JavaScript here will be loaded for all users on every page load. */
/* <nowiki> Any JavaScript here will be loaded for all users on every page load. */

/* custom button for a character preload */
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120822210346/rcn/images/2/29/Character_Button.png",
     "speedTip": "Preload a Character page",
     "tagOpen": "{{Character\n" +
      " |sex          = <!-- M or F -->\n" +
      " |defaultsort  = <!-- leave blank for Lname, Fname -->\n" +
      " |image        = <!-- default is sex-based icon -->\n" +
      " |birth_name   = <!-- e.g. maiden name -->\n" +
      " |birth_date   = \n" +
      " |birth_place  = <!-- will be linked -->\n" +
      " |death_date   = \n" +
      " |death_place  = \n" +
      " |spouse       = <!-- first wife or husband -->\n" +
      " |spouse2      = \n" +
      " |father       = <!-- parental unit -->\n" +
      " |mother       = <!-- ditto -->\n" +
      " |nation       = <!-- e.g. Republic of Cinnabar -->\n" +
      " |service      = <!-- e.g. Republic of Cinnabar Navy -->\n" +
      " |highest_rank = <!-- so far, or at retirement/death -->\n" +
      " |species      = <!-- leave blank for Human -->\n" +
      "}}\n",
     "tagClose": "",
     "sampleText": "'''{{PAGENAME}}''' was a ..."
};

/* custom button for a vessel preload */
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/rcn/images/9/9c/Spaceship_Button.png",
     "speedTip": "Preload a Vessel page",
     "tagOpen": "{{Vessel\n" +
      " |image              = <!-- default is a spaceship silhoutte -->\n" +
      " |registry_nation    = <!-- e.g. Republic of Cinnabar -->\n" +
      " |service            = <!-- e.g. Republic of Cinnabar Navy -->\n" +
      " |build_nation       = <!-- e.g. Kostroma -->\n" +
      " |year_built         = \n" +
      " |vessel_type        = <!-- e.g. Corvette -->\n" +
      " |vessel_length      = <!-- e.g. 230 feet OR 70 meters -->\n" +
      " |vessel_width       = <!-- can specify feet or meters -->\n" +
      " |mass               = <!-- e.g. 1200 (assumed in tons) -->\n" +
      " |gun_size           = <!-- e.g. 4 inches or 100 mm -->\n" +
      " |number_of_guns     = <!-- e.g. 2 -->\n" +
      " |number_of_missiles = <!-- full complement, e.g. 20 -->\n" +
      " |missile_tubes      = <!-- missile launch tubes -->\n" +
      " |complement         = <!-- nominal crew complement, e.g. 120 -->\n" +
      "}}\n",
     "tagClose": "",
     "sampleText": "The '''''{{PAGENAME}}''''' was a ..."
};

/* </nowiki> */