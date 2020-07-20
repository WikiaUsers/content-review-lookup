// ✓ Format checked! Intro, ToC, notes, sections, headings, lines, and tabs.

// This gadget imports [[w:c:dev:LastEdited]] and [[w:c:dev:PageCreator]] and configures them.

/*************************************************/
/*************** TABLE OF CONTENTS ***************/
/**************************************************
TABLE OF CONTENTS
MAIN CODE
    IMPORTS
    CONFIGS

/*************************************************/
/******************* MAIN CODE *******************/
/*************************************************/
// IMPORTS
importArticles({
    type: "script",
    articles: [
        "u:dev:LastEdited/code.js",
        "u:dev:PageCreator/code2.js",
    ],
});

// CONFIGS
window.lastEdited = {
    diffModal: false,
    timezone: "UTC",
};
window.pageCreatorConfig = {
    namespaces: [0, 4, 6, 8, 10, 12, 14, 502],
    useAvatar: true,
    useTimestamp: true,
    useUTC: true,
};