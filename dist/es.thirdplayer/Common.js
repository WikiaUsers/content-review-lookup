/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

/* =========================================================
   INSTRUMENTO DE EVALUACIÓN DEL DESEMPEÑO DOCENTE
   Sistema interactivo
   ========================================================= */

(function () {
    'use strict';

    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    var OPTION_DATA = [
        { className: 'eval-choice-siempre', label: 'Siempre' },
        { className: 'eval-choice-casi', label: 'Casi siempre' },
        { className: 'eval-choice-aveces', label: 'A veces' },
        { className: 'eval-choice-nunca', label: 'Nunca' }
    ];

    /* =====================================================
       INICIALIZACIÓN GENERAL
       ===================================================== */

    function initEvaluation(root) {
        root = root || document;

        var pages = [];

        if (
            root.classList &&
            root.classList.contains('docente-eval-page')
        ) {
            pages.push(root);
        }

        if (root.querySelectorAll) {
            var foundPages = root.querySelectorAll('.docente-eval-page');

            Array.prototype.forEach.call(foundPages, function (page) {
                pages.push(page);
            });
        }

        pages.forEach(function (page) {
            if (page.getAttribute('data-eval-initialized') === 'true') {
                return;
            }

            page.setAttribute('data-eval-initialized', 'true');
            page.classList.add('is-interactive');

            setupChoices(page);
            setupEditableFields(page);
            createControlPanel(page);
            updateProgress(page);
        });
    }

    /* =====================================================
       OPCIONES DE FRECUENCIA
       ===================================================== */

    function setupChoices(page) {
        var indicators = page.querySelectorAll('.eval-indicator');

        Array.prototype.forEach.call(indicators, function (indicator, indicatorIndex) {
            var options = indicator.querySelectorAll('.eval-choice');
            var indicatorText = indicator.querySelector('.eval-indicator-text');

            indicator.setAttribute('role', 'radiogroup');
            indicator.setAttribute('data-indicator-number', String(indicatorIndex + 1));

            if (indicatorText) {
                indicator.setAttribute(
                    'aria-label',
                    indicatorText.textContent.trim()
                );
            }

            Array.prototype.forEach.call(options, function (choice, choiceIndex) {
                var optionInfo = getOptionInfo(choice, choiceIndex);

                choice.setAttribute('role', 'radio');
                choice.setAttribute('aria-checked', 'false');
                choice.setAttribute('tabindex', '0');
                choice.setAttribute('data-eval-value', optionInfo.label);
                choice.setAttribute('aria-label', optionInfo.label);

                choice.addEventListener('click', function () {
                    selectChoice(page, indicator, choice);
                });

                choice.addEventListener('keydown', function (event) {
                    var key = event.key;

                    if (key === 'Enter' || key === ' ') {
                        event.preventDefault();
                        selectChoice(page, indicator, choice);
                        return;
                    }

                    if (
                        key === 'ArrowRight' ||
                        key === 'ArrowDown' ||
                        key === 'ArrowLeft' ||
                        key === 'ArrowUp'
                    ) {
                        event.preventDefault();

                        var optionArray = Array.prototype.slice.call(options);
                        var currentIndex = optionArray.indexOf(choice);
                        var nextIndex;

                        if (key === 'ArrowRight' || key === 'ArrowDown') {
                            nextIndex = (currentIndex + 1) % optionArray.length;
                        } else {
                            nextIndex = (
                                currentIndex - 1 + optionArray.length
                            ) % optionArray.length;
                        }

                        var nextChoice = optionArray[nextIndex];

                        nextChoice.focus();
                        selectChoice(page, indicator, nextChoice);
                    }
                });
            });
        });
    }

    /* =====================================================
       IDENTIFICAR RESPUESTA
       ===================================================== */

    function getOptionInfo(choice, fallbackIndex) {
        var i;

        for (i = 0; i < OPTION_DATA.length; i++) {
            if (choice.classList.contains(OPTION_DATA[i].className)) {
                return OPTION_DATA[i];
            }
        }

        return OPTION_DATA[fallbackIndex] || {
            label: 'Opción'
        };
    }

    /* =====================================================
       SELECCIONAR RESPUESTA
       ===================================================== */

    function selectChoice(page, indicator, selectedChoice) {
        var options = indicator.querySelectorAll('.eval-choice');

        Array.prototype.forEach.call(options, function (choice) {
            choice.classList.remove('eval-selected');
            choice.setAttribute('aria-checked', 'false');
        });

        selectedChoice.classList.add('eval-selected');
        selectedChoice.setAttribute('aria-checked', 'true');

        indicator.classList.add('eval-answered');

        updateProgress(page);
    }

    /* =====================================================
       CAMPOS EDITABLES Y FECHA AUTOMÁTICA
       ===================================================== */

    function setupEditableFields(page) {
        var observationBox = page.querySelector('.eval-observation-box');

        if (observationBox) {
            makeEditable(
                observationBox,
                'Escriba aquí las observaciones generales...'
            );

            observationBox.setAttribute(
                'aria-label',
                'Observaciones generales'
            );
        }

        var fields = page.querySelectorAll('.eval-field');

        Array.prototype.forEach.call(fields, function (field) {
            var label = field.querySelector('.eval-field-label');
            var value = field.querySelector('.eval-field-value');

            if (!value) {
                return;
            }

            var labelText = label
                ? label.textContent.trim()
                : 'Campo';

            var normalizedLabel = labelText.toLowerCase();

            /*
             * FECHA AUTOMÁTICA
             */
            if (normalizedLabel.indexOf('fecha') !== -1) {
                setAutomaticDate(value);

                value.setAttribute(
                    'aria-label',
                    'Fecha de evaluación'
                );

                value.setAttribute(
                    'aria-readonly',
                    'true'
                );

                value.setAttribute(
                    'role',
                    'textbox'
                );

                value.classList.add(
                    'eval-date-automatic'
                );

                return;
            }

            /*
             * RESTO DE CAMPOS EDITABLES
             */
            makeEditable(
                value,
                getFieldPlaceholder(labelText)
            );

            value.setAttribute(
                'aria-label',
                labelText
            );
        });
    }

    /* =====================================================
       FECHA AUTOMÁTICA
       ===================================================== */

    function setAutomaticDate(element) {
        var today = new Date();

        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();

        day = day < 10
            ? '0' + day
            : String(day);

        month = month < 10
            ? '0' + month
            : String(month);

        element.textContent =
            day + '/' + month + '/' + year;

        element.removeAttribute(
            'contenteditable'
        );

        element.removeAttribute(
            'data-placeholder'
        );

        element.setAttribute(
            'data-automatic-date',
            'true'
        );

        element.setAttribute(
            'tabindex',
            '-1'
        );
    }

    /* =====================================================
       CONVERTIR ELEMENTO EN CAMPO EDITABLE
       ===================================================== */

    function makeEditable(element, placeholder) {
        element.setAttribute(
            'contenteditable',
            'true'
        );

        element.setAttribute(
            'role',
            'textbox'
        );

        element.setAttribute(
            'spellcheck',
            'true'
        );

        element.setAttribute(
            'data-placeholder',
            placeholder
        );

        /*
         * Pegar solo texto plano.
         */
        element.addEventListener(
            'paste',
            function (event) {
                event.preventDefault();

                var clipboard =
                    event.clipboardData ||
                    window.clipboardData;

                var text =
                    clipboard
                        ? clipboard.getData('text/plain')
                        : '';

                if (
                    document.queryCommandSupported &&
                    document.queryCommandSupported('insertText')
                ) {
                    document.execCommand(
                        'insertText',
                        false,
                        text
                    );

                    return;
                }

                var selection =
                    window.getSelection();

                if (
                    !selection ||
                    selection.rangeCount === 0
                ) {
                    element.textContent += text;
                    return;
                }

                var range =
                    selection.getRangeAt(0);

                range.deleteContents();

                range.insertNode(
                    document.createTextNode(text)
                );

                range.collapse(false);

                selection.removeAllRanges();
                selection.addRange(range);
            }
        );
    }

    /* =====================================================
       PLACEHOLDERS
       ===================================================== */

    function getFieldPlaceholder(label) {
        var normalized =
            label.toLowerCase();

        if (
            normalized.indexOf('docente') !== -1
        ) {
            return 'Escriba el nombre del docente';
        }

        if (
            normalized.indexOf('evaluador') !== -1
        ) {
            return 'Escriba el nombre del evaluador';
        }

        return 'Escriba aquí';
    }

    /* =====================================================
       PANEL DE CONTROL
       ===================================================== */

    function createControlPanel(page) {
        var competenciesTitle =
            page.querySelector(
                '.docente-eval-section-main'
            );

        if (!competenciesTitle) {
            return;
        }

        /*
         * Evita duplicar el panel.
         */
        if (
            page.querySelector('.eval-control-panel')
        ) {
            return;
        }

        var panel =
            document.createElement('div');

        panel.className =
            'eval-control-panel';

        /* -----------------------------------------
           PROGRESO
           ----------------------------------------- */

        var progressArea =
            document.createElement('div');

        progressArea.className =
            'eval-progress-area';

        var progressTop =
            document.createElement('div');

        progressTop.className =
            'eval-progress-top';

        var progressLabel =
            document.createElement('span');

        progressLabel.className =
            'eval-progress-label';

        progressLabel.textContent =
            'Progreso de la evaluación';

        var progressText =
            document.createElement('span');

        progressText.className =
            'eval-progress-text';

        progressText.setAttribute(
            'aria-live',
            'polite'
        );

        progressTop.appendChild(
            progressLabel
        );

        progressTop.appendChild(
            progressText
        );

        var progressTrack =
            document.createElement('div');

        progressTrack.className =
            'eval-progress-track';

        progressTrack.setAttribute(
            'role',
            'progressbar'
        );

        progressTrack.setAttribute(
            'aria-valuemin',
            '0'
        );

        var progressBar =
            document.createElement('div');

        progressBar.className =
            'eval-progress-bar';

        progressTrack.appendChild(
            progressBar
        );

        progressArea.appendChild(
            progressTop
        );

        progressArea.appendChild(
            progressTrack
        );

        /* -----------------------------------------
           ACCIONES
           ----------------------------------------- */

        var actions =
            document.createElement('div');

        actions.className =
            'eval-control-actions';

        /*
         * Botón imprimir
         */
        var printButton =
            document.createElement('button');

        printButton.type =
            'button';

        printButton.className =
            'eval-action-button eval-print-button';

        printButton.textContent =
            'Imprimir';

        printButton.addEventListener(
            'click',
            function () {
                window.print();
            }
        );

        /*
         * Botón limpiar
         */
        var clearButton =
            document.createElement('button');

        clearButton.type =
            'button';

        clearButton.className =
            'eval-action-button eval-clear-button';

        clearButton.textContent =
            'Limpiar evaluación';

        clearButton.addEventListener(
            'click',
            function () {
                var confirmed =
                    window.confirm(
                        '¿Deseas limpiar todas las respuestas, observaciones y datos escritos en esta evaluación?'
                    );

                if (!confirmed) {
                    return;
                }

                clearEvaluation(page);
            }
        );

        actions.appendChild(
            printButton
        );

        actions.appendChild(
            clearButton
        );

        panel.appendChild(
            progressArea
        );

        panel.appendChild(
            actions
        );

        competenciesTitle.insertAdjacentElement(
            'afterend',
            panel
        );
    }

    /* =====================================================
       ACTUALIZAR PROGRESO
       ===================================================== */

    function updateProgress(page) {
        var indicators =
            page.querySelectorAll(
                '.eval-indicator'
            );

        var total =
            indicators.length;

        var answered = 0;

        Array.prototype.forEach.call(
            indicators,
            function (indicator) {
                var selected =
                    indicator.querySelector(
                        '.eval-choice.eval-selected'
                    );

                if (selected) {
                    answered++;

                    indicator.classList.add(
                        'eval-answered'
                    );
                } else {
                    indicator.classList.remove(
                        'eval-answered'
                    );
                }
            }
        );

        var percentage =
            total > 0
                ? Math.round(
                    (answered / total) * 100
                )
                : 0;

        var text =
            page.querySelector(
                '.eval-progress-text'
            );

        if (text) {
            text.textContent =
                answered +
                ' de ' +
                total +
                ' indicadores';
        }

        var bar =
            page.querySelector(
                '.eval-progress-bar'
            );

        if (bar) {
            bar.style.width =
                percentage + '%';
        }

        var track =
            page.querySelector(
                '.eval-progress-track'
            );

        if (track) {
            track.setAttribute(
                'aria-valuemax',
                String(total)
            );

            track.setAttribute(
                'aria-valuenow',
                String(answered)
            );

            track.setAttribute(
                'aria-valuetext',
                answered +
                ' de ' +
                total +
                ' indicadores respondidos'
            );
        }

        if (
            total > 0 &&
            answered === total
        ) {
            page.classList.add(
                'eval-complete'
            );
        } else {
            page.classList.remove(
                'eval-complete'
            );
        }
    }

    /* =====================================================
       LIMPIAR EVALUACIÓN
       ===================================================== */

    function clearEvaluation(page) {
        var choices =
            page.querySelectorAll(
                '.eval-choice'
            );

        Array.prototype.forEach.call(
            choices,
            function (choice) {
                choice.classList.remove(
                    'eval-selected'
                );

                choice.setAttribute(
                    'aria-checked',
                    'false'
                );
            }
        );

        var indicators =
            page.querySelectorAll(
                '.eval-indicator'
            );

        Array.prototype.forEach.call(
            indicators,
            function (indicator) {
                indicator.classList.remove(
                    'eval-answered'
                );
            }
        );

        /*
         * Solo limpia los campos editables.
         * La fecha automática no tiene contenteditable,
         * por lo que permanece intacta.
         */
        var editableFields =
            page.querySelectorAll(
                '[contenteditable="true"]'
            );

        Array.prototype.forEach.call(
            editableFields,
            function (field) {
                field.textContent = '';
            }
        );

        /*
         * Recalcula la fecha por seguridad,
         * aunque normalmente seguirá siendo la misma.
         */
        var automaticDate =
            page.querySelector(
                '.eval-date-automatic'
            );

        if (automaticDate) {
            setAutomaticDate(
                automaticDate
            );
        }

        updateProgress(page);

        if (page.scrollIntoView) {
            page.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /* =====================================================
       MEDIAWIKI / FANDOM
       ===================================================== */

    function start() {
        initEvaluation(document);
    }

    if (
        typeof mw !== 'undefined' &&
        mw.hook
    ) {
        mw.hook(
            'wikipage.content'
        ).add(
            function ($content) {
                var root =
                    (
                        $content &&
                        $content[0]
                    )
                        ? $content[0]
                        : document;

                initEvaluation(root);
            }
        );

        /*
         * Respaldo por si el hook ya se ejecutó
         * antes de cargar este script.
         */
        if (
            document.readyState === 'loading'
        ) {
            document.addEventListener(
                'DOMContentLoaded',
                start
            );
        } else {
            start();
        }

    } else if (
        document.readyState === 'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            start
        );

    } else {
        start();
    }

})();