// <nowiki>
/**
 * morebits.js
 * ===========
 * A library full of lots of goodness for user scripts on Wikipedia.
 * (It should work on other MediaWiki wikis as well, despite some Wikipedia-specific object naming.)
 *
 * The highlights include:
 *   - QuickForm class - generates quick HTML forms on the fly
 *   - Wikipedia.api class - makes calls to the Wikipedia API (or the API of any MediaWiki wiki)
 *   - Wikipedia.page class - modifies pages on the wiki (edit, revert, delete, etc.)
 *   - MediaWiki class - contains some utilities for dealing with wikitext
 *   - Status class - a rough-and-ready status message displayer, used by the Wikipedia classes
 *   - SimpleWindow class - a wrapper for jQuery UI Dialog with a custom look and extra features
 *
 * Dependencies:
 *   - The whole thing relies on jQuery.  But most wikis should provide this by default.
 *   - QuickForm, SimpleWindow, Status, and the portlet stuff rely on the "morebits.css" file for their styling.
 *   - SimpleWindow relies on jquery UI Dialog (ResourceLoader module name 'jquery.ui.dialog').
 *   - QuickForm tooltips rely on Tipsy (ResourceLoader module name 'jquery.tipsy').
 *     For external installations, Tipsy is available at [http://onehackoranother.com/projects/jquery/tipsy].
 *   - To create a gadget based on morebits.js, use this syntax in MediaWiki:Gadgets-definition:
 *       * GadgetName[ResourceLoader|dependencies=jquery.ui.dialog,jquery.tipsy]|morebits.js|morebits.css|GadgetName.js
 *
 * Most of the stuff here doesn't work on IE < 9.  It is your script's responsibility to enforce this.
 *
 * This library is maintained by the maintainers of Twinkle.
 * For queries, suggestions, help, etc., head to [[Wikipedia talk:Twinkle]] on English Wikipedia [http://en.wikipedia.org].
 * The latest development source is available at [https://github.com/azatoth/twinkle/blob/master/morebits.js].
 */


/**
 * **************** userIsInGroup(), userIsAnon() ****************
 * Simple helper functions to see what groups a user might belong
 */

function userIsInGroup( group ) {
    return $.inArray(group, mw.config.get( 'wgUserGroups' )) !== -1;
}
function userIsAnon() {
    return mw.config.get( 'wgUserGroups' ).length === 1;
}


/**
 * **************** Cookies ****************
 */

var Cookies = {
    /*
     * Creates an cookie with the name and value pair. expiry is optional or null and defaults
     * to browser standard (in seconds), path is optional and defaults to "/"
     * throws error if the cookie already exists.
     */
    create: function( name, value, max_age, path ) {
        if( Cookies.exists( name ) ) {
            throw new Error( "cookie " + name + " already exists" );
        }
        Cookies.set( name, value, max_age, path );
    },
    /*
     * Sets an cookie with the name and value pair, overwrites any previous cookie of that name.
     * expiry is optional or null and defaults to browser standard (in seconds),
     * path is optional and defaults to /
     */
    set: function( name, value, max_age, path ) {
        var cookie = name + "=" + encodeURIComponent( value );
        if( max_age ) {
            cookie += "; max-age=" + max_age;
        }
        cookie += "; path=" + path || "/";
        document.cookie = cookie;
    },
    /*
     * Retuns the cookie with the name "name", return null if no cookie found.
     */
    read: function( name ) {
        var cookies = document.cookie.split(";");
        for( var i = 0; i < cookies.length; ++i ) {
            var current = cookies[i];
            current = current.trim();
            if( current.indexOf( name + "=" ) === 0 ) {
                return decodeURIComponent( current.substring( name.length + 1 ) );
            }
        }
        return null;
    },
    /*
     * Returns true if a cookie exists, false otherwise
     */
    exists: function( name ) {
        var re = new RegExp( ";\\s*" + name + "=" );
        return re.test( document.cookie );
    },
    /*
     * Deletes the cookie named "name"
     */
    remove: function( name ) {
        Cookies.set( name, '', -1 );
    }
};


/**
 * **************** QuickForm ****************
 * QuickForm is a class for creation of simple and standard forms without much
 * specific coding.
 *
 * Index to QuickForm element types:
 *
 *   select    A combo box (aka drop-down).
 *              - Attributes: name, label, multiple, size, list, event
 *   option    An element for a combo box.
 *              - Attributes: value, label, selected, disabled
 *   optgroup  A group of "option"s.
 *              - Attributes: label, list
 *   field     A fieldset (aka group box).
 *              - Attributes: name, label
 *   checkbox  A checkbox. Must use "list" parameter.
 *              - Attributes: name, list, event
 *              - Attributes (within list): name, label, value, checked, disabled, event, subgroup
 *   radio     A radio button. Must use "list" parameter.
 *              - Attributes: name, list, event
 *              - Attributes (within list): name, label, value, checked, disabled, event, subgroup
 *   input     A text box.
 *              - Attributes: name, label, value, size, disabled, readonly, maxlength, event
 *   dyninput  A set of text boxes with "Remove" buttons and an "Add" button.
 *              - Attributes: name, label, min, max, sublabel, value, size, maxlength, event
 *   hidden    An invisible form field.
 *              - Attributes: name, value
 *   header    A level 5 header.
 *              - Attributes: label
 *   div       A generic placeholder element or label.
 *              - Attributes: name, label
 *   submit    A submit button. SimpleWindow moves these to the footer of the dialog.
 *              - Attributes: name, label, disabled
 *   button    A generic button.
 *              - Attributes: name, label, disabled, event
 *   textarea  A big, multi-line text box.
 *              - Attributes: name, label, value, cols, rows, disabled, readonly
 *
 * Global attributes: id, tooltip, extra, adminonly
 */

var QuickForm = function QuickForm( event, eventType ) {
    this.root = new QuickForm.element( { type: 'form', event: event, eventType:eventType } );
};

QuickForm.prototype.render = function QuickFormRender() {
    var ret = this.root.render();
    ret.names = {};
    return ret;
};

QuickForm.prototype.append = function QuickFormAppend( data ) {
    return this.root.append( data );
};

QuickForm.element = function QuickFormElement( data ) {
    this.data = data;
    this.childs = [];
    this.id = QuickForm.element.id++;
};

QuickForm.element.id = 0;

QuickForm.element.prototype.append = function QuickFormElementAppend( data ) {
    var child;
    if( data instanceof QuickForm.element ) {
        child = data;
    } else {
        child = new QuickForm.element( data );
    }
    this.childs.push( child );
    return child;
};

QuickForm.element.prototype.render = function QuickFormElementRender() {
    var currentNode = this.compute( this.data );

    for( var i = 0; i < this.childs.length; ++i ) {
        currentNode[1].appendChild( this.childs[i].render() );
    }
    return currentNode[0];
};

QuickForm.element.prototype.compute = function QuickFormElementCompute( data, in_id ) {
    var node;
    var childContainder = null;
    var label;
    var id = ( in_id ? in_id + '_' : '' ) + 'node_' + this.id;
    if( data.adminonly && !userIsInGroup( 'sysop' ) ) {
        // hell hack alpha
        data.type = 'hidden';
    }

    var i, current, subnode;
    switch( data.type ) {
    case 'form':
        node = document.createElement( 'form' );
        node.setAttribute( 'name', 'id' );
        node.className = "quickform";
        node.setAttribute( 'action', 'javascript:void(0);');
        if( data.event ) {
            node.addEventListener( data.eventType || 'submit', data.event , false );
        }
        break;
    case 'select':
        node = document.createElement( 'div' );

        node.setAttribute( 'id', 'div_' + id );
        if( data.label ) {
            label = node.appendChild( document.createElement( 'label' ) );
            label.setAttribute( 'for', id );
            label.appendChild( document.createTextNode( data.label ) );
        }
        var select = node.appendChild( document.createElement( 'select' ) );
        if( data.event ) {
            select.addEventListener( 'change', data.event, false );
        }
        if( data.multiple ) {
            select.setAttribute( 'multiple', 'multiple' );
        }
        if( data.size ) {
            select.setAttribute( 'size', data.size );
        }
        select.setAttribute( 'name', data.name );

        if( data.list ) {
            for( i = 0; i < data.list.length; ++i ) {

                current = data.list[i];

                if( current.list ) {
                    current.type = 'optgroup';
                } else {
                    current.type = 'option';
                }

                subnode = this.compute( current );
                select.appendChild( subnode[0] );
            }
        }
        childContainder = select;
        break;
    case 'option':
        node = document.createElement( 'option' );
        node.values = data.value;
        node.setAttribute( 'value', data.value );
        if( data.selected ) {
            node.setAttribute( 'selected', 'selected' );
        }
        if( data.disabled ) {
            node.setAttribute( 'disabled', 'disabled' );
        }
        node.setAttribute( 'label', data.label );
        node.appendChild( document.createTextNode( data.label ) );
        break;
    case 'optgroup':
        node = document.createElement( 'optgroup' );
        node.setAttribute( 'label', data.label );

        if( data.list ) {
            for( i = 0; i < data.list.length; ++i ) {

                current = data.list[i];
                current.type = 'option'; //must be options here

                subnode = this.compute( current );
                node.appendChild( subnode[0] );
            }
        }
        break;
    case 'field':
        node = document.createElement( 'fieldset' );
        label = node.appendChild( document.createElement( 'legend' ) );
        label.appendChild( document.createTextNode( data.label ) );
        if( data.name ) {
            node.setAttribute( 'name', data.name );
        }
        break;
    case 'checkbox':
    case 'radio':
        node = document.createElement( 'div' );
        if( data.list ) {
            for( i = 0; i < data.list.length; ++i ) {
                var cur_id = id + '_' + i;
                current = data.list[i];
                var cur_div;
                if( current.type === 'header' ) {
                    // inline hack
                    cur_div = node.appendChild( document.createElement( 'h6' ) );
                    cur_div.appendChild( document.createTextNode( current.label ) );
                    if( current.tooltip ) {
                        QuickForm.element.generateTooltip( cur_div , current );
                    }
                    continue;
                }
                cur_div = node.appendChild( document.createElement( 'div' ) );
                subnode = cur_div.appendChild( document.createElement( 'input' ) );
                subnode.values = current.value;
                subnode.setAttribute( 'value', current.value );
                subnode.setAttribute( 'name', current.name || data.name );
                subnode.setAttribute( 'type', data.type );
                subnode.setAttribute( 'id', cur_id );

                if( current.checked ) {
                    subnode.setAttribute( 'checked', 'checked' );
                }
                if( current.disabled ) {
                    subnode.setAttribute( 'disabled', 'disabled' );
                }
                if( data.event ) {
                    subnode.addEventListener( 'change', data.event, false );
                } else if ( current.event ) {
                    subnode.addEventListener( 'change', current.event, true );
                }
                label = cur_div.appendChild( document.createElement( 'label' ) );
                label.appendChild( document.createTextNode( current.label ) );
                label.setAttribute( 'for', cur_id );
                if( current.tooltip ) {
                    QuickForm.element.generateTooltip( label, current );
                }
                var event;
                if( current.subgroup ) {
                    var tmpgroup = current.subgroup;
                    if( ! tmpgroup.type ) {
                        tmpgroup.type = data.type;
                    }
                    tmpgroup.name = (current.name || data.name) + '.' +  tmpgroup.name;

                    var subgroup =this.compute( current.subgroup, cur_id )[0];
                    subgroup.style.marginLeft = '3em';
                    subnode.subgroup = subgroup;
                    subnode.shown = false;

                    event = function(e) {
                        if( e.target.checked ) {
                            e.target.parentNode.appendChild( e.target.subgroup );
                            if( e.target.type === 'radio' ) {
                                var name = e.target.name;
                                if( typeof( e.target.form.names[name] ) !== 'undefined' ) {
                                    e.target.form.names[name].parentNode.removeChild( e.target.form.names[name].subgroup );
                                }
                                e.target.form.names[name] = e.target;
                            }
                        } else {
                            e.target.parentNode.removeChild( e.target.subgroup );
                        }
                    };
                    subnode.addEventListener( 'change', event, true );
                    if( current.checked ) {
                        subnode.parentNode.appendChild( subgroup );
                    }
                } else if( data.type === 'radio' ) {
                    event = function(e) {
                        if( e.target.checked ) {
                            var name = e.target.name;
                            if( typeof( e.target.form.names[name] ) !== 'undefined' ) {
                                e.target.form.names[name].parentNode.removeChild( e.target.form.names[name].subgroup );
                            }
                            delete e.target.form.names[name];
                        }
                    };
                    subnode.addEventListener( 'change', event, true );
                }
            }
        }
        break;
    case 'input':
        node = document.createElement( 'div' );

        if( data.label ) {
            label = node.appendChild( document.createElement( 'label' ) );
            label.appendChild( document.createTextNode( data.label ) );
            label.setAttribute( 'for', id );
        }

        subnode = node.appendChild( document.createElement( 'input' ) );
        if( data.value ) {
            subnode.setAttribute( 'value', data.value );
        }
        subnode.setAttribute( 'name', data.name );
        subnode.setAttribute( 'type', 'text' );
        if( data.size ) {
            subnode.setAttribute( 'size', data.size );
        }
        if( data.disabled ) {
            subnode.setAttribute( 'disabled', 'disabled' );
        }
        if( data.readonly ) {
            subnode.setAttribute( 'readonly', 'readonly' );
        }
        if( data.maxlength ) {
            subnode.setAttribute( 'maxlength', data.maxlength );
        }
        if( data.event ) {
            subnode.addEventListener( 'keyup', data.event, false );
        }
        break;
    case 'dyninput':
        var min = data.min || 1;
        var max = data.max || Infinity;

        node = document.createElement( 'div' );

        label = node.appendChild( document.createElement( 'h5' ) );
        label.appendChild( document.createTextNode( data.label ) );

        var listNode = node.appendChild( document.createElement( 'div' ) );

        var more = this.compute( {
                type: 'button',
                label: 'more',
                disabled: min >= max,
                event: function(e) {
                    var area = e.target.area;
                    var new_node =  new QuickForm.element( e.target.sublist );
                    e.target.area.appendChild( new_node.render() );

                    if( ++e.target.counter >= e.target.max ) {
                        e.target.setAttribute( 'disabled', 'disabled' );
                    }
                    e.stopPropagation();
                }
            } );

        node.appendChild( more[0] );
        var moreButton = more[1];

        var sublist = {
            type: '_dyninput_element',
            label: data.sublabel || data.label,
            name: data.name,
            value: data.value,
            size: data.size,
            remove: false,
            maxlength: data.maxlength,
            event: data.event
        };

        for( i = 0; i < min; ++i ) {
            var elem = new QuickForm.element( sublist );
            listNode.appendChild( elem.render() );
        }
        sublist.remove = true;
        sublist.morebutton = moreButton;
        sublist.listnode = listNode;

        moreButton.sublist = sublist;
        moreButton.area = listNode;
        moreButton.max = max - min;
        moreButton.counter = 0;
        break;
    case '_dyninput_element': // Private, similar to normal input
        node = document.createElement( 'div' );

        if( data.label ) {
            label = node.appendChild( document.createElement( 'label' ) );
            label.appendChild( document.createTextNode( data.label ) );
            label.setAttribute( 'for', id );
        }

        subnode = node.appendChild( document.createElement( 'input' ) );
        if( data.value ) {
            subnode.setAttribute( 'value', data.value );
        }
        subnode.setAttribute( 'name', data.name );
        subnode.setAttribute( 'type', 'text' );
        if( data.size ) {
            subnode.setAttribute( 'size', data.size );
        }
        if( data.maxlength ) {
            subnode.setAttribute( 'maxlength', data.maxlength );
        }
        if( data.event ) {
            subnode.addEventListener( 'keyup', data.event, false );
        }
        if( data.remove ) {
            var remove = this.compute( {
                    type: 'button',
                    label: 'remove',
                    event: function(e) {
                        var list = e.target.listnode;
                        var node = e.target.inputnode;
                        var more = e.target.morebutton;

                        list.removeChild( node );
                        --more.counter;
                        more.removeAttribute( 'disabled' );
                        e.stopPropagation();
                    }
                } );
            node.appendChild( remove[0] );
            var removeButton = remove[1];
            removeButton.inputnode = node;
            removeButton.listnode = data.listnode;
            removeButton.morebutton = data.morebutton;
        }
        break;
    case 'hidden':
        node = document.createElement( 'input' );
        node.setAttribute( 'type', 'hidden' );
        node.values = data.value;
        node.setAttribute( 'value', data.value );
        node.setAttribute( 'name', data.name );
        break;
    case 'header':
        node = document.createElement( 'h5' );
        node.appendChild( document.createTextNode( data.label ) );
        break;
    case 'div':
        node = document.createElement( 'div' );
        if (data.name) {
            node.setAttribute( 'name', data.name );
        }
        if (data.label) {
            if ( !( data.label instanceof Array ) ) {
                data.label = [ data.label ];
            }
            var result = document.createElement( 'span' );
            result.className = 'quickformDescription';
            for( i = 0; i < data.label.length; ++i ) {
                if( typeof(data.label[i]) === 'string' ) {
                    result.appendChild( document.createTextNode( data.label[i] ) );
                } else if( data.label[i] instanceof Element ) {
                    result.appendChild( data.label[i] );
                }
            }
            node.appendChild( result );
        }
        break;
    case 'submit':
        node = document.createElement( 'span' );
        childContainder = node.appendChild(document.createElement( 'input' ));
        childContainder.setAttribute( 'type', 'submit' );
        if( data.label ) {
            childContainder.setAttribute( 'value', data.label );
        }
        childContainder.setAttribute( 'name', data.name || 'submit' );
        if( data.disabled ) {
            childContainder.setAttribute( 'disabled', 'disabled' );
        }
        break;
    case 'button':
        node = document.createElement( 'span' );
        childContainder = node.appendChild(document.createElement( 'input' ));
        childContainder.setAttribute( 'type', 'button' );
        if( data.label ) {
            childContainder.setAttribute( 'value', data.label );
        }
        childContainder.setAttribute( 'name', data.name );
        if( data.disabled ) {
            childContainder.setAttribute( 'disabled', 'disabled' );
        }
        if( data.event ) {
            childContainder.addEventListener( 'click', data.event, false );
        }
        break;
    case 'textarea':
        node = document.createElement( 'div' );
        if( data.label ) {
            label = node.appendChild( document.createElement( 'h5' ) );
            label.appendChild( document.createTextNode( data.label ) );
            label.setAttribute( 'for', id );
        }
        subnode = node.appendChild( document.createElement( 'textarea' ) );
        subnode.setAttribute( 'name', data.name );
        if( data.cols ) {
            subnode.setAttribute( 'cols', data.cols );
        }
        if( data.rows ) {
            subnode.setAttribute( 'rows', data.rows );
        }
        if( data.disabled ) {
            subnode.setAttribute( 'disabled', 'disabled' );
        }
        if( data.readonly ) {
            subnode.setAttribute( 'readonly', 'readonly' );
        }
        if( data.value ) {
            subnode.value = data.value;
        }
        break;
    default:
        throw new Error("QuickForm: unknown element type " + data.type.toString());
    }

    if( !childContainder ) {
        childContainder = node;
    }
    if( data.tooltip ) {
        QuickForm.element.generateTooltip( label || node , data );
    }

    if( data.extra ) {
        childContainder.extra = data.extra;
    }
    childContainder.setAttribute( 'id', data.id || id );

    return [ node, childContainder ];
};

