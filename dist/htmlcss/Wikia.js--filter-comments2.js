;(function(mw, $, FilteredComments){
    if (FilteredComments.optOut === true) return;
    
    if (typeof FilteredComments.groups == 'object'
            && FilteredComments.groups instanceof Object
            && $('#WikiaArticleComments').length){
        let groups = FilteredComments.groups;
        for (let group in groups){
            let user = groups[group],
                selector = $('.comments li[data-user="' + user + '"]');
            
            if (selector.parents().is('#WikiaArticleComments')){
                selector.addClass(group);
            }
        }
    }
})(this.mediaWiki, this.jQuery, (typeof this.FilteredComments == 'object' ? this.FilteredComments : {
    optOut: false,
    groups: {
        'codeeditor': [],
        'chatmoderator': [],
        'sysop': ['Ultimate Dark Carnage'],
        'bureaucrat': ['Ultimate Dark Carnage']
    }
}));