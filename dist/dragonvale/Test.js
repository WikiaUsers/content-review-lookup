;
 var colorMap = {
        plant: "green",
        fire: "red",
        earth: "#6e3b0e",
        cold: "skyblue",
        lightning: "yellow",
        water: "blue",
        air: "purple",
        metal: "orange",
        light: "lightyellow",
        dark: "darkslategray",
        rainbow: "#6b03ee",
        sun: "#fd7700",
        moon: "#183169",
        treasure: "#af8109",
        olympus: "#6c3107",
        seasonal: "#00a624",
        apocalypse: "#4a0905",
        dream: "#16a1be",
        snowflake: "#102773",
        monolith: "#029545",
        galaxy: "#332288",
        ornamental: "#b92000",
        aura: "#ce56ca",
        chrysalis: "#af8109",
        hidden: "#a7f432",
        surface: "#f6ad09",
        melody: "#ff7578",
        zodiac: "#09acff",
        gemstone: "#330c62",
        crystalline: "#ce56ca",
        legendary: "#22008e",
        time: "#22008e",
        nest: "#e178bd",
        vault: "#e36d37",
        limited: "#5f0504",
        permanent: "#2332ff",
        ghostly: "cyan",
        mythic: "#852527",
        rift: "magenta",
        celebration: "grey",
        omni: "grey"
    };
function loadDragons(api) {
    return new Promise(function(resolve, reject) {
		var pageTitle = 'Data:Dragons.json';
	
	    api.get({
		action: "query",
		format: "json",
		prop: "revisions",
		titles: pageTitle,
		rvprop: "content",
		rvslots: "main"
	}).done(function(data) {
	        var pages = data.query.pages;
	        var pageId = Object.keys(pages)[0];
	        
	        if (pageId === "-1") {
	            console.info('Page not found');
	            return;
	        }
	
	        var content = pages[pageId].revisions[0].slots.main['*'];
	        
	        try {
	            var jsonData = JSON.parse(content);
	           resolve(jsonData);
	        } catch (e) {
	            reject('Error parsing JSON:', e);
	        }
	    }).fail(function(error) {
	        reject('API request failed:', error);
	    });
	 });
}

function createDragonReleaseDataset(dragonReleaseDates) {
  
    

}

function injectCanvas(id) {
	if ($('#'+id).length) {
        var canvas = document.createElement("canvas");
        canvas.style.background = "white";
        canvas.style.color = "black";
        canvas.id = id+'-chart';
        
        document.getElementById(id).appendChild(canvas);
	}

    return document.getElementById(id + '-chart');
}

function addReleaseHistoryChart(dragons) {
	var dragonReleaseDates = dragons.map(function(dragon) {
        var releaseDateStr = dragon.ReleaseDate;
        var lastSpaceIndex = releaseDateStr.lastIndexOf(' ');
        var dateStr = releaseDateStr.slice(0, lastSpaceIndex);
        var parsedDate = new Date(dateStr);

        return {
            Name: dragon.Name,
            ReleaseDate: parsedDate
        };
    });
    
    //console.info(dragonReleaseDates);
    
    plotDragonReleaseDates(injectCanvas('dragonReleaseChart'), dragonReleaseDates);


    var dragonReleaseDatesGrouped = {};
    dragons.forEach(function (dragon) {
        var releaseDateStr = dragon.ReleaseDate;
        var lastSpaceIndex = releaseDateStr.lastIndexOf(' ');
        var dateStr = releaseDateStr.slice(0, lastSpaceIndex);
        var parsedDate = new Date(dateStr);

        var primaryElement = dragon.Elements[0];

        if (!dragonReleaseDatesGrouped[primaryElement]) {
            dragonReleaseDatesGrouped[primaryElement] = [];
        }

        dragonReleaseDatesGrouped[primaryElement].push({
            Name: dragon.Name,
            ReleaseDate: parsedDate
        });
    });

    plotDragonReleaseDatesByElement(injectCanvas('dragonReleaseElementChart'), dragonReleaseDatesGrouped);
}


function initializeWhenDivIsReady(id, callback) {
    var observer = new MutationObserver(function (mutations, observerInstance) {

        var $element = document.getElementById(id);
        if ($element) {
            observerInstance.disconnect();

            callback($element);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

mw.loader.using('mediawiki.api', function() {
    var api = new mw.Api();
    loadDragons(api)
        .then(function(jsonData) {
            
            var dragons = jsonData.dragons;

            mw.hook('wikipage.content').add(function () {

                initializeWhenDivIsReady('dragonSandbox', function($el) {
                    //initializeSandbox(dragons);
                });

                addReleaseHistoryChart(dragons);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
});