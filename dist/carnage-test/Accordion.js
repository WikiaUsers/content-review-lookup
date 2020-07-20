( function( window, document ){
    "use strict";
    
    var AccordionUID = 0;
    
    function Accordion( container, options ){
        if ( !( this instanceof Accordion ) ) return new Accordion( container, options );
        if ( typeof container === "string" ) container = document.querySelector( container );
        this.container = container;
        this.container.accordion = this;
        this.settings = Object.assign( { }, this.constructor.settings );
        this.sections = [ ];
        this.classNames = [ ];
        this.callbacks = { };
        this.activeIndex = 0;
        this.hasDescription = true;
        this.loaded = false;
        this.length = 0;
        this.id = "";
        this.uid = AccordionUID++;
        this.timeout = null;
        this.configureSettings( options );
        return this;
    }
    
    Accordion.fn = Accordion.prototype;
    
    Accordion.extend = Accordion.fn.extend = function extend( target ){
        var sources = Array.prototype.slice.call( arguments, 1 );
        
        if ( arguments.length === 1 ){
            sources = [ target ];
            target = this;
        } else if ( arguments.length === 0 ){
            return this;
        }
        
        loopTargets: for ( var index = 0; index < sources.length; index++ ){
            var source = sources[ index ];
            if ( typeof source === "object" && source !== null ){
                loopProperties: for ( const property in source ){
                    var currentValue = source[ property ];
                    if ( typeof currentValue === "object" && currentValue !== null ){
                        target[ property ] = Object.assign( { }, target[ property ] );
                        extend( target[ property ], currentValue );
                    } else if ( currentValue !== null || currentValue !== void 0 ){
                        target[ property ] = currentValue;
                    } else continue loopProperties;
                }
            } else continue loopTargets;
        }
        
        return target;
    };
    
    Accordion.extend( {
        settings: Object.freeze( {
            collapsible: true,
            description: "",
            defaultIndex: -1,
            delay: 0,
            disabled: false,
            handlers: { },
            sections: [ ],
            classNames: [ ],
            multiple: false,
            speed: 0
        } ),
        animate: function( fn ){
            var vendors = [ "", "webkit", "ms", "moz" ], reqAnimFrame = null;
            
            while ( vendors.length ){
                var vendor = vendors.shift( );
                if ( vendor === "" ){
                    if ( "requestAnimationFrame" in window ){
                        reqAnimFrame = window.requestAnimationFrame;
                        break;
                    }
                } else {
                    if ( ( vendor + "RequestAnimationFrame" ) in window ){
                        reqAnimFrame = window[ vendor + "RequestAnimationFrame" ];
                        break;
                    }
                }
            }
            
            if ( reqAnimFrame === null ){
                reqAnimFrame = function( f ){
                    return setTimeout( f, 1000 / 30 );
                };
            }
            
            return reqAnimFrame( fn );
        },
        cancel: function( id ){
            var vendors = [ "", "webkit", "ms", "moz" ], canAnimFrame = null;
            
            while ( vendors.length ){
                var vendor = vendors.shift( );
                if ( vendor === "" ){
                    if ( "cancelAnimationFrame" in window ){
                        canAnimFrame = window.cancelAnimationFrame;
                        break;
                    }
                } else {
                    if ( ( vendor + "CancelAnimationFrame" ) in window ){
                        reqAnimFrame = window[ vendor + "CancelAnimationFrame" ];
                        break;
                    }
                }
            }
            
            if ( canAnimFrame === null ){
                canAnimFrame = function( id ){
                    return clearTimeout( id );
                };
            }
            
            return canAnimFrame( id );
        },
        special: Object.freeze( {
            sections: function( options ){
                var section = Accordion.createSection( options );
                section.setReferrer( this );
                this.length = this.sections.push( section );
                return options;
            },
            id: function( id ){
                if ( typeof id !== "string" ) return id;
                this.id = id;
                return this.id;
            },
            classNames: function( classNames ){
                if ( typeof classNames === "string" ) classNames = [ classNames ];
                else if ( !Array.isArray( classNames ) ) return classNames;
                for ( var c = 0; c < classNames.length; c++ ){
                    var className = classNames[ c ];
                    if ( this.classNames.indexOf( className ) === -1 ){
                        this.classNames.push( className );
                    } else continue;
                }
                return classNames;
            },
            defaultIndex: function( value ){
                return Accordion.clamp( value, -1, this.length );
            }
        } ),
        clamp: function( n, min, max ){
            var x = max < min ? max : min, y = max < min ? min : max;
            min = x; max = y;
            return Math.max( min, Math.min( n, max ) );
        },
        create: function( element, options ){
            return new Accordion( element, options );
        },
        createSection: function( options ){
            return new Accordion.Section( options );
        },
        cleanHTML: function( string ){
            var div = document.createElement( "div" ),
                selectors = [ "script", "style", "meta", "link", "base", "object", "iframe" ];
            
            div.innerHTML = string;
            
            var elements = Array.from( div.querySelectorAll( selectors.join( ", " ) ) );
            
            if ( !( elements || [ ] ).length ) return string;
            
            while ( elements.length ){
                var element = elements.shift( );
                if ( !( element.remove ) ){
                    element.parentNode.removeChild( element );
                } else {
                    element.remove( );
                }
            }
            
            var allElements = Array.from( div.querySelectorAll( "*" ) ),
                blacklistedAttrs = [ /on.*/g, "tabindex", "style" ],
                blacklistedAttrValues = [ /(?:(?:java|ecma)script|data):.*/g ];
            
            while ( allElements.length ){
                var currElement = allElements.shift( ),
                    attributes = Array.from( currElement.attributes );
                while ( attributes.length ){
                    var attribute = attributes.shift( ),
                        name = attribute.name,
                        value = attribute.value;
                        
                    loopAttrs: for ( var i = 0; i < blacklistedAttrs.length; i++ ){
                        var attr = blacklistedAttrs[ i ];
                        if ( Object( attr ) instanceof RegExp ){
                            if ( !attr.test( name ) ) continue loopAttrs;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        } else {
                            if ( attr !== name ) continue loopAttrs;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        }
                    }
                    
                    loopVals: for ( var j = 0; j < blacklistedAttrValues.length; j++ ){
                        var val = blacklistedAttrValues[ j ];
                        if ( Object( val ) instanceof RegExp ){
                            if ( !val.test( value ) ) continue loopVals;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        } else {
                            if ( val !== value ) continue loopVals;
                            if ( !( currElement.remove ) ){
                                currElement.parentNode.removeChild( currElement );
                            } else {
                                currElement.remove( );
                            }
                        }
                    }
                }
            }
            
            return div.innerHTML;
        },
        parseHTML: function( string, clean ){
            const parser = new DOMParser( );
            if ( clean ){ 
                string = Accordion.cleanHTML( string ); 
            }
            const body = parser.parseFromString( string, "text/html" ).body;
            if ( !body.firstElementChild ) return null;
            return body.firstElementChild;
        },
        Section: function( options ){
            if ( !( this instanceof Accordion.Section ) ) return new Accordion.Section( options );
            this.settings = Object.assign( {}, this.constructor.settings );
            this.heading = "";
            this.content = "";
            this.configureSettings( options );
            return this;
        }
    } );
    
    Accordion.fn.extend( {
        constructor: Accordion,
        defaultHTML: "<section><article></article><div></div></section>",
        configureSettings: function( options ){
            const specials = Object.assign( { }, this.constructor.specials );
            
            for ( const property in options ){
                var value = options[ property ], original = this.settings[ property ];
                if ( property in specials ){
                    var handler = specials[ property ];
                    this.settings[ property ] = typeof handler === "function" ?
                        ( handler.call( this, value || original ) || original ) : handler;
                } else {
                    this.settings[ property ] = value || original;
                }
            }
        },
        createHTML: function( ){
            const accordionHTML = Accordion.parseHTML( this.defaultHTML );
            this.accordionElement = accordionHTML;
            this.accordionDescElement = this.accordionElement.firstElementChild;
            this.accordionInnerElement = this.accordionDescElement.nextSibling;
            
            if ( !this.settings.description ){
                if ( !this.accordionDescElement.remove ){
                    this.accordionDescElement.parentNode.removeChild( this.accordionDescElement );
                } else {
                    this.accordionDescElement.remove( );
                }
                this.hasDescription = false;
                delete this.accordionDescElement;
            } else {
                var description = Accordion.cleanHTML( this.settings.description );
                this.accordionDescElement.innerHTML = description;
            }
            
            this.sections.forEach( function( section ){
                this.accordionInnerElement.appendChild( section.createHTML( ) );
            }, this );
        },
        createSection: function( options ){
            var section = Accordion.createSection( options );
            section.setReferrer( this );
            this.addSection( section );
        },
        addSection: function( section ){
            var hasSection = this.sections.every( function( s ){
                return ( s.id === section.id );
            } );
            if ( hasSection ){
                console.warn( "There is already a section with the ID: " + section.id + "." );
                return false;
            }
            this.length = this.sections.push( section );
            if ( this.loaded ) this.updateSections( );
            return true;
        },
        updateSections: function( ){
            if ( this.delay > 0 ){
                this.timeout = setTimeout( ( function( ){
                    clearTimeout( this.timeout );
                    this.timeout = null;
                    
                    this.accordionInnerElement.innerHTML = "";
                    
                    this.sections.forEach( function( section ){
                        this.accordionInnerElement.appendChild( section.createHTML( ) );
                    }, this );
                } ).bind( this ), this.delay );
            } else {
                this.accordionInnerElement.innerHTML = "";
                
                this.sections.forEach( function( section ){
                    this.accordionInnerElement.appendChild( section.createHTML( ) );
                }, this );
            }
        },
        appendTo: function( element ){
            if ( Object( element ) instanceof Element || 
                ( Object( element ) instanceof Node || element.nodeType === 1 ) ){
                delete this.container.accordion;
                this.container = element;
                this.container.accordion = this;
            }
            
            this.addElement( );
        },
        addElement: function( ){
            if ( !this.loaded ){
                this.container.appendChild( this.accordionElement );
                this.loaded = true;
            } else {
                this.container.innerHTML = "";
                this.container.appendChild( this.accordionElement );
            }
        }
    } );
    
    Accordion.Section.fn = Accordion.Section.prototype;
    
    Accordion.Section.extend = Accordion.Section.fn.extend = Accordion.extend;
    
    Accordion.Section.extend( {
        settings: Object.freeze( {
            heading: "",
            content: "",
            active: false
        } ),
        specials: Object.freeze( {
            heading: function( value ){
                this.heading = value;
                return value;
            },
            content: function( value ){
                this.content = value;
                return value;
            }
        } ),
        setters: Object.freeze( {
            heading: function( value ){
                this.heading = value;
                return value;
            },
            content: function( value ){
                this.content = value;
                return value;
            },
            active: function( value ){
                if ( typeof value === "boolean" ){
                    this.active = value;
                } else {
                    this.active = Boolean( value );
                }
                return this.active;
            }
        } ),
        getters: Object.freeze( {
            sectionHTML: function( value ){
                if ( typeof value === "string" ) return value;
                const placeholder = document.createElement( "div" );
                placeholder.appendChild( value );
                return placeholder.innerHTML;
            }
        } )
    } );
    
    Accordion.Section.fn.extend( {
        defaultHTML: "<section><h3></h3><div></div></section>",
        configureSettings: function( options ){
            const specials = Object.assign( { }, this.constructor.specials );
            
            for ( const property in options ){
                var value = options[ property ], original = this.settings[ property ];
                if ( property in specials ){
                    var handler = specials[ property ];
                    this.settings[ property ] = typeof handler === "function" ?
                        ( handler.call( this, value || original ) || original ) : handler;
                } else {
                    this.settings[ property ] = value || original;
                }
            }
        },
        createHTML: function( ){
            var container = Accordion.parseHTML( this.defaultHTML );
            this.sectionContainer = container;
            this.sectionHeading = this.sectionContainer.firstElementChild;
            this.sectionContent = this.sectionContainer.lastElementChild;
            
            this.sectionContainer.classList.add( "accordion-section" );
            this.sectionHeading.classList.add( "accordion-section-heading" );
            this.sectionContent.classList.add( "accordion-section-content" );
            
            this.sectionContainer.setAttribute( "id", 
                "accordion-section-" + this.referrer.id + "-" + this.settings.index );
            
            this.sectionHeading.addEventListener( "click", this.toggleAccordion.bind( this ) );
            
            var headingHTML = Accordion.cleanHTML( this.settings.heading ),
                contentHTML = Accordion.cleanHTML( this.settings.content );
            
            this.sectionHeading.innerHTML = headingHTML;
            this.sectionContent.innerHTML = contentHTML;
            
            return this.sectionContainer;
        },
        toggleAccordion: function( event ){
            event.preventDefault( );
            
            var referrer = this.referrer;
            
            if ( this.active && this.sectionContainer.classList.has( "accordion-section-active" ) ){
                if ( referrer.settings.allowAnimations ){
                    this.animateToggle( "hide" );
                } else {
                    this.sectionContainer.classList.remove( "accordion-section-active" );
                }
            } else {
                if ( referrer.settings.allowAnimations ){
                    this.animateToggle( "show" );
                } else {
                    this.sectionContainer.classList.add( "accordion-section-active" );
                }
            }
        },
        animateToggle: function( type ){
            if ( type === "hide" ){
                var size = this.sectionContent.getBoundingClientRect( ).height;
                this.sectionContent.style.display = "block";
            }
        },
        set: function( property, value ){
            if ( property in this.constructor.setters ){
                var setter = this.constructor.setters[ property ];
                if ( typeof setter !== "function" ){
                    this[ property ] = setter;
                } else {
                    this[ property ] = setter.call( this, value );
                }
            } else {
                this[ property ] = value;
            }
        },
        setReferrer: function( referrer ){
            if ( !( referrer instanceof Accordion ) ){
                if ( referrer instanceof Element || ( referrer instanceof Node && referrer.nodeType === 1 ) ){
                    if ( !( "accordion" in referrer ) ) return false;
                    var instance = referrer.accordion;
                    if ( !( instance instanceof Accordion ) ) return false;
                    this.set( "referrer", instance );
                } else {
                    return false;
                }
            } else {
                this.set( "referrer", referrer );
            }
            return true;
        },
        get: function( property ){
            if ( property in this.constructor.getters ){
                var getter = this.constructor.getters[ property ];
                if ( typeof getter !== "function" ){
                    return getter;
                } else {
                    return getter.call( this, this[ property ] );
                }
            } else {
                return this[ property ];
            }
        }
    } );
    
    window.Accordion = Accordion;
} )( window, document );