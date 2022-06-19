/* Any JavaScript here will be loaded for all users on every page load. */
window.ArchiveBoards = {
    boards: ["Archived", "Announcements"],
};

(window.dev = window.dev || {}).fastFileDelete = window.dev.fastFileDelete || {};
window.dev.fastFileDelete.groups = 'content\-moderator';
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});