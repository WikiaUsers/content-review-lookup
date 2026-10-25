/* CustomAchievements Core - Полная интеграция кастомных треков в профиль, лидерборд и настройку (ES2026) */
(async () => {
    'use strict';

    if (window.isCustomAchievementsMainLoaded) return;
    window.isCustomAchievementsMainLoaded = true;

    await mw.loader.using(['mediawiki.api', 'mediawiki.util']);

    const DATA_PAGE = 'MediaWiki:Custom-Achievements.json';
    const CONFIG_PAGE = 'MediaWiki:Custom-AchievementsConfig.json';
    const DEFAULT_THRESHOLDS = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
    const DEFAULT_POINTS = [10, 20, 30, 40, 50, 50, 50, 100, 150];

    const resolveIconUrl = (iconStr) => {
        if (!iconStr) return mw.util.getUrl('Special:FilePath/Site-favicon.ico');
        const trimmed = String(iconStr).trim();
        if (trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('data:')) {
            return trimmed;
        }
        const cleanFile = trimmed.replace(/^(?:File|Файл|Image|Изображение)\s*:\s*/i, '');
        return mw.util.getUrl(`Special:FilePath/${cleanFile}`);
    };

    const formatTimeAgo = (isoTimestamp) => {
        if (!isoTimestamp) return 'недавно';
        const diffSec = Math.max(0, Math.floor((Date.now() - new Date(isoTimestamp).getTime()) / 1000));
        if (diffSec < 60) return 'только что';
        const min = Math.floor(diffSec / 60);
        if (min < 60) return `${min} мин. назад`;
        const hrs = Math.floor(min / 60);
        if (hrs < 24) return `${hrs} ч. назад`;
        const days = Math.floor(hrs / 24);
        if (days < 30) return `${days} дн. назад`;
        const months = Math.floor(days / 30);
        return months < 12 ? `${months} мес. назад` : `${Math.floor(months / 12)} г. назад`;
    };

    const pluralizeEdits = (n) => {
        const mod10 = n % 10;
        const mod100 = n % 100;
        if (mod100 >= 11 && mod100 <= 14) return `${n} правок`;
        if (mod10 === 1) return `${n} правка`;
        if (mod10 >= 2 && mod10 <= 4) return `${n} правки`;
        return `${n} правок`;
    };

    const pluralizePoints = (n) => {
        const mod10 = n % 10;
        const mod100 = n % 100;
        if (mod100 >= 11 && mod100 <= 14) return `${n.toLocaleString('ru-RU')} очков`;
        if (mod10 === 1) return `${n.toLocaleString('ru-RU')} очко`;
        if (mod10 >= 2 && mod10 <= 4) return `${n.toLocaleString('ru-RU')} очка`;
        return `${n.toLocaleString('ru-RU')} очков`;
    };

    const fetchAchievementsData = async () => {
        try {
            const rawUrl = `${mw.util.wikiScript()}?title=${encodeURIComponent(DATA_PAGE)}&action=raw&ctype=application/json`;
            const res = await fetch(rawUrl);
            if (res.ok) return await res.json();
        } catch {}
        return null;
    };

    // Live-дельта (Вариант А): проверяет свежие правки участника, сделанные после последнего запуска бота
    const computeLiveUserStats = async (username, db) => {
        const baseUser = structuredClone(db.users?.[username] ?? { points: 0, tracks: {}, special: [] });
        const lastUpdated = db.last_updated;
        if (!lastUpdated || !db.tracks?.length) return baseUser;

        try {
            const api = new mw.Api();
            const res = await api.get({
                action: 'query',
                list: 'usercontribs',
                ucuser: username,
                ucnamespace: 0,
                ucstart: new Date().toISOString(),
                ucend: lastUpdated,
                ucprop: 'title|timestamp',
                uclimit: 200,
                formatversion: 2
            });

            const contribs = res?.query?.usercontribs ?? [];
            if (contribs.length === 0) return baseUser;

            const uniqueTitles = [...new Set(contribs.map(c => c.title))];
            const catRes = await api.get({
                action: 'query',
                titles: uniqueTitles.slice(0, 50).join('|'),
                prop: 'categories',
                cllimit: 'max',
                formatversion: 2
            });

            const pageCategories = new Map();
            for (const p of catRes?.query?.pages ?? []) {
                const cats = new Set(
                    (p.categories ?? []).map(c => c.title.replace(/^(?:Категория|Category):/i, '').trim().toLowerCase())
                );
                pageCategories.set(p.title, cats);
            }

            const thresholds = db.thresholds ?? DEFAULT_THRESHOLDS;
            const pointsTable = db.points ?? DEFAULT_POINTS;

            for (const track of db.tracks) {
                const catKey = (track.category ?? '').trim().toLowerCase();
                if (!catKey) continue;

                const deltaEdits = contribs.filter(c => pageCategories.get(c.title)?.has(catKey)).length;
                if (deltaEdits === 0) continue;

                const prevTrack = baseUser.tracks[track.id] ?? { edits: 0, level: 0, points: 0 };
                const newEdits = prevTrack.edits + deltaEdits;

                let newLevel = 0;
                let newPoints = 0;
                for (let i = 0; i < thresholds.length; i++) {
                    if (newEdits >= thresholds[i]) {
                        newLevel = i + 1;
                        newPoints += pointsTable[i] ?? 50;
                    } else {
                        break;
                    }
                }

                baseUser.points += (newPoints - prevTrack.points);
                baseUser.tracks[track.id] = {
                    edits: newEdits,
                    level: newLevel,
                    points: newPoints
                };
            }
        } catch (err) {
            console.warn('[CustomAchievements] Ошибка расчёта live-дельты:', err);
        }

        return baseUser;
    };

    // Создаёт элемент <li> значка в точном соответствии со структурой нативного .AchievementsModule Fandom
    const createNativeBadgeLi = ({ title, description, pointsText, iconUrl, isLocked = false }) => {
        const li = document.createElement('li');
        li.className = `custom-achievement-badge${isLocked ? ' custom-achievement-badge--locked' : ''}`;
        li.dataset.customBadge = 'true';

        const hoverWrap = document.createElement('div');
        hoverWrap.className = 'profile-hover';
        hoverWrap.dataset.achievementFixed = 'true';

        const hoverImg = document.createElement('img');
        hoverImg.src = iconUrl;
        hoverImg.width = 50;
        hoverImg.height = 50;

        const textWrap = document.createElement('div');
        textWrap.className = 'profile-hover-text';

        const h4 = document.createElement('h4');
        h4.textContent = title;

        const pDesc = document.createElement('p');
        pDesc.textContent = description;

        const pPoints = document.createElement('p');
        pPoints.className = 'points';
        pPoints.textContent = pointsText;

        textWrap.append(h4, pDesc, pPoints);
        hoverWrap.append(hoverImg, textWrap);

        const badgeIcon = document.createElement('img');
        badgeIcon.className = 'badge-icon';
        badgeIcon.src = iconUrl;
        badgeIcon.width = 50;
        badgeIcon.height = 50;
        badgeIcon.alt = title;
        if (isLocked) {
            badgeIcon.style.filter = 'grayscale(1) opacity(0.65)';
        }

        li.append(hoverWrap, badgeIcon);
        return li;
    };

    // 1 & 2. РЕНДЕР В ПРОФИЛЕ УЧАСТНИКА (Модуль 1: Полученные, Модуль 2: Испытания, Счётчик очков)
    const renderUserProfile = async (db) => {
        const achModule = document.querySelector('.AchievementsModule');
        if (!achModule || achModule.dataset.customProfileRendered === 'true') return;
        achModule.dataset.customProfileRendered = 'true';

        const profileUser = mw.config.get('profileUserName') || mw.config.get('wgTitle')?.split('/')[0];
        if (!profileUser) return;

        const userStats = await computeLiveUserStats(profileUser, db);
        const thresholds = db.thresholds ?? DEFAULT_THRESHOLDS;
        const pointsTable = db.points ?? DEFAULT_POINTS;

        // Обновляем общий счётчик очков в шапке модуля
        if (userStats.points > 0) {
            const scoreNode = achModule.querySelector('.tally em, .tally strong, .data, h3');
            if (scoreNode) {
                const rawText = scoreNode.textContent;
                const numMatch = rawText.match(/(\d[\d\s,.]*)/);
                if (numMatch) {
                    const currentPoints = parseInt(numMatch[1].replace(/\D/g, ''), 10) || 0;
                    const newTotal = currentPoints + userStats.points;
                    scoreNode.textContent = rawText.replace(numMatch[1], newTotal.toLocaleString('ru-RU'));
                }
            }
        }

        let earnedList = achModule.querySelector('ul.badges-icons');
        if (!earnedList) {
            earnedList = document.createElement('ul');
            earnedList.className = 'badges-icons';
            achModule.appendChild(earnedList);
        }

        let tracksList = achModule.querySelector('ul.badges-tracks');
        if (!tracksList) {
            tracksList = document.createElement('ul');
            tracksList.className = 'badges-tracks';
            achModule.appendChild(tracksList);
        }

        const earnedFragment = document.createDocumentFragment();
        const tracksFragment = document.createDocumentFragment();

        // А. Отрисовка треков категорий
        for (const track of db.tracks ?? []) {
            const uTrack = userStats.tracks?.[track.id] ?? { edits: 0, level: 0, points: 0 };
            const levelsCfg = track.levels ?? [];
            const defaultIcon = track.default_icon || 'Badge-Default.png';

            // 1. Если открыт хотя бы 1 уровень — добавляем в "Полученные значки" (Модуль 1)
            if (uTrack.level > 0) {
                const lvlIdx = uTrack.level - 1;
                const lvlInfo = levelsCfg[lvlIdx] ?? {};
                const badgeTitle = lvlInfo.name || `${track.title} — Уровень ${uTrack.level}`;
                const badgeIcon = resolveIconUrl(lvlInfo.icon || defaultIcon);
                const lvlPoints = pointsTable[lvlIdx] ?? 50;
                const desc = `${track.description || `За правки в категории «${track.category}»`} (${pluralizeEdits(uTrack.edits)})`;

                earnedFragment.appendChild(createNativeBadgeLi({
                    title: badgeTitle,
                    description: desc,
                    pointsText: pluralizePoints(lvlPoints),
                    iconUrl: badgeIcon,
                    isLocked: false
                }));
            }

            // 2. Если ещё не взят максимальный 9-й уровень — добавляем следующий уровень в "Испытания" (Модуль 2)
            if (uTrack.level < thresholds.length) {
                const nextIdx = uTrack.level;
                const nextReq = thresholds[nextIdx];
                const remaining = Math.max(0, nextReq - uTrack.edits);
                const nextInfo = levelsCfg[nextIdx] ?? {};
                const nextTitle = nextInfo.name || `${track.title} — Уровень ${nextIdx + 1}`;
                const nextIcon = resolveIconUrl(nextInfo.icon || defaultIcon);
                const nextPts = pointsTable[nextIdx] ?? 50;

                tracksFragment.appendChild(createNativeBadgeLi({
                    title: nextTitle,
                    description: `Категория «${track.category}»: сделано ${uTrack.edits} из ${nextReq} правок (осталось ${pluralizeEdits(remaining)}).`,
                    pointsText: `Награда: ${pluralizePoints(nextPts)}`,
                    iconUrl: nextIcon,
                    isLocked: true
                }));
            }
        }

        // Б. Отрисовка специальных (ручных) медалей
        const specMap = new Map((db.special_badges ?? []).map(s => [s.id, s]));
        for (const specId of userStats.special ?? []) {
            const spec = specMap.get(specId);
            if (!spec) continue;
            earnedFragment.appendChild(createNativeBadgeLi({
                title: spec.name,
                description: spec.description || 'Особая награда проекта',
                pointsText: pluralizePoints(Number(spec.points) || 100),
                iconUrl: resolveIconUrl(spec.icon),
                isLocked: false
            }));
        }

        earnedList.prepend(earnedFragment);
        tracksList.appendChild(tracksFragment);
    };

    // 3 & 4. РЕНДЕР НА SPECIAL:LEADERBOARD (Таблица лидеров + Модуль недавних значков в рейле)
    const renderLeaderboard = (db) => {
        // 3. Обновляем очки и иконки в таблице #LeaderboardTable
        const table = document.querySelector('#LeaderboardTable, .LeaderboardTable');
        if (table && table.dataset.customLeaderboardRendered !== 'true') {
            table.dataset.customLeaderboardRendered = 'true';

            const tbody = table.querySelector('tbody') || table;
            const rows = Array.from(tbody.querySelectorAll('tr')).filter(r => r.querySelector('.user a'));
            const thresholds = db.thresholds ?? DEFAULT_THRESHOLDS;
            const pointsTable = db.points ?? DEFAULT_POINTS;

            for (const row of rows) {
                const userLink = row.querySelector('.user a');
                const username = userLink?.textContent.trim();
                const uStats = username ? db.users?.[username] : null;
                if (!uStats || uStats.points <= 0) continue;

                const pointsCell = row.querySelector('.points, td:nth-child(3)');
                if (pointsCell) {
                    const currentPts = parseInt(pointsCell.textContent.replace(/\D/g, ''), 10) || 0;
                    const newTotal = currentPts + uStats.points;
                    row.dataset.totalScore = String(newTotal);
                    pointsCell.textContent = newTotal.toLocaleString('ru-RU');
                }

                const badgesList = row.querySelector('td.badges ul, .badges ul');
                if (badgesList) {
                    for (const track of db.tracks ?? []) {
                        const uTrack = uStats.tracks?.[track.id];
                        if (!uTrack || uTrack.level <= 0) continue;

                        const lvlIdx = uTrack.level - 1;
                        const lvlInfo = track.levels?.[lvlIdx] ?? {};
                        const badgeTitle = lvlInfo.name || `${track.title} — Уровень ${uTrack.level}`;
                        const badgeIcon = resolveIconUrl(lvlInfo.icon || track.default_icon);
                        const lvlPts = pointsTable[lvlIdx] ?? 50;

                        badgesList.prepend(createNativeBadgeLi({
                            title: badgeTitle,
                            description: `${track.description || `Категория «${track.category}»`} (${pluralizeEdits(uTrack.edits)})`,
                            pointsText: pluralizePoints(lvlPts),
                            iconUrl: badgeIcon,
                            isLocked: false
                        }));
                    }
                }
            }

            // Пересортировываем строки таблицы по новому счёту и обновляем номера мест
            rows.sort((a, b) => {
                const scoreA = parseInt(a.dataset.totalScore || a.querySelector('.points, td:nth-child(3)')?.textContent.replace(/\D/g, '') || '0', 10);
                const scoreB = parseInt(b.dataset.totalScore || b.querySelector('.points, td:nth-child(3)')?.textContent.replace(/\D/g, '') || '0', 10);
                return scoreB - scoreA;
            });

            rows.forEach((row, index) => {
                const rankCell = row.querySelector('.rank, td:first-child');
                if (rankCell && /^\d+$/.test(rankCell.textContent.trim())) {
                    rankCell.textContent = String(index + 1);
                }
                tbody.appendChild(row);
            });
        }

        // 4. Модуль "Недавние значки" в правом рейле на Special:Leaderboard
        const railList = document.querySelector('.AchievementsModule ul, .recent-badges ul');
        if (railList && railList.dataset.customRecentRendered !== 'true' && db.recent?.length) {
            railList.dataset.customRecentRendered = 'true';
            const fragment = document.createDocumentFragment();

            for (const item of db.recent.slice(0, 6)) {
                const li = document.createElement('li');
                li.className = 'custom-recent-badge-item';

                const img = document.createElement('img');
                img.src = resolveIconUrl(item.icon);
                img.width = 50;
                img.height = 50;
                img.alt = item.name;

                const textDiv = document.createElement('div');
                textDiv.className = 'badge-text';
                textDiv.dataset.achievementFixed = 'true';

                const userUrl = mw.util.getUrl(`User:${item.user}`);
                const safeUser = mw.html.escape(item.user);
                const safeBadge = mw.html.escape(item.name);
                const safeDesc = mw.html.escape(item.description);
                const safeTime = mw.html.escape(formatTimeAgo(item.timestamp));

                textDiv.innerHTML = `<a href="${userUrl}">${safeUser}</a> заработал значок <strong>${safeBadge}</strong><br />${safeDesc}<br /> &bull; ${safeTime}`;

                li.append(img, textDiv);
                fragment.appendChild(li);
            }

            railList.prepend(fragment);
        }
    };

    // 5. ВИЗУАЛЬНЫЙ МЕНЕДЖЕР ТРЕКОВ НА SPECIAL:ACHIEVEMENTSCUSTOMIZE
    const renderCustomizePage = async (db) => {
        const container = document.querySelector('.article-sidebar, #achievements-customize, #mw-content-text');
        if (!container || document.getElementById('custom-achievements-manager')) return;

        const uGroups = new Set(mw.config.get('wgUserGroups') ?? []);
        const isAdmin = !uGroups.isDisjointFrom(new Set(['sysop', 'bureaucrat', 'staff', 'soap']));
        if (!isAdmin) return;

        let currentConfig = {
            thresholds: db?.thresholds ?? DEFAULT_THRESHOLDS,
            points: db?.points ?? DEFAULT_POINTS,
            tracks: db?.tracks ?? [],
            special_badges: db?.special_badges ?? []
        };

        try {
            const rawRes = await fetch(`${mw.util.wikiScript()}?title=${encodeURIComponent(CONFIG_PAGE)}&action=raw&ctype=application/json`);
            if (rawRes.ok) {
                const remoteCfg = await rawRes.json();
                if (remoteCfg && typeof remoteCfg === 'object') {
                    currentConfig = { ...currentConfig, ...remoteCfg };
                }
            }
        } catch {}

        const panel = document.createElement('div');
        panel.id = 'custom-achievements-manager';
        panel.style.cssText = 'background:var(--theme-page-background-color--secondary);border:1px solid var(--theme-border-color);border-radius:8px;padding:18px;margin:18px 0;';

        const renderPanelContent = () => {
            const tracksHtml = currentConfig.tracks.map((t, idx) => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--theme-page-background-color);border:1px solid var(--theme-border-color);border-radius:6px;margin-bottom:8px;">
                    <div>
                        <strong>${mw.html.escape(t.title || t.id)}</strong>
                        <span style="color:var(--theme-page-text-color--secondary);font-size:0.85rem;margin-left:8px;">(Категория:${mw.html.escape(t.category)})</span>
                    </div>
                    <button type="button" class="wds-button wds-is-secondary wds-is-squished" data-delete-track="${idx}">Удалить</button>
                </div>
            `).join('') || '<em>Кастомные треки ещё не добавлены.</em>';

            panel.innerHTML = `
                <h2 style="margin-top:0;"><i class="fa-solid fa-trophy"></i> Кастомные треки достижений (CustomAchievements)</h2>
                <p style="font-size:0.9rem;color:var(--theme-page-text-color--secondary);">
                    Конфигурация сохраняется в <code>${CONFIG_PAGE}</code> и автоматически обсчитывается ботом для всех участников вики.
                </p>
                <div style="margin:12px 0;">${tracksHtml}</div>
                <hr style="border:none;border-top:1px solid var(--theme-border-color);margin:14px 0;" />
                <h3 style="margin-top:0;">Добавить новый трек категории</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:12px;">
                    <input id="ca-track-id" type="text" placeholder="ID трека (например: locations)" style="padding:7px;border:1px solid var(--theme-border-color);border-radius:4px;background:var(--theme-page-background-color);color:var(--theme-page-text-color);" />
                    <input id="ca-track-cat" type="text" placeholder="Категория (например: Локации)" style="padding:7px;border:1px solid var(--theme-border-color);border-radius:4px;background:var(--theme-page-background-color);color:var(--theme-page-text-color);" />
                    <input id="ca-track-title" type="text" placeholder="Название трека (например: Исследователь)" style="padding:7px;border:1px solid var(--theme-border-color);border-radius:4px;background:var(--theme-page-background-color);color:var(--theme-page-text-color);" />
                    <input id="ca-track-icon" type="text" placeholder="PNG-файл иконки (Badge-Loc.png)" style="padding:7px;border:1px solid var(--theme-border-color);border-radius:4px;background:var(--theme-page-background-color);color:var(--theme-page-text-color);" />
                </div>
                <div style="display:flex;gap:10px;">
                    <button type="button" id="ca-add-btn" class="wds-button wds-is-secondary">Добавить в список</button>
                    <button type="button" id="ca-save-btn" class="wds-button">Сохранить конфиг на Вики</button>
                </div>
            `;

            panel.querySelectorAll('[data-delete-track]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.deleteTrack, 10);
                    currentConfig.tracks.splice(idx, 1);
                    renderPanelContent();
                });
            });

            panel.querySelector('#ca-add-btn')?.addEventListener('click', () => {
                const id = panel.querySelector('#ca-track-id').value.trim();
                const category = panel.querySelector('#ca-track-cat').value.trim().replace(/^(?:Категория|Category)\s*:\s*/i, '');
                const title = panel.querySelector('#ca-track-title').value.trim();
                const defaultIcon = panel.querySelector('#ca-track-icon').value.trim() || 'Badge-Default.png';

                if (!id || !category || !title) {
                    mw.notify('Заполните ID, категорию и название трека!', { type: 'warn' });
                    return;
                }

                currentConfig.tracks.push({
                    id,
                    category,
                    title,
                    description: `За внесение правок в статьи категории «${category}»`,
                    default_icon: defaultIcon,
                    levels: currentConfig.thresholds.map((_, i) => ({
                        name: `${title} — Уровень ${i + 1}`,
                        icon: defaultIcon
                    }))
                });
                renderPanelContent();
            });

            panel.querySelector('#ca-save-btn')?.addEventListener('click', async () => {
                const saveBtn = panel.querySelector('#ca-save-btn');
                saveBtn.disabled = true;
                saveBtn.textContent = 'Сохранение...';
                try {
                    const api = new mw.Api();
                    await api.postWithToken('csrf', {
                        action: 'edit',
                        title: CONFIG_PAGE,
                        text: JSON.stringify(currentConfig, null, 2),
                        summary: 'Обновление конфигурации кастомных треков достижений',
                        formatversion: 2
                    });
                    mw.notify(`Конфигурация сохранена в ${CONFIG_PAGE}!`, { type: 'success' });
                } catch (err) {
                    mw.notify(`Ошибка сохранения: ${err.info || err}`, { type: 'error' });
                } finally {
                    saveBtn.disabled = false;
                    saveBtn.textContent = 'Сохранить конфиг на Вики';
                }
            });
        };

        renderPanelContent();
        container.prepend(panel);
    };

    // ИНИЦИАЛИЗАЦИЯ ПО ТЕКУЩЕЙ СТРАНИЦЕ
    const specialPage = mw.config.get('wgCanonicalSpecialPageName');
    const ns = mw.config.get('wgNamespaceNumber');
    const db = await fetchAchievementsData();

    if (specialPage === 'AchievementsCustomize') {
        await renderCustomizePage(db);
    } else if (specialPage === 'Leaderboard' && db) {
        renderLeaderboard(db);
    } else if (ns === 2 && db) {
        await renderUserProfile(db);
    }
})();