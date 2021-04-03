/* Any JavaScript here will be loaded for all users on every page load. */
//UserTags information
window.UserTagsJS = {
    modules: {},
    tags: {
               chatmoderator: {u: 'CHATMOD'},
               notautoconfirmed: {u: 'NOT AUTOCONFIRMED'},
               inactive: {u: 'INACTIVE'}
              },
    oasisPlaceBefore: ''
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bannedfromchat'];
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = {
    'sysop': ['bannedfromchat'],
        'bureaucrat': ['bannedfromchat'],
        'chatmoderator': ['bannedfromchat']
};
UserTagsJS.modules.inactive = 180;

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
//END UserTags information

//Link previews default image; it's currently displaying something in Russian
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://img3.wikia.nocookie.net/__cb20141105063015/snl/images/8/89/Wiki-wordmark.png';

importArticle({type:'script', article:'u:dev:MediaWiki:LinkPreview/code.js'}); //Link previews