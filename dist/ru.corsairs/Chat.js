function loadChatScripts() {
    importArticles({
    type: "script",
    articles: [
        "w:c:dev:ChatOptions/code.js",
        "MediaWiki:CustomChatTags.js"
        ]
    });
        mainRoom.maxCharacterLimit = 3000;
    $("#join-alert").remove();
    chatIsLoaded = true;
}

/*********************************
* SpeedEmoticon 
*/

importScriptPage('SpeedEmoticon/latest.js','korniux');