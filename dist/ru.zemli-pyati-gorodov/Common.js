// ============================================================
// АВТОМАТИЧЕСКИЙ СТАТУС СТАТЕЙ (20 УРОВНЕЙ)
// ============================================================

$(document).ready(function() {
    var currentTitle = mw.config.get('wgTitle');
    if (currentTitle === 'Заглавная страница' || currentTitle === 'Земли Пяти Городов Вики') {
        return;
    }
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
    if (mw.config.get('wgAction') !== 'view') return;
    if (document.querySelector('.status-icon')) return;

    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            action: 'query',
            prop: 'info',
            titles: currentTitle,
            format: 'json'
        },
        dataType: 'json',
        success: function(data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages)[0];
            var size = pages[pageId].length || 0;
            if (size > 0) {
                var statusData = getStatusData(size);
                if (statusData) {
                    insertStatusHTML(statusData);
                }
            }
        }
    });
});

function getStatusData(size) {
    var statuses = [
        { max: 500, emoji: '🌱', class: 'rostok', text: 'Росток (0–500 байт)' },
        { max: 1000, emoji: '🍃', class: 'travinka', text: 'Травинка (500–1 000 байт)' },
        { max: 2500, emoji: '🌿', class: 'kustik', text: 'Кустик (1 000–2 500 байт)' },
        { max: 5000, emoji: '🌳', class: 'sazhenets', text: 'Саженец (2 500–5 000 байт)' },
        { max: 10000, emoji: '🐾', class: 'sledopyt', text: 'Следопыт (5 000–10 000 байт)' },
        { max: 15000, emoji: '🦌', class: 'iskatel', text: 'Искатель (10 000–15 000 байт)' },
        { max: 20000, emoji: '📖', class: 'svitok', text: 'Свиток (15 000–20 000 байт)' },
        { max: 25000, emoji: '📚', class: 'bibliotekar', text: 'Библиотекарь (20 000–25 000 байт)' },
        { max: 30000, emoji: '🔮', class: 'shaman', text: 'Шаман (25 000–30 000 байт)' },
        { max: 35000, emoji: '🧙', class: 'mudrets', text: 'Мудрец (30 000–35 000 байт)' },
        { max: 40000, emoji: '⚔️', class: 'voin', text: 'Воин (35 000–40 000 байт)' },
        { max: 45000, emoji: '🛡️', class: 'zashchitnik', text: 'Защитник (40 000–45 000 байт)' },
        { max: 50000, emoji: '👑', class: 'knyaz', text: 'Князь (45 000–50 000 байт)' },
        { max: 60000, emoji: '👑', class: 'korol', text: 'Король Медведей (50 000–60 000 байт)' },
        { max: 70000, emoji: '👑', class: 'imperator', text: 'Император (60 000–70 000 байт)' },
        { max: 80000, emoji: '🏛️', class: 'khranitel', text: 'Хранитель (70 000–80 000 байт)' },
        { max: 90000, emoji: '📜', class: 'letopisets', text: 'Летописец (80 000–90 000 байт)' },
        { max: 100000, emoji: '⭐', class: 'izbranny', text: 'Избранный (90 000–100 000 байт)' },
        { max: 120000, emoji: '⭐', class: 'khranitel_legend', text: 'Хранитель Легенд (100 000–120 000 байт)' },
        { max: Infinity, emoji: '⭐', class: 'legenda', text: 'Легенда (120 000+ байт)' }
    ];

    for (var i = 0; i < statuses.length; i++) {
        if (size <= statuses[i].max) {
            return statuses[i];
        }
    }
    return null;
}

