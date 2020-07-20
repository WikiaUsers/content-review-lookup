(function () {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoiler', cats) !== -1,
        mature  = $.inArray('Mature content',cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function () {    
        return spoiler || mature;
    };
    if (mature && spoiler) {
        window.SpoilerAlert.question = 'Trang này sẽ cho biết trước nội dung cũng như có nội dung nhạy cảm, bạn có muốn xem không?';
        window.SpoilerAlert.yes = 'Có, tôi muốn xem.';
        window.SpoilerAlert.no = 'Không, tôi không muốn.';		
    } else if (mature) {
        window.SpoilerAlert.question = 'Trang này có nội dung nhạy cảm, bạn có muốn xem không?';
        window.SpoilerAlert.yes = 'Có, tôi muốn xem.';
        window.SpoilerAlert.no = 'Không, tôi không muốn.';			
    } else if (spoiler) {
        window.SpoilerAlert.question = 'Trang này sẽ cho biết trước nội dung, bạn có muốn xem không?';
        window.SpoilerAlert.yes = 'Có, tôi muốn xem.';
        window.SpoilerAlert.no = 'Không, tôi không muốn.';				
    }
}());

impart('u:dev:SpoilerAlert/code.js');