QuickForm.element.generateTooltip = function QuickFormElementGenerateTooltip( node, data ) {
    $('<span/>', {
            'class': 'ui-icon ui-icon-help ui-icon-inline morebits-tooltip'
        }).appendTo(node).tipsy({
            'fallback': data.tooltip,
            'fade': true,
            'gravity': $.fn.tipsy.autoWE,
            'html': true,
            'delayOut': 250
        });
};


/**
 * **************** HTMLFormElement ****************
 *
 * getChecked:
 *   XXX Doesn't seem to work reliably across all browsers at the moment. -- see getChecked2 in twinkleunlink.js, which is better
 *
 *   Returns an array containing the values of elements with the given name, that has it's
 *   checked property set to true. (i.e. a checkbox or a radiobutton is checked), or select options
 *   that have selected set to true. (don't try to mix selects with radio/checkboxes, please)
 *   Type is optional and can specify if either radio or checkbox (for the event
 *   that both checkboxes and radiobuttons have the same name.
 */

HTMLFormElement.prototype.getChecked = function( name, type ) {
    var elements = this.elements[name];
    if( !elements ) {
        // if the element doesn't exists, return null.
        return null;
    }
    var return_array = [];
    var i;
    if( elements instanceof HTMLSelectElement ) {
        var options = elements.options;
        for( i = 0; i < options.length; ++i ) {
            if( options[i].selected ) {
                if( options[i].values ) {
                    return_array.push( options[i].values );
                } else {
                    return_array.push( options[i].value );
                }

            }
        }
    } else if( elements instanceof HTMLInputElement ) {
        if( type && elements.type !== type ) {
            return [];
        } else if( elements.checked ) {
            return [ elements.value ];
        }
    } else {
        for( i = 0; i < elements.length; ++i ) {
            if( elements[i].checked ) {
                if( type && elements[i].type !== type ) {
                    continue;
                }
                if( elements[i].values ) {
                    return_array.push( elements[i].values );
                } else {
                    return_array.push( elements[i].value );
                }
            }
        }
    }
    return return_array;
};


/**
 * **************** RegExp ****************
 *
 * RegExp.escape: Will escape a string to be used in a RegExp
 */

RegExp.escape = function( text, space_fix ) {

    if ( !arguments.callee.sRE ) {
        arguments.callee.sRE = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\$|\^)/g;
    }

    text = text.replace( arguments.callee.sRE , '\\$1' );

    // Special Mediawiki escape, underscore/space is the same, often at lest:

    if( space_fix ) {
        text = text.replace( / |_/g, '[_ ]' );
    }

    return text;
};


/**
 * **************** Bytes ****************
 */

var Bytes = function( value ) {
    if( typeof(value) === 'string' ) {
        var res = /(\d+) ?(\w?)(i?)B?/.exec( value );
        var number = res[1];
        var mag = res[2];
        var si = res[3];

        if( ! number ) {
            this.number = 0;
            return;
        }

        if( !si ) {
            this.value = number * Math.pow( 10, Bytes.magnitudes[mag] * 3 );
        } else {
            this.value = number * Math.pow( 2, Bytes.magnitudes[mag] * 10 );
        }
    } else {
        this.value = value;
    }
};

Bytes.magnitudes = {
    '': 0,
    'K': 1,
    'M': 2,
    'G': 3,
    'T': 4,
    'P': 5,
    'E': 6,
    'Z': 7,
    'Y': 8
};

Bytes.rmagnitudes = {
    0: '',
    1: 'K',
    2: 'M',
    3: 'G',
    4: 'T',
    5: 'P',
    6: 'E',
    7: 'Z',
    8: 'Y'
};

Bytes.prototype.valueOf = function() {
    return this.value;
};

Bytes.prototype.toString = function( magnitude ) {
    var tmp = this.value;
    if( magnitude ) {
        var si = /i/.test(magnitude);
        var mag = magnitude.replace( /.*?(\w)i?B?.*/g, '$1' );
        if( si ) {
            tmp /= Math.pow( 2, Bytes.magnitudes[mag] * 10 );
        } else {
            tmp /= Math.pow( 10, Bytes.magnitudes[mag] * 3 );
        }
        if( parseInt( tmp, 10 ) !== tmp ) {
            tmp = Number( tmp ).toPrecision( 4 );
        }
        return tmp + ' ' + mag + (si?'i':'') + 'B';
    } else {
        // si per default
        var current = 0;
        while( tmp >= 1024 ) {
            tmp /= 1024;
            ++current;
        }
        tmp = this.value / Math.pow( 2, current * 10 );
        if( parseInt( tmp, 10 ) !== tmp ) {
            tmp = Number( tmp ).toPrecision( 4 );
        }
        return tmp + ' ' + Bytes.rmagnitudes[current] + ( current > 0 ? 'iB' : 'B' );
    }
};


/**
 * **************** String ****************
 */

String.prototype.ltrim = function stringPrototypeLtrim( chars ) {
    chars = chars || "\\s";
    return this.replace( new RegExp("^[" + chars + "]+", "g"), "" );
};

String.prototype.rtrim = function stringPrototypeRtrim( chars ) {
    chars = chars || "\\s";
    return this.replace( new RegExp("[" + chars + "]+$", "g"), "" );
};

String.prototype.trim = function stringPrototypeTrim( chars ) {
    return this.rtrim(chars).ltrim(chars);
};

String.prototype.splitWeightedByKeys = function stringPrototypeSplitWeightedByKeys( start, end, skip ) {
    if( start.length !== end.length ) {
        throw new Error( 'start marker and end marker must be of the same length' );
    }
    var level = 0;
    var initial = null;
    var result = [];
    if( !( skip instanceof Array ) ) {
        if( typeof( skip ) === 'undefined' ) {
            skip = [];
        } else if( typeof( skip ) === 'string' ) {
            skip = [ skip ];
        } else {
            throw new Error( "non-applicable skip parameter" );
        }
    }
    for( var i  = 0; i < this.length; ++i ) {
        for( var j = 0; j < skip.length; ++j ) {
            if( this.substr( i, skip[j].length ) === skip[j] ) {
                i += skip[j].length - 1;
                continue;
            }
        }
        if( this.substr( i, start.length ) === start ) {
            if( initial === null ) {
                initial = i;
            }
            ++level;
            i += start.length - 1;
        } else if( this.substr( i, end.length ) === end ) {
            --level;
            i += end.length - 1;
        }
        if( !level && initial ) {
            result.push( this.substring( initial, i + 1 ) );
            initial = null;
        }
    }

    return result;
};

// Helper functions to change case of a string
String.prototype.toUpperCaseFirstChar = function() {
    return this.substr( 0, 1 ).toUpperCase() + this.substr( 1 );
};

String.prototype.toLowerCaseFirstChar = function() {
    return this.substr( 0, 1 ).toLowerCase() + this.substr( 1 );
};

String.prototype.toUpperCaseEachWord = function( delim ) {
    delim = delim ? delim : ' ';
    return this.split( delim ).map( function(v) { return v.toUpperCaseFirstChar(); } ).join( delim );
};

