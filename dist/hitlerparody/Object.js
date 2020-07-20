// Hidden Jodl Head. Random position. probability of occurring is 20% for October
// moved from User:mfaizsyahmi/object.js

(function(window,$,mw) {
	// variables/constants
	//var JodlSettings = [{ 
	//	"p": 0.2,				// probability of spawning
	//	"staticInitial": 0.04,	// initial opacity of the static effect
	//	"staticVal":0.04,		// holds the current static opacity value
	//	"nudgeRadius": 45,		// how far Jodl will move when hovered
	//	"mantra": "Jodl",		// what should be matched against when summoning Jodl
	//	"mantraHit": 0,			// holds the hit count against mantra when summoning
	//	"transitionDuration":"0.2s",
	//	"sighted":false,
	//	"staticDuration":"5s"
	//}]

	// puts Jodl at a random place in page
	// arg: radius
	//      -sets the max radius distance (in px) from which jodl will move. 
	//       if undefined, will place jodl at random
	function placeJodl(radius) {
		if ( $('div#jodl').length == 0) return false // terminate if jodl doesn't exist
		if (typeof radius == 'undefined') {
			var jodltop = Math.floor( Math.random() * ($('body').height()-80) ),
				jodlleft = Math.floor( Math.random() * ($('body').width()-80) );
		} else {
			var jodlpos = $('div#jodl').position(),
				jodltop = jodlpos.top - radius + Math.floor(Math.random() * radius * 2);
			if ( jodltop > $('body').height()-80 ) { 
				jodltop = $('body').height()-80 ;
			} else if ( jodltop < 0 ) {
				jodltop = 0 ;
			}
			var jodlleft = jodlpos.left - radius + Math.floor(Math.random() * radius * 2);
			if ( jodlleft > $('body').width()-80 ) { 
				jodlleft = $('body').width()-80 ;
			} else if ( jodlleft < 0 ) {
				jodlleft = 0;
			}
		}
		$('div#jodl').css({"top":jodltop + "px","left":jodlleft + "px"});
	}
	 
	// stuff to exec when jodl is taunted by clicking
	function tauntJodl() {
		if ( $('div#jodl').length == 0) return false // terminate if jodl doesn't exist
	 
		var num = Math.floor(Math.random()*3);
		if (num == 0) {
			$('audio#jodl1').get(0).play();
		} else if (num == 1) {
			$('audio#jodl2').get(0).play();
		} else if (num == 2) {
			$('audio#jodl3').get(0).play();
		}
		placeJodl();
		sightJodl();
	 
		//OCTOBER SPECIFIC
	//	jodlstatic = Number( $('style.jodl').attr('data-staticopacity') ) + 0.005
	//	$('style.jodl').attr('data-staticopacity', jodlstatic)//.html('body.mediawiki:after{opacity:' +jodlstatic+ '!important}') 
	//	dt = new Date()
	//	if ( dt.getMonth()==10 ) $.cookie("HPW-jodlstatic", jodlstatic, { expires: 33 - dt.getDate() });
	}
	 
	function sightJodl() { // when Jodl is in sight
		if ( $('div#jodl').length == 0) return false // terminate if jodl doesn't exist
	 
		var jodlTop = $('div#jodl').offset().top,
			windowY = $(window).scrollTop(),
			windowH = $(window).height();
		if (jodlTop+40 >= windowY && jodlTop+40 <= windowY+windowH) { // Jodl in sight
			if ( typeof $('div#jodl').attr('data-sighted') == 'undefined' ) {
				console.log('Jodl in sight');
				$('div#jodl').attr('data-sighted',true);
				$('style.jodl').html('body.mediawiki:after{opacity:0.8!important; transition: opacity 15s}');
			}
		} else { // Jodl out of sight
			if ( $('div#jodl').attr('data-sighted') == 'true') {
				console.log('Jodl out of sight');
				$('div#jodl').removeAttr('data-sighted');
				var staticCur = $('style.jodl').attr('data-staticopacity');
				$('style.jodl').html('body.mediawiki:after{opacity:'+staticCur+'!important; transition: opacity 15s}');
			}
		}
	}
	 
	// gets/sets the static value
	// params:	val
	//			duration - sets how long it'd take for the opacity to change to new value
	//			noAttrWrite - if true, won't set the attr value of 
	//function jodlStatic(val, duration, noAttrWrite) {
	//	if (typeof val == 'undefined' && typeof duration == 'undefined') {
	//		return Number( $('style.jodl').attr('data-staticopacity') )
	//	}
	//	if (typeof duration == 'undefined') duration='0s'
	//	$('style.jodl').attr('data-staticopacity',jodlstatic).html('body.mediawiki:after{opacity:' +val+ '!important; transition: opacity ' +duration+ '}')
	//}
	 
	//spawns a Jodl
	function spawnJodl() {
		if ( $('div#jodl').length ) return false // abort if Jodl already exist
	 
		$('<div id="jodl"></div>').css({
			"background-image": "url(https://images.wikia.nocookie.net/hitlerparody/images/9/99/Jodlhead.png)",
			"position": "absolute",
			"width": "80px", "height":"80px",
			"z-index": "2012",
			"transition": "left 0.2s, top 0.2s"
		}).append('\
		<audio id="jodl1"><source src="https://images.wikia.nocookie.net/hitlerparody/images/8/86/Jodlghost1.ogg"></audio>\
		<audio id="jodl2"><source src="https://images.wikia.nocookie.net/hitlerparody/images/5/5a/Jodlghost2.ogg"></audio>\
		<audio id="jodl3"><source src="https://images.wikia.nocookie.net/hitlerparody/images/c/c8/Jodlghost4.ogg"></audio>' /* problems with older IDM */
		).click( function() {
			tauntJodl()
		}).mouseenter( function() {
			placeJodl(40)
			sightJodl()
		}).appendTo( $('body')); 
		placeJodl();
		$(window).scroll(sightJodl);
		$(window).resize(sightJodl);
	}
	 
	function getSelectionText() {
		var text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	}
	 
	//OCTOBER SPECIFIC
	//$('body').append('<style class="jodl" type="text/css"></style>')
	//var jodlstatic = ( $.cookie("HPW-jodlstatic") == null) ?0.04 :Number( $.cookie("HPW-jodlstatic") )
	//$('style.jodl').attr('data-staticopacity',jodlstatic).html('body.mediawiki:after{opacity:' +jodlstatic+ '!important}')
	 
	if (Math.random() < 0.001) spawnJodl()
	 
	// monitor Jodl summoning activities
	jodlMantra = "Jodl"
	jodlMantrahit = 0
	$('.WikiaArticle').unbind('mouseup').mouseup( function (e) {
		if ( $('div#jodl').length ) return false
		var sel = getSelectionText()
		var n = jodlMantra.search(sel)
	 
		if (n == -1) {
			jodlMantrahit = 0
		} else if (n == jodlMantrahit) {
			jodlMantrahit += sel.length
		} else {
			jodlMantrahit = 0
		}
		//console.log(sel, jodlMantrahit) <-- is spamming the console log
		if (jodlMantrahit >=4) {
			spawnJodl()
			$('audio#jodl1').get(0).play();
			//alert('jodl summoned!')
		}
	});
	 
	// button for removal of static for lower end machines. one can still manually summon Jodl afterwards though.
	//$('.WikiaArticle').append('<div class="button" id="removestatic" title="Removes the static from the background for lower-end machines. Only applies per page load.">Remove static</div>')
	//$('#removestatic').click(function() {
	//	$('div#jodl').remove()
	//	$('style.jodl').html('body.mediawiki:after{ background:none; opacity:0 !important; }')
	//})
}(window,jQuery,mediaWiki));