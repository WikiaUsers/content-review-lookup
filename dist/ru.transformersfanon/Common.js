/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/**
 * Auto Update *
 **/
 
 importArticles({
    type: 'script',
    articles: [
        'u:dev:DiscordIntegrator/code.js'
    ]
});
}