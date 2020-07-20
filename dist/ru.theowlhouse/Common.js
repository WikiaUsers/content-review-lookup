/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой страниц */

// RailWAM из Dev wiki
// Конфигурация скрипта
window.railWAM = {
     logPage:'', // Отказ от идеи логирования, поэтому любая её попытка будет безуспешной
     loadOnPage:'Служебная:WikiActivity',
     lang:'ru',
     showLogAlert:false // Никаких уведомлений о записи логов
};

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Quotes.js',
    ]
});