String.prototype.toLowerCaseEachWord = function( delim ) {
    delim = delim ? delim : ' ';
    return this.split( delim ).map( function(v) { return v.toLowerCaseFirstChar(); } ).join( delim );
};


/**
 * **************** Array ****************
 */

Array.prototype.uniq = function arrayPrototypeUniq() {
    var result = [];
    for( var i = 0; i < this.length; ++i ) {
        var current = this[i];
        if( result.indexOf( current ) === -1 ) {
            result.push( current );
        }
    }
    return result;
};

Array.prototype.dups = function arrayPrototypeUniq() {
    var uniques = [];
    var result = [];
    for( var i = 0; i < this.length; ++i ) {
        var current = this[i];
        if( uniques.indexOf( current ) === -1 ) {
            uniques.push( current );
        } else {
            result.push( current );
        }
    }
    return result;
};

Array.prototype.chunk = function arrayChunk( size ) {
    if( typeof( size ) !== 'number' || size <= 0 ) { // pretty impossible to do anything :)
        return [ this ]; // we return an array consisting of this array.
    }
    var result = [];
    var current;
    for(var i = 0; i < this.length; ++i ) {
        if( i % size === 0 ) { // when 'i' is 0, this is always true, so we start by creating one.
            current = [];
            result.push( current );
        }
        current.push( this[i] );
    }
    return result;
};


/**
 * **************** Unbinder ****************
 * Used by MediaWiki.commentOutImage
 */

function Unbinder( string ) {
    if( typeof( string ) !== 'string' ) {
        throw new Error( "not a string" );
    }
    this.content = string;
    this.counter = 0;
    this.history = {};
    this.prefix = '%UNIQ::' + Math.random() + '::';
    this.postfix = '::UNIQ%';
}

Unbinder.prototype = {
    unbind: function UnbinderUnbind( prefix, postfix ) {
        var re = new RegExp( prefix + '(.*?)' + postfix, 'g' );
        this.content = this.content.replace( re, Unbinder.getCallback( this ) );
    },
    rebind: function UnbinderRebind() {
        var content = this.content;
        content.self = this;
        for( var current in this.history ) {
            if( this.history.hasOwnProperty( current ) ) {
                content = content.replace( current, this.history[current] );
            }
        }
        return content;
    },
    prefix: null, // %UNIQ::0.5955981644938324::
    postfix: null, // ::UNIQ%
    content: null, // string
    counter: null, // 0++
    history: null // {}
};

Unbinder.getCallback = function UnbinderGetCallback(self) {
    return function UnbinderCallback( match , a , b ) {
        var current = self.prefix + self.counter + self.postfix;
        self.history[current] = match;
        ++self.counter;
        return current;
    };
};


/**
 * **************** clone() ****************
 * REMOVEME - global namespace pollution -> move to better name, or
 * rework the few usages using jQuery.extend
 */

function clone( obj, deep ) {
    var objectClone = new obj.constructor();
    for ( var property in obj ) {
        if ( !deep ) {
            objectClone[property] = obj[property];
        } else if ( typeof obj[property] === 'object' ) {
            objectClone[property] = clone( obj[property], deep );
        } else {
            objectClone[property] = obj[property];
        }
    }
    return objectClone;
}


/**
 * **************** Namespace ****************
 */

var Namespace = {
    MAIN:           0,
    TALK:           1,
    USER:           2,
    USER_TALK:      3,
    PROJECT:        4,
    PROJECT_TALK:   5,
    IMAGE:          6,
    IMAGE_TALK:     7,
    FILE:           6,
    FILE_TALK:      7,
    MEDIAWIKI:      8,
    MEDIAWIKI_TALK: 9,
    TEMPLATE:       10,
    TEMPLATE_TALK:  11,
    HELP:           12,
    HELP_TALK:      13,
    CATEGORY:       14,
    CATEGORY_TALK:  15,
    PORTAL:         100,
    PORTAL_TALK:    101,
    BOOK:           108,
    BOOK_TALK:      109,
    MEDIA:          -2,
    SPECIAL:        -1,

    "":             0,
    WIKIPEDIA:      4,
    WIKIPEDIA_TALK: 5,
    WP:             4,
    WT:             5
};


/**
 * **************** Date ****************
 * Helper functions to get the month as a string instead of a number
 */

Date.monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

Date.monthNamesAbbrev = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

Date.prototype.getMonthName = function() {
    return Date.monthNames[ this.getMonth() ];
};

Date.prototype.getMonthNameAbbrev = function() {
    return Date.monthNamesAbbrev[ this.getMonth() ];
};

Date.prototype.getUTCMonthName = function() {
    return Date.monthNames[ this.getUTCMonth() ];
};

Date.prototype.getUTCMonthNameAbbrev = function() {
    return Date.monthNamesAbbrev[ this.getUTCMonth() ];
};

/**
 * **************** Wikipedia ****************
 * Accessor functions for wikiediting and api-access
 */

var Wikipedia = {};

Wikipedia.namespaces = {
    '-2':  'Media',
    '-1':  'Special',
    '0':   '',
    '1':   'Talk',
    '2':   'User',
    '3':   'User talk',
    '4':   'Project',
    '5':   'Project talk',
    '6':   'File',
    '7':   'File talk',
    '8':   'MediaWiki',
    '9':   'MediaWiki talk',
    '10':  'Template',
    '11':  'Template talk',
    '12':  'Help',
    '13':  'Help talk',
    '14':  'Category',
    '15':  'Category talk',
    '100': 'Portal',
    '101': 'Portal talk',
    '108': 'Book',
    '109': 'Book talk'
};

Wikipedia.namespacesFriendly = {
    '0':   '(Article)',
    '1':   'Talk',
    '2':   'User',
    '3':   'User talk',
    '4':   'Wikipedia',
    '5':   'Wikipedia talk',
    '6':   'File',
    '7':   'File talk',
    '8':   'MediaWiki',
    '9':   'MediaWiki talk',
    '10':  'Template',
    '11':  'Template talk',
    '12':  'Help',
    '13':  'Help talk',
    '14':  'Category',
    '15':  'Category talk',
    '100': 'Portal',
    '101': 'Portal talk',
    '108': 'Book',
    '109': 'Book talk'
};

// Analyzes the HTML of the current page (i.e. no AJAX requests) to determine if it
// is a redirect or soft redirect
Wikipedia.isPageRedirect = function wikipediaIsPageRedirect() {
    return !!($("span.redirectText").length > 0 || document.getElementById("softredirect"));
};

// we dump all XHR here so they won't loose props
// REMOVEME after Wikipedia.wiki is gone
Wikipedia.dump = [];


/**
 * **************** Wikipedia.actionCompleted ****************
 *
 * Use of Wikipedia.actionCompleted():
 *    Every call to Wikipedia.api.post() results in the dispatch of
 *    an asynchronous callback. Each callback can in turn
 *    make an additional call to Wikipedia.api.post() to continue a
 *    processing sequence. At the conclusion of the final callback
 *    of a processing sequence, it is not possible to simply return to the
 *    original caller because there is no call stack leading back to
 *    the original context. Instead, Wikipedia.actionCompleted.event() is
 *    called to display the result to the user and to perform an optional
 *    page redirect.
 *
 *    The determination of when to call Wikipedia.actionCompleted.event()
 *    is managed through the globals Wikipedia.numberOfActionsLeft and
 *    Wikipedia.nbrOfCheckpointsLeft. Wikipedia.numberOfActionsLeft is
 *    incremented at the start of every Wikipedia.api call and decremented
 *    after the completion of a callback function. If a callback function
 *    does not create a new Wikipedia.api object before exiting, it is the
 *    final step in the processing chain and Wikipedia.actionCompleted.event()
 *    will then be called.
 *
 *    Optionally, callers may use Wikipedia.addCheckpoint() to indicate that
 *    processing is not complete upon the conclusion of the final callback function.
 *    This is used for batch operations. The end of a batch is signaled by calling
 *    Wikipedia.removeCheckpoint().
 */

Wikipedia.numberOfActionsLeft = 0;
Wikipedia.nbrOfCheckpointsLeft = 0;

Wikipedia.actionCompleted = function( self ) {
    if( --Wikipedia.numberOfActionsLeft <= 0 && Wikipedia.nbrOfCheckpointsLeft <= 0 ) {
        Wikipedia.actionCompleted.event( self );
    }
};

