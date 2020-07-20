/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
modules: {},
tags: {
// group: { associated tag data }
felipe: { u:'Felipeboss' },

               five: { u:'Five Stractor' }
}
};
UserTagsJS.modules.custom = {
'WikiaFan195': ['felipe'], // Add Felipebross

       'MisterJF': ['five'], // Add Five Stractor
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});