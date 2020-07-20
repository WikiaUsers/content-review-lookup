/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
   type: "script",
   articles: [
       'w:c:dev:UserTags/code.js',
   ]
});
window.UserTagsJS = {
        modules: {},
        tags: {
                bureaucrat: {u:'Bureaucrat'},
                sysop: {u:'Admin'},
                chatmoderator: {u:'Chat Mod'},
        }
};
UserTagsJS.modules.custom = {
        'Glem3': ['Creator', 'Original', 'Satoshi', 'Cat'],
        'Azboy2004': ['Coder', 'Original', 'Robert'],
        'That Starman that hides in the corner': ['Original', 'Nigel', 'BB'],
        'Bed head zed': ['Original', 'Riptup'],
        'Candlefly': ['Original', 'Crystal'],
        'TheKrazyStew': ['Widy'],
        'SalamanderCmndr': ['Sal']
};