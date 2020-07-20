'use strict';
/* Навбокс */
var Navbox = function( elem ) {
    this._element = elem;
    this._element.obj = this;
    this._childrenSections = [];
    this._globalSettings = this._initializeSettings();
    //инициализация корневых секций
    var sections = elem.children;
    this._createChildren( sections );
};
//
Navbox.prototype._setSetting = function( dataName, dictionary ) {
    var data = this._element.dataset[ dataName ];
    if ( data === undefined )
        throw new Error( 'Некорректная настройка "' + dataName + '"' );
    delete this._element.dataset[ dataName ];
    if ( !dictionary )
        return data;
    for ( var word in dictionary ) {
        if ( word === data )
            return dictionary[ word ];
    }
    throw new Error( 'Некорректная настройка "' + dataName + '"' );
};
//
Navbox.prototype._initializeSettings = function() {
    var settings = {};
    settings.collapsible = this._setSetting( 'collapsible', {'true': true, 'false': false} );
    settings.collapsed = this._setSetting( 'collapsed', {'true': true, 'false': false} );
    settings.openCurrent = this._setSetting( 'openCurrent', {'open': true, 'close': false} );
    settings.controlElem = this._setSetting( 'controlElem', {'header': 'header', 'button': 'button'} );
    settings.expandTooltip = this._setSetting( 'expandTooltip' );
    settings.collapseTooltip = this._setSetting( 'collapseTooltip' );
    settings.expandText = this._setSetting( 'expandText' );
    settings.collapseText = this._setSetting( 'collapseText' );
    return settings;
};
//
Navbox.prototype._createChildren = function( sections ) {
    Array.prototype.forEach.call(sections, function( child ) {
        if ( child.classList.contains( 'navbox_section' ) )
            this._childrenSections[ this._childrenSections.length ] = new NavboxSection( child, this._globalSettings );
    }, this);
};

