/**
 *
 * @name: preventUnlicensedFiles
 * @description: Prevent unlicensed files from being uploaded
 * @author: Unai01
 *
 */
;(function(uploadForm) {
    'use strict';
    var conf = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgAction'
    ]);
    if (conf.wgCanonicalSpecialPageName != 'Upload' && conf.wgAction != 'edit') {
        return;
    }
    var preventUnlicensedFiles = {
        initEditor: function() {
            var input = uploadForm.querySelector('#ImageUploadLicense');
            if (!input) return;
            input.setAttribute('required', '');
        },
        initUpload: function() {
            var license = uploadForm.querySelector('#wpLicense');
            if (!license) return;
            license.setAttribute('required', '');
        },
        init: function() {
            if (conf.wgAction === 'edit')
                this.initEditor();
            else if (conf.wgCanonicalSpecialPageName === 'Upload')
                this.initUpload();
        }
    };
    preventUnlicensedFiles.init();
}(document));