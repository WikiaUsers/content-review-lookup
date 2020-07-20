// Latest video ID
//$('.SocialBladeWidget').each(function() {
//   var sbname=$(this).attr("data-username");
//   $(this).html('<iframe class="sbframe" src="http://widget.socialblade.com/widget.php?u=' +sbname+ '" style="overflow: hidden; height: //125px; width: 100%; border: 0;" scrolling="no" frameBorder="0"></iframe>').show();
//});
 
//$('.username').text(mw.config.get('wgUserName'));
 
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