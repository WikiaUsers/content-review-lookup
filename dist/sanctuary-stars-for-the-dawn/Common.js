/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    console.log('CopytxtScript loaded - v1.5.20');

    const BUTTON_SELECTOR = '.copy-to-clipboard-button';
    const PREVIEW_CONTAINER_SELECTOR = '.oo-ui-window-content-setup';
    const ALLOWED_NAMESPACES = ['User', 'Data'];
    const BATCH_SIZE = 5;
    const BATCH_DELAY = 100;
    const MAX_CACHE_SIZE = 1024 * 1024; // 1 МБ
    const cacheKeys = [];

    function fetchJsonFromWiki(pageName, variableName) {
        return new Promise((resolve, reject) => {
            if (!pageName.match(/^(User:|Data:)/)) {
                reject(new Error(`Invalid namespace: ${pageName}`));
                return;
            }
            const cacheKey = `${pageName}:${variableName}`;
            if (sessionStorage.getItem(cacheKey)) {
                console.log(`Cache hit: ${cacheKey}`);
                resolve(sessionStorage.getItem(cacheKey));
                return;
            }
            $.ajax({
                url: `/api.php?action=query&prop=revisions&titles=${encodeURIComponent(pageName)}&rvprop=content&format=json`,
                dataType: 'json',
                cache: false
            }).then(data => {
                const pageId = Object.keys(data.query.pages)[0];
                if (pageId === '-1') throw new Error(`Page not found: ${pageName}`);
                const wikitext = data.query.pages[pageId].revisions[0]['*'].replace(/<(?:pre|syntaxhighlight)[^>]*>|<\/(?:pre|syntaxhighlight)>/g, '').trim();
                if (!wikitext) throw new Error(`No content: ${pageName}`);
                const json = JSON.parse(wikitext);
                if (!json[variableName] || !json[variableName].match(/^[A-Za-z0-9+/=]+$/)) {
                    throw new Error(`Invalid or missing Base64 for ${variableName}`);
                }
                if (json[variableName].length > MAX_CACHE_SIZE) {
                    console.warn(`Skipping cache for ${cacheKey}: size ${json[variableName].length} exceeds ${MAX_CACHE_SIZE}`);
                    resolve(json[variableName]);
                } else {
                    try {
                        sessionStorage.setItem(cacheKey, json[variableName]);
                        cacheKeys.push(cacheKey);
                        console.log(`Cached: ${cacheKey} (${json[variableName].length} chars)`);
                        resolve(json[variableName]);
                    } catch (e) {
                        console.warn(`Cache failed for ${cacheKey}: ${e.message}`);
                        resolve(json[variableName]);
                    }
                }
            }).fail(error => reject(new Error(`API error: ${error.statusText || 'Unknown'} (${error.status})`)));
        });
    }

    function copyText(text, button) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    console.log(`Copied via Clipboard API: ${text.substring(0, 50)}...`);
                    resolve();
                }).catch(reject);
            } else {
                console.log('Using document.execCommand');
                const textarea = $('<textarea>').val(text).appendTo('body').select();
                const success = document.execCommand('copy');
                textarea.remove();
                if (success) resolve();
                else reject(new Error('Copy failed'));
            }
        });
    }

    function handleButtonState(button, success, errorMsg) {
        button.classList.add(success ? 'success' : 'error');
        console[success ? 'log' : 'error'](`${success ? 'Copied' : 'Failed'}: ${errorMsg || button.dataset.content || button.dataset.pre || `${button.dataset.jsonpage}|${button.dataset.jsonvar}`}`);
        setTimeout(() => button.classList.remove(success ? 'success' : 'error'), 2000);
    }

    function initializeButton(button) {
        if (button.dataset.initialized) return;
        const jsonPage = button.dataset.jsonpage || '';
        const jsonVar = button.dataset.jsonvar || '';
        const preId = button.dataset.pre || '';
        const content = button.dataset.content || '';
        console.log(`Init: ${jsonPage && jsonVar ? `json=${jsonPage}|${jsonVar}` : preId ? `pre=${preId}` : `content=${content.substring(0, 50)}...`}`);

        if (jsonPage && jsonVar) {
            fetchJsonFromWiki(jsonPage, jsonVar).catch(error => console.error(`Pre-cache failed: ${error.message}`));
        }

        button.addEventListener('click', function(event) {
            event.preventDefault();
            if (!navigator.clipboard && !document.execCommand) {
                handleButtonState(button, false, 'No clipboard support');
                return;
            }

            if (jsonPage && jsonVar) {
                fetchJsonFromWiki(jsonPage, jsonVar)
                    .then(base64 => copyText(decodeURIComponent(atob(base64)), button))
                    .then(() => handleButtonState(button, true, `JSON: ${jsonPage}|${jsonVar}`))
                    .catch(error => handleButtonState(button, false, `JSON error: ${error.message}`));
            } else if (preId) {
                const preElement = document.getElementById(preId);
                if (!preElement) {
                    handleButtonState(button, false, `No <pre> with id=${preId}`);
                    return;
                }
                copyText(preElement.textContent, button)
                    .then(() => handleButtonState(button, true, `<pre id=${preId}>`))
                    .catch(error => handleButtonState(button, false, `Pre error: ${error.message}`));
            } else if (content) {
                copyText(content, button)
                    .then(() => handleButtonState(button, true, `Content: ${content.substring(0, 50)}...`))
                    .catch(error => handleButtonState(button, false, `Content error: ${error.message}`));
            } else {
                handleButtonState(button, false, 'No valid data source');
            }
        });

        button.dataset.initialized = 'true';
    }

    function processButtonsWithRateLimit() {
        const buttons = document.querySelectorAll(BUTTON_SELECTOR);
        console.log(`Found ${buttons.length} buttons to initialize`);
        let index = 0;
        function processNext() {
            if (index >= buttons.length) {
                console.log('Button scan complete');
                return;
            }
            initializeButton(buttons[index]);
            index++;
            setTimeout(processNext, BATCH_DELAY);
        }
        const concurrent = Math.min(buttons.length, BATCH_SIZE);
        for (let i = 0; i < concurrent; i++) {
            processNext();
        }
    }

    if (!window.location.href.includes('action=edit')) {
        processButtonsWithRateLimit();
    }

    document.addEventListener('animationstart', function(e) {
        if (e.target.classList.contains('copy-to-clipboard-button')) {
            const previewContainer = document.querySelector(PREVIEW_CONTAINER_SELECTOR);
            if (previewContainer && previewContainer.contains(e.target)) {
                console.log(`Detected in preview: ${e.target.dataset.jsonpage && e.target.dataset.jsonvar ? `${e.target.dataset.jsonpage}|${e.target.dataset.jsonvar}` : e.target.dataset.pre || e.target.dataset.content}`);
                initializeButton(e.target);
            }
        }
    });

    window.addEventListener('unload', function() {
        cacheKeys.forEach(key => sessionStorage.removeItem(key));
        console.log('Cache cleared');
    });
