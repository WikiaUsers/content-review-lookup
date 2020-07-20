/* copied and adapted from user:mfaizsyahmi/ytlinkpopup4.js */
/* ytvidpopup v4.1
 * by mfaizsyahmi
 * description: Display YT video info when hovering over YT video links.
 *              Uses YT API v3.
 * for personal and/or sitewide use
 * released under CC-BY-SA
 * requires: Template:ytlinkpopup on local wikis
 */
 
// NAMESPACE
var ytLinkPopup = (ytLinkPopup || {});
 
// PRIVATE VARS
ytLinkPopup._vidList = []; // list of ids
ytLinkPopup._ajaxData = undefined; // json returned from YT
ytLinkPopup._needAjax = true; // set to false after ajax operation, true when new video is added to list
ytLinkPopup._key = "AIzaSyD8-62lEUulbGAFC7NtWNHW1kVvh6JLqq4"; // Go get your OWN key!
//ytLinkPopup.popupObj = undefined // holds a reference to the yt link popup DOM object
 
/* COMMON ROUTINES */
ytLinkPopup.newTimeString = function(duration) { /* adapted from stackoverflow/22148885 */
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/),
        arr = [];
    var hours = parseInt(match[1], 10) || 0,
        minutes = parseInt(match[2], 10) || 0,
        seconds = parseInt(match[3], 10) || 0;
    if (hours > 0) arr.push(hours);
    arr.push( ('0' + minutes).slice(-2) );
    arr.push( ('0' + seconds).slice(-2) );
    return arr.join(':');
};
ytLinkPopup.commafy = function(num) { /* from stackoverflow */
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
};
 
// MAIN ROUTINES
 
// function: controls addition of video ID into list of vids for ajax parsing (and reparsing)
ytLinkPopup.addVideoToList = function(vidID) {
    if (ytLinkPopup._vidList.join("|").search(vidID) == -1) {
        ytLinkPopup._vidList.push(vidID);
        ytLinkPopup._needAjax = true;
    }
};
 
// INVOKE ONLY ONCE PER PAGE LOAD
// args: callbck: function to run when completed (success or not)
ytLinkPopup.doAjax = function(callback) {
    // cancel if ajax not required
    if (ytLinkPopup._ajaxData !== undefined && !ytLinkPopup._needAjax ) {
        //callback;
        return;
    }
    if (callback===undefined) callback = function(){};
    console.log('retrieving AJAX...');
 
    // initialize yt popup object
    var popupObj = $('.yt-vid-popup');
    // preliminary work - display loading text etc.
    if ( $('a.watchlink',popupObj).length===0) $('.hlink', popupObj).wrap('<a class="watchlink" target="_blank" href="#"></a>');
    if ( $('a.channellink',popupObj).length===0) $('.author', popupObj).wrap('<a class="channellink" target="_blank" href="#"></a>')
    $('.info, .failed', popupObj).hide();
    $('.loading', popupObj).show();
    $('.thumbnail', popupObj).css('background',"url(https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif) center no-repeat gray");
    $('.duration', popupObj).text('').hide();
 
    var vidString = ytLinkPopup._vidList.join(',');
 
    // invoke the ajax function
    $.ajax({
        type:"GET",
        url:"https://www.googleapis.com/youtube/v3/videos",
        data: {
            key: ytLinkPopup._key,
            part: "snippet,contentDetails,statistics",
            fields: 'items',
            id: vidString
        },
        dataType:"json",
        success: function(ytdata) {
            ytLinkPopup._ajaxData = JSON.parse(JSON.stringify(ytdata));
            ytLinkPopup._needAjax = false;
        },
        complete: function() {
            //cleans up UI
            $('.loading', popupObj).hide();
            callback();
        }
    });
};
 
// main function to display info
ytLinkPopup.displayInfo = function(vidID) {
    var popupObj = $('.yt-vid-popup'),
        match;
 
    // iterate ajaxData's list to find matching vidID
    for (i=0; i<ytLinkPopup._ajaxData.items.length; i++) {
        if (ytLinkPopup._ajaxData.items[i].id == vidID) {
            match = ytLinkPopup._ajaxData.items[i];
            //console.log('match found',match);
        }
    }
 
    if (match) { // match found, display
        var vidData = match;
        var    title = vidData.snippet.title,
            published =  new Date( vidData.snippet.publishedAt ),
            author = vidData.snippet.channelTitle,
            channelID = vidData.snippet.channelId,
            thumbUrl = vidData.snippet.thumbnails["default"].url,
            duration = vidData.contentDetails.duration,
            hd = ( vidData.contentDetails.definition == 'hd' )?true:false,
            views = vidData.statistics.viewCount,
            rating = [ parseInt(vidData.statistics.likeCount) , parseInt(vidData.statistics.dislikeCount) ],
            favs = vidData.statistics.favouriteCount;
 
        $('.thumbnail', popupObj).css('background','url('+thumbUrl+')');
        $('.title', popupObj).text(title);
        $('.author', popupObj).text(author);
        $('.published', popupObj).text( published.toDateString() );
        $('.viewcount', popupObj).text( ytLinkPopup.commafy(views) );
        $('.hd', popupObj).toggle(hd);
        $('.likes', popupObj).text( ytLinkPopup.commafy(rating[0]) );
        $('.dislikes', popupObj).text( ytLinkPopup.commafy(rating[1]) );
        $('.ratingBar .rating-like', popupObj).css('width', rating[0]/(rating[0]+rating[1])*100 +'%' );
        $('.ratingBar .rating-dislike', popupObj).css('width', rating[1]/(rating[0]+rating[1])*100 +'%' );
        $('.duration', popupObj).text( ytLinkPopup.newTimeString(duration) ).show();
        $('.watchlink', popupObj).attr({'href':'http://www.youtube.com/watch?v='+vidID, 'title':title});
        $('.channellink', popupObj).attr({'href':'http://www.youtube.com/channel/'+channelID, 'title':author})
 
        $('.failed', popupObj).hide();
        $('.info', popupObj).show();
        //$('.loading', popupObj).hide()
 
        $('.yt-vid-popup').attr('data-id',vidID);
 
    } else { // no match
        $('.failed', popupObj).show();
        $('.loading, .info, .duration',popupObj).hide();
        $('.thumbnail',popupObj).css('background','gray');
        $('.watchlink',popupObj).attr('href','#');
        $('.yt-vid-popup').removeAttr('data-id');
    }
};
 
