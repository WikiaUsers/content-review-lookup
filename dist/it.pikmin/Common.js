window.ArchiveBoards = {
    boards: ["Notizie e annunci", "Novit� sulla Wiki", "Off-Topic"],
    boardNotice: "Il forum � stato chiuso. Per favore, usa le discussioni   del sito.",
};

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ArchiveBoards/code.js"
    ]
});