function insertStatusHTML(statusData) {
    var html = '<p style="height:40px; margin:0; display:block; clear:both; text-align:right;">' +
               '<span class="status-icon status-' + mw.html.escape(statusData.class) + '" title="Статус: ' + mw.html.escape(statusData.text) + '" style="cursor:help; font-size:32px;">' +
               mw.html.escape(statusData.emoji) +
               '</span></p>';
    var firstElement = document.querySelector('.mw-parser-output > *:first-child');
    if (firstElement) {
        firstElement.insertAdjacentHTML('beforebegin', html);
    } else {
        var content = document.querySelector('.mw-parser-output');
        if (content) {
            content.insertAdjacentHTML('afterbegin', html);
        }
    }
}
// ============================================================
// БАННЕРЫ ДЛЯ ВСЕХ ГОРОДОВ
// ============================================================

$(document).ready(function() {
    // Проверяем, что мы на странице статьи
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
    if (mw.config.get('wgAction') !== 'view') return;

    var title = mw.config.get('wgTitle');
    
    // Проверяем, не добавлен ли уже баннер
    if (document.getElementById('city-banner')) return;

    // Определяем, какой баннер показывать
    var bannerData = getBannerData(title);
    if (!bannerData) return;

    var bannerHtml = generateBanner(bannerData);
    
    // Вставляем баннер в начало статьи
    var firstElement = document.querySelector('.mw-parser-output > *:first-child');
    if (firstElement) {
        firstElement.insertAdjacentHTML('beforebegin', bannerHtml);
    } else {
        var content = document.querySelector('.mw-parser-output');
        if (content) {
            content.insertAdjacentHTML('afterbegin', bannerHtml);
        }
    }
});

function getBannerData(title) {
    var banners = {
        'Первый Город': {
            icon: '🏙️',
            name: 'Первый Город',
            subtitle: 'Сердце Земель Пяти Городов',
            population: 'Глебгастыши, Микроныши',
            status: 'Главный город вселенной',
            factions: 'Глебгастыши, Микроныши',
            founded: 'Древние времена',
            color: '#FFD700',
            link: '/ru/wiki/Категория:География'
        },
        'Второй Город': {
            icon: '🏚️',
            name: 'Второй Город',
            subtitle: 'Обитель Алёнышей',
            population: 'Алёныши (почти уничтожены)',
            status: 'Бывший город Алёнышей',
            factions: 'Алёныши (ранее)',
            founded: 'Неизвестно',
            color: '#8B0000',
            link: '/ru/wiki/Категория:География'
        },
        'Третий Город': {
            icon: '🏘️',
            name: 'Третий Город',
            subtitle: 'Союзник Первого Города',
            population: 'Глебгастыши, Микроныши',
            status: 'Торговый союзник',
            factions: 'Глебгастыши, Микроныши',
            founded: 'Неизвестно',
            color: '#DAA520',
            link: '/ru/wiki/Категория:География'
        },
        'Четвёртый Город': {
            icon: '⚔️',
            name: 'Четвёртый Город',
            subtitle: 'Логово Хулиганов',
            population: 'Хулиганы, враги Бибо',
            status: 'Опасная зона',
            factions: 'Хулиганы',
            founded: 'Неизвестно',
            color: '#8B4513',
            link: '/ru/wiki/Категория:География'
        },
        'Пятый Город': {
            icon: '💀',
            name: 'Пятый Город',
            subtitle: 'Тёмное сердце вселенной',
            population: 'Демоны, Нежить',
            status: 'Опасный и неизведанный',
            factions: 'Демоны, Нежить',
            founded: 'Древние времена',
            color: '#2C0E0E',
            link: '/ru/wiki/Категория:География'
        }
    };

    return banners[title] || null;
}

