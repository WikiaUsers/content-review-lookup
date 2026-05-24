/**
 * Скрипт массового патрулирования
 * Поддерживает текст (revid), журналы (rcid) и файлы без ID в HTML (резолв через API).
 * ES6 Strict + Chunking Promise.
 */
(() => {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Recentchanges') return;

    if (window.isAutoPatrolLoaded) return;
    window.isAutoPatrolLoaded = true;

    mw.loader.using(['mediawiki.api']).then(() => {
        const patrolBtn = document.createElement('button');
        patrolBtn.className = 'wds-button wds-is-secondary';
        patrolBtn.style.margin = '10px 0';
        patrolBtn.textContent = 'Отпатрулировать всё на странице';

        const rcOptions = document.querySelector('.rcoptions');
        if (rcOptions) {
            rcOptions.appendChild(patrolBtn);
        } else {
            document.getElementById('mw-content-text').prepend(patrolBtn);
        }

        patrolBtn.addEventListener('click', () => {
            const unpatrolledMarkers = document.querySelectorAll('.unpatrolled');
            const domItems = []; // Собираем всё, что видим
            
            unpatrolledMarkers.forEach(marker => {
                const row = marker.closest('li, tr');
                if (!row) return;

                const revId = row.dataset.mwRevid;
                const rcId = row.dataset.mwRcid;
                const logId = row.dataset.mwLogid;
                
                // На всякий случай берем заголовок, чтобы сопоставить файлы без логов
                const titleEl = row.querySelector('.mw-changeslist-title');
                const title = titleEl ? titleEl.textContent.trim() : null;

                if (revId) domItems.push({ type: 'revid', id: revId, marker, title });
                else if (rcId) domItems.push({ type: 'rcid', id: rcId, marker, title });
                else if (logId || title) domItems.push({ type: 'needs_api', id: logId, marker, title });
            });

            if (domItems.length === 0) {
                alert('На этой странице нет правок или файлов, ожидающих патрулирования.');
                return;
            }

            if (!confirm(`Найдено действий для патрулирования: ${domItems.length}. Начать процесс?`)) return;

            patrolBtn.disabled = true;
            patrolBtn.classList.remove('wds-is-secondary');
            
            const api = new mw.Api();
            
            // Если есть файлы/логи без ID, просим API раскрыть их настоящие rcid
            const needsApiResolution = domItems.some(item => item.type === 'needs_api');
            let fetchPromise = Promise.resolve([]);

            if (needsApiResolution) {
                patrolBtn.textContent = 'Сбор скрытых ID файлов...';
                fetchPromise = api.get({
                    action: 'query',
                    list: 'recentchanges',
                    rcshow: '!patrolled',
                    rcprop: 'ids|title|loginfo', // Запрашиваем ID, заголовки и данные логов
                    rclimit: 'max'
                }).then(data => data.query.recentchanges || []);
            }

            fetchPromise.then(rcData => {
                const targets = new Map(); 
                const markerMap = new Map(); 

                // Сопоставляем то, что нашли в HTML, с тем, что отдало API
                domItems.forEach(item => {
                    let targetId = null;
                    let idType = null;

                    if (item.type === 'revid' || item.type === 'rcid') {
                        targetId = item.id;
                        idType = item.type;
                    } else if (item.type === 'needs_api') {
                        // Ищем совпадение по logid ИЛИ по названию файла
                        const match = rcData.find(rc => 
                            (item.id && String(rc.logid) === String(item.id)) || 
                            (item.title && rc.title === item.title)
                        );
                        if (match && match.rcid) {
                            targetId = match.rcid;
                            idType = 'rcid';
                        }
                    }

                    if (targetId) {
                        targets.set(targetId, idType);
                        if (!markerMap.has(targetId)) markerMap.set(targetId, []);
                        markerMap.get(targetId).push(item.marker);
                    }
                });

                if (targets.size === 0) {
                    patrolBtn.textContent = 'Ошибка: не удалось извлечь ID.';
                    patrolBtn.classList.add('wds-is-secondary');
                    setTimeout(() => { patrolBtn.disabled = false; }, 2000);
                    return;
                }

                // Логика патрулирования пачками (чанками)
                let successCount = 0;
                let errorCount = 0;
                let processedCount = 0;

                const targetEntries = Array.from(targets.entries());
                const CHUNK_SIZE = 4; 
                const DELAY_BETWEEN_CHUNKS = 250;

                const chunkArray = (arr, size) => 
                    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
                        arr.slice(i * size, i * size + size)
                    );

                const chunks = chunkArray(targetEntries, CHUNK_SIZE);

                chunks.reduce((promiseChain, chunk) => {
                    return promiseChain.then(() => {
                        patrolBtn.textContent = `Патрулирование... (${processedCount}/${targets.size})`;

                        const chunkPromises = chunk.map(([targetId, idType]) => {
                            const apiParams = { action: 'patrol' };
                            apiParams[idType] = targetId;

                            return api.postWithToken('patrol', apiParams).then(() => {
                                markerMap.get(targetId).forEach(m => {
                                    m.style.transition = 'opacity 0.3s';
                                    m.style.opacity = '0';
                                    setTimeout(() => m.remove(), 300);
                                });
                                successCount++;
                            }).catch(error => {
                                console.warn(`Не удалось отпатрулировать (${idType}: ${targetId}):`, error);
                                errorCount++;
                            });
                        });

                        return Promise.all(chunkPromises).then(() => {
                            processedCount += chunk.length;
                            return new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CHUNKS));
                        });
                    });
                }, Promise.resolve())
                
                .then(() => {
                    patrolBtn.textContent = `Готово! Успешно: ${successCount}` + (errorCount > 0 ? `, Ошибок: ${errorCount}` : '');
                    patrolBtn.classList.add('wds-is-secondary');
                    
                    setTimeout(() => {
                        patrolBtn.disabled = false;
                        patrolBtn.textContent = 'Отпатрулировать всё на странице';
                    }, 3000);
                });
            });
        });
    });
})();