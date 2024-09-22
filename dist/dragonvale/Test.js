;

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

function plotDragonReleaseDates(id, dragonReleaseDates) {
    var sortedNames = [];
    var sortedDates = [];
    for (i = 0; i < dragonReleaseDates.length; ++i) {
        sortedNames.push(dragonReleaseDates[i].Name);
        sortedDates.push(dragonReleaseDates[i].ReleaseDate);
    }
    
    var ctx = document.getElementById(id+'-chart');//.getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedNames,
            datasets: [{
                label: 'Dragon Releases Over Time',
                data: sortedDates.map(function(date){return date.getTime();}),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Dragon Name'
                    }
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                            var date = new Date(value);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });                        
                        }
                    },
                    title: {
                        display: true,
                        text: 'Release Date'
                    }
                }
            }
        }
    });
}

function injectCanvas(id) {
	if ($('#'+id).length) {
        var canvas = document.createElement("canvas");
        canvas.id = id+'-chart';
        
        document.getElementById(id).appendChild(canvas);
	}
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
    
    injectCanvas('dragonReleaseChart');
    plotDragonReleaseDates('dragonReleaseChart', dragonReleaseDates)
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