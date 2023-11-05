// ReadProgressBar
window.enableReadProgressBarOnArticles = true

// LinkPreview
window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://static.wikia.nocookie.net/silly-cat/images/5/51/NoImage.png/revision/latest?cb=20231017160842',	
    RegExp: {
        ipages: [new RegExp('.*?SillyCat[_ ]Wiki*')],
    },
});