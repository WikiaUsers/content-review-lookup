/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
    modules: {},
    tags: {
        wikicreator: { u:'The One and Only'},
    },
    oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'})

UserTagsJS.modules.custom = {
    'Firered4': ['wikicreator'],
};

UserTagsJS.modules.userfilter = {
    'Firered4': ['emailuser'],
};