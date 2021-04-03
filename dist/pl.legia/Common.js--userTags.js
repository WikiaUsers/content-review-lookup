/* Any JavaScript here will be loaded for all users on every page load. */

// UserTag
// http://dev.wikia.com/wiki/UserTags
// Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity


window.UserTagsJS = {
     modules: {},
     tags: {
};

UserTagsJS.modules.custom = {
// BIUROKRACI

// ADMINISTRATORZY

// MODERATORZY I MODERATORZY CZATU

};

UserTagsJS.module.mwGroups = ['bureaucrat'];
UserTagsJS.module.metafilter = {
        sysop: ['bureaucrat']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});