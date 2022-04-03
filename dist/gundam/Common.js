// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
	$('.sub-wds-icons-pages-small').append(
		$('<span>', {
			'id': 'dev-wds-icons-pages-small'
		})
	);
	wds.render('.sub-wds-icons-pages-small');
});

/* Include Global Anime-Common.js Information */
importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:WDSIcons/code.js',
        'u:anime:MediaWiki:Anime-Common.js',
        'MediaWiki:Common.js/FairUseUpload.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$(function IconsOasis() {
    $('.WikiaPageHeader').append($('#icons'));
    $('#icons').css({
        'position': 'absolute',
        'right': '0',
        'bottom': '0.6em'
    }).show();
});

function imagePolicyUpload(mut, classIDArr, critical, uploadForm, searchInput, searchButton, additionalCondition, changer) {
    var isDetected = [].some.call(mut.addedNodes, function(el) {
        console.log($('div.' + 'oo-ui-panelLayout-scrollable oo-ui-pageLayout-active'.replace(' ', '.')));
        //critical class: oo-ui-widget-enabled ve-ui-widget-droptarget
        var conjunctand = (classIDArr[0] && el.id == critical) || (!classIDArr[0] && el.className == critical);
        return conjunctand && additionalCondition;
    });
    if (isDetected) {
        var uploadRefresh = '<span class="button"><a class="text" href="/wiki/Special:Upload" target="_blank"><span style="color:white;">Upload photo</span></a></span>&nbsp;<a id="' + uploadForm + 'refreshGalleryButton" style="cursor:pointer;">Refresh to see your uploaded photo</a>';
        var tojQ = (function(isID, str, tag) {
            if (isID) {
                return '#' + str;
            } else {
                return tag + '.' + str.replace(' ', '.');
            }
        });
        changer(critical, function() {
            console.log($(tojQ(classIDArr[1], uploadForm, 'div')));
            $(tojQ(classIDArr[1], uploadForm, 'div')).html(uploadRefresh);
            $(tojQ(classIDArr[1], uploadForm, 'div') + 'refreshGalleryButton').on('click', function() {
                console.log(document.getElementById(uploadForm + 'refreshGalleryButton'));
                $(tojQ(classIDArr[2], searchInput, 'div')).val('.');
                $(tojQ(classIDArr[3], searchButton, 'div')).click();
            });
        });
    }
}

function changer0(criticalID, fn) {
    fn();
}

function changer1(criticalID, fn) {
    $('#' + criticalID).mousemove(function() {
        fn();
    });
    $('#' + criticalID).keydown(function() {
        fn();
    });
}

function changer2(criticalClass, fn) {
    $('.' + criticalClass.replace(' ', '.')).remove();
    fn();
    $('div.' + 'oo-ui-panelLayout-scrollable oo-ui-pageLayout-active'.replace(' ', '.')).html('test');
}

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            imagePolicyUpload(mutation, [true, true, true, true], 'WikiaPhotoGalleryEditor', 'WikiaPhotoGalleryImageUploadForm', 'WikiaPhotoGallerySearch input', 'WikiaPhotoGallerySearch button', document.getElementById('WikiaPhotoGalleryImageUpload'), changer0);
            imagePolicyUpload(mutation, [true, true, true, true], 'WMU_divWrapper', 'ImageUploadForm', 'ImageQuery', 'ImageUploadFind :nth-child(2) :nth-child(3)', true, changer1);
            //imagePolicyUpload(mutation,[false,false,false,false],'oo-ui-widget-enabled ve-ui-widget-droptarget', 'oo-ui-panelLayout-scrollable oo-ui-pageLayout-active','ImageQuery','ImageUploadFind :nth-child(2) :nth-child(3)',true,changer2);
            imagePolicyUpload(mutation, [false, true, false, false], 'oo-ui-panelLayout-scrollable oo-ui-pageLayout-active', 'test13432', 'ImageQuery', 'ImageUploadFind :nth-child(2) :nth-child(3)', true, changer2);
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