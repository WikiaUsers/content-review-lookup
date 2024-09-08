window.ArchiveBoards = {
    boards: ["Notizie e annunci", "Novità sulla Wiki", "Off-Topic"],
    boardNotice: "Il forum è stato chiuso. Per favore, usa le discussioni   del sito.",
};

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ArchiveBoards/code.js"
    ]
});