/* Секции */
var NavboxSection = function( elem, globalSettings ) {
    this._globalSettings = globalSettings;
    //элементы
    this._element = elem;
    this._element.obj = this;
    this._header = elem.firstElementChild;
    this._body = elem.lastElementChild;
    this._controlElement;
    this._childrenSections = [];
    //состояние
    this._collapsible;
    this._state;
    this._controlType;
    //информация
    this._collapseId;
    this._expandTooltip;
    this._collapseTooltip;
    this._expandText;
    this._collapseText;
    //инициализация вложенных секций
    var sections = this._body.children;
    this._createChildren( sections );
    //инициализация секции
    var localSettings = this._initializeSettings();
    this._collapsible = localSettings.collapsible;
    if ( !this._collapsible )
        return;
    this._controlType = localSettings.controlElem;
    this._expandTooltip = localSettings.expandTooltip;
    this._collapseTooltip = localSettings.collapseTooltip;
    if ( this._controlType === 'button' ) {
        var button = document.createElement( 'div' );
        button.classList.add( 'navbox_collapseButton' );
        this._controlElement = button;
        this._header.appendChild( button );
        this._expandText = localSettings.expandText;
        this._collapseText = localSettings.collapseText;
    } else if ( this._controlType === 'header' ) {
        this._controlElement = this._header;
        this._controlElement.classList.add( 'navbox_sectionHeader_a' );
    }
    if ( !localSettings.collapsed || (globalSettings.openCurrent && elem.querySelector('.selflink')) ) {
        this.expand();
    } else {
        this.collapse();
    }
    //обработчики
    this._controlElement.addEventListener('click', function( e ) {
        if ( !this._checkForClickable(e.target) )
            return;
        this.toggle();
    }.bind(this));
    this._controlElement.addEventListener('mousedown', function( e ) {
        if ( e.which !== 2 )
            return;
        if ( !this._checkForClickable(e.target) )
            return;
        e.preventDefault();
        this.toggleChildren();
    }.bind(this));
};
//
NavboxSection.prototype = Object.create( Navbox.prototype );
NavboxSection.prototype.constructor = NavboxSection;
//
NavboxSection.prototype._setSetting = function( dataName, dictionary ) {
    var data = this._element.dataset[ dataName ];
    if ( !data )
        return this._globalSettings[ dataName ];
    return Navbox.prototype._setSetting.apply( this, arguments );
};
//
NavboxSection.prototype._checkForClickable = function( elem ) {
    var currentElem = elem;
    while ( currentElem !== this._header ) {
        if ( currentElem.classList.contains( 'navbox_noClickableArea' ) )
            return false;
        currentElem = currentElem.parentElement;
    }
    return true;
};
//
NavboxSection.prototype.checkChildrenForCollapse = function() {
    if ( this._state === 'collapses' || this._state === 'collapsed' )
        return true;
    for ( var i = 0; i < this._childrenSections.length; i++ ) {
        var child = this._childrenSections[ i ];
        if ( child.checkChildrenForCollapse() ) 
            return true;
    }
};
//
NavboxSection.prototype.expand = function() {
    if ( !this._collapsible )
        return;
    if ( this._state === 'expanded' )
        return;
    if ( this._state === 'collapses' )
        clearTimeout( this._collapseId );
    this._body.style.display = '';
    this._controlElement.setAttribute( 'title', this._collapseTooltip );
    if ( this._controlType === 'button' ) {
        this._controlElement.textContent = this._collapseText;
        this._controlElement.classList.remove( 'navbox_collapseButton_e' );
        this._controlElement.classList.add( 'navbox_collapseButton_c' );
    }
    this._element.classList.remove( 'navbox_section_c' );
    this._element.classList.add( 'navbox_section_e' );
    this._state = 'expanded';
    setTimeout( function(){
        this._body.style.opacity = 1;
    }.bind( this ), 1 );
};
//
NavboxSection.prototype.collapse = function( fast ) {
    if ( !this._collapsible )
        return;
    if ( this._state === 'collapses' || this._state === 'collapsed' )
        return;
    this._controlElement.setAttribute( 'title', this._expandTooltip );
    if ( this._controlType === 'button' ) {
        this._controlElement.textContent = this._expandText;
        this._controlElement.classList.remove( 'navbox_collapseButton_c' );
        this._controlElement.classList.add( 'navbox_collapseButton_e' );
    }
    this._body.style.opacity = 0;
    if ( fast ) {
        this._body.style.display = 'none';
        this._element.classList.remove( 'navbox_section_e' );
        this._element.classList.add( 'navbox_section_c' );
        this._state = 'collapsed';
        return;
    }
    this._state = 'collapses';
    this._collapseId = setTimeout( function(){
        this._body.style.display = 'none';
        this._element.classList.remove( 'navbox_section_e' );
        this._element.classList.add( 'navbox_section_c' );
        this._state = 'collapsed';
    }.bind( this ), 350 );
};
//
NavboxSection.prototype.toggle = function() {
    if ( !this._collapsible )
        return;
    if ( this._state == 'expanded' ) {
        this.collapse();
    } else {
        this.expand();
    }
};
//
NavboxSection.prototype.expandChildren = function() {
    if ( !this._collapsible )
        return;
    this._childrenSections.forEach(function( item ) {
        item.expandChildren();
    });
    if ( this._state !== 'expanded' )
        this.expand();
};
//
NavboxSection.prototype.collapseChildren = function() {
    if ( !this._collapsible )
        return;
    this._childrenSections.forEach(function( item ) {
        item.collapseChildren();
    });
    if ( this._state === 'expanded' )
        this.collapse();
};
//
NavboxSection.prototype.toggleChildren = function() {
    if ( !this._collapsible )
        return;
    if ( this.checkChildrenForCollapse() ) {
        this.expandChildren();
    } else {
        this.collapseChildren();
    }
};

/* пуск */
(function() {
    var navboxes = document.getElementsByClassName( 'navbox_wrapper' );
    Array.prototype.forEach.call( navboxes, function( navbox ) {
        new Navbox( navbox );
    });
})();