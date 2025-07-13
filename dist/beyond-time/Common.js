/* Any JavaScript here will be loaded for all users on every page load. */

if (mw.config.get('wgPageName') === 'User:Godof.FlameWater' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}

// Inactive users module (using UserTagsJS)
UserTagsJS.modules.inactive = {
    days: 30, 
    text: 'Inactive', 
    warning: {
        text: 'This user has been inactive for %s days.', 
        days: 7 
    }
};

// Autoconfirmed users module
UserTagsJS.modules.autoconfirmed = true;

// New user module
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // Users are considered "new" if they have less than 7 days AND less than 20 edits
        return days < 7 && edits < 20;
    }
};