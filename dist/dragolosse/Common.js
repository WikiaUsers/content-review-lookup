/* Code that makes twitter work with the siderail */
mw.loader.load('ext.fandom.TwitterTag.js');

mw.loader.using('mw.Api', function() {
    //Requesting the Required Information
    var params = {
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:Spoiler Images',
            cmprop: 'title',
            cmtype: 'file',
            cmlimit: 'max',
            format: 'json'
        },
        api = new mw.Api();

    api.get(params).done(function(data) {
        //Creating Spoiler Images Array
        var listPages = data.query.categorymembers,
            listPage,
            spoilerImages = [];
        for (listPage in listPages) {
            spoilerImages.push(listPages[listPage].title);
        }

        //Blurring the Spoiler Images
        var images = document.querySelectorAll('#mw-content-text img'),
            imageFullName,
            i;
        for (i = 0; i < images.length; i++) {
            imageFullName = 'File:' + images[i].dataset.imageName;
            if (spoilerImages.includes(imageFullName)) {
                images[i].classList.add('spoilerImage');
                images[i].closest('figure.thumb,.wikia-gallery-item .thumb,.wikia-slideshow-image, figure.pi-image')
                    .classList.add('spoilerImageText');
                images[i].addEventListener('click', function(e) {
                    e.target.classList.remove('spoilerImage');
                    e.target.closest('.spoilerImageText').classList.remove('spoilerImageText');
                });
            }
        }

        /*
        Adjustment for Special:NewFiles:
        1). Making Auto-Refresh Option Unchecked by Default to Prevent Spoiler Images from Showing Up
        2). Adding Warning How Checking the Option will Show Up the Spoilers
        */
        document.querySelector('.rootpage-Special_NewFiles #ajaxRefresh #ajaxToggle')
            .removeAttribute('checked');
        document.querySelector('.rootpage-Special_NewFiles #ajaxRefresh #ajaxToggleText')
            .title += '. Warning: Having this option checked will cause spoiler images to show up.';
    });
});