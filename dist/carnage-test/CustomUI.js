(function($, mw){
    function UI(type, config){ return this.getUI(type, config); }
    // UI configurations
    UI.prototype.properties = {};
    UI.prototype.properties.modal = {
        title: '',
        heading: '',
        content: '',
        buttons: [],
        width: 650,
        height: 450,
        id: '',
        callback: $.noop
    };
    UI.prototype.properties.toggle = {
        id: '',
        name: '',
        options: [],
        defValue: null,
        label: null
    };
    UI.prototype.properties['switch'] = UI.prototype.properties.toggle;
    UI.prototype.properties.button = {
        id: '',
        text: '',
        handler: $.noop,
        name: ''
    };
    UI.prototype.properties.list = {
        id: '',
        options: [],
        defValue: null,
        label: null
    };
    ['dropdown', 'select'].forEach(function(fn){
        UI.prototype.properties[fn] = UI.prototype.properties.list;
    });
    UI.prototype.properties.input = {
        id: '',
        defValue: null,
        placeholder: null,
        label: null
    };
    UI.prototype.properties.combobox = {
        id: '',
        defValue: null,
        placeholder: null,
        options: [],
        label: null
    };
    UI.prototype.properties.textarea = {
        id: '',
        defValue: null,
        placeholder: null,
        label: null,
        rows: 3,
        cols: 20
    };
    UI.prototype.properties.textbox = UI.prototype.properties.textarea;
    UI.prototype.properties.checkbox = {
        id: '',
        defValue: null,
        label: null,
        name: ''
    };
    UI.prototype.properties.radio = UI.prototype.properties.checkbox;
    // UI events
    UI.prototype.events = {};
    // UI setup
    UI.prototype.setup = {};
    UI.prototype.create = {};
}(jQuery, mediaWiki));