// ==================== СЛАЙД-ШОУ УВЕДОМЛЕНИЙ (финальная версия) ====================
mw.hook('wikipage.content').add(function () {
    const notices = document.querySelectorAll('.mbox.notice');
    if (notices.length < 2) return; // Если меньше двух — ничего не делаем
    // Создаём контейнер слайд-шоу
    const slideshow = document.createElement('div');
    slideshow.className = 'notices-slideshow';
    // Футер с навигацией
    const footer = document.createElement('div');
    footer.className = 'slideshow-footer';
    footer.innerHTML = `
        <div class="slideshow-nav">
            <span class="slideshow-prev">◄</span>
            <span class="slideshow-pause" title="Пауза">❚❚</span>
            <div class="slideshow-dots"></div>
            <span class="slideshow-next">►</span>
        </div>
    `;
    // Прогресс-бар
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.innerHTML = '<div class="progress-bar"></div>';
    const dotsContainer = footer.querySelector('.slideshow-dots');
    const progressBar = progressContainer.querySelector('.progress-bar');
    let current = 0;
    let timer = null;
    let isPaused = false;
    // Создаём слайды и точки
    notices.forEach((notice, i) => {
        const slide = document.createElement('div');
        slide.className = 'notice-slide';
        if (i === 0) slide.classList.add('active'); // Первый сразу активный
        slide.innerHTML = notice.innerHTML; // Копируем содержимое (текст, заголовок, крестик и т.д.)
        slideshow.appendChild(slide);
        // Точка-индикатор
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    });
    // Добавляем футер и прогресс-бар в контейнер
    slideshow.appendChild(footer);
    slideshow.appendChild(progressContainer);
    // Вставляем слайд-шоу перед первым уведомлением
    notices[0].parentNode.insertBefore(slideshow, notices[0]);
    // Скрываем оригинальные уведомления
    notices.forEach(n => n.style.display = 'none');
    // Получаем элементы для управления
    const slides = slideshow.querySelectorAll('.notice-slide');
    const dots = slideshow.querySelectorAll('.dot');
    const prev = slideshow.querySelector('.slideshow-prev');
    const next = slideshow.querySelector('.slideshow-next');
    const pauseBtn = slideshow.querySelector('.slideshow-pause');
    // Сброс и запуск прогресс-бара
    function resetProgress() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        void progressBar.offsetWidth; // Форсируем reflow
        if (!isPaused) {
            progressBar.style.transition = 'width 5s linear';
            progressBar.style.width = '100%';
        }
    }
    // Показ слайда с плавной анимацией
    function showSlide(n) {
        current = (n + slides.length) % slides.length;
        // Убираем active у всех
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        // Добавляем с небольшой задержкой для триггера transition opacity
        requestAnimationFrame(() => {
            slides[current].classList.add('active');
            dots[current].classList.add('active');
            if (!isPaused) resetProgress();
        });
    }
    // Автопрокрутка
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => showSlide(current + 1), 5000);
        resetProgress();
    }
    function stopTimer() {
        clearInterval(timer);
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        isPaused = true;
        pauseBtn.textContent = '▶';
        pauseBtn.title = 'Воспроизвести';
    }
    function resumeTimer() {
        isPaused = false;
        pauseBtn.textContent = '❚❚';
        pauseBtn.title = 'Пауза';
        startTimer();
    }
    // Обработчики событий
    pauseBtn.addEventListener('click', () => {
        if (isPaused) resumeTimer();
        else stopTimer();
    });
    prev.addEventListener('click', () => {
        showSlide(current - 1);
        if (!isPaused) startTimer();
    });
    next.addEventListener('click', () => {
        showSlide(current + 1);
        if (!isPaused) startTimer();
    });
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.dataset.index));
            if (!isPaused) startTimer();
        });
    });
    // Запуск
    resetProgress();
    startTimer();
});
// ==============================================================================
});