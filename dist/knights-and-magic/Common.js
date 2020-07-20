/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');


importScriptPage('MediaWiki:MassRename/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
        'u:dev:ListFiles/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/FairUseUpload.js',
        'u:dev:MassProtect/code.js',
        'u:dev:AjaxBatchDelete/code.2.js'
    ]
});
//TODO: Remove whitespace padding
var infoboxArray = document.getElementsByClassName('pi-image-collection-tabs');
for (i = 0; i<infoboxArray.length; i++) {
    var tabArray = infoboxArray[i].getElementsByTagName('li');
    for (j = 0; j<tabArray.length; j++) {
        tabArray[j].innerHTML = '<a>' + tabArray[j].innerHTML + '</a>';
        tabArray[j].insertAdjacentHTML('afterend', '<wbr>');
    }
}
// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function IconsOasis() {
	$( '.WikiaPageHeader' ).append( $( '#icons' ) );
	$( '#icons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '0.6em' } ).show();
} );


function imagePolicyUpload (mut,classIDArr,critical, uploadForm, searchInput, searchButton, additionalCondition, changer) {
    var isDetected = [].some.call(mut.addedNodes, function(el) {
        //critical class: oo-ui-widget-enabled ve-ui-widget-droptarget
        var conjunctand = (classIDArr[0] && el.id==critical) || (!classIDArr[0] && el.className==critical);
        return conjunctand && additionalCondition;
    });
    if (isDetected) {
        var uploadRefresh = '<span class="button"><a class="text" href="/wiki/Special:Upload" target="_blank"><span style="color:white;">Upload photo</span></a></span>&nbsp;<a id="' + uploadForm + 'refreshGalleryButton" style="cursor:pointer;">Refresh to see your uploaded photo</a>';
        var tojQ = (function (isID, str) {
            if (isID) {
                return '#' + str;
            } else {
                return '.' + str.replace(' ','.');
            }
        });
        changer(critical, function () {
            console.log($(tojQ(classIDArr[1],uploadForm)));
            $(tojQ(classIDArr[1],uploadForm)).html(uploadRefresh);
            $(tojQ(classIDArr[1],uploadForm) + 'refreshGalleryButton').on('click', function() {
            console.log(document.getElementById(uploadForm + 'refreshGalleryButton'));
            $(tojQ(classIDArr[2],searchInput)).val('.');
            $(tojQ(classIDArr[3],searchButton)).click();
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
function changer2(criticalClass, fn) {
    $('.' + criticalClass.replace(' ','.')).remove();
    fn();
}
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            imagePolicyUpload(mutation,[true,true,true,true],'WikiaPhotoGalleryEditor', 'WikiaPhotoGalleryImageUploadForm','WikiaPhotoGallerySearch input','WikiaPhotoGallerySearch button',document.getElementById('WikiaPhotoGalleryImageUpload'),changer0);
            imagePolicyUpload(mutation,[true,true,true,true],'WMU_divWrapper', 'ImageUploadForm','ImageQuery','ImageUploadFind :nth-child(2) :nth-child(3)',true,changer1);
            imagePolicyUpload(mutation,[false,false,false,false],'oo-ui-widget-enabled ve-ui-widget-droptarget', 'oo-ui-panelLayout-scrollable oo-ui-pageLayout-active','ImageQuery','ImageUploadFind :nth-child(2) :nth-child(3)',true,changer2);
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