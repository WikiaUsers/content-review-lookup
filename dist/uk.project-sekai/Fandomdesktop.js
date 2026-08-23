/* Автоматичне створення перемикача займенників Мізукі */
(function() {
    function initMizukiSwitchers() {
        document.querySelectorAll('.mizuki-pronoun-box:not(.initialized)').forEach(function(container) {
            container.classList.add('initialized');
            var ep = container.getAttribute('data-ep');
            
            container.innerHTML = 
                '<span style="margin-left: 10px; font-size: 0.9em;">' +
                    '<span style="font-weight: bold; margin-right: 5px;">Займенники Мізукі:</span>' +
                    '<select class="mizuki-select">' +
                        '<option value="m">він/його</option>' +
                        '<option value="f">вона/її</option>' +
                        '<option value="nb">вони/їх</option>' +
                    '</select>' +
                '</span>';

            var select = container.querySelector('.mizuki-select');
            
            // Відновлення вибору з пам'яті браузера
            var saved = localStorage.getItem('mizuki_pronoun') || 'm';
            select.value = saved;
            applyPronoun(saved);

            select.addEventListener('change', function() {
                var val = this.value;
                localStorage.setItem('mizuki_pronoun', val);
                // Оновлюємо значення у всіх випадаючих списках на сторінці
                document.querySelectorAll('.mizuki-select').forEach(function(s) { s.value = val; });
                applyPronoun(val);
            });
        });
    }

    function applyPronoun(val) {
        document.body.setAttribute('data-mizuki-pronoun', val);
    }

    // Запуск при завантаженні та при кліках по табберу
    $(document).ready(initMizukiSwitchers);
    mw.hook('wikipage.content').add(initMizukiSwitchers);
    document.addEventListener('click', function(e) {
        if (e.target.closest('.wds-tabs__tab, .tabbernav li')) {
            setTimeout(initMizukiSwitchers, 100);
        }
    });
})();