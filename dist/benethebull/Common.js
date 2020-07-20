/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
  modules: {},
  tags: {
  contentmoderator: 'Content Moderator',
  }
};
UserTagsJS.modules.custom = {
  'EvilMidnightNG': ['contentmoderator']
};

importArticles({
    type: "script",
    articles: [
        "u:dev:UserTags/code.js",
    ]
});