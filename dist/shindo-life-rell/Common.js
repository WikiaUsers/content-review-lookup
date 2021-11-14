/* Any JavaScript here will be loaded for all users on every page load. */
var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true  // set to false, if automatic block messages are not desired
};
TBL_GROUP = "roblox-en";

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});

//Credits to HumansCanWinElves for the following script
(function (mw, $, window) {
	
	var propList = [
		'Item',
		'Spawn Time',
		'Despawn',
		'Location',
		'Rarity',
		'Scroll Type'
	],
		data,
        targets = document.getElementsByClassName('items-window'),
        targetsArr = [],
        targetsInner = [],
        clocks = [],
        lastTime = 0,
        interval;
        
    if (window.itemsWindow || !targets.length) { return; }
    window.itemsWindow = { loaded: true };

    function formatFrame(target) {
    	var table = document.createElement('table'),
    	    thead = document.createElement('thead'),
    	    tbody = document.createElement('tbody'),
    	    tr,
    	    th,
    	    i;
    	    
    	    table.classList.add('wikitable');
    	    table
    	    	.appendChild(thead)
    	    	.appendChild(document.createElement('tr'))
    	    	.appendChild(th = document.createElement('th'))
    	    	.setAttribute('colspan', propList.length);
    	    clocks.push(th);

    	    thead.appendChild(tr = document.createElement('tr'));
    	    for (i = 0; i < propList.length; i++) {
    	    	tr.appendChild(th = document.createElement('th'));
    	    	th.textContent = propList[i];
    	    }

    	    table.appendChild(tbody);
    	    target.innerHTML = '';
    	    target.appendChild(table);
    	    return tbody;
    }
			
	function formatItem(item) {
		var tr = document.createElement('tr'), td, a, text, i;
		
		for (i = 0; i < propList.length; i++) {
			tr.appendChild(td = document.createElement('td'));
			text = item[propList[i]];
			if (i === 0 && text) {
				td.appendChild(a = document.createElement('a'));
				a.setAttribute
					('href', mw.util.getUrl(text));
				a.textContent = text;
			} else {
			    td.textContent = text || '-';
			}
		}

		return tr;
	}
	
	function ESTTime12() {
		var d = new Date(),
		    offsetH = d.getTimezoneOffset() - 5 * 60, // EST timezone
		    curTime;

        // Switch to EDT from second Sunday of March 2am EST,
        // to first Sunday of November 2am EDT
        switch (d.getMonth() + 1) {
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            	// April to October are always EDT
            	offsetH++;
            	break;
            case 3:
                if (d.getDate() - d.getDay() < 8) break;
                if (d.getDate() > 14 || d.getDay() > 0 ||
                    d.getHours() > 1) offsetH++;
                break;
            case 11:
                if (d.getDate() > 7) break;
                if (d.getDate() - d.getDay() < 0 ||
                   (d.getDay() === 0 && d.getHours() < 1)) offsetH++;
                break;
        }

        d.setTime(d.valueOf() + offsetH * 60 * 1000);

        // Hours are converted to 12-hours base
        // Minutes are treated as 1/100 for convenience with the
        // string-based input
        curTime = (d.getHours() % 12) + d.getMinutes() / 100;
        if (curTime < 1) {
        	curTime += 12;
        }
        
        return curTime;
	}
	
	function update(curTime) {
		var curTimeStr = curTime.toFixed(2).replace('.', ':'),
		    startTime, stopTime,
		    items = [],
		    output, td,
		    i;

		for (i = 0; i < clocks.length; i++) {
			clocks[i].textContent = curTimeStr;
		}

        for (i = 0; i < data.length; i++) {
            startTime = Number(data[i]['Spawn Time'].replace(':', '.')) || 0;
            stopTime = Number(data[i]['Despawn'].replace(':', '.')) || 0;
            if ((curTime >= startTime && curTime < stopTime) ||
            // Handling cases like "12:40 to 1:10"
            (startTime > stopTime && (curTime > startTime || curTime < stopTime))) {
                items.push(data[i]);
            }
        }

        output = document.createElement('tbody');
        for (i = 0; i < items.length; i++) {
        	output.appendChild(formatItem(items[i]));
        }
        if (!items.length) {
        	td = output.appendChild(document.createElement('tr'))
        		.appendChild(document.createElement('td'));
        	td.setAttribute('colspan', propList.length);
        	td.textContent = 'There are currently no items available';
        }
        
        for (i = 0; i < targetsInner.length; i++) {
        	try {
        		targetsInner[i].innerHTML = output.innerHTML;
        	} catch (err) {
        		console.log('Error while attempting to update a table: ' + err);
        		// Replacing the errorous element with the first one
        		targetsInner[i] = targetsInner[0];
        		targetsInner.shift();
        		
        		// Terminate the script if there are no targets left
        		if (!targetsInner.length) {
        			clearInterval(interval);
        			return;
        		}
        	}
        }
	}
	
	function checkClock() {
		var curTime = ESTTime12();
		if (curTime !== lastTime) {
			lastTime = curTime;
			update(curTime);
		}
	}
	
	function init() {
        var i;
            
        // Freezing the live HTMLCollection
        for (i = 0; i < targets.length; i++) {
        	targetsArr.push(targets[i]);
        }

        for (i = 0; i < targetsArr.length; i++) {
	        targetsInner.push(formatFrame(targetsArr[i]));
        }
        
        // Check clock every 0.5sec
        // If time is different than last time, the data will be updated too
        interval = setInterval(checkClock, 500);
	}

	// Get data
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        data = JSON.parse(this.responseText);
	        mw.loader.using('mediawiki.util').then(init);
	    }
	};
	xhttp.open ('GET', 'https://shindo-life-rell.fandom.com/wiki/MediaWiki:Custom-items.json?action=raw', true);
	xhttp.send();
	
}) (mediaWiki, jQuery, window);