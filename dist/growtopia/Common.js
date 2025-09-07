//----- [ Home Clock ] -----//
function clock_init(clock_resync, clock_update) {
    var __public = {};
    var resyncOnNextTick = true;
    var realTime, localTime;
    var eventObject;
    
    // - clock_sync() - Sync the clock with the server and get timezone info
    function clock_sync() {
        jQuery.get("//gt.tommyhub.com/api/game/info", function(a) {
        	resyncOnNextTick = false;
        	eventObject = a;
            localTime = +new Date();
            realTime = +new Date(a.time.timestamp*1000);
            clock_resync(a.event);
            clock_tick();
        });
    }
    // - clock_tick() - Updating the clock
    function clock_tick() {
        var _currentTime = +new Date();
        var _diffTime = _currentTime-localTime;
        localTime = _currentTime;
        
        if(Math.abs(_diffTime)>2000) clock_sync();
        else {
            realTime += _diffTime;
            
            clock_update(realTime);
            
            if(resyncOnNextTick || realTime>=eventObject.time.next_transition*1000) clock_sync()
			else setTimeout(clock_tick, 1000-realTime%1000);
        }
    }
    // - clock_pad() - Pad Zero in front of the number
    function clock_pad(str) {
		return ("0"+str).substr(-2);
	}
    clock_sync();

	// + this.resync() - Request Resync on next tick
	__public.resync = function() {
		resyncOnNextTick = true;
	}
    // + this.format() - Print the date in specified format
    __public.format = function(format) {
        var clock = new Date(realTime+eventObject.time.offset*1000);
        
        var month_short_arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        
		var get = "getUTC";
		// Year
		format = format.replace(/(?<!%)%Y/g,clock[get+"FullYear"]());				// Y - 4 digits | 2020
		// Month
		format = format.replace(/(?<!%)%m/g,clock_pad(clock[get+"Month"]()+1));		// m - padding 0 | 01
		format = format.replace(/(?<!%)%n/g,clock[get+"Month"]()+1);				// n - no padding | 1
		format = format.replace(/(?<!%)%M/g,month_short_arr[clock[get+"Month"]()]); // M - Short textual | Jan
		// Day
		format = format.replace(/(?<!%)%d/g,clock_pad(clock[get+"Date"]()));		// d - padding 0 | 01
		format = format.replace(/(?<!%)%j/g,clock[get+"Date"]());					// j - no padding | 1
		// Hour
		format = format.replace(/(?<!%)%H/g,clock_pad(clock[get+"Hours"]()));		// H - 24-h | padding 0 | 01 13
		format = format.replace(/(?<!%)%G/g,clock[get+"Hours"]());					// G - 24-h | no padding | 1 13
		// Minutes
		format = format.replace(/(?<!%)%i/g,clock_pad(clock[get+"Minutes"]()));		// i - padding 0 | 01
		// Seconds
		format = format.replace(/(?<!%)%s/g,clock_pad(clock[get+"Seconds"]()));		// s - padding 0 | 01
		
		return format.replace("%%","%");
	}
	return __public;
}

//----- [ jQuery onLoad ] -----//
$(function() {
    var _pagename = mw.config.get('wgPageName');
    
    if(_pagename == "Growtopia_Wiki") {
        var _clock = clock_init(function(event) {
        	for(var i in event) {
        		switch(event[i].name) {
        			case "Daily Challenge": $t = $("#gtwt-challenge"); break;
        			case "Night of the Comet": $t = $("#gtwt-notc"); break;
        			case "The Grand Tournament": $t = $("#gtwt-tournament"); break;
        			case "Dungeon League": $t = $("#gtwt-dungeon"); break;
        			default: continue;
        		}
        		if(+new Date() < event[i].startTime*1000)
        			$t.html("Starts in <span data-to='"+event[i].startTime+"'></span>");
        		else
        			$t.html("Ends in <span data-to='"+event[i].endTime+"'></span>");
        	}
        	$("#gtw-clock #c-event").removeClass("loading");
        }, function(time) {
        	function clock_pad(str) {
				return ("0"+str).substr(-2);
			}
            $("#gtw-clock #c-time").html(_clock.format("%H:%i:%s"));
            $("#gtw-clock #c-date").html(_clock.format("%j %M %Y"));
            
            $("#gtw-clock #c-event [data-to]").each(function() {
            	var td = parseInt($(this).attr("data-to"))-Math.round(time/1000);
            	var ts = "";
            	if(td>86400) ts+=(td/86400|0)+"d ";
            	if(td>3600) ts+=clock_pad(td%86400/3600|0)+":";
            	if(td>60) ts+=clock_pad(td%3600/60|0)+":";
            	ts+=clock_pad(td%60);
            	
            	$(this).html(ts);
            	if(td<=0) _clock.resync();
            });
        });
    }

	// ----- [ Tab View Remaster.JS - COPYRIGHTED BY NEKOPILLOW ] -----//
	$(".gtw-tabview").on("click","a", function() {
		var $parent = $(this).parents(".gtw-tabview");
		var $href = $(this).attr("href");
		if(!/^\/wiki\//.test($href)) return false; // Only allow wiki interlink for security reason
		$parent.find("a").removeClass("active");
		$(this).addClass("active");
		$parent.next(".gtw-tabpage").remove();
		$.get($href, function(a) {
			$parent.next(".gtw-tabpage").remove();
			$("<div>",{class:"gtw-tabpage"}).insertAfter($parent).html($(a).find("#mw-content-text .mw-parser-output").html());
		});
	    return false;
	}).each(function(){
		var $default = $(this).attr("data-default");
		if($default != undefined) {
			$(this).find("a[href$="+$default+"]").click();
		}
	});
});
//----- [ Sharper Slider Images ] -----//
mw.hook('wikipage.content').add(($content) => {
	const slides =  $content.find('.mainpage .gtw-slider .fandom-slider .gallerybox img');
	slides.each(function () {
		const attrs = ['src','srcset','data-src','data-srcset'];
		for (const a of attrs) {
			const value = this.getAttribute(a);
			if (!value) continue;
			const updatedValue = value.replace(/\/scale-to-width(?:-down)?\/\d+/g, '/scale-to-width-down/1200');
			if (updatedValue !== value) this.setAttribute(a, updatedValue);
		}
	});
});

//----- [ Sharper Slider Images ] -----//
mw.hook('wikipage.content').add(($content) => {
	const slides =  $content.find('.sharper-slider.gtw-slider .fandom-slider .gallerybox img');
	slides.each(function () {
		const attrs = ['src','srcset','data-src','data-srcset'];
		for (const a of attrs) {
			const value = this.getAttribute(a);
			if (!value) continue;
			const updatedValue = value.replace(/\/scale-to-width(?:-down)?\/\d+/g, '/scale-to-width-down/1200');
			if (updatedValue !== value) this.setAttribute(a, updatedValue);
		}
	});
});

//----- [ Pagination ] -----//
$(function() {
    $("span.no-blank-target").each(function() {
    	$(this).closest("a").removeAttr("target");
    });
});