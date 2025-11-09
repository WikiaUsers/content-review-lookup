/**
 * @description Defines convenient functions for form creation with custom style. CSS classes used depend on: [[MediaWiki:CustomForm.css]]
 *              Used for example to make a tool [[MediaWiki:TokenSimulator.js]], see at: [[Template:TokenSimulator]]
 * @author      CA.EXCELSIOR      
*/
importArticles({
    type: "style",
    article: "MediaWiki:CustomForm.css"
}).catch(function (error) {
    console.error('Error loading CustomForm.css: ', error);
});

window.customForm = {};

// create form element
window.customForm.createForm = function createForm({ id }) {
    const form = document.createElement('form');
    form.classList.add('custom-form');
    form.action = 'javascript:;';
    if (id) form.id = id;
    return form;
}

// create form title element
window.customForm.createFormTitle = function createFormTitle({ title }) {
    const elem = document.createElement('div');
    elem.classList.add('form-title');
    elem.textContent = title;
    return elem;
}

// create form text element
window.customForm.createFormText = function createFormText({ text }) {
    const elem = document.createElement('div');
    elem.classList.add('form-text');
    elem.textContent = text;
    return elem;
}

// create label group from input and optionally label, prefixes, suffixes, formText
window.customForm.createLabelGroupHorizontal = function createLabelGroupHorizontal({ input, label, prefixes, suffixes, labelGroupText }) {
    return createLabelGroup({ isHorizontal: true, input, label, prefixes, suffixes, labelGroupText })
}

window.customForm.createLabelGroupVertical = function createLabelGroupVertical({ input, label, prefixes, suffixes, labelGroupText }) {
    return createLabelGroup({ isHorizontal: false, input, label, prefixes, suffixes, labelGroupText })
}

function createLabelGroup({ isHorizontal, input, label, prefixes, suffixes, labelGroupText }) {
    const container = document.createElement('div');
    container.classList.add('label-group');
    if (isHorizontal) {
        container.classList.add('flex-row');
    } else {
        container.classList.add('flex-col');
    }

    // make sure to add class
    input.classList.add('form-control');

    // if one of these types, add in reverse order and return
    if (["checkbox", "radio", "color"].includes(input.type)) {
        container.appendChild(input);
        if (label) {
            const labelElement = document.createElement('label');
            if (input.id) {
                labelElement.setAttribute('for', input.id);
            } else {
                console.warn('Input does not have an id - label will not be associated');
            }
            labelElement.textContent = label;
            container.appendChild(labelElement);
        }
        return container;
    }

    if (label) {
        const labelElement = document.createElement('label');
        if (input.id) {
            labelElement.setAttribute('for', input.id);
        } else {
            console.warn('Input does not have an id - label will not be associated');
        }
        labelElement.textContent = label;
        container.appendChild(labelElement);
    }

    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    if (prefixes) {
        for (const elem of prefixes) {
            if (typeof elem === 'string') {
                const prefixSpan = document.createElement('span');
                prefixSpan.classList.add('input-group-text');
                prefixSpan.textContent = elem;
                inputGroup.appendChild(prefixSpan);
            }
            else if (elem instanceof HTMLInputElement && ["checkbox", "radio"].includes(elem.type)) {
                const prefixSpan = document.createElement('span');
                prefixSpan.classList.add('input-group-text');
                prefixSpan.appendChild(elem);
                inputGroup.appendChild(prefixSpan);
            }
            else if (elem instanceof Element) {
                inputGroup.appendChild(elem);
            }
            else {
                console.warn('Unsupported type used as prefix - element skipped');
            }
        }
    }

    inputGroup.appendChild(input);

    if (suffixes) {
        for (const elem of suffixes) {
            if (typeof elem === 'string') {
                const suffixSpan = document.createElement('span');
                suffixSpan.classList.add('input-group-text');
                suffixSpan.textContent = elem;
                inputGroup.appendChild(suffixSpan);
            }
            else if (elem instanceof HTMLInputElement && ["checkbox", "radio"].includes(elem.type)) {
                const suffixSpan = document.createElement('span');
                suffixSpan.classList.add('input-group-text');
                suffixSpan.appendChild(elem);
                inputGroup.appendChild(suffixSpan);
            }
            else if (elem instanceof Element) {
                inputGroup.appendChild(elem);
            }
            else {
                console.warn('Unsupported type used as suffix - element skipped');
            }
        }
    }

    container.appendChild(inputGroup);

    if (labelGroupText) {
        const textDiv = document.createElement('div');
        textDiv.classList.add('label-group-text');
        textDiv.textContent = labelGroupText;
        container.appendChild(textDiv);
    }

    return container;
}

// create fieldset
window.customForm.createFieldsetHorizontal = function createFieldsetHorizontal({ legend, elements }) {
    return createFieldset({ isHorizontal: true, legend, elements });
}

window.customForm.createFieldsetVertical = function createFieldsetVertical({ legend, elements }) {
    return createFieldset({ isHorizontal: false, legend, elements });
}

function createFieldset({ isHorizontal, legend, elements }) {
    const container = document.createElement('fieldset');
    container.classList.add('form-group');

    if (isHorizontal) {
        container.classList.add('flex-row');
    } else {
        container.classList.add('flex-col');
    }

    if (legend !== undefined) {
        const legendElem = document.createElement('legend');
        legendElem.textContent = legend;
        container.appendChild(legendElem);
    }

    if (Array.isArray(elements)) {
        elements.forEach(elem => container.appendChild(elem));
    } else {
        console.warn('Invalid elements array in createFieldset');
    }

    return container;
}

// create form group
window.customForm.createFormGroupHorizontal = function createFormGroupHorizontal({ elements }) {
    return createFormGroup({ isHorizontal: true, elements })
}
window.customForm.createFormGroupVertical = function createFormGroupVertical({ elements }) {
    return createFormGroup({ isHorizontal: false, elements })
}

function createFormGroup({ isHorizontal, elements }) {
    const container = document.createElement('div');
    container.classList.add('form-group');

    if (isHorizontal) {
        container.classList.add('flex-row');
    } else {
        container.classList.add('flex-col');
    }

    if (Array.isArray(elements)) {
        elements.forEach(elem => container.appendChild(elem));
    } else {
        console.warn('Invalid elements array in createFormGroup');
    }

    return container;
}

// make sure that elements have appropriate classes
window.customForm.finalizeCustomForm = function finalizeCustomForm(form) {
    if (!form.action.startsWith('javascript:;')) {
        form.action = 'javascript:;';
    }
    form.classList.add('custom-form');

    form.querySelectorAll('input, textarea').forEach(elem => elem.classList.add('form-control'));
}