// Change per action wanted
Wikipedia.actionCompleted.event = function() {
    new Status( Wikipedia.actionCompleted.notice, Wikipedia.actionCompleted.postfix, 'info' );
    if( Wikipedia.actionCompleted.redirect ) {
        // if it isn't a URL, which is likely, make it one. TODO: This breaks on the articles 'http://', 'ftp://', and similar ones. Are we ever using URL redirects?
        if( !( (/^\w+\:\/\//).test( Wikipedia.actionCompleted.redirect ) ) ) {
            Wikipedia.actionCompleted.redirect = mw.util.wikiGetlink( Wikipedia.actionCompleted.redirect );
            if( Wikipedia.actionCompleted.followRedirect === false ) {
                Wikipedia.actionCompleted.redirect += "?redirect=no";
            }
        }
        window.setTimeout( function() { window.location = Wikipedia.actionCompleted.redirect; }, Wikipedia.actionCompleted.timeOut );
    }
};
var wpActionCompletedTimeOut = typeof(wpActionCompletedTimeOut) === 'undefined' ? 5000 : wpActionCompletedTimeOut;
var wpMaxLag = typeof(wpMaxLag) === 'undefined' ? 10 : wpMaxLag; // Maximum lag allowed, 5-10 is a good value, the higher value, the more agressive.

// editCount - REMOVEME when Wikipedia.wiki is gone
Wikipedia.editCount = 10;

Wikipedia.actionCompleted.timeOut = wpActionCompletedTimeOut;
Wikipedia.actionCompleted.redirect = null;
Wikipedia.actionCompleted.notice = 'Action';
Wikipedia.actionCompleted.postfix = 'completed';

Wikipedia.addCheckpoint = function() {
    ++Wikipedia.nbrOfCheckpointsLeft;
};

Wikipedia.removeCheckpoint = function() {
    if( --Wikipedia.nbrOfCheckpointsLeft <= 0 && Wikipedia.numberOfActionsLeft <= 0 ) {
        Wikipedia.actionCompleted.event();
    }
};

/**
 * **************** Wikipedia.api ****************
 */

/*
 currentAction: text, the current action (required)
 query: Object, the query (required)
 onSuccess: function, the function to call when page gotten
 onError: function, the function to call if an error occurs
 */
Wikipedia.api = function( currentAction, query, onSuccess, statusElement, onError ) {
    this.currentAction = currentAction;
    this.query = query;
    this.query.format = 'xml';
    this.onSuccess = onSuccess;
    this.onError = onError;
    if( statusElement ) {
        this.statelem = statusElement;
        this.statelem.status( currentAction );
    } else {
        this.statelem = new Status( currentAction );
    }
};

Wikipedia.api.prototype = {
    currentAction: '',
    onSuccess: null,
    onError: null,
    parent: window,  // use global context if there is no parent object
    query: null,
    responseXML: null,
    setParent: function(parent) { this.parent = parent; },  // keep track of parent object for callbacks
    statelem: null,  // this non-standard name kept for backwards compatibility
    statusText: null, // result received from the API, normally "success" or "error"
    errorCode: null, // short text error code, if any, as documented in the MediaWiki API
    errorText: null, // full error description, if any

    // post(): carries out the request
    // do not specify a parameter unless you really really want to give jQuery some extra parameters
    post: function( callerAjaxParameters ) {

        ++Wikipedia.numberOfActionsLeft;

        var ajaxparams = $.extend( {}, {
            context: this,
            type: 'POST',
            url: mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/api.php',
            data: QueryString.create(this.query),
            datatype: 'xml',

            success: function(xml, statusText, jqXHR) {
                this.statusText = statusText;
                this.responseXML = xml;
                this.errorCode = $(xml).find('error').attr('code');
                this.errorText = $(xml).find('error').attr('info');

                if (typeof(this.errorCode) === "string") {

                    // the API didn't like what we told it, e.g., bad edit token or an error creating a page
                    this.returnError();
                    return;
                }

                // invoke success callback if one was supplied
                if (this.onSuccess) {

                    // set the callback context to this.parent for new code and supply the API object
                    // as the first argument to the callback (for legacy code)
                    this.onSuccess.call( this.parent, this );
                } else {
                    this.statelem.info("done");
                }

                Wikipedia.actionCompleted();
            },

            // only network and server errors reach here – complaints from the API itself are caught in success()
            error: function(jqXHR, statusText, errorThrown) {
                this.statusText = statusText;
                this.errorThrown = errorThrown; // frequently undefined
                this.errorText = statusText + ' "' + jqXHR.statusText + '" occurred while contacting the API.';
                this.returnError();
            }

        }, callerAjaxParameters );

        return $.ajax( ajaxparams );  // the return value should be ignored, unless using callerAjaxParameters with |async: false|
    },

    returnError: function() {

        // invoke failure callback if one was supplied
        if (this.onError) {

            // set the callback context to this.parent for new code and supply the API object
            // as the first argument to the callback for legacy code
            this.onError.call( this.parent, this );
        } else {
            this.statelem.error( this.errorText );
        }
        // don't complete the action so that the error remains displayed
    },

    getStatusElement: function() {
        return this.statelem;
    },

    getErrorCode: function() {
        return this.errorCode;
    },

    getErrorText: function() {
        return this.errorText;
    },

    getXML: function() {
        return this.responseXML;
    }
};

/**
 * **************** Wikipedia.page ****************
 * Uses the MediaWiki API to load a page and optionally edit it, move it, etc.
 *
 * Callers are not permitted to directly access the properties of this class!
 * All property access is through the appropriate get___() or set___() method.
 *
 * Callers should set Wikipedia.actionCompleted.notice and Wikipedia.actionCompleted.redirect
 * before the first call to Wikipedia.page.load().
 *
 * Each of the callback functions takes one parameter, which is a
 * reference to the Wikipedia.page object that registered the callback.
 * Callback functions may invoke any Wikipedia.page prototype method using this reference.
 *
 * Constructor: Wikipedia.page(pageName, currentAction)
 *    pageName - the name of the page, prefixed by the namespace (if any)
 *               (for the current page, use mw.config.get('wgPageName'))
 *    currentAction - a string describing the action about to be undertaken (optional)
 *
 * load(onSuccess, onFailure): Loads the text for the page
 *    onSuccess - callback function which is called when the load has succeeded
 *    onFailure - callback function which is called when the load fails (optional)
 *                XXX onFailure for load() is not yet implemented – do we need it? -- UncleDouggie
 *                    probably not -- TTO
 *
 * save(onSuccess, onFailure): Saves the text for the page. Must be preceded by calling load().
 *    onSuccess - callback function which is called when the save has succeeded (optional)
 *    onFailure - callback function which is called when the save fails (optional)
 *    Warning: Calling save() can result in additional calls to the previous load() callbacks to
 *             recover from edit conflicts!
 *             In this case, callers must make the same edit to the new pageText and reinvoke save().
 *             This behavior can be disabled with setMaxConflictRetries(0).
 *
 * append(onSuccess, onFailure): Adds the text provided via setAppendText() to the end of the page.
 *                               Does not require calling load() first.
 *    onSuccess - callback function which is called when the method has succeeded (optional)
 *    onFailure - callback function which is called when the method fails (optional)
 *
 * prepend(onSuccess, onFailure): Adds the text provided via setPrependText() to the start of the page.
 *                                Does not require calling load() first.
 *    onSuccess - callback function which is called when the method has succeeded (optional)
 *    onFailure - callback function which is called when the method fails (optional)
 *
 * getPageName(): returns a string containing the name of the loaded page, including the namespace
 *
 * getPageText(): returns a string containing the text of the page after a successful load()
 *
 * setPageText(pageText)
 *    pageText - string containing the updated page text that will be saved when save() is called
 *
 * setAppendText(appendText)
 *    appendText - string containing the text that will be appended to the page when append() is called
 *
 * setPrependText(prependText)
 *    prependText - string containing the text that will be prepended to the page when prepend() is called
 *
 * setEditSummary(summary)
 *    summary - string containing the text of the edit summary that will be used when save() is called
 *
 * setMinorEdit(minorEdit)
 *    minorEdit is a boolean value:
 *       true  - When save is called, the resulting edit will be marked as "minor".
 *       false - When save is called, the resulting edit will not be marked as "minor". (default)
 *
 * setPageSection(pageSection)
 *    pageSection - integer specifying the section number to load or save. The default is |null|, which means
 *                  that the entire page will be retrieved.
 *
 * setMaxConflictRetries(maxRetries)
 *    maxRetries - number of retries for save errors involving an edit conflict or loss of edit token
 *    default: 2
 *
 * setMaxRetries(maxRetries)
 *    maxRetries - number of retries for save errors not involving an edit conflict or loss of edit token
 *    default: 2
 *
 * setCallbackParameters(callbackParameters)
 *    callbackParameters - an object for use in a callback function
 *
 * getCallbackParameters(): returns the object previous set by setCallbackParameters()
 *
 *    Callback notes: callbackParameters is for use by the caller only. The parameters
 *                    allow a caller to pass the proper context into its callback function.
 *                    Callers must ensure that any changes to the callbackParameters object
 *                    within a load() callback still permit a proper re-entry into the
 *                    load() callback if an edit conflict is detected upon calling save().
 *
 * getStatusElement(): returns the Status element created by the constructor
 *
 * setFollowRedirect(followRedirect)
 *    followRedirect is a boolean value:
 *       true  - a maximum of one redirect will be followed.
 *               In the event of a redirect, a message is displayed to the user and
 *               the redirect target can be retrieved with getPageName().
 *       false - the requested pageName will be used without regard to any redirect. (default)
 *
 * setWatchlist(watchlistOption)
 *    watchlistOption is a boolean value:
 *       true  - page will be added to the user's watchlist when save() is called
 *       false - watchlist status of the page will not be changed (default)
 *
 * setWatchlistFromPreferences(watchlistOption)
 *    watchlistOption is a boolean value:
 *       true  - page watchlist status will be set based on the user's
 *               preference settings when save() is called
 *       false - watchlist status of the page will not be changed (default)
 *
 *    Watchlist notes:
 *       1. The MediaWiki API value of 'unwatch', which explicitly removes the page from the
 *          user's watchlist, is not used.
 *       2. If both setWatchlist() and setWatchlistFromPreferences() are called,
 *          the last call takes priority.
 *       3. Twinkle modules should use the appropriate preference to set the watchlist options.
 *       4. Most Twinkle modules use setWatchlist().
 *          setWatchlistFromPreferences() is only needed for the few Twinkle watchlist preferences
 *          that accept a string value of 'default'.
 *
 * setCreateOption(createOption)
 *    createOption is a string value:
 *       'recreate'   - create the page if it does not exist, or edit it if it exists
 *       'createonly' - create the page if it does not exist, but return an error if it
 *                      already exists
 *       'nocreate'   - don't create the page, only edit it if it already exists
 *       null         - create the page if it does not exist, unless it was deleted in the moment
 *                      between retrieving the edit token and saving the edit (default)
 *
 * exists(): returns true if the page existed on the wiki when it was last loaded
 *
 * lookupCreator(onSuccess): Retrieves the username of the user who created the page
 *    onSuccess - callback function which is called when the username is found
 *                within the callback, the username can be retrieved using the getCreator() function
 *
 * getCreator(): returns the user who created the page following lookupCreator()
 *
 * patrol(): marks the page as patrolled (only when "rcid" is present in the query string)
 *
 * move(onSuccess, onFailure): Moves a page to another title
 *
 * deletePage(onSuccess, onFailure): Deletes a page (for admins only)
 *
 */

/**
 * Call sequence for common operations (optional final user callbacks not shown):
 *
 *    Edit current contents of a page (no edit conflict):
 *       .load(userTextEditCallback) -> ctx.loadApi.post() -> ctx.loadApi.post.success() ->
 *             ctx.fnLoadSuccess() -> userTextEditCallback() -> .save() ->
 *             ctx.saveApi.post() -> ctx.loadApi.post.success() -> ctx.fnSaveSuccess()
 *
 *    Edit current contents of a page (with edit conflict):
 *       .load(userTextEditCallback) -> ctx.loadApi.post() -> ctx.loadApi.post.success() ->
 *             ctx.fnLoadSuccess() -> userTextEditCallback() -> .save() ->
 *             ctx.saveApi.post() -> ctx.loadApi.post.success() -> ctx.fnSaveError() ->
 *             ctx.loadApi.post() -> ctx.loadApi.post.success() ->
 *             ctx.fnLoadSuccess() -> userTextEditCallback() -> .save() ->
 *             ctx.saveApi.post() -> ctx.loadApi.post.success() -> ctx.fnSaveSuccess()
 *
 *    Append to a page (similar for prepend):
 *       .append() -> ctx.loadApi.post() -> ctx.loadApi.post.success() ->
 *             ctx.fnLoadSuccess() -> ctx.fnAutoSave() -> .save() ->
 *             ctx.saveApi.post() -> ctx.loadApi.post.success() -> ctx.fnSaveSuccess()
 *
 *    Notes:
 *       1. All functions following Wikipedia.api.post() are invoked asynchronously
 *          from the jQuery AJAX library.
 *       2. The sequence for append/prepend could be slightly shortened, but it would require
 *          significant duplication of code for little benefit.
 */

Wikipedia.page = function(pageName, currentAction) {

    if (!currentAction) {
        currentAction = 'Opening page "' + pageName + '"';
    }

    /**
     * Private context variables
     *
     * This context is not visible to the outside, thus all the data here
     * must be accessed via getter and setter functions.
     */
    var ctx = {
         // backing fields for public properties
        pageName: pageName,
        pageText: null,
        editMode: 'all',  // save() replaces entire contents of the page by default
        appendText: null,   // can't reuse pageText for this because pageText is needed to follow a redirect
        prependText: null,  // can't reuse pageText for this because pageText is needed to follow a redirect
        editSummary: null,
        createOption: null,
        minorEdit: false,
        pageSection: null,
        maxConflictRetries: 2,
        maxRetries: 2,
        callbackParameters: null,
        statusElement: new Status(currentAction),
        followRedirect: false,
        watchlistOption: 'nochange',
        pageExists: false,
        creator: null,
        revertOldID: null,
        moveDestination: null,
        moveTalkPage: false,
        moveSubpages: false,
        moveSuppressRedirect: false,
        protectEdit: null,
        protectMove: null,
        protectCreate: null,
        protectCascade: false,
         // internal status
        pageLoaded: false,
        editToken: null,
        loadTime: null,
        lastEditTime: null,
        revertCurID: null,
        revertUser: null,
        fullyProtected: false,
        conflictRetries: 0,
        retries: 0,
         // callbacks
        onLoadSuccess: null,
        onLoadFailure: null,
        onSaveSuccess: null,
        onSaveFailure: null,
        onLookupCreatorSuccess: null,
        onMoveSuccess: null,
        onMoveFailure: null,
        onDeleteSuccess: null,
        onDeleteFailure: null,
        onProtectSuccess: null,
        onProtectFailure: null,
         // internal objects
        loadQuery: null,
        loadApi: null,
        saveApi: null,
        lookupCreatorApi: null,
        moveApi: null,
        moveProcessApi: null,
        deleteApi: null,
        deleteProcessApi: null,
        protectApi: null,
        protectProcessApi: null
    };

    /**
     * Public interface accessors
     */
    this.getPageName = function() {
        return ctx.pageName;
    };

    this.getPageText = function() {
        return ctx.pageText;
    };

    this.setPageText = function(pageText) {
        ctx.editMode = 'all';
        ctx.pageText = pageText;
    };

    this.setAppendText = function(appendText) {
        ctx.editMode = 'append';
        ctx.appendText = appendText;
    };

    this.setPrependText = function(prependText) {
        ctx.editMode = 'prepend';
        ctx.prependText = prependText;
    };

    this.setEditSummary = function(summary) {
        ctx.editSummary = summary;
    };

    this.setCreateOption = function(createOption) {
        ctx.createOption = createOption;
    };

    this.setMinorEdit = function(minorEdit) {
        ctx.minorEdit = minorEdit;
    };

    this.setPageSection = function(pageSection) {
        ctx.pageSection = pageSection;
    };

    this.setMaxConflictRetries = function(maxRetries) {
        ctx.maxConflictRetries = maxRetries;
    };

    this.setMaxRetries = function(maxRetries) {
        ctx.maxRetries = maxRetries;
    };

    this.setCallbackParameters = function(callbackParameters) {
        ctx.callbackParameters = callbackParameters;
    };

    this.getCallbackParameters = function() {
        return ctx.callbackParameters;
    };

    this.getCreator = function() {
        return ctx.creator;
    };

    this.setOldID = function(oldID) {
        ctx.revertOldID = oldID;
    };

    this.getRevisionUser = function() {
        return ctx.revertUser;
    };

    this.setMoveDestination = function(destination) {
        ctx.moveDestination = destination;
    };

    this.setMoveTalkPage = function(flag) {
        ctx.moveTalkPage = !!flag;
    };

    this.setMoveSubpages = function(flag) {
        ctx.moveSubpages = !!flag;
    };

    this.setMoveSuppressRedirect = function(flag) {
        ctx.moveSuppressRedirect = !!flag;
    };

    this.setEditProtection = function(level, expiry) {
        ctx.protectEdit = { level: level, expiry: expiry };
    };

    this.setMoveProtection = function(level, expiry) {
        ctx.protectMove = { level: level, expiry: expiry };
    };

    this.setCreateProtection = function(level, expiry) {
        ctx.protectCreate = { level: level, expiry: expiry };
    };

    this.setCascadingProtection = function(flag) {
        ctx.protectCascade = !!flag;
    };

    this.getStatusElement = function() {
        return ctx.statusElement;
    };

    this.setFollowRedirect = function(followRedirect) {
        if (ctx.pageLoaded) {
            ctx.statusElement.error("Internal error: cannot change redirect setting after the page has been loaded!");
            return;
        }
        ctx.followRedirect = followRedirect;
    };

    this.setWatchlist = function(flag) {
        if (flag) {
            ctx.watchlistOption = 'watch';
        } else {
            ctx.watchlistOption = 'nochange';
        }
    };

    this.setWatchlistFromPreferences = function(flag) {
        if (flag) {
            ctx.watchlistOption = 'preferences';
        } else {
            ctx.watchlistOption = 'nochange';
        }
    };

    this.exists = function() {
        return ctx.pageExists;
    };

    this.load = function(onSuccess, onFailure) {
        ctx.onLoadSuccess = onSuccess;
        ctx.onLoadFailure = onFailure;

        // Need to be able to do something after the page loads
        if (!onSuccess) {
            ctx.statusElement.error("Internal error: no onSuccess callback provided to load()!");
            return;
        }

        ctx.loadQuery = {
            action: 'query',
            prop: 'info|revisions',
            intoken: 'edit',  // fetch an edit token
            titles: ctx.pageName
            // don't need rvlimit=1 because we don't need rvstartid here and only one actual rev is returned by default
        };

        if (ctx.editMode === 'all') {
            ctx.loadQuery.rvprop = 'content';  // get the page content at the same time, if needed
        } else if (ctx.editMode === 'revert') {
            ctx.loadQuery.rvlimit = 1;
            ctx.loadQuery.rvstartid = ctx.revertOldID;
        }

        if (ctx.followRedirect) {
            ctx.loadQuery.redirects = '';  // follow all redirects
        }
        if (typeof(ctx.pageSection) === 'number') {
            ctx.loadQuery.rvsection = ctx.pageSection;
        }
        if (userIsInGroup('sysop')) {
            ctx.loadQuery.inprop = 'protection';
        }

        ctx.loadApi = new Wikipedia.api("Retrieving page...", ctx.loadQuery, fnLoadSuccess, ctx.statusElement);
        ctx.loadApi.setParent(this);
        ctx.loadApi.post();
    };

    // Save updated .pageText to Wikipedia
    // Only valid after successful .load()
    this.save = function(onSuccess, onFailure) {
        if (!ctx.pageLoaded) {
            ctx.statusElement.error("Internal error: attempt to save a page that has not been loaded!");
            return;
        }
        if (!ctx.editSummary) {
            ctx.statusElement.error("Internal error: edit summary not set before save!");
            return;
        }

        if (ctx.fullyProtected && !confirm('An automated edit to the fully protected page "' + ctx.pageName +
            (ctx.fullyProtected === 'indefinite' ? '" (protected indefinitely)' : ('" (protection expiring ' + ctx.fullyProtected + ')')) +
            ' is about to be made.  \n\nClick OK to proceed with the edit, or Cancel to skip this edit.')) {
            ctx.statusElement.error("Edit to fully protected page was aborted.");
            return;
        }

        ctx.onSaveSuccess = onSuccess;
        ctx.onSaveFailure = onFailure;
        ctx.retries = 0;

        var query = {
            action: 'edit',
            title: ctx.pageName,
            summary: ctx.editSummary,
            token: ctx.editToken,
            watchlist: ctx.watchlistOption
        };

        if (typeof(ctx.pageSection) === 'number') {
            query.section = ctx.pageSection;
        }

        // Set minor edit attribute. If these parameters are present with any value, it is interpreted as true
        if (ctx.minorEdit) {
            query.minor = true;
        } else {
            query.notminor = true;  // force Twinkle config to override user preference setting for "all edits are minor"
        }

        switch (ctx.editMode) {
        case 'append':
            query.appendtext = ctx.appendText;  // use mode to append to current page contents
            break;
        case 'prepend':
            query.prependtext = ctx.prependText;  // use mode to prepend to current page contents
            break;
        case 'revert':
            query.undo = ctx.revertCurID;
            query.undoafter = ctx.revertOldID;
            if (ctx.lastEditTime) {
                query.basetimestamp = ctx.lastEditTime; // check that page hasn't been edited since it was loaded
            }
            query.starttimestamp = ctx.loadTime; // check that page hasn't been deleted since it was loaded (don't recreate bad stuff)
            break;
        default:
            query.text = ctx.pageText; // replace entire contents of the page
            if (ctx.lastEditTime) {
                query.basetimestamp = ctx.lastEditTime; // check that page hasn't been edited since it was loaded
            }
            query.starttimestamp = ctx.loadTime; // check that page hasn't been deleted since it was loaded (don't recreate bad stuff)
            break;
        }

        if (['recreate', 'createonly', 'nocreate'].indexOf(ctx.createOption) !== -1) {
            query[ctx.createOption] = '';
        }

        ctx.saveApi = new Wikipedia.api( "Saving page...", query, fnSaveSuccess, ctx.statusElement, fnSaveError);
        ctx.saveApi.setParent(this);
        ctx.saveApi.post();
    };

    this.append = function(onSuccess, onFailure) {
        ctx.editMode = 'append';
        ctx.onSaveSuccess = onSuccess;
        ctx.onSaveFailure = onFailure;
        this.load(fnAutoSave, onFailure);
    };

    this.prepend = function(onSuccess, onFailure) {
        ctx.editMode = 'prepend';
        ctx.onSaveSuccess = onSuccess;
        ctx.onSaveFailure = onFailure;
        this.load(fnAutoSave, onFailure);
    };

    this.lookupCreator = function(onSuccess) {
        if (!onSuccess) {
            ctx.statusElement.error("Internal error: no onSuccess callback provided to lookupCreator()!");
            return;
        }
        ctx.onLookupCreatorSuccess = onSuccess;

        var query = {
            'action': 'query',
            'prop': 'revisions',
            'titles': ctx.pageName,
            'rvlimit': 1,
            'rvprop': 'user',
            'rvdir': 'newer'
        };
        
        if (ctx.followRedirect) {
            query.redirects = '';  // follow all redirects
        }
        
        ctx.lookupCreatorApi = new Wikipedia.api("Retrieving page creator information", query, fnLookupCreatorSuccess, ctx.statusElement);
        ctx.lookupCreatorApi.setParent(this);
        ctx.lookupCreatorApi.post();
    };

    this.patrol = function() {
        // look for rcid in querystring; if not, we won't have a patrol token, so no point trying
        if (!QueryString.exists("rcid")) {
            return;
        }
        var rcid = QueryString.get("rcid");

        // extract patrol token from "Mark page as patrolled" link on page
        var patrollinkmatch = /token=(.+)%2B%5C$/.exec($(".patrollink a").attr("href"));
        if (patrollinkmatch) {
            var patroltoken = patrollinkmatch[1] + "+\\";
            var patrolstat = new Status("Marking page as patrolled");

            var wikipedia_api = new Wikipedia.api("doing...", {
                title: ctx.pageName,
                action: 'markpatrolled',
                rcid: rcid,
                token: patroltoken
            }, null, patrolstat);
            wikipedia_api.post({
                type: 'GET',
                url: mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php',
                datatype: 'text'  // we don't really care about the response
            });
        }
    };

    this.revert = function(onSuccess, onFailure) {
        if (!ctx.revertOldID) {
            ctx.statusElement.error("Internal error: revision ID to revert to was not set before revert!");
            return;
        }
        ctx.editMode = 'revert';
        ctx.onSaveSuccess = onSuccess;
        ctx.onSaveFailure = onFailure;
        this.load(fnAutoSave, onFailure);
    };

    this.move = function(onSuccess, onFailure) {
        if (!ctx.editSummary) {
            ctx.statusElement.error("Internal error: move reason not set before move (use setEditSummary function)!");
            return;
        }
        if (!ctx.moveDestination) {
            ctx.statusElement.error("Internal error: destination page name was not set before move!");
            return;
        }

        ctx.onMoveSuccess = onSuccess;
        ctx.onMoveFailure = onFailure;

        var query = {
            action: 'query',
            prop: 'info',
            intoken: 'move',
            titles: ctx.pageName
        };
        if (ctx.followRedirect) {
            query.redirects = '';  // follow all redirects
        }
        if (userIsInGroup('sysop')) {
            query.inprop = 'protection';
        }

        ctx.moveApi = new Wikipedia.api("retrieving move token...", query, fnProcessMove, ctx.statusElement);
        ctx.moveApi.setParent(this);
        ctx.moveApi.post();
    };

    // |delete| is a reserved word in some flavours of JS
    this.deletePage = function(onSuccess, onFailure) {
        // if a non-admin tries to do this, don't bother
        if (!userIsInGroup('sysop')) {
            ctx.statusElement.error("Cannot delete page: only admins can do that");
            return;
        }
        if (!ctx.editSummary) {
            ctx.statusElement.error("Internal error: delete reason not set before delete (use setEditSummary function)!");
            return;
        }

        ctx.onDeleteSuccess = onSuccess;
        ctx.onDeleteFailure = onFailure;

        var query = {
            action: 'query',
            prop: 'info',
            inprop: 'protection',
            intoken: 'delete',
            titles: ctx.pageName
        };
        if (ctx.followRedirect) {
            query.redirects = '';  // follow all redirects
        }

        ctx.deleteApi = new Wikipedia.api("retrieving delete token...", query, fnProcessDelete, ctx.statusElement);
        ctx.deleteApi.setParent(this);
        ctx.deleteApi.post();
    };

    this.protect = function(onSuccess, onFailure) {
        // if a non-admin tries to do this, don't bother
        if (!userIsInGroup('sysop')) {
            ctx.statusElement.error("Cannot protect page: only admins can do that");
            return;
        }
        if (!ctx.protectEdit && !ctx.protectMove && !ctx.protectCreate) {
            ctx.statusElement.error("Internal error: you must set edit and/or move and/or create protection before calling protect()!");
            return;
        }
        if (!ctx.editSummary) {
            ctx.statusElement.error("Internal error: protection reason not set before protect (use setEditSummary function)!");
            return;
        }

        ctx.onProtectSuccess = onSuccess;
        ctx.onProtectFailure = onFailure;

        var query = {
            action: 'query',
            prop: 'info',
            inprop: 'protection',
            intoken: 'protect',
            titles: ctx.pageName
        };
        if (ctx.followRedirect) {
            query.redirects = '';  // follow all redirects
        }

        ctx.protectApi = new Wikipedia.api("retrieving protect token...", query, fnProcessProtect, ctx.statusElement);
        ctx.protectApi.setParent(this);
        ctx.protectApi.post();
    };

    /**
     * Private member functions
     *
     * These are not exposed outside
     */

    // callback from loadSuccess() for append() and prepend() threads
    var fnAutoSave = function(pageobj) {
        pageobj.save(ctx.onSaveSuccess, ctx.onSaveFailure);
    };

    // callback from loadApi.post()
    var fnLoadSuccess = function() {
        var xml = ctx.loadApi.getXML();

        if ( !fnCheckPageName(xml) ) {
            return; // abort
        }

        ctx.pageExists = ($(xml).find('page').attr('missing') !== "");
        if (ctx.pageExists) {
            ctx.pageText = $(xml).find('rev').text();
        } else {
            ctx.pageText = '';  // allow for concatenation, etc.
        }

        // extract protection info, to alert admins when they are about to edit a protected page
        if (userIsInGroup('sysop')) {
            var editprot = $(xml).find('pr[type="edit"]');
            if (editprot.length > 0 && editprot.attr('level') === 'sysop') {
                ctx.fullyProtected = editprot.attr('expiry');
            } else {
                ctx.fullyProtected = false;
            }
        }

        ctx.editToken = $(xml).find('page').attr('edittoken');
        if (!ctx.editToken)
        {
            ctx.statusElement.error("Failed to retrieve edit token.");
            return;
        }
        ctx.loadTime = $(xml).find('page').attr('starttimestamp');
        if (!ctx.loadTime)
        {
            ctx.statusElement.error("Failed to retrieve start timestamp.");
            return;
        }
        ctx.lastEditTime = $(xml).find('page').attr('touched');

        if (ctx.editMode === 'revert') {
            ctx.revertCurID = $(xml).find('rev').attr('revid');
            if (!ctx.revertCurID) {
                ctx.statusElement.error("Failed to retrieve current revision ID.");
                return;
            }
            ctx.revertUser = $(xml).find('rev').attr('user');
            if (!ctx.revertUser) {
                if ($(xml).find('rev').attr('userhidden') === "") {  // username was RevDel'd or oversighted
                    ctx.revertUser = "<username hidden>";
                } else {
                    ctx.statusElement.error("Failed to retrieve user who made the revision.");
                    return;
                }
            }
            // set revert edit summary
            ctx.editSummary = "[[Help:Revert|Reverted]] to revision " + ctx.revertOldID + " by " + ctx.revertUser + ": " + ctx.editSummary;
        }

        ctx.pageLoaded = true;

        // alert("Generate edit conflict now");  // for testing edit conflict recovery logic
        ctx.onLoadSuccess(this);  // invoke callback
    };

    // helper function to parse the page name returned from the API
    var fnCheckPageName = function(xml) {
    
        // check for invalid titles
        if ( $(xml).find('page').attr('invalid') ) {
            ctx.statusElement.error("Attempt to edit a page with invalid title: " + ctx.pageName);
            return false; // abort
        }

        // retrieve actual title of the page after normalization and redirects
        if ( $(xml).find('page').attr('title') ) {
            var resolvedName = $(xml).find('page').attr('title');
            
            // only notify user for redirects, not normalization
            if ( $(xml).find('redirects').length > 0 ) {
                Status.info("Info", "Redirected from " + ctx.pageName + " to " + resolvedName );
            }
            ctx.pageName = resolvedName;  // always update in case of normalization
        }
        else {
            // could be a circular redirect or other problem
            ctx.statusElement.error("Could not resolve redirects for: " + ctx.pageName);

            // force error to stay on the screen
            ++Wikipedia.numberOfActionsLeft;
            return false; // abort
        }
        return true; // all OK
    };

    // callback from saveApi.post()
    var fnSaveSuccess = function() {
        ctx.editMode = 'all';  // cancel append/prepend/revert modes
        var xml = ctx.saveApi.getXML();

        // see if the API thinks we were successful
        if ($(xml).find('edit').attr('result') === "Success") {
        
            // real success
            if (ctx.onSaveSuccess) {
                ctx.onSaveSuccess(this);  // invoke callback
            } else {
                // default on success action - display link for edited page
                var link = document.createElement('a');
                link.setAttribute('href', mw.util.wikiGetlink(ctx.pageName) );
                link.appendChild(document.createTextNode(ctx.pageName));
                ctx.statusElement.info(['completed (', link, ')']);
            }
            return;
        }
        
        // errors here are only generated by extensions which hook APIEditBeforeSave within MediaWiki
        // Wikimedia wikis should only return spam blacklist errors and captchas
        var blacklist = $(xml).find('edit').attr('spamblacklist');

        if (blacklist) {
            var code = document.createElement('code');
            code.style.fontFamily = "monospace";
            code.appendChild(document.createTextNode(blacklist));
            ctx.statusElement.error(['Could not save the page because the URL ', code, ' is on the spam blacklist.']);
        }
        else if ( $(xml).find('captcha').length > 0 ) {
            ctx.statusElement.error("Could not save the page because the wiki server wanted you to fill out a CAPTCHA.");
        }
        else {
            ctx.statusElement.error("Unknown error received from API while saving page");
        }
        
        // force error to stay on the screen
        ++Wikipedia.numberOfActionsLeft;
    };

    // callback from saveApi.post()
    var fnSaveError = function() {

        var errorCode = ctx.saveApi.getErrorCode();

        // check for edit conflict
        if ( errorCode === "editconflict" && ctx.conflictRetries++ < ctx.maxConflictRetries ) {
            
            // edit conflicts can occur when the page needs to be purged from the server cache
            var purgeQuery = {
                action: 'purge',
                titles: ctx.pageName  // redirects are already resolved
            };

            var purgeApi = new Wikipedia.api("Edit conflict detected, purging server cache", purgeQuery, null, ctx.statusElement);
            var result = purgeApi.post( { async: false } );  // just wait for it, result is for debugging

            --Wikipedia.numberOfActionsLeft;  // allow for normal completion if retry succeeds
            
            ctx.statusElement.info("Edit conflict detected, reapplying edit");
            ctx.loadApi.post(); // reload the page and reapply the edit

        // check for loss of edit token
        // it's impractical to request a new token here, so invoke edit conflict logic when this happens
        } else if ( errorCode === "notoken" && ctx.conflictRetries++ < ctx.maxConflictRetries ) {
            
            ctx.statusElement.info("Edit token is invalid, retrying");
            --Wikipedia.numberOfActionsLeft;  // allow for normal completion if retry succeeds
            ctx.loadApi.post(); // reload

        // check for network or server error
        } else if ( errorCode === "undefined" && ctx.retries++ < ctx.maxRetries ) {

            // the error might be transient, so try again
            ctx.statusElement.info("Save failed, retrying");
            --Wikipedia.numberOfActionsLeft;  // allow for normal completion if retry succeeds
            ctx.saveApi.post(); // give it another go!

        // hard error, give up
        } else {

            // non-admin attempting to edit a protected page - this gives a friendlier message than the default
            if ( errorCode === "protectedpage" ) {
                ctx.statusElement.error( "Failed to save edit: Page is fully protected" );
            } else {
                ctx.statusElement.error( "Failed to save edit: " + ctx.saveApi.getErrorText() );
            }
            ctx.editMode = 'all';  // cancel append/prepend/revert modes
            if (ctx.onSaveFailure) {
                ctx.onSaveFailure(this);  // invoke callback
            }
        }
    };

    var fnLookupCreatorSuccess = function() {
        var xml = ctx.lookupCreatorApi.getXML();
        
        if ( !fnCheckPageName(xml) ) {
            return; // abort
        }

        ctx.creator = $(xml).find('rev').attr('user');
        if (!ctx.creator) {
            ctx.statusElement.error("Could not find name of page creator");
            return;
        }
        ctx.onLookupCreatorSuccess(this);
    };

    var fnProcessMove = function() {
        var xml = ctx.moveApi.getXML();

        if ($(xml).find('page').attr('missing') === "") {
            ctx.statusElement.error("Cannot move the page, because it no longer exists");
            return;
        }

        // extract protection info
        if (userIsInGroup('sysop')) {
            var editprot = $(xml).find('pr[type="edit"]');
            if (editprot.length > 0 && editprot.attr('level') === 'sysop' && !confirm('You are about to move the fully protected page "' + ctx.pageName +
                (editprot.attr('expiry') === 'indefinite' ? '" (protected indefinitely)' : ('" (protection expiring ' + editprot.attr('expiry') + ')')) +
                '.  \n\nClick OK to proceed with the move, or Cancel to skip this move.')) {
                ctx.statusElement.error("Move of fully protected page was aborted.");
                return;
            }
        }

        var moveToken = $(xml).find('page').attr('movetoken');
        if (!moveToken) {
            ctx.statusElement.error("Failed to retrieve delete token.");
            return;
        }

        var query = {
            'action': 'move',
            'from': $(xml).find('page').attr('title'),
            'to': ctx.moveDestination,
            'token': moveToken,
            'reason': ctx.editSummary
        };
        if (ctx.moveTalkPage) {
            query.movetalk = 'true';
        }
        if (ctx.moveSubpages) {
            query.movesubpages = 'true';  // XXX don't know whether this works for non-admins
        }
        if (ctx.moveSuppressRedirect) {
            query.noredirect = 'true';
        }
        if (ctx.watchlistOption === 'watch') {
            query.watch = 'true';
        }

        ctx.moveProcessApi = new Wikipedia.api("moving page...", query, ctx.onMoveSuccess, ctx.statusElement, ctx.onMoveFailure);
        ctx.moveProcessApi.setParent(this);
        ctx.moveProcessApi.post();
    };

    var fnProcessDelete = function() {
        var xml = ctx.deleteApi.getXML();

        if ($(xml).find('page').attr('missing') === "") {
            ctx.statusElement.error("Cannot delete the page, because it no longer exists");
            return;
        }

        // extract protection info
        var editprot = $(xml).find('pr[type="edit"]');
        if (editprot.length > 0 && editprot.attr('level') === 'sysop' && !confirm('You are about to delete the fully protected page "' + ctx.pageName +
            (editprot.attr('expiry') === 'indefinite' ? '" (protected indefinitely)' : ('" (protection expiring ' + editprot.attr('expiry') + ')')) +
            '.  \n\nClick OK to proceed with the deletion, or Cancel to skip this deletion.')) {
            ctx.statusElement.error("Deletion of fully protected page was aborted.");
            return;
        }

        var deleteToken = $(xml).find('page').attr('deletetoken');
        if (!deleteToken) {
            ctx.statusElement.error("Failed to retrieve delete token.");
            return;
        }

        var query = {
            'action': 'delete',
            'title': $(xml).find('page').attr('title'),
            'token': deleteToken,
            'reason': ctx.editSummary
        };
        if (ctx.watchlistOption === 'watch') {
            query.watch = 'true';
        }

        ctx.deleteProcessApi = new Wikipedia.api("deleting page...", query, ctx.onDeleteSuccess, ctx.statusElement, ctx.onDeleteFailure);
        ctx.deleteProcessApi.setParent(this);
        ctx.deleteProcessApi.post();
    };

    var fnProcessProtect = function() {
        var xml = ctx.protectApi.getXML();

        if ($(xml).find('page').attr('missing') === "") {
            ctx.statusElement.error("Cannot protect the page, because it no longer exists");
            return;
        }

        var editprot = $(xml).find('pr[type="edit"]');
        // cascading protection not possible on edit<sysop
        // XXX fix this logic - I can't wrap my head around it
        //if (ctx.protectCascade && (editprot && editprot.attr('level') !== 'sysop') && (ctx.protectEdit && ctx.protectEdit.level !== 'sysop')) {
        //    ctx.statusElement.error("Internal error: cascading protection requires sysop-level edit protection!");
        //    return;
        //}

        var protectToken = $(xml).find('page').attr('protecttoken');
        if (!protectToken) {
            ctx.statusElement.error("Failed to retrieve protect token.");
            return;
        }

        var protections = '', expiry = '';
        if (ctx.protectEdit) {
            protections += 'edit=' + ctx.protectEdit.level;
            expiry += ctx.protectEdit.expiry;
        }
        if (ctx.protectMove) {
            if (ctx.protectEdit) {
                protections += '|';
                expiry += '|';
            }
            protections += 'move=' + ctx.protectMove.level;
            expiry += ctx.protectMove.expiry;
        }
        if (ctx.protectCreate) {
            if (ctx.protectEdit || ctx.protectMove) {
                protections += '|';
                expiry += '|';
            }
            protections += 'create=' + ctx.protectCreate.level;
            expiry += ctx.protectCreate.expiry;
        }
        var query = {
            action: 'protect',
            title: $(xml).find('page').attr('title'),
            token: protectToken,
            protections: protections,
            expiry: expiry,
            reason: ctx.editSummary
        };
        if (ctx.protectCascade) {
            query.cascade = 'true';
        }
        if (ctx.watchlistOption === 'watch') {
            query.watch = 'true';
        }

        ctx.protectProcessApi = new Wikipedia.api("protecting page...", query, ctx.onProtectSuccess, ctx.statusElement, ctx.onProtectFailure);
        ctx.protectProcessApi.setParent(this);
        ctx.protectProcessApi.post();
    };
}; // end Wikipedia.page

/** Wikipedia.page TODO: (XXX)
 * - Do we need the onFailure callbacks? How do we know when to call them? Timeouts? Enhance Wikipedia.api for failures?
 * - Should we retry loads also?
 * - Need to reset current action before the save?
 * - Deal with action.completed stuff
 * - Need to reset all parameters once done (e.g. edit summary, move destination, etc.)
 */


/**
 * **************** Wikipedia.wiki ****************
 * REMOVEME - but *only* after Twinkle no longer uses it
 */

/*
 currentAction: text, the current action (required)
 query: Object, the query (required)
 oninit: function, the function to call when page gotten (required)
 onsuccess: function, a function to call when post succeeded
 onerror: function, a function to call when we abort failed posts
 onretry: function, a function to call when we try to retry a post
 */
Wikipedia.wiki = function( currentAction, query, oninit, onsuccess, onerror, onretry ) {

    var node = document.createElement("div");
    node.style.background = "#F9F9F9";
    node.style.border = "1px solid maroon";
    node.style.padding = "0.6em 0.8em";
    node.style.margin = "0.5em";
    node.style.fontSize = "small";
    node.innerHTML = "<b>This user script is using the deprecated \"Wikipedia.wiki\" class to edit the wiki. " +
        "It may cease to function in the near future.</b><br />Please pass this message on to the script's maintainer, to ensure the script is upgraded.<br />" +
        "(The developers of Twinkle are happy to assist script maintainers with updating scripts.)";
    Status.warn(currentAction, [ node ]);

    this.currentAction = currentAction;
    this.query = query;
    this.oninit = oninit;
    this.onsuccess = onsuccess;
    this.onerror = onerror;
    this.onretry = onretry;
    this.statelem = new Status( currentAction );
    ++Wikipedia.numberOfActionsLeft;
};

Wikipedia.wiki.prototype = {
    currentAction: '',
    onsuccess: null,
    onerror: null,
    onretry: null,
    oninit: null,
    query: null,
    postData: null,
    responseXML: null,
    statelem: null,
    counter: 0,
    post: function( data ) {
        this.postData = data;
        if( Wikipedia.editCount <= 0 ) {
            this.query['maxlag'] = wpMaxLag; // are we a bot?
        } else {
            --Wikipedia.editCount;
        }

        var xmlhttp = sajax_init_object();
        Wikipedia.dump.push( xmlhttp );
        xmlhttp.obj = this;
        xmlhttp.overrideMimeType('text/xml');
        xmlhttp.open( 'POST' , mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?useskin=monobook&' + QueryString.create( this.query ), true);
        xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xmlhttp.onerror = function(e) {
            this.obj.statelem.error( "Error " + this.status + " occurred while posting the document." );
        };
        xmlhttp.onload = function(e) {
            var self = this.obj;
            var status = this.status;
            if( status !== 200 ) {
                if( status === 503 ) {
                    var retry = this.getResponseHeader( 'Retry-After' );
                    var lag = this.getResponseHeader( 'X-Database-Lag' );
                    if( lag ) {
                        self.statelem.warn( "current lag of " + lag + " seconds is more than our defined maximum lag of " + wpMaxLag + " seconds, will retry in " + retry + " seconds" );
                        window.setTimeout( function( self ) { self.post( self.postData ); }, retry * 1000, self );
                        return;
                    } else {
                        self.statelem.error( "Error " + status + " occurred while posting the document." );
                    }
                }
                return;
            }
            var xmlDoc;
            xmlDoc = self.responseXML = this.responseXML;
            var xpathExpr =  'boolean(//div[@class=\'previewnote\']/p/strong[contains(.,\'Sorry! We could not process your edit due to a loss of session data\')])';
            var nosession = xmlDoc.evaluate( xpathExpr, xmlDoc, null, XPathResult.BOOLEAN_TYPE, null ).booleanValue;
            if( nosession ) {
                // Grabbing the shipping token, and repost
                var new_token = xmlDoc.evaluate( '//input[@name="wfEditToken"]/@value', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
                self.postData['wfEditToken'] = new_token;
                self.post( self.postData );
            } else {
                if( self.onsuccess ) {
                    self.onsuccess( self );
                } else {
                    var link = document.createElement( 'a' );
                    link.setAttribute( 'href', mw.util.wikiGetlink(self.query['title']) );
                    link.setAttribute( 'title', self.query['title'] );
                    link.appendChild( document.createTextNode( self.query['title'] ) );

                    self.statelem.info( [ 'completed (' , link , ')' ] );
                }
                Wikipedia.actionCompleted();
            }
        };
        xmlhttp.send( QueryString.create( this.postData ) );
    },
    get: function() {
        this.onloading( this );
        var redirect_query = {
            'action': 'query',
            'titles': this.query['title'],
            'redirects': ''
        };

        var wikipedia_api = new Wikipedia.api( "resolving eventual redirect", redirect_query, this.postget, this.statelem );
        wikipedia_api.parent = this;
        wikipedia_api.post();
    },
    // note: this was updated in April 2011 to work with the revamped Wikipedia.api class.
    // This was done so a lot of user scripts that use morebits didn't break down.
    // But some deprecated technologies, like XPath and sajax, were kept intentionally, to
    // discourage future consumers, and to not widen compatibility (i.e. doesn't work in IE9).
    postget: function(apiobj) {
        var xmlDoc = apiobj.getXML();
        var to = xmlDoc.evaluate( '//redirects/r/@to', xmlDoc, null, XPathResult.STRING_TYPE, null ).stringValue;
        if( !this.followRedirect ) {
            this.statelem.info('ignoring eventual redirect');
        } else if( to ) {
            this.query['title'] = to;
        }
        this.onloading( this );
        var xmlhttp = sajax_init_object();
        Wikipedia.dump.push( xmlhttp );
        xmlhttp.obj = this;
        xmlhttp.overrideMimeType('text/xml');
        xmlhttp.open( 'GET' , mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?useskin=monobook&' + QueryString.create( this.query ), true);
        xmlhttp.onerror = function() {
            this.obj.statelem.error( "Error " + this.status + " occurred while receiving the document." );
        };
        xmlhttp.onload = function() {
            this.obj.onloaded( this.obj );
            this.obj.responseXML = this.responseXML;
            this.obj.responseText = this.responseText;
            this.obj.oninit( this.obj );
        };
        xmlhttp.send( null );
    },
    onloading: function() {
        this.statelem.status( 'loading data...' );
    },
    onloaded: function() {
        this.statelem.status( 'data loaded...' );
    }
};


/**
 * **************** Number ****************
 * REMOVEME - unused?
 */

Number.prototype.zeroFill = function( length ) {
    var str = this.toFixed();
    if( !length ) { return str; }
    while( str.length < length ) { str = '0' + str; }
    return str;
};


/**
 * **************** MediaWiki ****************
 * Wikitext manipulation
 */

var Mediawiki = {};

Mediawiki.Template = {
    parse: function( text, start ) {
        var count = -1;
        var level = -1;
        var equals = -1;
        var current = '';
        var result = {
            name: '',
            parameters: {}
        };
        var key, value;

        for( var i = start; i < text.length; ++i ) {
            var test3 = text.substr( i, 3 );
            if( test3 === '{{{' ) {
                current += '{{{';
                i += 2;
                ++level;
                continue;
            }
            if( test3 === '}}}' ) {
                current += '}}}';
                i += 2;
                --level;
                continue;
            }
            var test2 = text.substr( i, 2 );
            if( test2 === '{{' || test2 === '[[' ) {
                current += test2;
                ++i;
                ++level;
                continue;
            }
            if( test2 === '[[' ) {
                current += test2;
                ++i;
                --level;
                continue;
            }
            if( test2 === '}}' ) {
                current += test2;
                ++i;
                --level;

                if( level <= 0 ) {
                    if( count === -1 ) {
                        result.name = current.substring(2).trim();
                        ++count;
                    } else {
                        if( equals !== -1 ) {
                            key = current.substring( 0, equals ).trim();
                            value = current.substring( equals ).trim();
                            result.parameters[key] = value;
                            equals = -1;
                        } else {
                            result.parameters[count] = current;
                            ++count;
                        }
                    }
                    break;
                }
                continue;
            }

            if( text.charAt(i) === '|' && level <= 0 ) {
                if( count === -1 ) {
                    result.name = current.substring(2).trim();
                    ++count;
                } else {
                    if( equals !== -1 ) {
                        key = current.substring( 0, equals ).trim();
                        value = current.substring( equals + 1 ).trim();
                        result.parameters[key] = value;
                        equals = -1;
                    } else {
                        result.parameters[count] = current;
                        ++count;
                    }
                }
                current = '';
            } else if( equals === -1 && text.charAt(i) === '=' && level <= 0 ) {
                equals = current.length;
                current += text.charAt(i);
            } else {
                current += text.charAt(i);
            }
        }

        return result;
    }
};

Mediawiki.Page = function mediawikiPage( text ) {
    this.text = text;
};

Mediawiki.Page.prototype = {
    text: '',
    removeLink: function( link_target ) {
        var first_char = link_target.substr( 0, 1 );
        var link_re_string = "[" + first_char.toUpperCase() + first_char.toLowerCase() + ']' +  RegExp.escape( link_target.substr( 1 ), true );
        var link_simple_re = new RegExp( "\\[\\[:?(" + link_re_string + ")\\|?\\]\\]", 'g' );
        var link_named_re = new RegExp( "\\[\\[:?" + link_re_string + "\\|(.+?)\\]\\]", 'g' );
        if( link_simple_re.test(this.text) ) {
            this.text = this.text.replace( link_simple_re, "$1" );
        } else {
            this.text = this.text.replace( link_named_re, "$1" );
        }
    },
    commentOutImage: function( image, reason ) {
        var unbinder = new Unbinder( this.text );
        unbinder.unbind( '<!--', '-->' );

        reason = reason ? ' ' + reason + ': ' : '';
        var first_char = image.substr( 0, 1 );
        var image_re_string = "[" + first_char.toUpperCase() + first_char.toLowerCase() + ']' +  RegExp.escape( image.substr( 1 ), true );

        /*
         * Check for normal image links, i.e. [[Image:Foobar.png|...]]
         * Will eat the whole link
         */
        var links_re = new RegExp( "\\[\\[(?:[Ii]mage|[Ff]ile):\\s*" + image_re_string );
        var allLinks = unbinder.content.splitWeightedByKeys( '[[', ']]' ).uniq();
        for( var i = 0; i < allLinks.length; ++i ) {
            if( links_re.test( allLinks[i] ) ) {
                var replacement = '<!-- ' + reason + allLinks[i] + ' -->';
                unbinder.content = unbinder.content.replace( allLinks[i], replacement, 'g' );
            }
        }
        // unbind the newly created comments
        unbinder.unbind( '<!--', '-->' );

        /*
         * Check for gallery images, i.e. instances that must start on a new line, eventually preceded with some space, and must include Image: prefix
         * Will eat the whole line.
         */
        var gallery_image_re = new RegExp( "(^\\s*(?:[Ii]mage|[Ff]ile):\\s*" + image_re_string + ".*?$)", 'mg' );
        unbinder.content.replace( gallery_image_re, "<!-- " + reason + "$1 -->" );

        // unbind the newly created comments
        unbinder.unbind( '<!--', '-->' );
        /*
         * Check free image usages, for example as template arguments, might have the Image: prefix excluded, but must be preceeded by an |
         * Will only eat the image name and the preceeding bar and an eventual named parameter
         */
        var free_image_re = new RegExp( "(\\|\\s*(?:[\\w\\s]+\\=)?\\s*(?:(?:[Ii]mage|[Ff]ile):\\s*)?" + image_re_string + ")", 'mg' );
        unbinder.content.replace( free_image_re, "<!-- " + reason + "$1 -->" );

        // Rebind the content now, we are done!
        this.text = unbinder.rebind();
    },
    addToImageComment: function( image, data ) {
        var first_char = image.substr( 0, 1 );
        var image_re_string = "(?:[Ii]mage|[Ff]ile):\\s*[" + first_char.toUpperCase() + first_char.toLowerCase() + ']' +  RegExp.escape( image.substr( 1 ), true );
        var links_re = new RegExp( "\\[\\[" + image_re_string );
        var allLinks = this.text.splitWeightedByKeys( '[[', ']]' ).uniq();
        for( var i = 0; i < allLinks.length; ++i ) {
            if( links_re.test( allLinks[i] ) ) {
                var replacement = allLinks[i];
                // just put it at the end?
                replacement = replacement.replace( /\]\]$/, '|' + data + ']]' );
                this.text = this.text.replace( allLinks[i], replacement, 'g' );
            }
        }
        var gallery_re = new RegExp( "^(\\s*" + image_re_string + '.*?)\\|?(.*?)$', 'mg' );
        var newtext = "$1|$2 " + data;
        this.text = this.text.replace( gallery_re, newtext );
    },
    removeTemplate: function( template ) {
        var first_char = template.substr( 0, 1 );
        var template_re_string = "(?:[Tt]emplate:)?\\s*[" + first_char.toUpperCase() + first_char.toLowerCase() + ']' +  RegExp.escape( template.substr( 1 ), true );
        var links_re = new RegExp( "\\{\\{" + template_re_string );
        var allTemplates = this.text.splitWeightedByKeys( '{{', '}}', [ '{{{', '}}}' ] ).uniq();
        for( var i = 0; i < allTemplates.length; ++i ) {
            if( links_re.test( allTemplates[i] ) ) {
                this.text = this.text.replace( allTemplates[i], '', 'g' );
            }
        }
    },
    getText: function() {
        return this.text;
    }
};


/**
 * **************** isInNetwork(), isIPAddress() ****************
 */

// ipadress is in the format 1.2.3.4 and network is in the format 1.2.3.4/5
function isInNetwork( ipaddress, network ) {
    var iparr = ipaddress.split('.');
    var ip = (parseInt(iparr[0], 10) << 24) + (parseInt(iparr[1], 10) << 16) + (parseInt(iparr[2], 10) << 8) + (parseInt(iparr[3], 10));

    var netmask = 0xffffffff << network.split('/')[1];

    var netarr = network.split('/')[0].split('.');
    var net = (parseInt(netarr[0], 10) << 24) + (parseInt(netarr[1], 10) << 16) + (parseInt(netarr[2], 10) << 8) + (parseInt(netarr[3], 10));

    return (ip & netmask) === net;
}

// Returns true if given string contains a valid IP-address, that is, from 0.0.0.0 to 255.255.255.255
function isIPAddress( string ){
    var res = /(\d{1,4})\.(\d{1,3})\.(\d{1,3})\.(\d{1,4})/.exec( string );
    return res && res.slice( 1, 5 ).every( function( e ) { return e < 256; } );
}


/**
 * **************** QueryString ****************
 * Maps the querystring to an object
 *
 * Functions:
 *
 * QueryString.exists(key)
 *     returns true if the particular key is set
 * QueryString.get(key)
 *     returns the value associated to the key
 * QueryString.equals(key, value)
 *     returns true if the value associated with given key equals given value
 * QueryString.toString()
 *     returns the query string as a string
 * QueryString.create( hash )
 *     creates an querystring and encodes strings via encodeURIComponent and joins arrays with |
 *
 * In static context, the value of location.search.substring(1), else the value given to the constructor is going to be used. The mapped hash is saved in the object.
 *
 * Example:
 *
 * var value = QueryString.get('key');
 * var obj = new QueryString('foo=bar&baz=quux');
 * value = obj.get('foo');
 */
var QueryString = function(qString) {
    this.string = qString;
    this.params = {};

    if( !qString.length ) {
        return;
    }

    qString.replace(/\+/, ' ');
    var args = qString.split('&');

    for( var i = 0; i < args.length; ++i ) {
        var pair = args[i].split( '=' );
        var key = decodeURIComponent( pair[0] ), value = key;

        if( pair.length === 2 ) {
            value = decodeURIComponent( pair[1] );
        }

        this.params[key] = value;
    }
};

QueryString.staticstr = null;

QueryString.staticInit = function() {
    if( !QueryString.staticstr ) {
        QueryString.staticstr = new QueryString(location.search.substring(1));
    }
};

QueryString.get = function(key) {
    QueryString.staticInit();
    return QueryString.staticstr.get(key);
};

QueryString.prototype.get = function(key) {
    return this.params[key] ? this.params[key] : null;
};

QueryString.exists = function(key) {
    QueryString.staticInit();
    return QueryString.staticstr.exists(key);
};

QueryString.prototype.exists = function(key) {
    return this.params[key] ? true : false;
};

QueryString.equals = function(key, value) {
    QueryString.staticInit();
    return QueryString.staticstr.equals(key, value);
};

QueryString.prototype.equals = function(key, value) {
    return this.params[key] === value ? true : false;
};

QueryString.toString = function() {
    QueryString.staticInit();
    return QueryString.staticstr.toString();
};

QueryString.prototype.toString = function() {
    return this.string ? this.string : null;
};

QueryString.create = function( arr ) {
    var resarr = [];
    var editToken;  // KLUGE: this should always be the last item in the query string (bug TW-B-0013)
    for( var i in arr ) {
        if( typeof arr[i] === 'undefined' ) {
            continue;
        }
        var res;
        if( arr[i] instanceof Array ){
            var v = [];
            for(var j = 0; j < arr[i].length; ++j ) {
                v[j] = encodeURIComponent( arr[i][j] );
            }
            res = v.join('|');
        } else {
            res = encodeURIComponent( arr[i] );
        }
        if( i === 'wpEditToken' ) {
            editToken = res;
        } else {
            resarr.push( encodeURIComponent( i ) + '=' + res );
        }
    }
    if( typeof editToken !== 'undefined' ) {
        resarr.push( 'wpEditToken=' + editToken );
    }
    return resarr.join('&');
};
QueryString.prototype.create = QueryString.create;

/**
 * **************** Exception ****************
 * Simple exception handling
 * REMOVEME - unused?
 */

var Exception = function( message ) {
    this.message = message || '';
    this.name = "Exception";
};

Exception.prototype.what = function() {
    return this.message;
};


/**
 * **************** Status ****************
 */

var Status = function( text, stat, type ) {
    this.text = this.codify(text);
    this.stat = this.codify(stat);
    this.type = type || 'status';
    if (type === 'error') {
        // hack to force the page not to reload when an error is output - see also update() below
        Wikipedia.numberOfActionsLeft = 1000;
        // call error callback
        if (Status.errorEvent) {
            Status.errorEvent();
        }
    }
    this.generate();
    if( stat ) {
        this.render();
    }
};

Status.init = function( root ) {
    if( !( root instanceof Element ) ) {
        throw new Error( 'object not an instance of Element' );
    }
    while( root.hasChildNodes() ) {
        root.removeChild( root.firstChild );
    }
    Status.root = root;
    Status.errorEvent = null;
};

Status.root = null;

Status.onError = function( handler ) {
    if (typeof handler === "function") {
        Status.errorEvent = handler;
    } else {
        throw "Status.onError: handler is not a function";
    }
};

Status.prototype = {
    stat: null,
    text: null,
    type: 'status',
    target: null,
    node: null,
    linked: false,
    link: function() {
        if( ! this.linked && Status.root ) {
            Status.root.appendChild( this.node );
            this.linked = true;
        }
    },
    unlink: function() {
        if( this.linked ) {
            Status.root.removeChild( this.node );
            this.linked = false;
        }
    },
    codify: function( obj ) {
        if ( ! ( obj instanceof Array ) ) {
            obj = [ obj ];
        }
        var result;
        result = document.createDocumentFragment();
        for( var i = 0; i < obj.length; ++i ) {
            if( typeof obj[i] === 'string' ) {
                result.appendChild( document.createTextNode( obj[i] ) );
            } else if( obj[i] instanceof Element ) {
                result.appendChild( obj[i] );
            } // Else cosmic radiation made something shit
        }
        return result;

    },
    update: function( status, type ) {
        this.stat = this.codify( status );
        if( type ) {
            this.type = type;
            if (type === 'error') {
                // hack to force the page not to reload when an error is output - see also Status() above
                Wikipedia.numberOfActionsLeft = 1000;
                // call error callback
                if (Status.errorEvent) {
                    Status.errorEvent();
                }
            }
        }
        this.render();
    },
    generate: function() {
        this.node = document.createElement( 'div' );
        this.node.appendChild( document.createElement('span') ).appendChild( this.text );
        this.node.appendChild( document.createElement('span') ).appendChild( document.createTextNode( ': ' ) );
        this.target = this.node.appendChild( document.createElement( 'span' ) );
        this.target.appendChild(  document.createTextNode( '' ) ); // dummy node
    },
    render: function() {
        this.node.className = 'tw_status_' + this.type;
        while( this.target.hasChildNodes() ) {
            this.target.removeChild( this.target.firstChild );
        }
        this.target.appendChild( this.stat );
        this.link();
    },
    status: function( status ) {
        this.update( status, 'status');
    },
    info: function( status ) {
        this.update( status, 'info');
    },
    warn: function( status ) {
        this.update( status, 'warn');
    },
    error: function( status ) {
        this.update( status, 'error');
    }
};

Status.status = function( text, status ) {
    return new Status( text, status, 'status' );
};

Status.info = function( text, status ) {
    return new Status( text, status, 'info' );
};

Status.warn = function( text, status ) {
    return new Status( text, status, 'warn' );
};

Status.error = function( text, status ) {
    return new Status( text, status, 'error' );
};


/**
 * **************** htmlNode() ****************
 * Simple helper function to create a simple node
 * XXX rewrite more flexibly, and place under an object, for example QuickNode.create
 */

function htmlNode( type, content, color ) {
    var node = document.createElement( type );
    if( color ) {
        node.style.color = color;
    }
    node.appendChild( document.createTextNode( content ) );
    return node;
}


/**
 * **************** SimpleWindow ****************
 * A simple draggable window
 * now a wrapper for jQuery UI's dialog feature
 */

// The height passed in here is the maximum allowable height for the content area.
var SimpleWindow = function( width, height ) {
    var content = document.createElement( 'div' );
    this.content = content;
    content.className = 'morebits-dialog-content';

    this.height = height;

    $(this.content).dialog({
            autoOpen: false,
            buttons: { "Placeholder button": function() {} },
            dialogClass: 'morebits-dialog',
            width: Math.min(parseInt(window.innerWidth, 10), parseInt(width ? width : 800, 10)),
            // give jQuery the given height value (which represents the anticipated height of the dialog) here, so
            // it can position the dialog appropriately
            // the 20 pixels represents adjustment for the extra height of the jQuery dialog "chrome", compared
            // to that of the old SimpleWindow
            height: height + 20
        }).bind("dialogresize", function(event, ui) {
            this.style.maxHeight = "";
        });

    var $widget = $(this.content).dialog("widget");

    // add background gradient to titlebar
    var $titlebar = $widget.find(".ui-dialog-titlebar");
    var oldstyle = $titlebar.attr("style");
    $titlebar.attr("style", (oldstyle ? oldstyle : "") + '; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAMAAAB%2FqqA%2BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhQTFRFr73ZobTPusjdsMHZp7nVwtDhzNbnwM3fu8jdq7vUt8nbxtDkw9DhpbfSvMrfssPZqLvVztbno7bRrr7W1d%2Fs1N7qydXk0NjpkW7Q%2BgAAADVJREFUeNoMwgESQCAAAMGLkEIi%2FP%2BnbnbpdB59app5Vdg0sXAoMZCpGoFbK6ciuy6FX4ABAEyoAef0BXOXAAAAAElFTkSuQmCC) !important;');

    // delete the placeholder button (it's only there so the buttonpane gets created)
    $widget.find("button").each(function(key, value) {
        value.parentNode.removeChild(value);
    });

    // add container for the buttons we add, and the footer links (if any)
    var buttonspan = document.createElement("span");
    buttonspan.className = "morebits-dialog-buttons";
    var linksspan = document.createElement("span");
    linksspan.className = "morebits-dialog-footerlinks";
    $widget.find(".ui-dialog-buttonpane").append(buttonspan, linksspan);
};

SimpleWindow.prototype = {
    buttons: [],
    height: 600,
    hasFooterLinks: false,
    scriptName: null,

    // Focuses the dialog. This might work, or on the contrary, it might not.
    focus: function(event) {
        $(this.content).dialog("moveToTop");
    },
    // Closes the dialog.  If this is set as an event handler, it will stop the event from doing anything more.
    close: function(event) {
        if (event) {
            event.preventDefault();
        }
        $(this.content).dialog("close");
    },
    // Shows the dialog.  Calling display() on a dialog that has previously been closed might work, but it is not guaranteed.
    display: function() {
        if (this.scriptName) {
            var $widget = $(this.content).dialog("widget");
            $widget.find(".morebits-dialog-scriptname").remove();
            var scriptnamespan = document.createElement("span");
            scriptnamespan.className = "morebits-dialog-scriptname";
            scriptnamespan.textContent = this.scriptName + " \u00B7 ";  // U+00B7 MIDDLE DOT = &middot;
            $widget.find(".ui-dialog-title").prepend(scriptnamespan);
        }

        var dialog = $(this.content).dialog("open");
        if (window.setupTooltips) { dialog.parent()[0].ranSetupTooltipsAlready = false; setupTooltips(dialog.parent()[0]); } //tie in with NAVPOP
        this.setHeight( this.height );  // init height algorithm
    },
    // Sets the dialog title.
    setTitle: function( title ) {
        $(this.content).dialog("option", "title", title);
    },
    // Sets the script name, appearing as a prefix to the title to help users determine which
    // user script is producing which dialog. For instance, Twinkle modules set this to "Twinkle".
    setScriptName: function( name ) {
        this.scriptName = name;
    },
    // Sets the dialog width.
    setWidth: function( width ) {
        $(this.content).dialog("option", "width", width);
    },
    // Sets the dialog's maximum height. The dialog will auto-size to fit its contents,
    // but the content area will grow no larger than the height given here.
    setHeight: function( height ) {
        this.height = height;

        // from display time onwards, let the browser determine the optimum height, and instead limit the height at the given value
        // note that the given height will exclude the approx. 20px that the jQuery UI chrome has in height in addition to the height
        // of an equivalent "classic" SimpleWindow
        if (parseInt(getComputedStyle($(this.content).dialog("widget")[0], null).height, 10) > window.innerHeight) {
            $(this.content).dialog("option", "height", window.innerHeight - 2).dialog("option", "position", "top");
        } else {
            $(this.content).dialog("option", "height", "auto");
        }
        $(this.content).dialog("widget").find(".morebits-dialog-content")[0].style.maxHeight = parseInt(this.height - 30, 10) + "px";
    },
    // Sets the content of the dialog to the given element node, usually from rendering a QuickForm or QuickForm element.
    // Re-enumerates the footer buttons, but leaves the footer links as they are.
    // Be sure to call this at least once before the dialog is displayed...
    setContent: function( content ) {
        this.purgeContent();
        this.addContent( content );
    },
    addContent: function( content ) {
        this.content.appendChild( content );

        // look for submit buttons in the content, hide them, and add a proxy button to the button pane
        var thisproxy = this;
        $(this.content).find('input[type="submit"], button[type="submit"]').each(function(key, value) {
                value.style.display = "none";
                var button = document.createElement("button");
                button.textContent = (value.hasAttribute("value") ? value.getAttribute("value") : (value.textContent ? value.textContent : "Submit Query"));
                // here is an instance of cheap coding, probably a memory-usage hit in using a closure here
                button.addEventListener("click", function() { value.click(); }, false);
                thisproxy.buttons.push(button);
            });
        // remove all buttons from the button pane and re-add them
        if (this.buttons.length > 0) {
            $(this.content).dialog("widget").find(".morebits-dialog-buttons").empty().append(this.buttons)[0].removeAttribute("data-empty");
        } else {
            $(this.content).dialog("widget").find(".morebits-dialog-buttons")[0].setAttribute("data-empty", "data-empty");  // used by CSS
        }
    },
    purgeContent: function( content ) {
        this.buttons = [];
        // delete all buttons in the buttonpane
        $(this.content).dialog("widget").find(".morebits-dialog-buttons").empty();

        while( this.content.hasChildNodes() ) {
            this.content.removeChild( this.content.firstChild );
        }
    },
    // Adds a link in the bottom-right corner of the dialog.
    // This can be used to provide help or policy links.
    // For example, Twinkle's CSD module adds a link to the CSD policy page,
    // as well as a link to Twinkle's documentation.
    addFooterLink: function( text, wikiPage ) {
        var $footerlinks = $(this.content).dialog("widget").find(".morebits-dialog-footerlinks");
        if (this.hasFooterLinks) {
            var bullet = document.createElement("span");
            bullet.textContent = " \u2022 ";  // U+2022 BULLET
            $footerlinks.append(bullet);
        }
        var link = document.createElement("a");
        link.setAttribute("href", mw.util.wikiGetlink(wikiPage) );
        link.setAttribute("title", wikiPage);
        link.setAttribute("target", "_blank");
        link.textContent = text;
        $footerlinks.append(link);
        this.hasFooterLinks = true;
    },
    moveWindow: function( x, y ) {
        // unimplemented
        alert("SimpleWindow.moveWindow is no longer implemented.");
    },
    resizeWindow: function( x, y ) {
        // unimplemented
        alert("SimpleWindow.resizeWindow is no longer implemented.");
    }
};

// Enables or disables all footer buttons on all SimpleWindows in the current page.
// This should be called with |false| when the button(s) become irrelevant (e.g. just before Status.init is called).
// This is not an instance method so that consumers don't have to keep a reference to the original
// SimpleWindow object sitting around somewhere. Anyway, most of the time there will only be one
// SimpleWindow open, so this shouldn't matter.
SimpleWindow.setButtonsEnabled = function( enabled ) {
    $(".morebits-dialog-buttons button").attr("disabled", !enabled);
};



// Twinkle blacklist was removed per consensus at http://en.wikipedia.org/wiki/Wikipedia:Administrators%27_noticeboard/Archive221#New_Twinkle_blacklist_proposal


// </nowiki>