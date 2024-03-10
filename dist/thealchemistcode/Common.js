/* Any JavaScript here will be loaded for users using the 2 column main page layout */
/*************************
 * JQuery Random  Plugin *
 *************************/

/**
 * Adds a 'random' filter to jQuery, which selects 1 or more elements at random for the current jQuery set.
 * Defaults to 1 element if a amount isn't given.
 */

jQuery.fn.random = function(count) {
    var count = (typeof count !== 'undefined') ?  count : 1;
    // Return the current set if an invalid count is asked for.
    if ( count < 1 || count >= this.length || ! Number.isInteger(Number(count)) ) {
        return jQuery(this);
    }

    var indexes = [];
    var resultset = [];
    while ( indexes.length < count ) {
        // Generate a random index
        var index = Math.floor(Math.random() * this.length);
        
        // reroll the random index if it's already present
        var reroll = false;
        for (var i = 0; i < indexes.length; i++) {
            if ( indexes[i] == index ) {
                reroll = true;
            }
        }
        if (reroll) {
            continue;
        }

        // Add the index/element to the result set
        indexes.push(index);
        resultset.push(this[index]);
    }
    return jQuery(resultset);
}

/*****************
 * Random subset *
 *****************/

/**
 * A random subset of list elements within elements with the 'random-subset' class are show, while the rest are hidden.
 * The 'data-random-subset-count' attribute can be used to specify the number of elements to be displayed.
 */

$('.random-subset').each(function() {
    var count = 1;
    // If the data-random-subset-count attribute is present use that count
    if ($(this).attr('data-random-subset-count')) {
        count = $(this).attr('data-random-subset-count');
    }
    var entries = $(this).find('li');
    $(entries).random(entries.length - count).remove();
    // show the root element in case it was hidden while waiting for JS.
    $(this).show();
});


/* Added by Rangedz */

if(mw.config.get('wgCategories').indexOf("Loadable Map") > -1){
    var threeJs         = "https://thealchemistcode.gamepedia.com/index.php?title=MediaWiki:Three.js&action=raw&ctype=text/javascript";
    var alcCodeMapVisJs = "https://thealchemistcode.gamepedia.com/index.php?title=MediaWiki:AlcCodeMapVis.js&action=raw&ctype=text/javascript";
    var divUpdater = function(str){
        Array.from(document.getElementsByClassName("loadable-map")).forEach(function(domElement, index) {
            domElement.innerHTML = str;
        });
    };
    var loadMaps = function(){
        divUpdater("Fetching Three.js...");
         $.getScript(threeJs)
            .done(function(script, textStatus){
                console.log('Three.js loaded');
                divUpdater("Fetching map generator script...");
                $.getScript(alcCodeMapVisJs)
                    .done(function(script2, textStatus2){
                        //Things here run AFTER the script that was just loaded
                        console.log('AlcCodeMapVis.js loaded');
                        AlcCodeMapVis.loadMaps();
                    })
                    .fail(function(jqxhr, settings, exception){
                        divUpdater("Unable to fetch the map generator script, try to reload the page");
                        console.log("Unable to fetch "+alcCodeMapVisJs);
                        console.log("Exception: " + exception.stack);
                    });
            })
            .fail(function(jqxhr, settings, exception){
                divUpdater("Unable to fetch Three.js, try to reload the page");

                console.log("Unable to fetch "+threeJs);
                console.log("Exception: " + exception.stack);
        });
    };

    Array.from(document.getElementsByClassName("wikiButton")).forEach(function(domElement, index) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = domElement.dataset.content;
        button.onclick = loadMaps;
        domElement.appendChild(button);
    });
}

/* End of added by Rangedz*/


// Added by River
// Adds hyperlinks to required modules
$(function() {
	if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
	$('.s1, .s2').each(function() {
		var html = $(this).html();
		var quote = html[0];
		var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
		var name = html.replace(quoteRE,"");
		if (name.startsWith("Module:")) {
			var target = name.replace(/ /g,'%20');
			var url = mw.config.get('wgServer') + '/' + target;
			var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
			$(this).html(str);
		}
	});
});