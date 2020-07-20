/* Info dotyczące kanałów YouTube */
/* Ilość subów: <span class="yt-info-subscribercount" data-channel="nazwa-kanału"></span> */
/* Ilość filmów: <span class="yt-info-videocount" data-channel="nazwa-kanału"></span> */
/* Dodatkowo element który 'czeka' na pobranie informacji otrzymuje klasę .yt-info-loading */
 
var Google_API_Key = 'AIzaSyAUvYx1SkD7M6Vmov2khneUBD9bvfnX9FQ';
 
function getChannelInfo(ids, callback) {
    if(ids instanceof Array) ids = ids.join(',');
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + ids + '&key=' + Google_API_Key,
        dataType: 'jsonp',
        crossDomain: true,
        success: callback
    });
}
$(function() {
    var channels = {};
    $('.yt-info-subscribercount').each(function() {
        var channel = $(this).data('channel');
        if(!(channel in channels)) {
            channels[channel] = {
                subs: [],
                vids: [],
                views: [],
            };
        }
        channels[channel].subs.push($(this).addClass('yt-info-loading'));
    })
    $('.yt-info-videocount').each(function() {
        var channel = $(this).data('channel');
        if(!(channel in channels)) {
            channels[channel] = {
                subs: [],
                vids: [],
                views: [],
            };
        }
        channels[channel].vids.push($(this).addClass('yt-info-loading'));
    })
    $('.yt-info-viewcount').each(function() {
        var channel = $(this).data('channel');
        if(!(channel in channels)) {
            channels[channel] = {
                subs: [],
                vids: [],
                views: [],
            };
        }
        channels[channel].views.push($(this).addClass('yt-info-loading'));
    })
    var ids = [];
    for(channel in channels) {
        ids.push(channel);
    }
    if(!ids.length) return;
    getChannelInfo(ids, function(data) {
        if('error' in data) {
            $('yt-info-loading').removeClass('yt-info-loading').addClass('yt-info-error');
        } else {
            data.items.forEach(function(item) {
                var channel = channels[item.id];
                channel.subs.forEach(function(elem) {
                    if(item.statistics.hiddenSubscriberCount)
                        elem.text('Ukryty').removeClass('yt-info-loading');
                    else
                        elem.text(item.statistics.subscriberCount).removeClass('yt-info-loading');
                });
                channel.vids.forEach(function(elem) {
                    elem.text(item.statistics.videoCount).removeClass('yt-info-loading');
                });
                channel.views.forEach(function(elem) {
                    elem.text(item.statistics.viewCount).removeClass('yt-info-loading');
                });
            });
        }
    });
});