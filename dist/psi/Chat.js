/* Special:Chat Extension */

importArticles({
    type: 'script',
    articles: [
           'u:dev:ChatOptions/code.js',         // ChatOptions, including ChatHacks
           'u:dev:!kick/code.js',               // !kick <username>
           'u:dev:GiveChatModPrompt/code.js',   // Stops accidental promotions
           'u:dev:QuickModTools/code.js'        // CTRL+Right click on chat message 
    ]
});