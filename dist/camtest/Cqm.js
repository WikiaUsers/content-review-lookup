;( function ( document, cqm, undefined ) {

    module = function ( tagname ) {

        if ( typeof tagname !== 'string' )
            return;
        }

        if ( !( this instanceof
        
        return document.createElement( tagname );

    };

    module.prototype.attr = function ( attr, val )

       // make sure something in being passed to this
       if ( attr === undefined ) {
           return;
       }
           
       // checking for value of attr
       if ( typeof attr === 'string' && val === undefined ) {

       // setting individual attribute
       } else if ( typeof attr === 'string' && typeof val === 'string' ) {

       // setting multiple attributes
       } else if ( attr === Object( attr ) ) {

       }
    };

    module.prototype.text( text )
        // convert to string
        text = '' + text;

        this.innerHTML( text );

    };

}( this.document, (this.cqm = this.cqm || {}).elem = this.cqm.elem || {} );