// MediaWiki:MarvelCalendar.js
// Недельный календарь Marvel — JS-версия с кэшированием по ISO-неделе,автоматической инвалидацией при изменении исключений и выводом через {{РГ}}

const CALENDAR_ID = 'marvel-weekly-calendar';
const CACHE_KEY = 'marvelCalendarCache';
const CACHE_VERSION = 4;

// ============================================
// 1. Вспомогательные функции
// ============================================

function getCurrentISOWeekAndYear() {
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    d.setUTCDate(d.getUTCDate() + 3 - (d.getUTCDay() + 6) % 7);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { week: weekNo, year: d.getUTCFullYear() };
}

// Диапазон недели на русском
function getWeekRange(week, year) {
    const monday = getDateOfISOWeek(week, year, 1);
    const sunday = getDateOfISOWeek(week, year, 7);

    const startDay = monday.getUTCDate();
    const endDay   = sunday.getUTCDate();

    const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];

    const startMonth = months[monday.getUTCMonth()];
    const endMonth   = months[sunday.getUTCMonth()];

    if (monday.getUTCMonth() === sunday.getUTCMonth()) {
        return `${week} неделя, ${startDay} — ${endDay} ${startMonth}`;
    } else {
        return `${week} неделя, ${startDay} ${startMonth} — ${endDay} ${endMonth}`;
    }
}

function getDateOfISOWeek(week, year, dayOfWeek) {
    const date = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
    const day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + dayOfWeek - day);
    return date;
}

// ============================================
// 2. Работа с кэшем
// ============================================

function isLocalStorageAvailable() {
    try {
        const test = '__ls_test__';
        localStorage.setItem(test, '1');
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

const LS_AVAILABLE = isLocalStorageAvailable();

function getCache() {
    if (!LS_AVAILABLE) return null;
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        if (parsed.version !== CACHE_VERSION) return null;
        return parsed;
    } catch (e) {
        try { localStorage.removeItem(CACHE_KEY); } catch (_) {}
        return null;
    }
}

function setCache(releasesData, exceptionsRevId) {
    if (!LS_AVAILABLE) return;
    try {
        const current = getCurrentISOWeekAndYear();
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            version: CACHE_VERSION,
            week: current.week,
            year: current.year,
            data: releasesData,
            exceptionsRevId: exceptionsRevId,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('MarvelCalendar: Не удалось сохранить кэш');
    }
}

// ============================================
// 3. Загрузка исключений
// ============================================

// Тестовые названия заменены:
const EXCEPTIONS_PAGE = 'Данные:ReleaseExceptions';
const EXCEPTION_TEMPLATE = 'EH';        // ← EH =  ExceptionHandling (обработка исключений)

async function getExceptionsInfo() {
    try {
        const api = new mw.Api();
        const response = await api.get({
            action: 'query',
            titles: EXCEPTIONS_PAGE,
            prop: 'revisions',
            rvprop: 'content|ids',
            rvslots: 'main',
            formatversion: 2
        });

        const page = response.query.pages[0];
        if (!page || page.missing) return { exceptions: {}, revid: 0 };

        const content = page.revisions[0].slots.main.content || '';
        const revid = page.revisions[0].revid;

        const exceptions = {};
        const regex = new RegExp('\\{\\{' + EXCEPTION_TEMPLATE + '\\s*([\\s\\S]*?)\\}\\}', 'gi');
        let match;

        while ((match = regex.exec(content)) !== null) {
            const chunk = match[1];
            const exc = {};
            const paramRegex = /\|?\s*([^|=\s]+)\s*=\s*([^|\n]+)/g;
            let paramMatch;
            while ((paramMatch = paramRegex.exec(chunk)) !== null) {
                let key = paramMatch[1].trim().toLowerCase();
                let value = paramMatch[2].trim();
                exc[key] = value;
            }
            if (exc.name) exceptions[exc.name] = exc;
        }

        return { exceptions, revid };
    } catch (err) {
        console.warn('MarvelCalendar: Не удалось загрузить исключения', err);
        return { exceptions: {}, revid: 0 };
    }
}

// ============================================
// 4. Парсинг и применение исключений
// ============================================

function parseTitle(title) {
    let series = title.replace(/\s*\bVol\b.*$/, '').trim();
    let vol = title.match(/Vol\s+(\d+)/i) ? parseInt(title.match(/Vol\s+(\d+)/i)[1]) : 1;
    let issueMatch = title.match(/(\d+)(?:\s+(Annual|Special))?$/i);
    let issue = issueMatch ? issueMatch[1] : "1";

    const isAnnual = /Annual/i.test(title);
    const isSpecial = /Special/i.test(title);

    let issueStr = issue;
    if (isAnnual) issueStr += " Annual";
    if (isSpecial) issueStr += " Special";

    return {
        fullTitle: title,
        series: series,
        vol: vol,
        issueStr: issueStr,
        picture: title + ".jpg",
        isException: false,
        isOneShot: false,
        date: new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(new Date())
    };
}

function applyExceptions(titles, exceptions) {
    return titles.map(title => {
        let data = parseTitle(title);
        const excKey = Object.keys(exceptions).find(key => 
            data.series.includes(key) || key.includes(data.series)
        );
        const exc = excKey ? exceptions[excKey] : null;

        if (exc) {
            data.isException = true;
            if (exc.issue2) {
                data.issueStr = exc.issue2;
                if (exc.issue2 === "One-Shot") data.isOneShot = true;
            }
            if (exc.vol2) data.vol = parseInt(exc.vol2) || data.vol;
            if (exc.picture2) data.picture = exc.picture2;
            if (exc.name2) data.series = exc.name2;
        }
        return data;
    });
}

// ============================================
// 5. Формирование {{РГ}} и рендер
// ============================================

function buildRGCall(data) {
    if (data.isException) {
        const displayIssue = (data.isOneShot || data.issueStr === "One-Shot") ? "" : "#" + data.issueStr;
        return `{{РГ|${data.picture}|${data.series}|${displayIssue}|${data.date}}}`;
    } else {
        const volPart = (data.vol == 1) ? "" : " " + data.vol;
        return `{{РГ|${data.issueStr}${volPart}|в=${data.series}}}`;
    }
}

async function fetchReleases(week, year) {
    const cat = `Week_${week},_${year}`;
    const url = `https://marvel.fandom.com/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(cat)}&cmlimit=500&cmprop=title&format=json&origin=*`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        return json.query?.categorymembers?.map(m => m.title) || [];
    } catch (err) {
        console.error('MarvelCalendar: Ошибка запроса к API Marvel', err);
        return [];
    }
}

