// AjaxRC configuration
var ajaxPages = ["Служебная:Watchlist", "Служебная:Contributions", "Служебная:WikiActivity", "Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';

window.UserTagsJS = {
    modules: {},
    tags: {
        founder: { u:'Основатель', order: 1},
        sysop: { u:'Администратор', order: 3},
        bureaucrat: { u:'Бюрократ', order: 2 },
        VSTF: { u:'VSTF', order:100 },
        Helper: { u:'Helper', order: 100 },
        bot: {u:'Бот', order:5}
    }
};
UserTagsJS.modules.custom = {
    'Plizirim':['Helper'],
    'Kopcap94':['VSTF']
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bot'];

// Список подгружаемых скриптов.
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'w:c:dev:UserTags/code.js',
        'w:c:spottra:MediaWiki:Common.js/Storage.js',
        'MediaWiki:Common.js/DrTerror.js',
        'MediaWiki:Common.js/DrTerrorCalc.js',
        'MediaWiki:Common.js/AutoProtTemplate.js',
        'MediaWiki:Common.js/Highcharts.js',
        'MediaWiki:Common.js/Highcharts-data.js',
        'MediaWiki:Common.js/Highcharts-charts-fromTable.js',
        'MediaWiki:Common.js/Highcharts-charts-DrTerror.js',
        'MediaWiki:Common.js/BlackguardBases.js',
        'MediaWiki:Common.js/EventCountdown.js'
            ]
});

// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance.
// Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
// Element.prototypes added based on code by Om Shankar via StackOverflow.
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] :
            (reCache[className] = new RegExp( "(?:\\s|^)" + className +
            "(?:\\s|$)"))).test(element.className);
        };
})();

Element.prototype.hasClassName = function(name) {
    return hasClass(this, name);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "").trim();
    }
};

// Совместимость
function hasClassTest(element, className) {
   return hasClass(element, className);
}

// Округление чисел
function roundNum(digit, num) {
    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
}

// Доп.код для срднего числа снизу
function addNums(addValueA, addValueB) {
    return addValueA + addValueB;
}

// Функция для нахождение среднего числа в диапозоне
function arrayAverage(array) {
    return array.reduce(addNums, 0) / array.length;
}

// Находит уровень войск
function findMaxTroopLevel(unit) {
    var troopIdArray = ["Стрелок", "Гора", "Базука", "Воин", "Танк", "Медик", "Гренадер", "Огневик"];
    var maxTroopLevelArray = [22, 22, 21, 20, 17, 13, 12, 9];
    return maxTroopLevelArray[troopIdArray.indexOf(unit)];
}

// Находит размер войск
function findTroopSize(unit) {
    var troopIdArray = ["Стрелок", "Гора", "Базука", "Воин", "Танк", "Медик", "Гренадер", "Огневик"];
    var troopSizeArray = [1, 4, 2, 3, 8, 5, 6, 21];
    return troopSizeArray[troopIdArray.indexOf(unit)];
}

// Находит максимальный уровень построек
function findMaxBuildingLevel(unit) {
    var buildingIdArray = ["Штаб", "Аванпост", "Сердце силы", "Башня Снайпера", "Пулемёт", "Мортира", "Пушка", "Огнемёт", "Пушка Бум", "Ракетная установка", "Шоковая установка", "УМП 9000", "Супер Мортира", "Лазерный Луч", "Роковая Пушка", "Шоковый Генератор", "Увеличитель Урона", "Генератор Щита", "Боевой Ухват", "Горячий Котел"];
    var maxBuildingLevelArray = [22, 22, 1, 22, 22, 22, 22, 19, 16, 14, 10, 5, 4, 3, 3, 3, 3, 3, 3, 3];
    return maxBuildingLevelArray[buildingIdArray.indexOf(unit)];
}