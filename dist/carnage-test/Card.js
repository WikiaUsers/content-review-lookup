( function( window, document ){
    "use strict";
    function CardGroup( id, options ){
        if ( !( this instanceof CardGroup ) ) return new CardGroup( options );
        
        if ( typeof id === "object" ){
            options = Object.assign( { }, id );
            id = options.id;
            delete options.id;
        }
        
        if ( typeof id !== "string" ){
            throw new ReferenceError( "An identifier is required for this constructor." );
        }
        
        if ( this.constructor.CACHE[ id ] instanceof this.constructor ){
            this.constructor.CACHE[ id ].configure( options );
            return this.constructor.CACHE[ id ];
        }
        
        this.element = null;
        this.cards = [ ];
        this.settings = Object.assign( { }, this.constructor.SETTINGS );
        this.responsive = true;
        this.configure( options );
        this.constructor.CACHE[ id ] = this;
        this.constructor.LENGTH++;
        return this;
    }
    
    CardGroup.SETTINGS = Object.freeze( { 
        maxCardWidth: 350,
        maxRowLength: 5,
        cardWidth: "auto"
    } );
    
    CardGroup.SETTERS = Object.freeze( {
        cardWidth: function( value ){
            if ( [ "auto", "responsive" ].indexOf( value ) > -1 ){
                this.responsive = true;
            } else {
                this.responsive = false;
            }
            return value;
        },
        container: function( value ){
            if ( Object( value ) instanceof Element ){
                this.container = value;
                return value;
            } else if ( typeof value === "string" ){
                this.container = document.querySelector( value );
                return this.container;
            } else if ( Object( value ) instanceof $ ){ 
                this.container = value.get( 0 );
                return this.container;
            } else {
                return null;
            }
        }
    } );
    
    CardGroup.HTML = Object.freeze( { 
        group: '<section class="CardGroup card-group"></section>',
        rows: '<div class="CardGroupRow card-group-row"></div>'
    } );
    
    CardGroup.CACHE = { };
    
    CardGroup.LENGTH = 0;
    
    CardGroup.flatten = function flatten( array, depth ){
        depth = ( isNaN( depth ) ) ? 1 : ( isFinite( depth ) ? parseInt( depth ) : depth );
        
        return depth > 0 ? array.reduce( function( arr, val ){
            return arr.concat( Array.isArray( val ) ? flatten( val, depth - 1 ) : val );
        }, [ ] ) : array.slice( );
    };
    
    CardGroup.parseHTML = function parseHTML( string, allowAll ){
        const parser = new DOMParser( );
        
        const body = parser.parseFromString( string, "text/html" ).body;
        
        body.innerHTML = string;
        
        if ( !allowAll ){
            return body.children;
        } else {
            return body.firstElementChild;
        }
    };
    
    CardGroup.fn = CardGroup.prototype;
    
    CardGroup.fn.configure = function( options ){
        options = Object.assign( { }, options );
        
        for ( const key in options ){
            if ( this.constructor.SETTERS[ key ] ){
                var setter = this.constructor.SETTERS[ key ];
                if ( typeof setter === "function" ){
                    this.settings[ key ] = setter.call( this, options[ key ] || this.settings[ key ] );
                } else {
                    this.settings[ key ] = setter;
                }
            } else {
                this.settings[ key ] = options[ key ] || this.settings[ key ];
            }
        }
    };
    
    CardGroup.fn.addCard = function( card ){
        var currentCard = null;
        if ( !( card instanceof Card ) ){
            currentCard = new Card( Object.assign( { }, card ) );
        } else {
            currentCard = card;
        }
        
        if ( this.cards.indexOf( currentCard ) > -1 ){
            console.warn( "This card already exists in this group." );
            return;
        }
        
        currentCard.setGroup( this );
        this.cards.push( currentCard );
        return this;
    };
    
    CardGroup.fn.hasCard = function( card ){
        if ( !( card instanceof Card ) ){
            card = this.findCard( Object.assign( { }, card ) );
        }
        
        return this.cards.indexOf( card ) > -1;
    };
    
    CardGroup.fn.removeCard = function( card ){
        var cardIndex = -1;
        if ( this.cards.indexOf( card ) > -1 ){
            cardIndex = this.cards.indexOf( card );
        } else {
            if ( typeof card === "object" && !( card instanceof Card ) ){
                cardIndex = this.findCardIndex( card );
            } else if ( typeof card === "string" ){
                card = this.findCardByName( card ) || null;
                cardIndex = this.cards.indexOf( card );
                
                if ( cardIndex === -1 ){
                    console.warn( "This card does not exist. Exiting method." );
                    return;
                }
            } else {
                console.warn( "This argument must be a Card instance, object, or a string." );
                return;
            }
        }
        
        this.cards.splice( cardIndex, 1 );
        return this;
    };
    
    ( [
        [ "findCard", "find" ],
        [ "findCardIndex", "findIndex" ]
    ] ).forEach( function( tuple ){
        var methodName = tuple[ 0 ], fn = tuple[ 1 ];
        CardGroup.fn[ methodName ] = function( object ){
            return this.cards[ fn ]( function( card ){
                return Object.keys( object ).every( function( key ){ 
                    return card[ key ] === object[ key ];
                } );
            }, this ) || ( fn === "findIndex" ? -1 : null );
        };
    } );
    
    CardGroup.fn.findCardByName = function( name ){
        if ( typeof name !== "string" ){
            if ( Array.isArray( name ) ){
                name = this.constructor.flatten( name, Infinity );
                return name.map( this.findCardByName, this );
            } else {
                console.warn( "The 'name' argument must be a string or an array." );
                return;
            }
        } else {
            return this.findCard( { name: name } );
        }
    };
    
    CardGroup.fn.generateHTML = function( ){ 
        var parseHTML = this.constructor.parseHTML;
        this.cardGroupElement = parseHTML( this.constructor.HTML.group );
        
        this.cards.forEach( function( card ){
            var element = card.getElement( );
            this.cardGroupElement.appendChild( element );
        }, this );
        
        this.container.appendChild( this.cardGroupElement );
        
        this.reflow( );
    };
    
    CardGroup.fn.reflow = function( ){
        if ( this.responsive ){
            window.addEventListener( "resize", this.reflow.bind( this ) );
        }
    };
    
    function Card( options ){
        if ( !( this instanceof Card ) ) return new Card( options );

        const name = options.name;
        
        if ( typeof name !== "string" ){
            throw new ReferenceError( "There is no name for this card." );
        }
        
        if ( this.constructor.CACHE[ name ] instanceof Card ){
            this.constructor.CACHE[ name ].configure( options );
            return this.constructor.CACHE[ name ];
        }
        
        this.settings = Object.assign( { }, this.constructor.SETTINGS );
        
        this.configure( options );
        
        this.name = this.settings.name;
        this.group = this.settings.group;
    
        return this;
    }
    
    Card.fn = Card.prototype;
    
    Card.fn.configure = CardGroup.fn.configure;
    
    Card.fn.setGroup = function( cardGroup ){
        if ( !( Object( cardGroup ) instanceof CardGroup ) ){
            console.warn( "This argument is not an instance of CardGroup." );
            return this;
        }
        
        if ( !( this.group instanceof CardGroup ) ){
            this.group = cardGroup;
        }
        
        if ( !this.group.hasCard( this ) ){
            this.group.addCard( this );
        }
        
        return this;
    };
} )( window, document );