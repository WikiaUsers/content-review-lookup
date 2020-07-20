/* common routines */
function timeString(secs) {
	//secs = Number(secs); //redundant?
	var arr = new Array();
	if (secs >= 3600) arr.push( Math.floor(secs/3600) ); // hours
	arr.push( ('0'+ Math.floor(secs%3600/60) ).slice(-2) );
	arr.push( ('0'+ secs%3600%60 ).slice(-2) );
	return arr.join(":");
}
function commafy( num ) { /* from stackoverflow */
	/* trying to catch an error in Chrome about num being undefined */
	if (typeof num == 'undefined') return null;
	var str = num.toString().split('.');
	if (str[0].length >= 4) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
	if (str[1] && str[1].length >= 4) {
		str[1] = str[1].replace(/(\d{3})/g, '$1 ');
	}
	return str.join('.');
}
 
function vidPopupAjax(vidID) {
	if ( $('.yt-vid-popup').length == 0 || $('.yt-vid-popup').attr('data-id') == vidID ) return false
 
	popupObj = $('.yt-vid-popup')
	// preliminary work - display loading text etc.
	if ( $('a.watchlink',popupObj).length==0) $('.hlink', popupObj).wrap('<a class="watchlink" target="_blank" href="#"></a>')
	$('.info, .failed', popupObj).hide()
	$('.loading', popupObj).show()
	$('.thumbnail', popupObj).css('background',"url(https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif) center no-repeat gray")
	$('.duration', popupObj).text('').hide()
 
	// invoke the ajax function
	$.ajax({
		type:"GET",
		url:"http://gdata.youtube.com/feeds/api/videos/"+vidID+ "?v=2&fields=published,title,author,yt:hd,media:group(yt:duration),yt:statistics,yt:rating",
		dataType:"xml",
		success: function(ytdata) {
			//popupObj = $('.yt-vid-popup')
 
			var title = $('title', ytdata).text()
			var published =  new Date( $('published',ytdata).text() )
			var author = $('author name', ytdata).text()
			var durationStr = $('yt\\:duration', ytdata).attr('seconds')
			var duration = $('yt\\:duration', ytdata).attr('seconds') * 1
			var hd = ( $('yt\\:hd', ytdata).length )?true:false
			var viewsStr = $('yt\\:statistics', ytdata).attr('viewCount')
			var views = $('yt\\:statistics', ytdata).attr('viewCount') * 1
			var ratingStr = [ $('yt\\:rating', ytdata).attr('numLikes') , $('yt\\:rating', ytdata).attr('numDislikes') ]
			var rating = [ $('yt\\:rating', ytdata).attr('numLikes') *1 , $('yt\\:rating', ytdata).attr('numDislikes') *1 ]
 
			//var popupObj = $('.yt-vid-popup')
			console.log(durationStr, duration, viewsStr, views, ratingStr, rating)
 
			$('.thumbnail',popupObj).css('background','url(https://i1.ytimg.com/vi/'+vidID+'/default.jpg)')
			$('.title', popupObj).text(title)
			$('.author', popupObj).text(author)
			$('.published', popupObj).text( published.toDateString() )
			$('.viewcount', popupObj).text( commafy(views) )
			$('.hd', popupObj).toggle(hd)
			$('.rating .likes', popupObj).text( commafy(rating[0]) )
			$('.rating .dislikes', popupObj).text( commafy(rating[1]) )
			$('.ratingBar .rating-like', popupObj).css('width', rating[0]/(rating[0]+rating[1])*100 +'%' )
			$('.ratingBar .rating-dislike', popupObj).css('width', rating[1]/(rating[0]+rating[1])*100 +'%' )
			$('.duration', popupObj).text( timeString(duration) ).show()
			$('.watchlink', popupObj).attr({'href':'http://www.youtube.com/watch?v='+vidID,'title':title})
 
			$('.info', popupObj).show()
			//$('.loading', popupObj).hide()
 
			$('.yt-vid-popup').attr('data-id',vidID)
		},
		error: function() {
			//var popupObj = $('.yt-vid-popup')
 
			$('.failed', popupObj).show()
			$('.loading, .info, .duration',popupObj).hide()
			$('.thumbnail',popupObj).css('background','gray')
			$('.watchlink',popupObj).attr('href','#')
			$('.yt-vid-popup').removeAttr('data-id')
		},
		complete: function() {
		//cleans up UI
			$('.loading', popupObj).hide()
		}
	})
}
function vidPopupScroll() {
	var pos = $('.yt-vid-popup').parent().offset()
console.log($('.yt-vid-popup').parent().offset(), pos) //DEBUG
	var linkHeight = $('.yt-vid-popup').parent().height()
	var popSize = { 
		height: $('.yt-vid-popup').height()+14, 
		width: $('.yt-vid-popup').width()+14 
		// 14 comes from padding and border (5 + 2) on both sides (x2) 
	}
 
	var popLeft = (pos.left + popSize.width > popRegion.right) ? popRegion.right - popSize.width - $(window).scrollLeft() : pos.left - $(window).scrollLeft() 
	var popTop = (pos.top - popSize.height < popRegion.top) ? pos.top+linkHeight - $(window).scrollTop() : pos.top - popSize.height - $(window).scrollTop()
 
	$('.yt-vid-popup').css({
		//"position":"fixed", "left":(pos.left - $(window).scrollLeft() ) +'px', "bottom":( $(window).scrollTop() + $(window).height() - pos.top ) +'px'
		"position":"fixed", "left":popLeft +'px', "top":popTop+'px', "bottom":""
	})
}
 function vidPopupInit() {
	if( $('.yt-link-container').length > 0 ) return false // just in case multiple calls are made
	$('.WikiaArticle').prepend('<div class="yt-popup-container"></div>')
	$('.yt-popup-container').load('/wiki/Template:Ytlinkpopup?action=render .yt-vid-popup').hide() // DEBUG: Now relative URL
	if( $('.yt-link-container').length == 0 ) console.log("YT POPUP NOT FOUND") //DEBUG
	$('a[href*="//www.youtube.com/watch?"]').wrap('<span class="yt-link-container"></span>')
	// DO NOT POPUP inside the contest widget
 	$('.g-contest .yt-link-container').removeClass('yt-link-container')
 
	$('.yt-link-container').unbind('mouseenter mouseleave').mouseenter( function(e) {
		if (typeof vidpopup_delay != 'undefined') window.clearInterval(vidpopup_delay)
 
		var pos = $(this).offset();
		var vidID = new RegExp("[\\?&]v=([^&#]*)").exec( $('a', this).attr('href') )
		console.log(vidID[1], $(this).offset().left, $(this).offset().top)
		vidPopupAjax(vidID[1])
		$('.yt-vid-popup').appendTo( $(this) )/*.css({
			"position":"fixed", "left":(pos.left - $(window).scrollLeft() ) +'px', "bottom":( $(window).scrollTop() + $(window).height() - pos.top ) +'px'
			//"position":"fixed", "left":(pos.left - $(window).scrollLeft() ) +'px', "top":(pos.top - $(window).scrollTop()) +'px'
		})*/.show()
		vidPopupScroll()
	}).mouseleave( function() {
		vidpopup_delay = setInterval(function() { $('.yt-vid-popup').hide() },500);
	})
 
	popRegion = { /* global var, used by vidPopupScroll() */
		top: $('.WikiaArticle').offset().top,
		right: $('.WikiaArticle').offset().left + $('.WikiaArticle').width()
	}
 
	$(window).scroll(vidPopupScroll).resize(vidPopupScroll);
}
 
if (window.location.href.indexOf('action=edit') == -1 && $('a[href*="//www.youtube.com/watch?"]').length > 0 && $('.yt-popup-container').length == 0 ) {
	// setInterval(vidPopupInit(),5000)
	//$('h1').after('<a id="createVidPopup href="#">Load YT vid popup</a>')
	//$('#createVidPopup').click( function() {
	//	vidPopupInit()
	//})
	vidPopupInit()
}
 
console.log("ytlinkpopup3.js loaded")