// function triggered on link's mousehover
// checks whether ajax is needed before displaying video info
ytLinkPopup.getAndDisplayInfo = function(vidID) {
    // exit if displaying the same video's info
    if ( $('.yt-vid-popup').length === 0 || $('.yt-vid-popup').attr('data-id') == vidID ) return false;
 
    if (ytLinkPopup._ajaxData === undefined) { // if no ajaxData, send an ajax request
        //console.log('ajax data NOT found');
        ytLinkPopup.doAjax( function() {ytLinkPopup.displayInfo(vidID)} );
    } else {
        //console.log('ajax data found');
        ytLinkPopup.displayInfo(vidID);
    }
};
 
// call this to update popup's position
ytLinkPopup.scroll = function() {
    // abort if popup still loading
    if( $('.yt-vid-popup').length === 0 ) return false;
 
    var pos = $('.yt-vid-popup').parent().offset();
    //console.log($('.yt-vid-popup').parent().offset(), pos) //DEBUG
    var linkHeight = $('.yt-vid-popup').parent().height();
    var popSize = { 
        height: $('.yt-vid-popup').height()+14, 
        width: $('.yt-vid-popup').width()+14
        // 14 comes from padding and border (5 + 2) on both sides (x2) 
    };
 
    var popLeft = (pos.left + popSize.width > ytLinkPopup._popRegion.right) ? ytLinkPopup._popRegion.right - popSize.width - $(window).scrollLeft() : pos.left - $(window).scrollLeft(),
        popTop = (pos.top - popSize.height < ytLinkPopup._popRegion.top) ? pos.top+linkHeight - $(window).scrollTop() : pos.top - popSize.height - $(window).scrollTop();
 
    $('.yt-vid-popup').css({
        //"position":"fixed", "left":(pos.left - $(window).scrollLeft() ) +'px', "bottom":( $(window).scrollTop() + $(window).height() - pos.top ) +'px'
        "position":"fixed", "left":popLeft +'px', "top":popTop+'px', "bottom":""
    });
};
 
// initialization code
ytLinkPopup.init = function() {
    if( $('.yt-link-container').length > 0 ) return false; // just in case multiple calls are made
    $('.WikiaArticle').prepend('<div class="yt-popup-container"></div>');
    $('.yt-popup-container').load('/wiki/Template:Ytlinkpopup?action=render .yt-vid-popup').fadeOut("fast");
    //if( $('.yt-link-container').length == 0 ) console.log("YT POPUP NOT FOUND"); //DEBUG
 
    // prepares every YT hyperlink
    $('a[href*="//www.youtube.com/watch?"]').each(function() {
        var vidID = new RegExp("[\\?&]v=([^&#]*)").exec( $(this).attr('href') );
        ytLinkPopup.addVideoToList(vidID[1]);
        $(this).wrap('<span class="yt-link-container" data-vidID="'+vidID[1]+'"></span>');
    });
 
    // DO NOT POPUP inside the contest widget
    $('.g-contest .yt-link-container').removeClass('yt-link-container');
 
    $('.yt-link-container').unbind('mouseenter mouseleave').mouseenter( function(e) {
        if (typeof ytLinkPopup._delayFade != 'undefined') window.clearInterval(ytLinkPopup._delayFade);
 
        //var pos = $(this).offset(); // unused
        var vidID = $(this).attr('data-vidID');
        console.log(vidID, $(this).offset().left, $(this).offset().top);
        ytLinkPopup.getAndDisplayInfo(vidID);
        $('.yt-vid-popup').appendTo( $(this) ).fadeIn("fast");
        ytLinkPopup.scroll();
    }).mouseleave( function() {
        ytLinkPopup._delayFade = setInterval(function() { $('.yt-vid-popup').fadeOut("fast") },500);
    });
 
    ytLinkPopup._popRegion = { /* global var, used by scroll() */
        top: $('.WikiaArticle').offset().top,
        right: $('.WikiaArticle').offset().left + $('.WikiaArticle').width()
    };
    $(window).scroll( ytLinkPopup.scroll() ).resize( ytLinkPopup.scroll() );
};
 
if (window.location.href.indexOf('action=edit') == -1 && $('a[href*="//www.youtube.com/watch?"]').length > 0 && $('.yt-popup-container').length === 0 ) {
    ytLinkPopup.init();
}
 
console.log("ytlinkpopup4.js loaded")