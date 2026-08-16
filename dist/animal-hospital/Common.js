window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;

window.UserTagsJS = {
    modules: {},
    tags: {
        'dedicated-contributor': { 
            u: 'Dedicated Contributor',
            tagClass: 'icon-dedicated' 
        }
    }
};

window.UserTagsJS.modules.custom = {
    'Secret Housesitting': ['dedicated-contributor'],
    'HappyHa8': ['dedicated-contributor'],
    'Ducko3': ['dedicated-contributor'],
    'BFDIfan2763290': ['dedicated-contributor'],
    'PM121': ['dedicated-contributor'],
    'Псина чушпан': ['dedicated-contributor'],
    'Glow Rose38': ['dedicated-contributor']
};
window.reportArticleConfig = {
    group: ['sysop'],
    title: 'Reported article: $1',
    body: 'An article has been reported: $1\n\nPlease review.'
};