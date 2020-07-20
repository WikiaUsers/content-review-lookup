if($('#LicensingRow').exists()) {
    console.log('yuhuu!!!');
}
if($('#ImageUploadLicense').exists()) {
    console.log('woohoo!!!');
}
console.log('TEST\tTEST\tTEST');
addOnloadHook(function() {
    $('.WikiaMainContent').on('click','.RTEImageButton',function() {
        console.log('JA!!! JA!!! JA!!!')
    });
});
$.fn.listenFor = function(el,callback) {
    $(this).bind("DOMSubtreeModified", function() {
        if(!!$(el).length) {
            callback($(el));
        }
    });
}
$('.WikiaMainContent').listenFor('.RTEImageButton',function(el) {
    $(el).click(function() {
    console.log('NEIN!!! NEIN!!! NEIN!!!')
});
});
//$('#ImageUploadLicense').bind('change', );