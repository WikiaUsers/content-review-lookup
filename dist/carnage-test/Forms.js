/**
 * This script is used for
 * testing purposes.
 **/

window.FormUI = window.FormUI || function FormUI(type){
    this.type = type || 'list';
    this.types = {
        'list': {},
        'color': {},
        'combobox': {},
        'search': {}
    };
    return this;
};