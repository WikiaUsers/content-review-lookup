function chatTags(){
    this.enabled = (chatags) ? true : false;
    this.availableTags = Object.keys(chatags.tags);
    this.fn = this.prototype;
    this.tags = chatags.tags;
}

chatTags.fn.isAvailableTag = function(tag, callback){
    var availableTags = this.availableTags;
    var value = (availableTags.indexOf(tag) > -1) ? true : false;
    if (typeof callback == 'object'){
        if (value === true) Function.prototype.apply.call(callback.available, window, [tag]);
        else Function.prototype.apply.call(callback.notFound, window, [tag]);
    }
    return this;
};

chatTags.fn.addTag = function(tag, callback){
    var tags = this.tags,
        availableTags = this.availableTags;
    if (tag){
        if (tag in tags === false){
            availableTags.push(tag);
            tags[tag] = callback;
        }
    }
};

var CT = window.chat_tags = new chatTags();