function YouTubeAPI() {
    if(this.init) {
        this.init(arguments[0].el || null,arguments[0].channelID || null);
    }
}
YouTubeAPI.prototype.key = 'AIzaSyCNI6aBpUHBiVFOOK9pYbGaptVyfysdcSE';
YouTubeAPI.prototype.url = 'https://www.googleapis.com/youtube/v3/';
YouTubeAPI.prototype.ReturnMap = {
    'description': 'snippet.description',
    'video-count': 'statistics.videoCount',
    'view-count': 'statistics.viewCount',
    'subscriber-count': 'statistics.subscriberCount',
    'published-at': 'snippet.publishedAt',
    'thumbnail': 'snippet.thumbnails.default.url',
    'title': 'snippet.title'
};
YouTubeAPI.prototype.init = function(el,channelID) {
    if(el) {
        this.el = el;
    }
    if(channelID) {
        this.channelID = channelID;
    }
};
YouTubeAPI.prototype.format = function(item) {
    if($.type(item) == 'number' || !isNaN(Number(item))) {
        return parseInt(item,10).toLocaleString();
    }
    else if(new Date(item) != 'Invalid Date' && new Date(item).toISOString() === item) {
        return new Date(item).toLocaleDateString();
    }
    else {
        return item;
    }
};
YouTubeAPI.prototype.output = function(res) {
    if(res) {
        $(this.el).text(this.format(res));
    }
};
YouTubeAPI.prototype.getChannel = function(id,item) {
    console.log('get channel data from',id);
    if(id) {
        var api = this;
        $.getJSON(this.url + 'channels?part=statistics,snippet&id='+ id + '&key=' + this.key, function(res) {
            if(res && !!res.items.length) {
                console.log('api request successful',res);
                api.output(_.nestedFind(res.items[0],api.ReturnMap[item]));
            }
            else {
                console.error('Could not find any channel matching this id!');
            }
        });
    }
    else {
        throw new ReferenceError('The channel id must be specified!');
    }
};
YouTubeAPI.prototype.request = function(service) {
    $.getJSON(this.url + servive + '&key=' + this.key, function(res) {
        this.output(res);
    });
};

if(!!$('.yt-api').length) {
    console.info('YT-API used on this site',$('.yt-api').length,'times');
    $('.yt-api').each(function() {
        var ytapi = new YouTubeAPI({
            el: $(this),
            channelID: !!$(this).filter('[data-channel-id]').length ? $(this).data('channelId') : $(this).closest('[data-channel-id').data('channelId')
        });
        console.log('YT-API request element registered',ytapi);
        console.log('Request for',$(this).data('value'));
        if(Object.keys(ytapi.ReturnMap).indexOf($(this).data('value')) != _-1) {
            console.log('get channel');
            ytapi.getChannel($(this).data('channelId'),$(this).data('value'));
        }
    });
}