/**
 * NavButtonsDropdown
 * author: Ultragustavo25
 * description: Replaces the Admin Dashboard button with some new buttons inside a dropdown
 */

$(function() {
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('NavButtonsDropdown').done( function(i18n) {
            $('.wds-community-header__wiki-buttons a[data-tracking="add-new-page"] span').remove();
            $('.wds-community-header__wiki-buttons a[data-tracking="admin-dashboard"]').remove();
            $('.wds-community-header__wiki-buttons a[data-tracking="recent-changes"]').attr({'data-tracking': 'wiki-activity'}); // Only if you have some script that changes this

            var activity = '.wds-community-header__wiki-buttons a[data-tracking="wiki-activity"]';
            $(activity).after(
                '<div class="wds-dropdown">' +
                    '<div class="wds-button wds-is-squished wds-is-secondary wds-dropdown__toggle" style="border-left: inherit;border-right: inherit;border-radius: 0;width: 20px;">' +
                        '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">' +
                            '<path d="M6 9l4-5H2" fill-rule="evenodd"></path>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned">' +
                        '<ul class="wds-list wds-is-linked">' +
                            '<li>' +
                                '<a href="/wiki/Special:AdminDashboard" data-tracking="admin-dashboard">' + i18n.msg('dashboard').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/MediaWiki:Wiki-navigation?action=edit" data-tracking="edit-navigation">' + i18n.msg('navigation').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/Special:CreateBlogPage" data-tracking="create-blog">' + i18n.msg('blog').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/Special:Upload" data-tracking="upload">' + i18n.msg('upload').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/Special:MultipleUpload" data-tracking="multiple-upload">' + i18n.msg('multiupload').escape() + '</a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>'
            );

        if(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('helper') > -1) {
            return 0;
        } else {
            $('a[data-tracking="admin-dashboard"], a[data-tracking="edit-navigation"]').remove();
        }

        });
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});