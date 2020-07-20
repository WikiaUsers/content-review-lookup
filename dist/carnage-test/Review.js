window.WikiReview = window.WikiReview || {};

WikiReview.comment = function(config){
    this.text = config.text;
    this.username = config.username;
    this.date = new Date();
    this.rating = config.rating;
};

WikiReview.createComment = function(txt, config){
    return new WikiReview.comment({
        text: txt,
        username: config.username || wgUserName,
        rating: config.rating
    });
};

/*
WikiReview.bind = function(ev, callback){
    var canonicalEvents = ['commentAdded', 'commentRemoved', 'load', 'evaluate'];
    if (canonicalEvents.indexOf(ev) > -1){
        
    }
};
*/