function generateBanner(data) {
    return `
    <div id="city-banner" style="
        background: linear-gradient(135deg, #1C0E0C 0%, #3A1414 50%, #1C0E0C 100%);
        border: 3px solid #C0392B;
        border-radius: 20px;
        padding: 30px 20px;
        margin-bottom: 30px;
        box-shadow: 0 8px 32px rgba(192, 57, 43, 0.25);
        text-align: center;
        color: #FFFFFF;
        position: relative;
        overflow: hidden;
    ">
        <div style="
            position: absolute;
            top: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: rgba(192, 57, 43, 0.1);
            border-radius: 50%;
            pointer-events: none;
        "></div>
        <div style="
            position: absolute;
            bottom: -80px;
            left: -80px;
            width: 250px;
            height: 250px;
            background: rgba(192, 57, 43, 0.08);
            border-radius: 50%;
            pointer-events: none;
        "></div>
        
        <div style="font-size: 64px; margin-bottom: 10px;">${data.icon}</div>
        <h1 style="
            font-size: 42px;
            font-weight: bold;
            color: ${data.color};
            margin: 0 0 4px 0;
            text-shadow: 0 2px 12px rgba(192, 57, 43, 0.3);
        ">${data.name}</h1>
        <div style="
            font-size: 18px;
            color: #E67E73;
            margin-bottom: 20px;
            font-style: italic;
        ">${data.subtitle}</div>
        
        <div style="
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            max-width: 800px;
            margin: 0 auto;
        ">
            <div style="
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid #C0392B;
                border-radius: 12px;
                padding: 12px 20px;
                flex: 1 1 120px;
                min-width: 100px;
            ">
                <div style="font-size: 28px;">👥</div>
                <div style="font-size: 14px; font-weight: bold; color: #F5E6E4;">Население</div>
                <div style="font-size: 16px; color: ${data.color};">${data.population}</div>
            </div>
            <div style="
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid #C0392B;
                border-radius: 12px;
                padding: 12px 20px;
                flex: 1 1 120px;
                min-width: 100px;
            ">
                <div style="font-size: 28px;">🏛️</div>
                <div style="font-size: 14px; font-weight: bold; color: #F5E6E4;">Статус</div>
                <div style="font-size: 16px; color: ${data.color};">${data.status}</div>
            </div>
            <div style="
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid #C0392B;
                border-radius: 12px;
                padding: 12px 20px;
                flex: 1 1 120px;
                min-width: 100px;
            ">
                <div style="font-size: 28px;">⚔️</div>
                <div style="font-size: 14px; font-weight: bold; color: #F5E6E4;">Фракции</div>
                <div style="font-size: 16px; color: ${data.color};">${data.factions}</div>
            </div>
            <div style="
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid #C0392B;
                border-radius: 12px;
                padding: 12px 20px;
                flex: 1 1 120px;
                min-width: 100px;
            ">
                <div style="font-size: 28px;">🗓️</div>
                <div style="font-size: 14px; font-weight: bold; color: #F5E6E4;">Основание</div>
                <div style="font-size: 16px; color: ${data.color};">${data.founded}</div>
            </div>
        </div>
        
        <div style="margin-top: 20px;">
            <a href="${data.link}" style="
                display: inline-block;
                background: #C0392B;
                color: #FFFFFF;
                padding: 10px 28px;
                border-radius: 30px;
                text-decoration: none;
                font-weight: bold;
                transition: all 0.3s ease;
                box-shadow: 0 4px 16px rgba(192, 57, 43, 0.3);
            " onmouseover="this.style.background='#FF4500'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='#C0392B'; this.style.transform='scale(1)'">
                📍 Изучить другие локации →
            </a>
        </div>
    </div>
    `;
}
// ============================================================
// СЧЁТЧИК СЛОВ В СТАТЬЕ
// ============================================================

$(document).ready(function() {
    if (mw.config.get('wgNamespaceNumber') === 0) {
        var text = $('.mw-parser-output').text();
        var wordCount = text.split(/\s+/).filter(function(word) {
            return word.length > 0;
        }).length;
        var charCount = text.replace(/\s/g, '').length;
        var info = $('<div style="background:#FFF5F3; border-left:4px solid #C0392B; padding:8px 16px; margin:8px 0; border-radius:4px; font-size:13px; color:#2C1A0E;">' +
            '📊 Статистика статьи: <strong>' + wordCount + '</strong> слов, <strong>' + charCount + '</strong> символов' +
            '</div>');
        var firstElement = $('.mw-parser-output > *:first-child');
        if (firstElement.length) {
            firstElement.before(info);
        }
    }
});