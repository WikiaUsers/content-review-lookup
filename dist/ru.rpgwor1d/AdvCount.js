
;(function () {
    console.log("Fandom wiki page loaded!");

    // Функция для получения URL страницы, отличающейся на одну цифру в конце
    function getAlternativeURL() {
        const currentURL = window.location.href;

            return currentURL.replace("wiki/", "wiki/Шаблон:");
    }

    // Функция для подсчета div элементов на странице
    function countDivs(documentToSearch) {
        const divs = documentToSearch.querySelectorAll('div');
        var count_a = 0;
        var count_b = 0;
        var count_c = 0;
        var count_d = 0;
        var count_e = 0;
        var count_f = 0;
        var count_g = 0;
        var count_h = 0;
        var count_i = 0;

        for (var i = 0; i < divs.length; i++) {
            const div = divs[i];
            if (div.id && div.id.includes('quality-A')) {
                count_a++;
            }
            if (div.id && div.id.includes('quality-B')) {
                count_b++;
            }
            if (div.id && div.id.includes('quality-C')) {
                count_c++;
            }
            if (div.id && div.id.includes('quality-D')) {
                count_d++;
            }
            if (div.id && div.id.includes('quality-E')) {
                count_e++;
            }
            if (div.id && div.id.includes('quality-F')) {
                count_f++;
            }
            if (div.id && div.id.includes('quality-G')) {
                count_g++;
            }
            if (div.id && div.id.includes('quality-H')) {
                count_h++;
            }
            if (div.id && div.id.includes('quality-I')) {
                count_i++;
            }
        }

        return {
            count_a: count_a,
            count_b: count_b,
            count_c: count_c,
            count_d: count_d,
            count_e: count_e,
            count_f: count_f,
            count_g: count_g,
            count_h: count_h,
            count_i: count_i
        };
    }

    // Получаем данные с текущей страницы
    const currentCounts = countDivs(document);

    // Получаем URL альтернативной страницы
    const alternativeURL = getAlternativeURL();

    // Загружаем альтернативную страницу и получаем данные
    fetch(alternativeURL)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const alternativeDoc = parser.parseFromString(html, 'text/html');
            const alternativeCounts = countDivs(alternativeDoc);

            // Объединяем результаты
            const total_count_a = currentCounts.count_a + alternativeCounts.count_a;
            const total_count_b = currentCounts.count_b + alternativeCounts.count_b;
            const total_count_c = currentCounts.count_c + alternativeCounts.count_c;
            const total_count_d = currentCounts.count_d + alternativeCounts.count_d;
            const total_count_e = currentCounts.count_e + alternativeCounts.count_e;
            const total_count_f = currentCounts.count_f + alternativeCounts.count_f;
            const total_count_g = currentCounts.count_g + alternativeCounts.count_g;
            const total_count_h = currentCounts.count_h + alternativeCounts.count_h;
            const total_count_i = currentCounts.count_i + alternativeCounts.count_i;

            // Обновляем отображение на странице
            const a_div = document.getElementById("A-qount");
            const b_div = document.getElementById("B-qount");
            const c_div = document.getElementById("C-qount");
            const d_div = document.getElementById("D-qount");
            const e_div = document.getElementById("E-qount");
            const f_div = document.getElementById("F-qount");
            const g_div = document.getElementById("G-qount");
            const h_div = document.getElementById("H-qount");
            const i_div = document.getElementById("I-qount");
            const total_div = document.getElementById("qount");

            if (a_div) {
                a_div.textContent = total_count_a;
            }
            if (b_div) {
                b_div.textContent = total_count_b;
            }
            if (c_div) {
                c_div.textContent = total_count_c;
            }
            if (d_div) {
                d_div.textContent = total_count_d;
            }
            if (e_div) {
                e_div.textContent = total_count_e;
            }
            if (f_div) {
                f_div.textContent = total_count_f;
            }
            if (g_div) {
                g_div.textContent = total_count_g;
            }
            if (h_div) {
                h_div.textContent = total_count_h;
            }
            if (i_div) {
                i_div.textContent = total_count_i;
            }
            if (total_div) {
                total_div.textContent = total_count_i + total_count_h + total_count_g + total_count_f + total_count_e + total_count_d + total_count_c + total_count_b + total_count_a;
            }

            // Скрываем элементы, если их количество равно 0
            if (total_count_a === 0) {
                const a_display_elements = document.querySelectorAll("#A-display");
                a_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_b === 0) {
                const b_display_elements = document.querySelectorAll("#B-display");
                b_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_c === 0) {
                const c_display_elements = document.querySelectorAll("#C-display");
                c_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_d === 0) {
                const d_display_elements = document.querySelectorAll("#D-display");
                d_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_e === 0) {
                const e_display_elements = document.querySelectorAll("#E-display");
                e_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_f === 0) {
                const f_display_elements = document.querySelectorAll("#F-display");
                f_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_g === 0) {
                const g_display_elements = document.querySelectorAll("#G-display");
                g_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_h === 0) {
                const h_display_elements = document.querySelectorAll("#H-display");
                h_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }
            if (total_count_i === 0) {
                const i_display_elements = document.querySelectorAll("#I-display");
                i_display_elements.forEach(element => {
                    element.style.display = "none";
                });
            }


        })
        .catch(error => {
            console.error('Error fetching the alternative page:', error);
        });
}());