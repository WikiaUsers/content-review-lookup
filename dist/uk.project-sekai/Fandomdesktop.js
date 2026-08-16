/* Перемикач займенників Мізукі (універсальний для вкладок/табберів) */
(function() {
    function initMizukiPronouns() {
        // Шукаємо за ID або класом
        var containers = document.querySelectorAll('#mizuki-pronoun-selector, .mizuki-pronoun-selector');
        if (!containers.length) return;

        var savedPronoun = localStorage.getItem('mizuki_pronouns') || 'm';

        function updatePronouns(val) {
            localStorage.setItem('mizuki_pronouns', val);
            var wrappers = document.querySelectorAll('.mizuki-pronoun-wrapper');
            wrappers.forEach(function(wrapper) {
                var m = wrapper.querySelectorAll('.mp-m');
                var f = wrapper.querySelectorAll('.mp-f');
                var nb = wrapper.querySelectorAll('.mp-nb');

                m.forEach(function(el) { el.style.display = (val === 'm' ? 'inline' : 'none'); });
                f.forEach(function(el) { el.style.display = (val === 'f' ? 'inline' : 'none'); });
                nb.forEach(function(el) { el.style.display = (val === 'nb' ? 'inline' : 'none'); });
            });
        }

        // Оновлюємо текст займенників
        updatePronouns(savedPronoun);

        // Обробляємо кожен знайдений контейнер (у всіх вкладках)
        containers.forEach(function(container) {
            if (!container.querySelector('select.mizuki-select')) {
                container.innerHTML = '<span style="font-weight: bold;">Займенники Мізукі:</span> ' +
                    '<select class="mizuki-select" style="margin-left: 8px; padding: 2px 6px; border-radius: 6px; border: 1px solid var(--theme-border-color, #ccc); background: var(--theme-page-background-color, #fff); color: var(--theme-page-text-color, #000); cursor: pointer;">' +
                        '<option value="m">Чоловічі (він/його)</option>' +
                        '<option value="f">Жіночі (вона/її)</option>' +
                        '<option value="nb">Небінарні (вони/їх)</option>' +
                    '</select>';

                var select = container.querySelector('select.mizuki-select');
                select.value = savedPronoun;

                select.addEventListener('change', function() {
                    updatePronouns(this.value);
                    // Синхронізуємо значення інших селекторів, якщо їх декілька
                    document.querySelectorAll('select.mizuki-select').forEach(function(s) {
                        s.value = select.value;
                    });
                });
            }
        });
    }

    // Періодична перевірка для табберів
    var interval = setInterval(initMizukiPronouns, 500);
    setTimeout(function() { clearInterval(interval); }, 10000); // зупиняємо таймер через 10 сек

    // Запуск через MutationObserver
    var observer = new MutationObserver(initMizukiPronouns);
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    initMizukiPronouns();
})();