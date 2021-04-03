// profile tags are located at MediaWiki:ProfileTags
// imports are located at MediaWiki:ImportJS

(function() { "use strict";

window.InactiveUsers = { months: 4 };

// Time to automate the season change tbh

var currentSeason;
switch((new Date()).getMonth() + 1) {
    case 12:
    case 1:
    case 2:
        currentSeason = "winter";
        break;
    case 3:
    case 4:
    case 5:
        currentSeason = "spring";
        break;
    case 6:
    case 7:
    case 8:
        currentSeason = "summer";
        break;
    case 9:
    case 10:
    case 11:
        currentSeason = "autumn";
        break;
    default:
        currentSeason = "summer";
        break;
}

var seasonStyle = {
	spring: {
		hover: "#337800",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/c/c4/Grass_spring.png/revision/latest"
	},
	summer: {
		hover: "#337800",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/8/8f/Grass_summer.png/revision/latest"
	},
	autumn: {
		hover: "#A15B26",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/5/5b/Grass_autumn.png/revision/latest"
	},
	winter: {
		hover: "#04049E",
		url: "https://vignette.wikia.nocookie.net/animalcrossing/images/f/f3/Grass_snow.png/revision/latest"
	}
};

mw.util.addCSS("a:hover { text-shadow: 0 0 1em "+seasonStyle[currentSeason].hover+", 0 0 0.2em "+seasonStyle[currentSeason].hover+"; color:white !important; } \
a.topiclink:hover { text-shadow: 0 0 1em "+seasonStyle[currentSeason].hover+", 0 0 0.2em "+seasonStyle[currentSeason].hover+"; color:white !important; } \
body.skin-oasis { background: #f1f1f1 url('"+seasonStyle[currentSeason].url+"') top left repeat; }");

})();