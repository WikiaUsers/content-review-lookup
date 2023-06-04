importArticles({
    articles: [
        'u:dev:MediaWiki:Modal.js',
        'u:dev:MediaWiki:Dorui.js',
        'u:dev:MediaWiki:CSS3Tooltip/code-2/demo.css'
    ]
});

mw.hook('dev.modal').add(function (modal) {
    const demoSection = document.querySelector('#Demo').parentElement;
    const modalToggleButton = document.createElement('button');

    modalToggleButton.classList.add('wds-button');

    const attrs = {
        'top': 'top-tip',
        'right': 'right-tip',
        'bottom': 'bottom-tip',
        'left': 'left-tip',
        'center': 'center-tip',
        'before': 'before-tip',
        'after': 'after-tip'
    }
    const strings = {
        'demoButton': 'Alternative tooltip demo',
        'demoTitle': 'Tooltip (alternative stylesheet) examples',
        'demoIntro': 'These are examples of the alternative Tooltip stylesheet, which supports up to 9 directions (up, down, left, right, all corners, and at the center of the tooltip trigger) along with logical positioning too (which varies depending on the page or trigger\'s direction).',
        'tooltipPosMenuLabel': 'Set tooltip position',
        'modalDirToggleButton': 'Toggle right-to-left',
        'modalDirToggleTooltip': 'Toggle between left-to-right and right-to-left directions to see how the \'before\' and \'after\' positioning works.',
        'demoTrigger': 'Hover/focus/tap me!',
        'mobileNote': 'When using the mobile view, tooltips will show after holding tap for 0.5 seconds.',
        'top': 'Top',
        'right': 'Right',
        'bottom': 'Bottom',
        'left': 'Left',
        'center': 'Center',
        'topLeft': 'Top-left',
        'topRight': 'Top-right',
        'bottomRight': 'Bottom-right',
        'bottomLeft': 'Bottom-left',
        'before': 'Before',
        'after': 'After'
    }
    const attrsList = [attrs.top, attrs.right, attrs.bottom, attrs.left, attrs.center, attrs.before, attrs.after];

    mw.hook('doru.ui').add(function (ui) {
        const demoButtonContainer = document.getElementById('demo-2-button-container');

        modalToggleButton.textContent = strings.demoButton;
        demoButtonContainer.append(modalToggleButton);

        var demoModal = new window.dev.modal.Modal({
            content: ui.div({
                class: 'demo-container-outer',
                children: [
                    ui.p({
                        text: strings.demoIntro
                    }),
                    ui.label({
                        attrs: {
                            'for': 'tooltip-pos-setter'
                        },
                        text: strings.tooltipPosMenuLabel
                    }),
                    ui.select({
                        attrs: {
                            'name': 'tooltip-pos-setter',
                            'id': 'tooltip-pos-setter'
                        },
                        children: [
                            ui.option({ attrs: { 'value': 'top' }, text: strings.top }),
                            ui.option({ attrs: { 'value': 'right' }, text: strings.right }),
                            ui.option({ attrs: { 'value': 'bottom', 'selected': '' }, text: strings.bottom }),
                            ui.option({ attrs: { 'value': 'left' }, text: strings.left }),
                            ui.option({ attrs: { 'value': 'center' }, text: strings.center }),
                            ui.option({ attrs: { 'value': 'top-left' }, text: strings.topLeft }),
                            ui.option({ attrs: { 'value': 'top-right' }, text: strings.topRight }),
                            ui.option({ attrs: { 'value': 'bottom-right' }, text: strings.bottomRight }),
                            ui.option({ attrs: { 'value': 'bottom-left' }, text: strings.bottomLeft }),
                            ui.option({ attrs: { 'value': 'before' }, text: strings.before }),
                            ui.option({ attrs: { 'value': 'after' }, text: strings.after })
                        ]
                    }),
                    ui.input({
                        type: 'checkbox',
                        props: {
                            checked: false,
                        },
                        class: 'wds-toggle__input',
                        id: 'demo-dir-toggle'
                    }),
                    ui.label({
                        attrs: {
                            'for': 'demo-dir-toggle'
                        },
                        class: 'wds-toggle__label',
                        text: strings.modalDirToggleButton
                    }),
                    ui.div({
                        class: 'demo-container',
                        children: [
                            ui.button({
                                class: 'wds-button',
                                id: 'demo-tooltip-trigger',
                                attrs: {
                                    'data-tips': 'Lorem ipsum dolor sit amet',
                                },
                                text: strings.demoTrigger
                            })
                        ]
                    }),
                    ui.p({
                        class: 'mobile-footnote',
                        text: strings.mobileNote
                    })
                ]
            }),
            id: 'demo-2-modal',
            size: 'large',
            title: strings.demoTitle
        });

        function updateModalDirection() {
            const modal = document.getElementById('demo-2-modal');
            // const modalDirection = modal.getAttribute('dir') || getComputedStyle(modal).direction;

            function setDirection(dir) {
                modal.setAttribute('dir', dir);
            }

            this.checked ? setDirection('rtl') : setDirection('ltr');
        }

        function updateTooltipPosition() {
            clearAttributes();

            const tooltipPosMenu = document.getElementById('tooltip-pos-setter');
            const tooltipTrigger = document.getElementById('demo-tooltip-trigger');
            const tooltipPosition = tooltipPosMenu.value;

            switch (tooltipPosition) {
                case 'top':
                    setAttributes(attrs.top);
                    break;
                case 'right':
                    setAttributes(attrs.right);
                    break;
                case 'bottom':
                    setAttributes(attrs.bottom);
                    break;
                case 'left':
                    setAttributes(attrs.left);
                    break;
                case 'center':
                    setAttributes(attrs.center);
                    break;
                case 'top-left':
                    setAttributes([attrs.top, attrs.left]);
                    break;
                case 'top-right':
                    setAttributes([attrs.top, attrs.right]);
                    break;
                case 'bottom-right':
                    setAttributes([attrs.bottom, attrs.right]);
                    break;
                case 'bottom-left':
                    setAttributes([attrs.bottom, attrs.left]);
                    break;
                case 'top-before':
                    setAttributes([attrs.top, attrs.before]);
                    break;
                case 'top-after':
                    setAttributes([attrs.top, attrs.after]);
                    break;
                case 'bottom-after':
                    setAttributes([attrs.bottom, attrs.after]);
                    break;
                case 'bottom-before':
                    setAttributes([attrs.bottom, attrs.before]);
                    break;
                case 'before':
                    setAttributes(attrs.before);
                    break;
                case 'after':
                    setAttributes(attrs.after);
                    break;
                default:
                    setAttributes(attrs.bottom);
            }
        }

        function setAttributes(attributes) {
            const tooltipTrigger = document.getElementById('demo-tooltip-trigger');

            if (typeof attributes === 'string') {
                tooltipTrigger.setAttribute(attributes, '');
            } else if (Array.isArray(attributes)) {
                for (i in attributes) {
                    tooltipTrigger.setAttribute(attributes[i], '');
                }
            } else {
                console.error('Error (setAttributes): expected a "string" or a "list" but instead got a "' + (typeof attributes) + '".');
            }
        }

        function clearAttributes() {
            const tooltipTrigger = document.getElementById('demo-tooltip-trigger');

            for (var i = 0; i < attrsList.length; i++) {
                tooltipTrigger.removeAttribute(attrsList[i]);
            }
        }

        function showDemoModal() {
            if (!document.getElementById('demo-2-modal')) demoModal.create();

            demoModal.show();

            const modalDirToggle = document.getElementById('demo-dir-toggle');
            const tooltipPosMenu = document.getElementById('tooltip-pos-setter');

            modalDirToggle.addEventListener('change', updateModalDirection);
            tooltipPosMenu.addEventListener('change', updateTooltipPosition);
        }

        modalToggleButton.addEventListener('click', showDemoModal);
    });
});