async function renderWithRG(releasesData) {
    const container = document.querySelector(`#${CALENDAR_ID} .comics-container`);
    if (!container) return;

    if (releasesData.length === 0) {
        container.innerHTML = `<p class="no-releases">На этой неделе релизов Marvel нет.</p>`;
        return;
    }

    const wikitext = releasesData.map(buildRGCall).join('\n');

    try {
        const api = new mw.Api();
        const parsed = await api.parse(wikitext, {
            title: mw.config.get('wgPageName'),
            disableeditsection: true,
            wrapoutputclass: ''
        });
        container.innerHTML = parsed;
    } catch (err) {
        console.error('MarvelCalendar: Ошибка парсинга {{РГ}}', err);
        container.innerHTML = `<p class="error">Ошибка отображения календаря. Попробуйте обновить страницу.</p>`;
    }
}

// ============================================
// 6. Основная функция инициализации (с автоматической инвалидацией)
// ============================================

async function initMarvelCalendar() {
    const header = document.querySelector(`#${CALENDAR_ID} .week-header`);
    const container = document.querySelector(`#${CALENDAR_ID} .comics-container`);
    if (!header || !container) return;

    const { week, year } = getCurrentISOWeekAndYear();
    header.innerHTML = `Комиксы недели ${getWeekRange(week, year)}<br><small style="font-size:0.85em;opacity:0.7;">(автообновление при изменении исключений)</small>`;

    container.innerHTML = '<p class="loading">Загрузка релизов Marvel...</p>';

    const cache = getCache();
    const exceptionsInfo = await getExceptionsInfo();

    let releasesData = null;

    // Автоматическая проверка: если неделя та же И revid исключений не изменился → берём кэш
    if (cache && 
        cache.week === week && 
        cache.year === year && 
        cache.exceptionsRevId === exceptionsInfo.revid) {
        
        releasesData = cache.data;
    } else {
        // Кэш устарел или изменились исключения, следовательно, перезагружаем
        try {
            const titles = await fetchReleases(week, year);
            releasesData = applyExceptions(titles, exceptionsInfo.exceptions);
            setCache(releasesData, exceptionsInfo.revid);
        } catch (err) {
            console.error(err);
            container.innerHTML = '<p class="error">Не удалось загрузить данные. Попробуйте обновить страницу.</p>';
            return;
        }
    }

    await renderWithRG(releasesData);
}

// ============================================
// 7. Запуск + кнопка «Обновить сейчас»
// ============================================

let started = false;

function startCalendar() {
    if (started) return;
    started = true;

    const calendar = document.getElementById(CALENDAR_ID);
    if (!calendar) return;

    initMarvelCalendar();

    // Кнопка принудительного обновления
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Обновить календарь сейчас';
    refreshBtn.style.cssText = 'font-size:0.85em; margin-top:8px; opacity:0.8;';
	refreshBtn.onclick = () => {
    	if (LS_AVAILABLE) localStorage.removeItem(CACHE_KEY);
        initMarvelCalendar();
        refreshBtn.textContent = 'Обновлено!';
        setTimeout(() => { 
            refreshBtn.textContent = 'Обновить календарь сейчас'; 
        }, 2000);
    };

    calendar.appendChild(refreshBtn);
}

mw.hook('wikipage.content').add(startCalendar);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startCalendar();
}