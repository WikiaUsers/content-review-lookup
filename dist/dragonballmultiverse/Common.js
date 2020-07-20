var width = Math.max($(document).width(), $(window).width()); //Width of page

/* Moving objects */
var MovingObjs = [{
    'name':'https://vignette.wikia.nocookie.net/dragonballmultiverse/images/d/dd/Move-nuage2.png',
    'speed':3000,
    'chemin':[-470,957, width,957] //Positions that the cloud will move to
},
{
    'name':'https://vignette.wikia.nocookie.net/dragonballmultiverse/images/2/22/Move-bird1.gif',
    'speed':100,
    'chemin':[width,700, width - 194,850, width - 56,620, width,700]
},
{
    'name':'https://vignette.wikia.nocookie.net/dragonballmultiverse/images/2/22/Move-bird1.gif',
    'speed':100,
    'chemin':[0,800, 43,1100, 76,700, 115,1050, 141,720, 160,900, 85,930, 0,800]
}];

$(function($, user) {
    if (user !== '') {
        $('.insertusername').text(user);
    }
}(window.jQuery, (window.mw.config.get('wgUserName') || '')));

$(function(){
    $(".wpPollBar08546CF6F02ED80564A60EFD9B7D91CB").css("background-color","#c8cfd6");
    if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
        massCategorizationDelay = 1000;
        importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
        batchDeleteDelay = 1000;
        importScriptPage('MediaWiki:AjaxBatchDelete/code.2.js', 'dev');
    }
    if (mw.config.get("wgUserGroups").indexOf('bot') > -1) {
        massCategorizationDelay = 200;
        importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
        batchDeleteDelay = 200;
        importScriptPage('MediaWiki:AjaxBatchDelete/code.2.js', 'dev');
    }
    AjaxRCRefreshText = 'Auto-Refresh';
    AjaxRCRefreshHoverText = 'Automatically refresh the page';
    ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
    
    /* Mobile devices suck */
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        //Make sure images aren't distorted by ads
        $('.WikiaSiteWrapper').prepend("<section id='BG' style ='position: absolute; z-index: -5; width: 100%; height: 95.5%; overflow: hidden;'></section>");
        
        //Generate images
        var movingImages = document.getElementById('BG');
        var m = MovingObjs.length;
        for (var i = 0; i < m; i++) {
            MovingObjs[i].tag = new Image();
            MovingObjs[i].tag.src = MovingObjs[i].name;
            MovingObjs[i].pointer = 0;
            MovingObjs[i].speed_cpt = 0;
    
            MovingObjs[i].tag.style.left = MovingObjs[i].chemin[0] + 'px';
            MovingObjs[i].tag.style.top  = MovingObjs[i].chemin[1] + 'px';
            MovingObjs[i].tag.style.zIndex = "-15";
            MovingObjs[i].tag.style.position = "absolute";
            BG.appendChild(MovingObjs[i].tag);
        }
        
        setTimeout(runningGo, 1000);
    }
});

function runningGo() {
	var next, prev, calc, p;
	var m = MovingObjs.length;
	for (var i = 0; i < m; i++) {
		p = MovingObjs[i].pointer * 2;
		next = MovingObjs[i].chemin[p+2];
		prev = MovingObjs[i].chemin[p];
		calc = prev + MovingObjs[i].speed_cpt * (next-prev) / MovingObjs[i].speed;
		MovingObjs[i].tag.style.left = calc + 'px';

		next = MovingObjs[i].chemin[p+2 + 1];
		prev = MovingObjs[i].chemin[p + 1];
		calc = prev + MovingObjs[i].speed_cpt * (next-prev) / MovingObjs[i].speed;
		MovingObjs[i].tag.style.top = calc + 'px';

		MovingObjs[i].speed_cpt++;
		if (MovingObjs[i].speed_cpt >= MovingObjs[i].speed) {
			MovingObjs[i].speed_cpt = 0;
			MovingObjs[i].pointer++;
			if (MovingObjs[i].pointer >= MovingObjs[i].chemin.length/2-1)
				MovingObjs[i].pointer = 0;
		}
	}
	setTimeout(runningGo, 100);
}