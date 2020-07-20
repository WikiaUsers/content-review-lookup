( function( window ){
    function Callbacks( options ){
        var flags = typeof options === "string" ?
            this.constructor.createFlags( options ) :
            Object.assign( { }, options );

        this.__firing = false;
        this.__memory = false;
        this.__fired = false;
        this.__locked = false;
        this.__list = [];
        this.__queue = [];
        this.__firingIndex = -1;
        
        this.flags = flags;
        
        this.__fire = function( ){
            this.__locked = this.__locked || this.flags.once;
            
            this.__fired = this.__firing = true;
            for ( ; queue.length; firingIndex = -1 ){
                this.__memory = this.__queue.shift();
                
                while ( ++this.__firingIndex < this.__list.length ){
                    if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
                    )
                }
            }
        };
    }
} )( window );