/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ListFiles/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/FairUseUpload.js'
    ]
});

/*var infoboxArray = document.getElementsByClassName('pi-image-collection-tabs');
for (i = 0; i<infoboxArray.length; i++) {
    var tabArray = infoboxArray[i].getElementsByTagName('li');
    for (j = 0; j<tabArray.length; j++) {
        tabArray[j].innerHTML = '<a>' + tabArray[j].innerHTML + '</a>';
        tabArray[j].insertAdjacentHTML('afterend', '<wbr>');
    }
}*/

function imagePolicyUpload (mut,criticalID, uploadForm, searchInput, searchButton, additionalCondition, changer) {
    var hasID = [].some.call(mut.addedNodes, function(el) {
        return (el.id == criticalID && additionalCondition);
    });
    if (hasID) {
        var uploadRefresh = '<span class="button"><a class="text" href="./Special:Upload" target="_blank"><span style="color:white;">Upload photo</span></a></span>&nbsp;<a id="' + uploadForm + 'refreshGalleryButton" style="cursor:pointer;">Refresh to see your uploaded photo</a>';
        changer(criticalID, function () {
            console.log('changing');
            $('#' + uploadForm).html(uploadRefresh);
            $('#' + uploadForm + 'refreshGalleryButton').on('click', function() {
            console.log(document.getElementById(uploadForm + 'refreshGalleryButton'));
            $('#' + searchInput).val('.');
            $('#' + searchButton).click();
            });
        });
    }
}
function changer0(criticalID, fn) {
    fn();
}
function changer1(criticalID, fn) {
    $('#' + criticalID).mousemove(function (){
        fn();
    });
    $('#' + criticalID).keydown(function (){
        fn();
    });
}
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            imagePolicyUpload(mutation,'WikiaPhotoGalleryEditor', 'WikiaPhotoGalleryImageUploadForm','WikiaPhotoGallerySearch input','WikiaPhotoGallerySearch button',document.getElementById('WikiaPhotoGalleryImageUpload'),changer0);
            imagePolicyUpload(mutation,'WMU_divWrapper', 'ImageUploadForm','ImageQuery','ImageUploadFind :nth-child(2) :nth-child(3)',true,changer1);
        }
    });
});
 
var config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
};
 
observer.observe(document.body, config);